import type Alpine from 'alpinejs';

export default (Alpine: typeof Alpine) => {
  // Navbar: scroll hide/show + hamburger
  Alpine.data('navbar', () => ({
    open: false as boolean,
    scrolled: false as boolean,
    hidden: false as boolean,
    lastScroll: 0 as number,
    handleScroll() {
      const curr = window.scrollY;
      this.scrolled = curr > 100;
      this.hidden = curr > 200 && curr > this.lastScroll;
      this.lastScroll = curr;
    },
  }));

  // Testimonials: auto-rotate slider
  Alpine.data('testimonials', () => ({
    current: 0 as number,
    total: 3 as number,
    interval: null as ReturnType<typeof setInterval> | null,
    init() {
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
    prev() {
      this.goTo((this.current - 1 + this.total) % this.total);
    },
    next() {
      this.goTo((this.current + 1) % this.total);
    },
  }));
};
