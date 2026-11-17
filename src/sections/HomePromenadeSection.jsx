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
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FDE8DF] dark:bg-[#241724]"
    >
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.architecture}
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
                27
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

        {/* Right Opposing Parallax Overlapping Layers */}
        <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[500px] flex items-center">
          <div
            data-parallax="down"
            className="w-[78%] aspect-[16/11] overflow-hidden border border-[#2D1D48]/18 dark:border-[#E2D4FF]/20 shadow-xl bg-[#FFFBF6] dark:bg-[#1D1630]"
          >
            <ResilientImage
              src={ARCHITECTURAL_GALLERY[1]}
              alt="Sunlit interior skylight atrium"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            data-parallax="up"
            className="absolute right-0 bottom-2 sm:bottom-6 w-[52%] aspect-[4/3] overflow-hidden border-4 border-[#FBF4EB] dark:border-[#151021] shadow-2xl bg-[#EFE6FA] dark:bg-[#231B38]"
          >
            <ResilientImage
              src={ARCHITECTURAL_GALLERY[6]}
              alt="Elevated glass walkway inside CITY MALL"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
