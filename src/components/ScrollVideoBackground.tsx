import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoBackgroundProps {
  src: string;
  poster?: string;
  overlayClassName?: string;
  videoOpacityClassName?: string;
  triggerSelector?: string;
  start?: string;
  end?: string;
  eager?: boolean;
  rootMargin?: string;
  playbackSpeedFactor?: number;
  label?: string;
}

export function ScrollVideoBackground({
  src,
  poster,
  overlayClassName = 'bg-[#141311]/30',
  videoOpacityClassName = 'opacity-100',
  triggerSelector,
  start = 'top bottom',
  end = 'bottom top',
  eager = false,
  rootMargin = '450px 0px',
  playbackSpeedFactor = 0.35,
  label = 'Architectural exhibition video backdrop',
}: ScrollVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isActive, setIsActive] = useState(eager);
  const [isReady, setIsReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const progressRef = useRef(0);
  const pendingTimeRef = useRef<number | null>(null);

  // Continuous IntersectionObserver: load only while active/near viewport, release when far off-screen
  useEffect(() => {
    if (eager) {
      setIsActive(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.some((entry) => entry.isIntersecting);
        setIsActive(intersecting);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, rootMargin]);

  // Attach video stream & GSAP ScrollTrigger scrub only while active; release media buffers when inactive
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    if (!isActive || hasVideoError) {
      setIsReady(false);
      pendingTimeRef.current = null;
      video.pause();
      if (video.hasAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let scrollTrigger: ScrollTrigger | null = null;

    const seekToProgress = (progress: number) => {
      progressRef.current = progress;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      // Gentle playback speed factor keeps architectural motion slow, smooth, and cinematic
      const clampedFactor = Math.min(1, Math.max(0.25, playbackSpeedFactor));
      const usableDuration = Math.max(0.1, (duration - 0.06) * clampedFactor);
      const startOffset = 0.05;
      const targetTime = Math.min(
        duration - 0.04,
        Math.max(startOffset, startOffset + progress * usableDuration)
      );

      if (!video.paused) {
        video.pause();
      }

      if (Math.abs(video.currentTime - targetTime) < 0.004) {
        return;
      }

      if (video.seeking) {
        pendingTimeRef.current = targetTime;
      } else {
        pendingTimeRef.current = null;
        try {
          video.currentTime = targetTime;
        } catch {
          // Ignore transient seek errors while frame buffers settle
        }
      }
    };

    const handleSeeked = () => {
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        if (Math.abs(video.currentTime - nextTime) >= 0.004) {
          try {
            video.currentTime = nextTime;
          } catch {
            // Ignore transient seek errors
          }
        }
      }
    };

    const handleLoadedMetadata = () => {
      video.pause();
      const initialProgress = prefersReducedMotion
        ? 0.25
        : scrollTrigger?.progress ?? progressRef.current;
      seekToProgress(initialProgress);
    };

    const handleFrameReady = () => {
      video.pause();
      setIsReady(true);
    };

    const handlePreventAutoPlay = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    const handleError = () => {
      setHasVideoError(true);
      setIsReady(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleFrameReady);
    video.addEventListener('canplay', handleFrameReady);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('play', handlePreventAutoPlay);
    video.addEventListener('error', handleError);

    if (video.getAttribute('src') !== src) {
      video.setAttribute('src', src);
      video.load();
    }
    video.pause();

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    if (video.readyState >= 2) {
      handleFrameReady();
    }

    if (!prefersReducedMotion) {
      const triggerEl = triggerSelector
        ? document.querySelector(triggerSelector) || container.parentElement || container
        : container.parentElement || container;

      // Direct 1:1 mouse scroll coupling so video moves strictly on scroll and freezes immediately on stop
      scrollTrigger = ScrollTrigger.create({
        trigger: triggerEl,
        start,
        end,
        scrub: true,
        onUpdate: (self) => {
          seekToProgress(self.progress);
        },
      });

      seekToProgress(scrollTrigger.progress);
    }

    return () => {
      scrollTrigger?.kill();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleFrameReady);
      video.removeEventListener('canplay', handleFrameReady);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('play', handlePreventAutoPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isActive, hasVideoError, src, triggerSelector, start, end, playbackSpeedFactor]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#141311]"
    >
      {/* Optimized poster image fallback always available while lazy-loading or offscreen */}
      {poster && (
        <img
          src={poster}
          alt=""
          referrerPolicy="no-referrer"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover brightness-105 contrast-[1.03] ${videoOpacityClassName}`}
        />
      )}

      {/* Active HTML5 video layer fades in seamlessly once frame buffers are decoded */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          poster={poster}
          muted
          playsInline
          preload={isActive ? 'auto' : 'none'}
          aria-label={label}
          data-scroll-video="true"
          data-video-active={isActive ? 'true' : 'false'}
          data-video-ready={isReady ? 'true' : 'false'}
          className={`relative w-full h-full object-cover brightness-105 contrast-[1.03] transition-opacity duration-300 ${
            isReady && isActive ? videoOpacityClassName : 'opacity-0'
          }`}
        />
      )}

      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
