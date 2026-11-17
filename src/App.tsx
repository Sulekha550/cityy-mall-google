import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X, ArrowDown } from 'lucide-react';
import {
  BRANDS,
  BrandFlagship,
  CATEGORY_FILTERS,
  FilterId,
  HERO_POSTER,
  HERO_VIDEO,
  ZONES,
} from './data/exhibitionData';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';
import { Navbar, NavAction, NavSectionId } from './components/Navbar';
import { ZoneShowcaseSection } from './components/ZoneShowcases';
import { ArchitecturalExperiencesBand } from './components/ArchitecturalExperiencesBand';
import { BrandDetailModal } from './components/BrandDetailModal';
import { DestinationFooter } from './components/DestinationFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterId>('all');
  const [activeNav, setActiveNav] = useState<NavSectionId>('home');
  const [selectedBrand, setSelectedBrand] = useState<BrandFlagship | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const exhibitionRef = useRef<HTMLDivElement>(null);

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

  // Refresh ScrollTrigger bounds whenever filtered zones change height
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
        exhibitionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const target =
          document.getElementById(`zone-${categoryId}`) ?? exhibitionRef.current;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const handleNavZoneJump = (zoneId: FilterId) => {
    setActiveCategory('all');
    setSearchQuery('');
    requestAnimationFrame(() => {
      if (zoneId === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document
          .getElementById(`zone-${zoneId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleNavAction = (action: NavAction) => {
    setActiveNav(action.navId);
    if (action.filterZone !== undefined) {
      setActiveCategory(action.filterZone);
    } else if (action.navId === 'home' || action.navId === 'discover') {
      setActiveCategory('all');
    }
    if (action.searchHint !== undefined) {
      setSearchQuery(action.searchHint);
    } else if (action.filterZone !== undefined) {
      setSearchQuery('');
    }

    requestAnimationFrame(() => {
      if (action.targetElementId === 'hero-atrium') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (action.targetElementId) {
        const el = document.getElementById(action.targetElementId);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <div className="min-h-screen relative bg-[#141311] text-[#1A1816] overflow-x-clip">
      <Navbar activeNav={activeNav} onNavigate={handleNavAction} />

      {/* 1. PAGE IDENTITY AND HERO — REAL SCROLL-CONTROLLED VIDEO */}
      <section
        id="hero-atrium"
        className="relative z-10 min-h-[78vh] lg:min-h-[86vh] flex flex-col justify-end overflow-hidden bg-[#141311] text-[#F7F4EE]"
      >
        <ScrollVideoBackground
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          eager
          triggerSelector="#hero-atrium"
          start="top 56px"
          end="bottom top"
          videoOpacityClassName="opacity-100"
          overlayClassName="bg-gradient-to-t from-[#141311]/75 via-[#141311]/18 to-[#141311]/10"
          label="Grand luxury mall atrium, glass architecture and shopping avenues"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#DFC496] mb-4">
              CURATED BRAND PROMENADE
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-medium tracking-tight leading-[1.04] text-[#F7F4EE] drop-shadow-sm">
              SOVEREIGN RETAIL EXHIBITION
            </h1>
            <p className="mt-2 font-serif text-xl sm:text-2xl tracking-[0.16em] uppercase text-[#E4D7C3]">
              METROPOLIS LEVEL 0–2
            </p>
            <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#EFEAE1] max-w-2xl">
              An international luxury retail exhibition. Discover all 27 verified
              flagship houses across haute couture, fine horology, activewear,
              Michelin-standard gastronomy, and IMAX laser cinema.
            </p>
          </div>

          {/* Three Premium Statistics + Direct Scroll Cue */}
          <div className="mt-10 pt-8 border-t border-white/25 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EE] tabular-nums">
                  27
                </p>
                <p className="text-xs tracking-[0.14em] uppercase text-[#DFC496] mt-1">
                  27 Iconic Houses Live
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EE] tabular-nums">
                  07
                </p>
                <p className="text-xs tracking-[0.14em] uppercase text-[#DFC496] mt-1">
                  7 Architectural Zones
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EE] tabular-nums">
                  100%
                </p>
                <p className="text-xs tracking-[0.14em] uppercase text-[#DFC496] mt-1">
                  100% Direct Storefronts
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                exhibitionRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
              className="self-start lg:self-end inline-flex items-center gap-2.5 px-5 py-2.5 text-xs tracking-[0.14em] uppercase font-medium bg-[#F7F4EE] text-[#141311] hover:bg-[#C6A87A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Enter Promenade</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. BRAND SEARCH AND CATEGORY FILTERS */}
      <section
        id="exhibition-catalogue"
        ref={exhibitionRef}
        className="relative z-10 bg-[#F7F4EE] border-b border-[#DED5C7] scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">
            <div className="relative flex-1 max-w-3xl">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[#7A6852] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand name, category, suiting, jewellery, cuisine or floor..."
                aria-label="Search brands by name, category, suiting, jewellery, cuisine or floor"
                className="w-full pl-11 pr-10 py-3.5 text-sm bg-white border border-[#D8CFC0] text-[#1A1816] placeholder:text-[#867C6F] focus:outline-none focus:border-[#9A7B4F] transition-colors"
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
              <p className="text-xs tracking-[0.12em] uppercase text-[#5C5349] tabular-nums">
                Showing {filteredBrands.length} of 27 Verified Flagships
              </p>
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium border border-[#C9BFA9] text-[#1A1816] hover:bg-[#1A1816] hover:text-[#F7F4EE] transition-colors cursor-pointer whitespace-nowrap shrink-0"
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
                      ? 'bg-[#1A1816] text-[#F7F4EE] border-[#1A1816]'
                      : 'bg-white text-[#4A433B] border-[#DDD4C6] hover:border-[#9A7B4F] hover:text-[#1A1816]'
                  }`}
                >
                  {labelText}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ZONES 01 – 07 EXHIBITION SHOWCASES WITH REAL VIDEO BACKGROUNDS */}
      <main className="relative z-10">
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
                No brands matched “{searchQuery}” within the current zone
                selection. Reset filters to explore all 27 verified houses across
                Metropolis Level 0–2.
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
            const zoneBrands = filteredBrands.filter(
              (b) => b.zoneId === zone.id
            );
            return (
              <ZoneShowcaseSection
                key={zone.id}
                zone={zone}
                brands={zoneBrands}
                onExplore={(brand) => setSelectedBrand(brand)}
                isFiltered={isFiltered}
              />
            );
          })
        )}

        {/* DISCOVER ARCHITECTURE & CULTURAL EVENTS VIDEO BANDS */}
        <ArchitecturalExperiencesBand onJumpToZone={handleNavZoneJump} />
      </main>

      {/* 12. BOTTOM DESTINATION FOOTER */}
      <DestinationFooter onJumpToZone={handleNavZoneJump} />

      {/* Interactive Brand Flagship Detail Modal */}
      <BrandDetailModal
        brand={selectedBrand}
        allVisibleBrands={filteredBrands}
        onClose={() => setSelectedBrand(null)}
        onSelectBrand={(brand) => setSelectedBrand(brand)}
      />
    </div>
  );
}
