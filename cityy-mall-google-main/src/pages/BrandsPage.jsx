import { useMemo, useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  MapPin,
  Film,
  Compass,
  Building2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
} from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import {
  APPROVED_BRANDS,
  SAMPLE_CINEMA_FEATURES,
  MALL_IDENTITY,
} from '../utilities/brandsData';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

// Mall floor directory mapping for CITY MALL Gorakhpur premier outlets
const BRAND_FLOOR_MAP = {
  'louis-philippe': 'Ground Floor · Suite G-04',
  'levis-store': 'Ground Floor · Suite G-11',
  'w-for-woman': 'First Floor · Suite 1-08',
  'allen-solly': 'First Floor · Suite 1-14',
  'adidas': 'Second Floor · Suite 2-02',
  'puma': 'Second Floor · Suite 2-05',
  'woodland-store': 'Second Floor · Suite 2-12',
  'skechers': 'Second Floor · Suite 2-18',
  'tanishq': 'Ground Floor · Suite G-01',
  'titan-world': 'Ground Floor · Suite G-02',
  'looks-salon': 'Third Floor · Suite 3-06',
  'spencers': 'Lower Ground · Central Atrium',
  'inox-cinemas': 'Fourth Floor · Multiplex Level',
};

// Official 6 categories strictly for the 13 premier retail & entertainment houses
const BRANDS_CATEGORIES = [
  { id: 'all', title: 'All Brands', shortLabel: 'All Brands' },
  { id: 'fashion', title: 'Fashion & Apparel', shortLabel: 'Fashion & Apparel' },
  { id: 'footwear', title: 'Footwear & Sportswear', shortLabel: 'Footwear & Sportswear' },
  { id: 'jewellery', title: 'Jewellery & Watches', shortLabel: 'Jewellery & Watches' },
  { id: 'beauty', title: 'Beauty & Lifestyle', shortLabel: 'Beauty & Lifestyle' },
  { id: 'supermarket', title: 'Supermarket & Retail', shortLabel: 'Supermarket & Retail' },
  { id: 'cinema', title: 'Cinema & Multiplex', shortLabel: 'Cinema & Multiplex' },
];

export function BrandsPage({ onInspectBrand }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeBrandId, setActiveBrandId] = useState('louis-philippe');
  const [viewMode, setViewMode] = useState('rail'); // 'rail' (Boutique Story Slider) | 'grid' (Gallery Grid)

  // Filter out any dining/filler brands, keeping strictly the 13 premier retail houses
  const premier13Brands = useMemo(() => {
    return APPROVED_BRANDS.filter((b) => b.categoryId !== 'dining');
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredBrands = useMemo(() => {
    return premier13Brands.filter((b) => {
      const matchesCat =
        selectedCategory === 'all' || b.categoryId === selectedCategory;
      if (!matchesCat) return false;
      if (!normalizedQuery) return true;
      return (
        b.name.toLowerCase().includes(normalizedQuery) ||
        b.categoryName.toLowerCase().includes(normalizedQuery) ||
        b.tagline.toLowerCase().includes(normalizedQuery) ||
        (BRAND_FLOOR_MAP[b.id] || '').toLowerCase().includes(normalizedQuery)
      );
    });
  }, [premier13Brands, normalizedQuery, selectedCategory]);

  // Keep activeBrand synchronized
  const activeBrand = useMemo(() => {
    const found = filteredBrands.find((b) => b.id === activeBrandId);
    return found || filteredBrands[0] || premier13Brands[0];
  }, [filteredBrands, activeBrandId, premier13Brands]);

  // Interactive Carousel Next / Prev navigation
  const currentBrandIndex = premier13Brands.findIndex((b) => b.id === activeBrand.id);
  const handlePrevBrand = () => {
    const newIdx = (currentBrandIndex - 1 + premier13Brands.length) % premier13Brands.length;
    setActiveBrandId(premier13Brands[newIdx].id);
  };
  const handleNextBrand = () => {
    const newIdx = (currentBrandIndex + 1) % premier13Brands.length;
    setActiveBrandId(premier13Brands[newIdx].id);
  };

  return (
    <div className="relative min-h-screen bg-[#FBF4EB] dark:bg-[#151021] text-[#1B1325] dark:text-[#F6EFE7]">
      {/* Abstract Animated Geometric Background */}
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        variant="brands"
        eager
        playbackRate={0.65}
        videoOpacityClassName="opacity-75 dark:opacity-65"
        tintClassName="bg-gradient-to-b from-[#FBF4EB]/90 via-[#EFE6FA]/55 to-[#FDE8DF]/88 dark:from-[#151021]/92 dark:via-[#1D1630]/65 dark:to-[#151021]/94"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:py-12 space-y-8">
        {/* Compact Editorial Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] bg-[#683BA4]/10 dark:bg-[#BFA1FF]/15 text-[#683BA4] dark:text-[#BFA1FF]">
              <Sparkles className="w-3 h-3" />
              <span>Official Brand Directory · {MALL_IDENTITY.name}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1325] dark:text-[#F6EFE7]">
              Approved Brand Showcase
            </h1>
            <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9]">
              13 premier global flagships, haute couture houses, fine jewellery salons, Spencer&apos;s hypermarket, and INOX Cinemas.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72 lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#683BA4] dark:text-[#BFA1FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 13 premier brands..."
              aria-label="Search brands directory"
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 bg-[#FFFBF6]/90 dark:bg-[#1A1328]/90 text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:border-[#683BA4] dark:focus:border-[#BFA1FF] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#5D5070] hover:text-[#1B1325] dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Compact Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BRANDS_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? premier13Brands.length
                : premier13Brands.filter((b) => b.categoryId === cat.id).length;
            const active = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstMatch =
                    cat.id === 'all'
                      ? premier13Brands[0]
                      : premier13Brands.find((b) => b.categoryId === cat.id);
                  if (firstMatch) setActiveBrandId(firstMatch.id);
                }}
                className={`group flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-[#1B1325] dark:border-[#F48C74] shadow-sm'
                    : 'bg-[#FFFBF6]/85 dark:bg-[#1A1328]/85 text-[#433754] dark:text-[#D8CEE9] border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 hover:border-[#683BA4] dark:hover:border-[#BFA1FF] hover:text-[#1B1325] dark:hover:text-[#F6EFE7]'
                }`}
              >
                <span>{cat.shortLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    active
                      ? 'bg-white/20 dark:bg-black/20 text-inherit'
                      : 'bg-[#2D1D48]/8 dark:bg-[#E2D4FF]/10 text-inherit'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section 2: PREMIER BRAND STRIP · 13 APPROVED HOUSES (With Boutique Slider & Gallery Grid Toggle) */}
        <div className="space-y-4 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9523C] dark:text-[#FFA07A]" />
              <span className="font-semibold uppercase tracking-[0.18em] text-[#683BA4] dark:text-[#BFA1FF] text-[11px] sm:text-xs">
                PREMIER BRAND SHOWCASE · 13 APPROVED HOUSES
              </span>
            </div>

            {/* Unique View Mode Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[#2D1D48]/8 dark:bg-white/10 border border-[#2D1D48]/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('rail')}
                title="Boutique Slider"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'rail'
                    ? 'bg-white dark:bg-[#251A38] text-[#1B1325] dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                    : 'text-[#5D5070] dark:text-[#B5A7D0] hover:text-[#1B1325] dark:hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3 text-[#C9523C] dark:text-[#FFA07A]" />
                <span>Slider</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Gallery Grid"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-[#251A38] text-[#1B1325] dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                    : 'text-[#5D5070] dark:text-[#B5A7D0] hover:text-[#1B1325] dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3 h-3 text-[#C9523C] dark:text-[#FFA07A]" />
                <span>Grid</span>
              </button>
            </div>
          </div>

          {/* View Mode A: Interactive Horizontal Boutique Rail (Smooth Swipeable Cards with Real Images) */}
          {viewMode === 'rail' ? (
            <div className="relative">
              <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory px-0.5">
                {premier13Brands.map((brand, idx) => {
                  const isSelected = activeBrandId === brand.id;
                  const matchesFilter =
                    selectedCategory === 'all' || brand.categoryId === selectedCategory;

                  return (
                    <div
                      key={brand.id}
                      onClick={() => {
                        setActiveBrandId(brand.id);
                        onInspectBrand?.(brand);
                      }}
                      className={`group relative shrink-0 w-[148px] sm:w-[185px] aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer snap-start flex flex-col justify-between p-3 select-none ${
                        isSelected
                          ? 'ring-2 ring-[#FFA07A] ring-offset-2 ring-offset-[#FBF4EB] dark:ring-offset-[#151021] border-[#FFA07A] shadow-xl -translate-y-1 scale-[1.02]'
                          : matchesFilter
                          ? 'border-white/50 dark:border-white/15 shadow-md hover:shadow-lg hover:-translate-y-0.5 opacity-100 bg-[#251833]'
                          : 'opacity-40 border-transparent bg-[#251833]'
                      }`}
                    >
                      {/* Storefront Background Image */}
                      <ResilientImage
                        src={brand.image}
                        alt={brand.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none" />

                      {/* Top: Insignia Badge + Floor Tag */}
                      <div className="relative z-10 flex items-start justify-between gap-1">
                        <div className="w-7 h-7 rounded-lg bg-white/95 dark:bg-[#151021]/95 backdrop-blur-md shadow-md flex items-center justify-center font-bold text-[10px] text-[#1B1325] dark:text-[#F6EFE7] border border-white/40">
                          <span
                            className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: brand.accentColor || '#683BA4' }}
                          />
                          <span>{brand.monogram}</span>
                        </div>
                        <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm border border-white/20">
                          {BRAND_FLOOR_MAP[brand.id]?.split('·')[0]?.trim()}
                        </span>
                      </div>

                      {/* Bottom: Brand Name + Category */}
                      <div className="relative z-10 space-y-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFA07A] block">
                          0{idx + 1} · {brand.categoryName.split('&')[0].trim()}
                        </span>
                        <h3 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight leading-tight line-clamp-1 group-hover:text-[#FFA07A] transition-colors">
                          {brand.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* View Mode B: Visual Gallery Grid (High-Fashion Tiles) */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
              {premier13Brands.map((brand, idx) => {
                const isSelected = activeBrandId === brand.id;
                const matchesFilter =
                  selectedCategory === 'all' || brand.categoryId === selectedCategory;

                return (
                  <div
                    key={brand.id}
                    onClick={() => {
                      setActiveBrandId(brand.id);
                      onInspectBrand?.(brand);
                    }}
                    className={`group relative aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between p-3 select-none ${
                      isSelected
                        ? 'ring-2 ring-[#FFA07A] ring-offset-2 ring-offset-[#FBF4EB] dark:ring-offset-[#151021] border-[#FFA07A] shadow-xl -translate-y-1 scale-[1.02]'
                        : matchesFilter
                        ? 'border-white/50 dark:border-white/15 shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-[#251833]'
                        : 'opacity-40 border-transparent bg-[#251833]'
                    }`}
                  >
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none" />

                    {/* Top: Insignia Badge + Floor Tag */}
                    <div className="relative z-10 flex items-start justify-between gap-1">
                      <div className="w-7 h-7 rounded-lg bg-white/95 dark:bg-[#151021]/95 backdrop-blur-md shadow-md flex items-center justify-center font-bold text-[10px] text-[#1B1325] dark:text-[#F6EFE7] border border-white/40">
                        <span
                          className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: brand.accentColor || '#683BA4' }}
                        />
                        <span>{brand.monogram}</span>
                      </div>
                      <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm border border-white/20">
                        {BRAND_FLOOR_MAP[brand.id]?.split('·')[0]?.trim()}
                      </span>
                    </div>

                    {/* Bottom: Brand Name + Category */}
                    <div className="relative z-10 space-y-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFA07A] block">
                        0{idx + 1} · {brand.categoryName.split('&')[0].trim()}
                      </span>
                      <h3 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight leading-tight line-clamp-1 group-hover:text-[#FFA07A] transition-colors">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 3: Editorial Asymmetric Brand Pavilion (With Interactive Left/Right Cycle Arrows) */}
        {activeBrand ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
            {/* Left: Dynamic Visual Vitrine of the Active / Hovered Brand (7 cols) */}
            <div className="lg:col-span-7 relative rounded-2xl sm:rounded-3xl border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/95 dark:bg-[#1A1328]/95 overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative aspect-[16/10] sm:aspect-[21/10] overflow-hidden bg-[#231B38]">
                <ResilientImage
                  src={activeBrand.image}
                  alt={activeBrand.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/90 via-[#151021]/35 to-black/20 pointer-events-none" />

                {/* Top badges + Next / Previous Navigation Controls */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 z-20">
                  <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-[#151021]/80 text-[#F6EFE7] backdrop-blur-md border border-white/15 rounded-lg">
                    {activeBrand.categoryName}
                  </span>

                  {/* Left / Right Fast Cycle Buttons */}
                  <div className="flex items-center gap-1 bg-black/65 backdrop-blur-md p-1 rounded-full border border-white/20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevBrand();
                      }}
                      title="Previous Boutique"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-mono text-white/70 px-1">
                      {currentBrandIndex + 1}/{premier13Brands.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextBrand();
                      }}
                      title="Next Boutique"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between gap-4 z-20">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFA07A] block">
                      {BRAND_FLOOR_MAP[activeBrand.id] || 'Ground Floor'}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                      {activeBrand.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/85 line-clamp-1 max-w-md">
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

              {/* Action Bar */}
              <div className="p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 bg-[#FFFBF6] dark:bg-[#1D1630]">
                <div className="flex items-center gap-2 text-xs text-[#5D5070] dark:text-[#B5A7D0]">
                  <MapPin className="w-3.5 h-3.5 text-[#C9523C] dark:text-[#F48C74]" />
                  <span>{BRAND_FLOOR_MAP[activeBrand.id]}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectBrand?.(activeBrand)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 rounded-full transition-opacity cursor-pointer shadow-md"
                >
                  <span>Inspect Outlet Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: High-Density Editorial Typographic Roster (5 cols) */}
            <div className="lg:col-span-5 border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/85 dark:bg-[#1A1328]/85 p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 pb-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#683BA4] dark:text-[#BFA1FF]">
                    House Directory
                  </span>
                  <span className="text-[11px] font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                    {filteredBrands.length} Outlets
                  </span>
                </div>

                <div className="divide-y divide-[#2D1D48]/8 dark:divide-[#E2D4FF]/8 max-h-[310px] overflow-y-auto pr-1">
                  {filteredBrands.map((brand) => {
                    const isSelected = activeBrand.id === brand.id;
                    return (
                      <div
                        key={brand.id}
                        onMouseEnter={() => setActiveBrandId(brand.id)}
                        onClick={() => {
                          setActiveBrandId(brand.id);
                          onInspectBrand?.(brand);
                        }}
                        className={`group flex items-center justify-between gap-3 py-2.5 px-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#683BA4]/8 dark:bg-[#BFA1FF]/12'
                            : 'hover:bg-[#2D1D48]/4 dark:hover:bg-[#E2D4FF]/6'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: brand.accentColor || '#683BA4',
                            }}
                          />
                          <div className="min-w-0">
                            <h4
                              className={`text-xs sm:text-sm font-semibold truncate ${
                                isSelected
                                  ? 'text-[#683BA4] dark:text-[#BFA1FF]'
                                  : 'text-[#1B1325] dark:text-[#F6EFE7] group-hover:text-[#C9523C] dark:group-hover:text-[#F48C74]'
                              }`}
                            >
                              {brand.name}
                            </h4>
                            <p className="text-[10px] text-[#5D5070] dark:text-[#B5A7D0] truncate">
                              {brand.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                            {BRAND_FLOOR_MAP[brand.id]?.split('·')[0]?.trim()}
                          </span>
                          <ArrowRight
                            className={`w-3 h-3 transition-transform ${
                              isSelected
                                ? 'text-[#683BA4] dark:text-[#BFA1FF] translate-x-0.5'
                                : 'text-[#5D5070] opacity-40 group-hover:opacity-100'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category-Specific Quick Feature Highlight */}
              <div className="mt-4 pt-3 border-t border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 text-xs text-[#5D5070] dark:text-[#B5A7D0] flex items-center justify-between">
                <span>Direct Access via Main Central Escalator</span>
                <span className="font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                  10:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 p-8 space-y-4">
            <h3 className="font-display text-xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              No Outlets Match &quot;{query}&quot;
            </h3>
            <p className="text-sm text-[#5D5070] dark:text-[#B5A7D0]">
              Clear your search query or reset category selection to view all 13 premier houses.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Section 4: Category-Specific Creative Highlights (Rendered ONLY when relevant) */}
        {selectedCategory === 'cinema' && (
          <div className="border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#151021] text-white p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#C9523C] dark:text-[#F48C74]" />
                <h3 className="font-display text-lg font-semibold text-white">
                  INOX Cinemas Multiplex Features
                </h3>
              </div>
              <span className="text-[11px] font-mono text-white/60">
                Fourth Floor Multiplex
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SAMPLE_CINEMA_FEATURES.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border border-white/10 bg-white/5 space-y-2"
                >
                  <p className="text-xs font-semibold text-[#F48C74]">
                    {item.genre}
                  </p>
                  <h4 className="font-display text-base font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/70 line-clamp-2">
                    {item.format}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
