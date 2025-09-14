export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  
  // Block direct access to JSON files
  if (url.pathname.includes('/data/')) {
    const referer = request.headers.get('referer');
    if (!referer || !referer.includes(url.hostname)) {
      return new Response('Go Fuck Your MOM , DogShit!', { status: 403 });
    }
  }
  
  return next();
}
