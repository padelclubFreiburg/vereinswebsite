// Google Sheets integration using a service account.
//
// No Google npm client library is used (Cloudflare Pages Functions have
// no Node.js runtime), so the OAuth2 "JWT bearer" flow is implemented
// directly with the Web Crypto API. This is the same flow any Google
// client library does internally, just spelled out.
//
// Required env vars (see README.md):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_PRIVATE_KEY            (the full "-----BEGIN PRIVATE KEY-----..." PEM block)
//   GOOGLE_SHEET_ID               (from the sheet URL)
//   GOOGLE_SHEET_TAB_NAME         (optional, defaults to "Tabellenblatt1")
//   CAPACITY_KV binding           (also used to cache the access token)

const TOKEN_CACHE_KEY = "google-access-token";

function base64UrlEncodeBytes(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeString(str) {
  return base64UrlEncodeBytes(new TextEncoder().encode(str));
}

function pemToArrayBuffer(pem) {
  const normalized = String(pem || "").trim().replace(/\\n/g, "\n");
  const base64Body = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = atob(base64Body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function createSignedJwt(env) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: String(env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim(),
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const unsigned = `${base64UrlEncodeString(JSON.stringify(header))}.${base64UrlEncodeString(
    JSON.stringify(claims)
  )}`;

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(env.GOOGLE_PRIVATE_KEY),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsigned)
  );

  return `${unsigned}.${base64UrlEncodeBytes(new Uint8Array(signature))}`;
}

async function requestNewAccessToken(env) {
  const jwt = await createSignedJwt(env);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

async function getAccessToken(env, forceRefresh = false) {
  const kv = env.CAPACITY_KV;
  if (!forceRefresh) {
    const cached = await kv.get(TOKEN_CACHE_KEY);
    if (cached) return cached;
  }
  const { access_token, expires_in } = await requestNewAccessToken(env);
  const ttl = Math.max(60, (expires_in || 3600) - 120); // refresh a bit early
  await kv.put(TOKEN_CACHE_KEY, access_token, { expirationTtl: ttl });
  return access_token;
}

function tabName(env) {
  return env.GOOGLE_SHEET_TAB_NAME || "Tabellenblatt1";
}

function sheetId(env) {
  // Defaults to the sheet already shared for this event; override via env
  // var if this is ever pointed at a different spreadsheet.
  return env.GOOGLE_SHEET_ID || "1LLZNP69HrfhgXZaHy-aFy3uUm-FrwQ_PJirqewDIGPc";
}

/** Fetch wrapper that transparently refreshes the cached token once on a 401. */
async function sheetsFetch(env, url, options) {
  let token = await getAccessToken(env);
  let res = await fetch(url, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    token = await getAccessToken(env, true);
    res = await fetch(url, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
    });
  }
  return res;
}

/**
 * Counts confirmed registrations directly from the sheet (column A,
 * skipping the header row). This is deliberately the single source of
 * truth: if Fabio deletes a row (or clears the cell) in the sheet, the
 * seat is immediately available again on the next check.
 */
export async function getConfirmedCount(env) {
  const range = `${encodeURIComponent(tabName(env))}!A2:A`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId(env)}/values/${range}`;
  const res = await sheetsFetch(env, url, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Sheets read failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  const rows = data.values || [];
  return rows.filter((row) => row[0] && String(row[0]).trim() !== "").length;
}

/** Appends one registration as a new row. rowValues must already be in column order. */
export async function appendRegistrationRow(env, rowValues) {
  const range = `${encodeURIComponent(tabName(env))}!A:A`;
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId(env)}/values/${range}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await sheetsFetch(env, url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: [rowValues] }),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}
