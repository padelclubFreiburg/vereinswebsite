import { constructEvent } from "./_lib/stripe.js";
import { appendTeamRow } from "./_lib/sheets.js";
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

  const rawBody = await request.text();
  const sigHeader = request.headers.get("Stripe-Signature");

  let event;
  try {
    event = await constructEvent(rawBody, sigHeader, env.ONE_GAME_STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
  }

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

  if (await isAlreadyProcessed(env, sessionId)) {
    return new Response("already processed");
  }

  await extendHoldAfterPayment(env, holdId, sessionId);

  const meta = session.metadata || {};
  const amountPaidEuros = (session.amount_total || 0) / 100;

  // Column order must match the sheet header row -- see README.
  const rowValues = [
    new Date().toISOString(),
    meta.captainFirstName || "",
    meta.captainFamilyName || "",
    meta.captainEmail || "",
    meta.captainMobile || "",
    meta.partnerFirstName || "",
    meta.partnerFamilyName || "",
    amountPaidEuros.toFixed(2),
    sessionId,
  ];

  try {
    await appendTeamRow(env, rowValues);
  } catch (err) {
    return new Response(`Sheet write failed: ${err.message}`, { status: 500 });
  }

  await clearHold(env, holdId);
  await markProcessed(env, sessionId);

  try {
    await sendConfirmationEmail(env, {
      captainFirstName: meta.captainFirstName || "",
      captainFamilyName: meta.captainFamilyName || "",
      captainEmail: meta.captainEmail,
      partnerFirstName: meta.partnerFirstName || "",
      partnerFamilyName: meta.partnerFamilyName || "",
      amountPaidEuros,
    });
  } catch (err) {
    await logEmailFailure(env, sessionId, {
      email: meta.captainEmail,
      firstName: meta.captainFirstName,
      error: String(err.message || err),
    });
  }

  return new Response("ok");
}
