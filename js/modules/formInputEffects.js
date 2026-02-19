/**
 * Módulo de efectos visuales en inputs del formulario
 */

function initFormInputEffects() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 20px rgba(255, 255, 255, 0.1)';
        });

        input.addEventListener('blur', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}
