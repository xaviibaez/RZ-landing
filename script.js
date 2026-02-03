// Navegación scroll con ocultamiento
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let scrollThreshold = 10;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Añadir clase scrolled después de 100px
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Ocultar/mostrar navbar según dirección del scroll
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll hacia abajo - ocultar navbar
            navbar.classList.add('hidden');
        } else {
            // Scroll hacia arriba - mostrar navbar
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    }
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Intersection Observer para animaciones
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

// Observar elementos para animaciones
document.querySelectorAll('.reveal-text, .fade-in-up, .feature-item').forEach(el => {
    observer.observe(el);
});

// Testimonials slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
};

const nextTestimonial = () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
};

const prevTestimonial = () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
};

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials
setInterval(nextTestimonial, 5000);

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animación del botón
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.style.pointerEvents = 'none';
    
    // Simular envío
    setTimeout(() => {
        submitBtn.textContent = '✓ ENVIADO';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.pointerEvents = 'auto';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Animación de entrada para las tarjetas de servicio
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

// Animación de entrada para la galería
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

// Efecto de glitch en el título del hero (ocasional)
const heroTitle = document.querySelector('.hero-title');
setInterval(() => {
    if (Math.random() > 0.95) {
        heroTitle.style.textShadow = '2px 2px #fff, -2px -2px #fff';
        setTimeout(() => {
            heroTitle.style.textShadow = 'none';
        }, 100);
    }
}, 3000);

// Smooth scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de escritura en los inputs del formulario
const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 5px 20px rgba(255, 255, 255, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Carrusel de imágenes en modal
const carouselModal = document.getElementById('carousel-modal');
const carouselImage = document.querySelector('.carousel-image');
const carouselCounter = document.querySelector('.carousel-counter');
const carouselClose = document.querySelector('.carousel-close');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

let currentCarouselIndex = 0;
let currentCarouselImages = [];

// Datos de las imágenes por galería
const galleryImages = {
    gymTrainingZone: [
        { src: './assets/images/gallery/training-zone.jpg', alt: 'Zona de entrenamiento powerlifting RZ Power House con plataformas profesionales y barras Eleiko' },
        { src: './assets/images/gallery/bench-press.jpg', alt: 'Estación de press de banca con equipamiento profesional para powerlifting' },
        { src: './assets/images/gallery/dumbbell-rack.jpg', alt: 'Racks de sentadilla profesionales con sistema de seguridad para entrenamiento de powerlifting' }
    ],
    gym: [
        { src: './assets/images/gallery/training-zone.jpg', alt: 'Zona de entrenamiento powerlifting RZ Power House con plataformas profesionales y barras Eleiko' },
        { src: './assets/images/gallery/bench-press.jpg', alt: 'Estación de press de banca con equipamiento profesional para powerlifting' },
        { src: './assets/images/gallery/dumbbell-rack.jpg', alt: 'Racks de sentadilla profesionales con sistema de seguridad para entrenamiento de powerlifting' },
        { src: './assets/images/gallery/lateral-raises-dumbbells.jpg', alt: 'Equipamiento elite Eleiko para competición de powerlifting' },
        { src: './assets/images/gallery/trust-the-process.jpg', alt: 'Comunidad de powerlifters entrenando juntos en RZ Power House Sabadell' }
    ],
    productsTshirts: [
        { src: './assets/images/products/sleeveless-t-shirt.jpg', alt: 'Camiseta sin mangas RZ Power House' },
        { src: './assets/images/products/hoodie1.jpg', alt: 'Sudadera con capucha RZ Power House' },
        { src: './assets/images/products/t-shirt.jpg', alt: 'Camiseta RZ Power House' },
        { src: './assets/images/products/sweat-suit.jpg', alt: 'Conjunto deportivo RZ Power House' }
    ]
};

// Función para abrir el carrusel
function openCarousel(galleryType, startIndex) {
    currentCarouselImages = galleryImages[galleryType];
    currentCarouselIndex = startIndex;
    updateCarouselImage();
    carouselModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el carrusel
function closeCarousel() {
    carouselModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Función para actualizar la imagen del carrusel
function updateCarouselImage() {
    const currentImage = currentCarouselImages[currentCarouselIndex];
    
    // Animación de salida
    carouselImage.style.opacity = '0';
    carouselImage.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        carouselImage.src = currentImage.src;
        carouselImage.alt = currentImage.alt;
        carouselCounter.textContent = `${currentCarouselIndex + 1} / ${currentCarouselImages.length}`;
        
        // Animación de entrada
        setTimeout(() => {
            carouselImage.style.opacity = '1';
            carouselImage.style.transform = 'scale(1)';
        }, 50);
    }, 200);
    
    // Actualizar estado de los botones
    carouselPrev.disabled = currentCarouselIndex === 0;
    carouselNext.disabled = currentCarouselIndex === currentCarouselImages.length - 1;
}

// Event listeners del carrusel
carouselClose.addEventListener('click', closeCarousel);
carouselModal.addEventListener('click', (e) => {
    if (e.target === carouselModal) {
        closeCarousel();
    }
});

carouselPrev.addEventListener('click', () => {
    if (currentCarouselIndex > 0) {
        currentCarouselIndex--;
        updateCarouselImage();
    }
});

carouselNext.addEventListener('click', () => {
    if (currentCarouselIndex < currentCarouselImages.length - 1) {
        currentCarouselIndex++;
        updateCarouselImage();
    }
});

// Agregar eventos de clic a los items de la galería
document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
        const galleryType = item.getAttribute('data-gallery');
        const parentSection = item.closest('section');
        const sectionItems = Array.from(parentSection.querySelectorAll(`.gallery-item[data-gallery="${galleryType}"]`));
        const itemIndex = sectionItems.indexOf(item);
        openCarousel(galleryType, itemIndex);
    });
});

// Soporte táctil para navegación del carrusel en móviles
let touchStartX = 0;
let touchEndX = 0;

carouselModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carouselModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe izquierda - siguiente imagen
            if (currentCarouselIndex < currentCarouselImages.length - 1) {
                carouselNext.click();
            }
        } else {
            // Swipe derecha - imagen anterior
            if (currentCarouselIndex > 0) {
                carouselPrev.click();
            }
        }
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'error') {
    const modal = document.getElementById('notification-modal');
    const messageEl = modal.querySelector('.notification-message');
    const iconEl = modal.querySelector('.notification-icon');
    
    messageEl.textContent = message;
    iconEl.textContent = type === 'error' ? '✗' : '✓';
    modal.classList.add('show');
    modal.classList.remove('error', 'success');
    modal.classList.add(type);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        modal.classList.remove('show');
    }, 5000);
}

// Cerrar modal manualmente
const closeBtn = document.querySelector('.notification-close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById('notification-modal').classList.remove('show');
    });
}

// Redirección despues del correo de contacta
const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const telefonoInput = document.getElementById('telefono');
    const telefono = telefonoInput.value.trim();
    
    if (!/^[0-9]{9}$/.test(telefono)) {
        showNotification('El teléfono debe contener exactamente 9 dígitos.', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch("https://formsubmit.co/rzpowerhouse@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok || response.type === 'opaque') {
            showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            form.reset();
            submitBtn.textContent = '✓ ENVIADO';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        console.error("Exception on form submit:", error);
        showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

if (typeof gtag !== 'undefined') {
    
    // 1. Track page view (número de visitas)
    gtag('event', 'page_load', {
        'event_category': 'Engagement',
        'event_label': 'Landing Page Load',
        'page_location': window.location.href,
        'page_title': document.title
    });
    
    // 2. Track gallery section view (quien vio la galería)
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const galleryViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        'event_category': 'Content',
                        'event_label': 'Gallery Section',
                        'value': 1
                    });
                    galleryViewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        galleryViewObserver.observe(gallerySection);
    }
    
    // 3. Track products section view (quien vio los productos)
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const productsViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        'event_category': 'Content',
                        'event_label': 'Products Section',
                        'value': 1
                    });
                    productsViewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        productsViewObserver.observe(productsSection);
    }
    
    // 4. Track Instagram clicks
    const instagramLink = document.querySelector('a[href*="instagram.com/rzpowerhouse"]');
    if (instagramLink) {
        instagramLink.addEventListener('click', () => {
            gtag('event', 'instagram_click', {
                'event_category': 'Social Media',
                'event_label': 'Instagram Profile',
                'value': 1
            });
        });
    }
    
    // 5. Track TikTok clicks
    const tiktokLink = document.querySelector('a[href*="tiktok.com/@antonirzpower"]');
    if (tiktokLink) {
        tiktokLink.addEventListener('click', () => {
            gtag('event', 'tiktok_click', {
                'event_category': 'Social Media',
                'event_label': 'TikTok Profile',
                'value': 1
            });
        });
    }
    
    // 6. Track YouTube clicks
    const youtubeLink = document.querySelector('a[href*="youtube.com"]');
    if (youtubeLink) {
        youtubeLink.addEventListener('click', () => {
            gtag('event', 'youtube_click', {
                'event_category': 'Social Media',
                'event_label': 'YouTube Channel',
                'value': 1
            });
        });
    }
}

// Funcion video productos
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const instagramLink = document.getElementById('instagramLink');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video-src');
            const instagramUrl = this.getAttribute('data-instagram-url');
            
            if (videoSrc) {
                videoContainer.innerHTML = '';
                
                const video = document.createElement('video');
                video.src = videoSrc;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.controls = false;
                video.playsInline = true;
                
                videoContainer.appendChild(video);
                
                instagramLink.href = instagramUrl;
                instagramLink.style.display = 'inline-block';
                
                modal.style.display = 'flex';
            }
        });
    });

    // Cerrar el modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        videoContainer.innerHTML = '';
        instagramLink.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoContainer.innerHTML = '';
            instagramLink.style.display = 'none';
        }
    });
});
