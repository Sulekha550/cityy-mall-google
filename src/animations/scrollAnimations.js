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

  const ctx = gsap.context(() => {
    const revealEls = containerEl.querySelectorAll('[data-motion="reveal"]');
    if (revealEls.length > 0) {
      revealEls.forEach((el, idx) => {
        const yFrom = mode === 'cascade' ? 28 + (idx % 3) * 10 : 22;
        gsap.fromTo(
          el,
          { y: yFrom, opacity: 0.72 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }

    const parallaxUpEls = containerEl.querySelectorAll('[data-parallax="up"]');
    parallaxUpEls.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 24 },
        {
          y: -24,
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

    const parallaxDownEls = containerEl.querySelectorAll('[data-parallax="down"]');
    parallaxDownEls.forEach((el) => {
      gsap.fromTo(
        el,
        { y: -20 },
        {
          y: 22,
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

    const tiltEls = containerEl.querySelectorAll('[data-parallax="drift"]');
    tiltEls.forEach((el) => {
      gsap.fromTo(
        el,
        { x: -16, scale: 0.98 },
        {
          x: 16,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );
    });
  }, containerEl);

  return () => ctx.revert();
}
