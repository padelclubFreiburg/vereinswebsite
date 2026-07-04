// Confirmation email via Resend's HTTP API.
//
// NOT sent via the IONOS mailbox's own SMTP server: Cloudflare Pages
// Functions run in V8 isolates without raw TCP socket support in the
// general case, which makes SMTP fragile at best from this environment
// (see README for the reasoning). Resend is used instead, but the
// "From" address is still the club's own domain (see event-config.js),
// so recipients see exactly the same sender they would with IONOS.
//
// Required env var: RESEND_API_KEY
// Optional env var: CONFIRMATION_BCC -- if set, every confirmation is
// also BCC'd to this address (e.g. the IONOS info@ mailbox), so a copy
// still lands somewhere Fabio can browse like a normal inbox.

import { EVENT_CONFIG } from "./event-config.js";

function buildConfirmationEmail(reg) {
  const { firstName, totalLose, bonusLos, extraLosPurchased, amountPaidEuros } = reg;

  const loseLines = [
    "1 Basis-Los (automatisch bei jeder Anmeldung)",
    bonusLos ? "1 Mitglieds-Bonus-Los" : null,
    extraLosPurchased ? "1 Zusatzlos (zugebucht)" : null,
  ].filter(Boolean);

  const subject = `Bestätigung: Anmeldung ${EVENT_CONFIG.name}, ${EVENT_CONFIG.dateLabel}`;

  const text = `Hallo ${firstName},

deine Anmeldung für das ${EVENT_CONFIG.name} ist eingegangen und bezahlt (EUR ${amountPaidEuros.toFixed(2)}).

Wann: ${EVENT_CONFIG.dateLabel}, ${EVENT_CONFIG.timeLabel}
Wo: ${EVENT_CONFIG.location}

Format: Lockeres Americano mit wechselnden Partner:innen und Gegner:innen, du meldest dich alleine an. In jeder Runde bekommst du einen neuen Partner oder eine neue Partnerin und neue Gegner:innen.

Deine Lose für die Tombola (Hauptpreis: 3 Tage Robinson Club, plus weitere Preise):
${loseLines.map((l) => "- " + l).join("\n")}
Gesamt: ${totalLose} Los${totalLose === 1 ? "" : "e"}

Im Anschluss findet die One-Shot-Challenge statt. Anmeldung dafür läuft separat:
${EVENT_CONFIG.oneShotUrl}

Bis bald auf dem Platz!
Padel Club Freiburg e.V.`;

  const html = `
<p>Hallo ${firstName},</p>
<p>deine Anmeldung für das <strong>${EVENT_CONFIG.name}</strong> ist eingegangen und bezahlt
(EUR ${amountPaidEuros.toFixed(2)}).</p>
<p><strong>Wann:</strong> ${EVENT_CONFIG.dateLabel}, ${EVENT_CONFIG.timeLabel}<br>
<strong>Wo:</strong> ${EVENT_CONFIG.location}</p>
<p>Format: Lockeres Americano mit wechselnden Partner:innen und Gegner:innen, du meldest dich
alleine an. In jeder Runde bekommst du einen neuen Partner oder eine neue Partnerin und neue
Gegner:innen.</p>
<p><strong>Deine Lose für die Tombola</strong> (Hauptpreis: 3 Tage Robinson Club, plus weitere Preise):</p>
<ul>${loseLines.map((l) => `<li>${l}</li>`).join("")}</ul>
<p>Gesamt: <strong>${totalLose} Los${totalLose === 1 ? "" : "e"}</strong></p>
<p>Im Anschluss findet die One-Shot-Challenge statt. Anmeldung dafür läuft separat:<br>
<a href="${EVENT_CONFIG.oneShotUrl}">${EVENT_CONFIG.oneShotUrl}</a></p>
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
      from: EVENT_CONFIG.fromAddress,
      to: reg.email,
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
