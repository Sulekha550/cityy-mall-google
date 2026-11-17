import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, UtensilsCrossed } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

export function DiningPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const diningVenues = APPROVED_BRANDS.filter((b) => b.categoryId === 'dining');
  const [featuredId, setFeaturedId] = useState(
    diningVenues[0]?.id || 'barbeque-nation'
  );

  const featuredVenue =
    diningVenues.find((d) => d.id === featuredId) || diningVenues[0];

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanGallery = registerSectionMotion(galleryRef.current, 'cascade');
    return () => {
      cleanHero();
      cleanGallery();
    };
  }, []);

  return (
    <div>
      {/* Section 1: Dining Promenade Hero over Dining Video */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FDE8DF] dark:bg-[#241724]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.dining}
          eager
          playbackRate={0.78}
          videoOpacityClassName="opacity-80 dark:opacity-72"
          tintClassName="bg-gradient-to-tr from-[#FDE8DF]/88 via-[#FBF4EB]/46 to-[#EFE6FA]/80 dark:from-[#241724]/90 dark:via-[#1D1630]/54 dark:to-[#151021]/84"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6" data-motion="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#C9523C] dark:text-[#F48C74]">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Culinary Avenue · {MALL_IDENTITY.city}</span>
            </span>

            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              Nine Hospitality &amp; Restaurant Destinations
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              From live table grills and banquet hospitality to North Indian classics, South Indian dosas, wood-fired style pizzas, and quick family favourites inside CITY MALL, Gorakhpur.
            </p>

            {/* Quick Spotlight Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              {diningVenues.map((venue) => {
                const isSelected = venue.id === featuredVenue?.id;
                return (
                  <button
                    key={venue.id}
                    type="button"
                    onClick={() => setFeaturedId(venue.id)}
                    className={`px-3 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                        : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#C9523C]'
                    }`}
                  >
                    {venue.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spotlight Interactive Frame */}
          {featuredVenue && (
            <div className="lg:col-span-6">
              <div className="border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#1E1420]/92 overflow-hidden shadow-2xl">
                <div className="aspect-[16/10] overflow-hidden bg-[#151021]">
                  <ResilientImage
                    src={featuredVenue.image}
                    alt={featuredVenue.name}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#C9523C] dark:text-[#F48C74]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Dining Spotlight</span>
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                      {featuredVenue.name}
                    </h2>
                    <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
                      {featuredVenue.tagline}
                    </p>
                    <button
                      type="button"
                      onClick={() => onInspectBrand(featuredVenue)}
                      className="pt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] cursor-pointer"
                    >
                      <span>Open Venue Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <BrandInsignia
                    monogram={featuredVenue.monogram}
                    accentColor={featuredVenue.accentColor}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Alternating Asymmetric Dining Cadence over Architecture Video */}
      <section
        ref={galleryRef}
        className="relative overflow-hidden py-20 sm:py-28 bg-[#FBF4EB] dark:bg-[#151021]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.architecture}
          playbackRate={0.74}
          videoOpacityClassName="opacity-70 dark:opacity-62"
          tintClassName="bg-gradient-to-b from-[#FBF4EB]/88 via-[#EFE6FA]/52 to-[#FDE8DF]/88 dark:from-[#151021]/90 dark:via-[#1D1630]/58 dark:to-[#241724]/90"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-14">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 pb-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#683BA4] dark:text-[#BFA1FF] mb-2">
                Complete Table Directory
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                All Nine Restaurants &amp; Dining Venues
              </h2>
            </div>
            <img
              src={ARCHITECTURAL_GALLERY[10]}
              alt="Culinary terrace ambience inside CITY MALL"
              className="hidden md:block w-36 h-20 object-cover border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18"
            />
          </div>

          <div className="space-y-8">
            {diningVenues.map((venue, idx) => {
              const reversed = idx % 2 === 1;
              return (
                <article
                  key={venue.id}
                  data-motion="reveal"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 overflow-hidden"
                >
                  <div
                    className={`lg:col-span-5 aspect-[16/10] overflow-hidden bg-[#151021] ${
                      reversed ? 'lg:order-2' : ''
                    }`}
                  >
                    <ResilientImage
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div
                    className={`lg:col-span-7 p-6 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                      reversed ? 'lg:order-1' : ''
                    }`}
                  >
                    <div className="space-y-2 max-w-xl">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C9523C] dark:text-[#F48C74] tabular-nums">
                        Table 0{idx + 1} · {venue.categoryName}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                        {venue.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9]">
                        {venue.tagline}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 shrink-0">
                      <BrandInsignia
                        monogram={venue.monogram}
                        accentColor={venue.accentColor}
                      />
                      <button
                        type="button"
                        onClick={() => onInspectBrand(venue)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] border border-[#2D1D48]/24 dark:border-[#E2D4FF]/24 hover:bg-[#1B1325] hover:text-[#FBF4EB] dark:hover:bg-[#F48C74] dark:hover:text-[#151021] transition-colors cursor-pointer"
                      >
                        Inspect Table
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
