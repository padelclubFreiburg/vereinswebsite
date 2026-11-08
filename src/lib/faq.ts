// Lädt die Häufigen Fragen aus src/data/faq.yaml und rendert die Antworten (Markdown) zu HTML.
import { getCollection } from "astro:content";
import { marked } from "marked";

export const SITE_URL = "https://www.padelclub-freiburg.de";

export interface FaqFrage {
  id: string;
  frage: string;
  html: string;
  kategorie: string;
}

export interface FaqKategorie {
  id: string;
  titel: string;
  kurz: string;
  fragen: FaqFrage[];
}

// Sprungmarken, die die FAQ-Seite selbst benutzt
const RESERVIERT = new Set(["was-ist-padel", "courts", "faq-suche", "faq-leer", "inhalt"]);

function renderMarkdown(md: string): string {
  const html = marked.parse(md.trim(), { async: false }) as string;
  // Externe Links in neuem Tab öffnen
  return html.replace(/<a href="(https?:\/\/)/g, '<a target="_blank" rel="noopener" href="$1');
}

let cache: Promise<{ kategorien: FaqKategorie[]; byId: Map<string, FaqFrage> }> | undefined;

async function load() {
  const entries = await getCollection("faq");
  if (entries.length === 0) {
    throw new Error(
      "FAQ: src/data/faq.yaml ist leer oder konnte nicht gelesen werden. Bitte die YAML-Syntax prüfen (Einrückung, Bindestriche, Doppelpunkte)."
    );
  }
  const ids = new Set<string>(RESERVIERT);
  const pruefe = (id: string) => {
    if (ids.has(id)) throw new Error(`FAQ: Die id "${id}" kommt in src/data/faq.yaml doppelt vor oder ist reserviert.`);
    ids.add(id);
  };
  const kategorien: FaqKategorie[] = entries.map((entry) => {
    pruefe(entry.id);
    return {
      id: entry.id,
      titel: entry.data.titel,
      kurz: entry.data.kurz,
      fragen: entry.data.fragen.map((f) => {
        pruefe(f.id);
        return { id: f.id, frage: f.frage, html: renderMarkdown(f.antwort), kategorie: entry.id };
      }),
    };
  });
  const byId = new Map(kategorien.flatMap((k) => k.fragen.map((f) => [f.id, f] as const)));
  return { kategorien, byId };
}

export function getFaq() {
  cache ??= load();
  return cache;
}

// Einzelne Fragen per id holen (für Startseite und Kontaktformular). Unbekannte ids brechen den Build ab.
export async function getFragen(ids: string[]): Promise<FaqFrage[]> {
  const { byId } = await getFaq();
  return ids.map((id) => {
    const frage = byId.get(id);
    if (!frage) throw new Error(`FAQ: Die Frage "${id}" gibt es nicht in src/data/faq.yaml.`);
    return frage;
  });
}

// Relative Links für strukturierte Daten (Google) absolut machen
export const absoluteLinks = (html: string) => html.replace(/href="\//g, `href="${SITE_URL}/`);
