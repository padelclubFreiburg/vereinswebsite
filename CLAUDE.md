# CLAUDE.md – Vereinswebseite Padel Club Freiburg e.V.

Diese Datei vor jeder Änderung lesen. Sie fasst zusammen, wie die Seite gebaut ist, wo was liegt und welche Regeln gelten. Wenn sich am Aufbau etwas ändert, diese Datei im selben Commit mit anpassen.

- Live: https://www.padelclub-freiburg.de
- Repo: `padelclubFreiburg/vereinswebsite`, Standard-Branch `main`
- Sprache der Seite: Deutsch, Ansprache **Du**, gendern mit Doppelpunkt (`Spieler:innen`). Impressum und Datenschutz bleiben beim „Sie“.
- Verbindliches Erscheinungsbild: [`docs/ci-guide.md`](docs/ci-guide.md) (CI-Guide v1.4). Bei Farb-, Schrift-, Logo- oder Komponentenfragen gilt der Guide, nicht der bisherige Code.

## Stack

| Teil | Was |
| --- | --- |
| Framework | Astro 5 (statische Seite, `npm run build` → `dist/`) |
| Styling | Tailwind CSS v4 über `@tailwindcss/vite`. Tokens und Schrift-Stile in `src/styles/global.css`, `@tailwindcss/typography` für `prose` (News-Beiträge) |
| Integrationen | `@astrojs/mdx`, `@astrojs/sitemap`, `astro-icon` mit **Lucide** (`lucide:<name>`, https://lucide.dev/icons), `astro-navbar` (Mobilmenü, Dropdown), `astro-seo`, `marked` (Markdown in FAQ-Antworten) |
| Schriften | Inter (`@fontsource-variable/inter`) und Bebas Neue (`@fontsource/bebas-neue`, nur Latin), selbst gehostet. Für die Eventseiten liegt Inter zusätzlich unter `public/fonts/`. Nie Google Fonts einbinden. |
| Hosting | Cloudflare Pages; `functions/` sind Cloudflare Pages Functions unter `/api/...` |
| Kontaktformular | Web3Forms (Access-Key steht öffentlich in `src/components/contactform.astro`, das ist bei Web3Forms so vorgesehen) |
| Mitgliedsantrag | easyVerein: `https://easyverein.com/public/PCFR/applicationform/20109` (die Kennung `PCFR` in der URL ist von easyVerein vorgegeben und bleibt) |
| Basis-Template | „Astroship“ von web3templates (GPL-2.0, daher `LICENSE` behalten) |

## Befehle

```bash
npm ci --engine-strict=false   # lokal mit Node 22 nötig, siehe unten
npm run dev                    # http://localhost:4321
npm run build                  # Pflicht-Check vor jedem Commit
npm run preview
```

- `.npmrc` setzt `engine-strict=true`, und `astro` zieht `fontkitten`, das Node ≥ 24.12 verlangt. Mit Node 22 deshalb `--engine-strict=false`; der Build läuft trotzdem. Pakete genauso installieren (`npm install --engine-strict=false …`).
- `.astro/` steht in `.gitignore`, ist aber eingecheckt. Der Build verändert `.astro/content-assets.mjs` und `.astro/content.d.ts`. Diese Änderungen **nicht committen** (`git checkout -- .astro`).

## Aufbau

```
src/
  layouts/Layout.astro        <head> (Titel „Seite | Padel Club Freiburg e.V.“, Beschreibung, OG, Favicons,
                              theme-color, Fonts), Sprunglink, Navbar, <main id="inhalt">, Footer.
                              Props: title (leer = „Willkommen“), description. Slot "head" für JSON-LD o. Ä.
  styles/global.css           Tokens (@theme), Basis (Fokusring, Rahmenfarbe), Utilities type-hero, type-banner,
                              type-big-number, type-h2, type-h3, type-body, icon-stroke; Farben für .prose und .faq-answer
  components/
    navbar/navbar.astro       Menü (Array `menuitems`), horizontales Logo, Button „Mitglied werden“, Mobilmenü
    navbar/dropdown.astro     Dropdown für Einträge mit `children`
    footer.astro              dunkler Footer mit Logo (Variante „dunkel“) und Linkspalten (Array `columns`)
    hero.astro                Startseite oben: H1 zweizeilig (Bebas), Text, Buttons, Monogramm assets/hero.svg
                              (nur ab lg/1024 px neben dem Text; darunter ausgeblendet, das Logo steht im Header)
    features.astro            „Unsere Vision“ (6 Punkte, Lucide-Icons auf Lavendel-Kreis), Anker #vision
    cta.astro                 zwei Boxen: „Werde jetzt Mitglied!“ (dunkel, Neon-Button, Spielfeldlinien) und
                              „PCF Liga“ (Lavendel, Eckdaten im Array `ligaFakten`, Link zur Liga-Seite)
    court-lines.astro         Spielfeld-Muster (CI 6), nur auf dunklem Grund
    logos.astro               Partnerlogos (Array `partners`), Anker #partner
    pricing.astro             Card für eine Mitgliedschaft
    contactform.astro         Kontaktformular (Web3Forms), Feld „Worum geht's?“ mit FAQ-Vorschlägen
    faq/faq-item.astro        eine aufklappbare Frage (<details>), optional mit Sprungmarke und „Link kopieren“
    faq/faq-teaser.astro      Block „Noch Fragen?“ auf der Startseite (Fragen-ids im Code)
    sectionhead.astro         Seitenkopf der Unterseiten (H1 in Bebas + Beschreibung)
    container.astro           Content-Spalte (max. 1120 px, Rand 16/24 px)
    ui/button-styles.ts       Button-System (primary, secondary, signal) – einzige Quelle für Button-Klassen
    ui/link.astro             Link in Button-Optik (Navigation), Prop `variant`
    ui/button.astro           echter <button> (Aktionen), Prop `variant`
  lib/
    faq.ts                    lädt src/data/faq.yaml, rendert Markdown, prüft doppelte ids; getFaq(), getFragen(ids)
    kontakt-themen.ts         Themen im Kontaktformular und die passenden FAQ-ids
    liga.ts                   LIGA_URL (https://liga.padelclub-freiburg.de) für Menü, Footer und Startseite
  data/
    faq.yaml                  Häufige Fragen (Kategorien → Fragen, Antworten in Markdown)
    courts.yaml               Courts in der Region (für /faq#courts)
  pages/                      jede Datei = eine Route
    index.astro               /            Hero, Vision, Mitglied- und Liga-Box, „Noch Fragen?“, Partner
    faq.astro                 /faq         Suche, Kategorien, Fragen, Courts, FAQPage-JSON-LD
    contact.astro             /contact     FAQ-Hinweis, Kontaktdaten, Formular (?thema=… wählt Thema vor)
    mitgliedschaft.astro      /mitgliedschaft  Preise im Array `pricing`
    team.astro                /team        aus Collection `team`
    news.astro                /news        aus Collection `blog`
    blog/[slug].astro         /blog/<slug> einzelner Beitrag (nur veröffentlichte)
    impressum.astro, datenschutz.astro, 404.astro
  content/
    config.ts                 Schemas der Collections blog, team, faq, courts
    blog/*.md                 News-Beiträge, Bilder in blog/pics/
    team/*.md                 Vorstand, Fotos daneben, Reihenfolge über `order`
  assets/
    logos/                    Logo-Paket PCF-Logos (PNG = Originale, SVG = nachvektorisiert), siehe LIESMICH.txt
    hero.svg                  Monogramm für die Startseite
    partner/                  Partnerlogos
  utils/all.js                getFormattedDate() → „5. Juli 2026“
public/                       wird 1:1 ausgeliefert
  favicon.svg, favicon-32.png, apple-touch-icon.png, opengraph.jpg (1200 × 630), robots.txt
  fonts/                      InterVariable.woff2 + OFL-Lizenztexte (für die Eventseiten)
  pcf-logo.png, logo-pcf.png  Logos für Eventseiten und Glücksrad
  anmeldung.html, success.html                       Eventseite Americano 25.07.2026 (eigenes CSS)
  one-game-challenge.html, one-game-challenge-success.html   Eventseite One-Point-Challenge
  gluecksrad/tombola.html                            Glücksrad für die Tombola (eigenes CSS und eigene Schriften)
functions/api/                Cloudflare Pages Functions für die Eventseiten
  availability.js, check-membership.js, create-checkout-session.js, stripe-webhook.js
  _lib/  event-config.js (Name, Datum, Preise, Kapazität), easyverein.js, kv-capacity.js,
         mailer.js (Resend), sheets.js (Google Sheets), stripe.js
  one-game/  dieselbe Struktur für die One-Point-Challenge (eigene Kopien der _lib-Dateien)
docs/ci-guide.md              CI-Guide (Quelle der Wahrheit für Design)
```

### Inhalte pflegen

- **Häufige Fragen:** `src/data/faq.yaml`. Anleitung steht oben in der Datei. Jede Frage hat eine feste `id` (Link `/faq#id`), Antworten in Markdown. Links auf andere Fragen als `/faq#id`, auf Courts als `/faq#courts`, aufs Formular mit Thema als `/contact?thema=training`. Doppelte ids, fehlende Felder oder kaputtes YAML brechen den Build ab. Den „Stand“ oben auf der Seite in `src/pages/faq.astro` (Konstante `STAND`) mitpflegen. Welche Fragen auf der Startseite und im Kontaktformular erscheinen, steht in `faq-teaser.astro`, `contact.astro` und `lib/kontakt-themen.ts`.
- **Courts:** `src/data/courts.yaml`. Ohne `whatsapp` wird kein WhatsApp-Link angezeigt.
- **News-Beitrag:** neue Datei in `src/content/blog/`. Pflicht-Frontmatter: `draft`, `title`, `snippet`, `image: { src, alt }`, `publishDate` (`"YYYY-MM-DD HH:mm"`), `author`, `category`, `tags`. Sichtbar (Liste und eigene Seite) nur mit `draft: false` und `publishDate` in der Vergangenheit (zum Build-Zeitpunkt).
- **Vorstand/Team:** Datei in `src/content/team/` mit `draft`, `order`, `name`, `title`, `avatar: { src, alt }`, `publishDate`.
- **Menü:** Array `menuitems` in `src/components/navbar/navbar.astro` (externe Links mit `external: true` bekommen ein Pfeil-Icon; der Platz bei 1024 px ist knapp, vor neuen Einträgen dort prüfen); Footer-Links im Array `columns` in `footer.astro`.
- **PCF Liga:** eigene Seite auf liga.padelclub-freiburg.de. Auf der Vereinsseite: Menüpunkt, Footer-Link, Box auf der Startseite (`cta.astro`) und FAQ-Frage `pcf-liga`. Ändern sich Eckdaten der Liga (Kosten, Start, Format), Box und FAQ mitpflegen. Das Liga-Logo darf nicht auf Lavendel stehen (CI 10.2), dort nur einfarbig Anthrazit.
- **Mitgliedsbeiträge:** Array `pricing` in `src/pages/mitgliedschaft.astro`. Beiträge stehen auch in der FAQ (`beitrag`) und in der Seitenbeschreibung – mitändern.
- **Partnerlogos:** SVG nach `src/assets/partner/`, Eintrag im Array `partners` in `src/components/logos.astro`.

### Eventseiten und Functions

Die HTML-Seiten in `public/` sind eigenständig (eigenes Inline-CSS, nicht Teil des Astro-Layouts) und rufen `/api/...` auf. Ihre Optik wurde beim Rebranding bewusst nicht geändert; Inter kommt dort aus `public/fonts/`. Neue Eventseiten möglichst als Astro-Seite im neuen Design bauen.
Umgebungsvariablen der Functions (in Cloudflare gesetzt, nie ins Repo):
`CAPACITY_KV` (KV-Binding), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `ONE_GAME_STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `CONFIRMATION_BCC`, `EASYVEREIN_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_TAB_NAME`, `ONE_GAME_SHEET_ID`, `ONE_GAME_SHEET_TAB_NAME`.
Für ein neues Event zuerst `functions/api/_lib/event-config.js` anpassen.

## Design-Regeln (Kurzfassung aus dem CI-Guide)

Ausführlich und verbindlich in [`docs/ci-guide.md`](docs/ci-guide.md). Das Wichtigste:

- **Farben nach Funktion:** Lavendel `#CEA8F0` (`primary`) nur für Flächen, Icon-Kreise, Logo, **nie als Text oder Icon auf Weiß**. Links und Text-Akzente in Lavendel Dark `#6F42A8` (`primary-dark`). Text und Primär-Button Anthrazit `#1F1F1F` (`neutraldark`), Sekundärtext Textgrau `#55505C` (`text-muted`). Neon `#C8F000` (`signal`) nur auf dunklem Grund (Text darauf Anthrazit). Petrol `#0F4C5C` (`secondary`) für große Flächen und Info. Waldgrün ist gestrichen.
- **Tokens:** nur die Tailwind-Klassen aus dem `@theme`-Block nutzen (`text-primary-dark`, `bg-neutraldark`, `text-text-muted`, `border-border`, `border-field-border`, `bg-signal`, `bg-primary-tint`, `bg-neutrallight`, `text-danger` …), keine `slate-`/`gray-`/`blue-`-Farben. Maße: `min-h-touch`/`size-touch` (44 px), `max-w-content`, `rounded-sm` (4 px), `rounded-lg` (8 px).
- **Schrift:** Inter für alles. Bebas Neue (`type-hero`, `type-banner`, `type-big-number`) nur für H1/Seitentitel, Banner-Überschriften und einzelne große Zahlen, nie für Überschriften mit mehr als etwa fünf Wörtern (Beitragstitel sind deshalb Inter). H2 `type-h2` (Inter 700), H3 `type-h3` (Inter 600), Fließtext `type-body`. Unter 16 px nur Badges (14 px).
- **Buttons:** immer über `ui/link.astro` bzw. `ui/button.astro` mit `variant` = `primary` (Anthrazit, Hover Lavendel Dark), `secondary` (Rahmen, Hover Lavendel Tint) oder `signal` (Neon, nur auf dunklem Grund). Je Bereich ein Primär-Button. Fokusring kommt global aus `global.css`; dunkle Bereiche bekommen die Klasse `on-dark` (Fokusring Lavendel).
- **Komponenten:** Cards Hellgrau, 1 px Rand `border-border`, `rounded-lg`, `p-6`, kein Schatten. Badges `bg-primary-tint text-primary-dark text-sm font-semibold px-3 py-1 rounded-sm`. Hinweisbox weiß mit 1 px Rand und 4 px Statuslinie links (`border-l-4 border-l-secondary|success|warning|danger`) und Statuswort („Info:“, „Fehler:“ …). Formularfelder mit sichtbarem Label, Rand `border-field-border`, Fehler rot mit „Fehler:“ und `aria-invalid`.
- **Icons:** Lucide über `<Icon name="lucide:…" class="icon-stroke size-6" aria-hidden="true" />` (1,75 px Strich). Auf Lavendel-Kreis in Anthrazit.
- **Logo:** Vereinslogo ist Artwork, nie nachsetzen. Header: `pcf-logo-horizontal-hell-transparent.png`, Footer: `…-dunkel-transparent.png` (über `astro:assets` mit `densities={[1, 2]}`, nie größer als die Pixelhöhe). Favicon: Monogramm. `theme-color` `#1F1F1F`. Das Liga-Logo gehört nur auf Liga-Seiten.
- **Namen:** „Padel Club Freiburg e.V.“, kurz „PCF“, nie „PCFR“. Footer „© Jahr Padel Club Freiburg e.V.“. Seitentitel ohne Doppelung (Layout hängt den Vereinsnamen an).

## Arbeitsweise

1. Diese Datei und bei Design-Themen den CI-Guide lesen.
2. Änderungen klein halten, bestehende Komponenten wiederverwenden statt neue Stile zu erfinden.
3. `npm run build` muss fehlerfrei durchlaufen. Bei sichtbaren Änderungen Screenshots (Desktop 1280 px, Mobil 390 px) prüfen, auch auf waagerechtes Scrollen.
4. `.astro/`-Änderungen aus dem Build verwerfen, dann committen.
5. Texte auf Deutsch, Du-Form, aktiv und kurz („Melde dich an“ statt „Die Anmeldung erfolgt über“).
6. Beim Testen des Kontaktformulars nie echt absenden (Web3Forms schickt sonst eine Mail an den Verein); im Browser-Test die Anfrage abfangen.

## Stand und offene Punkte

- **Rebranding nach CI-Guide v1.4:** umgesetzt (November 2026). Die Abschnitte „Vorschlag 1.2/1.3“ im Guide sind vom Vorstand noch zu bestätigen.
- **FAQ-Seite `/faq`:** umgesetzt. Quelle: FAQ-PDF des Vereins, Stand September 2026 (gegendert, Überschneidungen zusammengelegt).
- **Logos:** Die SVGs im Paket sind nachvektorisiert, Original-Vektoren, einfarbig Anthrazit und ein Favicon-Satz vom Designer fehlen noch (CI-Guide 12).
- **Datenschutzerklärung:** spricht nur von Links zu Instagram; die FAQ verlinkt inzwischen auch auf YouTube, ARD Mediathek und WhatsApp-Gruppen (nur Links, keine Einbettung). Bei der nächsten Überarbeitung prüfen.
- **Hauptüberschrift Startseite:** ab Tablet zweizeilig; auf dem Handy dreizeilig, weil die Display-Schrift laut CI mobil mindestens 60 px groß ist (unter 390 px Breite skaliert sie leicht herunter).
