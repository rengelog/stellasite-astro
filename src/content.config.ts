import { defineCollection, z } from "astro:content";

// docs コレクション
const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    slug: z.date().optional(),
  }),
});

// page コレクション
const pageCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    slug: z.date().optional(),
  }),
});

// blog コレクション
const blogCollection = defineCollection({
  type: 'content', // 'content'は、MarkdownとMDXの両方をサポートします
  schema: ({ image }) => z.object({
    image: image().optional(),
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    slug: z.date().optional(),
    isPopular: z.boolean().optional(),
    isPopularNumber: z.number().optional(),
  }),
});

// about コレクション
const aboutCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.date().optional(),
  }),
});

// Astro にコレクションを登録
export const collections = {
  docs: docsCollection,
  page: pageCollection,
  blog: blogCollection,
  about: aboutCollection,
};
