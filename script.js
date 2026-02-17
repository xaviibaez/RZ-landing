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

const carouselModal = document.getElementById('carousel-modal');
const carouselImageContainer = document.querySelector('.carousel-image-container');
const carouselImage = document.querySelector('.carousel-image');
const carouselCounter = document.querySelector('.carousel-counter');
const carouselClose = document.querySelector('.carousel-close');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const instagramLink = document.getElementById('instagramLink');

let currentCarouselIndex = 0;
let currentCarouselItems = [];
let carouselVideo = null;

// Datos de las imágenes por galería
const galleryImages = {
    powerlifting: [
        { src: './assets/images/gallery/powerlifting/bench-press-1.jpg', alt: 'Press de banca en zona de powerlifting con equipamiento profesional' },
        { src: './assets/images/gallery/powerlifting/bench-press-2.jpg', alt: 'Press de banca con barra olímpica para entrenamiento de powerlifting' },
        { src: './assets/images/gallery/powerlifting/bench-press-3.jpg', alt: 'Press de banca pesado en plataforma de powerlifting' },
        { src: './assets/images/gallery/powerlifting/bench-press-4.jpg', alt: 'Atleta realizando press de banca en rack de competición' },
        { src: './assets/images/gallery/powerlifting/bench-press-5.jpg', alt: 'Press de banca con técnica de powerlifting en gimnasio especializado' },
        { src: './assets/images/gallery/powerlifting/bench-press-6.jpg', alt: 'Entrenamiento de press de banca con material homologado de powerlifting' },
        { src: './assets/images/gallery/powerlifting/bench-press-7.jpg', alt: 'Sesión de press de banca enfocada a fuerza máxima' },
        { src: './assets/images/gallery/powerlifting/deadlift-1.jpg', alt: 'Peso muerto en plataforma de powerlifting con barra olímpica' },
        { src: './assets/images/gallery/powerlifting/deadlift-2.jpg', alt: 'Levantamiento de peso muerto en entrenamiento de fuerza' },
        { src: './assets/images/gallery/powerlifting/deadlift-3.jpg', alt: 'Peso muerto convencional en zona de powerlifting' },
        { src: './assets/images/gallery/powerlifting/squat-1.jpg', alt: 'Sentadilla trasera en rack profesional de powerlifting' },
        { src: './assets/images/gallery/powerlifting/squat-2.jpg', alt: 'Entrenamiento de sentadilla con cargas altas' },
        { src: './assets/images/gallery/powerlifting/competition-racks.jpg', alt: 'Racks de competición oficiales para powerlifting' }
    ],

    lowerBody: [
        { src: './assets/images/gallery/lower-body/abductor-outer-thigh-1.jpg', alt: 'Máquina de abductores para trabajo de glúteo y cadera' },
        { src: './assets/images/gallery/lower-body/abductor-outer-thigh-2.jpg', alt: 'Entrenamiento de abductores en máquina profesional' },
        { src: './assets/images/gallery/lower-body/abductor-outer-thigh-3.jpg', alt: 'Trabajo específico de musculatura externa del muslo' },
        { src: './assets/images/gallery/lower-body/belt-squat-1.jpg', alt: 'Belt squat para entrenamiento de piernas sin carga axial' },
        { src: './assets/images/gallery/lower-body/belt-squat-2.jpg', alt: 'Sentadilla con cinturón en máquina belt squat' },
        { src: './assets/images/gallery/lower-body/hack-squat-1.jpg', alt: 'Hack squat para desarrollo de cuádriceps' },
        { src: './assets/images/gallery/lower-body/hack-squat-2.jpg', alt: 'Entrenamiento de piernas en máquina hack squat' },
        { src: './assets/images/gallery/lower-body/seated-leg-curl.jpg', alt: 'Curl femoral sentado para isquiotibiales' },
        { src: './assets/images/gallery/lower-body/unilateral-standing-leg-curl.jpg', alt: 'Curl femoral unilateral de pie' },
        { src: './assets/images/gallery/lower-body/leg-extension.jpg', alt: 'Extensión de piernas en máquina para cuádriceps' },
        { src: './assets/images/gallery/lower-body/hip-thrust.jpg', alt: 'Hip thrust para fortalecimiento de glúteos' }
    ],

    upperBody: [
        { src: './assets/images/gallery/upper-body/standing-vertical-chest-press-1.jpg', alt: 'Press vertical de pecho de pie en máquina' },
        { src: './assets/images/gallery/upper-body/standing-vertical-chest-press-2.jpg', alt: 'Entrenamiento de pecho en press vertical' },
        { src: './assets/images/gallery/upper-body/standing-lateral-raise-machine.jpg', alt: 'Elevaciones laterales en máquina para hombro' },
        { src: './assets/images/gallery/upper-body/adjustable-double-pulley.jpg', alt: 'Poleas dobles ajustables para entrenamiento funcional' },
        { src: './assets/images/gallery/upper-body/high-and-low-pulley.jpg', alt: 'Sistema de poleas altas y bajas para tren superior' },
        { src: './assets/images/gallery/upper-body/multipower.jpg', alt: 'Multipower para entrenamiento guiado de fuerza' },
        { src: './assets/images/gallery/upper-body/multipress.jpg', alt: 'Máquina multipress para pecho y hombro' },
        { src: './assets/images/gallery/upper-body/decline-press.jpg', alt: 'Press declinado para trabajo de pecho inferior' },
        { src: './assets/images/gallery/upper-body/t-bar-row.jpg', alt: 'Remo en barra T para espalda' },
        { src: './assets/images/gallery/upper-body/biceps-curl.jpg', alt: 'Curl de bíceps en máquina para aislamiento muscular' }
    ],

    gym: [
        { src: './assets/images/gallery/gym/gym-1.jpg', alt: 'Vista general de las instalaciones de RZ Power House' },
        { src: './assets/images/gallery/gym/gym-2.jpg', alt: 'Zona de entrenamiento funcional y racks de potencia' },
        { src: './assets/images/gallery/gym/gym-3.jpg', alt: 'Área de peso libre con plataformas de competición' },
        { src: './assets/images/gallery/gym/gym-4.jpg', alt: 'Equipamiento de alta gama para entrenamiento de fuerza' },
        { src: './assets/images/gallery/gym/gym-5.jpg', alt: 'Detalle de la zona de racks y barras olímpicas' },
        { src: './assets/images/gallery/gym/gym-6.jpg', alt: 'Instalaciones optimizadas para powerlifting de alto rendimiento' },
        { src: './assets/images/gallery/gym/gym-7.jpg', alt: 'Vista panorámica de la sala principal de entrenamiento' },
        { src: './assets/images/gallery/gym/rz-power-house.jpg', alt: 'Logotipo y entrada principal de RZ Power House' },
        { src: './assets/images/gallery/gym/fall-in-love-with-the-process.jpg', alt: 'Mural motivacional: Fall in love with the process' },
        { src: './assets/images/gallery/gym/corner-cafe.jpg', alt: 'Zona de descanso y Corner Café para atletas' }
    ],

    material: [
        { src: './assets/images/gallery/material/swiss-bar.jpg', alt: 'Barra suiza multi-agarre para entrenamiento de empuje' },
        { src: './assets/images/gallery/material/bars.jpg', alt: 'Colección de barras olímpicas y especiales para levantamiento' },
        { src: './assets/images/gallery/material/bow-bar-1.jpg', alt: 'Barra curvada especial para sentadillas y comodidad de hombros' },
        { src: './assets/images/gallery/material/bow-bar-2.jpg', alt: 'Detalle de bow bar para sentadilla técnica' },
        { src: './assets/images/gallery/material/barbell-set.jpg', alt: 'Set completo de barras profesionales para competición' },
        { src: './assets/images/gallery/material/calibrated-discs.jpg', alt: 'Discos de competición calibrados de alta precisión' },
        { src: './assets/images/gallery/material/power-bar.jpg', alt: 'Barra rígida específica para powerlifting' },
        { src: './assets/images/gallery/material/rack.jpg', alt: 'Rack de potencia robusto con sistemas de seguridad' },
        { src: './assets/images/gallery/material/pulleys.jpg', alt: 'Sistema de poleas profesionales para trabajo accesorio' },
        { src: './assets/images/gallery/material/dumbbells-rack.jpg', alt: 'Mancuernas de caucho organizadas en rack profesional' },
        { src: './assets/images/gallery/material/metal-discs.jpg', alt: 'Discos de hierro fundido clásicos para entrenamiento pesado' }
    ],

    productsTshirts: [
        { src: './assets/images/products/sleeveless-t-shirt.jpg', alt: 'Camiseta sin mangas RZ Power House' },
        { src: './assets/images/products/hoodie1.jpg', alt: 'Sudadera con capucha RZ Power House' },
        { src: './assets/images/products/t-shirt.jpg', alt: 'Camiseta RZ Power House' },
        { src: './assets/images/products/sweat-suit.jpg', alt: 'Conjunto deportivo RZ Power House' }
    ]
};

// Función para abrir el carrusel de imágenes
function openCarousel(galleryType, startIndex) {
    currentCarouselItems = galleryImages[galleryType] || [];
    currentCarouselIndex = startIndex;
    updateCarouselImage();
    carouselModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el carrusel
function closeCarousel() {
    carouselModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Limpiar estado específico de vídeos
    if (carouselVideo) {
        carouselVideo.pause();
    }
    if (instagramLink) {
        instagramLink.style.display = 'none';
        instagramLink.removeAttribute('href');
    }
}

function updateCarouselImage() {
    const currentItem = currentCarouselItems[currentCarouselIndex];
    if (!currentItem) return;
    
    const isVideo = currentItem.type === 'video';
    
    // Animación de salida
    carouselImage.style.opacity = '0';
    carouselImage.style.transform = 'scale(0.95)';
    if (carouselVideo) {
        carouselVideo.style.opacity = '0';
        carouselVideo.style.transform = 'scale(0.95)';
    }
    
    setTimeout(() => {
        if (isVideo) {
            if (!carouselVideo) {
                carouselVideo = document.createElement('video');
                carouselVideo.classList.add('carousel-video');
                carouselVideo.autoplay = true;
                carouselVideo.muted = true;
                carouselVideo.loop = true;
                carouselVideo.controls = false;
                carouselVideo.playsInline = true;
                carouselImageContainer.insertBefore(carouselVideo, carouselCounter);
            }
            
            carouselVideo.src = currentItem.src;
            carouselVideo.style.display = 'block';
            carouselImage.style.display = 'none';
            
            if (instagramLink && currentItem.instagramUrl) {
                instagramLink.href = currentItem.instagramUrl;
                instagramLink.style.display = 'inline-block';
            }
        } else {
            if (carouselVideo) {
                carouselVideo.pause();
                carouselVideo.style.display = 'none';
            }
            
            carouselImage.src = currentItem.src;
            carouselImage.alt = currentItem.alt || '';
            carouselImage.style.display = 'block';
            
            if (instagramLink) {
                instagramLink.style.display = 'none';
                instagramLink.removeAttribute('href');
            }
        }
        
        carouselCounter.textContent = `${currentCarouselIndex + 1} / ${currentCarouselItems.length}`;
        
        // Animación de entrada
        setTimeout(() => {
            if (isVideo && carouselVideo) {
                carouselVideo.style.opacity = '1';
                carouselVideo.style.transform = 'scale(1)';
            } else {
                carouselImage.style.opacity = '1';
                carouselImage.style.transform = 'scale(1)';
            }
        }, 50);
    }, 200);
    
    // Actualizar estado de los botones
    carouselPrev.disabled = currentCarouselIndex === 0;
    carouselNext.disabled = currentCarouselIndex === currentCarouselItems.length - 1;
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
    if (currentCarouselIndex < currentCarouselItems.length - 1) {
        currentCarouselIndex++;
        updateCarouselImage();
    }
});

document.querySelectorAll('#gallery .gallery-item').forEach((item) => {
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
            if (currentCarouselIndex < currentCarouselItems.length - 1) {
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

// Datos de los vídeos de la galería de productos
const productVideos = {
    sweatshirt: [
        { type: 'video', src: './assets/videos/products/sweatshirt.mp4', instagramUrl: 'https://www.instagram.com/reel/DP1xbFLivBj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
    ],
    tankTop: [ 
        { type: 'video', src: './assets/videos/products/tank-top.mp4', instagramUrl: 'https://www.instagram.com/reel/DKIOFzZCXl4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
    ],
    tracksuit: [
        { type: 'video', src: './assets/videos/products/tracksuit.mp4', instagramUrl: 'https://www.instagram.com/reel/DJHv-4aiI7L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
    ],
    tShirt: [
        { type: 'video', src: './assets/videos/products/t-shirt.mp4', instagramUrl: 'https://www.instagram.com/reel/DA6dryjIWD8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
    ],
    straps: [
        { type: 'video', src: './assets/videos/products/straps.mp4', instagramUrl: 'https://www.instagram.com/reel/CrMDmKgoFcU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
    ],
    beltWristbands: [
        { type: 'video', src: './assets/videos/products/belt-and-wristbands.mp4', instagramUrl: 'https://www.instagram.com/reel/CyO0mjYI18q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
    ]
};

// Función para abrir el carrusel con vídeos de productos
function openProductCarousel(galleryType, startIndex) {
    currentCarouselItems = productVideos[galleryType] || [];
    currentCarouselIndex = startIndex;
    updateCarouselImage();
    carouselModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Eventos de clic para los productos (usan el mismo carrusel)
document.querySelectorAll('#products .gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
        const productId = item.getAttribute('product-id');
        const parentSection = item.closest('section');
        const sectionItems = Array.from(parentSection.querySelectorAll(`.gallery-item[product-id="${productId}"]`));
        const itemIndex = sectionItems.indexOf(item);
        openProductCarousel(productId, itemIndex)
    });
});
