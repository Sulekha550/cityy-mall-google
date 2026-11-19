import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Sparkles, Layers } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { SCENE_IMAGES, BRAND_IMAGES } from '../assets/imageRegistry';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

export function HomePromenadeSection() {
  const sectionRef = useRef(null);
  const [activeLevel, setActiveLevel] = useState(0);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  const flowLevels = [
    {
      num: '01',
      color: 'bg-[#EA580C]',
      title: 'Ground & First Retail Promenade',
      subtitle: 'Tailoring, denim culture, footwear & flagship tech',
      route: '/shopping',
      image: SCENE_IMAGES.home3dAtrium,
    },
    {
      num: '02',
      color: 'bg-[#7C3AED]',
      title: 'Second Floor Couture & Junior Wing',
      subtitle: 'Festive ethnic silhouettes, handbags & kidswear',
      route: '/shopping/fashion',
      image: BRAND_IMAGES.louisPhilippe,
    },
    {
      num: '03',
      color: 'bg-[#0D9488]',
      title: 'Third Floor Dining & PVR INOX Above',
      subtitle: 'Social food pavilion crowned by laser multiplex screens',
      route: '/entertainment',
      image: BRAND_IMAGES.wForWoman,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="home-promenade"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-center overflow-visible lg:overflow-hidden py-10 sm:py-16 lg:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-transparent transition-colors duration-300"
    >
      {/* Animated Warm Golden/Champagne Geometric Atmosphere */}
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        playbackRate={0.25}
        videoOpacityClassName="opacity-88 dark:opacity-78"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: ELEGANT ARCHITECTURAL FLOW (Clean Direct Typography)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6" data-motion="reveal">
            {/* Top Kicker */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D9488] dark:text-[#2DD4BF] block">
                ARCHITECTURE &amp; FLOW
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1D1129] dark:text-[#FAF0F8] leading-[1.12]">
                Five Sunlit Levels in{' '}
                <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#8B5CF6] bg-clip-text text-transparent">
                  Gorakhpur
                </span>
              </h2>
            </div>

            {/* 3 Flow Level Rows with Numbered Pill Circles */}
            <div className="space-y-2.5">
              {flowLevels.map((lvl, idx) => (
                <Link
                  key={lvl.num}
                  to={lvl.route}
                  onMouseEnter={() => setActiveLevel(idx)}
                  className={`group/item flex items-center justify-between gap-4 p-3 rounded-2xl transition-all duration-300 border ${
                    activeLevel === idx
                      ? 'bg-black/5 dark:bg-white/10 border-black/15 dark:border-white/20'
                      : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-white shadow-sm mt-0.5 ${lvl.color}`}
                    >
                      {lvl.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#1D1129] dark:text-[#FAF0F8] group-hover/item:text-[#EC4899] transition-colors truncate">
                        {lvl.title}
                      </h3>
                      <p className="text-xs text-[#5C426E] dark:text-[#BFA1FF] truncate">
                        {lvl.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#5C426E] dark:text-[#BFA1FF] group-hover/item:text-[#EC4899] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>

            {/* Walk 3D Atrium Pill Button */}
            <div className="pt-1">
              <Link
                to="/discover"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#BE185D] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Walk 3D Mall Atrium</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PANORAMIC HORIZONTALLY OVERLAPPING STADIUM-ROUNDED IMAGES
              Exact match to user's uploaded reference: rounded-[2.5rem], horizontal overlap
             ========================================================================= */}
          <div className="lg:col-span-7 relative w-full overflow-hidden sm:overflow-visible pt-4 lg:pt-0">
            {/* Mobile View: Clean horizontal snap swipe track */}
            <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-3 pb-3 no-scrollbar select-none px-1">
              <div
                onClick={() => setActiveLevel(0)}
                className={`relative shrink-0 w-[82%] aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-2 transition-all snap-center cursor-pointer ${
                  activeLevel === 0 ? 'border-[#EA580C] ring-2 ring-[#EA580C]/30' : 'border-white/40 dark:border-white/20'
                }`}
              >
                <ResilientImage
                  src={SCENE_IMAGES.home3dAtrium}
                  alt="Five sunlit levels atrium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  Central Atrium
                </span>
              </div>

              <div
                onClick={() => setActiveLevel(1)}
                className={`relative shrink-0 w-[82%] aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-2 transition-all snap-center cursor-pointer ${
                  activeLevel === 1 ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/30' : 'border-white/40 dark:border-white/20'
                }`}
              >
                <ResilientImage
                  src={BRAND_IMAGES.louisPhilippe}
                  alt="Tailored fashion boutique"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold text-white bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate max-w-[85%]">
                  Fashion Promenade
                </span>
              </div>

              <div
                onClick={() => setActiveLevel(2)}
                className={`relative shrink-0 w-[82%] aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-2 transition-all snap-center cursor-pointer ${
                  activeLevel === 2 ? 'border-[#0D9488] ring-2 ring-[#0D9488]/30' : 'border-white/40 dark:border-white/20'
                }`}
              >
                <ResilientImage
                  src={BRAND_IMAGES.wForWoman}
                  alt="Signature outlets gallery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20">
                  <span className="block w-full text-center px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-md rounded-full border border-white/20 truncate">
                    18 APPROVED OUTLETS · FLOOR DIRECTORY
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop View: Classic Overlapping Stadium */}
            <div className="hidden sm:flex items-center -space-x-4 sm:-space-x-12 w-full select-none overflow-hidden sm:overflow-visible">
              
              {/* IMAGE 1: DOMINANT SUNLIT ATRIUM (Stadium-Rounded Front Canvas) */}
              <div
                className={`relative shrink-0 w-[50%] sm:w-[52%] aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.03] hover:z-40 ${
                  activeLevel === 0 ? 'z-30 ring-2 ring-[#EA580C]/40' : 'z-10'
                }`}
              >
                <ResilientImage
                  src={SCENE_IMAGES.home3dAtrium}
                  alt="Five sunlit levels atrium"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  Central Atrium
                </span>
              </div>

              {/* IMAGE 2: OVERLAPPING MIDDLE STADIUM CANVAS (Tailored Boutique) */}
              <div
                className={`relative shrink-0 w-[38%] sm:w-[40%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 ${
                  activeLevel === 1 ? 'z-30 ring-2 ring-[#7C3AED]/50' : 'z-20'
                }`}
              >
                <ResilientImage
                  src={BRAND_IMAGES.louisPhilippe}
                  alt="Tailored fashion boutique"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate max-w-[85%]">
                  Fashion Promenade
                </span>
              </div>

              {/* IMAGE 3: OVERLAPPING THIRD STADIUM CANVAS (Festive Ethnic Showcase) */}
              <div
                className={`relative shrink-0 w-[38%] sm:w-[40%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 ${
                  activeLevel === 2 ? 'z-30 ring-2 ring-[#0D9488]/50' : 'z-30'
                }`}
              >
                <ResilientImage
                  src={BRAND_IMAGES.wForWoman}
                  alt="Signature outlets gallery"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Bottom Pill Badge (Matches Reference: 26 SIGNATURE OUTLETS · FLOOR DIRECTORY) */}
                <div className="absolute bottom-3 left-2.5 right-2.5 z-20">
                  <span className="block w-full text-center px-2 py-1 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-sm truncate">
                    18 APPROVED OUTLETS · FLOOR DIRECTORY
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
