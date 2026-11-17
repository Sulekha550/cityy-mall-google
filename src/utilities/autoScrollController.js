/**
 * Smooth frame-synchronized guided auto-scroll controller.
 * Yields to manual wheel/touch input, preserves pause/resume position,
 * and allows complete stop cleanly from any page.
 */
export class AutoScrollController {
  constructor({ onStateChange, speedPxPerSec = 85 } = {}) {
    this.onStateChange = onStateChange;
    this.speedPxPerSec = speedPxPerSec;
    this.state = 'idle'; // 'idle' | 'playing' | 'paused'
    this.rafId = null;
    this.lastTime = 0;
    this.exactScrollY = 0;
    this.listenersAttached = false;
  }

  emit() {
    if (this.onStateChange) {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      this.onStateChange({
        state: this.state,
        speed: this.speedPxPerSec,
        progress,
      });
    }
  }

  setSpeed(pxPerSec) {
    this.speedPxPerSec = pxPerSec;
    this.emit();
  }

  start() {
    this.attachUserInterruptListeners();
    this.state = 'playing';
    this.exactScrollY = window.scrollY;
    this.lastTime = performance.now();
    this.emit();
    this.scheduleLoop();
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.cancelLoop();
    this.emit();
  }

  resume() {
    if (this.state !== 'paused') {
      this.start();
      return;
    }
    this.state = 'playing';
    this.exactScrollY = window.scrollY;
    this.lastTime = performance.now();
    this.emit();
    this.scheduleLoop();
  }

  stop() {
    this.state = 'idle';
    this.cancelLoop();
    this.detachUserInterruptListeners();
    this.emit();
  }

  scheduleLoop() {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.tick);
  }

  cancelLoop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  tick = (now) => {
    this.rafId = null;
    if (this.state !== 'playing') return;

    const dt = Math.min(0.05, Math.max(0.001, (now - this.lastTime) / 1000));
    this.lastTime = now;

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    if (window.scrollY >= maxScroll - 2) {
      this.state = 'paused';
      this.emit();
      return;
    }

    // Re-sync if manual scroll shifted position while active
    if (Math.abs(window.scrollY - this.exactScrollY) > 12) {
      this.exactScrollY = window.scrollY;
    }

    this.exactScrollY = Math.min(maxScroll, this.exactScrollY + this.speedPxPerSec * dt);
    window.scrollTo({ top: this.exactScrollY, behavior: 'auto' });
    this.emit();

    this.rafId = requestAnimationFrame(this.tick);
  };

  handleManualWheelOrTouch = () => {
    if (this.state === 'playing') {
      // Allow manual scroll immediately without fighting user by pausing smoothly
      this.pause();
    }
  };

  handleManualScrollProgress = () => {
    if (this.state !== 'idle') {
      this.emit();
    }
  };

  attachUserInterruptListeners() {
    if (this.listenersAttached) return;
    this.listenersAttached = true;
    window.addEventListener('wheel', this.handleManualWheelOrTouch, { passive: true });
    window.addEventListener('touchstart', this.handleManualWheelOrTouch, { passive: true });
    window.addEventListener('scroll', this.handleManualScrollProgress, { passive: true });
  }

  detachUserInterruptListeners() {
    if (!this.listenersAttached) return;
    this.listenersAttached = false;
    window.removeEventListener('wheel', this.handleManualWheelOrTouch);
    window.removeEventListener('touchstart', this.handleManualWheelOrTouch);
    window.removeEventListener('scroll', this.handleManualScrollProgress);
  }

  destroy() {
    this.stop();
  }
}
