import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pause, Play, RotateCcw, Square } from 'lucide-react';
import { AutoScrollController } from '../utilities/autoScrollController';

const SPEED_OPTIONS = [
  { label: 'Slow', value: 55 },
  { label: 'Smooth', value: 90 },
  { label: 'Brisk', value: 140 },
];

export function AutoScrollBar() {
  const { pathname } = useLocation();
  const controllerRef = useRef(null);
  const [scrollState, setScrollState] = useState('idle'); // 'idle' | 'playing' | 'paused'
  const [speed, setSpeed] = useState(90);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controller = new AutoScrollController({
      speedPxPerSec: 90,
      onStateChange: ({ state, speed: s, progress: p }) => {
        setScrollState(state);
        setSpeed(s);
        setProgress(p);
      },
    });
    controllerRef.current = controller;

    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, []);

  // Reset guided tour gracefully on page navigation
  useEffect(() => {
    controllerRef.current?.stop();
    setProgress(0);
  }, [pathname]);

  const handleStart = () => controllerRef.current?.start();
  const handlePause = () => controllerRef.current?.pause();
  const handleResume = () => controllerRef.current?.resume();
  const handleStop = () => controllerRef.current?.stop();

  const handleSpeedChange = (nextSpeed) => {
    setSpeed(nextSpeed);
    controllerRef.current?.setSpeed(nextSpeed);
  };

  return (
    <div
      role="region"
      aria-label="Guided Auto Scroll Controls"
      className="sticky top-14 z-30 border-b border-[#2D1D48]/12 dark:border-[#E2D4FF]/12 bg-gradient-to-r from-[#EFE6FA]/95 via-[#FDE8DF]/92 to-[#E4F5F0]/95 dark:from-[#1D1630]/95 dark:via-[#241724]/95 dark:to-[#112226]/95 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="hidden sm:inline-block text-xs font-medium text-[#433754] dark:text-[#D8CEE9] whitespace-nowrap shrink-0">
            Guided Tour
          </span>

          {scrollState === 'idle' && (
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Start Auto Scroll</span>
            </button>
          )}

          {scrollState === 'playing' && (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#683BA4] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              <Pause className="w-3 h-3 fill-current" />
              <span>Pause</span>
            </button>
          )}

          {scrollState === 'paused' && (
            <button
              type="button"
              onClick={handleResume}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#0E7C71] dark:bg-[#5EEAD4] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Resume</span>
            </button>
          )}

          {scrollState !== 'idle' && (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-[#2D1D48]/25 dark:border-[#E2D4FF]/25 bg-[#FFFBF6]/80 dark:bg-[#151021]/80 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#C9523C] dark:hover:border-[#F48C74] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Stop</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleSpeedChange(opt.value)}
                className={`px-2 py-0.5 text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  speed === opt.value
                    ? 'bg-[#1B1325] dark:bg-[#F6EFE7] text-[#FBF4EB] dark:text-[#151021]'
                    : 'text-[#433754] dark:text-[#D8CEE9] hover:text-[#1B1325] dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] tabular-nums text-[#5D5070] dark:text-[#B5A7D0] whitespace-nowrap">
            {scrollState === 'playing'
              ? `Scrolling · ${Math.round(progress * 100)}%`
              : scrollState === 'paused'
              ? `Paused · ${Math.round(progress * 100)}%`
              : 'Ready'}
          </span>
        </div>
      </div>

      {/* Hairline progress indicator */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-[#C9523C] dark:bg-[#F48C74] transition-[width] duration-150"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
