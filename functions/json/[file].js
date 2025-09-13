export async function onRequest(context) {
  const { params, env } = context;
  const fileName = params.file; // Pages decodes URL automatically

  try {
    // 'DATA' is your R2 binding name pointing to bucket 'jsons'
    const object = await env.DATA.get(fileName);
    if (!object) return new Response("Not found", { status: 404 });

    const json = await object.text(); // read JSON content
    return new Response(json, {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "max-age=0, s-maxage=60" // optional edge caching
      },
    });
  } catch (err) {
    return new Response(err.toString(), { status: 500 });
  }
}
