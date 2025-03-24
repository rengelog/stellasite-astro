import { getCollection } from 'astro:content';

export async function getUniqueCategories() {
  const posts = await getCollection('blog');
  const categories = posts.flatMap(post => post.data.categories);
  return Array.from(new Set(categories)).sort(); // ユニークなカテゴリーをアルファベット順でソート
}
