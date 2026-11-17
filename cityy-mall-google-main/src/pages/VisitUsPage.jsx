import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Compass, MapPin, Navigation } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { BRAND_CATEGORIES, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

export function VisitUsPage() {
  const heroRef = useRef(null);
  const plannerRef = useRef(null);
  const [selectedInterest, setSelectedInterest] = useState('Shopping & Fashion');
  const [visitorNote, setVisitorNote] = useState('');
  const [savedItinerary, setSavedItinerary] = useState(null);

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanPlanner = registerSectionMotion(plannerRef.current, 'cascade');
    return () => {
      cleanHero();
      cleanPlanner();
    };
  }, []);

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    setSavedItinerary({
      interest: selectedInterest,
      note:
        visitorNote.trim() ||
        'Prepared personal visit checklist for CITY MALL, Gorakhpur.',
    });
  };

  return (
    <div>
      {/* Section 1: Arrival Courtyard Hero over Visit Us Entrance Video */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[100vh] flex items-center py-16 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E4F5F0] dark:bg-[#112226]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.visitUsEntrance}
          eager
          playbackRate={0.78}
          videoOpacityClassName="opacity-80 dark:opacity-72"
          tintClassName="bg-gradient-to-tr from-[#E4F5F0]/88 via-[#FBF4EB]/48 to-[#EFE6FA]/82 dark:from-[#112226]/90 dark:via-[#151021]/55 dark:to-[#1D1630]/86"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6" data-motion="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#0E7C71] dark:text-[#5EEAD4]">
              <MapPin className="w-4 h-4" />
              <span>Visitor Orientation</span>
            </span>

            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              Visit {MALL_IDENTITY.name}
            </h1>

            <p className="font-display text-xl sm:text-2xl text-[#C9523C] dark:text-[#F48C74]">
              {MALL_IDENTITY.city}, {MALL_IDENTITY.state}, {MALL_IDENTITY.country}
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              Welcome to CITY MALL, Gorakhpur—bringing together marquee fashion and sportswear labels, Tanishq and Titan World, Looks Salon, Spencer&apos;s hypermarket, INOX Cinemas, and premier dining destinations under one roof.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/brands"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#5EEAD4] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90"
              >
                Explore Brand Showcase
              </Link>
              <Link
                to="/discover"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] border border-[#2D1D48]/28 dark:border-[#E2D4FF]/28 bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7]"
              >
                Spatial Discovery
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              data-parallax="up"
              className="border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#152427]/92 overflow-hidden shadow-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ResilientImage
                  src={VIDEO_ASSETS.visitUsEntrance.fallbackImage}
                  alt="CITY MALL Gorakhpur arrival courtyard"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-7 space-y-2">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4]">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Destination Summary</span>
                </p>
                <p className="text-sm text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
                  Directory signage and information desks inside CITY MALL, Gorakhpur assist guests to all retail, hospitality, salon, and cinema wings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Personal Visit Checklist Planner over Architecture Video */}
      <section
        ref={plannerRef}
        className="relative overflow-hidden py-20 sm:py-24 bg-[#FBF4EB] dark:bg-[#151021]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.architecture}
          playbackRate={0.75}
          videoOpacityClassName="opacity-72 dark:opacity-64"
          tintClassName="bg-gradient-to-b from-[#FBF4EB]/88 via-[#EFE6FA]/50 to-[#FDE8DF]/88 dark:from-[#151021]/90 dark:via-[#1D1630]/56 dark:to-[#241724]/90"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4" data-motion="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#683BA4] dark:text-[#BFA1FF]">
              <Compass className="w-4 h-4" />
              <span>Day-Outing Planner</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Organize Your Outing Across Seven Wings
            </h2>
            <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
              Choose your focus area and prepare a quick session checklist of stores, cinema, or dining stops you want to explore inside CITY MALL, Gorakhpur.
            </p>

            <ul className="pt-2 space-y-2.5 text-sm text-[#433754] dark:text-[#D8CEE9]">
              {BRAND_CATEGORIES.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between border-b border-[#2D1D48]/12 dark:border-[#E2D4FF]/12 pb-2"
                >
                  <span className="font-medium">{cat.title}</span>
                  <Link
                    to={cat.route}
                    className="text-xs font-semibold text-[#C9523C] dark:text-[#F48C74] hover:underline"
                  >
                    Open →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 p-7 sm:p-9 shadow-xl">
            <form onSubmit={handlePlanSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5D5070] dark:text-[#B5A7D0] mb-3">
                  Primary Visit Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Shopping & Fashion',
                    'Footwear & Sports',
                    'Tanishq & Watches',
                    'Beauty & Spencer’s',
                    'INOX Cinemas',
                    'Family Dining',
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedInterest(option)}
                      className={`px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                        selectedInterest === option
                          ? 'bg-[#683BA4] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                          : 'bg-transparent text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 hover:border-[#683BA4]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="visit-notes"
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5D5070] dark:text-[#B5A7D0] mb-2"
                >
                  Outlets or Stops to Include
                </label>
                <textarea
                  id="visit-notes"
                  rows={3}
                  value={visitorNote}
                  onChange={(e) => setVisitorNote(e.target.value)}
                  placeholder="Example: Levi's Store, Tanishq, INOX evening movie, and Barbeque Nation dinner..."
                  className="w-full p-3.5 text-sm border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 bg-[#FBF4EB] dark:bg-[#151021] text-[#1B1325] dark:text-[#F6EFE7] placeholder:text-[#5D5070] dark:placeholder:text-[#B5A7D0] focus:outline-none focus:border-[#683BA4]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 cursor-pointer"
              >
                Prepare Visit Checklist
              </button>
            </form>

            {savedItinerary && (
              <div className="mt-6 p-4 border border-[#0E7C71]/35 bg-[#E4F5F0]/80 dark:bg-[#112226]/85 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0E7C71] dark:text-[#5EEAD4] shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                    Visit Note Prepared · {savedItinerary.interest}
                  </p>
                  <p className="text-[#433754] dark:text-[#D8CEE9]">
                    {savedItinerary.note}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
