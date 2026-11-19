import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

// Curated Seasonal Experiences & Atrium Highlights
const SEASONAL_THEMES = [
  {
    id: 'festive-atrium',
    tag: 'Festive Atrium · Season Highlights',
    title: 'Festive Wardrobe & Jewellery Gatherings',
    summary:
      'Festive gold at Tanishq, fusion wear at W & Looks Salon styling.',
    relatedBrandIds: ['tanishq', 'w-for-woman', 'looks-salon'],
    image: ARCHITECTURAL_GALLERY[4],
    timing: 'Daily · 10:00 AM – 10:00 PM',
    location: 'Central Atrium & Ground Floor',
  },
  {
    id: 'weekend-family',
    tag: 'Weekend Special · Movies & Dining',
    title: 'Cinema & Family Buffet Evenings',
    summary:
      'Laser blockbusters at INOX & live grills at Barbeque Nation.',
    relatedBrandIds: ['inox-cinemas', 'barbeque-nation', 'pind-balluchi'],
    image: ARCHITECTURAL_GALLERY[11],
    timing: 'Every Weekend · 11:00 AM – 11:00 PM',
    location: 'Third Floor & Multiplex Level',
  },
  {
    id: 'active-campus',
    tag: 'Sport & Lifestyle · Activewear',
    title: 'Athletic Footwear & Weekend Style Walk',
    summary:
      'Athletic trainers at Adidas, Puma & casuals at Levi’s Store.',
    relatedBrandIds: ['adidas', 'puma', 'levis-store'],
    image: ARCHITECTURAL_GALLERY[9],
    timing: 'Daily · Mall Hours',
    location: 'First & Second Floor Promenade',
  },
];

export function WhatsOnPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const [selectedThemeId, setSelectedThemeId] = useState(SEASONAL_THEMES[0].id);

  const selectedTheme =
    SEASONAL_THEMES.find((t) => t.id === selectedThemeId) ||
    SEASONAL_THEMES[0];

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
    <div className="bg-[#FBF4EB] dark:bg-[#151021] text-[#1B1325] dark:text-[#F6EFE7]">
      {/* Section 1: What's On Atrium Showcase */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[92vh] flex items-center py-12 sm:py-16 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.events}
          eager
          playbackRate={0.76}
          videoOpacityClassName="opacity-80 dark:opacity-72"
          tintClassName="bg-gradient-to-tr from-[#FAE4EC]/88 via-[#EFE6FA]/48 to-[#FDE8DF]/84 dark:from-[#231526]/90 dark:via-[#1D1630]/54 dark:to-[#151021]/84"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header area - clean, compact, consistent with other pages */}
          <div className="max-w-2xl space-y-2.5" data-motion="reveal">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] bg-[#C9523C]/10 dark:bg-[#F48C74]/15 text-[#C9523C] dark:text-[#F48C74]">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Events &amp; Happenings · {MALL_IDENTITY.name}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1325] dark:text-[#F6EFE7]">
              What&apos;s On at CITY MALL
            </h1>

            <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
              Seasonal showcases, festive collections &amp; weekend screenings.
            </p>
          </div>

          {/* Interactive Seasonal Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Theme Selector Tabs */}
            <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-center">
              {SEASONAL_THEMES.map((themeItem) => {
                const isSelected = themeItem.id === selectedTheme.id;
                return (
                  <button
                    key={themeItem.id}
                    type="button"
                    onClick={() => setSelectedThemeId(themeItem.id)}
                    className={`w-full text-left p-4 rounded-sm border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-[#1B1325] dark:border-[#F48C74] shadow-md -translate-y-0.5'
                        : 'bg-[#FFFBF6]/90 dark:bg-[#191326]/90 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 hover:border-[#C9523C] dark:hover:border-[#F48C74]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
                        {themeItem.tag}
                      </span>
                      <span className="text-[10px] font-mono opacity-70">
                        {themeItem.timing.split('·')[0].trim()}
                      </span>
                    </div>
                    <h2 className="font-display text-sm sm:text-base font-semibold mt-1">
                      {themeItem.title}
                    </h2>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Experience Showcase Card */}
            <div className="lg:col-span-7 border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FFFBF6]/95 dark:bg-[#191326]/95 rounded-sm overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-[#151021] relative">
                <ResilientImage
                  src={selectedTheme.image}
                  alt={selectedTheme.title}
                  priority
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-white text-[10px] font-semibold uppercase tracking-wider">
                  {selectedTheme.tag.split('·')[0].trim()}
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-3.5">
                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1B1325] dark:text-[#F6EFE7]">
                    {selectedTheme.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
                    {selectedTheme.summary}
                  </p>
                </div>

                {/* Info strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5D5070] dark:text-[#B5A7D0] font-mono pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9523C] dark:text-[#F48C74]" />
                    <span>{selectedTheme.timing}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9523C] dark:text-[#F48C74]" />
                    <span>{selectedTheme.location}</span>
                  </div>
                </div>

                {/* Featured Participating Outlets */}
                <div className="pt-3 border-t border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#683BA4] dark:text-[#BFA1FF]">
                    Participating Outlets
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featuredOutlets.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => onInspectBrand?.(brand)}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#EFE6FA]/60 dark:bg-[#241B3B]/80 hover:border-[#C9523C] text-left transition-colors cursor-pointer"
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
        </div>
      </section>

      {/* Section 2: Year-Round Visitor Direction */}
      <section
        ref={showcaseRef}
        className="relative overflow-hidden py-14 sm:py-18 bg-[#FBF4EB] dark:bg-[#151021] border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.brandsStorefronts}
          playbackRate={0.75}
          videoOpacityClassName="opacity-72 dark:opacity-64"
          tintClassName="bg-gradient-to-b from-[#FBF4EB]/88 via-[#E4F5F0]/46 to-[#EFE6FA]/88 dark:from-[#151021]/90 dark:via-[#112226]/52 dark:to-[#1D1630]/90"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E7C71] dark:text-[#5EEAD4]">
            Year-Round Experiences
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1B1325] dark:text-[#F6EFE7]">
            Explore Every Wing at Your Own Pace
          </h2>
          <p className="text-xs sm:text-sm text-[#433754] dark:text-[#D8CEE9] max-w-lg mx-auto leading-relaxed">
            In-mall festive announcements, outlet launches, and movie showtimes are displayed daily at the central concierge desk of CITY MALL, Gorakhpur.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity"
            >
              <span>Browse All Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/visit-us"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 bg-[#FFFBF6]/85 dark:bg-[#191326]/85 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#683BA4] transition-colors"
            >
              <span>Visitor Orientation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
