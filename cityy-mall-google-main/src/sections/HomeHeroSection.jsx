import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

const HERO_FEATURE_IDS = ['louis-philippe', 'tanishq', 'inox-cinemas', 'barbeque-nation'];

export function HomeHeroSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredBrands = HERO_FEATURE_IDS.map((id) =>
    APPROVED_BRANDS.find((b) => b.id === id)
  ).filter(Boolean);

  const activeBrand = featuredBrands[activeIndex] || featuredBrands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredBrands.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, [featuredBrands.length]);

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB] dark:bg-[#151021]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        eager
        playbackRate={0.25}
        videoOpacityClassName="opacity-88 dark:opacity-78"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Asymmetric Display Typography Left */}
          <div className="lg:col-span-7 space-y-6">
            <div data-motion="reveal" className="space-y-3">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
                {MALL_IDENTITY.city}, {MALL_IDENTITY.state} · {MALL_IDENTITY.country}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.03] text-[#1B1325] dark:text-[#F6EFE7]">
                CITY MALL
                <span className="block font-normal italic text-3xl sm:text-4xl lg:text-5xl mt-1 text-[#C9523C] dark:text-[#F48C74]">
                  Gorakhpur&apos;s Living Promenade
                </span>
              </h1>
            </div>

            <p
              data-motion="reveal"
              className="text-base sm:text-lg leading-relaxed max-w-xl text-[#433754] dark:text-[#D8CEE9]"
            >
              Eighteen premier fashion boutiques, global sportswear houses, fine jewellery salons, Spencer&apos;s hypermarket, INOX Cinemas, and signature culinary tables gathered under sunlit architecture.
            </p>

            <div data-motion="reveal" className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/brands"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.12em] uppercase font-semibold bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
              >
                <span>Explore Brand Showcase</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/discover"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.12em] uppercase font-semibold border border-[#2D1D48]/30 dark:border-[#E2D4FF]/30 bg-[#FFFBF6]/80 dark:bg-[#1D1630]/80 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#683BA4] dark:hover:border-[#BFA1FF] transition-colors whitespace-nowrap shrink-0"
              >
                <PlayCircle className="w-4 h-4 text-[#0E7C71] dark:text-[#5EEAD4]" />
                <span>Interactive Discovery</span>
              </Link>
            </div>
          </div>

          {/* Sequential One-by-One Layered Architectural Composition Right */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-end">
            {/* Sequential Image 1: Background Grand Atrium Perspective (Enters First) */}
            <div
              data-motion="seq-img"
              data-seq-index="0"
              data-seq-from="left"
              className="absolute -left-4 sm:-left-8 top-0 w-[65%] aspect-[4/3] border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/80 dark:bg-[#1D1630]/80 shadow-lg overflow-hidden hidden sm:block"
            >
              <ResilientImage
                src={ARCHITECTURAL_GALLERY[1]}
                alt="CITY MALL Gorakhpur sunlit architectural promenade"
                priority
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-wider text-white/90">
                Gorakhpur Promenade Atrium
              </span>
            </div>

            {/* Sequential Image 2: Foreground Featured Brand Vitrine (Enters Second with Stagger) */}
            <div
              data-motion="seq-img"
              data-seq-index="1"
              data-seq-from="up"
              className="relative z-10 w-full max-w-sm sm:max-w-md border border-[#2D1D48]/18 dark:border-[#E2D4FF]/20 bg-[#FFFBF6]/95 dark:bg-[#1D1630]/95 shadow-2xl overflow-hidden mt-8 sm:mt-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38]">
                <ResilientImage
                  src={activeBrand?.image || ARCHITECTURAL_GALLERY[0]}
                  alt={activeBrand?.name || 'CITY MALL Gorakhpur'}
                  priority
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4]">
                    {activeBrand?.categoryName}
                  </p>
                  <button
                    type="button"
                    onClick={() => activeBrand && onInspectBrand(activeBrand)}
                    className="font-display text-2xl font-semibold text-left hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors cursor-pointer truncate block"
                  >
                    {activeBrand?.name}
                  </button>
                </div>

                {activeBrand && (
                  <BrandInsignia
                    monogram={activeBrand.monogram}
                    accentColor={activeBrand.accentColor}
                  />
                )}
              </div>

              {/* Interactive switcher dots */}
              <div className="px-5 sm:px-6 pb-4 flex items-center justify-between border-t border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 pt-3">
                <div className="flex items-center gap-2">
                  {featuredBrands.map((b, idx) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Preview ${b.name}`}
                      className={`h-2 transition-all cursor-pointer ${
                        idx === activeIndex
                          ? 'w-7 bg-[#C9523C] dark:bg-[#F48C74]'
                          : 'w-2.5 bg-[#2D1D48]/25 dark:bg-[#E2D4FF]/25 hover:bg-[#683BA4]'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => activeBrand && onInspectBrand(activeBrand)}
                  className="text-xs font-semibold text-[#683BA4] dark:text-[#BFA1FF] hover:underline cursor-pointer"
                >
                  Inspect House
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
