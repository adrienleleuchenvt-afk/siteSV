// Contact form handler with Resend via Cloudflare Pages Function
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
            website: document.getElementById('website').value // honeypot anti-spam
        };

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
