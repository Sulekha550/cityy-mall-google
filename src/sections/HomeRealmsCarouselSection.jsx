import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  const nudgeTrack = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E4F5F0] dark:bg-[#112226]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        playbackRate={0.78}
        videoOpacityClassName="opacity-72 dark:opacity-65"
        tintClassName="bg-gradient-to-b from-[#E4F5F0]/86 via-[#E6F1FC]/45 to-[#E4F5F0]/88 dark:from-[#112226]/86 dark:via-[#131C2E]/48 dark:to-[#112226]/88"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => nudgeTrack(-1)}
              aria-label="Scroll categories left"
              className="w-10 h-10 flex items-center justify-center border border-[#2D1D48]/25 dark:border-[#E2D4FF]/25 bg-[#FFFBF6]/90 dark:bg-[#19282C]/90 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#0E7C71] dark:hover:border-[#5EEAD4] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => nudgeTrack(1)}
              aria-label="Scroll categories right"
              className="w-10 h-10 flex items-center justify-center border border-[#2D1D48]/25 dark:border-[#E2D4FF]/25 bg-[#FFFBF6]/90 dark:bg-[#19282C]/90 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#0E7C71] dark:hover:border-[#5EEAD4] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Runway Strip with alternating vertical staggered offsets */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
        >
          {BRAND_CATEGORIES.map((cat, idx) => {
            const categoryCount = APPROVED_BRANDS.filter(
              (b) => b.categoryId === cat.id
            ).length;
            const staggerOffset = idx % 2 === 1 ? 'md:mt-8' : 'md:mt-0';

            return (
              <Link
                key={cat.id}
                to={cat.route}
                className={`group shrink-0 w-[290px] sm:w-[340px] snap-start ${staggerOffset}`}
              >
                <div className="border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#17242A]/92 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
