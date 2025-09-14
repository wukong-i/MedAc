export async function onRequest(context) {
  const { QUIZ_BUCKET } = context.env;

  // Decode the filename from the URL (handles spaces, %20, etc.)
  const file = context.params.filename;

  try {
    const object = await QUIZ_BUCKET.get(file);

    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=3600"
      }
    });
  } catch (err) {
    return new Response("Error fetching file: " + err.message, { status: 500 });
  }
}
