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

  priceBaseCents: 2500, // EUR 25 Startgebühr
  priceExtraLosCents: 2000, // EUR 20 Zusatzlos

  fromAddress: "Padel Club Freiburg <info@padelclub-freiburg.de>",
};
