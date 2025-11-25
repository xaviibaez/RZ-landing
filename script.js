// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
console.log('Custom cursor script loaded.');
// Ocultar cursor personalizado en dispositivos móviles
const updateCursorVisibility = () => {
    if (window.innerWidth <= 768) {
        console.log('No custom cursor on mobile devices.');
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        document.body.style.cursor = 'none';
    }
};

// Ejecutar al cargar y al cambiar tamaño de ventana
updateCursorVisibility();
window.addEventListener('resize', updateCursorVisibility);

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = (e.clientX - 15) + 'px';
            cursorFollower.style.top = (e.clientY - 15) + 'px';
        }, 30);
    }
});

// Efecto hover en enlaces y botones
const interactiveElements = document.querySelectorAll('a, button, .service-card, .stat-card, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

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

// Animación de números (contador)
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateNumbers = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + (target === 1000 ? '+' : '');
            }
        };

        updateNumber();
    });
};

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animar números solo una vez
            if (entry.target.classList.contains('stats') && !hasAnimated) {
                animateNumbers();
                hasAnimated = true;
            }
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.reveal-text, .fade-in-up, .feature-item, .stats').forEach(el => {
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

// Animación de las estadísticas al hacer hover
statNumbers.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.transform = 'scale(1.1)';
        stat.style.transition = 'transform 0.3s ease';
    });

    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'scale(1)';
    });
});

// Efecto de partículas en el fondo (opcional - ligero)
const createParticle = () => {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'white';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.5';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.zIndex = '0';

    document.body.appendChild(particle);

    let pos = -10;
    const speed = Math.random() * 2 + 1;

    const fall = setInterval(() => {
        pos += speed;
        particle.style.top = pos + 'px';

        if (pos > window.innerHeight) {
            clearInterval(fall);
            particle.remove();
        }
    }, 30);
};

// Crear partículas ocasionalmente
setInterval(() => {
    if (Math.random() > 0.9) {
        createParticle();
    }
}, 1000);

// Efecto de escritura en los inputs del formulario
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

// Console log de bienvenida
console.log('%c💪 RZ POWER HOUSE - POWERLIFTING GYM 💪', 'color: white; background: black; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%cForja tu fuerza con nosotros', 'color: white; font-size: 14px;');

// Redirección despues del correo de contacta

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        await fetch("https://formsubmit.co/rzpowerhouse@gmail.com", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        });

        // Redirección relativa (localhost o dominio)
        // window.location.href = "";

    } catch (error) {
        console.error("Error enviando formulario:", error);
    }
});
