import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { SCENE_IMAGES } from '../assets/imageRegistry';
import { APPROVED_BRANDS } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

export function HomeDiningPanoramaSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const diningHouses = APPROVED_BRANDS.filter((b) => b.categoryId === 'dining');
  const [activeId, setActiveId] = useState(diningHouses[0]?.id || 'barbeque-nation');

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  const activeVenue =
    diningHouses.find((d) => d.id === activeId) || diningHouses[0];

  return (
    <section
      ref={sectionRef}
      id="home-dining"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FDE8DF] dark:bg-[#241724]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.dining}
        variant="dining"
        videoOpacityClassName="opacity-84 dark:opacity-76"
        tintClassName="bg-gradient-to-br from-[#FDE8DF]/76 via-[#FBF4EB]/32 to-[#EFE6FA]/68 dark:from-[#241724]/78 dark:via-[#1D1630]/38 dark:to-[#151021]/74"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10 w-full">
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C9523C] dark:text-[#F48C74]">
              Culinary &amp; Banquet Promenade
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Signature Culinary Destinations
            </h2>
          </div>

          <Link
            to="/dining"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase pb-1.5 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors shrink-0"
          >
            <span>Explore Culinary Avenue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Sequential Culinary Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative">
            {/* Sequential Image 1: Main Active Culinary Outlet (Enters First) */}
            <div
              data-motion="seq-img"
              data-seq-index="0"
              data-seq-from="up"
              className="w-full relative aspect-[16/11] border border-[#2D1D48]/18 dark:border-[#E2D4FF]/20 overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38] shadow-2xl"
            >
              {activeVenue && (
                <ResilientImage
                  key={activeVenue.id}
                  src={activeVenue.image}
                  alt={activeVenue.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/86 via-[#151021]/25 to-transparent" />

              {activeVenue && (
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4 text-[#F6EFE7]">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#F48C74] font-semibold">
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Culinary Outlet</span>
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold">
                      {activeVenue.name}
                    </h3>
                    <p className="text-sm text-[#D8CEE9] max-w-md">
                      {activeVenue.tagline}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onInspectBrand(activeVenue)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] bg-[#FBF4EB] text-[#151021] hover:bg-[#F48C74] transition-colors cursor-pointer shrink-0"
                  >
                    Details
                  </button>
                </div>
              )}
            </div>

            {/* Sequential Image 2: Secondary Ambient Dining Salon Frame (Enters Second with Stagger) */}
            <div
              data-motion="seq-img"
              data-seq-index="1"
              data-seq-from="right"
              className="absolute -right-3 sm:-right-6 -bottom-5 w-[42%] aspect-[4/3] border-2 border-[#FBF4EB] dark:border-[#151021] shadow-2xl overflow-hidden hidden sm:block bg-[#1B1325]"
            >
              <ResilientImage
                src={SCENE_IMAGES.diningScene3}
                alt="Culinary salon atmosphere"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-1.5 left-2 text-[9px] font-mono uppercase tracking-wider text-white">
                Dining Salon
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
              Select a restaurant or dining house to preview its table atmosphere inside CITY MALL, Gorakhpur:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diningHouses.map((venue, idx) => {
                const isSelected = venue.id === activeVenue?.id;
                return (
                  <button
                    key={venue.id}
                    type="button"
                    onClick={() => setActiveId(venue.id)}
                    className={`flex items-center justify-between gap-3 p-3.5 text-left border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                        : 'bg-[#FFFBF6]/84 dark:bg-[#191326]/84 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 hover:border-[#C9523C] dark:hover:border-[#F48C74]'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="block text-[10px] font-medium opacity-70 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-base font-semibold block truncate">
                        {venue.name}
                      </span>
                    </div>
                    <BrandInsignia
                      monogram={venue.monogram}
                      accentColor={venue.accentColor}
                      size="sm"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
