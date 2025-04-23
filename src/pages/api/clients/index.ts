import type { APIRoute } from "astro";
import { Clients, db, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({}) => {
  const users = await db.select().from(Clients);
  const posts = await db.select().from(Posts);
  const result = { users, posts };
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return new Response(
      JSON.stringify({ id: lastInsertRowid?.toString(), ...body }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Not found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
