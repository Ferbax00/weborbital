/**
 * ORBITALDATA - Inicialización del portal
 */

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        await OrbitalAPI.createContactRequest(formData);
        OrbitalUI.showToast('¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.', 'success');
        form.reset();
    } catch (err) {
        console.error('Form submit error:', err);
        OrbitalUI.showToast(err.message || 'Error al enviar la cotización', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Cotización';
    }
}

function initPortal() {
    OrbitalUI.renderServices();
    OrbitalUI.renderPartners();

    document.querySelectorAll('.nav-menu a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortal);
} else {
    initPortal();
}
