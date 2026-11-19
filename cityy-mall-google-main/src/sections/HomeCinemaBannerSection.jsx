import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film } from 'lucide-react';
import { CINEMA_POSTER_ASSETS, VIDEO_ASSETS } from '../assets/mediaManifest';
import { SCENE_IMAGES } from '../assets/imageRegistry';
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
      id="home-cinema"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-center overflow-visible lg:overflow-hidden py-10 sm:py-16 lg:py-24 bg-transparent"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        playbackRate={0.25}
        videoOpacityClassName="opacity-88 dark:opacity-78"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Cinema Narrative */}
        <div className="lg:col-span-5 space-y-6" data-motion="reveal">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
            <Film className="w-4 h-4" />
            <span>Multiplex &amp; Entertainment</span>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
              INOX{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                Cinemas
              </span>
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

        {/* Right Sequential 3-Image Cinema Composition (Enters One-by-One) */}
        <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[500px] flex items-center justify-end">
          {/* Sequential Image 1: Main Architectural Dome (Enters First) */}
          <div
            data-motion="seq-img"
            data-seq-index="0"
            data-seq-from="up"
            className="w-[82%] aspect-[16/10] border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 overflow-hidden shadow-xl bg-[#151021]"
          >
            <ResilientImage
              src={SCENE_IMAGES.entertainment3dDome}
              alt="INOX Multiplex Dome Architecture"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/75 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-4 text-xs font-mono uppercase tracking-wider text-white">
              INOX Multiplex Screens
            </span>
          </div>

          {/* Sequential Image 2: Left Poster Showcase (Enters Second with Stagger) */}
          <div
            data-motion="seq-img"
            data-seq-index="1"
            data-seq-from="left"
            className="absolute left-0 -bottom-4 w-[36%] sm:w-[32%] aspect-[3/4] border-2 border-[#FFFBF6] dark:border-[#1D1630] shadow-2xl overflow-hidden bg-[#151021]"
          >
            <ResilientImage
              src={CINEMA_POSTER_ASSETS.odyssey}
              alt="Sample Sci-Fi Cinema Feature Poster"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Sequential Image 3: Right Drama Poster Showcase (Enters Third with Stagger) */}
          <div
            data-motion="seq-img"
            data-seq-index="2"
            data-seq-from="right"
            className="absolute -right-3 -top-3 w-[34%] sm:w-[30%] aspect-[3/4] border-2 border-[#D4AF37]/60 shadow-2xl overflow-hidden bg-[#151021] hidden sm:block"
          >
            <ResilientImage
              src={CINEMA_POSTER_ASSETS.heritage}
              alt="Sample Historical Drama Feature Poster"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
