import { getConfirmedCount } from "./_lib/sheets.js";
import { checkAvailability } from "./_lib/kv-capacity.js";
import { EVENT_CONFIG } from "./_lib/event-config.js";

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const confirmed = await getConfirmedCount(env);
    const status = await checkAvailability(env, confirmed, EVENT_CONFIG.capacityTotal);
    return new Response(JSON.stringify(status), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("availability: check failed:", err.message || err);
    return new Response(JSON.stringify({ error: "availability-check-failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
