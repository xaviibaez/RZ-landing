/**
 * Módulo de notificaciones (modal de mensajes)
 */

function showNotification(message, type = 'error') {
    const modal = document.getElementById('notification-modal');
    if (!modal) return;

    const messageEl = modal.querySelector('.notification-message');
    const iconEl = modal.querySelector('.notification-icon');

    if (messageEl) messageEl.textContent = message;
    if (iconEl) iconEl.textContent = type === 'error' ? '✗' : '✓';

    modal.classList.add('show');
    modal.classList.remove('error', 'success');
    modal.classList.add(type);

    setTimeout(() => {
        modal.classList.remove('show');
    }, 5000);
}

function initNotifications() {
    const closeBtn = document.querySelector('.notification-close');
    const modal = document.getElementById('notification-modal');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
}
