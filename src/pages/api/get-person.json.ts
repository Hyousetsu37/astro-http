import type { APIRoute } from "astro";

export const GET: APIRoute = async ({}) => {
  const person = { name: "David", age: 28 };
  return new Response(JSON.stringify(person), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
