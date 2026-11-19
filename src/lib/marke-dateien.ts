// Download-Dateien der Seite /brand. Wird beim Build von src/pages/brand/dateien/[datei].ts aufgerufen.
// - Vereinslogos: alle SVG/PNG aus src/assets/logos/ unverändert
// - Liga-Logos: alle SVG aus src/assets/logos/liga/ unverändert, PNGs daraus in den Höhen LIGA_PNG_HOEHEN gerendert
// - ZIP-Pakete (ZIP_VEREIN, ZIP_LIGA, ZIP_ALLE) mit Ordnern PNG/ und SVG/ und der jeweiligen LIESMICH.txt
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { zipSync, type Zippable } from "fflate";
import { LIGA_PNG_HOEHEN, ZIP_ALLE, ZIP_LIGA, ZIP_VEREIN } from "./marke";

export interface DownloadDatei {
  name: string;
  typ: string;
  laden: () => Promise<Uint8Array>;
}

const LOGOS = path.join(process.cwd(), "src/assets/logos");
const LIGA = path.join(LOGOS, "liga");

const TYPEN: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".zip": "application/zip",
};

function einmal<T>(fn: () => Promise<T>): () => Promise<T> {
  let ergebnis: Promise<T> | undefined;
  return () => (ergebnis ??= fn());
}

function lesen(datei: string) {
  return einmal(async () => new Uint8Array(await fs.promises.readFile(datei)));
}

function dateienIn(ordner: string, endungen: string[]) {
  return fs
    .readdirSync(ordner)
    .filter((f) => endungen.includes(path.extname(f)))
    .sort();
}

// PNG aus einer SVG in exakt `hoehe` Pixeln Höhe rendern
function rendern(svgDatei: string, hoehe: number) {
  return einmal(async () => {
    const svg = await fs.promises.readFile(svgDatei);
    const svgHoehe = Number(/<svg[^>]*\sheight="([\d.]+)"/.exec(svg.toString())?.[1]);
    if (!svgHoehe) throw new Error(`${svgDatei}: height-Attribut fehlt`);
    const density = Math.ceil((72 * hoehe) / svgHoehe) + 1;
    const png = await sharp(svg, { density }).resize({ height: hoehe }).png({ compressionLevel: 9 }).toBuffer();
    return new Uint8Array(png);
  });
}

function bauen(): DownloadDatei[] {
  const verein = dateienIn(LOGOS, [".svg", ".png"]).map((f) => ({
    name: f,
    typ: TYPEN[path.extname(f)],
    ordner: path.extname(f) === ".svg" ? "SVG" : "PNG",
    laden: lesen(path.join(LOGOS, f)),
  }));

  const ligaSvg = dateienIn(LIGA, [".svg"]);
  const liga = [
    ...ligaSvg.map((f) => ({ name: f, typ: TYPEN[".svg"], ordner: "SVG", laden: lesen(path.join(LIGA, f)) })),
    ...ligaSvg.flatMap((f) =>
      LIGA_PNG_HOEHEN.map((h) => ({
        name: `${path.basename(f, ".svg")}_${h}px.png`,
        typ: TYPEN[".png"],
        ordner: "PNG",
        laden: rendern(path.join(LIGA, f), h),
      }))
    ),
  ];

  type Eintrag = (typeof verein)[number];
  async function paket(ordner: string, eintraege: Eintrag[], liesmich: string): Promise<Zippable> {
    const inhalt: Zippable = { [`${ordner}/LIESMICH.txt`]: await fs.promises.readFile(liesmich) };
    for (const e of eintraege) {
      // PNGs sind schon komprimiert
      inhalt[`${ordner}/${e.ordner}/${e.name}`] = [await e.laden(), { level: e.ordner === "PNG" ? 0 : 9 }];
    }
    return inhalt;
  }
  const paketVerein = () => paket("PCF-Logos", verein, path.join(LOGOS, "LIESMICH.txt"));
  const paketLiga = () => paket("PCF-Liga-Logos", liga, path.join(LIGA, "LIESMICH.txt"));
  const zip = (teile: () => Promise<Zippable>[]) =>
    einmal(async () => zipSync(Object.assign({}, ...(await Promise.all(teile())))));

  const zips: DownloadDatei[] = [
    { name: ZIP_VEREIN, typ: TYPEN[".zip"], laden: zip(() => [paketVerein()]) },
    { name: ZIP_LIGA, typ: TYPEN[".zip"], laden: zip(() => [paketLiga()]) },
    { name: ZIP_ALLE, typ: TYPEN[".zip"], laden: zip(() => [paketVerein(), paketLiga()]) },
  ];

  const alle = [...verein, ...liga, ...zips];
  const doppelt = alle.map((d) => d.name).filter((n, i, a) => a.indexOf(n) !== i);
  if (doppelt.length) throw new Error(`Doppelte Dateinamen unter /brand/dateien: ${doppelt.join(", ")}`);
  return alle;
}

let cache: DownloadDatei[] | undefined;
export function downloadDateien(): DownloadDatei[] {
  return (cache ??= bauen());
}
