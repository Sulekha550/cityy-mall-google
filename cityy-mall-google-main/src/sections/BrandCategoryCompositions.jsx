import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { CINEMA_POSTER_ASSETS } from '../assets/mediaManifest';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

function CategorySectionHeader({ category, count, actionRoute, actionLabel }) {
  return (
    <div
      data-motion="reveal"
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14"
    >
      <div className="space-y-2 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
          Section {category.number} · {count} {count === 1 ? 'Approved House' : 'Approved Houses'}
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
          {category.title}
        </h2>
        <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9]">
          {category.subtitle}
        </p>
      </div>

      {actionRoute && (
        <Link
          to={actionRoute}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase pb-1.5 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0 self-start md:self-end"
        >
          <span>{actionLabel || `Explore ${category.shortLabel}`}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

/**
 * 01. Fashion & Apparel — Frosted Dossier Card Left + Horizontally Overlapping Stadium-Rounded Images Right
 */
function FashionLookbookSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const [featuredId, setFeaturedId] = useState(brands[0]?.id);
  const featured = brands.find((b) => b.id === featuredId) || brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  if (!brands.length) return null;

  const numberColors = [
    'from-[#E05638] to-[#C9523C]',
    'from-[#683BA4] to-[#4F2B85]',
    'from-[#0E7C71] to-[#0A5A52]',
    'from-[#E87A5D] to-[#D96547]',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#EFE6FA] dark:bg-[#1D1630]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.76}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute={category.route}
          actionLabel="Fashion Wing"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#683BA4] dark:text-[#BFA1FF] px-2.5 py-0.5 rounded-full bg-[#683BA4]/10 dark:bg-[#BFA1FF]/10">
                  FEATURED ATELIER
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Ground Floor Promenade
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                {featured.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#683BA4] dark:text-[#BFA1FF] leading-snug">
                {featured.tagline}
              </p>
            </div>

            {/* Numbered Brand Selection List */}
            <div className="space-y-2 pt-1">
              {brands.map((brand, idx) => {
                const isSelected = brand.id === featured.id;
                const colorGradient = numberColors[idx % numberColors.length];
                return (
                  <button
                    key={brand.id}
                    type="button"
                    onMouseEnter={() => setFeaturedId(brand.id)}
                    onClick={() => {
                      setFeaturedId(brand.id);
                      onInspectBrand(brand);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl transition-all cursor-pointer text-left border ${isSelected
                      ? 'bg-[#683BA4]/15 dark:bg-white/15 border-[#683BA4] shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#683BA4]/50'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold text-white bg-gradient-to-r ${colorGradient} shrink-0 shadow-xs`}
                      >
                        {brand.monogram || String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-extrabold text-[#1B1325] dark:text-[#FAF0F8] block truncate">
                          {brand.name}
                        </span>
                        <span className="text-[11px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">
                          {brand.tagline}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-[#683BA4] dark:text-[#BFA1FF] shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 opacity-100' : 'opacity-40'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Gradient Pill CTA */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onInspectBrand(featured)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#683BA4] to-[#4F2B85] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Inspect {featured.name} ↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Horizontally Overlapping Stadium-Rounded Images */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              {brands.map((brand, idx) => {
                const isMain = brand.id === featured.id;
                return (
                  <div
                    key={brand.id}
                    onMouseEnter={() => setFeaturedId(brand.id)}
                    onClick={() => {
                      setFeaturedId(brand.id);
                      onInspectBrand(brand);
                    }}
                    className={`relative shrink-0 ${isMain
                      ? 'w-[54%] aspect-[16/11] rounded-[2.5rem] z-30 ring-2 ring-[#683BA4]/30'
                      : 'w-[38%] aspect-[3/3.8] rounded-[2.2rem] ' + (idx % 2 === 0 ? 'z-20' : 'z-10')
                      } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                  >
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Prominent Floating Brand Monogram Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse" />
                      <span className="text-xs font-black text-white tracking-wide">
                        {brand.name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-medium text-white/90 bg-black/75 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                        {brand.tagline}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#683BA4] to-[#EC4899] px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
                        Inspect ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 02. Footwear & Sportswear — Frosted Dossier Card Left + Horizontally Overlapping Stadium-Rounded Images Right
 */
function FootwearRunwaySection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const [featuredId, setFeaturedId] = useState(brands[0]?.id);
  const featured = brands.find((b) => b.id === featuredId) || brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  if (!brands.length) return null;

  const numberColors = [
    'from-[#0E7C71] to-[#0A5A52]',
    'from-[#059669] to-[#047857]',
    'from-[#0D9488] to-[#0F766E]',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E4F5F0] dark:bg-[#112226]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.78}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute={category.route}
          actionLabel="Footwear Gallery"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0E7C71] dark:text-[#5EEAD4] px-2.5 py-0.5 rounded-full bg-[#0E7C71]/10 dark:bg-[#5EEAD4]/10">
                  FEATURED FLAGSHIP
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Ground Concourse
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                {featured.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#0E7C71] dark:text-[#5EEAD4] leading-snug">
                {featured.tagline}
              </p>
            </div>

            {/* Numbered Category List */}
            <div className="space-y-2 pt-1">
              {brands.map((brand, idx) => {
                const isSelected = brand.id === featured.id;
                const colorGradient = numberColors[idx % numberColors.length];
                return (
                  <button
                    key={brand.id}
                    type="button"
                    onMouseEnter={() => setFeaturedId(brand.id)}
                    onClick={() => {
                      setFeaturedId(brand.id);
                      onInspectBrand(brand);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl transition-all cursor-pointer text-left border ${isSelected
                      ? 'bg-[#0E7C71]/15 dark:bg-white/15 border-[#0E7C71] shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#0E7C71]/50'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold text-white bg-gradient-to-r ${colorGradient} shrink-0 shadow-xs`}
                      >
                        {brand.monogram || String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-extrabold text-[#1B1325] dark:text-[#FAF0F8] block truncate">
                          {brand.name}
                        </span>
                        <span className="text-[11px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">
                          {brand.tagline}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-[#0E7C71] dark:text-[#5EEAD4] shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 opacity-100' : 'opacity-40'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Gradient Pill CTA */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onInspectBrand(featured)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#0E7C71] to-[#059669] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Inspect {featured.name} ↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Horizontally Overlapping Stadium-Rounded Images */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              {brands.map((brand, idx) => {
                const isMain = brand.id === featured.id;
                return (
                  <div
                    key={brand.id}
                    onMouseEnter={() => setFeaturedId(brand.id)}
                    onClick={() => {
                      setFeaturedId(brand.id);
                      onInspectBrand(brand);
                    }}
                    className={`relative shrink-0 ${isMain
                      ? 'w-[54%] aspect-[16/11] rounded-[2.5rem] z-30 ring-2 ring-[#0E7C71]/30'
                      : 'w-[38%] aspect-[3/3.8] rounded-[2.2rem] ' + (idx % 2 === 0 ? 'z-20' : 'z-10')
                      } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                  >
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Prominent Floating Brand Monogram Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
                      <span className="text-xs font-black text-white tracking-wide">
                        {brand.name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-medium text-white/90 bg-black/75 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                        {brand.tagline}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#0E7C71] to-[#059669] px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
                        Inspect ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 03. Jewellery & Watches — Monumental Split Vitrines
 */
function JewelleryVitrinesSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  if (!brands.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FDE8DF] dark:bg-[#241724]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.74}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute={category.route}
          actionLabel="Jewellery Salons"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#B36624] dark:text-[#FBBF24] px-2.5 py-0.5 rounded-full bg-[#B36624]/10 dark:bg-[#FBBF24]/10">
                  IMPERIAL SALONS
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Ground Floor Frontage
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                Tanishq &amp; Titan World
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#B36624] dark:text-[#FBBF24] leading-snug">
                Certified 22K/18K Gold, Bridal Solitaires &amp; Precision Swiss Chronometers.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onInspectBrand(brand)}
                  className="w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#B36624] text-xs font-semibold text-[#1B1325] dark:text-[#FAF0F8] transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white bg-gradient-to-r from-[#D97706] to-[#B45309] shadow-sm shrink-0">
                      {brand.monogram}
                    </span>
                    <div className="text-left min-w-0">
                      <span className="text-sm font-extrabold block truncate">{brand.name}</span>
                      <span className="text-[11px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">{brand.tagline}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#B36624] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Horizontally Overlapping Stadium-Rounded Images */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              {brands.map((brand, idx) => {
                const isMain = idx === 0;
                return (
                  <div
                    key={brand.id}
                    onClick={() => onInspectBrand(brand)}
                    className={`relative shrink-0 ${isMain
                      ? 'w-[56%] aspect-[16/11] rounded-[2.5rem] z-30'
                      : 'w-[44%] aspect-[3/3.8] rounded-[2.2rem] z-20'
                      } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                  >
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Floating Brand Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
                      <span className="text-xs font-black text-white tracking-wide">
                        {brand.name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-medium text-white/90 bg-black/75 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                        {brand.tagline}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#D97706] to-[#B45309] px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
                        Inspect ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 04. Beauty & Lifestyle — Overlapping Dual Studio Parallax Stage
 */
function BeautyDualStageSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  if (!brands.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FAE4EC] dark:bg-[#231526]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.75}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute={category.route}
          actionLabel="Beauty & Mehendi"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C9523C] dark:text-[#F48C74] px-2.5 py-0.5 rounded-full bg-[#EC4899]/10 dark:bg-[#F48C74]/15">
                  SALON &amp; WELLNESS
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Third Floor Suites
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                Looks Salon &amp; Mehendi Art
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#EC4899] dark:text-[#F472B6] leading-snug">
                Hair Sanctuaries, Skin Therapies &amp; Traditional Bridal Artistry.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onInspectBrand(brand)}
                  className="w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#EC4899] text-xs font-semibold text-[#1B1325] dark:text-[#FAF0F8] transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white bg-gradient-to-r from-[#EC4899] to-[#C026D3] shadow-sm shrink-0">
                      {brand.monogram}
                    </span>
                    <div className="text-left min-w-0">
                      <span className="text-sm font-extrabold block truncate">{brand.name}</span>
                      <span className="text-[11px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">{brand.tagline}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#EC4899] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Horizontally Overlapping Stadium-Rounded Images */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              {brands.map((brand, idx) => {
                const isMain = idx === 0;
                return (
                  <div
                    key={brand.id}
                    onClick={() => onInspectBrand(brand)}
                    className={`relative shrink-0 ${isMain
                      ? 'w-[56%] aspect-[16/11] rounded-[2.5rem] z-30'
                      : 'w-[44%] aspect-[3/3.8] rounded-[2.2rem] z-20'
                      } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                  >
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Floating Brand Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse" />
                      <span className="text-xs font-black text-white tracking-wide">
                        {brand.name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-medium text-white/90 bg-black/75 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                        {brand.tagline}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#BE185D] px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
                        View Studio →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 05. Supermarket & Retail — Full-Width Panoramic Anchor Feature (Spencer's)
 */
function SupermarketPanoramicSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const spencers = brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  if (!spencers) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E4F5F0] dark:bg-[#122524]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.78}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute={category.route}
          actionLabel="Supermarket Anchor"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0E7C71] dark:text-[#5EEAD4] px-2.5 py-0.5 rounded-full bg-[#0E7C71]/10 dark:bg-[#5EEAD4]/10">
                  HYPERMARKET ANCHOR
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Lower Ground Concourse
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                {spencers.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#0E7C71] dark:text-[#5EEAD4] leading-snug">
                {spencers.tagline}
              </p>
            </div>

            <p className="text-sm text-[#3D2E50] dark:text-[#D8CEE9] font-medium leading-relaxed">
              Daily provisions, organic farm produce, and artisanal pantry on Lower Ground.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#0E7C71] dark:text-[#5EEAD4]">
              <span>✦ 8:00 AM – 10:00 PM Daily</span>
              <span>✦ Direct Travelator Access</span>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onInspectBrand(spencers)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#0E7C71] to-[#059669] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Inspect {spencers.name} Aisles ↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Stadium-Rounded Panoramic Visual Frame */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 group">
              <ResilientImage
                src={spencers.image}
                alt={spencers.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Brand Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5EEAD4] animate-pulse" />
                <span className="text-xs font-black text-white tracking-wide">
                  {spencers.name} · Lower Ground
                </span>
              </div>

              <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-medium text-white/90 bg-black/70 px-3 py-1 rounded-full backdrop-blur-md">
                  Direct Parking Concourse
                </span>
                <span className="text-[10px] font-mono text-[#5EEAD4] bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-md">
                  8:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 06. Cinema & Multiplex — Frosted Dossier Card Left + Stadium-Rounded Showcase Right
 */
function CinemaTheatricalSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const inox = brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  if (!inox) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E6F1FC] dark:bg-[#131C2E]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.78}
        videoOpacityClassName="opacity-78 dark:opacity-70"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute="/entertainment"
          actionLabel="Entertainment Lounge"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2563EB] dark:text-[#60A5FA] px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 dark:bg-[#60A5FA]/15">
                  THEATRICAL MULTIPLEX
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Fourth Level Entertainment
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                {inox.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] leading-snug">
                {inox.tagline}
              </p>
            </div>

            {/* Numbered Feature Items */}
            <div className="space-y-2 pt-1">
              {[
                { num: '01', title: 'Laser 4K Christie Projection', sub: 'Ultra high-definition clarity' },
                { num: '02', title: 'Dolby Atmos 7.1 Immersive Sound', sub: '360° architectural sound engineering' },
                { num: '03', title: 'Royale Plush Recliner Seating', sub: 'Gourmet in-seat dining service' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                >
                  <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shrink-0 shadow-xs">
                    {item.num}
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-extrabold text-[#1B1325] dark:text-[#FAF0F8] block truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">
                      {item.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/entertainment"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Explore Cinema Lounge ↗</span>
              </Link>
              <button
                type="button"
                onClick={() => onInspectBrand(inox)}
                className="px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl border border-black/15 dark:border-white/20 text-[#1B1325] dark:text-[#FAF0F8] hover:bg-black/5 transition-all cursor-pointer"
              >
                Inspect
              </button>
            </div>
          </div>

          {/* Right Column: Stadium-Rounded Overlapping Visual Panels */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              <div className="relative w-[58%] aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 z-20 group">
                <ResilientImage
                  src={inox.image}
                  alt={inox.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Top Brand Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA] animate-pulse" />
                  <span className="text-xs font-black text-white tracking-wide">
                    {inox.name} · Multiplex
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-1">
                  <span className="text-[11px] font-mono text-white/90 bg-black/70 px-3 py-1 rounded-full backdrop-blur-md">
                    Auditorium 1-4 · 4K Laser
                  </span>
                  <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-2.5 py-1 rounded-full shadow-sm">
                    Book Tickets ↗
                  </span>
                </div>
              </div>

              <div className="relative w-[42%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 z-10 group">
                <img
                  src={CINEMA_POSTER_ASSETS.odyssey}
                  alt="Feature Cinema Presentation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-white bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                    Now Playing
                  </span>
                  <span className="text-[9px] font-mono text-[#FBBF24] bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-md">
                    Book ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 07. Food & Restaurants — Frosted Dossier Card Left + Horizontally Overlapping Stadium-Rounded Images Right
 */
function DiningFilmstripSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const [selectedId, setSelectedId] = useState(brands[0]?.id);
  const active = brands.find((b) => b.id === selectedId) || brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  if (!brands.length) return null;

  const numberColors = [
    'from-[#E05638] to-[#C9523C]',
    'from-[#D97706] to-[#B45309]',
    'from-[#DC2626] to-[#991B1B]',
    'from-[#EA580C] to-[#C2410C]',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 bg-[#FDE8DF] dark:bg-[#241724]"
    >
      <VideoSectionBackground
        videoAsset={category.video}
        playbackRate={0.76}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName={`bg-gradient-to-br ${category.accentLight} dark:${category.accentDark}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute="/dining"
          actionLabel="Full Dining Guide"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C9523C] dark:text-[#F48C74] px-2.5 py-0.5 rounded-full bg-[#C9523C]/10 dark:bg-[#F48C74]/15">
                  FEATURED KITCHEN
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Third Floor Terrace
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                {active.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#C9523C] dark:text-[#F48C74] leading-snug">
                {active.tagline}
              </p>
            </div>

            {/* Numbered Category List */}
            <div className="space-y-2 pt-1">
              {brands.slice(0, 4).map((venue, idx) => {
                const isSelected = venue.id === active.id;
                const colorGradient = numberColors[idx % numberColors.length];
                return (
                  <button
                    key={venue.id}
                    type="button"
                    onMouseEnter={() => setSelectedId(venue.id)}
                    onClick={() => {
                      setSelectedId(venue.id);
                      onInspectBrand(venue);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl transition-all cursor-pointer text-left border ${isSelected
                      ? 'bg-[#C9523C]/15 dark:bg-white/15 border-[#C9523C] shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#C9523C]/50'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white bg-gradient-to-r ${colorGradient} shrink-0 shadow-xs`}
                      >
                        {venue.monogram || String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-extrabold text-[#1B1325] dark:text-[#FAF0F8] block truncate">
                          {venue.name}
                        </span>
                        <span className="text-[11px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">
                          {venue.tagline}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-[#C9523C] dark:text-[#F48C74] shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 opacity-100' : 'opacity-40'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Gradient Pill CTA */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onInspectBrand(active)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#C9523C] to-[#E05638] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Inspect {active.name} Menu ↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Horizontally Overlapping Stadium-Rounded Images */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              {brands.slice(0, 4).map((venue, idx) => {
                const isMain = venue.id === active.id;
                return (
                  <div
                    key={venue.id}
                    onMouseEnter={() => setSelectedId(venue.id)}
                    onClick={() => {
                      setSelectedId(venue.id);
                      onInspectBrand(venue);
                    }}
                    className={`relative shrink-0 ${isMain
                      ? 'w-[54%] aspect-[16/11] rounded-[2.5rem] z-30 ring-2 ring-[#C9523C]/30'
                      : 'w-[38%] aspect-[3/3.8] rounded-[2.2rem] ' + (idx % 2 === 0 ? 'z-20' : 'z-10')
                      } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                  >
                    <ResilientImage
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Brand Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                      <span className="text-xs font-black text-white tracking-wide">
                        {venue.name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-medium text-white/90 bg-black/75 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                        {venue.tagline}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#C9523C] to-[#E05638] px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
                        Inspect ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SECTION_RENDERERS = {
  fashion: FashionLookbookSection,
  footwear: FootwearRunwaySection,
  jewellery: JewelleryVitrinesSection,
  beauty: BeautyDualStageSection,
  supermarket: SupermarketPanoramicSection,
  cinema: CinemaTheatricalSection,
  dining: DiningFilmstripSection,
};

export function BrandCategorySection({ category, brands, onInspectBrand }) {
  const Renderer = SECTION_RENDERERS[category.id] || FashionLookbookSection;
  return (
    <Renderer
      category={category}
      brands={brands}
      onInspectBrand={onInspectBrand}
    />
  );
}
