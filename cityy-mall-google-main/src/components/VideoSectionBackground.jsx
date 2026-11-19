import { useEffect, useRef, useState } from 'react';
import { AbstractSectionBackground } from './AbstractSectionBackground';

/**
 * Premium Video & Animated Section Backdrop.
 * Mobile View: Runs continuously on GPU hardware decoding (autoPlay, muted, loop, playsInline)
 * for buttery-smooth 60fps performance without CPU/decoder thread stalls.
 * Desktop View: Interactive mouse-guided video and ambient motion.
 */
export function VideoSectionBackground({
  videoAsset,
  variant,
  tintClassName,
  className = '',
  videoOpacityClassName = 'opacity-88 dark:opacity-78',
  videoFilterClassName = '',
  eager = false,
  playbackRate = 1,
  renderVideo = false,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Unified homepage background video asset
  const videoSrc = videoAsset?.src || '/videos/mall-hero.mp4';
  const videoPoster = videoAsset?.poster || '/posters/mall-hero.webp';

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return undefined;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    if (playbackRate && isFinite(playbackRate)) {
      video.playbackRate = playbackRate;
    }

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);

    // =========================================================================
    // MOBILE / PHONE VIEW: Continuous hardware-accelerated playback
    // Avoids rapid pause/play calls that stall mobile decoders and cause stutter
    // =========================================================================
    if (isMobile) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with muted fallback
            video.muted = true;
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }

      return () => {
        video.pause();
      };
    }

    // =========================================================================
    // DESKTOP VIEW: Activity-based controller with gentle idle pause
    // =========================================================================
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

    const handleActivity = (distance = 1) => {
      if (distance > 0.5) {
        playVideo();
        if (stopTimeout) clearTimeout(stopTimeout);
        stopTimeout = setTimeout(() => {
          pauseVideo();
        }, 1200);
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Initial play check
    playVideo();
    stopTimeout = setTimeout(() => {
      pauseVideo();
    }, 1500);

    return () => {
      if (stopTimeout) clearTimeout(stopTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      video.pause();
    };
  }, [videoSrc, playbackRate]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* 1. Actual Background MP4 Video (only when explicitly requested as standalone) */}
      {renderVideo && videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={videoPoster}
          autoPlay
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
        hasVideo={Boolean(videoSrc)}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}

export default VideoSectionBackground;
