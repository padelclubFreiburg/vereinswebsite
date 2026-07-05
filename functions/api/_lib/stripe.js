// Stripe integration via plain fetch() calls to the REST API.
//
// Deliberately NOT using the `stripe` npm package: Pages Functions run
// without a Node runtime, and a zero-dependency implementation means
// there is nothing to bundle and nothing that can break on a Stripe SDK
// upgrade. Both pieces used here (Checkout Sessions, webhook signature
// verification) are plain HTTP + HMAC and are stable, documented Stripe
// primitives.
//
// Required env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

function appendFormParam(params, key, value) {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => appendFormParam(params, `${key}[${index}]`, item));
  } else if (typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => appendFormParam(params, `${key}[${k}]`, v));
  } else {
    params.append(key, String(value));
  }
}

function toFormBody(obj) {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => appendFormParam(params, key, value));
  return params;
}

/**
 * lineItems: array of { name, unitAmountCents, quantity }
 * metadata: flat object of strings (Stripe metadata values must be strings)
 */
export async function createCheckoutSession(
  env,
  { lineItems, metadata, successUrl, cancelUrl, customerEmail, expiresInMinutes = 32 }
) {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInMinutes * 60;

  const stripeLineItems = lineItems.map((item) => ({
    price_data: {
      currency: "eur",
      unit_amount: item.unitAmountCents,
      product_data: { name: item.name },
    },
    quantity: item.quantity,
  }));

  const body = toFormBody({
    mode: "payment",
    locale: "de",
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: stripeLineItems,
    metadata,
    expires_at: expiresAt,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${String(env.STRIPE_SECRET_KEY || "").trim()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Stripe checkout session creation failed (${res.status}): ${await res.text()}`);
  }

  return res.json();
}

async function hmacSha256Hex(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Verifies and parses a Stripe webhook. Throws on any signature/timestamp
 * problem -- callers should respond 400 in that case. `rawBody` MUST be
 * the exact, unparsed request body string (signature covers raw bytes).
 */
export async function constructEvent(rawBody, sigHeader, secret, toleranceSeconds = 300) {
  if (!sigHeader) throw new Error("Missing Stripe-Signature header");
  const cleanSecret = String(secret || "").trim();

  const timestamp = sigHeader.match(/t=(\d+)/)?.[1];
  const signatures = [...sigHeader.matchAll(/v1=([a-f0-9]+)/g)].map((m) => m[1]);

  if (!timestamp || signatures.length === 0) {
    throw new Error("Malformed Stripe-Signature header");
  }

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (age > toleranceSeconds) {
    throw new Error("Stripe webhook timestamp outside tolerance");
  }

  const expected = await hmacSha256Hex(cleanSecret, `${timestamp}.${rawBody}`);
  const matches = signatures.some((sig) => timingSafeEqual(expected, sig));
  if (!matches) {
    throw new Error("Stripe webhook signature mismatch");
  }

  return JSON.parse(rawBody);
}
