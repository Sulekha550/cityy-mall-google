import { useEffect, useRef, useState } from 'react';
import { AbstractSectionBackground } from './AbstractSectionBackground';

/**
 * Premium Video & Animated Section Backdrop.
 * Video & ambient canvas animations run ONLY when mouse is used (move, scroll, click, touch),
 * and automatically pause when the mouse stops / becomes idle.
 */
export function VideoSectionBackground({
  videoAsset,
  variant,
  tintClassName,
  className = '',
  videoOpacityClassName = 'opacity-55 dark:opacity-45',
  videoFilterClassName = '',
  eager = false,
  playbackRate = 1,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Derive video source if not provided explicitly but known by variant
  const isCinemaVariant = variant?.startsWith('entertainment') || variant === 'cinema';
  const videoSrc =
    videoAsset?.src ||
    (isCinemaVariant
      ? '/videos/cinema.mp4'
      : undefined);

  const videoPoster =
    videoAsset?.poster ||
    (isCinemaVariant
      ? '/posters/cinema.webp'
      : undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return undefined;

    video.defaultMuted = true;
    video.muted = true;
    if (playbackRate && isFinite(playbackRate)) {
      video.playbackRate = playbackRate;
    }

    let isVideoPlaying = false;
    let stopTimeout = null;
    let prevX = 0;
    let prevY = 0;

    const playVideo = () => {
      if (!isVideoPlaying) {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            isVideoPlaying = true;
            setIsPlaying(true);
          }).catch(() => {});
        }
      }
    };

    const pauseVideo = () => {
      if (isVideoPlaying) {
        video.pause();
        isVideoPlaying = false;
        setIsPlaying(false);
      }
    };

    // Wake video playback on mouse activity and schedule auto-pause when idle
    const handleActivity = (distance = 1) => {
      if (distance > 0.5) {
        playVideo();
        if (stopTimeout) clearTimeout(stopTimeout);
        // When mouse/user activity stops for 600ms, pause the video
        stopTimeout = setTimeout(() => {
          pauseVideo();
        }, 600);
      }
    };

    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - prevX, e.clientY - prevY);
      prevX = e.clientX;
      prevY = e.clientY;
      handleActivity(dist);
    };

    const handleWheel = (e) => {
      const delta = Math.abs(e.deltaY) + Math.abs(e.deltaX);
      handleActivity(delta);
    };

    const handlePointerDown = () => {
      handleActivity(5);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const t = e.touches[0];
        const dist = Math.hypot(t.clientX - prevX, t.clientY - prevY);
        prevX = t.clientX;
        prevY = t.clientY;
        handleActivity(dist);
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      if (delta > 0) {
        handleActivity(delta);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Video is paused on initial load until mouse is used
    video.pause();
    isVideoPlaying = false;

    return () => {
      if (stopTimeout) clearTimeout(stopTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      video.pause();
    };
  }, [videoSrc, playbackRate]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* 1. Actual Background MP4 Video (Plays ONLY on mouse use) */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={videoPoster}
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'metadata'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoOpacityClassName} ${videoFilterClassName}`}
        />
      )}

      {/* 2. Abstract Animated Canvas & Atmospheric Lighting Overlay */}
      <AbstractSectionBackground
        videoAsset={videoAsset || (videoSrc ? { src: videoSrc, poster: videoPoster } : undefined)}
        variant={variant}
        tintClassName={tintClassName}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}
