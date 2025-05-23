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

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  return new Response(JSON.stringify({ method: "POST", ...body }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  return new Response(JSON.stringify({ method: "PUT", ...body }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const slug = params.slug;
  return new Response(JSON.stringify({ method: "DELETE", slug: slug }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
