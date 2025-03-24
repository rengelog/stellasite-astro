import { getCollection } from "astro:content";

export async function GET() {
  const docs = await getCollection("docs");
  const blog = await getCollection("blog");
  const page = await getCollection("page");
  const about = await getCollection("about");

  const posts = [...docs, ...blog, ...page, ...about].map(post => ({
    collection: post.collection,
    slug: post.slug,
    data: post.data,
    body: post.body
  }));

  // JSONを整形して出力する
  return new Response(JSON.stringify({ posts }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
