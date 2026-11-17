import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, BRAND_CATEGORIES } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { BrandInsignia } from '../components/BrandInsignia';

export function HomeAllBrandsShowcaseSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
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

  return (
    <section
      ref={sectionRef}
      id="home-directory"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-14 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB] dark:bg-[#151021]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        variant="brands"
        videoOpacityClassName="opacity-82 dark:opacity-74"
        tintClassName="bg-gradient-to-br from-[#FBF4EB]/78 via-[#EFE6FA]/34 to-[#E4F5F0]/72 dark:from-[#151021]/82 dark:via-[#1D1630]/40 dark:to-[#112226]/78"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-7 w-full">
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 pb-5"
        >
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              Curated Flagship Houses · {retailBrands.length} Outlets
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Every Brand Inside CITY MALL
            </h2>
            <p className="text-xs sm:text-sm text-[#433754] dark:text-[#D8CEE9]">
              Explore premier apparel, global athletic footwear, fine jewellery, Looks Salon, Spencer&apos;s hypermarket, and INOX Cinemas.
            </p>
          </div>

          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase pb-1 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0"
          >
            <span>Open Dedicated Brands Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Search & Compact Filter Chips */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative w-full lg:max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#5D5070] dark:text-[#B5A7D0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search boutique or store..."
              aria-label="Filter home brand showcase"
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm border border-[#2D1D48]/22 dark:border-[#E2D4FF]/22 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:border-[#683BA4]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear filter"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#5D5070] hover:text-[#1B1325] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeCategory === 'all'
                ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#C9523C]'
              }`}
            >
              All ({retailBrands.length})
            </button>
            {retailCategories.map((cat) => {
              const count = retailBrands.filter(
                (b) => b.categoryId === cat.id
              ).length;
              if (count === 0) return null;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
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

        {/* Sleek, Compact Luxury Brand Grid (No Bloat, No Clunky Text) */}
        {visibleBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
            {visibleBrands.map((brand) => (
              <article
                key={brand.id}
                onClick={() => onInspectBrand(brand)}
                className="group relative border border-[#2D1D48]/12 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/95 dark:bg-[#191326]/95 p-3.5 sm:p-4 rounded-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#683BA4]/40 dark:hover:border-[#BFA1FF]/40 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4] truncate">
                      {brand.categoryName}
                    </span>
                    <BrandInsignia
                      monogram={brand.monogram}
                      accentColor={brand.accentColor}
                      size="sm"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-[#1B1325] dark:text-[#F6EFE7] group-hover:text-[#683BA4] dark:group-hover:text-[#BFA1FF] transition-colors truncate">
                      {brand.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#5D5070] dark:text-[#B5A7D0] line-clamp-1 mt-0.5">
                      {brand.tagline}
                    </p>
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
    </section>
  );
}
