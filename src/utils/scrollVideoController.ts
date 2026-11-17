import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Persist exact per-section progress (0..1) across hover changes and route navigation
const savedSectionProgress = new Map<string, number>();

type LegacyWheelEvent = WheelEvent & {
  wheelDelta?: number;
  wheelDeltaY?: number;
};

export interface ScrollVideoControllerOptions {
  sectionEl: HTMLElement;
  videoEl?: HTMLVideoElement | null;
  persistentKey: string;
  wheelSensitivity?: number;
  playbackSpeed?: number; // Defaults to 0.25x ultra-slow architectural pace
  onHoverChange?: (hovered: boolean) => void;
  onReadyChange?: (ready: boolean) => void;
  onProgressChange?: (progress: number) => void;
  onError?: () => void;
}

/**
 * Cross-browser normalization for vertical mouse wheel and trackpad deltas
 * across Chromium, Firefox, Safari, and Edge, including line/page deltaModes.
 */
export function normalizeWheelDelta(event: WheelEvent): number {
  const e = event as LegacyWheelEvent;
  let delta = e.deltaY;

  if (!delta && typeof e.wheelDeltaY === 'number') {
    delta = -e.wheelDeltaY;
  } else if (!delta && typeof e.wheelDelta === 'number') {
    delta = -e.wheelDelta;
  } else if (!delta && typeof e.detail === 'number') {
    delta = e.detail * 40;
  }

  if (e.deltaMode === 1) {
    // DOM_DELTA_LINE
    delta *= 32;
  } else if (e.deltaMode === 2) {
    // DOM_DELTA_PAGE
    delta *= typeof window !== 'undefined' ? window.innerHeight || 800 : 800;
  }

  // Clamp extreme wheel burst spikes so playback remains cinematic and smooth
  return Math.max(-240, Math.min(240, delta));
}

/**
 * Centralized GSAP + requestAnimationFrame controller for hover-gated wheel playback:
 * - Frozen by default (never autoplays on load or hover alone).
 * - Exclusive active-section tracking so only the hovered section reacts to wheel events.
 * - Normalizes wheel deltas and uses GSAP easing + requestAnimationFrame to synchronize
 *   video.currentTime seeking and multi-scene progress updates with display refresh rates.
 * - Immediately pauses and preserves exact frame on scroll idle, mouseleave, or exit.
 * - Fully cleans up section, video, GSAP, ScrollTrigger, RAF, and global listeners on destroy().
 */
export class ScrollVideoController {
  private static instances = new Set<ScrollVideoController>();
  private static activeInstance: ScrollVideoController | null = null;
  private static lastPointer: { x: number; y: number } | null = null;
  private static globalBound = false;

  private readonly sectionEl: HTMLElement;
  private readonly videoEl: HTMLVideoElement | null;
  private readonly persistentKey: string;
  private readonly wheelSensitivity: number;
  private readonly playbackSpeed: number;
  private readonly onHoverChange?: (hovered: boolean) => void;
  private readonly onReadyChange?: (ready: boolean) => void;
  private readonly onProgressChange?: (progress: number) => void;
  private readonly onError?: () => void;

  private readonly progressProxy: { progress: number };
  private targetProgress: number;
  private isHovered = false;
  private isDestroyed = false;
  private pendingSeekTime: number | null = null;
  private rafId: number | null = null;
  private progressTween: gsap.core.Tween | null = null;
  private idleFreezeCall: gsap.core.Tween | null = null;
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private readonly prefersReducedMotion: boolean;

  constructor(options: ScrollVideoControllerOptions) {
    this.sectionEl = options.sectionEl;
    this.videoEl = options.videoEl ?? null;
    this.persistentKey = options.persistentKey;
    this.wheelSensitivity = options.wheelSensitivity ?? 1600;
    this.playbackSpeed = options.playbackSpeed ?? 0.25;
    this.onHoverChange = options.onHoverChange;
    this.onReadyChange = options.onReadyChange;
    this.onProgressChange = options.onProgressChange;
    this.onError = options.onError;

    const initial = savedSectionProgress.get(this.persistentKey) ?? 0;
    this.progressProxy = { progress: initial };
    this.targetProgress = initial;

    this.prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    ScrollVideoController.instances.add(this);
    ScrollVideoController.attachGlobalListeners();

    this.bindEvents();

    // Sync initial preserved frame without autoplaying
    this.onProgressChange?.(initial);

    if (this.videoEl) {
      this.videoEl.playbackRate = this.playbackSpeed;
      this.videoEl.defaultPlaybackRate = this.playbackSpeed;
      this.videoEl.pause();
      if (this.videoEl.readyState >= 1) {
        this.handleLoadedMetadata();
      }
      if (this.videoEl.readyState >= 2) {
        this.handleFrameReady();
      }
    } else {
      this.onReadyChange?.(true);
    }

    if (
      ScrollVideoController.lastPointer &&
      ScrollVideoController.isPointInside(
        this.sectionEl,
        ScrollVideoController.lastPointer.x,
        ScrollVideoController.lastPointer.y
      )
    ) {
      ScrollVideoController.setExclusiveActive(this);
    }
  }

  private static isPointInside(el: HTMLElement, x: number, y: number): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  }

  private static resolveAtPoint(x: number, y: number): ScrollVideoController | null {
    for (const controller of ScrollVideoController.instances) {
      if (ScrollVideoController.isPointInside(controller.sectionEl, x, y)) {
        return controller;
      }
    }
    return null;
  }

  private static setExclusiveActive(next: ScrollVideoController | null) {
    if (ScrollVideoController.activeInstance === next) return;

    if (ScrollVideoController.activeInstance) {
      ScrollVideoController.activeInstance.setHovered(false);
    }

    ScrollVideoController.activeInstance = next;

    if (next) {
      next.setHovered(true);
    }
  }

  private static handleGlobalPointerMove = (e: PointerEvent) => {
    ScrollVideoController.lastPointer = { x: e.clientX, y: e.clientY };
    const hit = ScrollVideoController.resolveAtPoint(e.clientX, e.clientY);
    ScrollVideoController.setExclusiveActive(hit);
  };

  private static handleGlobalScroll = () => {
    if (!ScrollVideoController.lastPointer) return;
    const hit = ScrollVideoController.resolveAtPoint(
      ScrollVideoController.lastPointer.x,
      ScrollVideoController.lastPointer.y
    );
    ScrollVideoController.setExclusiveActive(hit);
  };

  private static handleGlobalExit = () => {
    ScrollVideoController.lastPointer = null;
    ScrollVideoController.setExclusiveActive(null);
  };

  private static handleWindowBlur = () => {
    ScrollVideoController.setExclusiveActive(null);
  };

  private static handleVisibilityChange = () => {
    if (document.hidden) {
      ScrollVideoController.setExclusiveActive(null);
    }
  };

  private static attachGlobalListeners() {
    if (ScrollVideoController.globalBound || typeof window === 'undefined') return;
    ScrollVideoController.globalBound = true;

    window.addEventListener('pointermove', ScrollVideoController.handleGlobalPointerMove, {
      passive: true,
    });
    window.addEventListener('scroll', ScrollVideoController.handleGlobalScroll, {
      passive: true,
    });
    document.documentElement.addEventListener(
      'mouseleave',
      ScrollVideoController.handleGlobalExit
    );
    window.addEventListener('blur', ScrollVideoController.handleWindowBlur);
    document.addEventListener(
      'visibilitychange',
      ScrollVideoController.handleVisibilityChange
    );
  }

  private static detachGlobalListenersIfEmpty() {
    if (
      !ScrollVideoController.globalBound ||
      ScrollVideoController.instances.size > 0 ||
      typeof window === 'undefined'
    ) {
      return;
    }

    ScrollVideoController.globalBound = false;
    window.removeEventListener(
      'pointermove',
      ScrollVideoController.handleGlobalPointerMove
    );
    window.removeEventListener('scroll', ScrollVideoController.handleGlobalScroll);
    document.documentElement.removeEventListener(
      'mouseleave',
      ScrollVideoController.handleGlobalExit
    );
    window.removeEventListener('blur', ScrollVideoController.handleWindowBlur);
    document.removeEventListener(
      'visibilitychange',
      ScrollVideoController.handleVisibilityChange
    );
  }

  public getProgress(): number {
    return this.progressProxy.progress;
  }

  public pause(): void {
    this.freezeMotionImmediately();
  }

  private setHovered(hovered: boolean) {
    if (this.isHovered === hovered) return;
    this.isHovered = hovered;
    this.onHoverChange?.(hovered);

    if (!hovered) {
      this.freezeMotionImmediately();
    } else if (this.videoEl) {
      this.videoEl.playbackRate = this.playbackSpeed;
      if (!this.videoEl.paused) {
        this.videoEl.pause();
      }
    }
  }

  private scheduleIdleFreeze(delaySeconds = 0.16) {
    if (this.idleFreezeCall) {
      this.idleFreezeCall.kill();
    }
    this.idleFreezeCall = gsap.delayedCall(
      delaySeconds,
      this.freezeMotionImmediately
    );
  }

  private scheduleFrameSync = () => {
    if (this.isDestroyed || this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.applyProgressFrame);
  };

  private applyProgressFrame = () => {
    this.rafId = null;
    if (this.isDestroyed) return;
    this.syncFrameState(this.progressProxy.progress);
  };

  private syncFrameState(rawProgress: number) {
    const clamped = Math.min(1, Math.max(0, rawProgress));
    savedSectionProgress.set(this.persistentKey, clamped);
    this.onProgressChange?.(clamped);

    if (!this.videoEl) return;

    this.videoEl.playbackRate = this.playbackSpeed;
    if (!this.videoEl.paused) {
      this.videoEl.pause();
    }

    const duration = this.videoEl.duration;
    if (!Number.isFinite(duration) || duration <= 0 || this.videoEl.readyState < 1) {
      return;
    }

    const startOffset = 0.04;
    const usableDuration = Math.max(0.1, duration - 0.08);
    const targetTime = Math.min(
      duration - 0.04,
      Math.max(startOffset, startOffset + clamped * usableDuration)
    );

    if (Math.abs(this.videoEl.currentTime - targetTime) < 0.002) {
      return;
    }

    if (this.videoEl.seeking) {
      this.pendingSeekTime = targetTime;
    } else {
      this.pendingSeekTime = null;
      try {
        this.videoEl.currentTime = targetTime;
      } catch {
        // Ignore transient browser decode seek states
      }
    }
  }

  private freezeMotionImmediately = () => {
    this.progressTween?.kill();
    this.progressTween = null;
    gsap.killTweensOf(this.progressProxy);

    if (this.idleFreezeCall) {
      this.idleFreezeCall.kill();
      this.idleFreezeCall = null;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    const exactProgress = Math.min(1, Math.max(0, this.progressProxy.progress));
    this.progressProxy.progress = exactProgress;
    this.targetProgress = exactProgress;
    this.pendingSeekTime = null;

    this.syncFrameState(exactProgress);

    if (this.videoEl && !this.videoEl.paused) {
      this.videoEl.pause();
    }
  };

  private handleSeeked = () => {
    if (this.isDestroyed || !this.videoEl || this.pendingSeekTime === null) return;
    const nextTime = this.pendingSeekTime;
    this.pendingSeekTime = null;

    if (Math.abs(this.videoEl.currentTime - nextTime) >= 0.002) {
      requestAnimationFrame(() => {
        if (this.isDestroyed || !this.videoEl || this.videoEl.seeking) return;
        try {
          this.videoEl.currentTime = nextTime;
        } catch {
          // Ignore transient decode seek states
        }
      });
    }
  };

  private handleLoadedMetadata = () => {
    if (this.isDestroyed || !this.videoEl) return;
    this.videoEl.playbackRate = this.playbackSpeed;
    this.videoEl.pause();
    this.onReadyChange?.(true);

    const preserved = savedSectionProgress.get(this.persistentKey) ?? 0;
    this.progressProxy.progress = preserved;
    this.targetProgress = preserved;
    this.scheduleFrameSync();
  };

  private handleFrameReady = () => {
    if (this.isDestroyed || !this.videoEl) return;
    this.videoEl.playbackRate = this.playbackSpeed;
    this.videoEl.pause();
    this.onReadyChange?.(true);
  };

  private handlePreventAutoPlay = () => {
    if (this.videoEl && !this.videoEl.paused) {
      this.videoEl.pause();
    }
  };

  private handleVideoError = () => {
    if (this.isDestroyed) return;
    this.onReadyChange?.(false);
    this.onError?.();
  };

  private handleMouseEnter = (e: MouseEvent) => {
    ScrollVideoController.lastPointer = { x: e.clientX, y: e.clientY };
    ScrollVideoController.setExclusiveActive(this);
  };

  private handleMouseLeave = (e: MouseEvent) => {
    if (
      !e.relatedTarget ||
      !(e.relatedTarget instanceof Node) ||
      !this.sectionEl.contains(e.relatedTarget)
    ) {
      if (ScrollVideoController.activeInstance === this) {
        ScrollVideoController.setExclusiveActive(null);
      } else {
        this.setHovered(false);
      }
    }
  };

  private handleWheel = (e: WheelEvent) => {
    if (this.isDestroyed || this.prefersReducedMotion) return;

    ScrollVideoController.lastPointer = { x: e.clientX, y: e.clientY };

    if (!ScrollVideoController.isPointInside(this.sectionEl, e.clientX, e.clientY)) {
      if (this.isHovered) {
        this.setHovered(false);
      }
      return;
    }

    if (ScrollVideoController.activeInstance !== this || !this.isHovered) {
      ScrollVideoController.setExclusiveActive(this);
    }

    const normalizedDelta = normalizeWheelDelta(e);
    if (Math.abs(normalizedDelta) < 0.25) return;

    const deltaProgress =
      (normalizedDelta / this.wheelSensitivity) * (this.playbackSpeed / 0.25);

    this.targetProgress = Math.min(
      1,
      Math.max(0, this.targetProgress + deltaProgress)
    );

    this.progressTween?.kill();
    this.progressTween = gsap.to(this.progressProxy, {
      progress: this.targetProgress,
      duration: 0.48,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: this.scheduleFrameSync,
    });

    this.scheduleIdleFreeze(0.16);
  };

  private bindEvents() {
    if (this.videoEl) {
      this.videoEl.addEventListener('loadedmetadata', this.handleLoadedMetadata);
      this.videoEl.addEventListener('loadeddata', this.handleFrameReady);
      this.videoEl.addEventListener('canplay', this.handleFrameReady);
      this.videoEl.addEventListener('seeked', this.handleSeeked);
      this.videoEl.addEventListener('play', this.handlePreventAutoPlay);
      this.videoEl.addEventListener('error', this.handleVideoError);
    }

    this.sectionEl.addEventListener('mouseenter', this.handleMouseEnter);
    this.sectionEl.addEventListener('mouseleave', this.handleMouseLeave);
    this.sectionEl.addEventListener('wheel', this.handleWheel, { passive: true });

    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: this.sectionEl,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: () => {
        if (ScrollVideoController.activeInstance === this) {
          ScrollVideoController.setExclusiveActive(null);
        } else {
          this.setHovered(false);
        }
      },
      onLeaveBack: () => {
        if (ScrollVideoController.activeInstance === this) {
          ScrollVideoController.setExclusiveActive(null);
        } else {
          this.setHovered(false);
        }
      },
    });
  }

  public destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;

    this.freezeMotionImmediately();
    this.scrollTriggerInstance?.kill();
    this.scrollTriggerInstance = null;

    if (ScrollVideoController.activeInstance === this) {
      ScrollVideoController.activeInstance = null;
    }
    ScrollVideoController.instances.delete(this);
    ScrollVideoController.detachGlobalListenersIfEmpty();

    this.sectionEl.removeEventListener('mouseenter', this.handleMouseEnter);
    this.sectionEl.removeEventListener('mouseleave', this.handleMouseLeave);
    this.sectionEl.removeEventListener('wheel', this.handleWheel);

    if (this.videoEl) {
      this.videoEl.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
      this.videoEl.removeEventListener('loadeddata', this.handleFrameReady);
      this.videoEl.removeEventListener('canplay', this.handleFrameReady);
      this.videoEl.removeEventListener('seeked', this.handleSeeked);
      this.videoEl.removeEventListener('play', this.handlePreventAutoPlay);
      this.videoEl.removeEventListener('error', this.handleVideoError);
    }
  }
}
