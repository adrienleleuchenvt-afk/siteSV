export async function onRequest(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('Code manquant', { status: 400 });
  }
  
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Cloudflare Worker',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });
  if (!tokenResponse.ok) {
    const text = await tokenResponse.text();
    return new Response('Erreur GitHub brute: ' + text,
       { status: 500 });
  }
  
  const tokenData = await tokenResponse.json();
  
  if (tokenData.error) {
    return new Response(`Erreur GitHub: ${tokenData.error_description}`, { status: 400 });
  }
  
  // envoie  du token
  return Response.redirect(`/admin/#/auth?token=${tokenData.access_token}`, 302);
  
}