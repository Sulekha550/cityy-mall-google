import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArchitecturalScene } from '../data/exhibitionData';
import { ScrollVideoController } from '../utils/scrollVideoController';

interface ScrollVideoBackgroundProps {
  src: string;
  poster?: string;
  scenes?: ArchitecturalScene[];
  overlayClassName?: string;
  videoOpacityClassName?: string;
  blendModeClassName?: string;
  triggerSelector?: string;
  eager?: boolean;
  wheelSensitivity?: number;
  playbackSpeed?: number;
  label?: string;
}

/**
 * 0.25x Multi-Scene 3D Architectural Background System:
 * - Uses verified `/videos/{page}-3d.mp4` at 0.25x playbackRate when present on disk.
 * - Automatically engages the curated Multi-Scene 3D Architectural Image Sequence
 *   with smooth raised-cosine cross-fades & subtle spatial camera depth (scale/parallax)
 *   whenever pre-rendered 3D MP4 files have not yet been supplied — completely eliminating
 *   fast stock footage or running human actors.
 * - Driven strictly by `ScrollVideoController` (hover activation + passive wheel forward/reverse + instant idle freeze).
 */
export function ScrollVideoBackground({
  src,
  poster,
  scenes,
  overlayClassName = 'bg-gradient-to-b from-[#FAF8F4]/70 via-[#F7F4EE]/35 to-[#EFEAE1]/72',
  videoOpacityClassName = 'opacity-58',
  blendModeClassName = 'mix-blend-normal',
  triggerSelector,
  eager = false,
  wheelSensitivity = 1600,
  playbackSpeed = 0.25,
  label = '0.25x 3D architectural luxury mall backdrop',
}: ScrollVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [useMultiSceneSequence, setUseMultiSceneSequence] = useState(false);

  const persistentKey = triggerSelector || src;

  const effectiveScenes = useMemo<ArchitecturalScene[]>(() => {
    if (scenes && scenes.length > 0) return scenes;
    if (poster) return [{ src: poster, title: label }];
    return [];
  }, [scenes, poster, label]);

  const applySceneFrame = useCallback(
    (progress: number) => {
      const sceneCount = effectiveScenes.length;
      if (sceneCount === 0) return;

      const scaledIndex = sceneCount > 1 ? progress * (sceneCount - 1) : 0;

      effectiveScenes.forEach((_, index) => {
        const imgEl = sceneImgRefs.current[index];
        if (!imgEl) return;

        const dist = Math.abs(scaledIndex - index);
        const rawWeight = Math.max(0, 1 - dist);
        const smoothWeight =
          rawWeight <= 0
            ? 0
            : rawWeight >= 1
            ? 1
            : 0.5 - 0.5 * Math.cos(Math.PI * rawWeight);

        const signedOffset = scaledIndex - index;
        const driftX = (index % 2 === 0 ? 1 : -1) * signedOffset * 1.4;
        const subtleScale = 1 + (1 - Math.abs(signedOffset)) * 0.032;

        gsap.set(imgEl, {
          opacity: smoothWeight,
          scale: Number(subtleScale.toFixed(4)),
          xPercent: Number(driftX.toFixed(2)),
        });
      });
    },
    [effectiveScenes]
  );

  useEffect(() => {
    setVideoReady(false);
    setUseMultiSceneSequence(false);
  }, [src]);

  useEffect(() => {
    applySceneFrame(0);
  }, [applySceneFrame]);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const sectionEl = (container.parentElement ||
      (triggerSelector ? document.querySelector(triggerSelector) : null)) as HTMLElement | null;

    if (!sectionEl) return;

    const controller = new ScrollVideoController({
      sectionEl,
      videoEl: useMultiSceneSequence ? null : video,
      persistentKey,
      wheelSensitivity,
      playbackSpeed,
      onHoverChange: setIsHovered,
      onReadyChange: setVideoReady,
      onProgressChange: applySceneFrame,
      onError: () => {
        setVideoReady(false);
        setUseMultiSceneSequence(true);
      },
    });

    return () => {
      controller.destroy();
    };
  }, [
    applySceneFrame,
    persistentKey,
    playbackSpeed,
    triggerSelector,
    useMultiSceneSequence,
    wheelSensitivity,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-scroll-scene-active={isHovered ? 'true' : 'false'}
      data-playback-speed={playbackSpeed}
      data-scene-mode={useMultiSceneSequence || !videoReady ? 'multi-scene-3d' : 'video-3d'}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#FAF8F4] via-[#F4EFE6] to-[#EDE7DC]"
    >
      {/* Multi-Scene 3D Architectural Image Sequence (0.25x smooth cosine cross-fade + gentle depth parallax) */}
      {(useMultiSceneSequence || !videoReady) && effectiveScenes.length > 0 && (
        <div className={`absolute inset-0 ${videoOpacityClassName}`}>
          {effectiveScenes.map((scene, index) => (
            <img
              key={`${scene.src}-${index}`}
              ref={(el) => {
                sceneImgRefs.current[index] = el;
              }}
              src={scene.src}
              alt=""
              referrerPolicy="no-referrer"
              loading={eager || index <= 1 ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover will-change-transform ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              } ${blendModeClassName}`}
            />
          ))}
        </div>
      )}

      {/* Optional Native 3D Video Asset Slot (/videos/{page}-3d.mp4) at 0.25x playbackRate when file exists */}
      {!useMultiSceneSequence && (
        <video
          key={src}
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-label={label}
          data-scroll-video="true"
          data-primary-src={src}
          data-video-hovered={isHovered ? 'true' : 'false'}
          data-video-ready={videoReady ? 'true' : 'false'}
          className={`relative w-full h-full object-cover transition-opacity duration-500 ${blendModeClassName} ${
            videoReady ? videoOpacityClassName : 'opacity-0'
          }`}
        />
      )}

      {/* Luminous Pearl / Ivory architectural scrim keeping foreground copy legible */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
