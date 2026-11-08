# CLAUDE.md – Vereinswebseite Padel Club Freiburg e.V.

Diese Datei vor jeder Änderung lesen. Sie fasst zusammen, wie die Seite gebaut ist, wo was liegt und welche Regeln gelten. Wenn sich am Aufbau etwas ändert, diese Datei im selben Commit mit anpassen.

- Live: https://www.padelclub-freiburg.de
- Repo: `padelclubFreiburg/vereinswebsite`, Standard-Branch `main`
- Sprache der Seite: Deutsch, Ansprache **Du**, gendern mit Doppelpunkt (`Spieler:innen`)
- Verbindliches Erscheinungsbild: [`docs/ci-guide.md`](docs/ci-guide.md) (CI-Guide v1.4). Bei Farb-, Schrift-, Logo- oder Komponentenfragen gilt der Guide, nicht der bisherige Code.

## Stack

| Teil | Was |
| --- | --- |
| Framework | Astro 5 (statische Seite, `npm run build` → `dist/`) |
| Styling | Tailwind CSS v4 über `@tailwindcss/vite`, Tokens im `@theme`-Block in `src/styles/global.css`, `@tailwindcss/typography` für `prose` |
| Integrationen | `@astrojs/mdx`, `@astrojs/sitemap`, `astro-icon` (Icon-Sets `bx`, `uil`, `simple-icons`), `astro-navbar` (Mobilmenü, Dropdown), `astro-seo` |
| Schriften | `@fontsource-variable/inter` (selbst gehostet) |
| Hosting | Cloudflare Pages; `functions/` sind Cloudflare Pages Functions unter `/api/...` |
| Kontaktformular | Web3Forms (Access-Key steht öffentlich in `src/components/contactform.astro`, das ist bei Web3Forms so vorgesehen) |
| Mitgliedsantrag | easyVerein: `https://easyverein.com/public/PCFR/applicationform/20109` (die Kennung `PCFR` in der URL ist von easyVerein vorgegeben und bleibt) |
| Basis-Template | „Astroship“ von web3templates (GPL-2.0, daher `LICENSE` behalten). `README.md` ist noch die Template-Readme. |

## Befehle

```bash
npm ci --engine-strict=false   # lokal mit Node 22 nötig, siehe unten
npm run dev                    # http://localhost:4321
npm run build                  # Pflicht-Check vor jedem Commit
npm run preview
```

- `.npmrc` setzt `engine-strict=true`, und `astro` zieht `fontkitten`, das Node ≥ 24.12 verlangt. Mit Node 22 deshalb `--engine-strict=false`; der Build läuft trotzdem.
- `.astro/` steht in `.gitignore`, ist aber eingecheckt. Der Build verändert `.astro/content-assets.mjs` und `.astro/content.d.ts`. Diese Änderungen **nicht committen** (`git checkout -- .astro`).

## Aufbau

```
src/
  layouts/Layout.astro        <head> (SEO, Favicon, Fonts, global.css), Navbar, Footer
  layouts/BlogLayout.astro    ungenutzt (Blogseiten nutzen pages/blog/[slug].astro)
  styles/global.css           Tailwind-Import + Design-Tokens (@theme)
  components/
    navbar/navbar.astro       Menüeinträge (Array `menuitems`), Logo, Button „Mitglied werden“
    navbar/dropdown.astro     Dropdown für Einträge mit `children`
    footer.astro              Footer-Links (Impressum, Datenschutz, Glücksrad)
    hero.astro                Startseite oben (H1, Text, 2 Buttons, Monogramm `assets/hero.svg`)
    features.astro            „Unsere Vision“ (6 Punkte mit Icons), Anker #vision
    cta.astro                 dunkler Block „Werde jetzt Mitglied!“
    logos.astro               Partnerlogos (Array `partners`), Anker #partner
    pricing.astro             Karte für eine Mitgliedschaft
    contactform.astro         Kontaktformular (Web3Forms, Validierung inline)
    sectionhead.astro         Seitenkopf (H1 + Beschreibung) für Unterseiten
    container.astro           Breitenbegrenzung + Seitenabstand
    ui/link.astro             Link in Button-Optik (Varianten über `style`)
    ui/button.astro           echter <button> (Varianten über `style`)
  pages/                      jede Datei = eine Route
    index.astro               /            Hero, Features, Cta, Logos
    mitgliedschaft.astro      /mitgliedschaft  Preise im Array `pricing`
    team.astro                /team        aus Collection `team`
    news.astro                /news        aus Collection `blog`
    blog/[slug].astro         /blog/<slug> einzelner Beitrag
    contact.astro             /contact     Kontaktdaten + Formular
    impressum.astro, datenschutz.astro, 404.astro
  content/
    config.ts                 Schemas der Collections `blog` und `team`
    blog/*.md                 News-Beiträge, Bilder in blog/pics/
    team/*.md                 Vorstand, Fotos daneben, Reihenfolge über `order`
  assets/                     Bilder, die Astro optimiert (hero.svg, partner/*.svg)
public/                       wird 1:1 ausgeliefert
  favicon.svg, pcf-logo.png (gestapelt, hell, weißer Grund 960×960),
  logo-pcf.png (gestapelt, dunkel, transparent), opengraph.jpg, robots.txt
  anmeldung.html, success.html                       Eventseite Americano 25.07.2026 (eigenes CSS)
  one-game-challenge.html, one-game-challenge-success.html   Eventseite One-Point-Challenge
  gluecksrad/tombola.html                            Glücksrad für die Tombola (eigenes CSS)
functions/api/                Cloudflare Pages Functions für die Eventseiten
  availability.js, check-membership.js, create-checkout-session.js, stripe-webhook.js
  _lib/  event-config.js (Name, Datum, Preise, Kapazität), easyverein.js, kv-capacity.js,
         mailer.js (Resend), sheets.js (Google Sheets), stripe.js
  one-game/  dieselbe Struktur für die One-Point-Challenge (eigene Kopien der _lib-Dateien)
docs/ci-guide.md              CI-Guide (Quelle der Wahrheit für Design)
```

### Inhalte pflegen

- **News-Beitrag:** neue Datei in `src/content/blog/`. Pflicht-Frontmatter: `draft`, `title`, `snippet`, `image: { src, alt }`, `publishDate` (`"YYYY-MM-DD HH:mm"`), `author`, `category`, `tags`. Sichtbar nur mit `draft: false` und `publishDate` in der Vergangenheit (zum Build-Zeitpunkt).
- **Vorstand/Team:** Datei in `src/content/team/` mit `draft`, `order`, `name`, `title`, `avatar: { src, alt }`, `publishDate`.
- **Menü:** Array `menuitems` in `src/components/navbar/navbar.astro`.
- **Mitgliedsbeiträge:** Array `pricing` in `src/pages/mitgliedschaft.astro`.
- **Partnerlogos:** SVG nach `src/assets/partner/`, Eintrag im Array `partners` in `src/components/logos.astro`.

### Eventseiten und Functions

Die HTML-Seiten in `public/` sind eigenständig (eigenes Inline-CSS, nicht Teil des Astro-Layouts) und rufen `/api/...` auf. Umgebungsvariablen der Functions (in Cloudflare gesetzt, nie ins Repo):
`CAPACITY_KV` (KV-Binding), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `ONE_GAME_STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `CONFIRMATION_BCC`, `EASYVEREIN_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_TAB_NAME`, `ONE_GAME_SHEET_ID`, `ONE_GAME_SHEET_TAB_NAME`.
Für ein neues Event zuerst `functions/api/_lib/event-config.js` anpassen.

## Design-Regeln (Kurzfassung aus dem CI-Guide)

Ausführlich und verbindlich in [`docs/ci-guide.md`](docs/ci-guide.md). Das Wichtigste:

- **Farben nach Funktion:** Lavendel `#CEA8F0` nur für Flächen, Icon-Kreise, Logo, **nie als Text oder Icon auf Weiß**. Links und Text-Akzente in Lavendel Dark `#6F42A8`. Text und Primär-Button Anthrazit `#1F1F1F`, Sekundärtext Textgrau `#55505C`. Neon `#C8F000` nur auf dunklem Grund (Text darauf Anthrazit). Petrol `#0F4C5C` für große Flächen und Info. Waldgrün `#0B2A20` (`akzent`) ist gestrichen.
- **Tokens:** Block aus CI-Guide Abschnitt 9 in `src/styles/global.css`. Tailwind-Klassen danach benennen (`text-primary-dark`, `bg-neutraldark`, `text-text-muted`, `border-border`, `bg-signal` …), keine `slate-`/`gray-`/`blue-`-Farben.
- **Schrift:** Inter für alles. Bebas Neue (Versalien, `font-weight: 400`) nur für H1/Hero, Banner-Überschriften und einzelne große Zahlen. H2 Inter 700, H3 Inter 600. Beide Schriften selbst hosten (Fontsource), nie von Google laden.
- **Buttons:** Primär Anthrazit (Hover Lavendel Dark), auf dunklem Grund Neon (Hover `#B5D900`), Sekundär weiß mit 2-px-Anthrazit-Rahmen (Hover Lavendel Tint). Radius 4 px, Schrift 16 px/600, Mindesthöhe 44 px, Fokusring 2 px Lavendel Dark (auf dunkel Lavendel). Je Bereich ein Primär-Button.
- **Cards:** Hellgrau, 1 px Rand Warm Grau-Lila, Radius 8 px, kein Schatten. **Formularfelder:** sichtbare Beschriftung, Rand `#8A8591`, Fehler rot mit „Fehler:“ vorweg.
- **Logo:** Vereinslogo ist Artwork, nie nachsetzen. Header: horizontales Logo, Footer: Variante für dunklen Grund, Favicon: Monogramm. `theme-color` `#1F1F1F`. Das Liga-Logo gehört nur auf Liga-Seiten.
- **Namen:** „Padel Club Freiburg e.V.“, kurz „PCF“, nie „PCFR“. Footer „© 2026 Padel Club Freiburg e.V.“. Seitentitel ohne Doppelung („Willkommen | Padel Club Freiburg e.V.“).

## Arbeitsweise

1. Diese Datei und bei Design-Themen den CI-Guide lesen.
2. Änderungen klein halten, bestehende Komponenten wiederverwenden statt neue Stile zu erfinden.
3. `npm run build` muss fehlerfrei durchlaufen. Bei sichtbaren Änderungen Screenshots (Desktop 1280 px, Mobil 390 px) prüfen.
4. `.astro/`-Änderungen aus dem Build verwerfen, dann committen.
5. Texte auf Deutsch, Du-Form, aktiv und kurz („Melde dich an“ statt „Die Anmeldung erfolgt über“).

## Stand und offene Punkte

- **Rebranding nach CI-Guide v1.4:** geplant, noch nicht umgesetzt (Entwurf liegt beim Vorstand zur Abstimmung).
- **FAQ-Seite `/faq`:** geplant. Quelle: FAQ-PDF des Vereins, Stand Sept. 2026.
- Logo-Paket `PCF-Logos` (SVG/PNG aus CI-Guide 5.3) liegt noch nicht im Repo; vorhanden sind nur `public/pcf-logo.png`, `public/logo-pcf.png` und das Monogramm `src/assets/hero.svg`.
- Bekannter Fehler: `src/pages/blog/[slug].astro` filtert `draft` nicht. Die Template-Entwürfe sind deshalb öffentlich erreichbar (z. B. `/blog/kitchensink`) und stehen in der Sitemap.
- Ungenutzte Template-Reste: `src/layouts/BlogLayout.astro`, Entwürfe `complete-guide-fullstack-development.md`, `how-to-become-frontend-master.md`, `kitchensink.mdx`, alte Bilder (`*_old.*`, `123hero.png`, `hero-alt.png`, `hero2.svg`, `hero-source.svg`).
