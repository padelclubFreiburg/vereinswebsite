import { getConfirmedCount } from "./_lib/sheets.js";
import { checkAvailability, createHold, releaseHold } from "./_lib/kv-capacity.js";
import { verifyMembership } from "./_lib/easyverein.js";
import { createCheckoutSession } from "./_lib/stripe.js";
import { EVENT_CONFIG } from "./_lib/event-config.js";

function jsonError(status, code, message) {
  return new Response(JSON.stringify({ error: code, message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let holdId = null;

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonError(400, "invalid-json", "Ungültige Anfrage.");
    }

    const {
      firstName,
      familyName,
      email,
      mobile,
      playtomicLevel,
      gender,
      isMember,
      membershipNumber,
      wantsExtraLos,
    } = body || {};

    // --- validation ---
    const required = { firstName, familyName, email, mobile, gender };
    for (const [key, value] of Object.entries(required)) {
      if (!value || !String(value).trim()) {
        return jsonError(400, "missing-field", `Pflichtfeld fehlt: ${key}`);
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return jsonError(400, "invalid-email", "Bitte eine gültige E-Mail-Adresse angeben.");
    }
    if (isMember && (!membershipNumber || !String(membershipNumber).trim())) {
      return jsonError(400, "missing-membership-number", "Mitgliedsnummer fehlt.");
    }

    // --- capacity check (source of truth: confirmed rows in the sheet + active holds) ---
    let confirmed;
    try {
      confirmed = await getConfirmedCount(env);
    } catch (err) {
      return jsonError(
        502,
        "capacity-check-failed",
        "Verfügbarkeit konnte gerade nicht geprüft werden. Bitte in Kürze erneut versuchen."
      );
    }
    const availability = await checkAvailability(env, confirmed, EVENT_CONFIG.capacityTotal);
    if (availability.full) {
      return jsonError(409, "sold-out", "Die Anmeldung ist leider ausgebucht.");
    }

    // --- authoritative membership check, independent of anything the client claims ---
    let bonusLos = 0;
    let memberCheckError = false;
    if (isMember) {
      try {
        const result = await verifyMembership(env, { firstName, familyName, membershipNumber });
        bonusLos = result.verified ? 1 : 0;
      } catch (err) {
        // Fail closed on the ticket, but flag it distinctly from "genuinely no
        // match" so Fabio can spot-check the sheet for anyone who may have
        // missed a bonus ticket purely because easyVerein was unreachable.
        console.error("create-checkout-session: easyVerein call failed:", err.message || err);
        bonusLos = 0;
        memberCheckError = true;
      }
    }

    const extraLosPurchased = Boolean(wantsExtraLos);
    const totalLose = 1 + bonusLos + (extraLosPurchased ? 1 : 0);

    // --- reserve a seat for the duration of the checkout session ---
    try {
      holdId = await createHold(env);
    } catch (err) {
      return jsonError(
        502,
        "hold-failed",
        "Platzreservierung ist gerade nicht möglich. Bitte erneut versuchen."
      );
    }

    const lineItems = [
      {
        name: `Startgebühr ${EVENT_CONFIG.name}`,
        unitAmountCents: EVENT_CONFIG.priceBaseCents,
        quantity: 1,
      },
    ];
    if (extraLosPurchased) {
      lineItems.push({
        name: "Zusatzlos Tombola",
        unitAmountCents: EVENT_CONFIG.priceExtraLosCents,
        quantity: 1,
      });
    }

    const origin = new URL(request.url).origin;

    const metadata = {
      process: "tournament",
      holdId,
      firstName,
      familyName,
      email,
      mobile,
      playtomicLevel: playtomicLevel || "",
      gender,
      isMember: isMember ? "ja" : "nein",
      membershipNumber: isMember ? String(membershipNumber).trim() : "",
      memberVerified: bonusLos ? "ja" : "nein",
      memberCheckError: memberCheckError ? "ja" : "nein",
      extraLosPurchased: extraLosPurchased ? "ja" : "nein",
      totalLose: String(totalLose),
    };

    const session = await createCheckoutSession(env, {
      lineItems,
      metadata,
      successUrl: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/anmeldung.html?cancelled=1`,
      customerEmail: email,
      expiresInMinutes: EVENT_CONFIG.checkoutExpiresInMinutes,
    });

    if (!session || !session.url) {
      throw new Error("Stripe response did not include a checkout URL");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Safety net for anything unexpected above: never let a raw exception
    // reach the client (the frontend always expects JSON back), and never
    // leave a seat reserved for a registration that didn't actually start.
    console.error("create-checkout-session: unexpected failure:", err.message || err);
    if (holdId) {
      try {
        await releaseHold(env, holdId);
      } catch {
        // best-effort cleanup; the hold's own TTL will still clear it eventually
      }
    }
    return jsonError(
      502,
      "stripe-failed",
      "Zahlung konnte nicht gestartet werden. Bitte erneut versuchen."
    );
  }
}
