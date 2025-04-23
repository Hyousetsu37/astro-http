import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const clientId = Number(params.clientId);
  try {
    const result = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, clientId));

    if (result.length > 0) {
      return new Response(JSON.stringify(result.at(0)), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(
      JSON.stringify({ msg: `Client with ID: ${clientId} not found` }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: `Internal error` }), {
      status: 501,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const clientId = Number(params.clientId);
    const { id, ...body } = await request.json();

    const result = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, clientId));
    console.log(result);

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, clientId));

    console.log(updatedClient);

    return new Response(JSON.stringify(updatedClient.at(0)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: "Not found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const clientId = Number(params.clientId);
  const { rowsAffected } = await db
    .delete(Clients)
    .where(eq(Clients.id, clientId));

  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: "Deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ msg: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
};
