export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const filename = decodeURIComponent(url.pathname.replace("/data/", ""));

  if (!filename) return new Response("File not found", { status: 404 });

  // Fetch directly from R2 via binding
  const object = await env.data.get(filename);

  if (!object) return new Response("Not found in R2", { status: 404 });

  return new Response(object.body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=31536000",
    },
  });
}
