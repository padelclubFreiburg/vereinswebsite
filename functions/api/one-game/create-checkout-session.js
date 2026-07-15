import { getConfirmedTeamsCount } from "./_lib/sheets.js";
import { checkAvailability, createHold, releaseHold } from "./_lib/kv-capacity.js";
import { createCheckoutSession } from "./_lib/stripe.js";
import { ONE_GAME_CONFIG } from "./_lib/event-config.js";

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
      captainFirstName,
      captainFamilyName,
      captainEmail,
      captainMobile,
      partnerFirstName,
      partnerFamilyName,
    } = body || {};

    const required = {
      captainFirstName,
      captainFamilyName,
      captainEmail,
      captainMobile,
      partnerFirstName,
      partnerFamilyName,
    };
    for (const [key, value] of Object.entries(required)) {
      if (!value || !String(value).trim()) {
        return jsonError(400, "missing-field", `Pflichtfeld fehlt: ${key}`);
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(captainEmail)) {
      return jsonError(400, "invalid-email", "Bitte eine gültige E-Mail-Adresse angeben.");
    }

    let confirmed;
    try {
      confirmed = await getConfirmedTeamsCount(env);
    } catch (err) {
      return jsonError(
        502,
        "capacity-check-failed",
        "Verfügbarkeit konnte gerade nicht geprüft werden. Bitte in Kürze erneut versuchen."
      );
    }
    const availability = await checkAvailability(env, confirmed);
    if (availability.full) {
      return jsonError(409, "sold-out", "Alle Teamplätze sind bereits vergeben.");
    }

    try {
      holdId = await createHold(env);
    } catch (err) {
      return jsonError(
        502,
        "hold-failed",
        "Platzreservierung ist gerade nicht möglich. Bitte erneut versuchen."
      );
    }

    const origin = new URL(request.url).origin;

    const metadata = {
      holdId,
      captainFirstName,
      captainFamilyName,
      captainEmail,
      captainMobile,
      partnerFirstName,
      partnerFamilyName,
    };

    const session = await createCheckoutSession(env, {
      lineItems: [
        {
          name: `Team-Anmeldung ${ONE_GAME_CONFIG.name}`,
          unitAmountCents: ONE_GAME_CONFIG.priceCents,
          quantity: 1,
        },
      ],
      metadata,
      successUrl: `${origin}/one-game-challenge-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/one-game-challenge.html?cancelled=1`,
      customerEmail: captainEmail,
      expiresInMinutes: 32,
    });

    if (!session || !session.url) {
      throw new Error("Stripe response did not include a checkout URL");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (holdId) {
      try {
        await releaseHold(env, holdId);
      } catch {
        // best-effort cleanup; the hold's own TTL clears it eventually regardless
      }
    }
    return jsonError(
      502,
      "stripe-failed",
      "Zahlung konnte nicht gestartet werden. Bitte erneut versuchen."
    );
  }
}
