import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

const SPOTLIGHT_IDS = [
  'louis-philippe',
  'w-for-woman',
  'adidas',
  'tanishq',
  'looks-salon',
  'spencers',
];

export function HomeBrandSpotlightSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [selectedId, setSelectedId] = useState(SPOTLIGHT_IDS[0]);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  const spotlightBrands = SPOTLIGHT_IDS.map((id) =>
    APPROVED_BRANDS.find((b) => b.id === id)
  ).filter(Boolean);

  const active =
    spotlightBrands.find((b) => b.id === selectedId) || spotlightBrands[0];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#EFE6FA] dark:bg-[#1D1630]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.fashionRetail}
        playbackRate={0.75}
        videoOpacityClassName="opacity-76 dark:opacity-68"
        tintClassName="bg-gradient-to-tr from-[#EFE6FA]/88 via-[#FAE4EC]/44 to-[#FBF4EB]/82 dark:from-[#1D1630]/88 dark:via-[#231526]/48 dark:to-[#151021]/84"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF] mb-2">
              Interactive House Stage
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Signature Retail Destinations
            </h2>
          </div>
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#683BA4] dark:hover:text-[#BFA1FF] transition-colors shrink-0"
          >
            <span>See All 27 Outlets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Split Stage (No Card Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive List Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#2D1D48]/14 dark:divide-[#E2D4FF]/14 border-y border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/78 dark:bg-[#191326]/78">
            {spotlightBrands.map((brand, idx) => {
              const isSelected = brand.id === active.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => setSelectedId(brand.id)}
                  className={`w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B1325] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021]'
                      : 'hover:bg-[#EFE6FA]/70 dark:hover:bg-[#271F3F] text-[#1B1325] dark:text-[#F6EFE7]'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-xs font-medium opacity-70 tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xl font-semibold truncate">
                        {brand.name}
                      </p>
                      <p
                        className={`text-xs truncate ${
                          isSelected
                            ? 'text-[#F6EFE7]/80 dark:text-[#151021]/80'
                            : 'text-[#5D5070] dark:text-[#B5A7D0]'
                        }`}
                      >
                        {brand.categoryName}
                      </p>
                    </div>
                  </div>
                  <BrandInsignia
                    monogram={brand.monogram}
                    accentColor={brand.accentColor}
                    size="sm"
                  />
                </button>
              );
            })}
          </div>

          {/* Large Overlapping Showcase Display */}
          <div className="lg:col-span-7 relative flex flex-col justify-end min-h-[420px] sm:min-h-[480px] border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 overflow-hidden bg-[#1B1325]">
            <ResilientImage
              src={active.image}
              alt={active.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/88 via-[#151021]/30 to-transparent" />

            <div className="relative z-10 p-7 sm:p-9 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-[#F6EFE7]">
              <div className="space-y-2 max-w-md">
                <p className="text-xs tracking-[0.16em] uppercase text-[#F48C74] font-semibold">
                  {active.categoryName}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl font-semibold">
                  {active.name}
                </h3>
                <p className="text-sm text-[#D8CEE9]">{active.tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => onInspectBrand(active)}
                className="px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-semibold bg-[#FBF4EB] text-[#151021] hover:bg-[#F48C74] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-end"
              >
                View House
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
