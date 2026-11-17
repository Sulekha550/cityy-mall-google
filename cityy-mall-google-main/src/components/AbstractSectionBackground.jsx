import { useEffect, useRef } from 'react';

/**
 * Detect section variant based on explicit variant or videoAsset metadata
 */
export function detectSectionVariant(videoAsset, explicitVariant) {
  if (explicitVariant) return explicitVariant;
  const src = (videoAsset?.src || '').toLowerCase();
  const label = (videoAsset?.label || '').toLowerCase();
  const combined = `${src} ${label}`;

  if (combined.includes('hero')) return 'hero';
  if (combined.includes('dining')) return 'dining';
  if (combined.includes('cinema') || combined.includes('theat') || combined.includes('dome')) return 'entertainment';
  if (combined.includes('visit') || combined.includes('entrance') || combined.includes('plaza')) return 'visit';
  if (combined.includes('supermarket')) return 'supermarket';
  if (combined.includes('event') || combined.includes('gala')) return 'events';
  if (combined.includes('storefront') || combined.includes('brand')) return 'brands';
  if (
    combined.includes('fashion') ||
    combined.includes('footwear') ||
    combined.includes('jewel') ||
    combined.includes('beauty')
  ) {
    return 'shopping';
  }
  if (combined.includes('architect') || combined.includes('interior') || combined.includes('promenade')) {
    return 'explore';
  }

  return 'hero';
}

/**
 * 3D Vector Math Helpers for genuine 3D perspective without heavy WebGL contexts
 */
function rotateX(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function rotateY(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}

function project(p, cx, cy, fov = 420) {
  const scale = fov / (fov + p.z);
  return {
    x: cx + p.x * scale,
    y: cy + p.y * scale,
    scale,
    visible: p.z > -fov + 10,
  };
}

/**
 * Premium Abstract Animated Canvas Backdrop.
 * Purely abstract, geometric, architectural and cinematic.
 * Strictly zero human footage, zero stock videos, zero real-world crowds.
 */
export function AbstractSectionBackground({
  variant,
  videoAsset,
  tintClassName,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const activeVariant = detectSectionVariant(videoAsset, variant);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return undefined;

    let animId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    // Mouse parallax tracking with lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Scroll tracking
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;

    const checkDark = () => document.documentElement.classList.contains('dark');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Responsive Canvas Resize
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(300, rect.width);
      height = Math.max(300, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Host section mouse parallax & activity tracking
    const hostSection = container.closest('section') || container.parentElement;

    // Mouse Activity Controller: Background animation runs ONLY when mouse is used, stops otherwise
    let mouseActivity = 0;
    let targetMouseActivity = 0;
    let mouseStopTimeout = null;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const wakeMouseActivity = (boost = 1.0) => {
      targetMouseActivity = Math.min(2.5, Math.max(targetMouseActivity, boost));
      if (mouseStopTimeout) clearTimeout(mouseStopTimeout);
      // When mouse stops for 550ms, decelerate smoothly to a complete halt
      mouseStopTimeout = setTimeout(() => {
        targetMouseActivity = 0;
      }, 550);
    };

    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - prevMouseX, e.clientY - prevMouseY);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      if (dist > 0.5) {
        wakeMouseActivity(Math.min(2.2, 0.75 + dist * 0.05));
      }

      if (!hostSection) return;
      const rect = hostSection.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    const handleWheel = (e) => {
      const delta = Math.abs(e.deltaY) + Math.abs(e.deltaX);
      if (delta > 0) {
        wakeMouseActivity(Math.min(2.5, 0.9 + delta * 0.03));
      }
    };

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      if (delta > 0) {
        wakeMouseActivity(Math.min(2.5, 0.9 + delta * 0.04));
      }
    };

    const handlePointerDown = () => {
      wakeMouseActivity(1.0);
    };

    const handleTouchStart = (e) => {
      wakeMouseActivity(1.2);
      if (e.touches && e.touches[0] && hostSection) {
        const touch = e.touches[0];
        const rect = hostSection.getBoundingClientRect();
        targetMouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
      }
    };

    const handleTouchMove = (e) => {
      wakeMouseActivity(1.4);
      if (e.touches && e.touches[0] && hostSection) {
        const touch = e.touches[0];
        const rect = hostSection.getBoundingClientRect();
        targetMouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (hostSection) {
      hostSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // IntersectionObserver to pause when offscreen
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined' && hostSection) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
          }
        },
        { threshold: [0, 0.05] }
      );
      observer.observe(hostSection);
    }

    // =========================================================================
    // PROCEDURAL PARTICLES & GEOMETRY POOLS
    // =========================================================================
    const particleCount = activeVariant === 'events' ? 70 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      z: (Math.random() - 0.5) * 600,
      size: 1.2 + Math.random() * 2.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -0.2 - Math.random() * 0.45,
      pulseSpeed: 1 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.2 + Math.random() * 0.6,
    }));

    // 3D Diamond / Prismatic Polyhedra for Hero & Shopping
    const diamonds = Array.from({ length: 6 }, (_, i) => ({
      x: ((i % 3) - 1) * 320 + (Math.random() - 0.5) * 80,
      y: (Math.floor(i / 3) - 0.5) * 260 + (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 300,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotSpeedX: 0.18 + Math.random() * 0.22,
      rotSpeedY: 0.24 + Math.random() * 0.28,
      radius: 40 + Math.random() * 32,
    }));

    // Geodesic Dome Vertices for Entertainment
    const domeRings = 4;
    const domeSlices = 8;
    const domeVertices = [];
    const domeEdges = [];

    for (let r = 0; r <= domeRings; r++) {
      const phi = (r / domeRings) * (Math.PI * 0.42);
      for (let s = 0; s < domeSlices; s++) {
        const theta = (s / domeSlices) * Math.PI * 2;
        const rad = 220;
        domeVertices.push({
          x: rad * Math.sin(phi) * Math.cos(theta),
          y: -rad * Math.cos(phi) + 100,
          z: rad * Math.sin(phi) * Math.sin(theta),
        });
      }
    }

    for (let r = 0; r <= domeRings; r++) {
      for (let s = 0; s < domeSlices; s++) {
        const curr = r * domeSlices + s;
        const next = r * domeSlices + ((s + 1) % domeSlices);
        domeEdges.push([curr, next]);
        if (r < domeRings) {
          const below = (r + 1) * domeSlices + s;
          domeEdges.push([curr, below]);
        }
      }
    }

    // =========================================================================
    // MAIN RENDER LOOP
    // =========================================================================
    let lastTime = performance.now();

    const render = (now) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const speedFactor = prefersReducedMotion ? 0.2 : 1;
      
      // Smooth decay/ramp of mouse activity
      const lerpSpeed = targetMouseActivity > mouseActivity ? 8.0 : 2.8;
      mouseActivity += (targetMouseActivity - mouseActivity) * Math.min(1, dt * lerpSpeed);
      if (mouseActivity < 0.005 && targetMouseActivity === 0) {
        mouseActivity = 0;
      }

      // CONTINUOUS GENTLE AMBIENT BREATHING (0.20): Ensures background lines, waves & circles
      // are ALWAYS active & luminous on mobile & idle screens, accelerating dynamically on touch/mouse/scroll!
      const motionSpeed = 0.20 + mouseActivity * 0.80;
      time += dt * 0.45 * motionSpeed * speedFactor;

      // Mouse lerp
      mouseX += (targetMouseX - mouseX) * dt * 3;
      mouseY += (targetMouseY - mouseY) * dt * 3;

      const isDark = checkDark();

      // 1. BASE BACKGROUND GRADIENT (Warm Champagne/Lavender in Light, Deep Twilight Obsidian in Dark)
      drawBaseAtmosphere(ctx, width, height, time, isDark, activeVariant);

      // 2. PARALLAX OFFSET
      ctx.save();
      const px = mouseX * 24;
      const py = mouseY * 18;
      ctx.translate(px, py);

      // 3. VARIANT SPECIFIC PROCEDURAL ART
      switch (activeVariant) {
        case 'hero':
          drawHeroAtmosphere(ctx, width, height, time, isDark, diamonds);
          break;
        case 'explore':
          drawExploreAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'shopping':
          drawShoppingAtmosphere(ctx, width, height, time, isDark, diamonds);
          break;
        case 'dining':
          drawDiningAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'dining-hero':
          drawDiningHeroAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'bake':
          drawBakeAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'entertainment':
          drawEntertainmentAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'visit':
          drawVisitAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'brands':
          drawBrandsAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'events':
          drawEventsAtmosphere(ctx, width, height, time, isDark);
          break;
        case 'supermarket':
          drawSupermarketAtmosphere(ctx, width, height, time, isDark);
          break;
        default:
          drawHeroAtmosphere(ctx, width, height, time, isDark, diamonds);
          break;
      }

      // 4. FLOATING GLOWING PARTICLES & AMBIENT STARLIGHT (Move ONLY when mouse is used)
      drawAmbientParticles(ctx, width, height, particles, time, isDark, activeVariant, motionSpeed);

      ctx.restore();

      // 5. SUBTLE VIGNETTE TO RETAIN CRISP TEXT READABILITY
      drawCinematicVignette(ctx, width, height, isDark);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (mouseStopTimeout) clearTimeout(mouseStopTimeout);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (hostSection) {
        hostSection.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (observer) observer.disconnect();
    };
  }, [activeVariant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      {/* Optional gentle theme gradient overlay - tempered so procedural lines stay crisp and vibrant */}
      {tintClassName && (
        <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none opacity-20 mix-blend-multiply dark:mix-blend-soft-light ${tintClassName}`} />
      )}
    </div>
  );
}

// =============================================================================
// SUB-RENDERERS FOR LUXURY PROCEDURAL EFFECTS
// =============================================================================

function drawBaseAtmosphere(ctx, w, h, t, isDark, variant) {
  if (variant === 'dining') {
    // Deep burgundy & dark wine-red tone ALWAYS for dining, matching reference screenshot
    const wineGrad = ctx.createLinearGradient(0, 0, 0, h);
    wineGrad.addColorStop(0, '#150604');
    wineGrad.addColorStop(0.35, '#200806');
    wineGrad.addColorStop(0.7, '#2D0B08');
    wineGrad.addColorStop(1, '#541508');
    ctx.fillStyle = wineGrad;
    ctx.fillRect(0, 0, w, h);
    return;
  }

  if (variant === 'entertainment' || variant === 'cinema') {
    // Lighter, luminous royal violet & mulberry plum background (matching reference screenshot)
    const cinemaGrad = ctx.createLinearGradient(0, 0, w, h);
    cinemaGrad.addColorStop(0, '#5C2B8D');
    cinemaGrad.addColorStop(0.35, '#481E73');
    cinemaGrad.addColorStop(0.7, '#341457');
    cinemaGrad.addColorStop(1, '#240C3E');
    ctx.fillStyle = cinemaGrad;
    ctx.fillRect(0, 0, w, h);
    return;
  }

  if (variant === 'bake' || variant === 'dining-hero') {
    return;
  }

  // Flowing multidimensional radial gradients
  const g1x = w * 0.35 + Math.sin(t * 0.4) * (w * 0.15);
  const g1y = h * 0.4 + Math.cos(t * 0.5) * (h * 0.12);
  const g2x = w * 0.75 + Math.cos(t * 0.35) * (w * 0.15);
  const g2y = h * 0.65 + Math.sin(t * 0.45) * (h * 0.15);

  let bgGrad = ctx.createLinearGradient(0, 0, w, h);

  if (isDark) {
    // Twilight Plum, Obsidian & Deep Champagne
    bgGrad.addColorStop(0, '#130E1F');
    bgGrad.addColorStop(0.5, '#181226');
    bgGrad.addColorStop(1, '#110C1A');
  } else {
    // Warm Champagne Cream, Soft Lavender & Warm Peach
    bgGrad.addColorStop(0, '#FBF5EE');
    bgGrad.addColorStop(0.45, '#F3ECFA');
    bgGrad.addColorStop(1, '#FDEBE4');
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Soft luminous fluid blobs
  const rad1 = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, w * 0.65);
  const rad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, w * 0.6);

  if (isDark) {
    rad1.addColorStop(0, 'rgba(104, 59, 164, 0.22)');
    rad1.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
    rad1.addColorStop(1, 'rgba(0, 0, 0, 0)');

    rad2.addColorStop(0, 'rgba(201, 82, 60, 0.16)');
    rad2.addColorStop(0.6, 'rgba(104, 59, 164, 0.06)');
    rad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    rad1.addColorStop(0, 'rgba(212, 175, 55, 0.14)');
    rad1.addColorStop(0.5, 'rgba(239, 230, 250, 0.35)');
    rad1.addColorStop(1, 'rgba(255, 255, 255, 0)');

    rad2.addColorStop(0, 'rgba(253, 232, 223, 0.38)');
    rad2.addColorStop(0.55, 'rgba(240, 218, 170, 0.18)');
    rad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }

  ctx.fillStyle = rad1;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = rad2;
  ctx.fillRect(0, 0, w, h);
}

/**
 * 01. HERO ATMOSPHERE: Flowing Golden Geometric Lines, Light Trails & Floating 3D Diamonds
 */
function drawHeroAtmosphere(ctx, w, h, t, isDark, diamonds) {
  const cx = w * 0.5;
  const cy = h * 0.5;

  // 1. Flowing Architectural Canopy Ribbon Lines
  const ribbonCount = 6;
  ctx.lineWidth = 1.75;

  for (let r = 0; r < ribbonCount; r++) {
    const offset = r * 0.18;
    const strokeGrad = ctx.createLinearGradient(0, h * 0.2, w, h * 0.8);
    if (isDark) {
      strokeGrad.addColorStop(0, 'rgba(212, 175, 55, 0.0)');
      strokeGrad.addColorStop(0.35, 'rgba(240, 218, 170, 0.68)');
      strokeGrad.addColorStop(0.7, 'rgba(191, 161, 255, 0.58)');
      strokeGrad.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
    } else {
      strokeGrad.addColorStop(0, 'rgba(201, 150, 50, 0.0)');
      strokeGrad.addColorStop(0.35, 'rgba(195, 138, 38, 0.62)');
      strokeGrad.addColorStop(0.7, 'rgba(128, 70, 190, 0.52)');
      strokeGrad.addColorStop(1, 'rgba(201, 150, 50, 0.0)');
    }

    ctx.strokeStyle = strokeGrad;
    ctx.beginPath();

    const startY = h * 0.35 + Math.sin(t * 0.6 + offset) * 90;
    const cp1x = w * 0.28 + Math.cos(t * 0.5 + offset) * 70;
    const cp1y = h * 0.15 + Math.sin(t * 0.7 + offset * 1.5) * 80;
    const cp2x = w * 0.72 + Math.sin(t * 0.55 + offset) * 80;
    const cp2y = h * 0.85 + Math.cos(t * 0.65 + offset * 1.3) * 90;
    const endY = h * 0.65 + Math.cos(t * 0.7 + offset) * 70;

    ctx.moveTo(0, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, w, endY);
    ctx.stroke();

    // Secondary harmonic echo line for delicate depth
    ctx.beginPath();
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.28)' : 'rgba(195, 138, 38, 0.28)';
    ctx.moveTo(0, startY + 16);
    ctx.bezierCurveTo(cp1x + 10, cp1y + 16, cp2x - 10, cp2y + 16, w, endY + 16);
    ctx.stroke();
  }

  // 2. Rotating 3D Geometric Champagne Diamonds
  diamonds.forEach((d) => {
    const rx = t * d.rotSpeedX + d.rotX;
    const ry = t * d.rotSpeedY + d.rotY;

    // Diamond 6 vertices
    const rawVerts = [
      { x: 0, y: -d.radius, z: 0 },
      { x: d.radius * 0.75, y: 0, z: 0 },
      { x: 0, y: 0, z: d.radius * 0.75 },
      { x: -d.radius * 0.75, y: 0, z: 0 },
      { x: 0, y: 0, z: -d.radius * 0.75 },
      { x: 0, y: d.radius, z: 0 },
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
    ];

    const worldCenter = {
      x: cx + d.x + Math.sin(t * 0.5 + d.x) * 40,
      y: cy + d.y + Math.cos(t * 0.6 + d.y) * 35,
      z: d.z + Math.sin(t * 0.4 + d.z) * 50,
    };

    const proj = rawVerts.map((v) => {
      let r = rotateX(v, rx);
      r = rotateY(r, ry);
      r.x += worldCenter.x - cx;
      r.y += worldCenter.y - cy;
      r.z += worldCenter.z;
      return project(r, cx, cy, 500);
    });

    ctx.lineWidth = 1.35;
    ctx.strokeStyle = isDark
      ? 'rgba(240, 218, 170, 0.55)'
      : 'rgba(195, 138, 38, 0.52)';

    edges.forEach(([i, j]) => {
      if (proj[i].visible && proj[j].visible) {
        ctx.beginPath();
        ctx.moveTo(proj[i].x, proj[i].y);
        ctx.lineTo(proj[j].x, proj[j].y);
        ctx.stroke();
      }
    });

    // Glowing vertex points
    proj.forEach((p) => {
      if (p.visible) {
        ctx.fillStyle = isDark ? 'rgba(255, 240, 190, 0.8)' : 'rgba(212, 160, 45, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Soft translucent facet fill for front faces
    if (proj[0].visible && proj[1].visible && proj[2].visible) {
      ctx.fillStyle = isDark
        ? 'rgba(212, 175, 55, 0.08)'
        : 'rgba(212, 175, 55, 0.09)';
      ctx.beginPath();
      ctx.moveTo(proj[0].x, proj[0].y);
      ctx.lineTo(proj[1].x, proj[1].y);
      ctx.lineTo(proj[2].x, proj[2].y);
      ctx.closePath();
      ctx.fill();
    }
  });
}

/**
 * 02. EXPLORE / PROMENADE: Architectural Vault Grid & Perspective Line Formations
 */
function drawExploreAtmosphere(ctx, w, h, t, isDark) {
  const vanishingX = w * 0.5 + Math.sin(t * 0.3) * (w * 0.08);
  const vanishingY = h * 0.32 + Math.cos(t * 0.35) * (h * 0.06);

  ctx.lineWidth = 1.1;

  // 1. Perspective Vault Radial Rays
  const rayCount = 14;
  for (let i = 0; i <= rayCount; i++) {
    const angle = ((i / rayCount) * Math.PI) - (Math.PI * 0.05);
    const endX = vanishingX + Math.cos(angle) * (w * 1.2);
    const endY = vanishingY + Math.sin(angle) * (h * 1.2);

    const rayGrad = ctx.createLinearGradient(vanishingX, vanishingY, endX, endY);
    if (isDark) {
      rayGrad.addColorStop(0, 'rgba(240, 218, 170, 0.45)');
      rayGrad.addColorStop(0.3, 'rgba(191, 161, 255, 0.28)');
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      rayGrad.addColorStop(0, 'rgba(180, 125, 30, 0.38)');
      rayGrad.addColorStop(0.35, 'rgba(104, 59, 164, 0.22)');
      rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    }

    ctx.strokeStyle = rayGrad;
    ctx.beginPath();
    ctx.moveTo(vanishingX, vanishingY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  // 2. Concentric Elliptical Skylight Arcs
  const arcCount = 7;
  for (let a = 1; a <= arcCount; a++) {
    const factor = a / arcCount;
    const wave = Math.sin(t * 0.8 + a * 0.4) * 8;
    const rx = factor * w * 0.72 + wave;
    const ry = factor * h * 0.55 + wave * 0.6;

    ctx.strokeStyle = isDark
      ? `rgba(212, 175, 55, ${0.12 + (1 - factor) * 0.25})`
      : `rgba(180, 125, 30, ${0.15 + (1 - factor) * 0.22})`;

    ctx.beginPath();
    ctx.ellipse(vanishingX, vanishingY + 30, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Node intersection sparkles
    if (a % 2 === 0) {
      const nodeX = vanishingX + Math.cos(t * 0.6 + a) * rx * 0.7;
      const nodeY = vanishingY + 30 + Math.sin(t * 0.6 + a) * ry * 0.7;
      ctx.fillStyle = isDark ? '#F5E1A4' : '#C9523C';
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * 03. SHOPPING: Soft Champagne & Lavender Waves + Floating Diamond Vitrines
 */
function drawShoppingAtmosphere(ctx, w, h, t, isDark, diamonds) {
  // Dual Fluid Silk Harmonic Waves
  const waves = 4;
  for (let wIdx = 0; wIdx < waves; wIdx++) {
    const waveT = t * 0.5 + wIdx * 0.5;
    ctx.beginPath();
    const grad = ctx.createLinearGradient(0, 0, w, 0);

    if (isDark) {
      grad.addColorStop(0, 'rgba(191, 161, 255, 0.05)');
      grad.addColorStop(0.5, 'rgba(240, 218, 170, 0.38)');
      grad.addColorStop(1, 'rgba(191, 161, 255, 0.05)');
    } else {
      grad.addColorStop(0, 'rgba(104, 59, 164, 0.06)');
      grad.addColorStop(0.5, 'rgba(180, 125, 30, 0.34)');
      grad.addColorStop(1, 'rgba(104, 59, 164, 0.06)');
    }

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.4;

    const baseHeight = h * 0.25 + wIdx * (h * 0.18);
    ctx.moveTo(0, baseHeight);

    const step = 40;
    for (let x = 0; x <= w; x += step) {
      const y =
        baseHeight +
        Math.sin((x / w) * Math.PI * 3 + waveT) * 35 +
        Math.cos((x / w) * Math.PI * 2 - waveT * 0.8) * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Vitrine Wireframe Polygons
  const polyX = w * 0.82 + Math.cos(t * 0.4) * 35;
  const polyY = h * 0.42 + Math.sin(t * 0.45) * 40;
  const polyRad = 70;

  ctx.strokeStyle = isDark ? 'rgba(240, 218, 170, 0.35)' : 'rgba(180, 125, 30, 0.32)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let p = 0; p < 6; p++) {
    const ang = (p / 6) * Math.PI * 2 + t * 0.3;
    const px = polyX + Math.cos(ang) * polyRad;
    const py = polyY + Math.sin(ang) * polyRad;
    if (p === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  // Translucent inner facet
  ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.06)' : 'rgba(212, 175, 55, 0.08)';
  ctx.fill();
}

/**
 * 04. DINING: Deep Burgundy & Wine-Red Atmosphere + Horizontal Glowing Amber Streaks + Floating Golden Bokeh Orbs
 */
function drawDiningAtmosphere(ctx, w, h, t, isDark) {
  // 1. Deep Burgundy & Wine-Red Background with Soft Bottom Orange Glow
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#150604');
  bgGrad.addColorStop(0.35, '#200806');
  bgGrad.addColorStop(0.7, '#2D0B08');
  bgGrad.addColorStop(1, '#541508');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Horizontal Glowing Amber Light Streaks across the Screen (Matching Screenshot)
  const lineCount = 6;
  for (let l = 0; l < lineCount; l++) {
    const lineY = h * (0.16 + l * 0.14) + Math.sin(t * 0.4 + l * 1.2) * 6;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(w, lineY);

    const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
    const pulse = 0.28 + Math.sin(t * 0.7 + l * 1.5) * 0.12;
    lineGrad.addColorStop(0, `rgba(212, 120, 40, ${pulse * 0.3})`);
    lineGrad.addColorStop(0.2, `rgba(255, 175, 65, ${pulse * 0.85})`);
    lineGrad.addColorStop(0.5, `rgba(255, 210, 110, ${pulse})`);
    lineGrad.addColorStop(0.8, `rgba(255, 175, 65, ${pulse * 0.85})`);
    lineGrad.addColorStop(1, `rgba(212, 120, 40, ${pulse * 0.3})`);

    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1.4 + (l % 2 === 0 ? 0.6 : 0);
    ctx.stroke();

    // Subtle soft halo under each line
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(w, lineY);
    ctx.strokeStyle = `rgba(255, 140, 40, ${pulse * 0.18})`;
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  // 3. Slowly Floating Golden & Amber Bokeh Light Orbs
  const orbs = [
    { bx: 0.12, by: 0.22, r: 24, speed: 0.25, seed: 1.2 },
    { bx: 0.28, by: 0.75, r: 42, speed: 0.32, seed: 2.8 },
    { bx: 0.42, by: 0.18, r: 18, speed: 0.28, seed: 4.1 },
    { bx: 0.65, by: 0.32, r: 35, speed: 0.38, seed: 5.7 },
    { bx: 0.78, by: 0.82, r: 48, speed: 0.30, seed: 7.3 },
    { bx: 0.88, by: 0.28, r: 28, speed: 0.35, seed: 8.9 },
    { bx: 0.08, by: 0.65, r: 32, speed: 0.26, seed: 10.4 },
    { bx: 0.52, by: 0.62, r: 22, speed: 0.34, seed: 12.1 },
    { bx: 0.94, by: 0.68, r: 16, speed: 0.42, seed: 13.8 },
  ];

  orbs.forEach((orb) => {
    const ox = w * orb.bx + Math.sin(t * orb.speed + orb.seed) * 40;
    const oy = h * orb.by + Math.cos(t * orb.speed * 0.8 + orb.seed) * 35;
    const currentRadius = orb.r + Math.sin(t * 0.8 + orb.seed) * 5;

    const orbGrad = ctx.createRadialGradient(
      ox,
      oy,
      0,
      ox,
      oy,
      Math.max(1, currentRadius)
    );
    orbGrad.addColorStop(0, 'rgba(255, 220, 140, 0.9)');
    orbGrad.addColorStop(0.35, 'rgba(255, 150, 45, 0.45)');
    orbGrad.addColorStop(0.7, 'rgba(214, 85, 25, 0.15)');
    orbGrad.addColorStop(1, 'rgba(180, 40, 10, 0)');

    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(ox, oy, currentRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Warm Orange Atmospheric Baseline Glow
  const bottomGlow = ctx.createLinearGradient(0, h * 0.6, 0, h);
  bottomGlow.addColorStop(0, 'rgba(214, 63, 40, 0)');
  bottomGlow.addColorStop(0.5, 'rgba(230, 95, 35, 0.12)');
  bottomGlow.addColorStop(1, 'rgba(255, 140, 40, 0.26)');
  ctx.fillStyle = bottomGlow;
  ctx.fillRect(0, h * 0.6, w, h * 0.4);
}

/**
 * 04b. BAKE / OVEN: Concentric Golden Oven Circles + Warm Champagne & Soft Peach (Matching Screenshot)
 * Pure abstract geometry: ZERO men, ZERO women, ZERO human figures.
 */
function drawBakeAtmosphere(ctx, w, h, t, isDark) {
  // 1. Warm Champagne Gold & Soft Peach Background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  if (isDark) {
    bg.addColorStop(0, '#221510');
    bg.addColorStop(0.5, '#2D1B14');
    bg.addColorStop(1, '#1A0F0B');
  } else {
    bg.addColorStop(0, '#FDF7EE');
    bg.addColorStop(0.45, '#F9EEDD');
    bg.addColorStop(1, '#FDEBE2');
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const isMobile = w < 640;

  // 2. Concentric Golden Oven Rings Centered Behind Content (Fully scaled for mobile viewports)
  const cx = isMobile ? w * 0.5 : w * 0.52;
  const cy = isMobile ? Math.min(320, h * 0.32) : h * 0.48;
  const ringCount = 5;

  for (let r = 1; r <= ringCount; r++) {
    const baseRadius = isMobile ? r * 65 : r * 140;
    const pulse = Math.sin(t * 0.5 + r * 0.8) * (isMobile ? 5 : 12);
    const radius = baseRadius + pulse;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = isDark
      ? `rgba(240, 180, 80, ${0.28 - r * 0.035})`
      : `rgba(212, 140, 40, ${0.35 - r * 0.045})`;
    ctx.lineWidth = isMobile ? 1.6 : 1.4;
    ctx.stroke();
  }

  // 3. Floating Golden Glow Sparks (Zero human figures)
  const sparks = [
    { bx: 0.35, by: 0.35, r: 4, speed: 0.4, seed: 1.1 },
    { bx: 0.62, by: 0.25, r: 5, speed: 0.3, seed: 2.4 },
    { bx: 0.45, by: 0.72, r: 6, speed: 0.5, seed: 3.7 },
    { bx: 0.78, by: 0.65, r: 4, speed: 0.35, seed: 5.2 },
    { bx: 0.22, by: 0.60, r: 5, speed: 0.45, seed: 6.8 },
  ];

  sparks.forEach((s) => {
    const sx = w * s.bx + Math.sin(t * s.speed + s.seed) * 25;
    const sy = h * s.by + Math.cos(t * s.speed + s.seed) * 20;

    const rad = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 3.5);
    rad.addColorStop(0, 'rgba(255, 200, 90, 0.7)');
    rad.addColorStop(0.5, 'rgba(230, 140, 40, 0.25)');
    rad.addColorStop(1, 'rgba(200, 100, 20, 0)');

    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(sx, sy, s.r * 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

/**
 * 04c. DINING HERO: Soft Champagne, Lavender & Wavy Golden Flow Lines (Matching Screenshot 3)
 * Pure abstract geometry: ZERO men, ZERO women, ZERO human figures.
 */
function drawDiningHeroAtmosphere(ctx, w, h, t, isDark) {
  // 1. Soft Champagne & Lavender Base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  if (isDark) {
    bg.addColorStop(0, '#1A1224');
    bg.addColorStop(0.5, '#24162B');
    bg.addColorStop(1, '#1C1220');
  } else {
    bg.addColorStop(0, '#FBF5EE');
    bg.addColorStop(0.48, '#F0E7F8');
    bg.addColorStop(1, '#FDE8DF');
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const isMobile = w < 640;

  // 2. Smooth Flowing Wavy Golden Lines (Gracefully positioned across both mobile & desktop)
  const lineCount = 3;
  for (let l = 0; l < lineCount; l++) {
    const baseX = isMobile ? w * (0.32 + l * 0.26) : w * (0.65 + l * 0.12);
    ctx.beginPath();
    ctx.moveTo(baseX, 0);

    for (let y = 0; y <= h; y += 30) {
      const waveX =
        baseX +
        Math.sin(y * 0.005 + t * 0.5 + l * 0.8) * (isMobile ? 30 : 45) +
        Math.cos(y * 0.003 - t * 0.3) * (isMobile ? 15 : 20);
      ctx.lineTo(waveX, y);
    }

    ctx.strokeStyle = isDark
      ? `rgba(240, 200, 110, ${0.30 - l * 0.06})`
      : `rgba(212, 160, 50, ${0.40 - l * 0.07})`;
    ctx.lineWidth = isMobile ? 1.8 : 1.5;
    ctx.stroke();
  }

  // 3. Floating Golden Dots/Orbs
  const dots = [
    { bx: 0.18, by: 0.22, r: 3.5, speed: 0.3, seed: 1.5 },
    { bx: 0.42, by: 0.24, r: 4.5, speed: 0.35, seed: 2.8 },
    { bx: 0.65, by: 0.28, r: 5, speed: 0.28, seed: 4.2 },
    { bx: 0.72, by: 0.62, r: 4, speed: 0.4, seed: 5.6 },
    { bx: 0.58, by: 0.78, r: 5.5, speed: 0.32, seed: 7.1 },
    { bx: 0.85, by: 0.42, r: 3.5, speed: 0.45, seed: 8.5 },
    { bx: 0.15, by: 0.68, r: 4, speed: 0.3, seed: 10.1 },
    { bx: 0.32, by: 0.52, r: 3.5, speed: 0.38, seed: 11.7 },
  ];

  dots.forEach((d) => {
    const dx = w * d.bx + Math.sin(t * d.speed + d.seed) * 20;
    const dy = h * d.by + Math.cos(t * d.speed + d.seed) * 18;

    ctx.beginPath();
    ctx.arc(dx, dy, d.r, 0, Math.PI * 2);
    ctx.fillStyle = isDark
      ? 'rgba(240, 180, 80, 0.55)'
      : 'rgba(212, 140, 30, 0.65)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dx, dy, d.r * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = isDark
      ? 'rgba(240, 180, 80, 0.16)'
      : 'rgba(212, 140, 30, 0.20)';
    ctx.fill();
  });
}

/**
 * 05. ENTERTAINMENT: Cinematic Projector Beam & Theatrical Cosmic Rays
 * Recreates the exact reference look with enhanced luminous lighting:
 * Radiant royal violet background, intense golden projector beam, sweeping ambient
 * rays, floating stardust motes, lens bloom, and pulsing red beacon dot.
 */
function drawEntertainmentAtmosphere(ctx, w, h, t, isDark) {
  const originX = w * 0.94;
  const originY = h * 0.08;

  ctx.save();

  // 1. Wide Ambient Theatrical Stage Glow (Lightens & softens the background)
  const ambientGlow = ctx.createRadialGradient(originX, originY, 0, w * 0.45, h * 0.45, w * 0.95);
  ambientGlow.addColorStop(0, 'rgba(255, 245, 210, 0.55)');
  ambientGlow.addColorStop(0.32, 'rgba(215, 155, 255, 0.42)');
  ambientGlow.addColorStop(0.65, 'rgba(155, 80, 230, 0.28)');
  ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, w, h);

  // Soft Ambient Fill on Left Half to ensure background stays light and glowing behind headings
  const leftAmbient = ctx.createRadialGradient(w * 0.22, h * 0.45, 0, w * 0.22, h * 0.45, w * 0.65);
  leftAmbient.addColorStop(0, 'rgba(195, 125, 255, 0.26)');
  leftAmbient.addColorStop(0.5, 'rgba(145, 70, 215, 0.16)');
  leftAmbient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = leftAmbient;
  ctx.fillRect(0, 0, w, h);

  // 2. Broad Outer Projector Beam Cone (Spreading diagonally to the left)
  const beamAngle = Math.sin(t * 0.35) * 0.035;
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(0, h * (0.08 + beamAngle));
  ctx.lineTo(0, h * (0.95 + beamAngle));
  ctx.lineTo(w * 0.65, h);
  ctx.closePath();

  const outerBeamGrad = ctx.createLinearGradient(originX, originY, 0, h * 0.55);
  outerBeamGrad.addColorStop(0, 'rgba(255, 252, 235, 0.96)');
  outerBeamGrad.addColorStop(0.15, 'rgba(255, 235, 165, 0.75)');
  outerBeamGrad.addColorStop(0.38, 'rgba(225, 195, 255, 0.48)');
  outerBeamGrad.addColorStop(0.68, 'rgba(145, 95, 215, 0.25)');
  outerBeamGrad.addColorStop(1, 'rgba(30, 10, 50, 0)');

  ctx.fillStyle = outerBeamGrad;
  ctx.fill();

  // 3. Intense Brilliant Core Light Fan
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(0, h * (0.22 + beamAngle));
  ctx.lineTo(0, h * (0.72 + beamAngle));
  ctx.lineTo(w * 0.42, h * 0.92);
  ctx.closePath();

  const coreGrad = ctx.createLinearGradient(originX, originY, 0, h * 0.48);
  coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  coreGrad.addColorStop(0.2, 'rgba(255, 245, 195, 0.88)');
  coreGrad.addColorStop(0.5, 'rgba(245, 220, 255, 0.48)');
  coreGrad.addColorStop(0.85, 'rgba(200, 150, 255, 0.20)');
  coreGrad.addColorStop(1, 'rgba(30, 10, 50, 0)');

  ctx.fillStyle = coreGrad;
  ctx.fill();

  // 4. Razor-Sharp Projector Center Shaft
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(0, h * (0.36 + beamAngle));
  ctx.lineTo(0, h * (0.50 + beamAngle));
  ctx.lineTo(w * 0.25, h * 0.75);
  ctx.closePath();

  const shaftGrad = ctx.createLinearGradient(originX, originY, 0, h * 0.44);
  shaftGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  shaftGrad.addColorStop(0.3, 'rgba(255, 248, 220, 0.92)');
  shaftGrad.addColorStop(0.7, 'rgba(255, 230, 175, 0.45)');
  shaftGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = shaftGrad;
  ctx.fill();

  // 5. Radiant Projector Lens Bloom & Halo Rings
  const flareGrad = ctx.createRadialGradient(originX, originY, 0, originX, originY, w * 0.42);
  flareGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  flareGrad.addColorStop(0.08, 'rgba(255, 248, 210, 0.95)');
  flareGrad.addColorStop(0.22, 'rgba(255, 225, 145, 0.70)');
  flareGrad.addColorStop(0.48, 'rgba(205, 165, 255, 0.45)');
  flareGrad.addColorStop(0.78, 'rgba(130, 75, 195, 0.22)');
  flareGrad.addColorStop(1, 'rgba(25, 10, 45, 0)');

  ctx.fillStyle = flareGrad;
  ctx.beginPath();
  ctx.arc(originX, originY, w * 0.42, 0, Math.PI * 2);
  ctx.fill();

  // Concentric lens ripples
  for (let r = 1; r <= 4; r++) {
    const radius = 28 * r + Math.sin(t * 2.2 + r) * 5;
    ctx.strokeStyle = `rgba(255, 245, 200, ${0.55 / r})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(originX, originY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 6. Floating Theatrical Stardust Particles in Beam Path
  for (let i = 0; i < 35; i++) {
    const speed = 0.016 + (i % 6) * 0.005;
    const progress = (i * 0.032 + t * speed) % 1;
    const px = originX - progress * (w * 0.94);
    const py = originY + progress * (h * 0.78) + Math.sin(t * 1.8 + i) * 20;
    const size = (i % 4 === 0) ? 3.2 : (i % 2 === 0 ? 2.2 : 1.5);
    const alpha = 0.55 + Math.sin(t * 2.2 + i) * 0.4;

    ctx.fillStyle = i % 2 === 0
      ? `rgba(255, 250, 230, ${alpha})`
      : `rgba(235, 210, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // 7. Pulsing Red Cinema Beacon Dot (on the right edge)
  const beaconX = w * 0.965;
  const beaconY = h * 0.46;
  const pingRadius = 15 + Math.sin(t * 3.4) * 7;
  const pingAlpha = 0.75 - (pingRadius - 8) / 18;

  ctx.strokeStyle = `rgba(217, 78, 100, ${Math.max(0, pingAlpha)})`;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(beaconX, beaconY, pingRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#C93248';
  ctx.shadowColor = '#D94E64';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(beaconX, beaconY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // 8. Soft Warm Stage Floor Uplight (Illuminates bottom)
  const floorUplight = ctx.createLinearGradient(0, h, 0, h * 0.75);
  floorUplight.addColorStop(0, 'rgba(180, 100, 255, 0.22)');
  floorUplight.addColorStop(0.5, 'rgba(251, 146, 60, 0.12)');
  floorUplight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = floorUplight;
  ctx.fillRect(0, h * 0.75, w, h * 0.25);

  ctx.restore();
}

/**
 * 06. VISIT: Calm Architectural Plaza Perspective & Concentric Compass Rings
 */
function drawVisitAtmosphere(ctx, w, h, t, isDark) {
  const originX = w * 0.5;
  const originY = h * 0.45;

  ctx.lineWidth = 1.1;

  // Concentric Navigation Rings
  for (let r = 1; r <= 5; r++) {
    const rad = r * 85 + Math.sin(t * 0.5 + r) * 6;
    ctx.strokeStyle = isDark
      ? `rgba(212, 175, 55, ${0.1 + (1 - r / 5) * 0.25})`
      : `rgba(180, 125, 30, ${0.12 + (1 - r / 5) * 0.24})`;

    ctx.beginPath();
    ctx.arc(originX, originY, rad, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4 Cardinal Axis Lines
  ctx.strokeStyle = isDark ? 'rgba(240, 218, 170, 0.28)' : 'rgba(180, 125, 30, 0.28)';
  ctx.beginPath();
  ctx.moveTo(originX - 440, originY);
  ctx.lineTo(originX + 440, originY);
  ctx.moveTo(originX, originY - 360);
  ctx.lineTo(originX, originY + 360);
  ctx.stroke();

  // Subtle pulsing compass star in center
  ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(180, 125, 30, 0.45)';
  ctx.beginPath();
  ctx.arc(originX, originY, 4, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 07. BRANDS: Luxury Storefront Colonnade & Golden Facet Lines
 */
function drawBrandsAtmosphere(ctx, w, h, t, isDark) {
  const colCount = 10;
  const colSpacing = w / colCount;

  ctx.lineWidth = 1;

  // Vertical Architectural Colonnades
  for (let c = 0; c <= colCount; c++) {
    const x = c * colSpacing + Math.sin(t * 0.4 + c * 0.5) * 12;
    const colGrad = ctx.createLinearGradient(x, 0, x, h);

    if (isDark) {
      colGrad.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
      colGrad.addColorStop(0.5, 'rgba(240, 218, 170, 0.35)');
      colGrad.addColorStop(1, 'rgba(212, 175, 55, 0.05)');
    } else {
      colGrad.addColorStop(0, 'rgba(180, 125, 30, 0.05)');
      colGrad.addColorStop(0.5, 'rgba(180, 125, 30, 0.32)');
      colGrad.addColorStop(1, 'rgba(180, 125, 30, 0.05)');
    }

    ctx.strokeStyle = colGrad;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();

    // Traveling light pulse on every second column
    if (c % 2 === 0) {
      const pulseY = ((t * 90 + c * 80) % (h * 1.2)) - h * 0.1;
      ctx.fillStyle = isDark ? '#FFF0C2' : '#C9523C';
      ctx.beginPath();
      ctx.arc(x, pulseY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * 08. EVENTS: Festive Ascending Champagne Bubbles & Radiant Aurora
 */
function drawEventsAtmosphere(ctx, w, h, t, isDark) {
  // Radiant Golden Aurora Ribbon
  ctx.lineWidth = 2;
  const auroraY = h * 0.5;

  ctx.beginPath();
  ctx.moveTo(0, auroraY);
  for (let x = 0; x <= w; x += 40) {
    const y =
      auroraY +
      Math.sin(x * 0.006 + t * 0.7) * 60 +
      Math.cos(x * 0.004 - t * 0.5) * 35;
    ctx.lineTo(x, y);
  }

  const aGrad = ctx.createLinearGradient(0, 0, w, 0);
  if (isDark) {
    aGrad.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
    aGrad.addColorStop(0.5, 'rgba(240, 218, 170, 0.55)');
    aGrad.addColorStop(1, 'rgba(191, 161, 255, 0.2)');
  } else {
    aGrad.addColorStop(0, 'rgba(180, 125, 30, 0.1)');
    aGrad.addColorStop(0.5, 'rgba(201, 82, 60, 0.45)');
    aGrad.addColorStop(1, 'rgba(104, 59, 164, 0.2)');
  }

  ctx.strokeStyle = aGrad;
  ctx.stroke();
}

/**
 * 09. SUPERMARKET: Clean Emerald-Mint Matrix & Geometric Fresh Nodes
 */
function drawSupermarketAtmosphere(ctx, w, h, t, isDark) {
  const gridSize = 90;
  ctx.lineWidth = 1;

  for (let x = 0; x <= w + gridSize; x += gridSize) {
    for (let y = 0; y <= h + gridSize; y += gridSize) {
      const dist = Math.hypot(x - w * 0.5, y - h * 0.5);
      const wave = Math.sin(dist * 0.005 - t * 0.8);

      if (wave > 0.4) {
        ctx.fillStyle = isDark
          ? `rgba(94, 234, 212, ${wave * 0.25})`
          : `rgba(14, 124, 113, ${wave * 0.22})`;

        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

/**
 * AMBIENT FLOATING GLOWING PARTICLES (Universal high-end starlight dust)
 */
function drawAmbientParticles(ctx, w, h, particles, t, isDark, variant, motionSpeed = 0) {
  particles.forEach((p) => {
    // Particles move ONLY when mouse is actively used
    p.y += p.speedY * motionSpeed;
    p.x += p.speedX * motionSpeed;

    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;
    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;

    const pulse = Math.sin(t * p.pulseSpeed + p.phase) * 0.35 + 0.65;
    const finalAlpha = Math.min(1, p.opacity * pulse * 1.25);

    ctx.fillStyle = isDark
      ? `rgba(255, 235, 175, ${finalAlpha * 0.95})`
      : `rgba(195, 138, 38, ${finalAlpha * 0.9})`;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // Soft radiant starlight halo on motes
    if (p.size > 1.8) {
      ctx.fillStyle = isDark
        ? `rgba(240, 218, 170, ${finalAlpha * 0.28})`
        : `rgba(212, 160, 45, ${finalAlpha * 0.24})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

/**
 * SUBTLE CINEMATIC VIGNETTE
 * Keeps edges elegant while center remains crystal clear for foreground reading
 */
function drawCinematicVignette(ctx, w, h, isDark) {
  const vig = ctx.createRadialGradient(
    w * 0.5,
    h * 0.5,
    w * 0.35,
    w * 0.5,
    h * 0.5,
    w * 0.78
  );

  if (isDark) {
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(15, 10, 22, 0.45)');
  } else {
    vig.addColorStop(0, 'rgba(255, 255, 255, 0)');
    vig.addColorStop(1, 'rgba(240, 228, 215, 0.35)');
  }

  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}
