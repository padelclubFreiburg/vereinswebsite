// Confirmation email for the One Game Challenge, sent to the team captain
// only (the second team member's contact details aren't collected).
//
// Required env var: RESEND_API_KEY
// Optional env var: CONFIRMATION_BCC (shared with the tournament's setting)

import { ONE_GAME_CONFIG } from "./event-config.js";

function buildConfirmationEmail(reg) {
  const { captainFirstName, partnerFirstName, partnerFamilyName, amountPaidEuros } = reg;

  const subject = `Bestätigung: Team-Anmeldung ${ONE_GAME_CONFIG.name}`;

  const text = `Hallo ${captainFirstName},

euer Team ist für die ${ONE_GAME_CONFIG.name} angemeldet und die Anmeldegebühr (EUR ${amountPaidEuros.toFixed(2)}) ist bezahlt.

Euer Team:
- ${reg.captainFirstName} ${reg.captainFamilyName}
- ${partnerFirstName} ${partnerFamilyName}

Wann: ${ONE_GAME_CONFIG.dateLabel}, ${ONE_GAME_CONFIG.timeLabel}
Wo: ${ONE_GAME_CONFIG.location}

Es gibt ein Preisgeld, die Höhe bleibt bis zum Eventtag eine Überraschung.

Bis bald auf dem Platz!
Padel Club Freiburg e.V.`;

  const html = `
<p>Hallo ${captainFirstName},</p>
<p>euer Team ist für die <strong>${ONE_GAME_CONFIG.name}</strong> angemeldet und die Anmeldegebühr
(EUR ${amountPaidEuros.toFixed(2)}) ist bezahlt.</p>
<p><strong>Euer Team:</strong><br>
${reg.captainFirstName} ${reg.captainFamilyName}<br>
${partnerFirstName} ${partnerFamilyName}</p>
<p><strong>Wann:</strong> ${ONE_GAME_CONFIG.dateLabel}, ${ONE_GAME_CONFIG.timeLabel}<br>
<strong>Wo:</strong> ${ONE_GAME_CONFIG.location}</p>
<p>Es gibt ein Preisgeld, die Höhe bleibt bis zum Eventtag eine Überraschung.</p>
<p>Bis bald auf dem Platz!<br>Padel Club Freiburg e.V.</p>
`.trim();

  return { subject, text, html };
}

export async function sendConfirmationEmail(env, reg) {
  const { subject, text, html } = buildConfirmationEmail(reg);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: ONE_GAME_CONFIG.fromAddress,
      to: reg.captainEmail,
      ...(env.CONFIRMATION_BCC ? { bcc: env.CONFIRMATION_BCC } : {}),
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend send failed (${res.status}): ${await res.text()}`);
  }

  return res.json();
}
