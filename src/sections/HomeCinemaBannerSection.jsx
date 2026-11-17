import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film } from 'lucide-react';
import { CINEMA_POSTER_ASSETS, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

export function HomeCinemaBannerSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const inox = APPROVED_BRANDS.find((b) => b.id === 'inox-cinemas');

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 bg-[#E6F1FC] dark:bg-[#131C2E]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.cinema}
        playbackRate={0.78}
        videoOpacityClassName="opacity-80 dark:opacity-74"
        tintClassName="bg-gradient-to-tr from-[#E6F1FC]/86 via-[#EFE6FA]/44 to-[#FBF4EB]/78 dark:from-[#131C2E]/88 dark:via-[#1D1630]/54 dark:to-[#151021]/82"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Cinema Narrative */}
        <div className="lg:col-span-6 space-y-6" data-motion="reveal">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
            <Film className="w-4 h-4" />
            <span>Multiplex &amp; Entertainment</span>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              INOX Cinemas
            </h2>
            {inox && (
              <BrandInsignia
                monogram={inox.monogram}
                accentColor={inox.accentColor}
                size="md"
              />
            )}
          </div>

          <p className="text-base leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
            Evenings at CITY MALL, Gorakhpur gather around the big screen at INOX Cinemas—pairing feature film screenings with neighboring dining venues for effortless weekends and family outings.
          </p>

          <p className="text-xs text-[#5D5070] dark:text-[#B5A7D0] leading-relaxed border-l-2 border-[#683BA4] dark:border-[#BFA1FF] pl-4">
            Live showtimes, ticket bookings, and seat availability are managed directly at the INOX box office and official INOX channels.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/entertainment"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.12em] uppercase font-semibold bg-[#1B1325] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
            >
              <span>Visit Entertainment Lounge</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            {inox && (
              <button
                type="button"
                onClick={() => onInspectBrand(inox)}
                className="px-5 py-3 text-xs tracking-[0.12em] uppercase font-semibold border border-[#2D1D48]/28 dark:border-[#E2D4FF]/28 bg-[#FFFBF6]/85 dark:bg-[#191326]/85 text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#683BA4] dark:hover:border-[#BFA1FF] transition-colors cursor-pointer"
              >
                Inspect Venue
              </button>
            )}
          </div>
        </div>

        {/* Right Overlapping 3:4 Theatrical Poster Composition */}
        <div className="lg:col-span-6 relative flex items-center justify-center sm:justify-end gap-5">
          <div
            data-parallax="down"
            className="w-[46%] sm:w-[44%] aspect-[3/4] border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 overflow-hidden shadow-xl bg-[#151021]"
          >
            <ResilientImage
              src={CINEMA_POSTER_ASSETS.odyssey}
              alt="Sample Sci-Fi Cinema Feature Poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            data-parallax="up"
            className="w-[46%] sm:w-[44%] aspect-[3/4] mt-10 border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 overflow-hidden shadow-2xl bg-[#151021]"
          >
            <ResilientImage
              src={CINEMA_POSTER_ASSETS.heritage}
              alt="Sample Historical Drama Feature Poster"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
