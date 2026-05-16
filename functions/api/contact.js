export async function onRequestPost(context) {
  const { request, env } = context;
  
  const cors = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    // 1. Lire le body
    let formData;
    try {
      formData = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'JSON invalide: ' + e.message }), { status: 400, headers: cors });
    }

    // 2. Honeypot
    if (formData.website && String(formData.website).trim() !== '') {
      return new Response(JSON.stringify({ success: true, note: 'honeypot' }), { status: 200, headers: cors });
    }

    // 3. Vérifier RESEND_API_KEY
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY manquante dans les variables Cloudflare' }), { status: 500, headers: cors });
    }

    const isReferral = formData.formType === 'referral';
    const toEmail = isReferral 
      ? (env.REFERRAL_TO_EMAIL || 'refere@sanceavet.fr')
      : (env.TO_EMAIL || 'adrien.leleuch.envt@gmail.com');
    const fromEmail = (env.FROM_EMAIL || 'onboarding@resend.dev').trim();

    // 4. Validation email Resend
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromEmail)) {
      return new Response(JSON.stringify({ error: 'FROM_EMAIL invalide: ' + fromEmail }), { status: 500, headers: cors });
    }
    if (!emailRegex.test(toEmail)) {
      return new Response(JSON.stringify({ error: 'TO_EMAIL/REFERRAL_TO_EMAIL invalide: ' + toEmail }), { status: 500, headers: cors });
    }

    // 5. Construction selon le type
    let subject, htmlBody, replyTo;

    if (isReferral) {
      // === RÉFÉRENCEMENT ===
      
      // Vérification champ par champ
      const required = {
        vetName: formData.vetName,
        vetEmail: formData.vetEmail,
        clinicName: formData.clinicName,
        ownerName: formData.ownerName,
        patientName: formData.patientName,
        patientSpecies: formData.patientSpecies,
        referralReason: formData.referralReason,
        clinicalHistory: formData.clinicalHistory
      };
      
      for (const [key, val] of Object.entries(required)) {
        if (!val || String(val).trim() === '') {
          return new Response(JSON.stringify({ error: 'Champ requis manquant: ' + key }), { status: 400, headers: cors });
        }
      }

      // Vérifier vetEmail
      if (!emailRegex.test(formData.vetEmail)) {
        return new Response(JSON.stringify({ error: 'vetEmail invalide: ' + formData.vetEmail }), { status: 400, headers: cors });
      }

      replyTo = formData.vetEmail;
      subject = `Référencement — ${formData.patientName} (Dr ${formData.vetName})`;

      // Construction HTML étape par étape (pour isoler l'erreur)
      let html = '';
      try {
        html += `<h2>Référencement vétérinaire</h2>`;
        html += `<p><strong>Vétérinaire:</strong> ${esc(formData.vetName)}<br>`;
        html += `<strong>Email:</strong> ${esc(formData.vetEmail)}<br>`;
        html += `<strong>Téléphone:</strong> ${esc(formData.vetPhone || 'Non renseigné')}<br>`;
        html += `<strong>Clinique:</strong> ${esc(formData.clinicName)}<br>`;
        html += `<strong>Adresse:</strong> ${esc(formData.clinicAddress || 'Non renseignée')}</p>`;
        
        html += `<h3>Patient</h3>`;
        html += `<p><strong>Nom:</strong> ${esc(formData.patientName)}<br>`;
        html += `<strong>Espèce:</strong> ${esc(formData.patientSpecies)}<br>`;
        html += `<strong>Race:</strong> ${esc(formData.patientBreed || 'Non renseignée')}<br>`;
        html += `<strong>Âge:</strong> ${esc(formData.patientAge || 'Non renseigné')}<br>`;
        html += `<strong>Sexe:</strong> ${esc(formData.patientSex || 'Non renseigné')}<br>`;
        html += `<strong>Poids:</strong> ${esc(formData.patientWeight || 'Non renseigné')} kg</p>`;
        
        html += `<h3>Propriétaire</h3>`;
        html += `<p><strong>Nom:</strong> ${esc(formData.ownerName)}<br>`;
        html += `<strong>Téléphone:</strong> ${esc(formData.ownerPhone || 'Non renseigné')}</p>`;
        
        html += `<h3>Motif</h3>`;
        html += `<p><strong>Motif:</strong> ${esc(formData.referralReason)}</p>`;
        html += `<h4>Historique clinique</h4>`;
        html += `<p>${nl2br(formData.clinicalHistory)}</p>`;
        html += `<h4>Traitements en cours</h4>`;
        html += `<p>${nl2br(formData.treatments || 'Aucun')}</p>`;
        html += `<h4>Infos complémentaires</h4>`;
        html += `<p>${nl2br(formData.additionalInfo || 'Aucune')}</p>`;
        
        htmlBody = html;
      } catch (buildErr) {
        return new Response(JSON.stringify({ error: 'Erreur construction HTML: ' + buildErr.message }), { status: 500, headers: cors });
      }

    } else {
      // === CONTACT CLIENT ===
      if (!formData.name || !formData.email || !formData.message) {
        return new Response(JSON.stringify({ error: 'Champs requis manquants (name, email, message)' }), { status: 400, headers: cors });
      }

      replyTo = formData.email;
      subject = `Nouveau message de ${formData.name}`;

      htmlBody = `<h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${esc(formData.name)}</p>
        <p><strong>Email :</strong> ${esc(formData.email)}</p>
        <p><strong>Type d'animal :</strong> ${esc(formData.animal || 'Non spécifié')}</p>
        <p><strong>Message :</strong></p>
        <p>${nl2br(formData.message)}</p>`;
    }

    // 6. Construction payload Resend
    const payload = {
      from: fromEmail,
      to: [toEmail],
      subject: subject,
      html: htmlBody
    };

    if (replyTo && emailRegex.test(replyTo)) {
      payload.reply_to = replyTo;
    }

    // Pièces jointes (si présentes et valides)
    if (isReferral && formData.attachments && Array.isArray(formData.attachments) && formData.attachments.length > 0) {
      const atts = [];
      for (const att of formData.attachments) {
        if (att && typeof att === 'object' && att.filename && att.content && typeof att.content === 'string') {
          atts.push({ 
            filename: String(att.filename), 
            content: String(att.content) 
          });
        }
      }
      if (atts.length > 0) {
        payload.attachments = atts;
      }
    }

    // 7. Vérification taille
    const payloadStr = JSON.stringify(payload);
    if (payloadStr.length > 900000) {
      delete payload.attachments;
      payload.html += `<p style="color:red"><strong>Attention :</strong> Les pièces jointes étaient trop volumineuses et n'ont pas été transmises.</p>`;
    }

    // 8. Envoi Resend
    let res;
    try {
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (fetchErr) {
      return new Response(JSON.stringify({ error: 'Erreur fetch Resend: ' + fetchErr.message }), { status: 502, headers: cors });
    }

    const resText = await res.text();
    
    if (!res.ok) {
      return new Response(JSON.stringify({ 
        error: 'Resend a rejeté la requête',
        status: res.status,
        detail: resText,
        hint: res.status === 422 ? 'Vérifiez FROM_EMAIL (doit être vérifié chez Resend)' : 'Vérifiez RESEND_API_KEY'
      }), { status: 502, headers: cors });
    }

    let data;
    try { data = JSON.parse(resText); } catch { data = { id: 'unknown' }; }

    return new Response(JSON.stringify({ 
      success: true, 
      id: data.id,
      type: isReferral ? 'referral' : 'contact'
    }), { status: 200, headers: cors });

  } catch (err) {
    return new Response(JSON.stringify({ 
      error: 'Crash Worker: ' + err.message,
      stack: err.stack 
    }), { status: 500, headers: cors });
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

function esc(text) {
  if (text === undefined || text === null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function nl2br(text) {
  if (text === undefined || text === null) return '';
  return esc(text).split('\n').join('<br>');
}
