// Themen im Kontaktformular („Worum geht's?“). `fragen` sind ids aus src/data/faq.yaml,
// die unter dem Feld als passende Antworten erscheinen. Links wie /contact?thema=training wählen das Thema vor.
export const kontaktThemen = [
  { id: "spielen", label: "Spielen und Court buchen", fragen: ["wo-spielen", "court-buchen", "hansefit"] },
  { id: "mitglied", label: "Mitgliedschaft", fragen: ["vorteile", "beitrag", "mitglied-werden"] },
  { id: "training", label: "Training und Mannschaften", fragen: ["training", "anfaenger", "mannschaften"] },
  { id: "turniere", label: "Turniere und Events", fragen: ["vereinsturniere", "turniere-region", "events-ohne-mitgliedschaft"] },
  { id: "jugend", label: "Kinder und Jugend", fragen: ["jugend", "kinder-alter"] },
  { id: "sponsoring", label: "Sponsoring", fragen: ["sponsoring"] },
  { id: "mitmachen", label: "Im Verein mitmachen", fragen: ["engagieren"] },
  { id: "sonstiges", label: "Etwas anderes", fragen: [] },
];
