/**
 * Módulo del formulario de contacto con FormSubmit
 */

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const telefonoInput = document.getElementById('telefono');
        const telefono = telefonoInput?.value?.trim() || '';

        if (!/^[0-9]{9}$/.test(telefono)) {
            showNotification('El teléfono debe contener exactamente 9 dígitos.', 'error');
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn?.textContent || 'ENVIAR';

        if (submitBtn) {
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formsubmit.co/rzpowerhouse@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok || response.type === 'opaque') {
                showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                form.reset();
                if (submitBtn) {
                    submitBtn.textContent = '✓ ENVIADO';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            console.error('Exception on form submit:', error);
            showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.', 'error');
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}
