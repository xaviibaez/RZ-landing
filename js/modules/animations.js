/**
 * Módulo de animaciones: Intersection Observer, reveal, service cards, galería, hero glitch
 */

function initAnimations() {
    initRevealObserver();
    initServiceCardsAnimation();
    initGalleryAnimation();
    initHeroGlitchEffect();
}

function initRevealObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .fade-in-up, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

function initServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

function initGalleryAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 100 * index);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.5s ease';
        galleryObserver.observe(item);
    });
}

function initHeroGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    setInterval(() => {
        if (Math.random() > 0.95) {
            heroTitle.style.textShadow = '2px 2px #fff, -2px -2px #fff';
            setTimeout(() => {
                heroTitle.style.textShadow = 'none';
            }, 100);
        }
    }, 3000);
}
