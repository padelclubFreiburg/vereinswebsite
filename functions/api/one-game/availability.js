import { getConfirmedTeamsCount } from "./_lib/sheets.js";
import { checkAvailability } from "./_lib/kv-capacity.js";

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const confirmed = await getConfirmedTeamsCount(env);
    const status = await checkAvailability(env, confirmed);
    return new Response(JSON.stringify(status), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "availability-check-failed", message: String(err.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
