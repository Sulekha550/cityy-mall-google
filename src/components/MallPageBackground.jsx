import { useEffect, useRef } from 'react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { AbstractSectionBackground } from './AbstractSectionBackground';

/**
 * Universal CITY MALL Background.
 * Applies the homepage background video (mallHero) and visual atmosphere
 * across ALL pages of the website.
 *
 * Interactive Mouse-Only Video Control:
 * - Starts completely paused / frozen when idle (zero unwanted autoplay).
 * - Plays forward smoothly only when the user is actively using the mouse (mousemove, wheel, click, scroll).
 * - Pauses cleanly and immediately the moment mouse interaction stops (within 800ms).
 */
export function MallPageBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    if (video.playbackRate !== 0.25) {
      video.playbackRate = 0.25;
    }

    // Strictly start paused - zero unwanted autoplay
    video.pause();

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
          }).catch(() => {
            video.muted = true;
            video.play().then(() => {
              isVideoPlaying = true;
            }).catch(() => {});
          });
        }
      }
    };

    const pauseVideo = () => {
      if (isVideoPlaying || !video.paused) {
        video.pause();
        isVideoPlaying = false;
      }
    };

    // Wake and play video whenever mouse or touch is active; pause when inactive
    const handleActivity = (distance = 1) => {
      if (distance > 0.5) {
        playVideo();
        if (stopTimeout) clearTimeout(stopTimeout);
        // Cleanly pause 800ms after mouse stops moving
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
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* 1. Exact Homepage MP4 Background Video (Interactive Mouse-Triggered Playback Only) */}
      <video
        ref={videoRef}
        src={VIDEO_ASSETS.mallHero.src}
        poster={VIDEO_ASSETS.mallHero.poster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-88 dark:opacity-78"
      />

      {/* 2. Subtle Lighting Overlay for Perfect Contrast & Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38 transition-colors duration-300" />

      {/* 3. Abstract Animated Canvas with Atrium Geometry, Fluid Blooms & Starlight Particles */}
      <AbstractSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        tintClassName="bg-transparent"
        hasVideo={true}
        className="absolute inset-0 z-20"
      />
    </div>
  );
}

export default MallPageBackground;
