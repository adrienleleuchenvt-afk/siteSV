export async function onRequest(context) {
  const { env, request } = context;
  const clientId = env.GITHUB_CLIENT_ID;
  const redirectUri = new URL('/api/callback', request.url).toString();
  
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.set('scope', 'repo public_repo');
  
  return Response.redirect(githubAuthUrl.toString(), 302);
}