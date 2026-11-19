import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, UtensilsCrossed, Flame, Clock, MapPin } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { SCENE_IMAGES, BRAND_IMAGES } from '../assets/imageRegistry';
import { APPROVED_BRANDS } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

export function HomeDiningPanoramaSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [activeDiningIndex, setActiveDiningIndex] = useState(0);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'cascade');
  }, []);

  const diningVenues = [
    {
      num: '01',
      color: 'bg-[#EA580C]',
      name: 'Barbeque Nation & Terrace Grills',
      cuisine: 'Live skewers, infinite buffet & celebration tables',
      route: '/dining',
      image: BRAND_IMAGES.barbequeNation,
    },
    {
      num: '02',
      color: 'bg-[#B45309]',
      name: 'Pind Balluchi & Awadhi Kitchens',
      cuisine: 'Rustic clay-oven rotis, dal makhani & royal dum biryanis',
      route: '/dining',
      image: BRAND_IMAGES.pindBalluchi,
    },
    {
      num: '03',
      color: 'bg-[#C026D3]',
      name: 'Rangrezza Banquets & Dosa Plaza',
      cuisine: 'Festive family thalis, 104 dosa varieties & luxury receptions',
      route: '/dining',
      image: BRAND_IMAGES.rangrezzaBanquet,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="home-dining"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-center overflow-visible lg:overflow-hidden py-10 sm:py-16 lg:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-transparent transition-colors duration-300"
    >
      {/* Animated Warm Dining Video Atmosphere */}
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
              LEFT COLUMN: ELEGANT DINING DOSSIER (Clean Direct Typography)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-6" data-motion="reveal">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#EA580C] dark:text-[#FB923C] block flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#EA580C]" />
                CULINARY &amp; BANQUET PROMENADE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1129] dark:text-[#FAF0F8] leading-[1.12]">
                Nine Gastronomic Tables in{' '}
                <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#E11D48] bg-clip-text text-transparent">
                  Gorakhpur
                </span>
              </h2>
            </div>

            {/* 3 Dining Stream Rows with Numbered Pill Circles */}
            <div className="space-y-2.5">
              {diningVenues.map((v, idx) => (
                <Link
                  key={v.num}
                  to={v.route}
                  onMouseEnter={() => setActiveDiningIndex(idx)}
                  className={`group/item flex items-center justify-between gap-4 p-3 rounded-2xl transition-all duration-300 border ${
                    activeDiningIndex === idx
                      ? 'bg-black/5 dark:bg-white/10 border-black/15 dark:border-white/20'
                      : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-white shadow-sm mt-0.5 ${v.color}`}
                    >
                      {v.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#1D1129] dark:text-[#FAF0F8] group-hover/item:text-[#EA580C] transition-colors truncate">
                        {v.name}
                      </h3>
                      <p className="text-xs text-[#5C426E] dark:text-[#BFA1FF] truncate">
                        {v.cuisine}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#5C426E] dark:text-[#BFA1FF] group-hover/item:text-[#EA580C] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>

            {/* Explore Dining Promenade Button */}
            <div className="pt-1">
              <Link
                to="/dining"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#DC2626] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Explore All 9 Culinary Outlets</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PANORAMIC HORIZONTALLY OVERLAPPING STADIUM-ROUNDED IMAGES
             ========================================================================= */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              
              {/* IMAGE 1: DOMINANT SUNLIT DINING TERRACE (Stadium-Rounded Front Canvas) */}
              <div
                className={`relative shrink-0 w-[50%] sm:w-[52%] aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.03] hover:z-40 ${
                  activeDiningIndex === 0 ? 'z-30 ring-2 ring-[#EA580C]/40' : 'z-10'
                }`}
              >
                <ResilientImage
                  src={SCENE_IMAGES.dining3dTerrace}
                  alt="City Mall dining terrace"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  Third Floor Terrace
                </span>
              </div>

              {/* IMAGE 2: OVERLAPPING LIVE GRILL SALON */}
              <div
                className={`relative shrink-0 w-[38%] sm:w-[40%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 ${
                  activeDiningIndex === 1 ? 'z-30 ring-2 ring-[#B45309]/50' : 'z-20'
                }`}
              >
                <ResilientImage
                  src={BRAND_IMAGES.barbequeNation}
                  alt="Barbeque Nation grill salon"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate max-w-[85%]">
                  Barbeque Nation
                </span>
              </div>

              {/* IMAGE 3: OVERLAPPING ROYAL BANQUET & REGIONAL SPECIALTIES */}
              <div
                className={`relative shrink-0 w-[38%] sm:w-[40%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 ${
                  activeDiningIndex === 2 ? 'z-30 ring-2 ring-[#C026D3]/50' : 'z-30'
                }`}
              >
                <ResilientImage
                  src={BRAND_IMAGES.rangrezzaBanquet}
                  alt="Rangrezza Banquet & Dining"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-2.5 right-2.5 z-20">
                  <span className="block w-full text-center px-2 py-1 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-sm truncate">
                    9 SIGNATURE TABLES · BANQUET SUITES
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
