/**
 * Módulo del formulario de contacto: abre WhatsApp con los datos rellenados
 */

const WHATSAPP_NUMBER = '34677624775';

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const telefonoInput = document.getElementById('telefono');
        const telefono = telefonoInput?.value?.trim() || '';

        if (!/^[0-9]{9}$/.test(telefono)) {
            showNotification('El teléfono debe contener exactamente 9 dígitos.', 'error');
            return;
        }

        const nombre = (form.querySelector('[name="nombre"]')?.value ?? '').trim();
        const correo = (form.querySelector('[name="correo"]')?.value ?? '').trim();
        const interesSelect = form.querySelector('[name="interes"]');
        const interesTexto = interesSelect?.selectedOptions?.[0]?.textContent?.trim() || interesSelect?.value || '';
        const mensaje = (form.querySelector('[name="mensaje"]')?.value ?? '').trim();

        const lineas = [
            'Hola, me gustaría recibir información desde la web de RZ Power House.',
            '',
            '*Nombre:* ' + nombre,
            '*Email:* ' + correo,
            '*Teléfono:* ' + telefono,
            '*Interesado en:* ' + interesTexto,
        ];
        if (mensaje) {
            lineas.push('');
            lineas.push('*Mensaje:*');
            lineas.push(mensaje);
        }

        const texto = lineas.join('\n');
        const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);

        showNotification('Se abrirá WhatsApp con tu mensaje. Completa el envío allí.', 'success');
        form.reset();
        window.open(url, '_blank', 'noopener,noreferrer');
    });
}
