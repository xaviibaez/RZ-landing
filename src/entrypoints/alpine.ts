import type Alpine from 'alpinejs';

export default (Alpine: typeof Alpine) => {

  // ── Navbar: scroll hide/show + hamburger ──────────────────────────────────
  Alpine.data('navbar', () => ({
    open: false as boolean,
    scrolled: false as boolean,
    hidden: false as boolean,
    lastScroll: 0 as number,
    handleScroll() {
      const curr = window.scrollY;
      this.scrolled = curr > 80;
      if (curr < this.lastScroll) {
        this.hidden = false;
      } else if (curr > 300 && curr - this.lastScroll > 8) {
        this.hidden = true;
      }
      this.lastScroll = curr;
    },
  }));

  // ── Testimonials: auto-rotate slider ─────────────────────────────────────
  Alpine.data('testimonials', () => ({
    current: 0 as number,
    total: 0 as number,
    interval: null as ReturnType<typeof setInterval> | null,
    init() {
      this.total = parseInt((this.$el as HTMLElement).dataset.total || '0', 10);
      this.interval = setInterval(() => {
        this.current = (this.current + 1) % this.total;
      }, 5000);
    },
    destroy() {
      if (this.interval) clearInterval(this.interval);
    },
    goTo(index: number) {
      this.current = index;
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.current = (this.current + 1) % this.total;
      }, 5000);
    },
    prev() { this.goTo((this.current - 1 + this.total) % this.total); },
    next() { this.goTo((this.current + 1) % this.total); },
  }));

  // ── Gallery: image carousel with touch drag + slide animation ─────────────
  Alpine.data('gallery', () => ({
    isOpen: false as boolean,
    allImages: {} as Record<string, Array<{ src: string; alt: string }>>,
    images: [] as Array<{ src: string; alt: string }>,
    currentIndex: 0 as number,
    touchStartX: 0 as number,
    dragOffset: 0 as number,
    isDragging: false as boolean,

    init() {
      const raw = (this.$el as HTMLElement).dataset.images || '{}';
      this.allImages = JSON.parse(raw);
    },

    open(categoryKey: string, index: number) {
      this.images = this.allImages[categoryKey] || [];
      this.currentIndex = index;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
      this.dragOffset = 0;
      this.isDragging = false;
    },

    _animateSlide(dir: number) {
      this.$nextTick(() => {
        const img = (this.$refs as Record<string, HTMLElement>).carouselImg;
        if (!img) return;
        img.classList.remove('slide-from-right', 'slide-from-left');
        void img.offsetWidth; // force reflow to restart animation
        img.classList.add(dir > 0 ? 'slide-from-right' : 'slide-from-left');
      });
    },

    prev() {
      if (this.images.length <= 1) return;
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this._animateSlide(-1);
    },

    next() {
      if (this.images.length <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this._animateSlide(1);
    },

    onTouchStart(e: TouchEvent) {
      this.touchStartX = e.touches[0].clientX;
      this.isDragging = true;
      this.dragOffset = 0;
    },

    onTouchMove(e: TouchEvent) {
      if (!this.isDragging) return;
      this.dragOffset = e.touches[0].clientX - this.touchStartX;
    },

    onTouchEnd(e: TouchEvent) {
      const diff = this.touchStartX - e.changedTouches[0].clientX;
      this.isDragging = false;
      this.dragOffset = 0;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    },
  }));

  // ── Products: video modal ─────────────────────────────────────────────────
  Alpine.data('productsCarousel', () => ({
    isOpen: false as boolean,
    productMap: {} as Record<string, { src: string; instagramUrl: string }>,
    currentVideo: null as { src: string; instagramUrl: string } | null,

    init() {
      const raw = (this.$el as HTMLElement).dataset.products || '{}';
      this.productMap = JSON.parse(raw);
    },

    open(productId: string) {
      const video = this.productMap[productId];
      if (video) {
        this.currentVideo = video;
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
      }
    },

    close() {
      this.isOpen = false;
      this.currentVideo = null;
      document.body.style.overflow = '';
    },
  }));

  // ── Contact form: fetch + toast ───────────────────────────────────────────
  Alpine.data('contactForm', () => ({
    loading: false as boolean,
    status: null as 'success' | 'error' | null,
    message: '' as string,
    form: {
      nombre: '' as string,
      correo: '' as string,
      telefono: '' as string,
      interes: '' as string,
      mensaje: '' as string,
    },

    async submit() {
      if (!/^[0-9]{9}$/.test(this.form.telefono)) {
        this.status = 'error';
        this.message = 'El teléfono debe contener exactamente 9 dígitos.';
        setTimeout(() => { this.status = null; }, 5000);
        return;
      }

      if (!this.form.nombre || !this.form.correo || !this.form.interes) {
        this.status = 'error';
        this.message = 'Por favor completa todos los campos obligatorios.';
        setTimeout(() => { this.status = null; }, 5000);
        return;
      }

      this.loading = true;
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });
        const data = await res.json();

        if (data.ok) {
          this.status = 'success';
          this.message = '¡Mensaje enviado! Te contactaremos pronto.';
          this.form = { nombre: '', correo: '', telefono: '', interes: '', mensaje: '' };
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      } catch {
        this.status = 'error';
        this.message = 'Error al enviar. Inténtalo de nuevo o contáctanos por WhatsApp.';
      } finally {
        this.loading = false;
        setTimeout(() => { this.status = null; }, 6000);
      }
    },
  }));
};
