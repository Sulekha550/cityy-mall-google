import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Info, Ticket } from 'lucide-react';
import { CINEMA_POSTER_ASSETS, VIDEO_ASSETS } from '../assets/mediaManifest';
import {
  APPROVED_BRANDS,
  MALL_IDENTITY,
  SAMPLE_CINEMA_FEATURES,
} from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

export function EntertainmentPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const inox = APPROVED_BRANDS.find((b) => b.id === 'inox-cinemas');
  const [selectedFeatureId, setSelectedFeatureId] = useState(
    SAMPLE_CINEMA_FEATURES[0].id
  );

  const selectedFeature =
    SAMPLE_CINEMA_FEATURES.find((f) => f.id === selectedFeatureId) ||
    SAMPLE_CINEMA_FEATURES[0];

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanFeatures = registerSectionMotion(featuresRef.current, 'cascade');
    return () => {
      cleanHero();
      cleanFeatures();
    };
  }, []);

  return (
    <div>
      {/* Section 1: INOX Cinemas Theatrical Hero over Cinema Video */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[100vh] flex items-center py-16 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#E6F1FC] dark:bg-[#131C2E]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.cinema}
          eager
          playbackRate={0.78}
          videoOpacityClassName="opacity-82 dark:opacity-74"
          tintClassName="bg-gradient-to-tr from-[#E6F1FC]/88 via-[#EFE6FA]/48 to-[#FBF4EB]/82 dark:from-[#131C2E]/90 dark:via-[#1D1630]/54 dark:to-[#151021]/84"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6" data-motion="reveal">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              <Film className="w-4 h-4" />
              <span>Entertainment &amp; Multiplex · {MALL_IDENTITY.city}</span>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
                INOX Cinemas
              </h1>
              {inox && (
                <BrandInsignia
                  monogram={inox.monogram}
                  accentColor={inox.accentColor}
                  size="lg"
                />
              )}
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-[#433754] dark:text-[#D8CEE9] max-w-2xl">
              The premier multiplex screen destination inside CITY MALL, Gorakhpur—bringing national Hindi, English, and regional theatrical releases right alongside family dining and retail avenues.
            </p>

            {/* Honest Box Office & Official Channel Note */}
            <div className="p-5 border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/90 dark:bg-[#151B31]/90 space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4]">
                <Ticket className="w-4 h-4" />
                <span>Showtime &amp; Box Office Guidance</span>
              </div>
              <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
                For live movie schedules, current seat availability, and bookings at CITY MALL, Gorakhpur, please visit the INOX Cinemas box office desk in person or check official INOX booking channels directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {inox && (
                <button
                  type="button"
                  onClick={() => onInspectBrand(inox)}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 cursor-pointer"
                >
                  Inspect Multiplex Overview
                </button>
              )}
              <Link
                to="/dining"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] border border-[#2D1D48]/28 dark:border-[#E2D4FF]/28 bg-[#FFFBF6]/85 dark:bg-[#151B31]/85 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#C9523C]"
              >
                <span>Pair With Mall Dining</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Widescreen Multiplex Dome Image Frame */}
          <div className="lg:col-span-5">
            <div
              data-parallax="up"
              className="border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 bg-[#151021] overflow-hidden shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ResilientImage
                  src={CINEMA_POSTER_ASSETS.domeFrame}
                  alt="INOX Cinemas multiplex lobby inside CITY MALL Gorakhpur"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 bg-[#FFFBF6] dark:bg-[#191326] border-t border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#683BA4] dark:text-[#BFA1FF]">
                    Cinema Wing
                  </p>
                  <p className="font-display text-lg font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                    CITY MALL Multiplex Concierge
                  </p>
                </div>
                <Link
                  to="/visit-us"
                  className="text-xs font-semibold text-[#C9523C] dark:text-[#F48C74] hover:underline shrink-0"
                >
                  Visitor Info →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sample Movie Preview Exhibition Stage over Events Video */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden py-20 sm:py-28 bg-[#EFE6FA] dark:bg-[#1D1630]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.events}
          playbackRate={0.75}
          videoOpacityClassName="opacity-72 dark:opacity-65"
          tintClassName="bg-gradient-to-b from-[#EFE6FA]/88 via-[#FBF4EB]/48 to-[#E6F1FC]/88 dark:from-[#1D1630]/90 dark:via-[#151021]/55 dark:to-[#131C2E]/90"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 pb-8"
          >
            <div className="space-y-2 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#683BA4] dark:text-[#BFA1FF]">
                <Info className="w-3.5 h-3.5" />
                <span>Sample Cinema Exhibition Previews</span>
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                Theatrical Screen Atmosphere
              </h2>
            </div>
            <p className="text-xs text-[#5D5070] dark:text-[#B5A7D0] max-w-sm">
              Illustrative sample preview cards demonstrating feature genres showcased at INOX Cinemas; actual screening slates update continuously.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              {SAMPLE_CINEMA_FEATURES.map((item, idx) => {
                const isSelected = item.id === selectedFeature.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedFeatureId(item.id)}
                    className={`w-full text-left p-5 border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1325] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                        : 'bg-[#FFFBF6]/90 dark:bg-[#191326]/90 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 hover:border-[#683BA4]'
                    }`}
                  >
                    <span className="text-[11px] font-medium uppercase tracking-wider opacity-75">
                      Sample Preview 0{idx + 1} · {item.genre}
                    </span>
                    <h3 className="font-display text-2xl font-semibold mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs opacity-80 mt-1">{item.format}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-7 shadow-xl">
              <div className="w-52 sm:w-56 shrink-0 aspect-[3/4] overflow-hidden border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 bg-[#151021]">
                <ResilientImage
                  src={selectedFeature.poster}
                  alt={selectedFeature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#EFE6FA] dark:bg-[#2B2145] text-[#683BA4] dark:text-[#BFA1FF]">
                  Sample Preview Placeholder
                </span>
                <h3 className="font-display text-3xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                  {selectedFeature.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C9523C] dark:text-[#F48C74]">
                  {selectedFeature.genre} · {selectedFeature.format}
                </p>
                <p className="text-sm leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
                  {selectedFeature.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
