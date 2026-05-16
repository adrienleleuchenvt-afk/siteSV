export async function onRequestPost(context) {
  const { request, env } = context;
  
  const cors = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const body = await request.json();

    // Honeypot
    if (body.website && String(body.website).trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY manquante' }), { status: 500, headers: cors });
    }

    const fromEmail = (env.FROM_EMAIL || 'onboarding@resend.dev').trim();
    const toEmail = (env.REFERRAL_TO_EMAIL || 'refere@sanceavet.fr').trim();

    // Email minimaliste
    const payload = {
      from: fromEmail,
      to: [toEmail],
      subject: 'Test referencement',
      html: '<p>Ceci est un test</p>'
    };

    console.log('Envoi à Resend:', JSON.stringify(payload));

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log('Resend réponse:', res.status, text);

    if (!res.ok) {
      return new Response(JSON.stringify({ 
        error: 'Resend rejette',
        status: res.status,
        detail: text
      }), { status: 502, headers: cors });
    }

    return new Response(JSON.stringify({ success: true, id: text }), { status: 200, headers: cors });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: cors });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
