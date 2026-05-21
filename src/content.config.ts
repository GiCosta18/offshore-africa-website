import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Article categories used across the site for filtering and badges.
export const CATEGORIES = [
  'Oil & Gas',
  'Mining',
  'Downstream',
  'Company News',
  'Interviews',
  'Gas',
] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      author: z.string().default('Offshore Africa Editorial'),
      category: z.enum(CATEGORIES),
      excerpt: z.string(),
      image: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    pdf: z.string(),
    pdfSize: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { articles, issues };
