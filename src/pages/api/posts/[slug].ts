import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? "";
  const post = await getEntry("blog", slug);

  if (!post) {
    return new Response(
      JSON.stringify({ message: `Post: ${slug} not found` }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return new Response(JSON.stringify(post), { status: 200 });
};
