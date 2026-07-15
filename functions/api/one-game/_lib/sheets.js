// Google Sheets integration for the One Game Challenge. Same service
// account and auth mechanics as the main tournament, but writes to a
// completely separate spreadsheet (its own Google Sheet file, not a tab
// in the tournament's sheet).
//
// Required env vars:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY (shared with the tournament)
//   ONE_GAME_SHEET_ID            (this challenge's own sheet, no default -- must be set)
//   ONE_GAME_SHEET_TAB_NAME      (optional, defaults to "Tabellenblatt1")

const TOKEN_CACHE_KEY = "google-access-token"; // intentionally shared with the tournament's cache

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
  const normalized = pem.replace(/\\n/g, "\n");
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
    iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
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
  const ttl = Math.max(60, (expires_in || 3600) - 120);
  await kv.put(TOKEN_CACHE_KEY, access_token, { expirationTtl: ttl });
  return access_token;
}

function tabName(env) {
  return env.ONE_GAME_SHEET_TAB_NAME || "Tabellenblatt1";
}

function sheetId(env) {
  if (!env.ONE_GAME_SHEET_ID) {
    throw new Error("ONE_GAME_SHEET_ID is not set -- see README for setup.");
  }
  return env.ONE_GAME_SHEET_ID;
}

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

/** Counts confirmed teams directly from the sheet (column A, header row skipped). */
export async function getConfirmedTeamsCount(env) {
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

/** Appends one team registration as a new row. rowValues must already be in column order. */
export async function appendTeamRow(env, rowValues) {
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
