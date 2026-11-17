import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import {
  APPROVED_BRANDS,
  BRAND_CATEGORIES,
  MALL_IDENTITY,
} from '../utilities/brandsData';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { BrandCategorySection } from '../sections/BrandCategoryCompositions';

export function BrandsPage({ onInspectBrand }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredBrands = useMemo(() => {
    return APPROVED_BRANDS.filter((b) => {
      const matchesCat =
        selectedCategory === 'all' || b.categoryId === selectedCategory;
      if (!matchesCat) return false;
      if (!normalizedQuery) return true;
      return (
        b.name.toLowerCase().includes(normalizedQuery) ||
        b.categoryName.toLowerCase().includes(normalizedQuery) ||
        b.tagline.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [normalizedQuery, selectedCategory]);

  const categoriesToRender = useMemo(() => {
    return BRAND_CATEGORIES.filter((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
      return filteredBrands.some((b) => b.categoryId === cat.id);
    });
  }, [filteredBrands, selectedCategory]);

  return (
    <div>
      {/* Header Hero & Filter Controls over Storefront Video */}
      <section className="relative overflow-hidden py-16 sm:py-22 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB] dark:bg-[#151021]">
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.brandsStorefronts}
          eager
          playbackRate={0.78}
          videoOpacityClassName="opacity-76 dark:opacity-68"
          tintClassName="bg-gradient-to-b from-[#FBF4EB]/86 via-[#EFE6FA]/54 to-[#FDE8DF]/84 dark:from-[#151021]/88 dark:via-[#1D1630]/58 dark:to-[#151021]/90"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              Official Directory · {MALL_IDENTITY.fullTitle}
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              Approved Brand Showcase
            </h1>
            <p className="text-base sm:text-lg text-[#433754] dark:text-[#D8CEE9]">
              All twenty-seven retail stores, jewellery houses, wellness studios, hypermarket aisles, INOX Cinemas, and nine culinary venues organized across distinctive architectural chapters.
            </p>
          </div>

          {/* Search Input & Category Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-[#2D1D48]/14 dark:border-[#E2D4FF]/14">
            <div className="relative w-full lg:max-w-sm">
              <Search className="w-4 h-4 text-[#5D5070] dark:text-[#B5A7D0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brands, salons, cinema, dining..."
                aria-label="Search approved outlets"
                className="w-full pl-10 pr-9 py-2.5 text-sm border border-[#2D1D48]/22 dark:border-[#E2D4FF]/22 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:border-[#683BA4] dark:focus:border-[#BFA1FF]"
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

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                    : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#C9523C]'
                }`}
              >
                All (27)
              </button>
              {BRAND_CATEGORIES.map((cat) => {
                const count = APPROVED_BRANDS.filter(
                  (b) => b.categoryId === cat.id
                ).length;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                      active
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
        </div>
      </section>

      {/* Bespoke Multi-Video Category Sections */}
      {categoriesToRender.length > 0 ? (
        categoriesToRender.map((cat) => (
          <BrandCategorySection
            key={cat.id}
            category={cat}
            brands={filteredBrands.filter((b) => b.categoryId === cat.id)}
            onInspectBrand={onInspectBrand}
          />
        ))
      ) : (
        <section className="py-24 text-center px-6 bg-[#EFE6FA] dark:bg-[#1D1630]">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="font-display text-3xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              No Matching Outlets
            </h2>
            <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
              Try resetting your search filter or exploring all twenty-seven houses inside CITY MALL, Gorakhpur.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] cursor-pointer"
            >
              Show All 27 Outlets
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
