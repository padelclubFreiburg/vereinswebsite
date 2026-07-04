// All the "content" knobs for this one event in one place, so adjusting
// dates, prices, or links never means hunting through the logic files.

export const EVENT_CONFIG = {
  name: "Padel Americano Turnier",
  dateLabel: "Sonntag, 25.07.2026",
  timeLabel: "11:00 – 17:00 Uhr",
  location: "Blackforest Padel",
  oneShotUrl: "https://pretix.eu/pcfreiburg/one-shot/",
  membershipUrl: "https://www.padelclub-freiburg.de/mitgliedschaft/",

  capacityTotal: 56,

  // Stripe requires expires_at to be at least 30 minutes out; 32 leaves a
  // safety margin so normal network latency can never push a request
  // under that floor and cause Stripe to reject session creation outright.
  checkoutExpiresInMinutes: 32,

  priceBaseCents: 2500, // EUR 25 Startgebühr
  priceExtraLosCents: 2000, // EUR 20 Zusatzlos

  fromAddress: "Padel Club Freiburg <info@padelclub-freiburg.de>",
};
