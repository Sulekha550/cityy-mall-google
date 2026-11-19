import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';
import { BrandLogo } from '../components/BrandLogo';
import { CityMallLogo } from '../components/CityMallLogo';

const HERO_FEATURE_IDS = ['louis-philippe', 'tanishq', 'titan-world', 'inox-cinemas'];

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
      if (typeof document !== 'undefined' && document.hidden) return;
      setActiveIndex((prev) => (prev + 1) % featuredBrands.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [featuredBrands.length]);

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-center overflow-visible lg:overflow-hidden border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-transparent"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        eager
        playbackRate={0.25}
        videoOpacityClassName="opacity-88 dark:opacity-78"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-12 sm:pt-14 sm:pb-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Asymmetric Display Typography Left */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div data-motion="reveal" className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-[#2D1D48]/10 dark:border-white/10 backdrop-blur-md">
                <CityMallLogo size="xs" showText={false} />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
                  {MALL_IDENTITY.city}, {MALL_IDENTITY.state} · {MALL_IDENTITY.country}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08] sm:leading-[1.03] text-[#1B1325] dark:text-[#F6EFE7]">
                CITY MALL
                <span className="block font-normal italic text-2xl sm:text-3xl lg:text-5xl mt-1 sm:mt-1.5 text-[#C9523C] dark:text-[#F48C74]">
                  Gorakhpur&apos;s Living Promenade
                </span>
              </h1>
            </div>

            <p
              data-motion="reveal"
              className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl text-[#433754] dark:text-[#D8CEE9]"
            >
              Premier fashion, fine jewellery, INOX multiplex &amp; dining promenade.
            </p>

            <div data-motion="reveal" className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                to="/brands"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs tracking-[0.12em] uppercase font-semibold bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <span>Explore Brand Showcase</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/discover"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs tracking-[0.12em] uppercase font-semibold border border-[#2D1D48]/30 dark:border-[#E2D4FF]/30 bg-[#FFFBF6]/80 dark:bg-[#1D1630]/80 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#683BA4] dark:hover:border-[#BFA1FF] transition-colors whitespace-nowrap"
              >
                <PlayCircle className="w-4 h-4 text-[#0E7C71] dark:text-[#5EEAD4]" />
                <span>Interactive Discovery</span>
              </Link>
            </div>
          </div>

          {/* Featured Brand Architectural Showcase Right */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end pt-4 lg:pt-0">
            {/* Main Luxury Vitrine Card */}
            <div
              data-motion="reveal"
              className="relative z-10 w-full max-w-sm sm:max-w-md rounded-3xl border border-white/80 dark:border-white/12 bg-white/95 dark:bg-[#1C152B]/95 shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38]">
                <ResilientImage
                  key={activeBrand?.id}
                  src={activeBrand?.image || ARCHITECTURAL_GALLERY[0]}
                  alt={activeBrand?.name || 'CITY MALL Gorakhpur'}
                  priority
                  width={560}
                  height={385}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

                {/* Floating Top-Left Glass Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/20">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeBrand?.accentColor || '#C9523C' }}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">
                    Premier Collection
                  </span>
                </div>
              </div>

              {/* Card Information Body */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4]">
                      {activeBrand?.categoryName}
                    </p>
                    <button
                      type="button"
                      onClick={() => activeBrand && onInspectBrand(activeBrand)}
                      className="font-display text-2xl font-bold text-left text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors cursor-pointer truncate block mt-0.5"
                    >
                      {activeBrand?.name}
                    </button>
                    <p className="text-xs text-[#5D5070] dark:text-[#B5A7D0] truncate mt-0.5">
                      {activeBrand?.tagline}
                    </p>
                  </div>

                  {activeBrand && (
                    <div className="shrink-0 w-[110px] h-[56px] flex items-center justify-center bg-[#2D1D48]/5 dark:bg-white/5 p-2 rounded-xl border border-[#2D1D48]/10 dark:border-white/10 shadow-xs">
                      <BrandLogo
                        brandId={activeBrand.id}
                        variant="showcase"
                      />
                    </div>
                  )}
                </div>

                {/* Interactive switcher dots & inspect link */}
                <div className="pt-3 flex items-center justify-between border-t border-[#2D1D48]/10 dark:border-white/10">
                  <div className="flex items-center gap-0.5">
                    {featuredBrands.map((b, idx) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Preview ${b.name}`}
                        className="relative p-2 flex items-center justify-center cursor-pointer min-h-[36px]"
                      >
                        <span
                          className={`h-1.5 rounded-full transition-all duration-300 block ${
                            idx === activeIndex
                              ? 'w-7 bg-[#C9523C] dark:bg-[#F48C74]'
                              : 'w-2 bg-[#2D1D48]/20 dark:bg-white/25 hover:bg-[#683BA4]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => activeBrand && onInspectBrand(activeBrand)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#683BA4] dark:text-[#BFA1FF] hover:underline cursor-pointer"
                  >
                    <span>Inspect House</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Overlapping Secondary Boutique Stadium Thumbnail */}
              {featuredBrands[(activeIndex + 1) % featuredBrands.length] && (
                <div
                  onClick={() => setActiveIndex((activeIndex + 1) % featuredBrands.length)}
                  title="Next Boutique"
                  className="absolute -bottom-2 right-2 sm:-bottom-5 sm:-right-5 z-20 w-28 sm:w-36 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/90 dark:border-[#1C152B] shadow-2xl bg-black cursor-pointer group hover:scale-105 transition-all"
                >
                  <ResilientImage
                    src={featuredBrands[(activeIndex + 1) % featuredBrands.length].image}
                    alt="Next boutique preview"
                    width={180}
                    height={135}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-end p-1.5">
                    <span className="text-[9px] font-mono text-white/95 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs truncate">
                      {featuredBrands[(activeIndex + 1) % featuredBrands.length].name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
