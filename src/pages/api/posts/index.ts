import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (slug) {
    const post = await getEntry("blog", slug);
    if (post) {
      return new Response(JSON.stringify(post), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
  const posts = await getCollection("blog");
  return new Response(JSON.stringify(posts), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if (slug) {
  //   const post = posts.filter((post) => post.id === slug);
  //   if (post.length < 1) {
  //     return new Response(JSON.stringify({ message: "Not found" }), {
  //       status: 404,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } else {
  //     return new Response(JSON.stringify(post), {
  //       status: 201,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }
  // }
  // return new Response(JSON.stringify(posts), {
  //   status: 201,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
};
