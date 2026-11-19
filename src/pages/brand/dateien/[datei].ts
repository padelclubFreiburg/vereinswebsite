// Liefert die Logo-Dateien und ZIP-Pakete der Seite /brand unter /brand/dateien/<name> aus (beim Build erzeugt).
import type { APIRoute, GetStaticPaths } from "astro";
import { downloadDateien, type DownloadDatei } from "@/lib/marke-dateien";

export const getStaticPaths = (() =>
  downloadDateien().map((datei) => ({ params: { datei: datei.name }, props: { datei } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { datei } = props as { datei: DownloadDatei };
  return new Response(await datei.laden(), { headers: { "Content-Type": datei.typ } });
};
