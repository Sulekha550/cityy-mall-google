import gsap from 'gsap';

let activeHostElement = null;

/**
 * Pure JavaScript + GSAP Mouse-Only 1x Video Controller.
 * - Zero autoplay: every section video starts paused and stays frozen when idle.
 * - While the user moves the mouse or scrolls down inside the hovered section,
 *   plays the video smoothly at 1x native hardware playback (`playbackRate = 1`).
 * - Scrolling up rewinds smoothly along currentTime.
 * - The moment mouse movement / scrolling stops or leaves the section, immediately pauses
 *   on the exact current frame (zero drift when not touched).
 */
export function attachMouseOnlyVideoController(
  hostEl,
  videoEl,
  visualLayerEl,
  onReadyChange
) {
  if (!hostEl || !videoEl) {
    return () => {};
  }

  let isDestroyed = false;
  let stopTimerId = null;
  let duration = 0;
  let lastPointer = null;
  let userTriggeredPlay = false;

  videoEl.autoplay = false;
  videoEl.removeAttribute('autoplay');
  videoEl.playbackRate = 1;
  videoEl.defaultPlaybackRate = 1;
  videoEl.pause();

  const freezeNow = () => {
    userTriggeredPlay = false;
    if (!videoEl.paused) {
      videoEl.pause();
    }
  };

  const scheduleFreeze = () => {
    if (stopTimerId) window.clearTimeout(stopTimerId);
    stopTimerId = window.setTimeout(() => {
      freezeNow();
    }, 150);
  };

  const triggerForwardPlayback = () => {
    if (isDestroyed) return;
    videoEl.playbackRate = 1;
    videoEl.defaultPlaybackRate = 1;
    userTriggeredPlay = true;

    if (videoEl.paused) {
      const p = videoEl.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // If browser blocks play without direct gesture, fall back to smooth frame advance
          if (duration > 0.2) {
            videoEl.currentTime = (videoEl.currentTime + 0.08) % duration;
          }
        });
      }
    }
    scheduleFreeze();
  };

  const handleLoadedMetadata = () => {
    duration = Number.isFinite(videoEl.duration) ? videoEl.duration : 0;
    videoEl.playbackRate = 1;
    videoEl.defaultPlaybackRate = 1;
    freezeNow();
  };

  const handleLoadedData = () => {
    if (typeof onReadyChange === 'function') {
      onReadyChange(true);
    }
    if (!userTriggeredPlay) {
      freezeNow();
    }
  };

  const handlePlayGuard = () => {
    // Prevent unwanted autoplay triggered externally if mouse is not actively moving
    if (!userTriggeredPlay) {
      videoEl.pause();
    } else {
      videoEl.playbackRate = 1;
    }
  };

  const handleMouseEnter = () => {
    activeHostElement = hostEl;
    lastPointer = null;
    videoEl.playbackRate = 1;
    // Never auto-run just on hover entry; wait for real mouse motion or scroll
    freezeNow();
  };

  const handleMouseLeave = () => {
    if (activeHostElement === hostEl) {
      activeHostElement = null;
    }
    lastPointer = null;
    if (stopTimerId) window.clearTimeout(stopTimerId);
    freezeNow();

    if (visualLayerEl) {
      gsap.to(visualLayerEl, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseMove = (e) => {
    if (activeHostElement !== hostEl) {
      activeHostElement = hostEl;
    }

    const rect = hostEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (visualLayerEl) {
      gsap.to(visualLayerEl, {
        x: -nx * 14,
        y: -ny * 10,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (lastPointer) {
      const dist = Math.hypot(e.clientX - lastPointer.x, e.clientY - lastPointer.y);
      if (dist > 1.2) {
        triggerForwardPlayback();
      }
    }

    lastPointer = { x: e.clientX, y: e.clientY };
  };

  const handleWheel = (e) => {
    if (activeHostElement !== hostEl) {
      activeHostElement = hostEl;
    }
    const rawDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (!rawDelta) return;

    if (rawDelta > 0) {
      // Scrolling down plays smoothly forward at 1x while scrolling
      triggerForwardPlayback();
    } else if (duration > 0.2) {
      // Scrolling up pauses play and rewinds smoothly proportionally to 1x speed
      freezeNow();
      const rewindSec = Math.min(0.45, Math.abs(rawDelta) * 0.0045);
      const nextTime = videoEl.currentTime - rewindSec;
      try {
        videoEl.currentTime = nextTime < 0 ? duration + nextTime : nextTime;
      } catch {
        // Ignore seek error before buffer
      }
    }
  };

  videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);
  videoEl.addEventListener('loadeddata', handleLoadedData);
  videoEl.addEventListener('play', handlePlayGuard);
  hostEl.addEventListener('mouseenter', handleMouseEnter, { passive: true });
  hostEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  hostEl.addEventListener('mousemove', handleMouseMove, { passive: true });
  hostEl.addEventListener('wheel', handleWheel, { passive: true });

  if (videoEl.readyState >= 2) {
    handleLoadedMetadata();
    handleLoadedData();
  } else if (videoEl.readyState >= 1) {
    handleLoadedMetadata();
  }

  return () => {
    isDestroyed = true;
    if (activeHostElement === hostEl) {
      activeHostElement = null;
    }
    if (stopTimerId) window.clearTimeout(stopTimerId);

    videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
    videoEl.removeEventListener('loadeddata', handleLoadedData);
    videoEl.removeEventListener('play', handlePlayGuard);
    hostEl.removeEventListener('mouseenter', handleMouseEnter);
    hostEl.removeEventListener('mouseleave', handleMouseLeave);
    hostEl.removeEventListener('mousemove', handleMouseMove);
    hostEl.removeEventListener('wheel', handleWheel);
    freezeNow();
  };
}
