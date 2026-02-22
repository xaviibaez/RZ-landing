function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('enviado') === '1') {
        showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        if (window.history.replaceState) {
            const cleanUrl = window.location.pathname + (window.location.hash || '');
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const telefonoInput = document.getElementById('telefono');
        const telefono = telefonoInput?.value?.trim() || '';

        if (!/^[0-9]{9}$/.test(telefono)) {
            showNotification('El teléfono debe contener exactamente 9 dígitos.', 'error');
            return;
        }

        const correoInput = form.querySelector('input[name="correo"]');
        const replyToEl = document.getElementById('form-replyto');
        if (replyToEl && correoInput?.value) {
            replyToEl.value = correoInput.value.trim();
        }

        const nextEl = document.getElementById('form-next');
        if (nextEl) {
            const returnUrl = window.location.origin + window.location.pathname + '?enviado=1' + (window.location.hash || '');
            nextEl.value = returnUrl;
        }

        form.submit();
    });
}
