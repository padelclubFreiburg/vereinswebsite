// Capacity + hold management for the One Game Challenge, using the SAME
// Cloudflare KV namespace as the main tournament registration, but with
// its own key prefixes ("og-...") so the two processes can never collide
// or interfere with each other's counts.

import { ONE_GAME_CONFIG } from "./event-config.js";

const HOLD_PREFIX = "og-hold:";
const PROCESSED_PREFIX = "og-processed:";
const EMAIL_FAILED_PREFIX = "og-email-failed:";

const CHECKOUT_EXPIRES_MINUTES = 32; // matches the tournament's safety margin above Stripe's 30 min floor
const HOLD_TTL_SECONDS = (CHECKOUT_EXPIRES_MINUTES + 5) * 60;
const CONFIRMED_HOLD_TTL_SECONDS = 48 * 60 * 60;
const PROCESSED_TTL_SECONDS = 30 * 24 * 60 * 60;
const EMAIL_FAILED_TTL_SECONDS = 30 * 24 * 60 * 60;

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

export async function releaseHold(env, holdId) {
  if (!holdId) return;
  await env.CAPACITY_KV.delete(HOLD_PREFIX + holdId);
}

export async function extendHoldAfterPayment(env, holdId, sessionId) {
  if (!holdId) return;
  await env.CAPACITY_KV.put(
    HOLD_PREFIX + holdId,
    JSON.stringify({ status: "confirmed-pending-write", sessionId }),
    { expirationTtl: CONFIRMED_HOLD_TTL_SECONDS }
  );
}

export async function clearHold(env, holdId) {
  if (!holdId) return;
  await env.CAPACITY_KV.delete(HOLD_PREFIX + holdId);
}

export async function isAlreadyProcessed(env, sessionId) {
  const value = await env.CAPACITY_KV.get(PROCESSED_PREFIX + sessionId);
  return value !== null;
}

export async function markProcessed(env, sessionId) {
  await env.CAPACITY_KV.put(PROCESSED_PREFIX + sessionId, "1", { expirationTtl: PROCESSED_TTL_SECONDS });
}

export async function logEmailFailure(env, sessionId, details) {
  await env.CAPACITY_KV.put(EMAIL_FAILED_PREFIX + sessionId, JSON.stringify(details), {
    expirationTtl: EMAIL_FAILED_TTL_SECONDS,
  });
}

export async function checkAvailability(env, confirmedTeams) {
  const held = await getActiveHoldsCount(env);
  const remaining = Math.max(0, ONE_GAME_CONFIG.capacityTeams - confirmedTeams - held);
  return {
    total: ONE_GAME_CONFIG.capacityTeams,
    confirmed: confirmedTeams,
    held,
    remaining,
    full: remaining <= 0,
  };
}

export const CHECKOUT_EXPIRES_IN_MINUTES = CHECKOUT_EXPIRES_MINUTES;
