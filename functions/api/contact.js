export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const formData = await request.json();

    // Honeypot commun
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

    // Détection du type de formulaire
    const isReferral = formData.formType === 'referral';

    // Destinataires
    const toEmail = isReferral 
      ? (env.REFERRAL_TO_EMAIL || 'refere@sanceavet.fr')
      : (env.TO_EMAIL || 'adrien.leleuch.envt@gmail.com');

    const fromEmail = env.FROM_EMAIL || 'onboarding@resend.dev';

    let subject, htmlBody;

    if (isReferral) {
      // === FORMULAIRE RÉFÉRENCEMENT ===
      if (!formData.vetName || !formData.vetEmail || !formData.clinicName || !formData.ownerName || !formData.patientName || !formData.patientSpecies || !formData.referralReason || !formData.clinicalHistory) {
        return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      subject = `Référencement — ${formData.patientName} (Dr ${formData.vetName})`;

      htmlBody = `<h2>Référencement vétérinaire</h2>
        <p><strong>Vétérinaire:</strong> ${escapeHtml(formData.vetName)}<<br>
        <strong>Email:</strong> ${escapeHtml(formData.vetEmail)}<<br>
        <strong>Téléphone:</strong> ${escapeHtml(formData.vetPhone || 'Non renseigné')}<<br>
        <strong>Clinique:</strong> ${escapeHtml(formData.clinicName)}<<br>
        <strong>Adresse:</strong> ${escapeHtml(formData.clinicAddress || 'Non renseignée')}</p>

        <h3>Patient</h3>
        <p><strong>Nom:</strong> ${escapeHtml(formData.patientName)}<<br>
        <strong>Espèce:</strong> ${escapeHtml(formData.patientSpecies)}<<br>
        <strong>Race:</strong> ${escapeHtml(formData.patientBreed || 'Non renseignée')}<<br>
        <strong>Âge:</strong> ${escapeHtml(formData.patientAge || 'Non renseigné')}<<br>
        <strong>Sexe:</strong> ${escapeHtml(formData.patientSex || 'Non renseigné')}<<br>
        <strong>Poids:</strong> ${escapeHtml(formData.patientWeight || 'Non renseigné')} kg</p>

        <h3>Propriétaire</h3>
        <p><strong>Nom:</strong> ${escapeHtml(formData.ownerName)}<<br>
        <strong>Téléphone:</strong> ${escapeHtml(formData.ownerPhone || 'Non renseigné')}</p>

        <h3>Motif</h3>
        <p><strong>Motif:</strong> ${escapeHtml(formData.referralReason)}</p>
        <h4>Historique clinique</h4>
        <p>${escapeHtml(formData.clinicalHistory).split('\n').join('<br>')}</p>
        <h4>Traitements en cours</h4>
        <p>${escapeHtml(formData.treatments || 'Aucun').split('\n').join('<br>')}</p>
        <h4>Infos complémentaires</h4>
        <p>${escapeHtml(formData.additionalInfo || 'Aucune').split('\n').join('<br>')}</p>`;

    } else {
      // === FORMULAIRE CONTACT CLIENT ===
      if (!formData.name || !formData.email || !formData.message) {
        return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      subject = `Nouveau message de ${formData.name}`;

      htmlBody = `<h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${escapeHtml(formData.name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(formData.email)}</p>
        <p><strong>Type d'animal :</strong> ${escapeHtml(formData.animal || 'Non spécifié')}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(formData.message).split('\n').join('<br>')}</p>`;
    }

    // Pièces jointes (uniquement référencement)
    const attachments = [];
    if (isReferral && formData.attachments && Array.isArray(formData.attachments)) {
      for (const att of formData.attachments) {
        if (att.filename && att.content) {
          attachments.push({ filename: att.filename, content: att.content });
        }
      }
    }

    const resendPayload = {
      from: fromEmail,
      to: [toEmail],
      reply_to: isReferral ? formData.vetEmail : formData.email,
      subject: subject,
      html: htmlBody
    };

    if (attachments.length > 0) {
      resendPayload.attachments = attachments;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({
        error: `Resend ${res.status}: ${err}`
      }), { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, id: data.id, type: isReferral ? 'referral' : 'contact' }), {
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
