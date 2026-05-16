// Contact form handler - Resend via Cloudflare Pages Function

// Fill the Turnstile token when the widget validates
window.onTurnstileSuccess = (token) => {
    const t = document.getElementById('turnstileToken');
    if (t) t.value = token;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            animal: document.getElementById('animal').value,
            message: document.getElementById('message').value.trim(),
            website: document.getElementById('website').value, // honeypot anti-spam
            turnstileToken: (document.getElementById('turnstileToken') || {}).value || ''
        };

        // block submit if no Turnstile token (helps when widget failed to load)
        if (!formData.turnstileToken) {
            alert('Veuillez compléter la vérification humaine avant d\'envoyer le message.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Message envoyé avec succès ! Nous vous contacterons rapidement.');
                form.reset();
            } else {
                alert('Erreur : ' + (result.error || "Une erreur est survenue lors de l'envoi."));
            }
        } catch (err) {
            alert('Erreur de connexion. Veuillez vérifier votre connexion et réessayer.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});
