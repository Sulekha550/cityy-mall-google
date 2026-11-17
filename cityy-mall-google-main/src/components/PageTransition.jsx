import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../animations/scrollAnimations';

export function PageTransition({ routeKey, children }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0.72, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
    return () => tween.kill();
  }, [routeKey]);

  return (
    <div ref={wrapRef} className="w-full">
      {children}
    </div>
  );
}
