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

      // Background animation runs ONLY when mouse/touch/wheel is active, smoothly pausing when idle!
      const motionSpeed = mouseActivity;
      time += dt * 0.55 * motionSpeed * speedFactor;

      // Mouse lerp
      mouseX += (targetMouseX - mouseX) * dt * 3;
      mouseY += (targetMouseY - mouseY) * dt * 3;

      const isDark = checkDark();

      // Clear frame so background video runs visibly underneath
      ctx.clearRect(0, 0, width, height);

      // 1. BASE BACKGROUND GRADIENT (Warm Champagne Ivory in Light, Deep Twilight Obsidian in Dark)
      drawBaseAtmosphere(ctx, width, height, time, isDark, activeVariant);

      // 2. PARALLAX OFFSET
      ctx.save();
      const px = mouseX * 24;
      const py = mouseY * 18;
      ctx.translate(px, py);

      // 3. UNIFIED SIGNATURE ORION MALL ARCHITECTURAL ATRIUM (Vault Lines, Golden Bokeh Orbs, Glowing Dashes)
      drawOrionAtriumAtmosphere(ctx, width, height, time, isDark, activeVariant);

      // 4. FLOATING GLOWING PARTICLES & AMBIENT STARLIGHT
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
      {/* Optional gentle theme gradient overlay - tempered so procedural golden atrium lines & bokeh stay crisp and vibrant */}
      {tintClassName && (
        <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none opacity-10 mix-blend-overlay ${tintClassName}`} />
      )}
    </div>
  );
}

// =============================================================================
// SUB-RENDERERS FOR LUXURY PROCEDURAL EFFECTS
// =============================================================================

function drawBaseAtmosphere(ctx, w, h, t, isDark, variant) {
  if (variant === 'bake') {
    return;
  }

  // Warm Champagne Ivory to Light Golden Sand Base Gradient (Maintains clean, bright, whitish foundation)
  let bgGrad = ctx.createRadialGradient(w * 0.52, h * 0.38, w * 0.08, w * 0.5, h * 0.5, w * 0.95);

  if (isDark) {
    // Deep Luxury Obsidian & Warm Amber Twilight
    bgGrad.addColorStop(0, '#1E1428');
    bgGrad.addColorStop(0.35, '#170E22');
    bgGrad.addColorStop(0.70, '#120A1A');
    bgGrad.addColorStop(1, '#0D0714');
  } else {
    // Warm Champagne Ivory (#FFFDF8) to Gentle Golden Cream (#FAF5EC -> #F6EEDB -> #EFE3CE)
    bgGrad.addColorStop(0, '#FFFDF8');
    bgGrad.addColorStop(0.28, '#FAF5EC');
    bgGrad.addColorStop(0.55, '#F6EEDB');
    bgGrad.addColorStop(0.82, '#F0E4D0');
    bgGrad.addColorStop(1, '#EAE0CD');
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 4 Coordinated Harmonic Fluid Light Blooms matching the website's brand palette:
  // Coral, Rose Pink, Lavender-Violet & Soft Turquoise
  const b1x = w * 0.28 + Math.sin(t * 0.32) * (w * 0.12);
  const b1y = h * 0.32 + Math.cos(t * 0.38) * (h * 0.10);

  const b2x = w * 0.76 + Math.cos(t * 0.28) * (w * 0.14);
  const b2y = h * 0.28 + Math.sin(t * 0.42) * (h * 0.12);

  const b3x = w * 0.32 + Math.cos(t * 0.36) * (w * 0.15);
  const b3y = h * 0.76 + Math.sin(t * 0.30) * (h * 0.11);

  const b4x = w * 0.78 + Math.sin(t * 0.40) * (w * 0.12);
  const b4y = h * 0.72 + Math.cos(t * 0.34) * (h * 0.10);

  // Bloom 1: Warm Coral & Peach Gold (matches buttons & active links)
  const rad1 = ctx.createRadialGradient(b1x, b1y, 0, b1x, b1y, w * 0.55);
  if (isDark) {
    rad1.addColorStop(0, 'rgba(251, 146, 60, 0.22)');
    rad1.addColorStop(0.5, 'rgba(254, 215, 170, 0.10)');
    rad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    rad1.addColorStop(0, 'rgba(251, 146, 60, 0.32)');
    rad1.addColorStop(0.5, 'rgba(254, 215, 170, 0.20)');
    rad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = rad1;
  ctx.fillRect(0, 0, w, h);

  // Bloom 2: Rose Pink & Soft Magenta (matches fashion & cinema accents)
  const rad2 = ctx.createRadialGradient(b2x, b2y, 0, b2x, b2y, w * 0.58);
  if (isDark) {
    rad2.addColorStop(0, 'rgba(244, 114, 182, 0.24)');
    rad2.addColorStop(0.55, 'rgba(236, 72, 153, 0.10)');
    rad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    rad2.addColorStop(0, 'rgba(244, 114, 182, 0.34)');
    rad2.addColorStop(0.5, 'rgba(252, 231, 243, 0.22)');
    rad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = rad2;
  ctx.fillRect(0, 0, w, h);

  // Bloom 3: Delicate Lavender & Rich Violet Mist (matches luxury headings & insignia)
  const rad3 = ctx.createRadialGradient(b3x, b3y, 0, b3x, b3y, w * 0.60);
  if (isDark) {
    rad3.addColorStop(0, 'rgba(192, 132, 252, 0.25)');
    rad3.addColorStop(0.55, 'rgba(147, 51, 234, 0.10)');
    rad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    rad3.addColorStop(0, 'rgba(192, 132, 252, 0.30)');
    rad3.addColorStop(0.55, 'rgba(233, 213, 255, 0.18)');
    rad3.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = rad3;
  ctx.fillRect(0, 0, w, h);

  // Bloom 4: Soft Turquoise & Luminous Sky Aqua (matches athletic footwear & fresh atrium reflections)
  const rad4 = ctx.createRadialGradient(b4x, b4y, 0, b4x, b4y, w * 0.52);
  if (isDark) {
    rad4.addColorStop(0, 'rgba(45, 212, 191, 0.20)');
    rad4.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
    rad4.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    rad4.addColorStop(0, 'rgba(45, 212, 191, 0.28)');
    rad4.addColorStop(0.5, 'rgba(204, 251, 241, 0.18)');
    rad4.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = rad4;
  ctx.fillRect(0, 0, w, h);
}

/**
 * UNIFIED ORION MALL ARCHITECTURAL ATRIUM ATMOSPHERE
 * Retains exact 3D wireframe geometry & bokeh layout, enriched with harmonious website colors:
 * - 3D perspective vaulted atrium ceiling grid lines (radiating perspective lines, transverse arcs & diamond trusses)
 * - Coordinated line color harmony: Coral, Gold, Rose Pink, Lavender Violet, and Turquoise
 * - Shimmering light pulses along architectural wireframes
 * - Floating glowing bokeh orbs with individual radiant jewel-tone gradients
 * - Stacked horizontal glowing dashes with website-matched neon glow
 */
function drawOrionAtriumAtmosphere(ctx, w, h, t, isDark, variant) {
  // 1. Vaulted Atrium Perspective Apex (Upper Center)
  const apexX = w * 0.52 + Math.sin(t * 0.25) * (w * 0.02);
  const apexY = -h * 0.12;

  // 2. Radiating Perspective Atrium Lines with Website-Coordinated Hues
  const rayCount = 18;
  const raySpread = w * 1.5;
  const rayStart = -w * 0.25;

  ctx.lineWidth = 1.25;

  // Coordinated color palette across the width: Coral -> Champagne Gold -> Rose Pink -> Lavender -> Turquoise
  const rayColorStops = isDark
    ? [
        { mid: 'rgba(251, 146, 60, 0.45)', core: 'rgba(254, 215, 170, 0.35)' }, // Warm Coral
        { mid: 'rgba(245, 158, 11, 0.45)', core: 'rgba(254, 240, 138, 0.40)' }, // Champagne Gold
        { mid: 'rgba(244, 114, 182, 0.42)', core: 'rgba(251, 207, 232, 0.35)' }, // Rose Pink
        { mid: 'rgba(192, 132, 252, 0.42)', core: 'rgba(233, 213, 255, 0.35)' }, // Lavender Violet
        { mid: 'rgba(45, 212, 191, 0.42)', core: 'rgba(153, 246, 228, 0.35)' }, // Turquoise
      ]
    : [
        { mid: 'rgba(234, 88, 12, 0.36)', core: 'rgba(251, 146, 60, 0.28)' },   // Warm Coral
        { mid: 'rgba(217, 119, 6, 0.38)', core: 'rgba(245, 158, 11, 0.32)' },   // Champagne Gold
        { mid: 'rgba(219, 39, 119, 0.36)', core: 'rgba(244, 114, 182, 0.28)' }, // Rose Pink
        { mid: 'rgba(147, 51, 234, 0.35)', core: 'rgba(192, 132, 252, 0.28)' }, // Lavender Violet
        { mid: 'rgba(13, 148, 136, 0.35)', core: 'rgba(45, 212, 191, 0.28)' },  // Turquoise
      ];

  for (let i = 0; i < rayCount; i++) {
    const progress = i / (rayCount - 1);
    const targetX = rayStart + progress * raySpread;
    const targetY = h * 1.15;

    // Interpolate color scheme across the perspective fan
    const colorIndex = Math.min(rayColorStops.length - 1, Math.floor(progress * rayColorStops.length));
    const scheme = rayColorStops[colorIndex];

    const lineGrad = ctx.createLinearGradient(apexX, apexY, targetX, targetY);
    lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    lineGrad.addColorStop(0.2, scheme.core);
    lineGrad.addColorStop(0.65, scheme.mid);
    lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

    ctx.strokeStyle = lineGrad;
    ctx.beginPath();
    ctx.moveTo(apexX, apexY);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();

    // Cross-lattice lines to form the signature diamond atrium skylight pattern
    if (i % 2 === 0) {
      const nextTargetX = rayStart + ((i + 2) / (rayCount - 1)) * raySpread;
      const midY = h * (0.2 + (i / rayCount) * 0.6);
      const startX = apexX + (targetX - apexX) * (midY / (targetY - apexY));
      const endX = apexX + (nextTargetX - apexX) * ((midY + 120) / (targetY - apexY));

      ctx.strokeStyle = scheme.core;
      ctx.beginPath();
      ctx.moveTo(startX, midY);
      ctx.lineTo(endX, midY + 120);
      ctx.stroke();
    }
  }

  // 3. Vaulted Transverse Arch Ribs (Rich multicolor gradient curve across the atrium)
  const archCount = 7;
  for (let a = 1; a <= archCount; a++) {
    const progress = a / archCount;
    const archY = h * (0.15 + progress * 0.78);
    const sag = 45 + progress * 85;

    const archGrad = ctx.createLinearGradient(0, archY, w, archY);
    if (isDark) {
      archGrad.addColorStop(0, 'rgba(251, 146, 60, 0.08)');
      archGrad.addColorStop(0.25, 'rgba(245, 158, 11, 0.40)');
      archGrad.addColorStop(0.50, 'rgba(244, 114, 182, 0.45)');
      archGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.40)');
      archGrad.addColorStop(1, 'rgba(45, 212, 191, 0.08)');
    } else {
      archGrad.addColorStop(0, 'rgba(234, 88, 12, 0.06)');
      archGrad.addColorStop(0.25, 'rgba(217, 119, 6, 0.35)');
      archGrad.addColorStop(0.50, 'rgba(219, 39, 119, 0.38)');
      archGrad.addColorStop(0.75, 'rgba(147, 51, 234, 0.35)');
      archGrad.addColorStop(1, 'rgba(13, 148, 136, 0.06)');
    }

    ctx.strokeStyle = archGrad;
    ctx.lineWidth = a % 2 === 0 ? 1.6 : 1.1;
    ctx.beginPath();
    ctx.moveTo(0, archY);
    ctx.quadraticCurveTo(w * 0.5, archY + sag, w, archY);
    ctx.stroke();

    // Shimmering traveling pulse along arches (Harmonious alternating colors)
    const pulseOffset = (t * 0.3 + a * 0.2) % 1;
    const pulseX = w * pulseOffset;
    const pulseY = archY + sag * (4 * pulseOffset * (1 - pulseOffset));

    const pulseColors = [
      '245, 158, 11',  // Gold
      '244, 114, 182', // Rose Pink
      '192, 132, 252', // Lavender
      '45, 212, 191',  // Turquoise
      '251, 146, 60',  // Coral
    ];
    const pCol = pulseColors[a % pulseColors.length];

    const pulseGlow = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 22);
    pulseGlow.addColorStop(0, `rgba(${pCol}, 0.95)`);
    pulseGlow.addColorStop(0.4, `rgba(${pCol}, 0.40)`);
    pulseGlow.addColorStop(1, `rgba(${pCol}, 0.0)`);
    ctx.fillStyle = pulseGlow;
    ctx.beginPath();
    ctx.arc(pulseX, pulseY, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Horizontal Tech / Architectural Dash Lines (Website-Matched Coordinated Glow)
  const dashGroups = [
    { x: w * 0.74, y: h * 0.26, count: 5, spacing: 32, width: 85, color: '244, 114, 182' }, // Rose Pink (Right top)
    { x: w * 0.76, y: h * 0.68, count: 4, spacing: 28, width: 70, color: '245, 158, 11' },  // Champagne Gold (Right bottom)
    { x: w * 0.22, y: h * 0.78, count: 3, spacing: 25, width: 55, color: '192, 132, 252' }, // Lavender Violet (Left bottom)
  ];

  dashGroups.forEach((group) => {
    for (let i = 0; i < group.count; i++) {
      const dy = group.y + i * group.spacing;
      const dx = group.x + Math.sin(t * 0.6 + i) * 6;
      const pulse = 0.6 + Math.sin(t * 1.6 + i * 0.8) * 0.35;

      // Outer colorful glow line
      ctx.strokeStyle = `rgba(${group.color}, ${0.40 * pulse})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(dx, dy);
      ctx.lineTo(dx + group.width, dy);
      ctx.stroke();

      // Inner luminous core
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * pulse})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(dx, dy);
      ctx.lineTo(dx + group.width, dy);
      ctx.stroke();
    }
  });

  // 5. Floating Glowing Bokeh Orbs with Vibrant Website Brand Palettes
  // Coordinated hues: Gold, Rose Pink, Lavender Violet, Coral Orange, Soft Turquoise & Sky Blue
  const orbs = [
    { x: w * 0.15, y: h * 0.22, r: 24, speed: 0.18, phase: 0,   col: { core: '254, 240, 138', mid: '245, 158, 11', aura: '251, 191, 36' } }, // Gold
    { x: w * 0.32, y: h * 0.42, r: 16, speed: 0.22, phase: 1.2, col: { core: '251, 207, 232', mid: '244, 114, 182', aura: '236, 72, 153' } }, // Rose Pink
    { x: w * 0.48, y: h * 0.18, r: 32, speed: 0.15, phase: 2.5, col: { core: '233, 213, 255', mid: '192, 132, 252', aura: '168, 85, 247' } }, // Lavender
    { x: w * 0.65, y: h * 0.35, r: 20, speed: 0.20, phase: 3.8, col: { core: '254, 215, 170', mid: '251, 146, 60',  aura: '249, 115, 22' } }, // Warm Coral
    { x: w * 0.82, y: h * 0.20, r: 28, speed: 0.17, phase: 0.7, col: { core: '204, 251, 241', mid: '45, 212, 191',  aura: '14, 165, 233' } }, // Turquoise
    { x: w * 0.88, y: h * 0.48, r: 14, speed: 0.24, phase: 4.1, col: { core: '251, 207, 232', mid: '244, 114, 182', aura: '236, 72, 153' } }, // Rose Pink
    { x: w * 0.25, y: h * 0.68, r: 36, speed: 0.14, phase: 1.9, col: { core: '254, 240, 138', mid: '245, 158, 11', aura: '251, 191, 36' } }, // Gold
    { x: w * 0.55, y: h * 0.75, r: 22, speed: 0.19, phase: 3.2, col: { core: '233, 213, 255', mid: '192, 132, 252', aura: '168, 85, 247' } }, // Lavender
    { x: w * 0.72, y: h * 0.82, r: 18, speed: 0.23, phase: 5.0, col: { core: '254, 215, 170', mid: '251, 146, 60',  aura: '249, 115, 22' } }, // Coral
    { x: w * 0.40, y: h * 0.88, r: 26, speed: 0.16, phase: 2.8, col: { core: '204, 251, 241', mid: '45, 212, 191',  aura: '20, 184, 166' } }, // Turquoise
    { x: w * 0.10, y: h * 0.85, r: 15, speed: 0.21, phase: 4.5, col: { core: '251, 207, 232', mid: '244, 114, 182', aura: '236, 72, 153' } }, // Rose Pink
    { x: w * 0.92, y: h * 0.78, r: 20, speed: 0.18, phase: 1.5, col: { core: '233, 213, 255', mid: '192, 132, 252', aura: '168, 85, 247' } }, // Lavender
  ];

  orbs.forEach((o) => {
    const ox = o.x + Math.sin(t * 0.5 + o.phase) * 18;
    const oy = ((o.y - t * o.speed * 40) % (h + 100) + h + 100) % (h + 100) - 50;
    const pulse = 0.75 + Math.sin(t * 1.8 + o.phase) * 0.25;
    const radius = o.r * pulse;

    const orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
    if (isDark) {
      orbGrad.addColorStop(0, `rgba(${o.col.core}, 0.95)`);
      orbGrad.addColorStop(0.3, `rgba(${o.col.mid}, 0.70)`);
      orbGrad.addColorStop(0.65, `rgba(${o.col.aura}, 0.28)`);
      orbGrad.addColorStop(1, `rgba(${o.col.aura}, 0.0)`);
    } else {
      orbGrad.addColorStop(0, `rgba(${o.col.core}, 0.95)`);
      orbGrad.addColorStop(0.32, `rgba(${o.col.mid}, 0.75)`);
      orbGrad.addColorStop(0.68, `rgba(${o.col.aura}, 0.32)`);
      orbGrad.addColorStop(1, `rgba(${o.col.aura}, 0.0)`);
    }

    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(ox, oy, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

/**
 * 01. HERO ATMOSPHERE: Flowing Multicolour Canopy Lines, Light Trails & Iridescent 3D Diamonds
 * Coordinated palette inspired by Navbar, Buttons & Sections:
 * - Ribbon 0: Warm Coral to Vibrant Pink (#F97316 -> #EC4899)
 * - Ribbon 1: Soft Rose to Lavender Violet (#EC4899 -> #A855F7)
 * - Ribbon 2: Violet to Soft Turquoise (#8B5CF6 -> #14B8A6)
 * - Ribbon 3: Turquoise to Luminous Sky Blue (#2DD4BF -> #38BDF8)
 * - Ribbon 4: Champagne Gold to Warm Coral (#FBBF24 -> #FB923C)
 * - Ribbon 5: Delicate Rose to Deep Violet (#F43F5E -> #7C3AED)
 */
function drawHeroAtmosphere(ctx, w, h, t, isDark, diamonds) {
  const cx = w * 0.5;
  const cy = h * 0.5;

  const ribbonCount = 6;
  ctx.lineWidth = 1.75;

  // Multicolour stroke definitions coordinated across the mall brand aesthetic
  const ribbonSchemes = isDark
    ? [
        { c1: 'rgba(251, 146, 60, 0.75)', c2: 'rgba(244, 114, 182, 0.70)' }, // Coral -> Pink
        { c1: 'rgba(244, 114, 182, 0.70)', c2: 'rgba(192, 132, 252, 0.65)' }, // Pink -> Lavender
        { c1: 'rgba(192, 132, 252, 0.65)', c2: 'rgba(45, 212, 191, 0.60)' },  // Lavender -> Turquoise
        { c1: 'rgba(45, 212, 191, 0.60)', c2: 'rgba(56, 189, 248, 0.65)' },   // Turquoise -> Sky Blue
        { c1: 'rgba(251, 191, 36, 0.75)', c2: 'rgba(251, 146, 60, 0.70)' },   // Champagne -> Coral
        { c1: 'rgba(244, 63, 94, 0.65)', c2: 'rgba(168, 85, 247, 0.70)' },    // Rose -> Violet
      ]
    : [
        { c1: 'rgba(234, 88, 12, 0.65)', c2: 'rgba(219, 39, 119, 0.60)' },    // Coral -> Pink
        { c1: 'rgba(219, 39, 119, 0.60)', c2: 'rgba(147, 51, 234, 0.58)' },   // Pink -> Lavender
        { c1: 'rgba(147, 51, 234, 0.58)', c2: 'rgba(13, 148, 136, 0.55)' },   // Lavender -> Turquoise
        { c1: 'rgba(13, 148, 136, 0.55)', c2: 'rgba(2, 132, 199, 0.58)' },    // Turquoise -> Sky Blue
        { c1: 'rgba(217, 119, 6, 0.65)', c2: 'rgba(234, 88, 12, 0.60)' },     // Champagne -> Coral
        { c1: 'rgba(225, 29, 72, 0.58)', c2: 'rgba(124, 58, 237, 0.62)' },    // Rose -> Violet
      ];

  for (let r = 0; r < ribbonCount; r++) {
    const offset = r * 0.18;
    const scheme = ribbonSchemes[r % ribbonSchemes.length];

    const strokeGrad = ctx.createLinearGradient(0, h * 0.2, w, h * 0.8);
    strokeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    strokeGrad.addColorStop(0.35, scheme.c1);
    strokeGrad.addColorStop(0.70, scheme.c2);
    strokeGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

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
    ctx.strokeStyle = isDark ? 'rgba(254, 215, 170, 0.28)' : 'rgba(251, 146, 60, 0.25)';
    ctx.moveTo(0, startY + 16);
    ctx.bezierCurveTo(cp1x + 10, cp1y + 16, cp2x - 10, cp2y + 16, w, endY + 16);
    ctx.stroke();
  }

  // 2. Rotating 3D Geometric Diamonds (Iridescent Multicolour Facets)
  diamonds.forEach((d, dIdx) => {
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
      x: cx + d.x + Math.sin(t * 0.45 + d.x) * 45,
      y: cy + d.y + Math.cos(t * 0.4 + d.y) * 40,
    };

    const projVerts = rawVerts.map((v) => {
      let x1 = v.x * Math.cos(ry) + v.z * Math.sin(ry);
      let z1 = -v.x * Math.sin(ry) + v.z * Math.cos(ry);
      let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);
      const fov = 420;
      const scale = fov / (fov + z2 + 200);
      return {
        x: worldCenter.x + x1 * scale,
        y: worldCenter.y + y2 * scale,
        scale,
      };
    });

    // Edges with alternating harmonic palette (Champagne, Rose, Turquoise, Lavender)
    ctx.lineWidth = 1.1;
    edges.forEach(([i, j], edgeIdx) => {
      const v1 = projVerts[i];
      const v2 = projVerts[j];

      const strokeColors = isDark
        ? ['rgba(251, 191, 36, 0.45)', 'rgba(244, 114, 182, 0.45)', 'rgba(45, 212, 191, 0.42)', 'rgba(192, 132, 252, 0.45)']
        : ['rgba(217, 119, 6, 0.40)', 'rgba(219, 39, 119, 0.40)', 'rgba(13, 148, 136, 0.38)', 'rgba(147, 51, 234, 0.40)'];

      ctx.strokeStyle = strokeColors[(dIdx + edgeIdx) % strokeColors.length];
      ctx.beginPath();
      ctx.moveTo(v1.x, v1.y);
      ctx.lineTo(v2.x, v2.y);
      ctx.stroke();
    });

    // Glowing Vertex Nodes
    projVerts.forEach((v, vIdx) => {
      const nodeColors = isDark
        ? ['#FDE68A', '#F472B6', '#5EEAD4', '#C084FC']
        : ['#D97706', '#DB2777', '#0D9488', '#9333EA'];

      ctx.fillStyle = nodeColors[(dIdx + vIdx) % nodeColors.length];
      ctx.beginPath();
      ctx.arc(v.x, v.y, 2.2 * v.scale, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

/**
 * 02. EXPLORE / PROMENADE: Architectural Vault Grid & Perspective Line Formations
 * Multicolour Palette: Champagne Gold, Coral, Rose, Violet & Sky Blue
 */
function drawExploreAtmosphere(ctx, w, h, t, isDark) {
  const vanishingX = w * 0.5 + Math.sin(t * 0.3) * (w * 0.08);
  const vanishingY = h * 0.32 + Math.cos(t * 0.35) * (h * 0.06);

  ctx.lineWidth = 1.1;

  // 1. Perspective Vault Radial Rays (Multicolour Harmonic Gradient)
  const rayCount = 14;
  const rayColors = isDark
    ? ['rgba(251, 146, 60, 0.45)', 'rgba(244, 114, 182, 0.45)', 'rgba(192, 132, 252, 0.45)', 'rgba(45, 212, 191, 0.42)', 'rgba(251, 191, 36, 0.45)']
    : ['rgba(234, 88, 12, 0.38)', 'rgba(219, 39, 119, 0.38)', 'rgba(147, 51, 234, 0.35)', 'rgba(13, 148, 136, 0.35)', 'rgba(217, 119, 6, 0.38)'];

  for (let i = 0; i <= rayCount; i++) {
    const angle = ((i / rayCount) * Math.PI) - (Math.PI * 0.05);
    const endX = vanishingX + Math.cos(angle) * (w * 1.2);
    const endY = vanishingY + Math.sin(angle) * (h * 1.2);

    const rayGrad = ctx.createLinearGradient(vanishingX, vanishingY, endX, endY);
    const c = rayColors[i % rayColors.length];
    rayGrad.addColorStop(0, c);
    rayGrad.addColorStop(0.45, isDark ? 'rgba(254, 215, 170, 0.22)' : 'rgba(253, 232, 223, 0.25)');
    rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

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

    const arcStroke = isDark
      ? ['rgba(244, 114, 182, 0.28)', 'rgba(251, 191, 36, 0.28)', 'rgba(45, 212, 191, 0.26)', 'rgba(192, 132, 252, 0.28)']
      : ['rgba(219, 39, 119, 0.26)', 'rgba(217, 119, 6, 0.25)', 'rgba(13, 148, 136, 0.24)', 'rgba(147, 51, 234, 0.26)'];

    ctx.strokeStyle = arcStroke[a % arcStroke.length];
    ctx.beginPath();
    ctx.ellipse(vanishingX, vanishingY + 30, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Node intersection sparkles
    if (a % 2 === 0) {
      const nodeX = vanishingX + Math.cos(t * 0.6 + a) * rx * 0.7;
      const nodeY = vanishingY + 30 + Math.sin(t * 0.6 + a) * ry * 0.7;
      ctx.fillStyle = isDark ? '#FDE68A' : '#D97706';
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * 03. SHOPPING: Multicolour Silk Runway Waves + Floating Diamond Vitrines
 */
function drawShoppingAtmosphere(ctx, w, h, t, isDark, diamonds) {
  // Dual Fluid Silk Harmonic Waves (Multicolour Gradients)
  const waves = 4;
  const waveSchemes = isDark
    ? [
        ['rgba(251, 146, 60, 0.12)', 'rgba(244, 114, 182, 0.45)', 'rgba(192, 132, 252, 0.08)'],
        ['rgba(192, 132, 252, 0.12)', 'rgba(45, 212, 191, 0.42)', 'rgba(56, 189, 248, 0.08)'],
        ['rgba(251, 191, 36, 0.12)', 'rgba(251, 146, 60, 0.45)', 'rgba(244, 114, 182, 0.08)'],
        ['rgba(244, 114, 182, 0.12)', 'rgba(168, 85, 247, 0.42)', 'rgba(45, 212, 191, 0.08)'],
      ]
    : [
        ['rgba(234, 88, 12, 0.10)', 'rgba(219, 39, 119, 0.42)', 'rgba(147, 51, 234, 0.06)'],
        ['rgba(147, 51, 234, 0.10)', 'rgba(13, 148, 136, 0.38)', 'rgba(2, 132, 199, 0.06)'],
        ['rgba(217, 119, 6, 0.10)', 'rgba(234, 88, 12, 0.40)', 'rgba(219, 39, 119, 0.06)'],
        ['rgba(219, 39, 119, 0.10)', 'rgba(124, 58, 237, 0.38)', 'rgba(13, 148, 136, 0.06)'],
      ];

  for (let wIdx = 0; wIdx < waves; wIdx++) {
    const waveT = t * 0.5 + wIdx * 0.5;
    ctx.beginPath();
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    const stops = waveSchemes[wIdx % waveSchemes.length];
    grad.addColorStop(0, stops[0]);
    grad.addColorStop(0.5, stops[1]);
    grad.addColorStop(1, stops[2]);

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

  ctx.strokeStyle = isDark ? 'rgba(244, 114, 182, 0.38)' : 'rgba(168, 85, 247, 0.38)';
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
  ctx.fillStyle = isDark ? 'rgba(236, 72, 153, 0.08)' : 'rgba(192, 132, 252, 0.08)';
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
 * 05. ENTERTAINMENT: Cinematic Projector Beam, Flowing Film-Strip Curves & 3D Polyhedra
 * Perfectly matches Home page's light, premium, colourful palette and motion:
 * - Soft lavender, light purple, pastel pink, peach, warm ivory & light champagne
 * - Flowing architectural ribbon waves with film-strip micro-perforations
 * - Rotating 3D wireframe diamonds & glowing vertex nodes
 * - Luminous champagne & soft rose projector beam from top-right
 * - Floating starlight particles & subtle red beacon
 */
function drawEntertainmentAtmosphere(ctx, w, h, t, isDark, diamonds) {
  const originX = w * 0.94;
  const originY = h * 0.08;
  const cx = w * 0.5;

  ctx.save();

  // 1. Wide Ambient Theatrical Stage Glow (Light champagne, soft lavender & pastel pink)
  const ambientGlow = ctx.createRadialGradient(originX, originY, 0, w * 0.45, h * 0.45, w * 0.95);
  if (isDark) {
    ambientGlow.addColorStop(0, 'rgba(255, 245, 210, 0.45)');
    ambientGlow.addColorStop(0.32, 'rgba(192, 132, 252, 0.28)');
    ambientGlow.addColorStop(0.65, 'rgba(124, 58, 237, 0.16)');
    ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    ambientGlow.addColorStop(0, 'rgba(255, 248, 225, 0.65)'); // Light champagne
    ambientGlow.addColorStop(0.3, 'rgba(252, 231, 243, 0.55)');  // Pastel pink
    ambientGlow.addColorStop(0.6, 'rgba(233, 213, 255, 0.38)');  // Soft lavender
    ambientGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, w, h);

  // Soft Ambient Fill on Left Half (Peach & Sky Blue whispers)
  const leftAmbient = ctx.createRadialGradient(w * 0.22, h * 0.45, 0, w * 0.22, h * 0.45, w * 0.65);
  if (isDark) {
    leftAmbient.addColorStop(0, 'rgba(168, 85, 247, 0.20)');
    leftAmbient.addColorStop(0.5, 'rgba(236, 72, 153, 0.12)');
    leftAmbient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    leftAmbient.addColorStop(0, 'rgba(255, 237, 213, 0.45)'); // Warm peach & ivory
    leftAmbient.addColorStop(0.48, 'rgba(224, 242, 254, 0.35)'); // Soft sky blue
    leftAmbient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = leftAmbient;
  ctx.fillRect(0, 0, w, h);

  // 2. Flowing Architectural & Film-Strip Waves (Matching Home Page Ribbons)
  const ribbonCount = 5;
  ctx.lineWidth = 1.6;

  for (let r = 0; r < ribbonCount; r++) {
    const offset = r * 0.22;
    const strokeGrad = ctx.createLinearGradient(0, h * 0.2, w, h * 0.8);
    if (isDark) {
      strokeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.0)');
      strokeGrad.addColorStop(0.35, 'rgba(244, 114, 182, 0.65)');
      strokeGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.60)');
      strokeGrad.addColorStop(1, 'rgba(236, 72, 153, 0.0)');
    } else {
      strokeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.0)');
      strokeGrad.addColorStop(0.35, 'rgba(219, 39, 119, 0.58)');
      strokeGrad.addColorStop(0.7, 'rgba(124, 58, 237, 0.52)');
      strokeGrad.addColorStop(1, 'rgba(219, 39, 119, 0.0)');
    }

    ctx.strokeStyle = strokeGrad;
    ctx.beginPath();

    const startY = h * 0.38 + Math.sin(t * 0.55 + offset) * 80;
    const cp1x = w * 0.26 + Math.cos(t * 0.45 + offset) * 65;
    const cp1y = h * 0.18 + Math.sin(t * 0.65 + offset * 1.4) * 75;
    const cp2x = w * 0.70 + Math.sin(t * 0.50 + offset) * 75;
    const cp2y = h * 0.82 + Math.cos(t * 0.60 + offset * 1.2) * 80;
    const endY = h * 0.60 + Math.cos(t * 0.65 + offset) * 65;

    ctx.moveTo(0, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, w, endY);
    ctx.stroke();

    // Subtle film-strip micro-perforation dots along secondary curve
    if (r === 1) {
      const dotCount = 18;
      for (let d = 0; d < dotCount; d++) {
        const u = d / dotCount;
        const px = (1 - u) * (1 - u) * (1 - u) * 0 + 3 * (1 - u) * (1 - u) * u * cp1x + 3 * (1 - u) * u * u * cp2x + u * u * u * w;
        const py = (1 - u) * (1 - u) * (1 - u) * startY + 3 * (1 - u) * (1 - u) * u * cp1y + 3 * (1 - u) * u * u * cp2y + u * u * u * endY;
        ctx.fillStyle = isDark ? 'rgba(244, 114, 182, 0.45)' : 'rgba(192, 132, 252, 0.55)';
        ctx.fillRect(px - 1.5, py + 12, 3, 2);
      }
    }
  }

  // 3. Rotating 3D Geometric Diamonds (Matching Home Page)
  if (diamonds && Array.isArray(diamonds)) {
    diamonds.slice(0, 4).forEach((d) => {
      const rx = t * d.rotSpeedX + d.rotX;
      const ry = t * d.rotSpeedY + d.rotY;

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
        x: cx + d.x + Math.sin(t * 0.5 + d.x) * 35,
        y: h * 0.5 + d.y + Math.cos(t * 0.45 + d.y) * 30,
      };

      const projVerts = rawVerts.map((v) => {
        let x1 = v.x * Math.cos(ry) + v.z * Math.sin(ry);
        let z1 = -v.x * Math.sin(ry) + v.z * Math.cos(ry);
        let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);
        const fov = 380;
        const scale = fov / (fov + z2 + 200);
        return {
          x: worldCenter.x + x1 * scale,
          y: worldCenter.y + y2 * scale,
          scale,
        };
      });

      ctx.lineWidth = 1.0;
      edges.forEach(([i, j]) => {
        const v1 = projVerts[i];
        const v2 = projVerts[j];
        ctx.strokeStyle = isDark
          ? 'rgba(192, 132, 252, 0.40)'
          : 'rgba(219, 39, 119, 0.35)';
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });

      projVerts.forEach((v) => {
        ctx.fillStyle = isDark
          ? 'rgba(244, 114, 182, 0.75)'
          : 'rgba(147, 51, 234, 0.65)';
        ctx.beginPath();
        ctx.arc(v.x, v.y, 1.8 * v.scale, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }

  // 4. Luminous Cinema Projector Beam (Soft Champagne, Lavender & Rose)
  const beamAngle = Math.sin(t * 0.32) * 0.03;
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(0, h * (0.08 + beamAngle));
  ctx.lineTo(0, h * (0.92 + beamAngle));
  ctx.lineTo(w * 0.65, h);
  ctx.closePath();

  const outerBeamGrad = ctx.createLinearGradient(originX, originY, 0, h * 0.55);
  if (isDark) {
    outerBeamGrad.addColorStop(0, 'rgba(255, 252, 235, 0.90)');
    outerBeamGrad.addColorStop(0.2, 'rgba(255, 235, 165, 0.65)');
    outerBeamGrad.addColorStop(0.45, 'rgba(225, 195, 255, 0.35)');
    outerBeamGrad.addColorStop(0.8, 'rgba(145, 95, 215, 0.15)');
    outerBeamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  } else {
    outerBeamGrad.addColorStop(0, 'rgba(255, 255, 245, 0.95)');
    outerBeamGrad.addColorStop(0.2, 'rgba(255, 240, 195, 0.70)');
    outerBeamGrad.addColorStop(0.5, 'rgba(252, 231, 243, 0.45)');
    outerBeamGrad.addColorStop(0.8, 'rgba(233, 213, 255, 0.25)');
    outerBeamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }

  ctx.fillStyle = outerBeamGrad;
  ctx.fill();

  // Core Light Fan
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(0, h * (0.24 + beamAngle));
  ctx.lineTo(0, h * (0.68 + beamAngle));
  ctx.lineTo(w * 0.42, h * 0.90);
  ctx.closePath();

  const coreGrad = ctx.createLinearGradient(originX, originY, 0, h * 0.48);
  coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  coreGrad.addColorStop(0.25, 'rgba(255, 248, 215, 0.80)');
  coreGrad.addColorStop(0.6, 'rgba(252, 231, 243, 0.45)');
  coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = coreGrad;
  ctx.fill();

  // 5. Radiant Projector Lens Bloom
  const flareGrad = ctx.createRadialGradient(originX, originY, 0, originX, originY, w * 0.38);
  flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  flareGrad.addColorStop(0.12, 'rgba(255, 248, 215, 0.85)');
  flareGrad.addColorStop(0.3, 'rgba(255, 235, 175, 0.60)');
  flareGrad.addColorStop(0.55, 'rgba(244, 114, 182, 0.35)');
  flareGrad.addColorStop(0.8, 'rgba(192, 132, 252, 0.18)');
  flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = flareGrad;
  ctx.beginPath();
  ctx.arc(originX, originY, w * 0.38, 0, Math.PI * 2);
  ctx.fill();

  // Concentric lens ripples
  for (let r = 1; r <= 3; r++) {
    const radius = 30 * r + Math.sin(t * 2.0 + r) * 5;
    ctx.strokeStyle = `rgba(255, 245, 215, ${0.5 / r})`;
    ctx.lineWidth = 1.4;
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
    const size = (i % 4 === 0) ? 3.0 : (i % 2 === 0 ? 2.0 : 1.4);
    const alpha = 0.5 + Math.sin(t * 2.2 + i) * 0.35;

    ctx.fillStyle = i % 2 === 0
      ? `rgba(255, 248, 220, ${alpha})`
      : `rgba(244, 114, 182, ${alpha})`;
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // 7. Pulsing Red Cinema Beacon Dot
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
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(beaconX, beaconY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // 8. Soft Warm Stage Floor Uplight (Soft Peach & Lavender)
  const floorUplight = ctx.createLinearGradient(0, h, 0, h * 0.75);
  floorUplight.addColorStop(0, 'rgba(244, 114, 182, 0.20)');
  floorUplight.addColorStop(0.5, 'rgba(255, 237, 213, 0.25)');
  floorUplight.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = floorUplight;
  ctx.fillRect(0, h * 0.75, w, h * 0.25);

  ctx.restore();
}

/**
 * 05b. ENTERTAINMENT TECH: Acoustic Sound Waves, 3D Diamonds & Flowing Ribbon Canopy
 * Matches Home page light theme palette: Lavender, pastel pink, peach, warm ivory & sky blue
 */
function drawEntertainmentTechAtmosphere(ctx, w, h, t, isDark, diamonds) {
  const cx = w * 0.5;
  const cy = h * 0.5;

  ctx.save();

  // 1. Flowing Architectural Canopy Ribbons
  const ribbonCount = 4;
  ctx.lineWidth = 1.6;

  for (let r = 0; r < ribbonCount; r++) {
    const offset = r * 0.28;
    const strokeGrad = ctx.createLinearGradient(0, h * 0.15, w, h * 0.85);
    if (isDark) {
      strokeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.0)');
      strokeGrad.addColorStop(0.35, 'rgba(244, 114, 182, 0.60)');
      strokeGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.55)');
      strokeGrad.addColorStop(1, 'rgba(236, 72, 153, 0.0)');
    } else {
      strokeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.0)');
      strokeGrad.addColorStop(0.35, 'rgba(219, 39, 119, 0.52)');
      strokeGrad.addColorStop(0.7, 'rgba(124, 58, 237, 0.48)');
      strokeGrad.addColorStop(1, 'rgba(219, 39, 119, 0.0)');
    }

    ctx.strokeStyle = strokeGrad;
    ctx.beginPath();

    const startY = h * 0.45 + Math.sin(t * 0.5 + offset) * 75;
    const cp1x = w * 0.3 + Math.cos(t * 0.4 + offset) * 60;
    const cp1y = h * 0.2 + Math.sin(t * 0.6 + offset * 1.3) * 70;
    const cp2x = w * 0.68 + Math.sin(t * 0.48 + offset) * 70;
    const cp2y = h * 0.78 + Math.cos(t * 0.58 + offset * 1.2) * 75;
    const endY = h * 0.52 + Math.cos(t * 0.62 + offset) * 60;

    ctx.moveTo(0, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, w, endY);
    ctx.stroke();
  }

  // 2. Spatial Acoustic Dolby Soundwave Arcs (Concentric Soundwaves)
  const arcCenters = [
    { x: w * 0.2, y: h * 0.45 },
    { x: w * 0.8, y: h * 0.55 },
  ];

  arcCenters.forEach((center, cIdx) => {
    for (let r = 1; r <= 4; r++) {
      const radius = r * 55 + Math.sin(t * 1.6 + r + cIdx) * 12;
      const alpha = 0.35 / r;
      ctx.strokeStyle = isDark
        ? `rgba(192, 132, 252, ${alpha})`
        : `rgba(219, 39, 119, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
    }
  });

  // 3. Rotating 3D Diamonds (Matching Home Page)
  if (diamonds && Array.isArray(diamonds)) {
    diamonds.slice(0, 3).forEach((d) => {
      const rx = t * d.rotSpeedX + d.rotX;
      const ry = t * d.rotSpeedY + d.rotY;

      const rawVerts = [
        { x: 0, y: -d.radius * 0.85, z: 0 },
        { x: d.radius * 0.65, y: 0, z: 0 },
        { x: 0, y: 0, z: d.radius * 0.65 },
        { x: -d.radius * 0.65, y: 0, z: 0 },
        { x: 0, y: 0, z: -d.radius * 0.65 },
        { x: 0, y: d.radius * 0.85, z: 0 },
      ];

      const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1],
      ];

      const worldCenter = {
        x: cx + d.x * 0.8 + Math.sin(t * 0.4 + d.x) * 30,
        y: cy + d.y * 0.8 + Math.cos(t * 0.4 + d.y) * 25,
      };

      const projVerts = rawVerts.map((v) => {
        let x1 = v.x * Math.cos(ry) + v.z * Math.sin(ry);
        let z1 = -v.x * Math.sin(ry) + v.z * Math.cos(ry);
        let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);
        const fov = 380;
        const scale = fov / (fov + z2 + 200);
        return {
          x: worldCenter.x + x1 * scale,
          y: worldCenter.y + y2 * scale,
          scale,
        };
      });

      ctx.lineWidth = 1.0;
      edges.forEach(([i, j]) => {
        const v1 = projVerts[i];
        const v2 = projVerts[j];
        ctx.strokeStyle = isDark
          ? 'rgba(192, 132, 252, 0.35)'
          : 'rgba(219, 39, 119, 0.30)';
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });
    });
  }

  ctx.restore();
}

/**
 * 05c. ENTERTAINMENT SCREENINGS: Theatrical 35mm Reel Arcs & Film-Strip Curves
 */
function drawEntertainmentScreeningsAtmosphere(ctx, w, h, t, isDark, diamonds) {
  const cx = w * 0.5;
  const cy = h * 0.5;

  ctx.save();

  // 1. Film Reel Rotating Concentric Circles on Left & Right
  const reelCenters = [
    { x: w * 0.12, y: h * 0.35, rad: 110 },
    { x: w * 0.88, y: h * 0.65, rad: 130 },
  ];

  reelCenters.forEach((reel, idx) => {
    const rot = t * (idx === 0 ? 0.35 : -0.28);
    // Outer reel rim
    ctx.strokeStyle = isDark
      ? 'rgba(192, 132, 252, 0.25)'
      : 'rgba(219, 39, 119, 0.22)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(reel.x, reel.y, reel.rad, 0, Math.PI * 2);
    ctx.stroke();

    // Inner hub
    ctx.beginPath();
    ctx.arc(reel.x, reel.y, reel.rad * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    // 5 Spokes
    for (let s = 0; s < 5; s++) {
      const angle = rot + (s / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(reel.x + Math.cos(angle) * (reel.rad * 0.35), reel.y + Math.sin(angle) * (reel.rad * 0.35));
      ctx.lineTo(reel.x + Math.cos(angle) * reel.rad, reel.y + Math.sin(angle) * reel.rad);
      ctx.stroke();
    }
  });

  // 2. Film-Strip Ribbon with Sprocket Holes
  const strokeGrad = ctx.createLinearGradient(0, h * 0.2, w, h * 0.8);
  if (isDark) {
    strokeGrad.addColorStop(0, 'rgba(244, 114, 182, 0.1)');
    strokeGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.6)');
    strokeGrad.addColorStop(1, 'rgba(244, 114, 182, 0.1)');
  } else {
    strokeGrad.addColorStop(0, 'rgba(219, 39, 119, 0.1)');
    strokeGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.55)');
    strokeGrad.addColorStop(1, 'rgba(219, 39, 119, 0.1)');
  }

  ctx.strokeStyle = strokeGrad;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  const startY = h * 0.32 + Math.sin(t * 0.5) * 60;
  const cp1x = w * 0.28 + Math.cos(t * 0.4) * 60;
  const cp1y = h * 0.12 + Math.sin(t * 0.6) * 60;
  const cp2x = w * 0.72 + Math.sin(t * 0.5) * 65;
  const cp2y = h * 0.85 + Math.cos(t * 0.6) * 70;
  const endY = h * 0.68 + Math.cos(t * 0.65) * 60;

  ctx.moveTo(0, startY);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, w, endY);
  ctx.stroke();

  // 3. Rotating 3D Diamonds
  if (diamonds && Array.isArray(diamonds)) {
    diamonds.slice(0, 3).forEach((d) => {
      const rx = t * d.rotSpeedX + d.rotX;
      const ry = t * d.rotSpeedY + d.rotY;

      const rawVerts = [
        { x: 0, y: -d.radius * 0.75, z: 0 },
        { x: d.radius * 0.6, y: 0, z: 0 },
        { x: 0, y: 0, z: d.radius * 0.6 },
        { x: -d.radius * 0.6, y: 0, z: 0 },
        { x: 0, y: 0, z: -d.radius * 0.6 },
        { x: 0, y: d.radius * 0.75, z: 0 },
      ];

      const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1],
      ];

      const worldCenter = {
        x: cx + d.x * 0.7 + Math.sin(t * 0.45 + d.x) * 30,
        y: cy + d.y * 0.7 + Math.cos(t * 0.45 + d.y) * 25,
      };

      const projVerts = rawVerts.map((v) => {
        let x1 = v.x * Math.cos(ry) + v.z * Math.sin(ry);
        let z1 = -v.x * Math.sin(ry) + v.z * Math.cos(ry);
        let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);
        const fov = 380;
        const scale = fov / (fov + z2 + 200);
        return {
          x: worldCenter.x + x1 * scale,
          y: worldCenter.y + y2 * scale,
          scale,
        };
      });

      ctx.lineWidth = 1.0;
      edges.forEach(([i, j]) => {
        const v1 = projVerts[i];
        const v2 = projVerts[j];
        ctx.strokeStyle = isDark
          ? 'rgba(192, 132, 252, 0.35)'
          : 'rgba(219, 39, 119, 0.30)';
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });
    });
  }

  ctx.restore();
}

/**
 * 05d. ENTERTAINMENT CONCOURSE: Luminous Ambient Stage Canopy & Gathering Waves
 */
function drawEntertainmentConcourseAtmosphere(ctx, w, h, t, isDark, diamonds) {
  const cx = w * 0.5;
  const cy = h * 0.5;

  ctx.save();

  // 1. Dual Harmonic Undulating Canopy Waves
  for (let r = 0; r < 3; r++) {
    const offset = r * 0.3;
    const strokeGrad = ctx.createLinearGradient(0, 0, w, h);
    if (isDark) {
      strokeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.0)');
      strokeGrad.addColorStop(0.5, 'rgba(244, 114, 182, 0.55)');
      strokeGrad.addColorStop(1, 'rgba(192, 132, 252, 0.0)');
    } else {
      strokeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.0)');
      strokeGrad.addColorStop(0.5, 'rgba(219, 39, 119, 0.50)');
      strokeGrad.addColorStop(1, 'rgba(124, 58, 237, 0.0)');
    }

    ctx.strokeStyle = strokeGrad;
    ctx.lineWidth = 1.6;
    ctx.beginPath();

    const startY = h * 0.5 + Math.sin(t * 0.5 + offset) * 70;
    const cp1x = w * 0.3 + Math.cos(t * 0.4 + offset) * 60;
    const cp1y = h * 0.25 + Math.sin(t * 0.6 + offset) * 60;
    const cp2x = w * 0.7 + Math.sin(t * 0.45 + offset) * 60;
    const cp2y = h * 0.75 + Math.cos(t * 0.55 + offset) * 65;
    const endY = h * 0.5 + Math.cos(t * 0.6 + offset) * 60;

    ctx.moveTo(0, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, w, endY);
    ctx.stroke();
  }

  // 2. Rotating 3D Diamonds
  if (diamonds && Array.isArray(diamonds)) {
    diamonds.slice(0, 2).forEach((d) => {
      const rx = t * d.rotSpeedX + d.rotX;
      const ry = t * d.rotSpeedY + d.rotY;

      const rawVerts = [
        { x: 0, y: -d.radius * 0.7, z: 0 },
        { x: d.radius * 0.55, y: 0, z: 0 },
        { x: 0, y: 0, z: d.radius * 0.55 },
        { x: -d.radius * 0.55, y: 0, z: 0 },
        { x: 0, y: 0, z: -d.radius * 0.55 },
        { x: 0, y: d.radius * 0.7, z: 0 },
      ];

      const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1],
      ];

      const worldCenter = {
        x: cx + d.x * 0.75 + Math.sin(t * 0.4 + d.x) * 25,
        y: cy + d.y * 0.75 + Math.cos(t * 0.4 + d.y) * 20,
      };

      const projVerts = rawVerts.map((v) => {
        let x1 = v.x * Math.cos(ry) + v.z * Math.sin(ry);
        let z1 = -v.x * Math.sin(ry) + v.z * Math.cos(ry);
        let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);
        const fov = 380;
        const scale = fov / (fov + z2 + 200);
        return {
          x: worldCenter.x + x1 * scale,
          y: worldCenter.y + y2 * scale,
          scale,
        };
      });

      ctx.lineWidth = 1.0;
      edges.forEach(([i, j]) => {
        const v1 = projVerts[i];
        const v2 = projVerts[j];
        ctx.strokeStyle = isDark
          ? 'rgba(192, 132, 252, 0.35)'
          : 'rgba(219, 39, 119, 0.30)';
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });
    });
  }

  ctx.restore();
}

/**
 * 06. VISIT: Calm Architectural Plaza Perspective & Multicolour Compass Rings
 */
function drawVisitAtmosphere(ctx, w, h, t, isDark) {
  const originX = w * 0.5;
  const originY = h * 0.45;

  ctx.lineWidth = 1.1;

  // Concentric Navigation Rings with multicolour harmonic transitions
  const ringColors = isDark
    ? ['rgba(251, 191, 36, 0.32)', 'rgba(244, 114, 182, 0.30)', 'rgba(45, 212, 191, 0.28)', 'rgba(192, 132, 252, 0.30)', 'rgba(251, 146, 60, 0.32)']
    : ['rgba(217, 119, 6, 0.28)', 'rgba(219, 39, 119, 0.26)', 'rgba(13, 148, 136, 0.25)', 'rgba(147, 51, 234, 0.26)', 'rgba(234, 88, 12, 0.28)'];

  for (let r = 1; r <= 5; r++) {
    const rad = r * 85 + Math.sin(t * 0.5 + r) * 6;
    ctx.strokeStyle = ringColors[(r - 1) % ringColors.length];

    ctx.beginPath();
    ctx.arc(originX, originY, rad, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4 Cardinal Axis Lines
  ctx.strokeStyle = isDark ? 'rgba(254, 215, 170, 0.30)' : 'rgba(251, 146, 60, 0.30)';
  ctx.beginPath();
  ctx.moveTo(originX - 440, originY);
  ctx.lineTo(originX + 440, originY);
  ctx.moveTo(originX, originY - 360);
  ctx.lineTo(originX, originY + 360);
  ctx.stroke();

  // Subtle pulsing compass star in center
  ctx.fillStyle = isDark ? '#FDE68A' : '#D97706';
  ctx.beginPath();
  ctx.arc(originX, originY, 4, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 07. BRANDS: Luxury Storefront Colonnade & Multicolour Facet Lines
 */
function drawBrandsAtmosphere(ctx, w, h, t, isDark) {
  const colCount = 10;
  const colSpacing = w / colCount;

  const brandColColors = isDark
    ? ['rgba(251, 146, 60, 0.40)', 'rgba(244, 114, 182, 0.40)', 'rgba(192, 132, 252, 0.40)', 'rgba(45, 212, 191, 0.38)', 'rgba(251, 191, 36, 0.42)']
    : ['rgba(234, 88, 12, 0.35)', 'rgba(219, 39, 119, 0.35)', 'rgba(147, 51, 234, 0.32)', 'rgba(13, 148, 136, 0.32)', 'rgba(217, 119, 6, 0.35)'];

  ctx.lineWidth = 1;

  // Vertical Architectural Colonnades with multicolour light pulses
  for (let c = 0; c <= colCount; c++) {
    const x = c * colSpacing + Math.sin(t * 0.4 + c * 0.5) * 12;
    const colGrad = ctx.createLinearGradient(x, 0, x, h);
    const col = brandColColors[c % brandColColors.length];

    colGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    colGrad.addColorStop(0.5, col);
    colGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.strokeStyle = colGrad;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();

    // Traveling light pulse on every second column
    if (c % 2 === 0) {
      const pulseY = ((t * 90 + c * 80) % (h * 1.2)) - h * 0.1;
      const nodeColors = isDark ? ['#FED7AA', '#FBCFE8', '#DDD6FE', '#CCFBF1', '#FEF08A'] : ['#C9523C', '#DB2777', '#7C3AED', '#0E7C71', '#D97706'];
      ctx.fillStyle = nodeColors[c % nodeColors.length];
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
 * AMBIENT FLOATING GLOWING PARTICLES (Unified Multicolour Starlight Palette)
 * Coordinated across 6 harmonious accents: Champagne, Rose, Coral, Lavender, Turquoise & Sky Blue
 */
function drawAmbientParticles(ctx, w, h, particles, t, isDark, variant, motionSpeed = 0) {
  // Multicolour particle palettes for light & dark themes
  const particleColors = isDark
    ? [
        { core: '254, 240, 138', halo: '251, 191, 36' }, // Champagne Gold
        { core: '244, 114, 182', halo: '236, 72, 153' }, // Rose Pink
        { core: '251, 146, 60',  halo: '249, 115, 22' }, // Warm Coral
        { core: '192, 132, 252', halo: '168, 85, 247' }, // Lavender Violet
        { core: '94, 234, 212',  halo: '45, 212, 191' }, // Soft Turquoise
        { core: '125, 211, 252', halo: '56, 189, 248' }, // Sky Blue
      ]
    : [
        { core: '217, 119, 6',   halo: '245, 158, 11' }, // Warm Gold
        { core: '219, 39, 119',  halo: '244, 114, 182' }, // Rose Pink
        { core: '234, 88, 12',   halo: '251, 146, 60' }, // Coral
        { core: '147, 51, 234',  halo: '192, 132, 252' }, // Violet
        { core: '13, 148, 136',  halo: '45, 212, 191' }, // Turquoise
        { core: '2, 132, 199',   halo: '56, 189, 248' }, // Sky Blue
      ];

  particles.forEach((p, idx) => {
    // Particles move continuously with gentle ambient drift, accelerating on mouse/touch
    p.y += p.speedY * motionSpeed;
    p.x += p.speedX * motionSpeed;

    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;
    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;

    const pulse = Math.sin(t * p.pulseSpeed + p.phase) * 0.35 + 0.65;
    const finalAlpha = Math.min(1, p.opacity * pulse * 1.25);
    const col = particleColors[idx % particleColors.length];

    ctx.fillStyle = `rgba(${col.core}, ${finalAlpha * (isDark ? 0.95 : 0.85)})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // Soft radiant starlight halo on motes
    if (p.size > 1.8) {
      ctx.fillStyle = `rgba(${col.halo}, ${finalAlpha * (isDark ? 0.30 : 0.22)})`;
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
