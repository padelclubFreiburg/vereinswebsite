// easyVerein membership verification.
//
// Verified against the real API on 2026-07-04 (Padel Club Freiburg's own
// test account): the generic `search` filter does NOT match on
// membershipNumber, but the direct field filter does. Confirmed request:
//
//   GET /api/v2.0/member?membershipNumber={number}&query={id,contactDetails{firstName,familyName},membershipNumber}
//
// Required env var: EASYVEREIN_API_KEY (Bearer token, expires 30 days
// after issue on the v2.0 API -- fine for a one-off event, see README).

const BASE_URL = "https://easyverein.com/api/v2.0/member";
const FIELD_QUERY = "{id,contactDetails{firstName,familyName},membershipNumber}";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

/**
 * Returns { verified: boolean }. Deliberately never throws for a "no
 * match" case -- only for actual transport/API failures, which callers
 * should treat as "could not verify" (i.e. fall back to no bonus ticket)
 * rather than blocking the registration entirely.
 */
export async function verifyMembership(env, { firstName, familyName, membershipNumber }) {
  if (!membershipNumber || !String(membershipNumber).trim()) {
    return { verified: false, reason: "no-membership-number" };
  }

  const params = new URLSearchParams({
    membershipNumber: String(membershipNumber).trim(),
    query: FIELD_QUERY,
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    headers: {
      // .trim() guards against a trailing newline/space from copy-pasting the
      // key into Cloudflare's secret field -- invisible in the dashboard, but
      // it silently breaks Bearer auth and looks identical to "not found".
      Authorization: `Bearer ${String(env.EASYVEREIN_API_KEY || "").trim()}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`easyVerein request failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  const results = data.results || [];

  if (results.length !== 1) {
    return { verified: false, reason: "not-found" };
  }

  const contact = results[0].contactDetails || {};
  const firstNameMatches = normalize(contact.firstName) === normalize(firstName);
  const familyNameMatches = normalize(contact.familyName) === normalize(familyName);

  return { verified: firstNameMatches && familyNameMatches, reason: "checked" };
}
