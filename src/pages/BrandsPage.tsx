import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X } from 'lucide-react';
import {
  BRANDS,
  BrandFlagship,
  CATEGORY_FILTERS,
  FilterId,
  PAGE_3D_MEDIA,
  ZONES,
} from '../data/exhibitionData';
import { PageHero } from '../components/PageHero';
import { ZoneShowcaseSection } from '../components/ZoneShowcases';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

gsap.registerPlugin(ScrollTrigger);

interface BrandsPageProps {
  onExploreBrand: (brand: BrandFlagship) => void;
}

export function BrandsPage({ onExploreBrand }: BrandsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterId>('all');

  const catalogueRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isFiltered = activeCategory !== 'all' || normalizedQuery.length > 0;

  const filteredBrands = useMemo(() => {
    return BRANDS.filter((brand) => {
      if (activeCategory !== 'all' && brand.zoneId !== activeCategory) {
        return false;
      }
      if (!normalizedQuery) return true;

      const zone = ZONES.find((z) => z.id === brand.zoneId);
      const haystack = [
        brand.name,
        brand.category,
        brand.type ?? '',
        brand.floor,
        brand.location ?? '',
        brand.timing ?? '',
        brand.description ?? '',
        zone?.title ?? '',
        ...(brand.highlights ?? []),
        ...brand.keywords,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);

  const visibleZones = useMemo(() => {
    return ZONES.filter((zone) => {
      if (activeCategory !== 'all' && zone.id !== activeCategory) return false;
      return filteredBrands.some((b) => b.zoneId === zone.id);
    });
  }, [activeCategory, filteredBrands]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [activeCategory, normalizedQuery]);

  const handleSelectCategory = (categoryId: FilterId) => {
    setActiveCategory(categoryId);
    requestAnimationFrame(() => {
      if (categoryId === 'all') {
        catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const target =
          document.getElementById(`zone-${categoryId}`) ?? catalogueRef.current;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const brandsMedia = PAGE_3D_MEDIA.brands;
  const discoverMedia = PAGE_3D_MEDIA.discover;

  return (
    <div>
      <PageHero
        id="brands-hero"
        eyebrow="COMPLETE RETAIL EXHIBITION · ALL 27 BRANDS"
        title="SOVEREIGN BRAND DIRECTORY"
        subtitle="SEVEN ARCHITECTURAL ZONES"
        description="Search and filter all 27 verified flagship houses across Fashion & Apparel, Footwear & Sportswear, Jewellery & Watches, Beauty & Lifestyle, Supermarket & Retail, Cinema & Multiplex, and Food & Restaurants."
        video={brandsMedia.video3d}
        poster={brandsMedia.poster3d}
        scenes={brandsMedia.scenes}
        videoLabel={brandsMedia.label}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Brands' }]}
        compact
      />

      {/* BRAND SEARCH & CATEGORY FILTERS */}
      <section
        id="brands-catalogue-controls"
        ref={catalogueRef}
        className="relative z-10 overflow-hidden bg-[#FAF8F4] text-[#1A1816] border-b border-[#DED5C7] scroll-mt-14"
      >
        <ScrollVideoBackground
          src={discoverMedia.video3d}
          poster={discoverMedia.poster3d}
          scenes={discoverMedia.scenes}
          triggerSelector="#brands-catalogue-controls"
          playbackSpeed={0.25}
          videoOpacityClassName="opacity-48"
          blendModeClassName="mix-blend-normal"
          overlayClassName="bg-gradient-to-b from-[#FAF8F4]/78 via-[#F7F4EE]/55 to-[#EFEAE1]/80"
          label={discoverMedia.label}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">
            <div className="relative flex-1 max-w-3xl">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[#7A6852] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand name, category, suiting, jewellery, cuisine or floor..."
                aria-label="Search brands by name, category, suiting, jewellery, cuisine or floor"
                className="w-full pl-11 pr-10 py-3.5 text-sm bg-white/95 border border-[#D8CFC0] text-[#1A1816] placeholder:text-[#7E7467] focus:outline-none focus:border-[#9A7B4F] transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#6E6254] hover:text-[#1A1816] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
              <p className="text-xs tracking-[0.12em] uppercase text-[#7A6852] font-medium tabular-nums">
                Showing {filteredBrands.length} of 27 Verified Flagships
              </p>
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium bg-[#1A1816] text-[#FAF8F4] hover:bg-[#9A7B4F] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Exhibition Zone Categories"
            className="flex items-center gap-2 overflow-x-auto lg:flex-wrap no-scrollbar pb-1"
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategory === cat.id;
              const labelText =
                cat.id === 'all' ? cat.label : `${cat.label} (${cat.count})`;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-4 py-2.5 text-xs tracking-[0.08em] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border tabular-nums ${
                    isActive
                      ? 'bg-[#1A1816] text-[#FAF8F4] border-[#1A1816]'
                      : 'bg-white/90 text-[#2F2A24] border-[#D8CFC0] hover:border-[#9A7B4F] hover:text-[#9A7B4F]'
                  }`}
                >
                  {labelText}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL 7 ZONES SHOWCASE */}
      {visibleZones.length === 0 ? (
        <section className="py-24 px-5 sm:px-8 text-center bg-[#F7F4EE]">
          <div className="max-w-lg mx-auto">
            <p className="text-xs tracking-[0.18em] uppercase text-[#7A6852] mb-3">
              0 Matching Flagships
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816] mb-4">
              No Flagship Houses Found
            </h2>
            <p className="text-sm leading-relaxed text-[#5C5349] mb-8">
              No brands matched “{searchQuery}” within the current zone selection.
              Reset filters to explore all 27 verified houses across Metropolis Level 0–2.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-6 py-3 text-xs tracking-[0.14em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        </section>
      ) : (
        visibleZones.map((zone) => {
          const zoneBrands = filteredBrands.filter((b) => b.zoneId === zone.id);
          return (
            <ZoneShowcaseSection
              key={zone.id}
              zone={zone}
              brands={zoneBrands}
              onExplore={onExploreBrand}
              isFiltered={isFiltered}
            />
          );
        })
      )}
    </div>
  );
}
