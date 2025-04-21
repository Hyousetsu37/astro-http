import type { APIRoute } from "astro";

export const prerender = false;

export const PATCH: APIRoute = async ({ params }) => {
  const clientId = params.clientId;
  const result = { method: "PATCH", clientId };
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const clientId = params.clientId;
  const result = { method: "DELETE", clientId };
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
