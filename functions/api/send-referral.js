// Cloudflare Worker - Envoi d'emails de référencement vétérinaire via Resend
// Chemin : functions/api/send-referral.js (pour Cloudflare Pages Functions)

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. Parse le FormData (multipart pour les fichiers)
    const formData = await request.formData();

    // 2. Vérifier le CAPTCHA hCaptcha
    const captchaToken = formData.get('captchaToken');
    if (!captchaToken) {
      return new Response(JSON.stringify({ error: 'CAPTCHA manquant' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const captchaVerify = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.HCATCHA_SECRET,
        response: captchaToken
      })
    });
    const captchaResult = await captchaVerify.json();
    if (!captchaResult.success) {
      return new Response(JSON.stringify({ error: 'CAPTCHA invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 3. Extraire les données du formulaire
    const vetName = formData.get('vetName') || '';
    const vetEmail = formData.get('vetEmail') || '';
    const vetPhone = formData.get('vetPhone') || '';
    const clinicName = formData.get('clinicName') || '';
    const clinicAddress = formData.get('clinicAddress') || '';
    const ownerName = formData.get('ownerName') || '';
    const ownerPhone = formData.get('ownerPhone') || '';
    const patientName = formData.get('patientName') || '';
    const patientSpecies = formData.get('patientSpecies') || '';
    const patientBreed = formData.get('patientBreed') || '';
    const patientAge = formData.get('patientAge') || '';
    const patientSex = formData.get('patientSex') || '';
    const patientWeight = formData.get('patientWeight') || '';
    const referralReason = formData.get('referralReason') || '';
    const clinicalHistory = formData.get('clinicalHistory') || '';
    const treatments = formData.get('treatments') || '';
    const additionalInfo = formData.get('additionalInfo') || '';

    // 4. Construire le corps de l'email
    const emailBody = `NOUVEAU RÉFÉRENCEMENT VÉTÉRINAIRE
═══════════════════════════════════════

📋 INFORMATIONS DU VÉTÉRINAIRE RÉFÉRENT
────────────────────────────────────────
Nom : ${vetName}
Email : ${vetEmail}
Téléphone : ${vetPhone}
Clinique : ${clinicName}
Adresse : ${clinicAddress}

🐾 INFORMATIONS DU PATIENT
────────────────────────────────────────
Propriétaire : ${ownerName}
Téléphone propriétaire : ${ownerPhone}
Nom de l'animal : ${patientName}
Espèce : ${patientSpecies}
Race : ${patientBreed}
Âge : ${patientAge}
Sexe : ${patientSex}
Poids : ${patientWeight} kg

🏥 MOTIF DE RÉFÉRENCEMENT
────────────────────────────────────────
Motif : ${referralReason}

📖 HISTORIQUE CLINIQUE
────────────────────────────────────────
${clinicalHistory}

💊 TRAITEMENTS EN COURS
────────────────────────────────────────
${treatments || 'Aucun'}

📌 INFORMATIONS COMPLÉMENTAIRES
────────────────────────────────────────
${additionalInfo || 'Aucune'}

═══════════════════════════════════════
Envoyé depuis le formulaire de référencement
Sancéa Vet
Date : ${new Date().toLocaleString('fr-FR')}`;

    // 5. Préparer les pièces jointes pour Resend
    const attachments = [];
    const files = formData.getAll('attachments');

    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        attachments.push({
          filename: file.name,
          content: base64
        });
      }
    }

    // 6. Envoyer l'email via Resend API
    const resendPayload = {
      from: `Référencement Vétérinaire <${env.FROM_EMAIL || 'refere@sanceavet.fr'}>`,
      to: [env.TO_EMAIL || 'refere@sanceavet.fr'],
      reply_to: vetEmail,
      subject: `Référencement - ${patientName} (${patientSpecies}) - Dr. ${vetName}`,
      text: emailBody
    };

    if (attachments.length > 0) {
      resendPayload.attachments = attachments;
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Erreur Resend:', errorData);
      return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi de l\'email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const resendData = await resendResponse.json();

    return new Response(JSON.stringify({ success: true, messageId: resendData.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    console.error('Erreur Worker:', err);
    return new Response(JSON.stringify({ error: 'Erreur serveur interne' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

// Gérer les requêtes OPTIONS (CORS preflight)
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
