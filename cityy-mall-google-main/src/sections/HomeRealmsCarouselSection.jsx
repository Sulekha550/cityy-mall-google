import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, BRAND_CATEGORIES } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

export function HomeRealmsCarouselSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(4);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  const updateVisibleCount = () => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) {
      // Desktop: 3 cards fit edge-to-edge
      setMaxIndex(Math.max(0, BRAND_CATEGORIES.length - 3));
    } else if (window.innerWidth >= 640) {
      // Tablet: 2 cards fit edge-to-edge
      setMaxIndex(Math.max(0, BRAND_CATEGORIES.length - 2));
    } else {
      // Mobile: 1 card fits edge-to-edge
      setMaxIndex(Math.max(0, BRAND_CATEGORIES.length - 1));
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const scrollToIndex = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    const card = el.children[clamped];
    if (card) {
      el.scrollTo({
        left: card.offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => scrollToIndex(currentIndex + 1);
  const handlePrev = () => scrollToIndex(currentIndex - 1);

  // Sync index if user scrolls/swipes natively
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollLeft = el.scrollLeft;
        let closestIndex = 0;
        let minDiff = Infinity;
        Array.from(el.children).forEach((child, idx) => {
          const diff = Math.abs(child.offsetLeft - el.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });
        setCurrentIndex(Math.min(closestIndex, maxIndex));
      }, 80);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      el.removeEventListener('scroll', handleScroll);
    };
  }, [maxIndex]);

  return (
    <section
      ref={sectionRef}
      id="home-realms"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E4F5F0] dark:bg-[#112226]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        variant="shopping"
        playbackRate={0.78}
        videoOpacityClassName="opacity-72 dark:opacity-65"
        tintClassName="bg-gradient-to-b from-[#E4F5F0]/86 via-[#E6F1FC]/45 to-[#E4F5F0]/88 dark:from-[#112226]/86 dark:via-[#131C2E]/48 dark:to-[#112226]/88"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Editorial Section Header with Navigation Controls */}
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0E7C71] dark:text-[#5EEAD4]">
              Horizontal Storytelling Track
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Seven Curated Categories
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono tracking-wider text-[#433754] dark:text-[#D8CEE9]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Scroll categories left"
                className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  currentIndex === 0
                    ? 'border-[#2D1D48]/12 dark:border-[#E2D4FF]/12 text-[#1B1325]/30 dark:text-[#F6EFE7]/30 cursor-not-allowed bg-transparent'
                    : 'border-[#2D1D48]/25 dark:border-[#E2D4FF]/25 bg-[#FFFBF6]/90 dark:bg-[#19282C]/90 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#0E7C71] dark:hover:border-[#5EEAD4] cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Scroll categories right"
                className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  currentIndex >= maxIndex
                    ? 'border-[#2D1D48]/12 dark:border-[#E2D4FF]/12 text-[#1B1325]/30 dark:text-[#F6EFE7]/30 cursor-not-allowed bg-transparent'
                    : 'border-[#2D1D48]/25 dark:border-[#E2D4FF]/25 bg-[#FFFBF6]/90 dark:bg-[#19282C]/90 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#0E7C71] dark:hover:border-[#5EEAD4] cursor-pointer'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Runway Strip — Exactly 3 Cards on Desktop, 2 on Tablet, 1 on Mobile. ZERO Cut-Off Cards! */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-3"
          >
            {BRAND_CATEGORIES.map((cat, idx) => {
              const categoryCount = APPROVED_BRANDS.filter(
                (b) => b.categoryId === cat.id
              ).length;

              return (
                <Link
                  key={cat.id}
                  to={cat.route}
                  data-motion="seq-img"
                  data-seq-index={idx % 4}
                  data-seq-from="up"
                  className="group shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] snap-start flex flex-col"
                >
                  <div className="border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#17242A]/92 overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="relative h-56 overflow-hidden bg-[#D5ECE6] dark:bg-[#1D3136]">
                        <ResilientImage
                          src={cat.video.fallbackImage}
                          alt={cat.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="font-display text-5xl font-bold absolute bottom-3 left-4 text-white drop-shadow-md tabular-nums">
                          {cat.number}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-[#0E7C71] dark:text-[#5EEAD4] tabular-nums">
                            {categoryCount} {categoryCount === 1 ? 'Outlet' : 'Houses'}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#C9523C] dark:text-[#F48C74] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                          {cat.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-5 pt-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0E7C71] dark:text-[#5EEAD4] group-hover:underline inline-flex items-center gap-1">
                        <span>Explore Category</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dynamic Dot Pagination Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#0E7C71] dark:bg-[#5EEAD4]'
                  : 'w-2 bg-[#2D1D48]/20 dark:bg-[#E2D4FF]/25 hover:bg-[#0E7C71]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
