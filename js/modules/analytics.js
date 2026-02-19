/**
 * Módulo de Google Analytics - tracking de eventos
 */

function initAnalytics() {
    if (typeof gtag === 'undefined') return;

    gtag('event', 'page_load', {
        event_category: 'Engagement',
        event_label: 'Landing Page Load',
        page_location: window.location.href,
        page_title: document.title
    });

    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const galleryViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        event_category: 'Content',
                        event_label: 'Gallery Section',
                        value: 1
                    });
                    galleryViewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        galleryViewObserver.observe(gallerySection);
    }

    const productsSection = document.getElementById('products');
    if (productsSection) {
        const productsViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        event_category: 'Content',
                        event_label: 'Products Section',
                        value: 1
                    });
                    productsViewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        productsViewObserver.observe(productsSection);
    }

    const instagramLink = document.querySelector('a[href*="instagram.com/rzpowerhouse"]');
    if (instagramLink) {
        instagramLink.addEventListener('click', () => {
            gtag('event', 'instagram_click', {
                event_category: 'Social Media',
                event_label: 'Instagram Profile',
                value: 1
            });
        });
    }

    const tiktokLink = document.querySelector('a[href*="tiktok.com/@antonirzpower"]');
    if (tiktokLink) {
        tiktokLink.addEventListener('click', () => {
            gtag('event', 'tiktok_click', {
                event_category: 'Social Media',
                event_label: 'TikTok Profile',
                value: 1
            });
        });
    }

    const youtubeLink = document.querySelector('a[href*="youtube.com"]');
    if (youtubeLink) {
        youtubeLink.addEventListener('click', () => {
            gtag('event', 'youtube_click', {
                event_category: 'Social Media',
                event_label: 'YouTube Channel',
                value: 1
            });
        });
    }
}
