import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Shirt,
  Footprints,
  Gem,
  Scissors,
  ShoppingBag,
  Film,
} from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

// Category Configuration aligned with the 13 premier retail houses
const CATEGORIES_CONFIG = [
  {
    id: 'fashion',
    title: 'Clothing & Fashion',
    shortLabel: 'Clothing & Fashion',
    icon: Shirt,
    subtitle: 'Tailored menswear, premium denim & contemporary wardrobe essentials',
    tag: 'Luxury Menswear & Haute Couture',
    route: '/shopping/fashion',
  },
  {
    id: 'footwear',
    title: 'Footwear & Sportswear',
    shortLabel: 'Footwear',
    icon: Footprints,
    subtitle: 'Performance trainers, global athletic footwear & outdoor rugged boots',
    tag: 'Athletic Footwear & Outdoor Gear',
    route: '/shopping/footwear',
  },
  {
    id: 'jewellery',
    title: 'Jewellery & Watches',
    shortLabel: 'Jewellery & Watches',
    icon: Gem,
    subtitle: 'Fine gold, bridal diamond masterpieces & precision Swiss/Japanese watches',
    tag: 'Haute Horlogerie & Gold Craftsmanship',
    route: '/shopping/jewellery',
  },
  {
    id: 'beauty',
    title: 'Beauty & Lifestyle',
    shortLabel: 'Beauty & Lifestyle',
    icon: Scissors,
    subtitle: 'Luxury hair styling, bespoke salon grooming & personal wellness',
    tag: 'Luxury Grooming & Salon Care',
    route: '/shopping/beauty',
  },
  {
    id: 'supermarket',
    title: 'Supermarket & Retail',
    shortLabel: 'Supermarket',
    icon: ShoppingBag,
    subtitle: 'Fresh pantry selections, hypermarket aisles & household essentials',
    tag: 'Family Groceries & Hypermarket',
    route: '/shopping/supermarket',
  },
  {
    id: 'cinema',
    title: 'Entertainment & Cinema',
    shortLabel: 'Entertainment',
    icon: Film,
    subtitle: 'Laser projection, Dolby Atmos sound & luxury multiplex auditoriums',
    tag: 'Multiplex Cinema & Blockbusters',
    route: '/entertainment',
  },
];

export function HomeBrandSpotlightSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [activeCategoryId, setActiveCategoryId] = useState('fashion');
  const [activeBrandId, setActiveBrandId] = useState('louis-philippe');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  // Filter out any filler/dining brands, keeping only the 13 premier retail & cinema houses
  const premierBrands = useMemo(() => {
    return APPROVED_BRANDS.filter((b) => b.categoryId !== 'dining');
  }, []);

  // Brands belonging to the currently selected category
  const currentCategoryBrands = useMemo(() => {
    return premierBrands.filter((b) => b.categoryId === activeCategoryId);
  }, [premierBrands, activeCategoryId]);

  // Current active brand object
  const activeBrand = useMemo(() => {
    const found = currentCategoryBrands.find((b) => b.id === activeBrandId);
    return found || currentCategoryBrands[0] || premierBrands[0];
  }, [currentCategoryBrands, activeBrandId, premierBrands]);

  const activeCategoryData = useMemo(() => {
    return (
      CATEGORIES_CONFIG.find((c) => c.id === activeCategoryId) ||
      CATEGORIES_CONFIG[0]
    );
  }, [activeCategoryId]);

  const activeBrandIndexInCategory = currentCategoryBrands.findIndex(
    (b) => b.id === activeBrand.id
  );

  // Category switch handler
  const handleSelectCategory = (catId) => {
    setActiveCategoryId(catId);
    const catBrands = premierBrands.filter((b) => b.categoryId === catId);
    if (catBrands.length > 0) {
      setActiveBrandId(catBrands[0].id);
    }
  };

  // Next/Prev brand in current category (or wraps to next category)
  const handleNextBrand = () => {
    const nextIdx = (activeBrandIndexInCategory + 1) % currentCategoryBrands.length;
    setActiveBrandId(currentCategoryBrands[nextIdx].id);
  };

  const handlePrevBrand = () => {
    const prevIdx =
      (activeBrandIndexInCategory - 1 + currentCategoryBrands.length) %
      currentCategoryBrands.length;
    setActiveBrandId(currentCategoryBrands[prevIdx].id);
  };

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    const interval = setInterval(() => {
      setActiveBrandId((prevId) => {
        const idx = currentCategoryBrands.findIndex((b) => b.id === prevId);
        const nextIdx = (idx + 1) % currentCategoryBrands.length;
        return currentCategoryBrands[nextIdx]?.id || prevId;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentCategoryBrands]);

  return (
    <section
      ref={sectionRef}
      id="home-spotlight"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-14 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB] dark:bg-[#151021]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        variant="brands"
        playbackRate={0.65}
        videoOpacityClassName="opacity-75 dark:opacity-65"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/90 via-[#EFE6FA]/48 to-[#FDE8DF]/80 dark:from-[#151021]/92 dark:via-[#1D1630]/60 dark:to-[#151021]/92"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        {/* Top Header Bar: Title Badge on Left, Controls on Right */}
        <div
          data-motion="reveal"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          {/* Rounded White Badge */}
          <div className="inline-flex flex-col bg-white/92 dark:bg-[#1C152B]/92 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/70 dark:border-white/10 shadow-md">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              Signature Brands
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1B1325] dark:text-[#F6EFE7] tracking-tight">
              Flagship Retail Collection
            </h2>
          </div>

          {/* Top-Right Controls: [ ⏸ Auto ] [ < ] [ > ] */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/85 dark:bg-[#1C152B]/85 backdrop-blur-md border border-[#2D1D48]/12 dark:border-[#E2D4FF]/14 text-[#1B1325] dark:text-[#F6EFE7] hover:bg-white dark:hover:bg-[#251B38] shadow-sm transition-all cursor-pointer"
            >
              {isAutoPlaying ? (
                <Pause className="w-3 h-3 text-[#C9523C] dark:text-[#F48C74]" />
              ) : (
                <Play className="w-3 h-3 text-[#0E7C71] dark:text-[#5EEAD4]" />
              )}
              <span>Auto</span>
            </button>
            <button
              type="button"
              onClick={handlePrevBrand}
              aria-label="Previous brand"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/85 dark:bg-[#1C152B]/85 backdrop-blur-md border border-[#2D1D48]/12 dark:border-[#E2D4FF]/14 text-[#1B1325] dark:text-[#F6EFE7] hover:bg-white dark:hover:bg-[#251B38] shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextBrand}
              aria-label="Next brand"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/85 dark:bg-[#1C152B]/85 backdrop-blur-md border border-[#2D1D48]/12 dark:border-[#E2D4FF]/14 text-[#1B1325] dark:text-[#F6EFE7] hover:bg-white dark:hover:bg-[#251B38] shadow-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Split Grid: Left Showcase Frame, Right Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT: Featured Storefront Vitrine with Floating Badges (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 bg-[#1D1630]">
              <ResilientImage
                key={activeBrand.id}
                src={activeBrand.image}
                alt={activeBrand.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

              {/* Floating Top-Left Header Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-gradient-to-r from-[#FDE8DF]/95 via-[#FFFBF6]/95 to-[#EFE6FA]/95 dark:from-[#2A1828]/95 dark:via-[#1D1630]/95 dark:to-[#221735]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/50 dark:border-white/15">
                <div
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#151021] flex items-center justify-center shadow-xs border border-[#2D1D48]/10 dark:border-white/10 text-xs font-bold font-display"
                  style={{ color: activeBrand.accentColor || '#683BA4' }}
                >
                  {activeBrand.monogram}
                </div>
                <div>
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#C9523C] dark:text-[#F48C74]">
                    {activeCategoryData.title}
                  </span>
                  <span className="font-display text-sm font-bold text-[#1B1325] dark:text-[#F6EFE7]">
                    {activeBrand.name}
                  </span>
                </div>
              </div>

              {/* Floating Bottom-Right Card */}
              <div className="absolute bottom-4 right-4 z-20 max-w-[240px] sm:max-w-[280px] bg-white/92 dark:bg-[#1D1630]/92 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 dark:border-white/10 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9523C] dark:text-[#F48C74]">
                    {activeCategoryData.shortLabel} · Suite
                  </span>
                  <span className="text-[10px] font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                    {String(activeBrandIndexInCategory + 1).padStart(2, '0')}/
                    {String(currentCategoryBrands.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs text-[#433754] dark:text-[#D8CEE9] line-clamp-2 leading-snug">
                  {activeBrand.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Category & Brand Selector (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Top Sub-Card: Category Navigation Grid */}
            <div className="bg-white/85 dark:bg-[#1C152B]/85 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border border-white/60 dark:border-white/10 shadow-md">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES_CONFIG.map((cat) => {
                  const isActive = cat.id === activeCategoryId;
                  const count = premierBrands.filter(
                    (b) => b.categoryId === cat.id
                  ).length;
                  const Icon = cat.icon;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#C9523C] dark:bg-[#D64527] text-white shadow-sm ring-1 ring-[#C9523C]'
                          : 'bg-[#FFFBF6]/60 dark:bg-[#161022]/60 text-[#433754] dark:text-[#D8CEE9] hover:bg-white dark:hover:bg-[#231A33] border border-[#2D1D48]/8 dark:border-[#E2D4FF]/10'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cat.shortLabel}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#2D1D48]/8 dark:bg-white/10 text-inherit'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Sub-Card: Brand Pills & Description */}
            <div className="bg-white/85 dark:bg-[#1C152B]/85 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-md space-y-4">
              {/* Category Header inside the card */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9523C] dark:text-[#F48C74]">
                    <activeCategoryData.icon className="w-4 h-4" />
                    <span>{activeCategoryData.title}</span>
                  </div>
                  <span className="text-xs font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                    {currentCategoryBrands.length} Brands
                  </span>
                </div>
                <p className="text-xs text-[#5D5070] dark:text-[#B5A7D0]">
                  {activeCategoryData.subtitle}
                </p>
              </div>

              {/* Brand Logo Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {currentCategoryBrands.map((brand) => {
                  const isSelected = brand.id === activeBrand.id;
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => setActiveBrandId(brand.id)}
                      className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white dark:bg-[#241A38] border-[#C9523C] dark:border-[#F48C74] shadow-md ring-2 ring-[#C9523C]/20 -translate-y-0.5'
                          : 'bg-[#FFFBF6]/80 dark:bg-[#171124]/80 border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 hover:border-[#C9523C]/50 hover:bg-white dark:hover:bg-[#201730]'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-[11px] shadow-xs border border-[#2D1D48]/10 dark:border-white/10 bg-white dark:bg-[#151021]"
                        style={{ color: brand.accentColor || '#683BA4' }}
                      >
                        {brand.monogram}
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          isSelected
                            ? 'text-[#1B1325] dark:text-white'
                            : 'text-[#433754] dark:text-[#D8CEE9]'
                        }`}
                      >
                        {brand.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Footer bar */}
              <div className="flex items-center justify-between pt-3 border-t border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 text-xs">
                <span className="text-[#5D5070] dark:text-[#B5A7D0] truncate max-w-[220px] sm:max-w-[280px]">
                  {activeBrand.tagline}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onInspectBrand?.(activeBrand)}
                    className="inline-flex items-center gap-1 font-semibold text-[#C9523C] dark:text-[#F48C74] hover:underline cursor-pointer"
                  >
                    <span>Inspect Outlet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    to={activeCategoryData.route}
                    className="text-[#683BA4] dark:text-[#BFA1FF] hover:underline hidden sm:inline"
                  >
                    Explore Category →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
