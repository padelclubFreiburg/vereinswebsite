import { verifyMembership } from "./_lib/easyverein.js";

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// This endpoint is for INLINE UI FEEDBACK ONLY (so the form can show a
// live checkmark). It intentionally never blocks or errors hard: the
// authoritative check that actually grants the bonus ticket happens
// again, server-side, inside create-checkout-session.js. Someone
// tampering with this response client-side gains nothing.
export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "invalid-json" }, 400);
  }

  const { firstName, familyName, membershipNumber } = body || {};
  if (!firstName || !familyName || !membershipNumber) {
    return jsonResponse({ error: "missing-fields" }, 400);
  }

  try {
    const result = await verifyMembership(env, { firstName, familyName, membershipNumber });
    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ verified: false, reason: "check-unavailable" });
  }
}
