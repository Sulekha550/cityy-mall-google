import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Registers bidirectional (scroll down + scroll up) GSAP ScrollTrigger animations
 * scoped to a root container using composited transform and opacity properties only.
 */
export function registerSectionMotion(containerEl, mode = 'editorial') {
  if (!containerEl || prefersReducedMotion()) {
    return () => {};
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const ctx = gsap.context(() => {
    const revealEls = containerEl.querySelectorAll('[data-motion="reveal"]');
    if (revealEls.length > 0) {
      revealEls.forEach((el, idx) => {
        const yFrom = mode === 'cascade' ? (isMobile ? 12 : 24 + (idx % 3) * 8) : (isMobile ? 10 : 20);
        // On mobile or if already in view, ensure text is never invisible
        const initialOpacity = isMobile ? 0.95 : 0.85;

        gsap.fromTo(
          el,
          { y: yFrom, opacity: initialOpacity },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.45 : 0.7,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: isMobile ? 'top 98%' : 'top 92%',
              once: true,
            },
          }
        );
      });
    }

    // Sequential Staggered Images (Appear one by one on scroll down)
    const seqImgEls = containerEl.querySelectorAll('[data-motion="seq-img"]');
    if (seqImgEls.length > 0) {
      seqImgEls.forEach((el) => {
        const idx = parseInt(el.getAttribute('data-seq-index') || '0', 10);
        const dir = el.getAttribute('data-seq-from') || (idx % 2 === 0 ? 'up' : 'right');
        const delay = isMobile ? Math.min(0.2, idx * 0.1) : idx * 0.2;

        let fromVars = {
          opacity: isMobile ? 0.6 : 0.2,
          scale: 0.96,
          duration: isMobile ? 0.5 : 0.75,
          ease: 'power3.out',
        };
        if (dir === 'up') fromVars = { ...fromVars, y: isMobile ? 18 : 35 };
        else if (dir === 'down') fromVars = { ...fromVars, y: isMobile ? -18 : -28 };
        else if (dir === 'right') fromVars = { ...fromVars, x: isMobile ? 20 : 40 };
        else if (dir === 'left') fromVars = { ...fromVars, x: isMobile ? -20 : -40 };

        gsap.fromTo(
          el,
          fromVars,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: isMobile ? 0.5 : 0.75,
            delay,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: containerEl,
              start: isMobile ? 'top 95%' : 'top 88%',
              once: true,
            },
          }
        );
      });
    }

    // Only run parallax on desktop/laptop for ultra-smooth 60-120fps mobile performance
    if (!isMobile) {
      const parallaxUpEls = containerEl.querySelectorAll('[data-parallax="up"]');
      parallaxUpEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18 },
          {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: containerEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      });

      const parallaxDownEls = containerEl.querySelectorAll('[data-parallax="down"]');
      parallaxDownEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: -16 },
          {
            y: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: containerEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      });

      const tiltEls = containerEl.querySelectorAll('[data-parallax="drift"]');
      tiltEls.forEach((el) => {
        gsap.fromTo(
          el,
          { x: -12, scale: 0.99 },
          {
            x: 12,
            scale: 1.01,
            ease: 'none',
            scrollTrigger: {
              trigger: containerEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });
    }
  }, containerEl);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => ctx.revert();
}
