import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import {
  ArrowRight,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, BRAND_CATEGORIES } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

// Coordinated Colour Personalities for Categories
const CATEGORY_PALETTES = {
  fashion: {
    badge: 'bg-[#86198F]/15 text-[#86198F] dark:text-[#F472B6] border-[#86198F]/25',
    accent: '#DB2777',
    glow: 'rgba(219, 39, 119, 0.25)',
  },
  footwear: {
    badge: 'bg-[#0E7C71]/15 text-[#0E7C71] dark:text-[#5EEAD4] border-[#0E7C71]/25',
    accent: '#0E7C71',
    glow: 'rgba(14, 124, 113, 0.25)',
  },
  jewellery: {
    badge: 'bg-[#B36624]/15 text-[#B36624] dark:text-[#FDE68A] border-[#B36624]/25',
    accent: '#B36624',
    glow: 'rgba(179, 102, 36, 0.25)',
  },
  beauty: {
    badge: 'bg-[#C9523C]/15 text-[#C9523C] dark:text-[#FFA07A] border-[#C9523C]/25',
    accent: '#C9523C',
    glow: 'rgba(201, 82, 60, 0.25)',
  },
  supermarket: {
    badge: 'bg-[#0284C7]/15 text-[#0284C7] dark:text-[#38BDF8] border-[#0284C7]/25',
    accent: '#0284C7',
    glow: 'rgba(2, 132, 199, 0.25)',
  },
  cinema: {
    badge: 'bg-[#7C3AED]/15 text-[#7C3AED] dark:text-[#C084FC] border-[#7C3AED]/25',
    accent: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.25)',
  },
};

export function HomeAllBrandsShowcaseSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBrandId, setActiveBrandId] = useState('louis-philippe');
  const [query, setQuery] = useState('');

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  // Filter out dining/fast-food reference brands - Showcase ONLY premier fashion, footwear, jewellery & anchor houses
  const retailBrands = useMemo(() => {
    return APPROVED_BRANDS.filter((b) => b.categoryId !== 'dining');
  }, []);

  const retailCategories = useMemo(() => {
    return BRAND_CATEGORIES.filter((c) => c.id !== 'dining');
  }, []);

  const visibleBrands = useMemo(() => {
    const q = query.trim().toLowerCase();
    return retailBrands.filter((b) => {
      const matchesCat = activeCategory === 'all' || b.categoryId === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q)
      );
    });
  }, [retailBrands, activeCategory, query]);

  // Active brand synchronization
  const activeBrand = useMemo(() => {
    const found = visibleBrands.find((b) => b.id === activeBrandId);
    return found || visibleBrands[0] || retailBrands[0];
  }, [visibleBrands, activeBrandId, retailBrands]);

  const activePalette = CATEGORY_PALETTES[activeBrand?.categoryId] || {
    badge: 'bg-[#683BA4]/15 text-[#683BA4] dark:text-[#BFA1FF] border-[#683BA4]/25',
    accent: '#683BA4',
    glow: 'rgba(104, 59, 164, 0.25)',
  };

  const currentIdx = visibleBrands.findIndex((b) => b.id === activeBrand?.id);

  const handlePrev = () => {
    const newIdx = (currentIdx - 1 + visibleBrands.length) % visibleBrands.length;
    setActiveBrandId(visibleBrands[newIdx].id);
    scrollToCard(newIdx);
  };

  const handleNext = () => {
    const newIdx = (currentIdx + 1) % visibleBrands.length;
    setActiveBrandId(visibleBrands[newIdx].id);
    scrollToCard(newIdx);
  };

  const scrollToCard = (idx) => {
    if (trackRef.current) {
      const cards = trackRef.current.children;
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home-directory"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-center overflow-visible lg:overflow-hidden py-10 sm:py-16 lg:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-transparent transition-colors duration-300"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        playbackRate={0.25}
        videoOpacityClassName="opacity-88 dark:opacity-78"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 w-full">
        {/* Editorial Section Header */}
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D1D48]/12 dark:border-[#E2D4FF]/14 pb-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full bg-gradient-to-r from-[#86198F]/12 to-[#BE185D]/12 dark:from-[#F472B6]/20 dark:to-[#C084FC]/20 text-[#86198F] dark:text-[#F472B6] border border-[#86198F]/20 dark:border-[#F472B6]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Flagship Collection · {retailBrands.length} Outlets</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B1325] dark:text-[#F6EFE7]">
              Every Brand Inside{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                CITY MALL
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#433754] dark:text-[#D8CEE9]">
              Sequential haute couture showcases, fine jewellery salons, athletic footwear flagships, Spencer&apos;s hypermarket, and INOX Cinemas.
            </p>
          </div>

          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase pb-1.5 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0"
          >
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
                Curated Flagship Houses · {retailBrands.length} Outlets
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full bg-gradient-to-r from-[#86198F]/12 to-[#BE185D]/12 dark:from-[#F472B6]/20 dark:to-[#C084FC]/20 text-[#86198F] dark:text-[#F472B6] border border-[#86198F]/20 dark:border-[#F472B6]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Haute Flagship Collection · {retailBrands.length} Outlets</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B1325] dark:text-[#F6EFE7]">
                    Every Brand Inside CITY MALL
                  </h2>
                  <p className="text-xs sm:text-sm text-[#433754] dark:text-[#D8CEE9]">
                    Explore premier apparel, global athletic footwear, fine jewellery, Looks Salon, Spencer&apos;s hypermarket, and INOX Cinemas.
                    Sequential haute couture showcases, fine jewellery salons, athletic footwear flagships, Spencer&apos;s hypermarket, and INOX Cinemas.
                  </p>
                </div>

                <Link
                  to="/brands"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase pb-1 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase pb-1.5 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0"
                >
                  <span>Open Dedicated Brands Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Search & Compact Filter Chips */}
            {/* Filter Navigation & Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Quick Search */}
              <div className="relative w-full lg:max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#5D5070] dark:text-[#B5A7D0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Search className="w-3.5 h-3.5 text-[#683BA4] dark:text-[#BFA1FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search boutique or store..."
                  placeholder="Search flagship house..."
                  aria-label="Filter home brand showcase"
                  className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm border border-[#2D1D48]/22 dark:border-[#E2D4FF]/22 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:border-[#683BA4]"
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-full border border-[#2D1D48]/18 dark:border-[#E2D4FF]/22 bg-white/90 dark:bg-[#1A1228]/90 text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:ring-2 focus:ring-[#86198F] shadow-xs"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear filter"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#5D5070] hover:text-[#1B1325] cursor-pointer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5D5070] hover:text-[#1B1325] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${activeCategory === 'all'
                      ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                      : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#C9523C]'
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeCategory === 'all'
                      ? 'bg-gradient-to-r from-[#701A75] to-[#9D174D] dark:from-[#A855F7] dark:to-[#EC4899] text-white shadow-md shadow-pink-500/20'
                      : 'bg-white/80 dark:bg-[#191326]/80 text-[#1B1325] dark:text-[#F6EFE7] border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 hover:border-[#86198F]'
                      }`}
                  >
                    All ({retailBrands.length})
                  </button>
                  {retailCategories.map((cat) => {
                    const count = retailBrands.filter(
                      (b) => b.categoryId === cat.id
                    ).length;
                    const count = retailBrands.filter((b) => b.categoryId === cat.id).length;
                    if (count === 0) return null;
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${isSelected
                          ? 'bg-[#683BA4] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                          : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#683BA4]'
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${isSelected
                          ? 'bg-gradient-to-r from-[#701A75] to-[#9D174D] dark:from-[#A855F7] dark:to-[#EC4899] text-white shadow-md shadow-pink-500/20'
                          : 'bg-white/80 dark:bg-[#191326]/80 text-[#1B1325] dark:text-[#F6EFE7] border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 hover:border-[#86198F]'
                          }`}
                      >
                        {cat.shortLabel} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sleek, Compact Luxury Brand Grid (No Bloat, No Clunky Text) */}
              {visibleBrands.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
                  {visibleBrands.map((brand) => (
                    <article
                      key={brand.id}
                      onClick={() => onInspectBrand(brand)}
                      className="group relative border border-[#2D1D48]/12 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/95 dark:bg-[#191326]/95 p-3.5 sm:p-4 rounded-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#683BA4]/40 dark:hover:border-[#BFA1FF]/40 cursor-pointer"
                    >
                      {/* =========================================================================
            1. ONE-BY-ONE MASTER SPOTLIGHT (CREATIVE ASYMMETRICAL EDITORIAL STAGE)
            Zero humans, large visual cards, rounded organic corners, layered frames
           ========================================================================= */}
                      {activeBrand && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                          {/* Monumental Cinematic Facade Showcase (7 cols) */}
                          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[21/10] rounded-3xl overflow-hidden shadow-2xl border border-white/80 dark:border-white/15 bg-[#1F1230] group">
                            <ResilientImage
                              src={activeBrand.image}
                              alt={activeBrand.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#150B20]/95 via-[#150B20]/40 to-black/20 pointer-events-none" />

                            {/* Floating Top Controls & Category Badge */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                              <span className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur-md border shadow-md ${activePalette.badge}`}>
                                {activeBrand.categoryName}
                              </span>

                              {/* Left/Right Sequential Navigation Arrows */}
                              <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrev();
                                  }}
                                  title="Previous Flagship"
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-[11px] font-mono text-white/80 px-1.5">
                                  {currentIdx + 1} / {visibleBrands.length}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                  }}
                                  title="Next Flagship"
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Bottom Visual Tag & Insignia */}
                            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between gap-4 z-20">
                              <div className="space-y-1 max-w-lg">
                                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#FDA4AF]">
                                  <Sparkles className="w-3.5 h-3.5 text-[#F472B6]" />
                                  <span>Featured Flagship Boutique</span>
                                </div>
                                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                                  {activeBrand.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-white/90 line-clamp-1">
                                  {activeBrand.tagline}
                                </p>
                              </div>

                              <BrandInsignia
                                monogram={activeBrand.monogram}
                                accentColor={activeBrand.accentColor}
                                size="md"
                              />
                            </div>
                          </div>

                          {/* Overlapping Interactive Atelier Card (5 cols) */}
                          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-7 border border-white/80 dark:border-white/15 bg-white/90 dark:bg-[#1C112C]/90 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-[#683BA4]/12 dark:border-[#BFA1FF]/15 pb-3">
                                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#86198F] dark:text-[#F472B6]">
                                  Boutique Architecture
                                </span>
                                <span className="text-xs font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                                  CITY MALL Promenade
                                </span>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4] truncate">
                                    {brand.categoryName}
                                    <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1B1325] dark:text-[#F6EFE7]">
                                      {activeBrand.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
                                      {activeBrand.tagline}. Discover luxury ready-to-wear collections, bespoke tailoring, and seasonal flagships curated exclusively for Gorakhpur.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                  <div className="p-3 rounded-2xl bg-[#FBF4EB] dark:bg-[#251838] border border-[#683BA4]/10 dark:border-white/10 space-y-1">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5D5070] dark:text-[#B5A7D0] block">
                                      Operating Hours
                                    </span>
                                    <BrandInsignia
                                      monogram={brand.monogram}
                                      accentColor={brand.accentColor}
                                      size="sm"
                                    />
                                    <span className="text-xs font-bold text-[#1B1325] dark:text-[#F6EFE7] flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-[#EC4899]" /> 10 AM – 10 PM
                                    </span>
                                  </div>
                                  <div className="p-3 rounded-2xl bg-[#FBF4EB] dark:bg-[#251838] border border-[#683BA4]/10 dark:border-white/10 space-y-1">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5D5070] dark:text-[#B5A7D0] block">
                                      Mall Access
                                    </span>
                                    <span className="text-xs font-bold text-[#1B1325] dark:text-[#F6EFE7] flex items-center gap-1 truncate">
                                      <MapPin className="w-3 h-3 text-[#0E7C71]" /> Escalator Lobby
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-display text-base sm:text-lg font-semibold text-[#1B1325] dark:text-[#F6EFE7] group-hover:text-[#683BA4] dark:group-hover:text-[#BFA1FF] transition-colors truncate">
                                  <div className="pt-2 flex items-center justify-between border-t border-[#683BA4]/10 dark:border-white/10">
                                    <button
                                      type="button"
                                      onClick={() => onInspectBrand?.(activeBrand)}
                                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] bg-gradient-to-r from-[#701A75] to-[#9D174D] dark:from-[#A855F7] dark:to-[#EC4899] text-white hover:opacity-95 shadow-md shadow-pink-500/20 cursor-pointer"
                                    >
                                      <span>Inspect Outlet Details</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>

                                    <Link
                                      to="/brands"
                                      className="text-xs font-bold text-[#86198F] dark:text-[#F472B6] hover:underline"
                                    >
                                      View Directory →
                                    </Link>
                                  </div>
                              </div>
                            </div>
        )}

                            {/* =========================================================================
            2. SEQUENTIAL OVERLAPPING BOUTIQUE RUNWAY (NO REPETITIVE GRID)
            Large, visually attractive cards presented sequentially in a swipeable rail
           ========================================================================= */}
                            <div className="space-y-3 pt-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold uppercase tracking-[0.16em] text-[#86198F] dark:text-[#F472B6] text-[11px] flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                                  Sequential Lookbook Gallery · {visibleBrands.length} Houses
                                </span>
                                <span className="text-[11px] font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                                  Scroll horizontally or tap to select
                                </span>
                              </div>

                              <div
                                ref={trackRef}
                                className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory px-0.5"
                              >
                                {visibleBrands.map((brand, idx) => {
                                  const isSelected = activeBrandId === brand.id;
                                  const palette = CATEGORY_PALETTES[brand.categoryId] || {
                                    badge: '',
                                    accent: '#DB2777',
                                    glow: 'rgba(219, 39, 119, 0.25)',
                                  };

                                  return (
                <div
                  key={brand.id}
                  onClick={() => {
                    setActiveBrandId(brand.id);
                    onInspectBrand?.(brand);
                  }}
                  className={`group relative shrink-0 w-[175px] sm:w-[220px] aspect-[4/5.4] rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer snap-start flex flex-col justify-between p-4 select-none ${
                    isSelected
                      ? 'ring-2 ring-[#EC4899] ring-offset-2 ring-offset-[#FBF4EB] dark:ring-offset-[#151021] border-[#EC4899] shadow-xl shadow-pink-500/25 -translate-y-1 scale-[1.02]'
                      : 'border-white/60 dark:border-white/12 bg-[#251538] shadow-md hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {/* High-Resolution Storefront Image (Occupies most of card) */}
                  <ResilientImage
                    src={brand.image}
                    alt={brand.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150B20]/95 via-[#150B20]/45 to-black/20 pointer-events-none group-hover:from-[#150B20]/80 transition-colors" />

                  {/* Top: Insignia Badge + Category Tag */}
                  <div className="relative z-10 flex items-start justify-between gap-1.5">
                    <div className="w-8 h-8 rounded-xl bg-white/95 dark:bg-[#1A0E2A]/95 backdrop-blur-md shadow-md flex items-center justify-center font-bold text-[11px] text-[#1B1325] dark:text-[#F6EFE7] border border-white/40">
                      <span
                        className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: brand.accentColor || palette.accent }}
                      />
                      <span>{brand.monogram}</span>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-white/20">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom: Minimal & Elegant Brand Typography */}
                  <div className="relative z-10 space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDA4AF] block truncate">
                      {brand.categoryName.split('&')[0].trim()}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-tight line-clamp-1 group-hover:text-[#FDA4AF] transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#5D5070] dark:text-[#B5A7D0] line-clamp-1 mt-0.5">
                    <p className="text-[10px] text-white/75 truncate">
                      {brand.tagline}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[9px] text-[#E9D5FF] border-t border-white/15">
                      <span>Explore</span>
                      <span className="text-[#FDA4AF] font-bold group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-[#2D1D48]/8 dark:border-[#E2D4FF]/10 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C9523C] dark:text-[#F48C74] group-hover:underline">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            ))}
                              );
            })}
                            </div>
                            ) : (
                            <div className="py-8 text-center border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/88 dark:bg-[#191326]/88">
                              <p className="text-xs text-[#433754] dark:text-[#D8CEE9]">
                                No matching boutique found.
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveCategory('all');
                                  setQuery('');
                                }}
                                className="mt-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] cursor-pointer"
                              >
                                Reset Filter
                              </button>
                            </div>
        )}
                          </div>
                        </div>
    </section>
                  );
}
