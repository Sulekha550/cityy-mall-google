import { ArrowUpRight, Clock, Layers, MapPin, Star } from 'lucide-react';
import { BrandFlagship, ZoneDefinition } from '../data/exhibitionData';
import { ExhibitionImage } from './ExhibitionImage';
import { ScrollVideoBackground } from './ScrollVideoBackground';

interface ZoneShowcaseProps {
  zone: ZoneDefinition;
  brands: BrandFlagship[];
  onExplore: (brand: BrandFlagship) => void;
  isFiltered: boolean;
}

function ZoneHeader({
  zone,
  visibleCount,
  isFiltered,
}: {
  zone: ZoneDefinition;
  visibleCount: number;
  isFiltered: boolean;
}) {
  const numericIndex = zone.indexLabel.replace('ZONE ', '');
  const countText = isFiltered
    ? `${visibleCount} of ${zone.count} Flagships Matching`
    : zone.listedLabel;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 sm:p-7 mb-10 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2.5 text-xs tracking-[0.18em] uppercase mb-3 text-[#8C6F47] font-medium">
          <span className="tabular-nums">{zone.indexLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Metropolis Exhibition</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.12] text-[#1A1816]">
          {numericIndex}. {zone.title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4A433B]">
          {zone.subtitle}
        </p>
      </div>

      <div className="text-xs tracking-[0.14em] uppercase tabular-nums shrink-0 text-[#8C6F47] font-medium">
        {countText}
      </div>
    </div>
  );
}

function BrandMetaLine({
  brand,
  isDark = false,
}: {
  brand: BrandFlagship;
  isDark?: boolean;
}) {
  const muted = isDark ? 'text-[#BFB7AA]' : 'text-[#5F574D]';
  return (
    <div className={`space-y-1.5 text-xs ${muted}`}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <Layers className="w-3.5 h-3.5 text-[#9A7B4F] shrink-0" />
        <span className="tabular-nums">{brand.floor}</span>
        {brand.location && (
          <>
            <span aria-hidden="true">·</span>
            <MapPin className="w-3.5 h-3.5 text-[#9A7B4F] shrink-0" />
            <span>{brand.location}</span>
          </>
        )}
      </div>
      {brand.timing && (
        <div className="flex items-center gap-2 tabular-nums">
          <Clock className="w-3.5 h-3.5 text-[#9A7B4F] shrink-0" />
          <span>{brand.timing}</span>
        </div>
      )}
    </div>
  );
}

function ExploreAction({
  label,
  onClick,
  isDark = false,
  prominent = false,
}: {
  label: string;
  onClick: () => void;
  isDark?: boolean;
  prominent?: boolean;
}) {
  if (prominent) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#9A7B4F] ${
          isDark
            ? 'bg-[#C6A87A] text-[#141311] hover:bg-[#F7F4EE]'
            : 'bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F]'
        }`}
      >
        <span>{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-medium pb-1 border-b transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#9A7B4F] ${
        isDark
          ? 'text-[#F7F4EE] border-[#C6A87A]/60 hover:text-[#C6A87A] hover:border-[#C6A87A]'
          : 'text-[#1A1816] border-[#1A1816]/35 hover:text-[#9A7B4F] hover:border-[#9A7B4F]'
      }`}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

export function ZoneShowcaseSection({
  zone,
  brands,
  onExplore,
  isFiltered,
}: ZoneShowcaseProps) {
  if (brands.length === 0) return null;

  return (
    <section
      id={`zone-${zone.id}`}
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F7F4EE] text-[#1A1816] border-b border-[#DED5C7]"
    >
      <ScrollVideoBackground
        src={zone.video}
        poster={zone.poster}
        scenes={zone.scenes}
        triggerSelector={`#zone-${zone.id}`}
        label={zone.videoLabel}
        playbackSpeed={0.25}
        videoOpacityClassName="opacity-55"
        blendModeClassName="mix-blend-normal"
        overlayClassName={`bg-gradient-to-b ${zone.backdropTone}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <ZoneHeader
          zone={zone}
          visibleCount={brands.length}
          isFiltered={isFiltered}
        />

        {zone.id === 'fashion' && (
          <FashionLayout brands={brands} onExplore={onExplore} />
        )}

        {zone.id === 'footwear' && (
          <FootwearLayout brands={brands} onExplore={onExplore} />
        )}

        {zone.id === 'jewellery' && (
          <JewelleryLayout brands={brands} onExplore={onExplore} />
        )}

        {zone.id === 'beauty' && (
          <BeautyLayout brands={brands} onExplore={onExplore} />
        )}

        {zone.id === 'supermarket' && (
          <AnchorMonographLayout
            brand={brands[0]}
            onExplore={onExplore}
            isDark={false}
            highlightHeading="Showcase Highlights"
          />
        )}

        {zone.id === 'cinema' && (
          <AnchorMonographLayout
            brand={brands[0]}
            onExplore={onExplore}
            isDark={false}
            highlightHeading="Experience Highlights"
          />
        )}

        {zone.id === 'dining' && (
          <DiningLayout brands={brands} onExplore={onExplore} />
        )}
      </div>
    </section>
  );
}

function FashionLayout({
  brands,
  onExplore,
}: {
  brands: BrandFlagship[];
  onExplore: (b: BrandFlagship) => void;
}) {
  const featured = brands.find((b) => b.featured);
  const gallery = brands.filter((b) => b.id !== featured?.id);

  return (
    <div className="space-y-12">
      {featured && (
        <article className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-[#FAF8F4]/96 border border-[#DFD7C8] overflow-hidden shadow-xl">
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[#EAE3D7] overflow-hidden group">
            <ExhibitionImage
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
                {featured.category}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816] mb-4">
                {featured.name}
              </h3>
              {featured.description && (
                <p className="text-[15px] leading-relaxed text-[#474139] mb-6">
                  {featured.description}
                </p>
              )}
              <div className="border-t border-[#E6DED0] pt-4">
                <BrandMetaLine brand={featured} />
              </div>
            </div>
            <div className="pt-2">
              <ExploreAction
                label={featured.buttonLabel}
                onClick={() => onExplore(featured)}
                prominent
              />
            </div>
          </div>
        </article>
      )}

      {gallery.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-7">
          {gallery.map((brand, idx) => {
            const colSpan =
              gallery.length >= 4 && idx < 2
                ? 'md:col-span-3'
                : gallery.length >= 4
                ? 'md:col-span-2'
                : 'md:col-span-3';
            return (
              <article
                key={brand.id}
                className={`${colSpan} group flex flex-col bg-[#FAF8F4]/95 border border-[#DFD7C8] overflow-hidden shadow-lg transition-transform duration-200 hover:-translate-y-0.5`}
              >
                <div className="aspect-[4/3] bg-[#EAE3D7] overflow-hidden">
                  <ExhibitionImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <p className="text-xs tracking-[0.12em] uppercase text-[#7A6852] mb-1.5">
                      {brand.category}
                    </p>
                    <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-3">
                      {brand.name}
                    </h3>
                    <BrandMetaLine brand={brand} />
                  </div>
                  <div className="pt-3 border-t border-[#ECE4D7] flex items-center justify-between">
                    <ExploreAction
                      label={brand.buttonLabel}
                      onClick={() => onExplore(brand)}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FootwearLayout({
  brands,
  onExplore,
}: {
  brands: BrandFlagship[];
  onExplore: (b: BrandFlagship) => void;
}) {
  const anchors = brands.filter((b) => b.featured);
  const promenade = brands.filter((b) => !b.featured);

  return (
    <div className="space-y-12">
      {anchors.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {anchors.map((brand) => (
            <article
              key={brand.id}
              className="group bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DFD7C8] overflow-hidden flex flex-col shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#EAE3D7]">
                <ExhibitionImage
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
                    {brand.category}
                  </p>
                  <h3 className="font-serif text-3xl font-medium text-[#1A1816] mb-3">
                    {brand.name}
                  </h3>
                  {brand.description && (
                    <p className="text-[15px] leading-relaxed text-[#474139] mb-5">
                      {brand.description}
                    </p>
                  )}
                  <BrandMetaLine brand={brand} />
                </div>
                <div className="pt-4 border-t border-[#E6DED0]">
                  <ExploreAction
                    label={brand.buttonLabel}
                    onClick={() => onExplore(brand)}
                    prominent
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {promenade.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4 bg-[#FAF8F4]/80 px-4 py-2.5 border border-[#E5DDD0]">
            <p className="text-xs tracking-[0.16em] uppercase text-[#7A6852] font-medium">
              Footwear Promenade Gallery
            </p>
            <span className="text-xs text-[#7A6852] sm:hidden">
              Swipe to explore
            </span>
          </div>
          <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-2">
            {promenade.map((brand) => (
              <article
                key={brand.id}
                className="min-w-[275px] sm:min-w-[300px] lg:min-w-0 snap-start group bg-[#FAF8F4]/95 border border-[#DDD4C6] flex flex-col overflow-hidden shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D7]">
                  <ExhibitionImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.12em] uppercase text-[#7A6852] mb-1">
                      {brand.category}
                    </p>
                    <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-3">
                      {brand.name}
                    </h3>
                    <BrandMetaLine brand={brand} />
                  </div>
                  <div className="pt-3 border-t border-[#E6DED0]">
                    <ExploreAction
                      label={brand.buttonLabel}
                      onClick={() => onExplore(brand)}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function JewelleryLayout({
  brands,
  onExplore,
}: {
  brands: BrandFlagship[];
  onExplore: (b: BrandFlagship) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {brands.map((brand, idx) => (
        <article
          key={brand.id}
          className={`${
            idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
          } group bg-[#FAF8F4]/96 border border-[#DFD7C8] overflow-hidden flex flex-col shadow-lg`}
        >
          <div className="aspect-[16/10] overflow-hidden bg-[#EAE3D7]">
            <ExhibitionImage
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
                {brand.category}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816] mb-3">
                {brand.name}
              </h3>
              {brand.description && (
                <p className="text-[15px] leading-relaxed text-[#474139] mb-5">
                  {brand.description}
                </p>
              )}
              <BrandMetaLine brand={brand} />
            </div>
            <div className="pt-4 border-t border-[#E6DED0]">
              <ExploreAction
                label={brand.buttonLabel}
                onClick={() => onExplore(brand)}
                prominent
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function BeautyLayout({
  brands,
  onExplore,
}: {
  brands: BrandFlagship[];
  onExplore: (b: BrandFlagship) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {brands.map((brand) => (
        <article
          key={brand.id}
          className="group bg-[#FAF8F4]/96 border border-[#DFD7C8] overflow-hidden flex flex-col shadow-xl"
        >
          <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D7]">
            <ExhibitionImage
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
                {brand.category}
              </p>
              <h3 className="font-serif text-3xl font-medium text-[#1A1816] mb-3">
                {brand.name}
              </h3>
              {brand.description && (
                <p className="text-[15px] leading-relaxed text-[#474139] mb-5">
                  {brand.description}
                </p>
              )}
              <BrandMetaLine brand={brand} />
            </div>
            <div className="pt-4 border-t border-[#E6DED0]">
              <ExploreAction
                label={brand.buttonLabel}
                onClick={() => onExplore(brand)}
                prominent
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function AnchorMonographLayout({
  brand,
  onExplore,
  isDark,
  highlightHeading,
}: {
  brand: BrandFlagship;
  onExplore: (b: BrandFlagship) => void;
  isDark: boolean;
  highlightHeading: string;
}) {
  if (!brand) return null;

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden border shadow-xl ${
        isDark
          ? 'bg-[#191714]/94 border-[#38322A] text-[#F7F4EE]'
          : 'bg-[#FAF8F4]/96 border-[#DDD4C6] text-[#1A1816]'
      }`}
    >
      <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[450px] overflow-hidden group bg-[#24211D]">
        <ExhibitionImage
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between gap-6">
        <div>
          <p
            className={`text-xs tracking-[0.14em] uppercase mb-2 ${
              isDark ? 'text-[#C6A87A]' : 'text-[#7A6852]'
            }`}
          >
            {brand.category}
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-medium mb-2">
            {brand.name}
          </h3>
          {brand.type && (
            <p
              className={`text-xs tracking-[0.06em] mb-4 ${
                isDark ? 'text-[#BFB7AA]' : 'text-[#6E6254]'
              }`}
            >
              {brand.type}
            </p>
          )}
          {brand.description && (
            <p
              className={`text-[15px] leading-relaxed mb-6 ${
                isDark ? 'text-[#CFC7BA]' : 'text-[#474139]'
              }`}
            >
              {brand.description}
            </p>
          )}

          {brand.highlights && brand.highlights.length > 0 && (
            <div
              className={`border-t pt-4 mb-5 ${
                isDark ? 'border-[#322D25]' : 'border-[#E6DED0]'
              }`}
            >
              <p
                className={`text-[11px] tracking-[0.14em] uppercase mb-2.5 ${
                  isDark ? 'text-[#C6A87A]' : 'text-[#7A6852]'
                }`}
              >
                {highlightHeading}
              </p>
              <ul className="space-y-1.5 text-sm">
                {brand.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#9A7B4F]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className={`border-t pt-4 ${
              isDark ? 'border-[#322D25]' : 'border-[#E6DED0]'
            }`}
          >
            <BrandMetaLine brand={brand} isDark={isDark} />
          </div>
        </div>

        <div className="pt-2">
          <ExploreAction
            label={brand.buttonLabel}
            onClick={() => onExplore(brand)}
            isDark={isDark}
            prominent
          />
        </div>
      </div>
    </article>
  );
}

function DiningLayout({
  brands,
  onExplore,
}: {
  brands: BrandFlagship[];
  onExplore: (b: BrandFlagship) => void;
}) {
  const leadTriad = brands.slice(0, 3);
  const culinaryRest = brands.slice(3);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {leadTriad.map((brand) => (
          <article
            key={brand.id}
            className="group bg-[#FAF8F4]/95 border border-[#DFD7C8] overflow-hidden flex flex-col shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D7]">
              <ExhibitionImage
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-[11px] tracking-[0.12em] uppercase text-[#7A6852] truncate">
                    {brand.category}
                  </span>
                  {brand.rating && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1816] tabular-nums shrink-0">
                      <Star className="w-3.5 h-3.5 fill-[#9A7B4F] text-[#9A7B4F]" />
                      {brand.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-3">
                  {brand.name}
                </h3>
                <BrandMetaLine brand={brand} />
              </div>
              <div className="pt-3 border-t border-[#ECE4D7]">
                <ExploreAction
                  label={brand.buttonLabel}
                  onClick={() => onExplore(brand)}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {culinaryRest.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5 bg-[#FAF8F4]/85 px-5 py-3 border border-[#DFD7C8]">
            <p className="text-xs tracking-[0.16em] uppercase text-[#7A6852] font-medium">
              Culinary Salon & Bistro Collection
            </p>
            <span className="text-xs text-[#7A6852] tabular-nums">
              Second Floor · Level 2
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {culinaryRest.map((brand) => (
              <article
                key={brand.id}
                className="group bg-[#FAF8F4]/95 border border-[#DFD7C8] overflow-hidden flex flex-col shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D7]">
                  <ExhibitionImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span className="text-[11px] tracking-[0.12em] uppercase text-[#7A6852] truncate">
                        {brand.category}
                      </span>
                      {brand.rating && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1816] tabular-nums shrink-0">
                          <Star className="w-3.5 h-3.5 fill-[#9A7B4F] text-[#9A7B4F]" />
                          {brand.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-3">
                      {brand.name}
                    </h3>
                    <BrandMetaLine brand={brand} />
                  </div>
                  <div className="pt-3 border-t border-[#ECE4D7]">
                    <ExploreAction
                      label={brand.buttonLabel}
                      onClick={() => onExplore(brand)}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
