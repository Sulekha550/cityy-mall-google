import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Film,
  ShoppingBasket,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { CINEMA_POSTER_ASSETS } from '../assets/mediaManifest';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

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
 * 01. Fashion & Apparel — Asymmetric Lookbook Split (Featured flagship portrait left + interactive stepped wardrobe right)
 */
function FashionLookbookSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const [featuredId, setFeaturedId] = useState(brands[0]?.id);
  const featured = brands.find((b) => b.id === featuredId) || brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  if (!brands.length) return null;

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Tall Vertical Runway Frame */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 overflow-hidden bg-[#1B1325] shadow-2xl">
              <ResilientImage
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/88 via-[#151021]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-[#F6EFE7] space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-3xl font-semibold">
                    {featured.name}
                  </h3>
                  <BrandInsignia
                    monogram={featured.monogram}
                    accentColor={featured.accentColor}
                  />
                </div>
                <p className="text-sm text-[#D8CEE9]">{featured.tagline}</p>
                <button
                  type="button"
                  onClick={() => onInspectBrand(featured)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] bg-[#FBF4EB] text-[#151021] hover:bg-[#F48C74] transition-colors cursor-pointer"
                >
                  <span>Inspect Boutique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Alternating Offset Stepped Directory */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {brands.map((brand, idx) => {
              const isSelected = brand.id === featured.id;
              return (
                <article
                  key={brand.id}
                  onMouseEnter={() => setFeaturedId(brand.id)}
                  className={`border transition-all duration-300 bg-[#FFFBF6]/90 dark:bg-[#191326]/90 ${
                    idx % 2 === 1 ? 'sm:translate-y-6' : ''
                  } ${
                    isSelected
                      ? 'border-[#683BA4] dark:border-[#BFA1FF] shadow-xl'
                      : 'border-[#2D1D48]/14 dark:border-[#E2D4FF]/14'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38]">
                    <ResilientImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="font-display text-xl font-semibold text-[#1B1325] dark:text-[#F6EFE7] truncate">
                        {brand.name}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
                        {brand.tagline}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedId(brand.id);
                          onInspectBrand(brand);
                        }}
                        className="pt-1 text-xs font-semibold text-[#683BA4] dark:text-[#BFA1FF] hover:underline cursor-pointer"
                      >
                        View Outlet →
                      </button>
                    </div>
                    <BrandInsignia
                      monogram={brand.monogram}
                      accentColor={brand.accentColor}
                      size="sm"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 02. Footwear & Sportswear — Kinetic Horizontal Slider Strip
 */
function FootwearRunwaySection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  if (!brands.length) return null;

  const slide = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 350, behavior: 'smooth' });
  };

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

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <CategorySectionHeader
          category={category}
          count={brands.length}
          actionRoute={category.route}
          actionLabel="Footwear Gallery"
        />

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
            Scroll horizontally through performance trainers, running gear, leather boots, and family footwear houses:
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label="Scroll footwear left"
              className="w-10 h-10 flex items-center justify-center border border-[#2D1D48]/22 dark:border-[#E2D4FF]/22 bg-[#FFFBF6]/90 dark:bg-[#17272B]/90 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#0E7C71] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label="Scroll footwear right"
              className="w-10 h-10 flex items-center justify-center border border-[#2D1D48]/22 dark:border-[#E2D4FF]/22 bg-[#FFFBF6]/90 dark:bg-[#17272B]/90 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#0E7C71] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
        >
          {brands.map((brand, idx) => (
            <article
              key={brand.id}
              className={`shrink-0 w-[285px] sm:w-[340px] snap-start border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/92 dark:bg-[#17272B]/92 overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 ${
                idx % 2 === 1 ? 'md:mt-6' : ''
              }`}
            >
              <div className="relative h-64 overflow-hidden bg-[#D5ECE6] dark:bg-[#1B3338]">
                <ResilientImage
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <BrandInsignia
                    monogram={brand.monogram}
                    accentColor={brand.accentColor}
                    size="sm"
                  />
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-display text-2xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                  {brand.name}
                </h3>
                <p className="text-sm leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
                  {brand.tagline}
                </p>
                <button
                  type="button"
                  onClick={() => onInspectBrand(brand)}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0E7C71] dark:text-[#5EEAD4] hover:underline cursor-pointer"
                >
                  Open Outlet Brief →
                </button>
              </div>
            </article>
          ))}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {brands.map((brand, idx) => (
            <div
              key={brand.id}
              data-parallax={idx % 2 === 0 ? 'down' : 'up'}
              className="group border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#1E1420]/92 overflow-hidden shadow-xl"
            >
              <div className="aspect-[16/11] overflow-hidden bg-[#F4DFD5] dark:bg-[#2A1D29]">
                <ResilientImage
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7 sm:p-8 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B36624] dark:text-[#F0B97A]">
                    Heritage &amp; Precision
                  </span>
                  <h3 className="font-display text-3xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
                    {brand.tagline}
                  </p>
                  <button
                    type="button"
                    onClick={() => onInspectBrand(brand)}
                    className="pt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#B36624] dark:hover:text-[#F0B97A] cursor-pointer"
                  >
                    <span>Explore Salon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <BrandInsignia
                  monogram={brand.monogram}
                  accentColor={brand.accentColor}
                  size="lg"
                />
              </div>
            </div>
          ))}
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
    return registerSectionMotion(sectionRef.current, 'cascade');
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

        <div className="space-y-12">
          {brands.map((brand, idx) => {
            const flipped = idx % 2 === 1;
            return (
              <div
                key={brand.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/90 dark:bg-[#1B1222]/90 overflow-hidden"
              >
                <div
                  className={`lg:col-span-6 aspect-[16/10] overflow-hidden bg-[#F5D6E3] dark:bg-[#2C1A31] ${
                    flipped ? 'lg:order-2' : ''
                  }`}
                >
                  <ResilientImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div
                  className={`lg:col-span-6 p-7 sm:p-10 space-y-4 ${
                    flipped ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#C9523C] dark:text-[#F48C74]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Grooming &amp; Artistry</span>
                    </span>
                    <BrandInsignia
                      monogram={brand.monogram}
                      accentColor={brand.accentColor}
                    />
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                    {brand.name}
                  </h3>
                  <p className="text-base text-[#433754] dark:text-[#D8CEE9]">
                    {brand.tagline}
                  </p>
                  <button
                    type="button"
                    onClick={() => onInspectBrand(brand)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 cursor-pointer"
                  >
                    <span>View Studio Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
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
    return registerSectionMotion(sectionRef.current, 'editorial');
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/92 dark:bg-[#142525]/92 overflow-hidden">
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#D5ECE6] dark:bg-[#1A3332]">
            <ResilientImage
              src={spencers.image}
              alt={spencers.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="lg:col-span-5 p-7 sm:p-10 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4]">
                <ShoppingBasket className="w-4 h-4" />
                <span>Everyday Anchor Retail</span>
              </span>
              <BrandInsignia
                monogram={spencers.monogram}
                accentColor={spencers.accentColor}
                size="lg"
              />
            </div>
            <h3 className="font-display text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              {spencers.name}
            </h3>
            <p className="text-base leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              {spencers.tagline}
            </p>
            <button
              type="button"
              onClick={() => onInspectBrand(spencers)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] bg-[#0E7C71] dark:bg-[#5EEAD4] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 cursor-pointer"
            >
              <span>Inspect Hypermarket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 06. Cinema & Multiplex — Widescreen Theatrical Stage (INOX Cinemas)
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative aspect-[16/10] border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 overflow-hidden shadow-2xl">
            <ResilientImage
              src={inox.image}
              alt={inox.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 bg-[#FFFBF6]/88 dark:bg-[#151B31]/88 border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#683BA4] dark:text-[#BFA1FF]">
                <Film className="w-4 h-4" />
                <span>Multiplex Auditorium</span>
              </span>
              <BrandInsignia
                monogram={inox.monogram}
                accentColor={inox.accentColor}
                size="lg"
              />
            </div>

            <h3 className="font-display text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              {inox.name}
            </h3>
            <p className="text-base text-[#433754] dark:text-[#D8CEE9]">
              {inox.tagline}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <img
                src={CINEMA_POSTER_ASSETS.odyssey}
                alt="Sample Feature Poster"
                className="w-16 h-20 object-cover border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20"
              />
              <img
                src={CINEMA_POSTER_ASSETS.heritage}
                alt="Sample Heritage Poster"
                className="w-16 h-20 object-cover border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20"
              />
              <div className="flex flex-wrap gap-3 ml-auto">
                <Link
                  to="/entertainment"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90"
                >
                  Cinema Page
                </Link>
                <button
                  type="button"
                  onClick={() => onInspectBrand(inox)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] border border-[#2D1D48]/24 dark:border-[#E2D4FF]/24 text-[#1B1325] dark:text-[#F6EFE7] cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 07. Food & Restaurants — Staggered Culinary Filmstrip & Selector (9 outlets)
 */
function DiningFilmstripSection({ category, brands, onInspectBrand }) {
  const sectionRef = useRef(null);
  const [selectedId, setSelectedId] = useState(brands[0]?.id);
  const active = brands.find((b) => b.id === selectedId) || brands[0];

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  if (!brands.length) return null;

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

        {/* Selected Highlight Chamber */}
        {active && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#1E1420]/92 overflow-hidden">
            <div className="lg:col-span-6 w-full aspect-[16/10] overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38]">
              <ResilientImage
                key={active.id}
                src={active.image}
                alt={active.name}
                className="w-full h-full object-cover block"
              />
            </div>
            <div className="lg:col-span-6 p-7 sm:p-9 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C9523C] dark:text-[#F48C74]">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Featured Culinary House</span>
                </span>
                <BrandInsignia
                  monogram={active.monogram}
                  accentColor={active.accentColor}
                />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                {active.name}
              </h3>
              <p className="text-base text-[#433754] dark:text-[#D8CEE9]">
                {active.tagline}
              </p>
              <button
                type="button"
                onClick={() => onInspectBrand(active)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 cursor-pointer"
              >
                Inspect Venue
              </button>
            </div>
          </div>
        )}

        {/* Horizontal Culinary Filmstrip Strip */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {brands.map((venue, idx) => {
            const isSelected = venue.id === active?.id;
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => setSelectedId(venue.id)}
                className={`shrink-0 w-60 text-left border transition-all cursor-pointer overflow-hidden ${
                  idx % 2 === 1 ? 'mt-4' : ''
                } ${
                  isSelected
                    ? 'border-[#C9523C] dark:border-[#F48C74] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021]'
                    : 'border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7]'
                }`}
              >
                <div className="h-32 overflow-hidden">
                  <ResilientImage
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <span className="font-display text-base font-semibold truncate">
                    {venue.name}
                  </span>
                  <span className="text-[11px] font-medium opacity-70 tabular-nums shrink-0">
                    {venue.monogram}
                  </span>
                </div>
              </button>
            );
          })}
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
