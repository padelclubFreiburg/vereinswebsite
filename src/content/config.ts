// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
import { file } from 'astro/loaders';

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: image(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('Astroship'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    order: z.number().optional(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: image(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

// Häufige Fragen: src/data/faq.yaml (Kategorien mit Fragen, Antworten in Markdown)
const faqCollection = defineCollection({
  loader: file('src/data/faq.yaml'),
  schema: z.object({
    titel: z.string(),
    kurz: z.string(),
    fragen: z
      .array(
        z.object({
          id: z.string().regex(/^[a-z0-9-]+$/, 'Die id darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten.'),
          frage: z.string(),
          antwort: z.string(),
        })
      )
      .min(1),
  }),
});

// Courts in der Region: src/data/courts.yaml
const courtsCollection = defineCollection({
  loader: file('src/data/courts.yaml'),
  schema: z.object({
    name: z.string(),
    ort: z.string(),
    merkmale: z.array(z.string()).default([]),
    webseite: z.string().url(),
    whatsapp: z.string().url().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'team': teamCollection,
  'faq': faqCollection,
  'courts': courtsCollection,
};