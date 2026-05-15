export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const formData = await request.json();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Honeypot anti-spam (champ invisible)
    if (formData.website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Appel API Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || 'contact@sanceavet.fr',
        to: [env.TO_EMAIL || 'adrien.leleuch.envt@gmail.com'],
        reply_to: formData.email,
        subject: `Nouveau message de ${formData.name} - Clinique Veto`,
        html: `
          <h2>Nouveau message depuis le formulaire de contact</h2>
          <p><strong>Nom :</strong> ${escapeHtml(formData.name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(formData.email)}</p>
          <p><strong>Type d'animal :</strong> ${escapeHtml(formData.animal || 'Non spécifié')}</p>
          <p><strong>Message :</strong></p>
          <p>${escapeHtml(formData.message).replace(/\n/g, '<br>')}</p>
        `
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Erreur Resend' }));
      throw new Error(errorData.message || `Erreur HTTP ${res.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
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

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
