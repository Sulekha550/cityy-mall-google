import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Sparkles } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

// Clearly marked sample event showcase concepts (no fabricated dates, guests, or discounts)
const SAMPLE_SEASONAL_THEMES = [
  {
    id: 'festive-atrium',
    tag: 'Sample Concept Placeholder · Atrium Season',
    title: 'Festive Season Wardrobe & Jewellery Gatherings',
    summary:
      'Sample seasonal concept celebrating Indian festive dressing, luxury hair & grooming with Looks Salon, ceremonial gold showcases at Tanishq, and contemporary ethnic looks at W for Woman.',
    relatedBrandIds: ['tanishq', 'w-for-woman', 'looks-salon'],
    image: ARCHITECTURAL_GALLERY[4],
  },
  {
    id: 'weekend-family',
    tag: 'Sample Concept Placeholder · Weekend Evening',
    title: 'Cinema & Family Buffet Evenings',
    summary:
      'Sample weekend concept combining feature films at INOX Cinemas with group grill dining at Barbeque Nation, North Indian tables at Pind Balluchi, and desserts or treats along the dining concourse.',
    relatedBrandIds: ['inox-cinemas', 'barbeque-nation', 'pind-balluchi'],
    image: ARCHITECTURAL_GALLERY[11],
  },
  {
    id: 'active-campus',
    tag: 'Sample Concept Placeholder · Lifestyle & Sports',
    title: 'Active Footwear & Weekend Style Walkthrough',
    summary:
      'Sample retail theme highlighting performance trainers at Adidas, Puma, and Skechers alongside denim icons at Levi’s Store, Flying Machine, and Allen Solly.',
    relatedBrandIds: ['adidas', 'puma', 'levis-store'],
    image: ARCHITECTURAL_GALLERY[9],
  },
];

export function WhatsOnPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const [selectedThemeId, setSelectedThemeId] = useState(
    SAMPLE_SEASONAL_THEMES[0].id
  );

  const selectedTheme =
    SAMPLE_SEASONAL_THEMES.find((t) => t.id === selectedThemeId) ||
    SAMPLE_SEASONAL_THEMES[0];

  const featuredOutlets = selectedTheme.relatedBrandIds
    .map((id) => APPROVED_BRANDS.find((b) => b.id === id))
    .filter(Boolean);

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanShowcase = registerSectionMotion(showcaseRef.current, 'cascade');
    return () => {
      cleanHero();
      cleanShowcase();
    };
  }, []);

  return (
    <div>
      {/* Section 1: What's On Atrium Showcase over Events Video */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[100vh] flex items-center py-16 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FAE4EC] dark:bg-[#231526]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.events}
          eager
          playbackRate={0.76}
          videoOpacityClassName="opacity-80 dark:opacity-72"
          tintClassName="bg-gradient-to-tr from-[#FAE4EC]/88 via-[#EFE6FA]/48 to-[#FDE8DF]/84 dark:from-[#231526]/90 dark:via-[#1D1630]/54 dark:to-[#151021]/84"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="max-w-3xl space-y-4" data-motion="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#C9523C] dark:text-[#F48C74]">
              <CalendarDays className="w-4 h-4" />
              <span>Seasonal Atrium Highlights · {MALL_IDENTITY.city}</span>
            </span>

            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              What&apos;s On at CITY MALL
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              Explore sample seasonal atmosphere themes pairing CITY MALL&apos;s approved retail, hospitality, beauty, and multiplex outlets across Gorakhpur.
            </p>
          </div>

          {/* Interactive Sample Seasonal Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              {SAMPLE_SEASONAL_THEMES.map((themeItem) => {
                const isSelected = themeItem.id === selectedTheme.id;
                return (
                  <button
                    key={themeItem.id}
                    type="button"
                    onClick={() => setSelectedThemeId(themeItem.id)}
                    className={`w-full text-left p-5 border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                        : 'bg-[#FFFBF6]/90 dark:bg-[#191326]/90 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 hover:border-[#C9523C]'
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider opacity-75">
                      {themeItem.tag}
                    </p>
                    <h2 className="font-display text-xl sm:text-2xl font-semibold mt-1">
                      {themeItem.title}
                    </h2>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 overflow-hidden shadow-2xl">
              <div className="aspect-[16/9] overflow-hidden bg-[#151021]">
                <ResilientImage
                  src={selectedTheme.image}
                  alt={selectedTheme.title}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#683BA4] dark:text-[#BFA1FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedTheme.tag}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                  {selectedTheme.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
                  {selectedTheme.summary}
                </p>

                <div className="pt-4 border-t border-[#2D1D48]/12 dark:border-[#E2D4FF]/12 flex flex-wrap gap-3">
                  {featuredOutlets.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => onInspectBrand(brand)}
                      className="inline-flex items-center gap-2.5 px-3 py-2 border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#EFE6FA]/75 dark:bg-[#241B3B] hover:border-[#C9523C] cursor-pointer"
                    >
                      <BrandInsignia
                        monogram={brand.monogram}
                        accentColor={brand.accentColor}
                        size="sm"
                      />
                      <span className="text-xs font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                        {brand.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Seasonal Storefront Promenade over Storefronts Video */}
      <section
        ref={showcaseRef}
        className="relative overflow-hidden py-20 sm:py-24 bg-[#FBF4EB] dark:bg-[#151021]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.brandsStorefronts}
          playbackRate={0.75}
          videoOpacityClassName="opacity-72 dark:opacity-64"
          tintClassName="bg-gradient-to-b from-[#FBF4EB]/88 via-[#E4F5F0]/46 to-[#EFE6FA]/88 dark:from-[#151021]/90 dark:via-[#112226]/52 dark:to-[#1D1630]/90"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E7C71] dark:text-[#5EEAD4]">
            Year-Round Experiences
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7] max-w-2xl mx-auto">
            Explore Every Wing at Your Own Pace
          </h2>
          <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9] max-w-xl mx-auto">
            In-mall festive announcements and outlet launches are displayed inside the atrium concierge of CITY MALL, Gorakhpur.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/brands"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90"
            >
              Browse All Brands
            </Link>
            <Link
              to="/visit-us"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] border border-[#2D1D48]/26 dark:border-[#E2D4FF]/26 bg-[#FFFBF6]/85 dark:bg-[#191326]/85 text-[#1B1325] dark:text-[#F6EFE7]"
            >
              Visitor Orientation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
