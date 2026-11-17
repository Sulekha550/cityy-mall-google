import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, BRAND_CATEGORIES } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

export function HomeAllBrandsShowcaseSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  const visibleBrands = useMemo(() => {
    const q = query.trim().toLowerCase();
    return APPROVED_BRANDS.filter((b) => {
      const matchesCat = activeCategory === 'all' || b.categoryId === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, query]);

  return (
    <section
      ref={sectionRef}
      id="home-brands-showcase"
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB] dark:bg-[#151021]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        videoOpacityClassName="opacity-82 dark:opacity-74"
        tintClassName="bg-gradient-to-br from-[#FBF4EB]/78 via-[#EFE6FA]/34 to-[#E4F5F0]/72 dark:from-[#151021]/82 dark:via-[#1D1630]/40 dark:to-[#112226]/78"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 pb-8"
        >
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              Complete Brand Showcase · 27 Houses
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Every Brand Inside CITY MALL
            </h2>
            <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9]">
              Filter across apparel, footwear, jewellery, salons, Spencer&apos;s hypermarket, INOX Cinemas, and all nine dining destinations right from the promenade.
            </p>
          </div>

          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase pb-1.5 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0"
          >
            <span>Open Dedicated Brands Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Search & Interactive Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:max-w-xs">
            <Search className="w-4 h-4 text-[#5D5070] dark:text-[#B5A7D0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter stores on home..."
              aria-label="Filter home brand showcase"
              className="w-full pl-10 pr-9 py-2 text-sm border border-[#2D1D48]/22 dark:border-[#E2D4FF]/22 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:border-[#683BA4]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear filter"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#5D5070] hover:text-[#1B1325] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                  : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#C9523C]'
              }`}
            >
              All ({APPROVED_BRANDS.length})
            </button>
            {BRAND_CATEGORIES.map((cat) => {
              const count = APPROVED_BRANDS.filter(
                (b) => b.categoryId === cat.id
              ).length;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#683BA4] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                      : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#683BA4]'
                  }`}
                >
                  {cat.shortLabel} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Staggered Multi-Row Architectural Brand Gallery (No Repetitive Equal Heights) */}
        {visibleBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {visibleBrands.map((brand, idx) => {
              const isTall = idx % 5 === 0 || idx % 7 === 0;
              return (
                <article
                  key={brand.id}
                  className={`group border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                    idx % 2 === 1 ? 'sm:mt-4' : ''
                  }`}
                >
                  <div
                    className={`w-full overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38] ${
                      isTall ? 'aspect-[4/3]' : 'aspect-[16/10]'
                    }`}
                  >
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4] truncate">
                          {brand.categoryName}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-[#1B1325] dark:text-[#F6EFE7] truncate mt-0.5">
                          {brand.name}
                        </h3>
                      </div>
                      <BrandInsignia
                        monogram={brand.monogram}
                        accentColor={brand.accentColor}
                        size="sm"
                      />
                    </div>
                    <p className="text-xs text-[#433754] dark:text-[#D8CEE9] line-clamp-2">
                      {brand.tagline}
                    </p>
                    <button
                      type="button"
                      onClick={() => onInspectBrand(brand)}
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C9523C] dark:text-[#F48C74] hover:underline cursor-pointer"
                    >
                      Inspect Outlet →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/88 dark:bg-[#191326]/88">
            <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
              No matching outlet found on Home Showcase.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setQuery('');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
