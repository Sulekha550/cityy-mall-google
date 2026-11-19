import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  Sparkles,
  Building2,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  MapPin,
  Maximize2,
} from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { SCENE_IMAGES, BRAND_IMAGES } from '../assets/imageRegistry';
import { APPROVED_BRANDS, BRAND_CATEGORIES, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { ContinuousMallWalkthrough3D, WALKTHROUGH_SCENES } from '../components/ContinuousMallWalkthrough3D';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

// Architectural floor breakdown corresponding to the 3D walkthrough journey
const WALKTHROUGH_FLOORS = [
  {
    level: 'LEVEL 0',
    number: '01',
    color: 'from-[#EA580C] to-[#C2410C]',
    badgeBg: 'bg-[#EA580C]',
    title: 'Ground Floor Atrium & Promenade',
    subtitle: 'Fine Jewellery, Luxury Salons & Gourmet Market',
    brands: ['Tanishq', 'Titan World', 'Looks Salon', "Spencer's"],
    highlights: 'Double-height sunlit entrance rotunda, reflective terrazzo, frameless glass portals.',
    image: SCENE_IMAGES.home3dAtrium,
    tag: 'Rotunda Atrium',
  },
  {
    level: 'LEVEL 1',
    number: '02',
    color: 'from-[#7C3AED] to-[#5B21B6]',
    badgeBg: 'bg-[#7C3AED]',
    title: 'First Floor Fashion Mezzanine',
    subtitle: 'Signature International & National Couture Houses',
    brands: ['Louis Philippe', "Levi's Store", 'Allen Solly', 'W for Woman'],
    highlights: 'Curved mezzanine balconies with frameless glass railings overlooking the atrium void.',
    image: SCENE_IMAGES.discover3dInterior,
    tag: 'Fashion Mezzanine',
  },
  {
    level: 'LEVEL 2',
    number: '03',
    color: 'from-[#0D9488] to-[#047857]',
    badgeBg: 'bg-[#0D9488]',
    title: 'Second Floor Athletic & Entertainment',
    subtitle: 'Global Sportswear, Footwear & PVR INOX Concourse',
    brands: ['Adidas', 'Puma', 'Skechers', 'Woodland', 'PVR INOX Cinemas'],
    highlights: 'High panoramic vista deck, vaulted glass skylight dome, suspended champagne lighting rings.',
    image: SCENE_IMAGES.brands3dStorefronts,
    tag: 'Multiplex Concourse',
  },
  {
    level: 'LEVEL 3',
    number: '04',
    color: 'from-[#BE185D] to-[#9D174D]',
    badgeBg: 'bg-[#BE185D]',
    title: 'Third Floor Culinary Terrace & Banquets',
    subtitle: 'Sunlit Dining Promenade & Celebration Banquets',
    brands: ['Barbeque Nation', 'Pizza Hut', 'KFC', 'Pind Balluchi', 'Rangrezza'],
    highlights: 'Open-air skylit culinary court, live charcoal table grills, 300-guest banquet suites.',
    image: SCENE_IMAGES.dining3dTerrace,
    tag: 'Culinary Terrace',
  },
];

// Curated spatial perspectives for the Atrium Materiality & Space section
const ARCHITECTURAL_PORTALS = [
  {
    id: 'rotunda-atrium',
    number: '01',
    level: 'LEVEL 00',
    title: 'Grand Rotunda Atrium',
    subtitle: 'Triple-height daylit marble concourse, reflective terrazzo & soaring glass canopy',
    image: SCENE_IMAGES.heroCityMallAtrium,
    tag: 'Rotunda Atrium',
    stats: '12,000 sq.ft Open Void',
    brands: ['Tanishq', 'Titan World', 'Looks Salon'],
  },
  {
    id: 'storefront-promenade',
    number: '02',
    level: 'LEVEL 01',
    title: 'Haute Brand Concourse',
    subtitle: 'Curated international flagships, illuminated vitrines & signature fashion avenues',
    image: SCENE_IMAGES.brands3dStorefronts,
    tag: 'Flagship Promenade',
    stats: '27 Premier Boutiques',
    brands: ["Levi's", 'Adidas', 'Puma', 'Woodland'],
  },
  {
    id: 'skylight-mezzanine',
    number: '03',
    level: 'LEVEL 02',
    title: 'Sky-Canopy Mezzanine',
    subtitle: 'Panoramic viewing balconies, Italian terrazzo walkways & natural daylight',
    image: SCENE_IMAGES.discover3dInterior,
    tag: 'Mezzanine Galleria',
    stats: '100% Daylit Gallery',
    brands: ['Allen Solly', 'Louis Philippe', 'W for Woman'],
  },
  {
    id: 'dining-terrace',
    number: '04',
    level: 'LEVEL 03',
    title: 'Culinary Promenade',
    subtitle: 'Open-air skylit dining deck, charcoal table grills & celebration suites',
    image: SCENE_IMAGES.dining3dTerrace,
    tag: 'Dining Terrace',
    stats: '300-Guest Banquet Deck',
    brands: ['Barbeque Nation', 'Pizza Hut', 'KFC'],
  },
];

export function DiscoverPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const walkthroughRef = useRef(null);
  const archRef = useRef(null);
  const matrixRef = useRef(null);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState(BRAND_CATEGORIES[0].id);
  const [activePortalIndex, setActivePortalIndex] = useState(1);

  const currentPortal = ARCHITECTURAL_PORTALS[activePortalIndex] || ARCHITECTURAL_PORTALS[0];
  const currentPortalBrands = APPROVED_BRANDS.filter((b) =>
    currentPortal.brands.some(
      (brandName) =>
        b.name.toLowerCase().includes(brandName.toLowerCase()) ||
        brandName.toLowerCase().includes(b.name.toLowerCase())
    )
  );

  const selectedCategory =
    BRAND_CATEGORIES.find((c) => c.id === selectedCatId) || BRAND_CATEGORIES[0];
  const categoryBrands = APPROVED_BRANDS.filter(
    (b) => b.categoryId === selectedCategory.id
  );

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanArch = registerSectionMotion(archRef.current, 'cascade');
    const cleanMatrix = registerSectionMotion(matrixRef.current, 'editorial');
    return () => {
      cleanHero();
      cleanArch();
      cleanMatrix();
      if (cleanHero) cleanHero();
    };
  }, []);

  return (
    <div className="bg-[#FAF2F8] dark:bg-[#151021] text-[#1B1325] dark:text-[#F8F0FA] transition-colors duration-300">
      {/* =========================================================================
          SECTION 1: HERO — CONTINUOUS 3D MALL WALKTHROUGH & ARCHITECTURAL ATRIUM
          Unified champagne geometric video background + Frosted Dossier + Overlapping Stadium Vitrines
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-12 pb-16 sm:pb-24 border-b border-[#2D1D48]/14 dark:border-white/10"
      >
        {/* Unified Homepage Background Atmosphere */}
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.mallHero}
          variant="hero"
          eager
          playbackRate={0.25}
          videoOpacityClassName="opacity-88 dark:opacity-78"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Spatial Narrative Badge */}
          <div data-motion="reveal" className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C3AED]/10 dark:bg-[#C084FC]/15 border border-[#7C3AED]/25 text-xs font-bold tracking-[0.2em] uppercase text-[#7C3AED] dark:text-[#C084FC] backdrop-blur-md">
                <Compass className="w-3.5 h-3.5" />
                <span>SPATIAL 3D DISCOVERY · {MALL_IDENTITY.city}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#DB2777] dark:text-[#F472B6] bg-white/70 dark:bg-white/10 px-3 py-1 rounded-full border border-pink-500/20 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Humans · Pure 3D Architecture</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold tracking-wider text-[#7C3AED] dark:text-[#C084FC] block">
                04 SUNLIT LEVELS
              </span>
              <span className="text-[10px] uppercase font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                Ground to Sky Terrace
              </span>
            </div>
          </div>

          {/* =========================================================================
              ARCHITECTURAL COMPOSITION: FROSTED DOSSIER LEFT + OVERLAPPING STADIUM VITRINES RIGHT
              Exact match to Orion Mall reference design
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* LEFT COLUMN: Clean Direct Typography (Zero Card Box) */}
            <div className="lg:col-span-5 space-y-5" data-motion="reveal">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D9488] dark:text-[#2DD4BF] block">
                  ARCHITECTURE &amp; FLOW
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#1D1129] dark:text-[#FAF0F8] leading-[1.12]">
                  Five Sunlit Levels in{' '}
                  <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#8B5CF6] bg-clip-text text-transparent">
                    Gorakhpur
                  </span>
                </h1>
                <p className="text-sm text-[#3D2E50] dark:text-[#D8CEE9] font-medium leading-relaxed">
                  Soaring glass rotundas, fashion mezzanines, athletic concourses, and open-air dining.
                </p>
              </div>

              {/* 4 Interactive Flow Level Rows with Numbered Pill Badges */}
              <div className="space-y-2 pt-1">
                {WALKTHROUGH_FLOORS.map((floor, idx) => {
                  const isActive = idx === activeFloorIndex;
                  return (
                    <button
                      key={floor.level}
                      type="button"
                      onMouseEnter={() => setActiveFloorIndex(idx)}
                      onClick={() => setActiveFloorIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl transition-all duration-300 cursor-pointer text-left border ${isActive
                        ? 'bg-[#7C3AED]/15 dark:bg-white/15 border-[#7C3AED] shadow-xs'
                        : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#7C3AED]/50'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white shadow-xs shrink-0 ${floor.badgeBg}`}
                        >
                          {floor.number}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-[#1D1129] dark:text-[#FAF0F8] block truncate">
                            {floor.title}
                          </span>
                          <span className="text-[10px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">
                            {floor.subtitle}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 text-[#7C3AED] dark:text-[#C084FC] shrink-0 transition-transform ${isActive ? 'translate-x-0.5 -translate-y-0.5 opacity-100' : 'opacity-40'
                          }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Walk 3D Atrium Pill Button */}
              <div className="pt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => walkthroughRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#BE185D] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Walk the 3D Mall Atrium ↓</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Horizontally Overlapping Stadium-Rounded Images (7 cols) */}
            <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
              <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
                {WALKTHROUGH_FLOORS.map((floor, idx) => {
                  const isMain = idx === activeFloorIndex;
                  return (
                    <div
                      key={floor.level}
                      onMouseEnter={() => setActiveFloorIndex(idx)}
                      onClick={() => setActiveFloorIndex(idx)}
                      className={`relative shrink-0 ${isMain
                        ? 'w-[54%] aspect-[16/11] rounded-[2.5rem] z-30 ring-3 ring-[#7C3AED]/40 scale-[1.02]'
                        : 'w-[38%] aspect-[3/3.8] rounded-[2.2rem] ' + (idx % 2 === 0 ? 'z-20' : 'z-10')
                        } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                    >
                      <ResilientImage
                        src={floor.image}
                        alt={floor.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Floor Tag Badge */}
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse" />
                        <span className="text-xs font-black text-white tracking-wide">
                          {floor.level} · {floor.tag}
                        </span>
                      </div>

                      {/* Bottom Floating Brands Strip */}
                      <div className="absolute bottom-3 left-3 right-3 z-20">
                        <span className="block w-full text-center px-2 py-1 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-sm truncate">
                          {floor.brands.join(' · ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* =========================================================================
              CONTINUOUS 3D INTERACTIVE WALKTHROUGH WINDOW
             ========================================================================= */}
          <div ref={walkthroughRef} data-motion="reveal" className="w-full pt-4 space-y-4">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold uppercase tracking-[0.16em] text-[#7C3AED] dark:text-[#C084FC]">
                Live 3D Continuous Flight Simulation
              </span>
              <span className="font-mono text-[#5D5070] dark:text-[#B5A7D0]">
                Interactive Camera · Click &amp; Drag
              </span>
            </div>
            <ContinuousMallWalkthrough3D />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE CATEGORY OUTLET PREVIEW STRIP
          ========================================================================= */}
      <section
        ref={archRef}
        className="relative overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-white/10 bg-transparent"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.mallHero}
          variant="hero"
          playbackRate={0.25}
          videoOpacityClassName="opacity-88 dark:opacity-78"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED] dark:text-[#C084FC]">
                Approved Retail, Culinary &amp; Cinema Directory
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B1325] dark:text-[#F8F0FA]">
                Inspect Brands Along the{' '}
                <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
                  Walkthrough
                </span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {BRAND_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedCategory.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${isSelected
                      ? 'bg-[#7C3AED] text-white shadow-lg ring-1 ring-[#C084FC]/40 -translate-y-0.5'
                      : 'bg-white/70 dark:bg-white/10 text-[#1B1325] dark:text-[#F8F0FA] border border-[#2D1D48]/12 dark:border-white/12 hover:border-[#7C3AED]'
                      }`}
                  >
                    {cat.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overlapping Stadium-Rounded Brand Showcase (Replaces simple 3-card grid) */}
          <div className="pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Clean Direct Typography (Zero Card Box) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C3AED] dark:text-[#C084FC] block">
                    {selectedCategory.title} · SPATIAL CONCOURSE
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-sm text-[#3D2E50] dark:text-[#D8CEE9] font-medium leading-relaxed">
                    {selectedCategory.subtitle}
                  </p>
                </div>

                {/* Quick Select Brand Pills */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D5070] dark:text-[#BFA1FF] block">
                    Approved Boutiques on this Level
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {categoryBrands.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => onInspectBrand?.(brand)}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#7C3AED] text-xs font-semibold text-[#1B1325] dark:text-[#FAF0F8] transition-all cursor-pointer shadow-xs"
                      >
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#DB2777]">
                          {brand.monogram}
                        </span>
                        <span>{brand.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#7C3AED] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to={selectedCategory.route}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#DB2777] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>Explore {selectedCategory.shortLabel} Directory</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Horizontally Overlapping Stadium-Rounded Image Showcase */}
              <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible">
                <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
                  {categoryBrands.slice(0, 3).map((brand, idx) => {
                    const isMain = idx === 0;
                    return (
                      <div
                        key={brand.id}
                        onClick={() => onInspectBrand?.(brand)}
                        className={`relative shrink-0 ${isMain
                          ? 'w-[52%] aspect-[16/11] rounded-[2.5rem] z-30'
                          : 'w-[38%] aspect-[3/3.8] rounded-[2.2rem] ' + (idx === 1 ? 'z-20' : 'z-10')
                          } overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.04] hover:z-40 cursor-pointer group`}
                      >
                        <ResilientImage
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-white bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md truncate">
                            {brand.name}
                          </span>
                          <span className="text-[9px] font-mono text-[#F472B6] bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-md shrink-0">
                            Inspect →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ARCHITECTURAL MATERIALITY & DAYLIT PROMENADE
          Interactive Spatial Viewfinder & Floating Glass Hotspot Stage
          ========================================================================= */}
      <section
        ref={matrixRef}
        className="relative overflow-hidden py-16 sm:py-24 bg-transparent"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.mallHero}
          variant="hero"
          playbackRate={0.25}
          videoOpacityClassName="opacity-88 dark:opacity-78"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED] dark:text-[#C084FC]">
                <Layers className="w-4 h-4" />
                <span>Atrium Materiality &amp; Space</span>
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1B1325] dark:text-[#F8F0FA]">
                Promenade Views &amp;{' '}
                <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                  Gathering Spaces
                </span>
              </h2>
            </div>

            <Link
              to="/visit-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.12em] bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white hover:opacity-95 shadow-xl shrink-0 cursor-pointer"
            >
              <span>Plan Your Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>



          {/* Asymmetric Luxury Editorial Showcase (Completely Non-Card, Magazine Style) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">

            {/* LEFT COLUMN: Floor Navigation, Spatial Story, and Prominent Brand Pills (~5 cols) */}
            <div className="lg:col-span-5 space-y-6">

              {/* Floor Selector Pills (Sleek horizontal track) */}
              <div className="flex flex-wrap items-center gap-2">
                {ARCHITECTURAL_PORTALS.map((portal, idx) => {
                  const isActive = activePortalIndex === idx;
                  return (
                    <button
                      key={portal.id}
                      type="button"
                      onClick={() => setActivePortalIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border ${isActive
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white border-transparent shadow-md shadow-pink-500/25 scale-105'
                        : 'bg-white/70 dark:bg-white/10 text-[#4A3258] dark:text-[#D8CEE9] border-black/10 dark:border-white/10 hover:bg-white/95'
                        }`}
                    >
                      <span>{portal.level.replace('LEVEL ', 'L')}</span> · {portal.tag}
                    </button>
                  );
                })}
              </div>

              {/* Active Floor Spatial Specs */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#D946EF] block">
                  {currentPortal.level} · {currentPortal.stats}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1B1325] dark:text-[#F8F0FA] tracking-tight">
                  {currentPortal.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D5070] dark:text-[#D8CEE9] leading-relaxed">
                  {currentPortal.subtitle}
                </p>
              </div>

              {/* BRAND SHOWCASE: Prominent Floating Brand Badges (Just like user reference image!) */}
              <div className="space-y-2.5 pt-2 border-t border-[#2D1D48]/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7C3AED] dark:text-[#C084FC] block">
                  Featured Concourse Boutiques
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {currentPortalBrands.map((brand) => (
                    <button
                      key={brand.id || brand.name}
                      type="button"
                      onClick={() => onInspectBrand?.(brand)}
                      className="group/pill inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-[#1E142F]/90 backdrop-blur-md border border-white/80 dark:border-white/15 shadow-sm hover:shadow-md hover:border-[#D946EF] hover:scale-105 transition-all cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#D946EF] to-[#8B5CF6]" />
                      <span className="text-xs font-bold text-[#1B1325] dark:text-[#FAF0F8] group-hover/pill:text-[#D946EF] transition-colors">
                        {brand.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#D946EF] opacity-0 -translate-x-1 group-hover/pill:opacity-100 group-hover/pill:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-2">
                <Link
                  to="/brands"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#7C3AED] dark:text-[#C084FC] hover:underline"
                >
                  <span>Explore Complete 27-Brand Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Single Grand Architectural Viewport (~7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-[#2D1D48]/14 dark:border-white/15 shadow-2xl bg-black/40 group">
                <ResilientImage
                  key={currentPortal.id}
                  src={currentPortal.image}
                  alt={currentPortal.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Floating Location Overlay on Image */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {currentPortal.level} · {currentPortal.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:right-6 z-20 max-w-sm text-white pointer-events-none">
                  <span className="text-[10px] font-mono text-[#FFA07A] font-bold tracking-wider uppercase block">
                    Gorakhpur Premier Concourse
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    {currentPortal.title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
