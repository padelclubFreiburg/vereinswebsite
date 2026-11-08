# Vereinswebseite Padel Club Freiburg e.V.

Quellcode von [padelclub-freiburg.de](https://www.padelclub-freiburg.de): eine statische Seite mit [Astro](https://astro.build) und [Tailwind CSS](https://tailwindcss.com), ausgeliefert über Cloudflare Pages.

- **Projektüberblick, Aufbau und Regeln:** [`CLAUDE.md`](CLAUDE.md)
- **Erscheinungsbild (Farben, Schriften, Logos, Komponenten):** [`docs/ci-guide.md`](docs/ci-guide.md)

## Loslegen

```bash
npm ci --engine-strict=false
npm run dev      # Vorschau unter http://localhost:4321
npm run build    # Seite nach dist/ bauen
```

## Häufige Änderungen

| Was | Wo |
| --- | --- |
| News-Beitrag | neue Datei in `src/content/blog/` |
| Häufige Fragen (FAQ) | `src/data/faq.yaml` |
| Courts in der Region | `src/data/courts.yaml` |
| Vorstand / Team | `src/content/team/` |
| Mitgliedsbeiträge | `src/pages/mitgliedschaft.astro` |
| Menü | `src/components/navbar/navbar.astro` |
| Partnerlogos | `src/components/logos.astro` |

## Lizenz

Die Seite basiert auf dem Template [Astroship](https://github.com/surjithctly/astroship) von web3templates (GPL-2.0, siehe [`LICENSE`](LICENSE)). Die Schriften Inter und Bebas Neue stehen unter der SIL Open Font License (Lizenztexte in `public/fonts/`).
