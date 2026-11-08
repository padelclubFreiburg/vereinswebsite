# Padel Club Freiburg e.V. – CI-Guide

**Version 1.4 · Stand 03.11.2026 · Version 1.0 von der Vorstandschaft freigegeben; die Änderungen in 1.1 (Abschnitte 1, 4, 5, 9, 10, 11, 12), 1.2 (Abschnitte 2.3, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13) 1.3 (Abschnitte 1, 4, 5, 10, 11, 12, 13: Logo-Set der PCF Liga) und 1.4 (Abschnitte 5, 12, 13: Dateinamen und SVG-Behelf der Vereinslogos) sind noch zu bestätigen. Was neu und noch nicht abgestimmt ist, steht als „Vorschlag 1.2“ bzw. „Vorschlag 1.3“ im Text.**

Dieses Dokument ist die verbindliche Referenz für das Erscheinungsbild des Padel Club Freiburg e.V. (Webseite, Social Media, Print, Liga-App). Es löst den bisherigen reinen Farbguide ab. Farben und Maße stehen als Design-Tokens am Ende und gelten für alle digitalen Auftritte gleich.

---

## 1. Marke in Kürze

| Punkt | Festlegung |
| --- | --- |
| Vereinsname (voll) | Padel Club Freiburg e.V. |
| Kurzform | PCF |
| Liga | PCF Liga |
| Nicht verwenden | „PCFR“ |
| Claim | Die Heimat für Padel in Freiburg. |
| Positionierung | Erster Padel-Verein im Raum Freiburg |
| Logo-Schrift | Teil des Logo-Artworks, wird nie nachgesetzt (siehe Abschnitt 5) |
| Logos | Vereinslogo (P-Monogramm, Abschnitt 5) für den Verein; Liga-Logo (Spielfeld-Monogramm, Abschnitt 10.2) nur für die PCF Liga (Vorschlag 1.3) |
| Ansprache | Du |
| Charakter | einladend, sportlich, klar, offen für alle Spielstärken und Altersgruppen |

---

## 2. Farben

### 2.1 Rollenmatrix

Farben werden nach **Funktion** vergeben, nicht nach Einsatzort.

| Rolle | Farbe | HEX | Regel |
| --- | --- | --- | --- |
| Marke, Fläche | Lavendel | `#CEA8F0` | Flächen, Icon-Kreise, Illustration, Logo. Nie als Text oder Icon auf Weiß. |
| Link, Text-Akzent | Lavendel Dark | `#6F42A8` | Links, Hover, Fokusring auf hellem Grund, Badge-Schrift. |
| Lavendel-Tönung | Lavendel Tint | `#F6F0FC` | Sektionen, Zebrazeilen, Hover-Flächen, Badge-Hintergrund. |
| Text, Primäraktion | Anthrazit | `#1F1F1F` | Überschriften, Text, Primär-Button, Footer, dunkle Flächen. |
| Sekundärtext | Textgrau | `#55505C` | Fließtext-Ergänzungen, Beschreibungen, Navigation. |
| Fläche | Hellgrau | `#F2F2F2` | Sektionen und Cards, immer mit 1-px-Rand in Warm Grau-Lila. |
| Rahmen, Ruhe | Warm Grau-Lila | `#D6D1DB` | Rahmen, Trenner, ruhige Flächen, Print; Text auf Anthrazit. |
| Formularfeld-Rand | Feldrand | `#8A8591` | Ränder von Eingabefeldern (mindestens 3:1 zum Grund). |
| Signal | Neon | `#C8F000` | Button auf dunklem Grund, Scores, Live-Marker. Text darauf immer Anthrazit. |
| Sekundärfläche | Petrol | `#0F4C5C` | Social-Media-Flächen, große Flächen, Info-Status. Weiß oder Neon darauf. |
| Hintergrund | Weiß | `#FFFFFF` | Standardhintergrund. |

**Entfällt:** Waldgrün `#0B2A20`. Es kommt im Logo nicht vor und liegt mit 1,07:1 praktisch auf Anthrazit. Alle bisherigen Waldgrün-Buttons werden durch das Button-System unten ersetzt.

### 2.2 Statusfarben

| Status | Farbe | HEX | Kontrast auf Weiß |
| --- | --- | --- | --- |
| Erfolg | Grün | `#1B7F4B` | 5,02:1 |
| Warnung | Bernstein | `#8A5300` | 6,33:1 |
| Fehler | Rot | `#C62828` | 5,62:1 |
| Info | Petrol | `#0F4C5C` | 9,51:1 |

Auf einem Soft-Hintergrund erreicht Erfolg nur 4,43:1. Dort den Text in Anthrazit setzen und die Statusfarbe als Linie links oder als Icon verwenden.

### 2.3 Kontraste (WCAG 2.x)

AA verlangt 4,5:1 für normalen Text und 3:1 für großen Text und UI-Elemente.

| Kombination | Kontrast | Einsatz |
| --- | --- | --- |
| Anthrazit auf Weiß | 16,48:1 | Text, Überschriften |
| Textgrau auf Weiß | 7,81:1 | Sekundärtext |
| Textgrau auf Hellgrau | 6,98:1 | Text in Cards |
| Lavendel Dark auf Weiß | 6,95:1 | Links |
| Lavendel Dark auf Lavendel Tint | 6,22:1 | Badges |
| Anthrazit auf Lavendel | 8,23:1 | Text auf Lavendel-Flächen |
| Lavendel auf Anthrazit | 8,23:1 | Text und Icons auf dunklem Grund |
| Anthrazit auf Neon / Neon auf Anthrazit | 12,50:1 | Neon-Button, Neon-Akzente |
| Weiß auf Petrol | 9,51:1 | Text auf Petrol |
| Neon auf Petrol | 7,21:1 | Akzente auf Petrol |
| Warm Grau-Lila auf Anthrazit | 10,99:1 | Fußzeilen-Links, Beschreibungen auf dunkel |
| Feldrand auf Weiß | 3,59:1 | Formularfelder |
| Textgrau auf Lavendel Tint | 6,99:1 | Beschreibungen in Sektionen |
| Anthrazit auf Hellgrau | 14,72:1 | Überschriften in Cards |
| Lavendel Dark auf Hellgrau | 6,21:1 | Links in Cards |
| Erfolg auf Lavendel Tint | 4,49:1 | knapp über der Grenze: Text trotzdem in Anthrazit, Erfolg nur als Linie oder Icon |
| **Lavendel auf Weiß** | **2,00:1** | **nur Flächen, nie Text oder Icon** |
| **Neon auf Weiß** | **1,32:1** | **verboten für Text, Icons und Button-Kanten** |
| **Warm Grau-Lila auf Weiß** | **1,50:1** | **nur Card-Rand und Trenner, die nichts allein tragen; nie als Rand eines Bedienelements (dafür Feldrand 3,59:1)** |

### 2.4 Verteilung

70 % Neutral (Weiß, Anthrazit, Grautöne), 20 % Lavendel (Flächen, Tönungen, Illustration), 10 % Signal (Neon, Petrol).

---

## 3. Buttons und Zustände

| Variante | Aufbau | Hover |
| --- | --- | --- |
| Primär auf hellem Grund | Anthrazit gefüllt, weiße Schrift (16,48:1) | Lavendel Dark gefüllt, weiße Schrift (6,95:1) |
| Primär auf dunklem Grund | Neon gefüllt, Anthrazit-Schrift (12,50:1) | `#B5D900` gefüllt (10,12:1) |
| Sekundär | Weiß, 2 px Anthrazit-Rahmen, Anthrazit-Schrift | Lavendel Tint als Fläche |

- **Maße:** Radius 4 px, 2 px Rahmen, Schrift 16 px in Gewicht 600, Mindesthöhe 44 px.
- **Innenabstand (Vorschlag 1.2):** 24 px seitlich (`space-5`), Mindestbreite 44 px. Beschriftung mit Verb nach vorn („Melde dein Team an“).
- **Link als Button:** Eine Navigation innerhalb der Seite oder zu einer anderen Seite ist ein Link in Button-Optik (gleiche Varianten und Maße), eine Aktion ist ein echter Button.
- **Deaktiviert (Vorschlag 1.2):** halbe Deckkraft, Cursor „nicht erlaubt“, Tastatur und Klick sind gesperrt. Ein deaktivierter Button erklärt in der Nähe, warum, denn er trägt keinen Kontrast-Anspruch.
- **Je Bereich ein Primär-Button (Vorschlag 1.2):** weitere Aktionen sind Sekundär.
- **Fokus:** 2-px-Ring in Lavendel Dark auf hellem Grund, in Lavendel auf dunklem Grund, Abstand 2–3 px. Der Ring ist Pflicht und wird nie ausgeblendet.
- **Neon-Button nie auf Weiß:** Neon erreicht dort 1,32:1, die Kante verschwindet.

---

## 4. Typografie

Zwei Schriften mit getrennten Aufgaben. Die Schrift im Logo ist **Logo-Artwork** und wird nie nachgesetzt (Abschnitt 5). Ihr Name ist nicht bekannt.

### 4.1 Display-Schrift: Bebas Neue

Schmale, fette Versal-Grotesk, die der Logo-Schrift „PADEL CLUB“ am nächsten kommt. Frei nutzbar (SIL Open Font License). Sie hat nur Versalien und ein Gewicht, deshalb immer `text-transform: uppercase`, `font-weight: 400` und `font-synthesis: none`.

**Einsatz nur für:**

- H1 und Hero-Überschriften
- Überschriften in Bannern und Teasern (Mitglied werden, Liga)
- einzelne große Zahlen (Score, Platz, Datum)

**Nicht für:** H2 und H3, Fließtext, Buttons, Navigation, Formulare, Tabellen und lange Überschriften (mehr als etwa fünf Wörter).

### 4.2 Text- und UI-Schrift: Inter (Variable)

Für alles andere. Frei nutzbar (SIL Open Font License), mit tabellarischen Ziffern.

### 4.3 Skala

| Ebene | Schrift | Größe / Zeilenhöhe | Gewicht | Laufweite | Farbe |
| --- | --- | --- | --- | --- | --- |
| H1, Hero | Bebas Neue, Versalien | 96 px, Faktor 0,92 (mobil ab 60 px) | 400 | +0,01 em | Anthrazit |
| Banner-Überschrift | Bebas Neue, Versalien | 64 px, Faktor 0,95 (mobil ab 44 px) | 400 | +0,01 em | Anthrazit oder Weiß |
| Große Zahl | Bebas Neue | 48–96 px | 400 | +0,01 em | Anthrazit, auf dunklem Grund Neon |
| H2 | Inter | 48 / 48 px (mobil 32–48 px) | 700 | −0,025 em | Anthrazit |
| H3 | Inter | 18 / 28 px | 600 | normal | Anthrazit |
| Fließtext | Inter | 18 / 28 px | 400 | normal | Textgrau |
| Buttons | Inter | 16 px | 600 | normal | je nach Variante |
| Beschriftung Formularfeld (Vorschlag 1.2) | Inter | 16 / 24 px | 600 | normal | Anthrazit |
| Hilfetext (Vorschlag 1.2) | Inter | 16 / 24 px | 400 | normal | Textgrau |
| Fehlertext (Vorschlag 1.2) | Inter | 16 / 24 px | 400 | normal | Rot |
| Tabellenzelle und -kopf (Vorschlag 1.2) | Inter, tabellarische Ziffern | 16 / 24 px | 400 und 600 (Kopf) | normal | Anthrazit, Kopf Weiß |
| Badge (Vorschlag 1.2) | Inter | 14 / 20 px | 600 | normal | je nach Variante |
| Hinweisbox (Vorschlag 1.2) | Inter | 16 / 24 px | 400, Titel 600 | normal | Anthrazit |

### 4.4 Regeln

- Negative Laufweite nur bei Inter-Überschriften ab 48 px (H2). Die Display-Schrift erhält eine leicht positive Laufweite.
- Tabellen und Ranglisten in Inter mit `font-variant-numeric: tabular-nums`, Zahlen rechtsbündig. Die Display-Schrift nur für einzelne große Zahlen außerhalb von Tabellen.
- Überschriften sind Anthrazit (auf dunklem Grund Weiß), **nie Lavendel**. Lavendel scheitert dort am Kontrast.
- **Einbindung:** beide Schriften selbst hosten, z. B. über Fontsource (`@fontsource/bebas-neue`, `@fontsource-variable/inter`), nicht von Google-Servern laden.
- **Font-Stacks:** Display `"Bebas Neue", "Arial Narrow", Impact, sans-serif`; Text `"Inter Variable", Inter, system-ui, sans-serif`. Nunito Sans, Public Sans und Bricolage Grotesque werden aus dem CSS entfernt.
- Wird der Name der Logo-Schrift bekannt und ist sie frei lizenzierbar, ersetzt sie Bebas Neue, aber nur in der Display-Rolle.
- **Liga-Wortmarke (Vorschlag 1.3):** Die Wortmarke „PCF LIGA“ im Liga-Logo ist aus Bebas Neue gebaut und in Pfade umgewandelt. Sie ist damit Artwork wie das Vereinslogo: Immer die Datei einsetzen, nie mit Bebas Neue nachsetzen, auch nicht für einzelne Varianten. Die Unterzeile „PADEL CLUB FREIBURG“ ist Inter in Gewicht 600, ebenfalls in Pfaden. Ein Wechsel der Display-Schrift ändert das Liga-Logo nicht.
- **Schriftdateien (Vorschlag 1.2):** WOFF2 in der Latin-Teilmenge (deckt Umlaute, ß und €). Bebas Neue in Gewicht 400, Inter Variable in den Gewichten 100–900. Die Lizenztexte der OFL liegen bei. Die Dateien liegen im Design-System unter `fonts/` (`BebasNeue-Regular.woff2`, `InterVariable.woff2`).
- **Größen unter 16 px** gibt es nur für das Badge (14 px). Fließtext und Formulare bleiben bei 16 px und mehr.

---

## 5. Logo

Dieser Abschnitt gilt für das **Vereinslogo** des Padel Club Freiburg e.V. Das eigene Logo der PCF Liga steht in Abschnitt 10.2 (Vorschlag 1.3).

**Welches Logo wann (Vorschlag 1.3):**

| Absender oder Inhalt | Logo |
| --- | --- |
| Verein allgemein: Mitgliedschaft, Training, Events, Sponsoring, Impressum, Briefkopf, Vereinswebseite | Vereinslogo (dieser Abschnitt) |
| Alles, was nur die Liga betrifft: Liga-App, `liga.padelclub-freiburg.de`, Spielplan, Ranglisten, Liga-Social-Posts, Urkunden, Trikots der Liga | Liga-Logo (Abschnitt 10.2) |
| Liga-Material, das den Verein als Veranstalter zeigt (Plakat, Sponsorenwand, Footer der Liga-Seite) | Liga-Logo als Hauptlogo; Vereinslogo kleiner als Absender, zum Beispiel im Footer oder in der Fußzeile |

Vereinslogo und Liga-Logo werden nie zu einem neuen Zeichen kombiniert, und das P-Monogramm wird nicht in die Liga-Wortmarke eingesetzt.

Das Logo besteht aus dem **P-Monogramm** (Anthrazit-P, lavendelfarbener Schwung, Tennisball in Neon mit weißer und dunkler Kontur) und der **Wortmarke**: „PADEL CLUB“ in einer sehr schmalen, fetten Versal-Grotesk, darunter „FREIBURG“ in einer leichten, weit gesperrten Grotesk. Die Master-Variante ist **gestapelt** (Monogramm oben, Wortmarke darunter).

**Die Logo-Schrift ist Artwork.** Die Wortmarke wird immer als Datei eingesetzt und nie neu gesetzt, weder in Inter noch in Bebas Neue. „e.V.“ gehört nicht ins Logo, sondern in Fließtext, Impressum und Footer-Zeile.

**Farben im Logo:** Anthrazit `#1F1F1F`, Lavendel `#CEA8F0`, Neon `#C8F000`. Die Wortmarke ist Anthrazit, Lavendel steckt nur im Schwung des Monogramms.

### 5.1 Varianten

| Variante | Status | Einsatz |
| --- | --- | --- |
| Gestapelt, Vollfarbe | Master, liegt vor (PNG) | Titel, Print, Social, Aushänge |
| Monogramm allein, Vollfarbe | liegt vor als Behelf (PNG), aus dem Master ausgeschnitten | Favicon, Avatar, kleine Formate |
| Horizontal (Monogramm links, Wortmarke rechts) | liegt vor als Behelf (PNG) aus den beiden Originalteilen, sauber vom Designer zu liefern | Header der Webseite, Briefkopf |
| Variante für dunklen Grund (Anthrazit-Anteile weiß, Lavendel und Neon bleiben) | liegt vor für gestapelt, horizontal und Monogramm (PNG), vom Designer zu bestätigen | Footer, dunkle Flächen, Fotos mit Overlay |
| Einfarbig Anthrazit | fehlt | Stempel, Schwarz-Weiß-Druck |
| Vektordateien (SVG) | liegen vor als Behelf, nachvektorisiert aus den PNGs (siehe 5.3); die Original-Vektoren des Designers fehlen | Web und alles, was größer als die PNG-Auflösung wird |

**Wie das Behelfs-Logo gebaut ist (Vorschlag 1.2):** Monogramm und Wortmarke sind unverändert aus den Master-Dateien ausgeschnitten, nichts ist nachgezeichnet. Im horizontalen Logo steht die Wortmarke mittig zum Monogramm, der Abstand dazwischen beträgt eine Ballbreite, die Wortmarke ist etwa 62 % so hoch wie das Monogramm. Das Monogramm allein ist derselbe Ausschnitt ohne Wortmarke.

### 5.2 Regeln

- **Schutzraum:** eine Ballbreite des Monogramms rundum.
- **Mindestgröße (Vorschlag, im Einsatz zu prüfen):** Monogramm 24 px bzw. 8 mm; gestapelt 72 px bzw. 20 mm Höhe, weil „FREIBURG“ sonst unleserlich wird; horizontal 44 px bzw. 12 mm Höhe.
- **Höchstgröße der PNG-Dateien (Vorschlag 1.2):** Die Behelfs-Dateien nie über ihre Pixelhöhe hinaus vergrößern (Tabelle in 5.3). Für Print in Originalgröße und für Plakate die Original-Vektordatei vom Designer verwenden (die nachvektorisierten SVGs aus 5.3 weichen leicht von der Zeichnung ab).
- **Verboten:** verzerren, umfärben, neu setzen, Elemente trennen und anders anordnen als in 5.1, auf unruhige Fotos ohne Overlay setzen.
- **Header der Webseite:** zeigt das horizontale Logo und nicht mehr einen Textzug. Die bisherige Text-Wortmarke („Padel Club“ in Lavendel, „Freiburg e.V.“ in Schwarz) entfällt, sie war kein Teil des Logos.
- **Social-Avatar:** Monogramm auf Weiß, auf dunklem Grund die Variante für dunklen Grund.
- **Webseite:** `theme-color` auf `#1F1F1F` setzen.

### 5.3 Logo-Dateien (Vorschlag 1.2, Dateinamen ab 1.4)

Die Dateien liegen im Paket `PCF-Logos` (Ordner `PNG/` und `SVG/`). Die Namen folgen dem Muster `pcf-logo-<gestapelt|horizontal>-<hell|dunkel>` bzw. `pcf-monogramm-<hell|dunkel>`, bei PNGs mit Hintergrund-Zusatz. „hell“ heißt für hellen Grund (Anthrazit-Anteile), „dunkel“ für dunklen Grund (weiße Anteile). Die Dateien des Liga-Logos (10.3) beginnen mit `pcf-liga-`.

**PNG:** Alle Dateien sind mehrfarbig und lassen sich nicht umfärben. Die letzte Spalte nennt den früheren Namen der Original-Dateien, falls sie noch irgendwo unter diesem Namen liegen.

| Datei | Variante | Pixel (B × H) | Einsatz | Früherer Name |
| --- | --- | --- | --- | --- |
| `pcf-logo-gestapelt-hell-transparent.png` | gestapelt, hell, transparent | 960 × 960 | heller Grund: Weiß, Lavendel Tint, Hellgrau | `pcf LOGO schwarz, bg transparent.png` |
| `pcf-logo-gestapelt-hell-weiss.png` | gestapelt, hell, weißer Grund | 960 × 960 | wo keine Transparenz möglich ist (Dokumente, Uploads) | `pcf LOGO schwarz, bg weiß.png` |
| `pcf-logo-gestapelt-dunkel-transparent.png` | gestapelt, dunkel, transparent | 800 × 800 | dunkler Grund: Anthrazit, Petrol, Foto mit Overlay | `pcf LOGO weiß, bg transparent.png` |
| `pcf-logo-gestapelt-dunkel-anthrazit.png` | gestapelt, dunkel, Grund Anthrazit `#1F1F1F` | 800 × 800 | wo keine Transparenz möglich ist (Avatar, Social) | `pcf LOGO weiß, bg schwarz.png` |
| `pcf-logo-horizontal-hell-transparent.png` | horizontal, hell, transparent | 1232 × 466 | Header der Webseite, Briefkopf | `pcf-horizontal-schwarz-transparent.png` |
| `pcf-logo-horizontal-dunkel-transparent.png` | horizontal, dunkel, transparent | 1034 × 391 | Footer, dunkle Flächen | `pcf-horizontal-weiss-transparent.png` |
| `pcf-monogramm-hell-transparent.png` | Monogramm, hell, transparent | 415 × 466 | Favicon, Avatar, kleine Formate auf hellem Grund | `pcf-monogramm-schwarz-transparent.png` |
| `pcf-monogramm-dunkel-transparent.png` | Monogramm, dunkel, transparent | 349 × 391 | Avatar, kleine Formate auf dunklem Grund | `pcf-monogramm-weiss-transparent.png` |

**SVG (Behelf):** Die SVGs sind keine Original-Vektoren des Designers, sondern aus den PNGs nachvektorisiert und auf die Markenfarben (Anthrazit, Lavendel, Neon, bei „dunkel“ zusätzlich Weiß) vereinheitlicht. Sie sind frei skalierbar und sehen sehr nah am Original aus, Kurven und Buchstaben weichen aber leicht von der Zeichnung des Designers ab. Alle sind transparent.

| Datei | Variante | Grund | Seitenverhältnis (B × H) |
| --- | --- | --- | --- |
| `pcf-logo-gestapelt-hell.svg` | gestapelt | hell | 960 × 960 |
| `pcf-logo-gestapelt-dunkel.svg` | gestapelt | dunkel | 800 × 800 |
| `pcf-logo-horizontal-hell.svg` | horizontal | hell | 1232 × 466 |
| `pcf-logo-horizontal-dunkel.svg` | horizontal | dunkel | 1034 × 391 |
| `pcf-monogramm-hell.svg` | Monogramm | hell | 415 × 466 |
| `pcf-monogramm-dunkel.svg` | Monogramm | dunkel | 349 × 391 |

---

## 6. Bildsprache und Gestaltungselemente

- **Fotos:** echte Vereinsfotos statt Stock (Spielaktion, Community, Events). Formate 3:2 und 4:5.
- **Behandlung:** natürliche Farben als Standard. Für Text auf Bild ein Anthrazit-Verlauf als Overlay, damit weiße Schrift sicher lesbar bleibt (Weiß auf Anthrazit 16,48:1). Alternativ Duoton in Anthrazit und Lavendel.
- **Aus dem Logo abgeleitet:**
  - Der lavendelfarbene Schwung dient als Bildmaske oder Trenner.
  - Der Tennisball dient als Punkt-Marker für Scores und „Live“.
  - Spielfeldlinien erscheinen als dezentes Muster auf Anthrazit (weiße Linien mit etwa 6–22 % Deckkraft). Gezeichnet wird das Spielfeld in der Proportion 10 : 20 (Netz, Seitenwände, Aufschlaglinie, Mittellinie), Linienstärke 2 px, dazu der Ball als Neon-Punkt (Vorschlag 1.2).
- **Icons:** Outline-Set, eine Strichstärke (1,75 px bei 24 px), Anthrazit auf Lavendel-Kreis (8,23:1). Ein konkretes Icon-Set ist noch nicht gewählt (siehe Abschnitt 12).

---

## 7. Tonalität und Schreibweise

- **Du durchgängig**, auch in der Liga-Oberfläche. Teilnahmebedingungen und rechtliche Texte dürfen sachlicher klingen.
- **Kurz und aktiv, Verb nach vorn:** „Melde dein Team an“ statt „Die Anmeldung erfolgt über“.
- **Gendern** mit Doppelpunkt („Spieler:innen“), konsequent überall.
- **Wortfeld:** Heimat, Community, Leidenschaft, Gemeinschaft, nachhaltig, Wachstum.
- **Namen:** „Padel Club Freiburg e.V.“ voll, „PCF“ kurz, „PCF Liga“ für die Liga. „PCFR“ entfällt.
- **Footer:** „© 2026 Padel Club Freiburg e.V.“ mit ©-Zeichen.
- **Seitentitel:** Namen nicht doppeln, z. B. „Willkommen | Padel Club Freiburg e.V.“.

---

## 8. UI-Komponenten und Abstände

### 8.1 Abstandsskala (Vorschlag 1.2)

Bisher gab es keine Abstandsskala. Sie läuft auf einem 4-px-Raster, das zu den 44 px Touch-Ziel und den Schriftgrößen passt.

| Token | Wert | Einsatz |
| --- | --- | --- |
| `space-1` | 4 px | kleinster Schritt: Icon zu Text, Statuslinie links an Hinweisboxen |
| `space-2` | 8 px | enger Abstand: Beschriftung zu Feld, zwischen Badges |
| `space-3` | 12 px | Innenabstand von Feldern und Badges, Zeilen in Tabellen |
| `space-4` | 16 px | Standardabstand zwischen Elementen, Zellen in Tabellen |
| `space-5` | 24 px | Innenabstand von Cards, Hinweisboxen und Buttons (seitlich) |
| `space-6` | 32 px | zwischen Gruppen in einer Sektion |
| `space-7` | 48 px | zwischen Blöcken |
| `space-8` | 64 px | zwischen Sektionen auf Mobil |
| `space-9` | 96 px | zwischen Sektionen auf Desktop |

Weitere Maße (aus Version 1.0 und der Webseite): Touch-Ziel 44 px (`touch-target`), Content-Spalte etwa 1120 px (`content-width`), Card-Rand und Feldrand 1 px (`border-width`), Button-Rahmen und Fokusring 2 px (`border-width-strong`).

### 8.2 Komponenten

Festlegungen aus Version 1.0 stehen ohne Hinweis, Maße aus Version 1.2 sind mit „Vorschlag 1.2“ markiert.

| Komponente | Festlegung |
| --- | --- |
| Button | siehe Abschnitt 3 |
| Card | Hellgrau-Fläche, 1 px Rand in Warm Grau-Lila, Radius 8 px. Innenabstand 24 px (Vorschlag 1.2). Text in Textgrau, Überschrift (H3) in Anthrazit. Die Card steht auf Weiß, wird nicht verschachtelt und hat keinen Schatten (Vorschlag 1.2). |
| Formularfeld | Rand Feldrand `#8A8591` (3,59:1), Radius 4 px, Beschriftung immer sichtbar (kein reiner Platzhalter). Aufbau von oben nach unten (Vorschlag 1.2): Beschriftung (16 px, 600, Anthrazit), optionaler Hilfetext in Textgrau, Feld, Fehlertext. Randbreite 1 px, Mindesthöhe 44 px, Innenabstand 8 px / 12 px. Fokus: 2-px-Ring in Lavendel Dark, Abstand 2 px. Mehrzeiliges Feld ab 120 px Höhe. |
| Formularfeld, Fehler (Vorschlag 1.2) | Rand Rot (5,62:1) in 2 px, darunter Fehlertext in Rot mit dem Wort „Fehler:“ vorweg. Der Text sagt, was zu tun ist („Gib eine E-Mail-Adresse mit @ ein.“), und der Zustand steht für Screenreader als ungültig. Nie nur Farbe. |
| Tabelle | Kopf Anthrazit mit weißer Schrift, Zebrazeilen in Lavendel Tint, Ziffern tabellarisch. Zeilenabstand 12 px / 16 px, Schrift 16 / 24 px in Anthrazit (Vorschlag 1.2). Zahlenspalten rechtsbündig. Spielklassen und „Live“ in Zellen sind Badges. Auf Mobil scrollt die Tabelle waagerecht, die Schrift wird nicht verkleinert. |
| Badge | Lavendel Tint mit Lavendel-Dark-Schrift (6,22:1); „Live“ in Neon mit Anthrazit-Schrift. Schrift 14 / 20 px in 600, Innenabstand 4 px / 12 px, Radius 4 px (Vorschlag 1.2). Beim „Live“-Badge steht der Tennisball als 8-px-Punkt in Anthrazit vor dem Wort, das Wort bleibt Pflicht. Kein Badge auf Anthrazit. |
| Hinweisbox | Statusfarbe als Linie links, Text in Anthrazit. Linie 4 px (Erfolg Grün, Warnung Bernstein, Fehler Rot, Info Petrol), Fläche Weiß mit 1 px Rand in Warm Grau-Lila, Radius 4 px, Innenabstand 16 px / 24 px (Vorschlag 1.2). Jede Hinweisbox trägt ein Wort („Erfolg“, „Warnung“, „Fehler“, „Info“ oder eine eigene Überschrift), nie nur Farbe. Fehler und Warnung melden sich Screenreadern als dringend. |

### 8.3 Allgemein

| Thema | Festlegung |
| --- | --- |
| Radius | 4 px (Buttons, Felder), 8 px (Cards, Bildflächen) |
| Layout | Content-Spalte etwa 1120 px, viel Weißraum, flache Optik ohne Schatten |
| Touch-Ziele | mindestens 44 px |

---

## 9. Design-Tokens

Die Webseite nutzt Tailwind mit `--color-*`-Tokens. Dieser Block ersetzt die bisherigen Farb-Tokens und wird unverändert auch für die Liga-App verwendet.

```css
@theme {
  /* Marke */
  --color-primary: #cea8f0;        /* Lavendel: Flächen, Logo */
  --color-primary-dark: #6f42a8;   /* Links, Fokus auf hell, 6,95:1 */
  --color-primary-tint: #f6f0fc;   /* Sektionen, Zebra, Hover */

  /* Neutral */
  --color-white: #ffffff;          /* Standardhintergrund; in Tailwind schon vorhanden */
  --color-neutraldark: #1f1f1f;    /* Text, Primär-Button, dunkle Flächen */
  --color-text-muted: #55505c;     /* Sekundärtext, 7,81:1 */
  --color-neutrallight: #f2f2f2;   /* Cards, Sektionen */
  --color-border: #d6d1db;         /* vorher: optional */
  --color-field-border: #8a8591;   /* Formularfelder, 3,59:1 */

  /* Signal und Sekundär */
  --color-signal: #c8f000;         /* Neon, nur auf dunklem Grund */
  --color-signal-hover: #b5d900;
  --color-secondary: #0f4c5c;      /* Petrol; vorher: akzent2 */

  /* Status */
  --color-success: #1b7f4b;
  --color-warning: #8a5300;
  --color-danger: #c62828;

  /* Schrift */
  --font-sans: "Inter Variable", Inter, system-ui, sans-serif;
  --font-display: "Bebas Neue", "Arial Narrow", Impact, sans-serif; /* H1, Banner, große Zahlen; nur Versalien */

  /* Form */
  --radius-sm: 0.25rem;            /* 4 px: Buttons, Felder */
  --radius-lg: 0.5rem;             /* 8 px: Cards, Bilder */

  /* Maße (Vorschlag 1.2) */
  --spacing-touch: 2.75rem;        /* 44 px: Touch-Ziel, Mindesthöhe Button und Feld */
  --container-content: 70rem;      /* 1120 px: Content-Spalte */
}

/* Weitere Werte (Vorschlag 1.2), kein Tailwind-Namensraum */
:root {
  --border-width: 1px;             /* Card-Rand, Feldrand */
  --border-width-strong: 2px;      /* Button-Rahmen, Fokusring */
  --court-line-min: 0.06;          /* Spielfeldlinien-Muster, Deckkraft */
  --court-line-max: 0.22;
}
```

**Abstandsskala:** Die Stufen aus 8.1 brauchen in Tailwind (v4) keine eigenen Tokens, sie entsprechen den Standardstufen auf dem 4-px-Raster: `space-1` = `1`, `space-2` = `2`, `space-3` = `3`, `space-4` = `4`, `space-5` = `6`, `space-6` = `8`, `space-7` = `12`, `space-8` = `16`, `space-9` = `24` (also `p-6` für 24 px Innenabstand). Beim Einbau prüfen, ob die Webseite die Standard-Skala nicht überschrieben hat.

**Namen im Design-System:** Das Design-System führt dieselben Tokens ohne Namensraum-Präfix (`primary`, `neutraldark`, `text-muted`, `signal`, `radius-sm`, `font-sans` …) und zusätzlich `white`, `space-1` bis `space-9`, `touch-target`, `content-width`, `border-width`, `border-width-strong`, `court-line-min` und `court-line-max`. Die Schrift-Stile (`h1-hero`, `banner`, `big-number`, `h2`, `h3`, `body`, `button`) entsprechen der Skala in 4.3.

**Umbenennungen gegenüber dem bisherigen Code:** `akzent` (Waldgrün) entfällt, `akzent2` wird `secondary`, `optional` wird `border`. Neu sind `primary-dark`, `primary-tint`, `text-muted`, `field-border`, `signal`, `signal-hover`, die drei Statusfarben und die Schrift-Tokens `font-sans` und `font-display` (ersetzen den bisherigen Stack mit Nunito Sans).

---

## 10. PCF Liga als Teilmarke

### 10.1 Grundsätze

Die PCF Liga (Start 1. Januar 2027, geplant unter `liga.padelclub-freiburg.de`) hat kein eigenes CI, aber ab Version 1.3 ein eigenes Logo (10.2). Sie nutzt dieselben Tokens plus:

- tabellarische Ziffern für Ranglisten und Ergebnisse,
- die Statusfarben aus 2.2 für Anmeldung, Bestätigung und Fehler,
- ein einheitliches Badge-System für Spielklassen (Lavendel Tint mit Lavendel-Dark-Schrift; „Live“ in Neon, mit Ball-Punkt),
- Ranglisten als Tabelle nach 8.2 (Zahlen rechtsbündig, Platz und Punkte tabellarisch),
- die Schreibweise „PCF Liga“ aus Abschnitt 7; als Titel in der Display-Schrift (Versalien). Im Logo steht „PCF LIGA“ ohne Bindestrich, nie „PCF-Liga“.

### 10.2 Liga-Logo (Vorschlag 1.3)

**Aufbau.** Das Liga-Logo besteht aus der **Bildmarke** (Spielfeld-Monogramm) und der **Wortmarke** „PCF LIGA“.

- **Bildmarke:** ein Padel-Spielfeld von oben in der Proportion 1 : 2 mit Netz, beiden Aufschlaglinien und Mittellinie. Ein Ball in Neon fliegt mit einem lavendelfarbenen Schweif von links unten in das obere rechte Aufschlagfeld. Der Schweif ragt links über die Bande hinaus. Ballflug und Schweif greifen den Schwung des P-Monogramms auf und verbinden die Liga sichtbar mit dem Verein.
- **Strichstärken:** Die Bande ist so dick wie der Grundstrich der Wortmarke, die Feldlinien sind etwa halb so dick. Schweif und Ball sind von den Linien freigestellt (schmale Lücke), sie liegen nicht einfach darüber.
- **Ball:** Neon `#C8F000` mit Naht in Anthrazit. Auf hellem Grund hat er zusätzlich eine Anthrazit-Kontur, weil Neon auf Weiß nur 1,32:1 erreicht. Auf dunklem Grund entfällt die Kontur.
- **Wortmarke:** „PCF LIGA“ in Bebas Neue, in Pfade umgewandelt (siehe 4.4). Im horizontalen Logo steht darunter „PADEL CLUB FREIBURG“ in Inter 600, gesperrt auf exakt die Breite der Wortmarke.
- **Farben:** Anthrazit `#1F1F1F` (bzw. Weiß auf dunklem Grund), Lavendel `#CEA8F0` nur im Schweif, Neon `#C8F000` nur im Ball. Petrol kommt im Logo nicht vor.

**Varianten.**

| Variante | Aufbau | Einsatz |
| --- | --- | --- |
| Logo (Master) | Bildmarke links, rechts „PCF“ über „LIGA“; die beiden Zeilen sind zusammen genau so hoch wie das Spielfeld | Standard: Social-Posts, Plakate, Urkunden, Titel, Präsentationen, überall mit genug Höhe |
| Horizontal | Bildmarke links, rechts „PCF LIGA“ in einer Zeile, darunter „PADEL CLUB FREIBURG“; Bildmarke so hoch wie beide Zeilen zusammen | Header der Liga-Webseite und der Liga-App, Banner, E-Mail-Kopf, Sponsorenwand, breite Flächen; auch dort, wo der Verein mitgenannt werden soll |
| Monogramm | Bildmarke allein | Avatar, Social-Profilbild, App-Icon, Stempel, Trikot-Ärmel, Wasserzeichen, kleine Formate ab 64 px |
| Monogramm Kleinformat | Bildmarke ohne Aufschlaglinien, Mittellinie und Naht, Bande kräftiger | Favicon und alles unter 64 px (bis 16 px) |
| Einfarbig Anthrazit | Bildmarke komplett in Anthrazit, Schweif und Ball über die Freistellung getrennt | Stempel, Schwarz-Weiß-Druck, Laser, Prägung auf hellem Material |
| Einfarbig Weiß | wie oben in Weiß | Trikot- und Textildruck, Folie, Prägung auf dunklem oder farbigem Material |
| App-Icon | Monogramm negativ auf quadratischer Fläche in Anthrazit (Standard) oder Petrol | Liga-App, Home-Bildschirm, Social-Kacheln |

Jede Variante gibt es **positiv** (Anthrazit, für hellen Grund) und **negativ** (Weiß statt Anthrazit, Lavendel und Neon bleiben, für dunklen Grund). Ausnahmen: Die einfarbigen Varianten sind selbst schon hell bzw. dunkel, das App-Icon hat seine Fläche fest eingebaut.

**Hintergründe.**

| Grund | Variante |
| --- | --- |
| Weiß `#FFFFFF`, Lavendel Tint `#F6F0FC`, Hellgrau `#F2F2F2` | positiv |
| Anthrazit `#1F1F1F`, Petrol `#0F4C5C`, Foto mit Anthrazit-Overlay | negativ |
| Lavendel `#CEA8F0` | nicht verwenden: der Schweif verschwindet. Notfalls einfarbig Anthrazit. |
| Neon `#C8F000` | nicht verwenden: der Ball verschwindet. Notfalls einfarbig Anthrazit. |
| unruhige Fotos ohne Overlay | nicht verwenden |

**Regeln.**

- **Schutzraum:** ein Balldurchmesser der Bildmarke rundum, gemessen an der Außenkante (Bande bzw. Spitze des Schweifs).
- **Mindestgröße (Vorschlag, im Einsatz zu prüfen):** Logo 40 px bzw. 12 mm Höhe; horizontal 56 px bzw. 15 mm Höhe, darunter wird die Unterzeile unleserlich, dann das Logo (Master) verwenden; Monogramm 64 px bzw. 18 mm Höhe, darunter das Kleinformat bis 16 px.
- **Verboten:** verzerren, umfärben (außer in die einfarbigen Varianten), Elemente trennen oder neu anordnen, Wortmarke nachsetzen, Bindestrich ergänzen, das P-Monogramm des Vereins in die Wortmarke einsetzen, Schweif oder Ball weglassen, Schatten oder Verläufe ergänzen.
- **Zusammen mit dem Vereinslogo:** nie direkt nebeneinander in gleicher Größe. Das Liga-Logo führt, das Vereinslogo steht als Absender kleiner und mit eigenem Schutzraum (siehe Tabelle in Abschnitt 5).

### 10.3 Logo-Dateien der Liga (Vorschlag 1.3)

Alle Dateien sind Vektoren bzw. daraus gerendert, die Schrift ist in Pfaden. SVGs lassen sich beliebig skalieren und sind die Quelle für Print und Web. PNGs haben einen transparenten Hintergrund (außer App-Icons). Sie liegen im Paket `PCF-Liga-Logos` (Ordner `SVG/` und `PNG/`) und auf dem Design-Canvas „PCF Liga – Logo-Set“.

**SVG (Quelle, für Print, Web, Weiterbearbeitung):**

| Datei | Variante | Grund |
| --- | --- | --- |
| `pcf-liga-logo-positiv.svg` | Logo (Master) | hell |
| `pcf-liga-logo-negativ.svg` | Logo (Master) | dunkel |
| `pcf-liga-horizontal-positiv.svg` | horizontal | hell |
| `pcf-liga-horizontal-negativ.svg` | horizontal | dunkel |
| `pcf-liga-monogramm-positiv.svg` | Monogramm | hell |
| `pcf-liga-monogramm-negativ.svg` | Monogramm | dunkel |
| `pcf-liga-monogramm-klein-positiv.svg` | Monogramm Kleinformat | hell |
| `pcf-liga-monogramm-klein-negativ.svg` | Monogramm Kleinformat | dunkel |
| `pcf-liga-monogramm-einfarbig-anthrazit.svg` | einfarbig Anthrazit | hell |
| `pcf-liga-monogramm-einfarbig-weiss.svg` | einfarbig Weiß | dunkel oder farbig |

**PNG (für Tools, die kein SVG nehmen):** Der Dateiname nennt die Pixelhöhe, z. B. `pcf-liga-logo-positiv_1000px.png`.

| Dateien | Höhen | Pixel (B × H) bei 1000 px Höhe | Einsatz |
| --- | --- | --- | --- |
| `pcf-liga-logo-positiv_…` / `…-negativ_…` | 500, 1000, 2000 px | 1623 × 1000 | Social, Präsentationen, Office |
| `pcf-liga-horizontal-positiv_…` / `…-negativ_…` | 500, 1000, 2000 px | 3441 × 1000 | Header, Banner, E-Mail-Signatur |
| `pcf-liga-monogramm-positiv_…` / `…-negativ_…` | 500, 1000, 2000 px | 593 × 1000 | Avatar, Wasserzeichen |
| `pcf-liga-monogramm-einfarbig-anthrazit_…` / `…-weiss_…` | 500, 1000, 2000 px | 593 × 1000 | Druckvorlagen ohne Farbe |
| `pcf-liga-favicon-positiv_…` / `…-negativ_…` | 16, 32, 48, 180, 512 px, quadratisch | – | Favicon (16, 32, 48), Apple-Touch-Icon (180), Web-App-Manifest (512) |
| `pcf-liga-app-icon-anthrazit_…` / `…-petrol_…` | 180, 512, 1024 px, quadratisch, Fläche gefüllt | – | Liga-App (1024 für App-Stores), Social-Profilbild |

- **Web:** im Header `pcf-liga-horizontal-positiv.svg` (bzw. negativ auf dunklem Header), als Favicon die quadratischen Favicon-PNGs; `theme-color` wie beim Verein `#1F1F1F`.
- **Social-Avatar der Liga:** App-Icon Anthrazit. Runde Ausschnitte schneiden die Ecken ab, die Bildmarke bleibt im sicheren Bereich.
- PNGs nicht über ihre Pixelhöhe hinaus vergrößern; für größere Formate die SVG nehmen.

---

## 11. Umsetzungs-Checkliste Webseite

- [ ] Token-Block aus Abschnitt 9 einspielen, Waldgrün (`akzent`) entfernen
- [ ] Buttons auf das System aus Abschnitt 3 umbauen (Primär Anthrazit, Neon auf dunklem Grund, Sekundär mit Rahmen)
- [ ] Lavendel als Text und Icon auf Weiß durch Lavendel Dark ersetzen
- [ ] Header: Text-Wortmarke durch das horizontale Logo ersetzen, Footer mit der Variante für dunklen Grund
- [ ] Fonts: Inter und Bebas Neue selbst hosten (Fontsource), Stack bereinigen; H1 und Banner-Überschriften in Bebas Neue (Versalien), H2 bleibt Inter, Buttons auf Gewicht 600
- [ ] Logo-Set vom Designer liefern lassen (horizontal, einfarbig Anthrazit, Variante für dunklen Grund, Avatar)
- [ ] Mobile Skalierung der Überschriften prüfen
- [ ] Seitentitel ohne Doppelung, ©-Zeichen im Footer, `twitter:creator` auf den Vereinsaccount, `theme-color` setzen
- [ ] „PCFR-Glücksrad“ in „PCF-Glücksrad“ umbenennen
- [ ] Fotos sammeln (ein Spieltag oder Event reicht für eine erste Bibliothek)
- [ ] Logo-Dateien aus 5.3 einbauen (horizontal im Header, dunkle Variante im Footer, Monogramm als Favicon und Avatar) und nicht über ihre Pixelhöhe hinaus vergrößern
- [ ] Abstandsskala aus 8.1 und die Maße aus Abschnitt 9 übernehmen, Komponenten nach 8.2 umbauen (Card, Formularfeld mit Fehlerzustand, Tabelle, Badge, Hinweisbox mit Statuswort)
- [ ] Schriftdateien als WOFF2 (Latin) selbst hosten, OFL-Lizenztexte beilegen
- [ ] Liga-App mit denselben Tokens starten
- [ ] Liga-Logo nach 10.2 einbauen (Vorschlag 1.3): horizontal im Header der Liga-Seite und -App, Favicon-Satz und App-Icon aus 10.3, Vereinslogo als Absender im Footer
- [ ] Liga-Logo-Dateien (10.3) ins Design-System übernehmen, damit Tools sie finden

---

## 12. Offene Punkte

- **Name der Logo-Schrift unbekannt.** Bebas Neue ist die freie Näherung für die Display-Rolle, das Logo selbst bleibt Artwork. Sobald der Name über Designer oder Quelldatei bekannt ist: Lizenz prüfen und gegebenenfalls ersetzen.
- **Logo-Set unvollständig.** Horizontale Variante und Variante für dunklen Grund existieren nur als Behelf, einfarbig Anthrazit fehlt. Die Vektor-Quelldatei beim Ersteller anfordern.
- **Display-Schrift mit dem Vorstand bestätigen.** Sie kam nach der Freigabe von Version 1.0 dazu.
- **Claim** „Die Heimat für Padel in Freiburg.“ ist aus dem Seitentext abgeleitet und noch nicht auf Print und Social übertragen.
- **Abstandsskala und Komponenten-Maße mit dem Vorstand bestätigen.** Alles mit „Vorschlag 1.2“ in Abschnitt 3, 4.3, 5, 8 und 9 kam nach der Freigabe dazu (Abstände, Innenabstände, Deaktiviert-Zustand, Fehlerzustand, Badge- und Hinweisbox-Maße).
- **Behelfs-Logos als PNG und nachvektorisierte SVG.** Horizontal, Monogramm und dunkle Varianten sind aus den Master-Dateien ausgeschnitten und als PNG in der Auflösung begrenzt (Höhe 466 px hell, 391 px dunkel). Die SVGs sind aus den PNGs nachvektorisiert. Die Original-Vektordateien, die einfarbig-anthrazitfarbene Variante und ein Favicon-Satz (zum Beispiel 16, 32 und 180 px) kommen vom Designer.
- **Liga-Logo mit dem Vorstand bestätigen (Vorschlag 1.3).** Aufbau, Varianten, Mindestgrößen und die Regel „Liga-Logo führt, Vereinslogo als Absender“ aus 10.2 sind neu. Die Mindestgrößen im Druck und auf Textil testen.
- **Icon-Set wählen.** Es steht nur die Regel (Outline, 1,75 px bei 24 px, Anthrazit auf Lavendel-Kreis), ein konkretes Set fehlt.
- **Card-Rand mit nur 1,50:1 auf Weiß.** Er trennt nur und trägt keine Information, Bedienelemente nutzen den Feldrand (3,59:1). Falls die Cards ohne Rand eingesetzt werden sollen, den Kontrast der Fläche neu prüfen.

---

## 13. Änderungshistorie

| Version | Datum | Änderung |
| --- | --- | --- |
| 1.0 | 03.11.2026 | Erstfassung: Farbguide zum CI-Guide ausgebaut, Waldgrün gestrichen, Button-System, Typografie, Logo-Regeln, Bildsprache, Tonalität, UI-Komponenten und Tokens ergänzt |
| 1.1 | 03.11.2026 | Korrektur: Master-Logo ist die gestapelte Variante, die Logo-Schrift ist Artwork (in 1.0 fälschlich als Inter-Text definiert). Display-Schrift Bebas Neue für H1, Banner und große Zahlen ergänzt. Tokens, Checkliste und offene Punkte angepasst. Bestätigung durch den Vorstand steht aus. |
| 1.2 | 03.11.2026 | Ergänzt aus dem Design-System: Abstandsskala `space-1` bis `space-9` (8.1), Komponenten-Details für Card, Formularfeld (Aufbau, Fokus, Fehlerzustand), Tabelle, Badge und Hinweisbox (8.2), Deaktiviert-Zustand und Innenabstand der Buttons (3), Schriftgrößen für Beschriftung, Tabelle, Badge und Hinweisbox sowie Schriftdateien (4), Logo-Dateien und Aufbau des Behelfs-Logos (5.1, 5.3), Proportion des Spielfeld-Musters (6), zusätzliche Kontrastwerte (2.3), Maße und Namen im Token-Block (9), Checkliste und offene Punkte. Bestätigung durch den Vorstand steht aus. |
| 1.3 | 03.11.2026 | Eigenes Logo-Set der PCF Liga ergänzt: Aufbau, Varianten (Logo, horizontal, Monogramm, Kleinformat, einfarbig, App-Icon), Hintergründe, Schutzraum, Mindestgrößen und Dateiliste (10.2, 10.3); Abgrenzung „welches Logo wann“ zwischen Verein und Liga (5); Liga-Wortmarke als Artwork (4.4); Überblick (1), Checkliste und offene Punkte angepasst. Bestätigung durch den Vorstand steht aus. |
| 1.4 | 03.11.2026 | Abschnitt 5.3 nennt die neuen Dateinamen aus dem Paket `PCF-Logos` (Muster `pcf-logo-…` / `pcf-monogramm-…`, hell / dunkel) mit dem früheren Namen der Original-Dateien; die sechs SVGs sind als Behelf aufgenommen (5.1, 5.2, 5.3, 12). Bestätigung durch den Vorstand steht aus. |

---

*Grundlage: Analyse von [padelclub-freiburg.de](https://www.padelclub-freiburg.de/) (Live-CSS und Startseite, 03.11.2026), der bisherige Farbguide und, ab Version 1.2, das Design-System „Padel Club Freiburg“ mit den Logo-Dateien, ab Version 1.3 das Logo-Set „PCF Liga“. Alle Kontrastwerte nach WCAG 2.x berechnet.*
