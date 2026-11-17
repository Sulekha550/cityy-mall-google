import gsap from 'gsap';

let activeHostElement = null;

/**
 * Pure JavaScript + GSAP Mouse and Scroll Video Controller.
 * - Zero unwanted autoplay: every section video starts paused and stays frozen when idle.
 * - While the user moves the mouse or scrolls with the mouse wheel / page scroll,
 *   plays the video smoothly forward at native hardware playback rate.
 * - Both scrolling down and scrolling up smoothly trigger forward playback while visible.
 * - The moment mouse movement or scrolling stops, cleanly freezes on the current frame.
 * - Immediately pauses when the section leaves the viewport.
 */
export function attachMouseOnlyVideoController(
  hostEl,
  videoEl,
  visualLayerEl,
  onReadyChange,
  targetPlaybackRate = 1
) {
  if (!hostEl || !videoEl) {
    return () => {};
  }

  const effectivePlaybackRate =
    typeof targetPlaybackRate === 'number' && targetPlaybackRate > 0
      ? targetPlaybackRate
      : 1;

  let isDestroyed = false;
  let stopTimerId = null;
  let duration = 0;
  let lastPointer = null;
  let userTriggeredPlay = false;
  let isScrollingActive = false;
  let scrollReleaseTimer = null;
  let isVisibleInViewport = false;

  const enforcePlaybackRate = () => {
    try {
      if (videoEl && videoEl.playbackRate !== effectivePlaybackRate) {
        videoEl.playbackRate = effectivePlaybackRate;
      }
      if (videoEl && videoEl.defaultPlaybackRate !== effectivePlaybackRate) {
        videoEl.defaultPlaybackRate = effectivePlaybackRate;
      }
    } catch {
      // Ignore if video element is detached
    }
  };

  videoEl.autoplay = false;
  videoEl.removeAttribute('autoplay');
  enforcePlaybackRate();
  videoEl.pause();

  const freezeNow = () => {
    userTriggeredPlay = false;
    isScrollingActive = false;
    if (!videoEl.paused) {
      videoEl.pause();
    }
  };

  const scheduleFreeze = (delayMs = 250) => {
    if (stopTimerId) window.clearTimeout(stopTimerId);
    stopTimerId = window.setTimeout(() => {
      freezeNow();
    }, delayMs);
  };

  const triggerForwardPlayback = (sustainDurationMs = 250) => {
    if (isDestroyed) return;
    enforcePlaybackRate();
    userTriggeredPlay = true;

    if (videoEl.paused) {
      const p = videoEl.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          enforcePlaybackRate();
        }).catch(() => {
          // If browser blocks play without direct gesture, fall back to smooth frame advance
          if (duration > 0.2) {
            videoEl.currentTime =
              (videoEl.currentTime + effectivePlaybackRate * 0.02) % duration;
          }
        });
      }
    } else {
      enforcePlaybackRate();
    }
    scheduleFreeze(sustainDurationMs);
  };

  const checkViewportVisibility = () => {
    if (!hostEl) return false;
    const rect = hostEl.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < windowHeight && rect.bottom > 0;
  };

  // IntersectionObserver for tracking viewport presence
  let observer = null;
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hostEl) {
            isVisibleInViewport = entry.isIntersecting;
            if (!entry.isIntersecting) {
              freezeNow();
            }
          }
        }
      },
      {
        root: null,
        threshold: [0, 0.1, 0.25],
      }
    );
    observer.observe(hostEl);
  } else {
    isVisibleInViewport = checkViewportVisibility();
  }

  const handleLoadedMetadata = () => {
    duration = Number.isFinite(videoEl.duration) ? videoEl.duration : 0;
    videoEl.playbackRate = effectivePlaybackRate;
    videoEl.defaultPlaybackRate = effectivePlaybackRate;
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
    // Prevent unwanted autoplay triggered externally if user didn't trigger
    if (!userTriggeredPlay) {
      videoEl.pause();
    } else {
      videoEl.playbackRate = effectivePlaybackRate;
    }
  };

  const handleMouseEnter = () => {
    activeHostElement = hostEl;
    lastPointer = null;
    videoEl.playbackRate = effectivePlaybackRate;
  };

  const handleMouseLeave = () => {
    if (activeHostElement === hostEl) {
      activeHostElement = null;
    }
    lastPointer = null;

    if (visualLayerEl) {
      gsap.to(visualLayerEl, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Only immediately freeze on leave if not actively scrolling through the section
    if (!isScrollingActive) {
      if (stopTimerId) window.clearTimeout(stopTimerId);
      freezeNow();
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
        triggerForwardPlayback(220);
      }
    }

    lastPointer = { x: e.clientX, y: e.clientY };
  };

  // Smooth scroll handler: activates when mouse scrolling or page scrolling
  const handleScrollActivity = (sustainMs = 500) => {
    const inView = observer ? isVisibleInViewport : checkViewportVisibility();
    if (!inView) return;

    isScrollingActive = true;
    if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
    scrollReleaseTimer = window.setTimeout(() => {
      isScrollingActive = false;
    }, sustainMs);

    triggerForwardPlayback(sustainMs);
  };

  const handleWheel = (e) => {
    const rawDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(rawDelta) > 0.5) {
      handleScrollActivity(500);
    }
  };

  const handleWindowScroll = () => {
    handleScrollActivity(450);
  };

  videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);
  videoEl.addEventListener('loadeddata', handleLoadedData);
  videoEl.addEventListener('play', handlePlayGuard);
  videoEl.addEventListener('playing', enforcePlaybackRate);
  videoEl.addEventListener('ratechange', enforcePlaybackRate);
  videoEl.addEventListener('timeupdate', enforcePlaybackRate);
  hostEl.addEventListener('mouseenter', handleMouseEnter, { passive: true });
  hostEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  hostEl.addEventListener('mousemove', handleMouseMove, { passive: true });
  hostEl.addEventListener('wheel', handleWheel, { passive: true });

  window.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('scroll', handleWindowScroll, { passive: true });

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
    if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);

    if (observer) {
      observer.disconnect();
    }

    videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
    videoEl.removeEventListener('loadeddata', handleLoadedData);
    videoEl.removeEventListener('play', handlePlayGuard);
    videoEl.removeEventListener('playing', enforcePlaybackRate);
    videoEl.removeEventListener('ratechange', enforcePlaybackRate);
    videoEl.removeEventListener('timeupdate', enforcePlaybackRate);
    hostEl.removeEventListener('mouseenter', handleMouseEnter);
    hostEl.removeEventListener('mouseleave', handleMouseLeave);
    hostEl.removeEventListener('mousemove', handleMouseMove);
    hostEl.removeEventListener('wheel', handleWheel);

    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('scroll', handleWindowScroll);

    freezeNow();
  };
}
