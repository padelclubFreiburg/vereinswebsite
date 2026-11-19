// Logo-Datei aus src/assets/logos/ für <Image> holen (Pfad relativ zu diesem Ordner, z. B. "liga/pcf-liga-logo-positiv.svg").
import type { ImageMetadata } from "astro";

const bilder = import.meta.glob<{ default: ImageMetadata }>("/src/assets/logos/**/*.{png,svg}", { eager: true });

export function logoBild(pfad: string): ImageMetadata {
  const bild = bilder[`/src/assets/logos/${pfad}`];
  if (!bild) throw new Error(`Logo-Datei fehlt: src/assets/logos/${pfad}`);
  return bild.default;
}
