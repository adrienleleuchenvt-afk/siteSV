export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const formData = await request.json();

    // Honeypot anti-spam
    if (formData.website && String(formData.website).trim() !== '') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY manquante' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const isReferral = formData.formType === 'referral';

    const toEmail = isReferral
      ? (env.REFERRAL_TO_EMAIL || 'aleleuch@icloud.com')
      : (env.TO_EMAIL || 'adrien.leleuch.envt@gmail.com');

    const fromEmail = env.FROM_EMAIL || 'contact@sanceavet.fr';

    let subject, htmlBody;

    if (isReferral) {
      if (
        !formData.vetName ||
        !formData.vetEmail ||
        !formData.clinicName ||
        !formData.ownerName ||
        !formData.patientName ||
        !formData.patientSpecies ||
        !formData.referralReason ||
        !formData.clinicalHistory
      ) {
        return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      subject = `Référencement — ${formData.patientName} (Dr ${formData.vetName})`;

      htmlBody = `
<h3>Référencement vétérinaire</h3>

<b>Vétérinaire:</b> ${escapeHtml(formData.vetName)}<br>
<b>Email:</b> ${escapeHtml(formData.vetEmail)}<br>
<b>Téléphone:</b> ${escapeHtml(formData.vetPhone || 'Non renseigné')}<br>
<b>Clinique:</b> ${escapeHtml(formData.clinicName)}<br>

<h4>Patient</h4>
Nom: ${escapeHtml(formData.patientName)}<br>
Espèce: ${escapeHtml(formData.patientSpecies)}<br>

<h4>Motif</h4>
${escapeHtml(formData.referralReason)}

<h4>Historique</h4>
${escapeHtml(formData.clinicalHistory).replace(/\n/g, '<br>')}
`;
    } else {
      if (!formData.name || !formData.email || !formData.message) {
        return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      subject = `Nouveau message de ${formData.name}`;

      htmlBody = `
<h3>Nouveau message</h3>

Nom: ${escapeHtml(formData.name)}<br>
Email: ${escapeHtml(formData.email)}<br>

Message:<br>
${escapeHtml(formData.message).replace(/\n/g, '<br>')}
`;
    }

    const resendPayload = {
      from: fromEmail,
      to: [toEmail],
      reply_to: isReferral ? formData.vetEmail : formData.email,
      subject,
      html: htmlBody
    };

    // Ajouter les pièces jointes si présentes
    if (isReferral && formData.attachments && Array.isArray(formData.attachments) && formData.attachments.length > 0) {
      resendPayload.attachments = formData.attachments.map(att => ({
        filename: att.filename,
        content: Buffer.from(att.content, 'base64')
      }));
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify({
      success: true,
      id: data.id
    }), {
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
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}