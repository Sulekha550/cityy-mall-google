import { useEffect, useRef } from 'react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { AbstractSectionBackground } from './AbstractSectionBackground';

/**
 * Universal CITY MALL Background.
 * Applies the exact homepage background video (mallHero) and visual atmosphere
 * continuously across ALL pages of the website.
 *
 * - Covers the entire page background (object-fit: cover)
 * - Hardware-accelerated continuous playback (muted, loop, playsInline)
 * - Zero blank gaps between sections
 * - Soft champagne ivory tint overlay ensuring 100% text and logo readability
 * - Dynamic procedural atrium lighting & starlight micro-particles
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

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    return () => {
      // Keep running
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* 1. Exact Homepage MP4 Background Video (Responsive Full Coverage) */}
      <video
        ref={videoRef}
        src={VIDEO_ASSETS.mallHero.src}
        poster={VIDEO_ASSETS.mallHero.poster}
        autoPlay
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
