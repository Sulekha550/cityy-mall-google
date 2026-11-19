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

    // Strictly start paused - zero unwanted autoplay
    video.pause();

    // =========================================================================
    // Activity-based controller: Video plays ONLY when mouse / touch is actively moving
    // The moment mouse stops, cleanly pauses the video.
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
          }).catch(() => {
            video.muted = true;
            video.play().then(() => {
              isVideoPlaying = true;
              setIsPlaying(true);
            }).catch(() => {});
          });
        }
      }
    };

    const pauseVideo = () => {
      if (isVideoPlaying || !video.paused) {
        video.pause();
        isVideoPlaying = false;
        setIsPlaying(false);
      }
    };

    const handleActivity = (distance = 1) => {
      if (distance > 0.5) {
        playVideo();
        if (stopTimeout) clearTimeout(stopTimeout);
        // Cleanly pause 800ms after interaction stops
        stopTimeout = setTimeout(() => {
          pauseVideo();
        }, 800);
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
      if (delta > 0) handleActivity(5);
    };

    const handlePointerDown = () => {
      handleActivity(5);
    };

    const handleScroll = () => {
      handleActivity(5);
    };

    const handleTouchMove = () => {
      handleActivity(5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if (stopTimeout) clearTimeout(stopTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
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
          muted
          loop
          playsInline
          preload="none"
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
