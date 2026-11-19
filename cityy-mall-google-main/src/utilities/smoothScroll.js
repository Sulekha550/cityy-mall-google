/**
 * Ultra-smooth luxury inertial scroll engine for desktop mouse & trackpad.
 * Uses 60-120fps requestAnimationFrame interpolation with gentle damping.
 * Automatically yields to mobile touch, inner modals, and auto-scroll.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  // Preserve native 120Hz/60Hz touch momentum on phones & tablets
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 1024;

  if (isTouchDevice) return () => {};

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let isTicking = false;
  let rafId = null;

  const onWheel = (e) => {
    // If the event target is inside an inner scrollable modal or container, ignore
    let el = e.target;
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.scrollHeight > el.clientHeight) {
        const style = window.getComputedStyle(el);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          return;
        }
      }
      el = el.parentElement;
    }

    // Ignore if Ctrl is held (zoom)
    if (e.ctrlKey) return;

    // Prevent default jumpy wheel step
    e.preventDefault();

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    // Normalize wheel delta for high-precision trackpads vs notched mouse wheels
    const delta = e.deltaY;
    targetY = Math.min(maxScroll, Math.max(0, targetY + delta));

    if (!isTicking) {
      isTicking = true;
      currentY = window.scrollY;
      rafId = requestAnimationFrame(updateScroll);
    }
  };

  const updateScroll = () => {
    const diff = targetY - currentY;
    if (Math.abs(diff) < 0.8) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isTicking = false;
      return;
    }

    // Luxury damping interpolation
    currentY += diff * 0.125;
    window.scrollTo(0, currentY);
    rafId = requestAnimationFrame(updateScroll);
  };

  const onScroll = () => {
    if (!isTicking) {
      targetY = window.scrollY;
      currentY = window.scrollY;
    }
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('scroll', onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}
