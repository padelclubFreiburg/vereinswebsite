import { constructEvent } from "./_lib/stripe.js";
import { appendRegistrationRow } from "./_lib/sheets.js";
import { sendConfirmationEmail } from "./_lib/mailer.js";
import {
  isAlreadyProcessed,
  markProcessed,
  extendHoldAfterPayment,
  clearHold,
  releaseHold,
  logEmailFailure,
} from "./_lib/kv-capacity.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  // Signature covers the raw body, so it must be read as text before any parsing.
  const rawBody = await request.text();
  const sigHeader = request.headers.get("Stripe-Signature");

  let event;
  try {
    event = await constructEvent(rawBody, sigHeader, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("stripe-webhook: signature verification failed:", err.message || err);
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
  }

  // Abandoned/expired checkout: free the seat immediately instead of waiting for the TTL.
  if (event.type === "checkout.session.expired") {
    const holdId = event.data.object.metadata?.holdId;
    await releaseHold(env, holdId);
    return new Response("ok");
  }

  if (event.type !== "checkout.session.completed") {
    return new Response("ignored");
  }

  const session = event.data.object;
  const sessionId = session.id;
  const holdId = session.metadata?.holdId;

  // Stripe delivers webhooks at-least-once -- this guard is what makes a
  // re-delivery safe (no duplicate row, no duplicate email).
  if (await isAlreadyProcessed(env, sessionId)) {
    return new Response("already processed");
  }

  // Protect the seat through any retries BEFORE attempting the parts that can fail.
  await extendHoldAfterPayment(env, holdId, sessionId);

  const meta = session.metadata || {};
  const amountPaidEuros = (session.amount_total || 0) / 100;
  const totalLose = Number(meta.totalLose || "1");

  // Column order must match the sheet header row -- see README.
  const rowValues = [
    new Date().toISOString(),
    meta.firstName || "",
    meta.familyName || "",
    meta.email || "",
    meta.mobile || "",
    meta.playtomicLevel || "",
    meta.gender || "",
    meta.isMember || "nein",
    meta.membershipNumber || "",
    meta.memberVerified || "nein",
    meta.extraLosPurchased || "nein",
    String(totalLose),
    amountPaidEuros.toFixed(2),
    sessionId,
    meta.memberCheckError || "nein",
  ];

  try {
    await appendRegistrationRow(env, rowValues);
  } catch (err) {
    // Sheet write failed: return 500 so Stripe retries this webhook later.
    // The extended hold above keeps the seat reserved in the meantime.
    console.error("stripe-webhook: sheet write failed:", err.message || err);
    return new Response(`Sheet write failed: ${err.message}`, { status: 500 });
  }

  // The sheet row is now the seat's permanent record; the hold has done its job.
  await clearHold(env, holdId);
  await markProcessed(env, sessionId);

  try {
    await sendConfirmationEmail(env, {
      firstName: meta.firstName || "",
      email: meta.email,
      totalLose,
      bonusLos: meta.memberVerified === "ja",
      extraLosPurchased: meta.extraLosPurchased === "ja",
      amountPaidEuros,
    });
  } catch (err) {
    // Payment + sheet row are already secured; an email hiccup must not
    // fail the whole webhook (that would trigger pointless sheet-write retries).
    await logEmailFailure(env, sessionId, {
      email: meta.email,
      firstName: meta.firstName,
      error: String(err.message || err),
    });
  }

  return new Response("ok");
}
