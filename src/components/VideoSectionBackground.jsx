import { useEffect, useRef, useState } from 'react';
import { attachMouseOnlyVideoController } from '../utilities/mouseVideoController';

/**
 * Mouse-Controlled HTML5 Section Video Backdrop.
 * - Never auto-plays or drifts when idle.
 * - Plays smoothly at 0.25x speed when moving the mouse or scrolling inside the hovered section.
 * - Freezes cleanly on its current frame the moment mouse movement stops or leaves the section.
 */
export function VideoSectionBackground({
  videoAsset,
  tintClassName = 'bg-gradient-to-b from-[#FBF4EB]/55 via-[#EFE6FA]/25 to-[#FDE8DF]/58 dark:from-[#151021]/55 dark:via-[#1D1630]/30 dark:to-[#151021]/65',
  videoOpacityClassName = 'opacity-85 dark:opacity-75',
  eager = false,
}) {
  const containerRef = useRef(null);
  const visualLayerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
    setVideoReady(false);
  }, [videoAsset?.src]);

  useEffect(() => {
    const containerEl = containerRef.current;
    const videoEl = videoRef.current;
    const visualLayerEl = visualLayerRef.current;
    if (!containerEl || !videoEl || videoFailed) return undefined;

    const hostSection = containerEl.closest('section') || containerEl.parentElement;
    return attachMouseOnlyVideoController(
      hostSection,
      videoEl,
      visualLayerEl,
      setVideoReady
    );
  }, [videoAsset?.src, videoFailed]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      <div
        ref={visualLayerRef}
        className="absolute inset-0 scale-105 will-change-transform"
      >
        {/* Static Architectural Poster Frame Underneath Until Video Decodes */}
        {videoAsset?.fallbackImage && (!videoReady || videoFailed) && (
          <img
            src={videoAsset.fallbackImage}
            alt=""
            referrerPolicy="no-referrer"
            loading={eager ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Mouse-Only Controlled HTML5 Video (No autoPlay, 0.25x Mouse Playback) */}
        {videoAsset?.src && !videoFailed && (
          <video
            key={videoAsset.src}
            ref={videoRef}
            src={videoAsset.src}
            poster={videoAsset.poster}
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoReady ? videoOpacityClassName : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Light-transmitting Theme Tint Overlay (no heavy black blackout) */}
      <div className={`absolute inset-0 transition-colors duration-500 ${tintClassName}`} />
    </div>
  );
}
