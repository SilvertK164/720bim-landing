import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    tagColor: z.enum(["indigo", "green", "coral", "amber"]),
    date: z.coerce.date(),
    image: z.string(),
    excerpt: z.string(),
    paperLinks: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    services: z.string(),
    status: z.enum(["activo", "completado", "en-ejecucion"]),
    year: z.number(),
    image: z.string(),
    videoId: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { articles, projects };
