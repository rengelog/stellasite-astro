import { getCollection } from 'astro:content';

export async function getUniqueTags() {
    const posts = await getCollection('blog');
    const tags = posts.flatMap(post => post.data.tags || []);
    return [...new Set(tags)].filter(tag => typeof tag === 'string' && tag.trim() !== '');
  }
  