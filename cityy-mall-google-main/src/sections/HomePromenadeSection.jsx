import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

export function HomePromenadeSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home-promenade"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FDE8DF] dark:bg-[#241724]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.architecture}
        variant="explore"
        videoOpacityClassName="opacity-86 dark:opacity-78"
        tintClassName="bg-gradient-to-r from-[#FDE8DF]/72 via-[#FBF4EB]/28 to-[#EFE6FA]/48 dark:from-[#241724]/74 dark:via-[#1D1630]/34 dark:to-[#151021]/62"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Story Narrative */}
        <div className="lg:col-span-5 space-y-6" data-motion="reveal">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C9523C] dark:text-[#F48C74]">
            Architectural Rhythm
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1] text-[#1B1325] dark:text-[#F6EFE7]">
            Light, Movement &amp; Everyday Gathering
          </h2>
          <p className="text-base leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
            Across its retail promenades, CITY MALL pairs open daylight interiors with curated destinations—bringing national apparel leaders, fine jewellery, wellness salons, family dining, and cinema together in one cohesive setting for Gorakhpur.
          </p>

          <div className="pt-2 space-y-4 border-t border-[#2D1D48]/15 dark:border-[#E2D4FF]/15">
            <div className="flex items-baseline justify-between py-2 border-b border-[#2D1D48]/10 dark:border-[#E2D4FF]/10">
              <span className="text-sm font-medium text-[#433754] dark:text-[#D8CEE9]">
                Approved Houses &amp; Outlets
              </span>
              <span className="font-display text-2xl font-bold tabular-nums text-[#683BA4] dark:text-[#BFA1FF]">
                18
              </span>
            </div>
            <div className="flex items-baseline justify-between py-2 border-b border-[#2D1D48]/10 dark:border-[#E2D4FF]/10">
              <span className="text-sm font-medium text-[#433754] dark:text-[#D8CEE9]">
                Curated Retail &amp; Leisure Realms
              </span>
              <span className="font-display text-2xl font-bold tabular-nums text-[#0E7C71] dark:text-[#5EEAD4]">
                07
              </span>
            </div>
          </div>

          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase pb-1.5 border-b-2 border-[#C9523C] dark:border-[#F48C74] text-[#1B1325] dark:text-[#F6EFE7] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors"
          >
            <span>Discover Spatial Highlights</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Right Sequential 3-Image Composition (Enters One-by-One) */}
        <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[520px] flex items-center justify-end">
          {/* Sequential Image 1: Main Sunlit Atrium (Enters First) */}
          <div
            data-motion="seq-img"
            data-seq-index="0"
            data-seq-from="up"
            className="w-[78%] aspect-[16/11] overflow-hidden border border-[#2D1D48]/18 dark:border-[#E2D4FF]/20 shadow-xl bg-[#FFFBF6] dark:bg-[#1D1630]"
          >
            <ResilientImage
              src={ARCHITECTURAL_GALLERY[1]}
              alt="Sunlit interior skylight atrium"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Sequential Image 2: Elevated Glass Walkway (Enters Second with Stagger) */}
          <div
            data-motion="seq-img"
            data-seq-index="1"
            data-seq-from="right"
            className="absolute right-0 bottom-0 sm:bottom-4 w-[50%] aspect-[4/3] overflow-hidden border-4 border-[#FBF4EB] dark:border-[#151021] shadow-2xl bg-[#EFE6FA] dark:bg-[#231B38]"
          >
            <ResilientImage
              src={ARCHITECTURAL_GALLERY[6]}
              alt="Elevated glass walkway inside CITY MALL"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Sequential Image 3: Architectural Colonnade Vignette (Enters Third) */}
          <div
            data-motion="seq-img"
            data-seq-index="2"
            data-seq-from="down"
            className="absolute -left-2 sm:left-4 top-2 sm:top-6 w-[34%] aspect-square overflow-hidden border-2 border-[#D4AF37]/50 shadow-xl bg-[#FFFBF6] dark:bg-[#1D1630] hidden sm:block"
          >
            <ResilientImage
              src={ARCHITECTURAL_GALLERY[2]}
              alt="Sculpted colonnade perspective"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151021]/70 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-1.5 left-2 text-[9px] font-mono uppercase tracking-wider text-white">
              Light Oculus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
