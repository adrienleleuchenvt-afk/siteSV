export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const formData = await request.json();

    // Honeypot : si le champ "website" est rempli = bot
    if (formData.website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Validation des champs obligatoires
    if (!formData.vetName || !formData.vetEmail || !formData.clinicName || !formData.ownerName || !formData.patientName || !formData.patientSpecies || !formData.referralReason || !formData.clinicalHistory) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const fromEmail = env.FROM_EMAIL || 'refere@sanceavet.fr';
    const toEmail = env.REFERRAL_TO_EMAIL || 'adrien.leleuch.envt@gmail.com';

    // Préparation des pièces jointes pour Resend
    const attachments = [];
    if (formData.attachments && Array.isArray(formData.attachments)) {
      for (const att of formData.attachments) {
        if (att.filename && att.content) {
          attachments.push({
            filename: att.filename,
            content: att.content // déjà en base64 côté client
          });
        }
      }
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: formData.vetEmail,
        subject: `Référencement vétérinaire — ${formData.patientName} (Dr ${formData.vetName})`,
        html: `<h2>Nouveau référencement vétérinaire</h2>
          <h3>Vétérinaire référent</h3>
          <p><strong>Nom :</strong> ${escapeHtml(formData.vetName)}</p>
          <p><strong>Email :</strong> ${escapeHtml(formData.vetEmail)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(formData.vetPhone || 'Non renseigné')}</p>
          <p><strong>Clinique :</strong> ${escapeHtml(formData.clinicName)}</p>
          <p><strong>Adresse :</strong> ${escapeHtml(formData.clinicAddress || 'Non renseignée')}</p>

          <h3>Patient</h3>
          <p><strong>Nom :</strong> ${escapeHtml(formData.patientName)}</p>
          <p><strong>Espèce :</strong> ${escapeHtml(formData.patientSpecies)}</p>
          <p><strong>Race :</strong> ${escapeHtml(formData.patientBreed || 'Non renseignée')}</p>
          <p><strong>Âge :</strong> ${escapeHtml(formData.patientAge || 'Non renseigné')}</p>
          <p><strong>Sexe :</strong> ${escapeHtml(formData.patientSex || 'Non renseigné')}</p>
          <p><strong>Poids :</strong> ${escapeHtml(formData.patientWeight || 'Non renseigné')} kg</p>

          <h3>Propriétaire</h3>
          <p><strong>Nom :</strong> ${escapeHtml(formData.ownerName)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(formData.ownerPhone || 'Non renseigné')}</p>

          <h3>Motif de référencement</h3>
          <p><strong>Motif :</strong> ${escapeHtml(formData.referralReason)}</p>
          <p><strong>Historique clinique :</strong></p>
          <p>${escapeHtml(formData.clinicalHistory).split('\n').join('<br>')}</p>

          <h3>Traitements & infos complémentaires</h3>
          <p><strong>Traitements en cours :</strong><br>${escapeHtml(formData.treatments || 'Aucun').split('\n').join('<br>')}</p>
          <p><strong>Infos complémentaires :</strong><br>${escapeHtml(formData.additionalInfo || 'Aucune').split('\n').join('<br>')}</p>

          <p style="margin-top:2rem;color:#6b7280;font-size:0.9rem;">— Envoyé depuis le formulaire de référencement Sancéa Vet</p>`,
        attachments: attachments.length > 0 ? attachments : undefined
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return new Response(JSON.stringify({
        error: err.message || 'Erreur lors de l\'envoi'
      }), { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
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