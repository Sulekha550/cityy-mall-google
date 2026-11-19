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
        className="relative overflow-hidden min-h-[100vh] flex items-center py-16 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-transparent"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.mallHero}
          variant="hero"
          eager
          playbackRate={0.25}
          videoOpacityClassName="opacity-88 dark:opacity-78"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6" data-motion="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#0E7C71] dark:text-[#5EEAD4]">
              <MapPin className="w-4 h-4" />
              <span>Visitor Orientation</span>
            </span>

            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              Visit{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                {MALL_IDENTITY.name}
              </span>
            </h1>

            <p className="font-display text-xl sm:text-2xl text-[#C9523C] dark:text-[#F48C74]">
              {MALL_IDENTITY.city}, {MALL_IDENTITY.state}, {MALL_IDENTITY.country}
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              Premier shopping, fine jewellery, INOX multiplex &amp; dining promenade.
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
              className="relative aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 group bg-[#152427]"
            >
              <ResilientImage
                src={VIDEO_ASSETS.visitUsEntrance.fallbackImage}
                alt="CITY MALL Gorakhpur arrival courtyard"
                priority
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white bg-black/70 px-3 py-1 rounded-full backdrop-blur-md">
                  Central Arrival Courtyard
                </span>
                <span className="text-[10px] font-mono text-[#5EEAD4] bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-md">
                  10:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Personal Visit Checklist Planner over Architecture Video */}
      <section
        ref={plannerRef}
        className="relative overflow-hidden py-20 sm:py-24 bg-transparent"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.mallHero}
          variant="hero"
          playbackRate={0.25}
          videoOpacityClassName="opacity-88 dark:opacity-78"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4" data-motion="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#683BA4] dark:text-[#BFA1FF]">
              <Compass className="w-4 h-4" />
              <span>Day-Outing Planner</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              Organize Your Outing Across{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#0D9488] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
                Seven Wings
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
              Plan your boutique, dining, and cinema stops across all levels.
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
