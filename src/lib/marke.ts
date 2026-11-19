// Inhalte der Seite /brand: Logo-Varianten mit Downloads, Farben und Schriften (nach docs/ci-guide.md).
// Die Dateien selbst liegen in src/assets/logos/ (Verein) und src/assets/logos/liga/ (PCF Liga) und werden über
// src/pages/brand/dateien/[datei].ts unter /brand/dateien/<name> ausgeliefert (siehe lib/marke-dateien.ts).

export type Grund = "hell" | "dunkel";

export interface Download {
  datei: string; // Dateiname unter /brand/dateien/
  label: string;
}

export interface Variante {
  grund: Grund;
  vorschau: string; // Pfad relativ zu src/assets/logos/
  alt: string;
  downloads: Download[];
}

export interface LogoGruppe {
  id: string;
  name: string;
  text: string;
  breit?: boolean; // über die ganze Breite (horizontale Logos)
  vorschauKlasse: string; // Höhe der Vorschau
  umschalter?: [string, string]; // Beschriftung für hell/dunkel, Standard „Heller Grund“/„Dunkler Grund“
  varianten: Variante[];
}

export const DATEIEN_PFAD = "/brand/dateien";
export const ZIP_VEREIN = "pcf-logos.zip";
export const ZIP_LIGA = "pcf-liga-logos.zip";
export const ZIP_ALLE = "pcf-alle-logos.zip";

// PNG-Höhen der Liga-Logos (CI 10.3). Auf der Seite wird LIGA_PNG_SEITE verlinkt, im ZIP liegen alle.
export const LIGA_PNG_HOEHEN = [500, 1000, 2000];
export const LIGA_PNG_SEITE = 1000;

const dl = (datei: string, label: string): Download => ({ datei, label });

// Vereinslogo (CI 5). Pixelmaße der PNGs aus src/assets/logos/LIESMICH.txt.
export const vereinsLogos: LogoGruppe[] = [
  {
    id: "gestapelt",
    name: "Logo gestapelt",
    text: "Das Hauptlogo für Titel, Plakate, Social Media und Aushänge. Mindestens 72 px bzw. 20 mm hoch.",
    vorschauKlasse: "h-36 sm:h-44",
    varianten: [
      {
        grund: "hell",
        vorschau: "pcf-logo-gestapelt-hell-transparent.png",
        alt: "Logo des Padel Club Freiburg, gestapelt, für hellen Grund",
        downloads: [
          dl("pcf-logo-gestapelt-hell.svg", "SVG"),
          dl("pcf-logo-gestapelt-hell-transparent.png", "PNG, transparent, 960 × 960 px"),
          dl("pcf-logo-gestapelt-hell-weiss.png", "PNG, weißer Grund, 960 × 960 px"),
        ],
      },
      {
        grund: "dunkel",
        vorschau: "pcf-logo-gestapelt-dunkel-transparent.png",
        alt: "Logo des Padel Club Freiburg, gestapelt, für dunklen Grund",
        downloads: [
          dl("pcf-logo-gestapelt-dunkel.svg", "SVG"),
          dl("pcf-logo-gestapelt-dunkel-transparent.png", "PNG, transparent, 800 × 800 px"),
          dl("pcf-logo-gestapelt-dunkel-anthrazit.png", "PNG, Grund Anthrazit, 800 × 800 px"),
        ],
      },
    ],
  },
  {
    id: "monogramm",
    name: "Monogramm",
    text: "Für Profilbilder, Favicons und kleine Formate. Mindestens 24 px bzw. 8 mm hoch.",
    vorschauKlasse: "h-24 sm:h-28",
    varianten: [
      {
        grund: "hell",
        vorschau: "pcf-monogramm-hell-transparent.png",
        alt: "Monogramm des Padel Club Freiburg für hellen Grund",
        downloads: [
          dl("pcf-monogramm-hell.svg", "SVG"),
          dl("pcf-monogramm-hell-transparent.png", "PNG, 415 × 466 px"),
        ],
      },
      {
        grund: "dunkel",
        vorschau: "pcf-monogramm-dunkel-transparent.png",
        alt: "Monogramm des Padel Club Freiburg für dunklen Grund",
        downloads: [
          dl("pcf-monogramm-dunkel.svg", "SVG"),
          dl("pcf-monogramm-dunkel-transparent.png", "PNG, 349 × 391 px"),
        ],
      },
    ],
  },
  {
    id: "horizontal",
    name: "Logo horizontal",
    text: "Für Kopfzeilen, Briefköpfe und Webseiten. Mindestens 44 px bzw. 12 mm hoch.",
    breit: true,
    vorschauKlasse: "h-16 sm:h-24",
    varianten: [
      {
        grund: "hell",
        vorschau: "pcf-logo-horizontal-hell-transparent.png",
        alt: "Logo des Padel Club Freiburg, horizontal, für hellen Grund",
        downloads: [
          dl("pcf-logo-horizontal-hell.svg", "SVG"),
          dl("pcf-logo-horizontal-hell-transparent.png", "PNG, 1232 × 466 px"),
        ],
      },
      {
        grund: "dunkel",
        vorschau: "pcf-logo-horizontal-dunkel-transparent.png",
        alt: "Logo des Padel Club Freiburg, horizontal, für dunklen Grund",
        downloads: [
          dl("pcf-logo-horizontal-dunkel.svg", "SVG"),
          dl("pcf-logo-horizontal-dunkel-transparent.png", "PNG, 1034 × 391 px"),
        ],
      },
    ],
  },
];

// Liga-Logo (CI 10.2/10.3): je Variante SVG und ein daraus erzeugtes PNG.
function ligaVariante(basis: string, grund: Grund, alt: string): Variante {
  return {
    grund,
    vorschau: `liga/${basis}.svg`,
    alt,
    downloads: [
      { datei: `${basis}.svg`, label: "SVG" },
      { datei: `${basis}_${LIGA_PNG_SEITE}px.png`, label: `PNG, ${LIGA_PNG_SEITE} px hoch` },
    ],
  };
}

export const ligaLogos: LogoGruppe[] = [
  {
    id: "liga-logo",
    name: "Logo",
    text: "Das Standard-Logo der Liga für Social-Posts, Plakate, Urkunden und Präsentationen. Mindestens 40 px bzw. 12 mm hoch.",
    vorschauKlasse: "h-28 sm:h-32",
    varianten: [
      ligaVariante("pcf-liga-logo-positiv", "hell", "Logo der PCF Liga für hellen Grund"),
      ligaVariante("pcf-liga-logo-negativ", "dunkel", "Logo der PCF Liga für dunklen Grund"),
    ],
  },
  {
    id: "liga-monogramm",
    name: "Monogramm",
    text: "Für Profilbilder, App-Icons, Wasserzeichen und kleine Formate. Mindestens 64 px bzw. 18 mm hoch.",
    vorschauKlasse: "h-28 sm:h-32",
    varianten: [
      ligaVariante("pcf-liga-monogramm-positiv", "hell", "Monogramm der PCF Liga für hellen Grund"),
      ligaVariante("pcf-liga-monogramm-negativ", "dunkel", "Monogramm der PCF Liga für dunklen Grund"),
    ],
  },
  {
    id: "liga-horizontal",
    name: "Logo horizontal",
    text: "Für Kopfzeilen, Banner, E-Mail-Signaturen und überall, wo der Verein mitgenannt werden soll. Mindestens 56 px bzw. 15 mm hoch.",
    breit: true,
    vorschauKlasse: "h-16 sm:h-24",
    varianten: [
      ligaVariante("pcf-liga-horizontal-positiv", "hell", "Logo der PCF Liga, horizontal, für hellen Grund"),
      ligaVariante("pcf-liga-horizontal-negativ", "dunkel", "Logo der PCF Liga, horizontal, für dunklen Grund"),
    ],
  },
  {
    id: "liga-klein",
    name: "Monogramm Kleinformat",
    text: "Vereinfachte Bildmarke für alles unter 64 px, bis 16 px, zum Beispiel als Favicon.",
    vorschauKlasse: "h-20 sm:h-24",
    varianten: [
      ligaVariante("pcf-liga-monogramm-klein-positiv", "hell", "Kleinformat-Monogramm der PCF Liga für hellen Grund"),
      ligaVariante("pcf-liga-monogramm-klein-negativ", "dunkel", "Kleinformat-Monogramm der PCF Liga für dunklen Grund"),
    ],
  },
  {
    id: "liga-einfarbig",
    name: "Monogramm einfarbig",
    text: "Für Stempel, Schwarz-Weiß-Druck, Textildruck, Folie und Prägung.",
    vorschauKlasse: "h-20 sm:h-24",
    umschalter: ["Anthrazit", "Weiß"],
    varianten: [
      ligaVariante("pcf-liga-monogramm-einfarbig-anthrazit", "hell", "Monogramm der PCF Liga, einfarbig Anthrazit"),
      ligaVariante("pcf-liga-monogramm-einfarbig-weiss", "dunkel", "Monogramm der PCF Liga, einfarbig Weiß"),
    ],
  },
];

// Schutzraum (CI 5.2 und 10.2): eine Ballbreite rundum. Werte gemessen in den Logo-Dateien.
export const schutzraum = {
  // pcf-logo-horizontal-hell-transparent.png: 1232 px breit, Ball 131 px
  verein: { datei: "pcf-logo-horizontal-hell-transparent.png", breite: 1232, ball: 131 },
  // pcf-liga-logo-positiv.svg: viewBox 349 breit, Ball r = 16
  liga: { datei: "liga/pcf-liga-logo-positiv.svg", breite: 349, ball: 32 },
};

// Farben (CI 2.1). Die Werte entsprechen den Tokens in src/styles/global.css – bei Änderungen dort hier mitpflegen.
export interface Farbe {
  name: string;
  hex: string;
  rolle: string;
  klasse: string; // Tailwind-Klasse für das Farbfeld
}

export const hauptfarben: Farbe[] = [
  { name: "Lavendel", hex: "#CEA8F0", klasse: "bg-primary", rolle: "Markenfarbe für Flächen, Icon-Kreise und das Logo. Nie als Schrift auf Weiß." },
  { name: "Lavendel Dark", hex: "#6F42A8", klasse: "bg-primary-dark", rolle: "Für Links und farbige Schrift auf hellem Grund." },
  { name: "Anthrazit", hex: "#1F1F1F", klasse: "bg-neutraldark", rolle: "Schrift, Überschriften, Buttons und dunkle Flächen." },
  { name: "Neon", hex: "#C8F000", klasse: "bg-signal", rolle: "Signalfarbe, nur auf dunklem Grund. Schrift darauf in Anthrazit." },
  { name: "Petrol", hex: "#0F4C5C", klasse: "bg-secondary", rolle: "Für große Flächen, zum Beispiel auf Social Media. Weiß oder Neon darauf." },
  { name: "Weiß", hex: "#FFFFFF", klasse: "bg-white", rolle: "Standardhintergrund." },
];

export const weitereFarben: Farbe[] = [
  { name: "Lavendel Tint", hex: "#F6F0FC", klasse: "bg-primary-tint", rolle: "Helle Flächen und Hervorhebungen." },
  { name: "Hellgrau", hex: "#F2F2F2", klasse: "bg-neutrallight", rolle: "Flächen und Karten." },
  { name: "Textgrau", hex: "#55505C", klasse: "bg-text-muted", rolle: "Fließtext und Beschreibungen." },
  { name: "Warm Grau-Lila", hex: "#D6D1DB", klasse: "bg-border", rolle: "Rahmen und Trennlinien." },
];

export function rgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
