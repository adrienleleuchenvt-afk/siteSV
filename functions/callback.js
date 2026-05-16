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
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  
  if (tokenData.error) {
    return new Response(`Erreur GitHub: ${tokenData.error_description}`, { status: 400 });
  }
  
  // Renvoie le token à Decap via postMessage
  const html = `
<!DOCTYPE html>
<html>
<body>
<script>
  window.opener.postMessage({
    type: 'authorisation',
    payload: '${tokenData.access_token}'
  }, '*');
  window.close();
</script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}