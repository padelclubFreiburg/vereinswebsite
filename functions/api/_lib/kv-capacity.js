// Capacity + hold management using Cloudflare KV.
//
// The Google Sheet is the source of truth for CONFIRMED registrations
// (see sheets.js -> getConfirmedCount). This module only tracks
// temporary "holds": seats reserved while someone is on the Stripe
// Checkout page but hasn't paid yet. A hold expires automatically via
// KV's TTL if the person abandons checkout, freeing the seat again
// without any manual cleanup.
//
// remaining = capacityTotal - confirmedFromSheet - activeHolds

import { EVENT_CONFIG } from "./event-config.js";

const HOLD_PREFIX = "hold:";
const PROCESSED_PREFIX = "processed:";
const EMAIL_FAILED_PREFIX = "email-failed:";

// Always a few minutes longer than the Stripe Checkout Session itself, so a
// hold can never expire while its checkout page might technically still be
// payable.
const HOLD_TTL_SECONDS = (EVENT_CONFIG.checkoutExpiresInMinutes + 5) * 60;
const CONFIRMED_HOLD_TTL_SECONDS = 48 * 60 * 60; // safety net once payment succeeded
const PROCESSED_TTL_SECONDS = 30 * 24 * 60 * 60;
const EMAIL_FAILED_TTL_SECONDS = 30 * 24 * 60 * 60;

/**
 * Counts holds that are currently reserving a seat (pending payment or
 * confirmed-but-not-yet-written-to-sheet). KV list() is eventually
 * consistent (up to ~60s), which is an accepted trade-off at this scale.
 */
export async function getActiveHoldsCount(env) {
  const kv = env.CAPACITY_KV;
  let count = 0;
  let cursor;
  do {
    const page = await kv.list({ prefix: HOLD_PREFIX, cursor });
    count += page.keys.length;
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return count;
}

/**
 * Reserves a seat for the duration of one Stripe Checkout session.
 * Returns the holdId to embed in the Checkout Session metadata.
 */
export async function createHold(env) {
  const kv = env.CAPACITY_KV;
  const holdId = crypto.randomUUID();
  await kv.put(
    HOLD_PREFIX + holdId,
    JSON.stringify({ createdAt: new Date().toISOString(), status: "pending" }),
    { expirationTtl: HOLD_TTL_SECONDS }
  );
  return holdId;
}

/** Called from create-checkout-session.js if Stripe session creation fails. */
export async function releaseHold(env, holdId) {
  const kv = env.CAPACITY_KV;
  if (!holdId) return;
  await kv.delete(HOLD_PREFIX + holdId);
}

/**
 * Called from the webhook the moment a payment is confirmed, BEFORE the
 * Google Sheet write is attempted. Extends the hold well past the
 * original 30-minute TTL so the seat stays reserved even if Stripe
 * retries the webhook several times due to a transient Sheets/API error.
 */
export async function extendHoldAfterPayment(env, holdId, sessionId) {
  const kv = env.CAPACITY_KV;
  if (!holdId) return;
  await kv.put(
    HOLD_PREFIX + holdId,
    JSON.stringify({ status: "confirmed-pending-write", sessionId }),
    { expirationTtl: CONFIRMED_HOLD_TTL_SECONDS }
  );
}

/** Called once the sheet row has been written successfully; the row itself now represents the seat. */
export async function clearHold(env, holdId) {
  const kv = env.CAPACITY_KV;
  if (!holdId) return;
  await kv.delete(HOLD_PREFIX + holdId);
}

/** Idempotency guard so a re-delivered Stripe webhook never creates a duplicate row. */
export async function isAlreadyProcessed(env, sessionId) {
  const kv = env.CAPACITY_KV;
  const value = await kv.get(PROCESSED_PREFIX + sessionId);
  return value !== null;
}

export async function markProcessed(env, sessionId) {
  const kv = env.CAPACITY_KV;
  await kv.put(PROCESSED_PREFIX + sessionId, "1", { expirationTtl: PROCESSED_TTL_SECONDS });
}

/** Logged when the sheet write succeeded but the confirmation email failed, so it can be resent manually. */
export async function logEmailFailure(env, sessionId, details) {
  const kv = env.CAPACITY_KV;
  await kv.put(EMAIL_FAILED_PREFIX + sessionId, JSON.stringify(details), {
    expirationTtl: EMAIL_FAILED_TTL_SECONDS,
  });
}

export async function checkAvailability(env, confirmedCount, capacityTotal) {
  const held = await getActiveHoldsCount(env);
  const remaining = Math.max(0, capacityTotal - confirmedCount - held);
  return {
    total: capacityTotal,
    confirmed: confirmedCount,
    held,
    remaining,
    full: remaining <= 0,
  };
}
