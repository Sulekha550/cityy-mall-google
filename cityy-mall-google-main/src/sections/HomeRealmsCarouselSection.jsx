import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  Layers,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { VIDEO_ASSETS, CINEMA_POSTER_ASSETS } from '../assets/mediaManifest';
import { BRAND_IMAGES, SCENE_IMAGES } from '../assets/imageRegistry';
import { APPROVED_BRANDS, BRAND_CATEGORIES } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

// Rich artistic editorial configuration for each of the Seven Curated Categories
const CATEGORY_EDITORIAL_DATA = {
  fashion: {
    id: 'fashion',
    number: '01',
    title: 'Fashion & Apparel',
    shortLabel: 'Fashion',
    chapter: 'Haute Couture & Tailored Ateliers',
    route: '/shopping/fashion',
    mainImage: VIDEO_ASSETS.fashionRetail.fallbackImage,
    supportingImage: BRAND_IMAGES.louisPhilippe,
    accentImage: BRAND_IMAGES.wForWoman,
    supportingCaption: 'Louis Philippe · Suite G-04',
    accentCaption: 'W for Woman',
    accentHue: '#C084FC',
    gradient: 'from-[#A855F7] via-[#EC4899] to-[#8B5CF6]',
    badgeBg: 'bg-gradient-to-r from-[#A855F7]/15 to-[#EC4899]/15 text-[#86198F] dark:text-[#F472B6] border-[#A855F7]/30',
    glowColor: 'rgba(192, 132, 252, 0.25)',
    paletteName: 'Lavender Violet & Rose',
    icon: '👗',
    quote:
      'Tailored bespoke menswear, heritage denim craftsmanship, contemporary Indian fusion ensembles, and fine everyday silhouettes.',
    featuredBrands: ['Louis Philippe', "Levi's Store", 'W for Woman', 'Allen Solly'],
    floorBadge: 'Ground & Level 1',
  },
  footwear: {
    id: 'footwear',
    number: '02',
    title: 'Footwear & Sportswear',
    shortLabel: 'Footwear',
    chapter: 'Athletic Promenade & Artisan Leather',
    route: '/shopping/footwear',
    mainImage: VIDEO_ASSETS.footwearSportswear.fallbackImage,
    supportingImage: BRAND_IMAGES.adidas,
    accentImage: BRAND_IMAGES.puma,
    supportingCaption: 'Adidas · Suite 2-02',
    accentCaption: 'Puma Speed',
    accentHue: '#2DD4BF',
    gradient: 'from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]',
    badgeBg: 'bg-gradient-to-r from-[#14B8A6]/15 to-[#06B6D4]/15 text-[#0E7C71] dark:text-[#2DD4BF] border-[#14B8A6]/30',
    glowColor: 'rgba(45, 212, 191, 0.25)',
    paletteName: 'Turquoise & Electric Cyan',
    icon: '👟',
    quote:
      'Global athletic performance champions, precision marathon runners, rugged outdoor expedition boots, and bespoke leather dress shoes.',
    featuredBrands: ['Adidas', 'Puma', 'Woodland', 'Skechers'],
    floorBadge: 'Second Floor Concourse',
  },
  jewellery: {
    id: 'jewellery',
    number: '03',
    title: 'Jewellery & Watches',
    shortLabel: 'Jewellery',
    chapter: 'Imperial 24K Gold & Haute Horlogerie',
    route: '/shopping/jewellery',
    mainImage: VIDEO_ASSETS.jewelleryWatches.fallbackImage,
    supportingImage: BRAND_IMAGES.tanishq,
    accentImage: BRAND_IMAGES.titanWorld,
    supportingCaption: 'Tanishq · Suite G-01',
    accentCaption: 'Titan World',
    accentHue: '#FBBF24',
    gradient: 'from-[#F59E0B] via-[#D97706] to-[#F43F5E]',
    badgeBg: 'bg-gradient-to-r from-[#F59E0B]/15 to-[#D97706]/15 text-[#B45309] dark:text-[#FBBF24] border-[#F59E0B]/30',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    paletteName: 'Champagne Gold & Amber',
    icon: '💍',
    quote:
      'Ceremonial heirloom gold artistry, certified solitaire diamonds, and handcrafted chronometers celebrating life’s grandest milestones.',
    featuredBrands: ['Tanishq Jewellery', 'Titan World Watches'],
    floorBadge: 'Grand Entrance Frontage',
  },
  beauty: {
    id: 'beauty',
    number: '04',
    title: 'Beauty & Lifestyle',
    shortLabel: 'Beauty',
    chapter: 'Wellness Lounges & Bridal Artistry',
    route: '/shopping/beauty',
    mainImage: VIDEO_ASSETS.beautyLifestyle.fallbackImage,
    supportingImage: BRAND_IMAGES.looksSalon,
    accentImage: BRAND_IMAGES.arjunMehendiArt,
    supportingCaption: 'Looks Salon · Suite 3-06',
    accentCaption: 'Bridal Art',
    accentHue: '#F472B6',
    gradient: 'from-[#EC4899] via-[#F43F5E] to-[#A855F7]',
    badgeBg: 'bg-gradient-to-r from-[#EC4899]/15 to-[#F43F5E]/15 text-[#BE185D] dark:text-[#F472B6] border-[#EC4899]/30',
    glowColor: 'rgba(244, 114, 182, 0.25)',
    paletteName: 'Blush Pink & Orchid',
    icon: '✨',
    quote:
      'Premier styling sanctuaries, restorative hair rituals, organic aesthetic treatments, and authentic ceremonial mehendi art.',
    featuredBrands: ['Looks Salon', 'Arjun Mehendi Art'],
    floorBadge: 'Third Floor Pavilion',
  },
  supermarket: {
    id: 'supermarket',
    number: '05',
    title: 'Supermarket & Retail',
    shortLabel: 'Supermarket',
    chapter: 'Gourmet Hypermarket & Daily Living',
    route: '/shopping/supermarket',
    mainImage: VIDEO_ASSETS.supermarket.fallbackImage,
    supportingImage: SCENE_IMAGES.shoppingScene4,
    accentImage: SCENE_IMAGES.homeScene4,
    supportingCaption: "Spencer's Gourmet Aisle",
    accentCaption: 'Fresh Harvest',
    accentHue: '#34D399',
    gradient: 'from-[#10B981] via-[#059669] to-[#0D9488]',
    badgeBg: 'bg-gradient-to-r from-[#10B981]/15 to-[#059669]/15 text-[#065F46] dark:text-[#34D399] border-[#10B981]/30',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    paletteName: 'Emerald & Fresh Mint',
    icon: '🛒',
    quote:
      'Expansive international pantry selections, farm-fresh provisions, artisanal bakery essentials, and comprehensive family retail.',
    featuredBrands: ["Spencer's Hypermarket & Retail"],
    floorBadge: 'Lower Ground Concourse',
  },
  cinema: {
    id: 'cinema',
    number: '06',
    title: 'Cinema & Multiplex',
    shortLabel: 'Cinema',
    chapter: 'Cinematic Grandeur & INSIGNIA Screens',
    route: '/entertainment',
    mainImage: VIDEO_ASSETS.cinema.fallbackImage,
    supportingImage: BRAND_IMAGES.inoxCinemas,
    accentImage: CINEMA_POSTER_ASSETS.heritage,
    supportingCaption: 'INOX Multiplex Level',
    accentCaption: 'INSIGNIA VIP',
    accentHue: '#FB7185',
    gradient: 'from-[#E11D48] via-[#BE185D] to-[#7C3AED]',
    badgeBg: 'bg-gradient-to-r from-[#E11D48]/15 to-[#BE185D]/15 text-[#9F1239] dark:text-[#FB7185] border-[#E11D48]/30',
    glowColor: 'rgba(251, 113, 133, 0.25)',
    paletteName: 'Cinema Ruby & Velvet Rose',
    icon: '🎬',
    quote:
      'Immersive laser projection, multi-dimensional Dolby Atmos soundscapes, luxury plush recliners, and gourmet in-seat concession service.',
    featuredBrands: ['INOX Cinemas Multiplex'],
    floorBadge: 'Fourth Floor Multiplex Level',
  },
  dining: {
    id: 'dining',
    number: '07',
    title: 'Food & Restaurants',
    shortLabel: 'Dining',
    chapter: 'Gastronomic Promenade & Banquets',
    route: '/dining',
    mainImage: VIDEO_ASSETS.dining.fallbackImage,
    supportingImage: BRAND_IMAGES.barbequeNation,
    accentImage: BRAND_IMAGES.rangrezzaBanquet,
    supportingCaption: 'Barbeque Nation Terrace',
    accentCaption: 'Royal Rangrezza',
    accentHue: '#FB923C',
    gradient: 'from-[#EA580C] via-[#F97316] to-[#EAB308]',
    badgeBg: 'bg-gradient-to-r from-[#EA580C]/15 to-[#F97316]/15 text-[#C2410C] dark:text-[#FB923C] border-[#EA580C]/30',
    glowColor: 'rgba(251, 146, 60, 0.25)',
    paletteName: 'Coral Orange & Peach Gold',
    icon: '🍷',
    quote:
      'Nine signature gastronomic venues: sizzle grills, fragrant Mughlai curries, authentic South Indian dosas, artisan pizzas, and festive banquet salons.',
    featuredBrands: ['Barbeque Nation', 'Pizza Hut', 'KFC', 'Pind Balluchi', 'Dosa Plaza'],
    floorBadge: 'Third Floor Dining Terrace',
  },
};

const CATEGORY_KEYS = [
  'fashion',
  'footwear',
  'jewellery',
  'beauty',
  'supermarket',
  'cinema',
  'dining',
];

export function HomeRealmsCarouselSection() {
  const sectionRef = useRef(null);
  const [activeCategoryKey, setActiveCategoryKey] = useState('fashion');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  const activeCategory = CATEGORY_EDITORIAL_DATA[activeCategoryKey] || CATEGORY_EDITORIAL_DATA.fashion;
  const currentIndex = CATEGORY_KEYS.indexOf(activeCategoryKey);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % CATEGORY_KEYS.length;
    setActiveCategoryKey(CATEGORY_KEYS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + CATEGORY_KEYS.length) % CATEGORY_KEYS.length;
    setActiveCategoryKey(CATEGORY_KEYS[prevIdx]);
  };

  // Keyboard navigation when user is exploring
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isHovered]);

  return (
    <section
      ref={sectionRef}
      id="home-realms"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#683BA4]/15 dark:border-[#BFA1FF]/15 bg-[#FAF4ED] dark:bg-[#120B1C] transition-colors duration-300"
    >
      {/* Dynamic Animated Ambient Background */}
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        variant="shopping"
        playbackRate={0.7}
        videoOpacityClassName="opacity-60 dark:opacity-45"
        tintClassName="bg-gradient-to-b from-[#FAF4ED]/92 via-[#F4E6F7]/65 to-[#FDE8DF]/88 dark:from-[#120B1C]/95 dark:via-[#1B1028]/75 dark:to-[#120B1C]/96"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 sm:space-y-10">
        
        {/* =========================================================================
            EDITORIAL HEADER & STORYTELLING CONTROLS
           ========================================================================= */}
        <div
          data-motion="reveal"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#701A75]/15 dark:border-[#C084FC]/20"
        >
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full bg-gradient-to-r from-[#701A75]/10 to-[#BE185D]/10 dark:from-[#F472B6]/20 dark:to-[#C084FC]/20 text-[#86198F] dark:text-[#F472B6] border border-[#86198F]/25 dark:border-[#F472B6]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Curated Mall Taxonomy · 7 Distinct Chapters</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#241033] via-[#701A75] to-[#9D174D] dark:from-[#FAF0F8] dark:via-[#F0ABFC] dark:to-[#F472B6] bg-clip-text text-transparent">
              Seven Curated Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#4E345D] dark:text-[#D8C7E5] leading-relaxed">
              Seven curated lifestyle destinations across CITY MALL.
            </p>
          </div>

          {/* Editorial Prev / Next & Progress Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-xs font-mono font-bold tracking-wider text-[#86198F] dark:text-[#F472B6] block">
                {String(currentIndex + 1).padStart(2, '0')} / 07
              </span>
              <span className="text-[10px] uppercase font-mono text-[#5C426E] dark:text-[#BFA1FF]">
                {activeCategory.shortLabel}
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 dark:bg-[#1E112E]/80 border border-[#701A75]/15 dark:border-[#C084FC]/20 shadow-xs">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Category"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5C426E] dark:text-[#FAF0F8] hover:bg-[#701A75] hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Category"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5C426E] dark:text-[#FAF0F8] hover:bg-[#701A75] hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE CATEGORY RUNWAY (Horizontal Glass Ribbon)
           ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
          {CATEGORY_KEYS.map((key) => {
            const cat = CATEGORY_EDITORIAL_DATA[key];
            const isActive = activeCategoryKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategoryKey(key)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#701A75] to-[#9D174D] dark:from-[#A855F7] dark:to-[#EC4899] text-white shadow-lg shadow-pink-500/25 scale-[1.02]'
                    : 'bg-white/80 dark:bg-[#1C102A]/80 text-[#4E345D] dark:text-[#D8C7E5] border border-[#701A75]/15 dark:border-[#C084FC]/20 hover:border-[#EC4899] hover:bg-white'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-[#86198F] dark:text-[#F472B6]'}`}>
                  {cat.number}
                </span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            CENTERPIECE: ARTISTIC OVERLAPPING VISUAL COMPOSITION
            Left Column: Frosted Dossier Card (rounded-[2.5rem])
            Right Column: Horizontally Overlapping Stadium-Rounded Images (rounded-[2.5rem], rounded-[2.2rem])
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2">
          
          {/* LEFT COLUMN: Clean Direct Typography (Zero Card Box) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#86198F] dark:text-[#F472B6] px-2.5 py-0.5 rounded-full bg-[#701A75]/10 dark:bg-[#F472B6]/15">
                  {activeCategory.floorBadge}
                </span>
                <span className="text-xs font-mono text-[#5D5070] dark:text-[#D8CEE9]">
                  Chapter {activeCategory.number}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1B1325] dark:text-[#FAF0F8] tracking-tight">
                {activeCategory.title}
              </h3>
              
              {/* PROMINENTLY HIGHLIGHTED BRANDS */}
              <div className="pt-1 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#86198F] dark:text-[#F472B6] block">
                  Featured Brands
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCategory.featuredBrands.map((brandName) => (
                    <span
                      key={brandName}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl bg-black/5 dark:bg-white/10 text-[#701A75] dark:text-[#FAF0F8] border border-[#701A75]/20 dark:border-white/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                      <span>{brandName}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Needful Single Sentence */}
              <p className="text-xs text-[#3D2E50] dark:text-[#D8CEE9] font-medium leading-relaxed pt-1">
                {activeCategory.quote.split('.')[0]}.
              </p>
            </div>

            {/* Numbered Category List */}
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
              {CATEGORY_KEYS.map((key) => {
                const cat = CATEGORY_EDITORIAL_DATA[key];
                const isSelected = activeCategoryKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onMouseEnter={() => setActiveCategoryKey(key)}
                    onClick={() => setActiveCategoryKey(key)}
                    className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-2xl transition-all cursor-pointer text-left border ${
                      isSelected
                        ? 'bg-black/5 dark:bg-white/15 border-[#EC4899]'
                        : 'bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r ${cat.gradient} shrink-0 shadow-xs`}
                      >
                        {cat.number}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#1B1325] dark:text-[#FAF0F8] block truncate">
                          {cat.title}
                        </span>
                        <span className="text-[10px] text-[#5D5070] dark:text-[#D8CEE9] block truncate">
                          {cat.chapter}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-[#EC4899] dark:text-[#F472B6] shrink-0 transition-transform ${
                        isSelected ? 'translate-x-0.5 opacity-100' : 'opacity-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Gradient Pill CTA Button */}
            <div className="pt-1">
              <Link
                to={activeCategory.route}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] rounded-2xl bg-gradient-to-r from-[#701A75] via-[#86198F] to-[#9D174D] dark:from-[#A855F7] dark:via-[#EC4899] dark:to-[#F43F5E] text-white shadow-lg hover:opacity-95 transition-all cursor-pointer"
              >
                <span>Explore {activeCategory.title} ↗</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Horizontally Overlapping Stadium-Rounded Images */}
          <div className="lg:col-span-7 relative flex items-center justify-start overflow-visible pt-4 lg:pt-0">
            <div className="flex items-center -space-x-8 sm:-space-x-12 w-full select-none">
              {/* Primary Stadium-Rounded Image Panel (Dominant Hero) */}
              <div className="relative w-[54%] aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 z-30 ring-2 ring-[#EC4899]/30 transition-all duration-500 hover:scale-[1.03] group cursor-pointer">
                <ResilientImage
                  src={activeCategory.mainImage}
                  alt={activeCategory.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/60 text-white/95 backdrop-blur-md border border-white/20">
                    Chapter {activeCategory.number} · {activeCategory.floorBadge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-mono text-[#F472B6] block truncate">
                      {activeCategory.chapter}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white drop-shadow-sm truncate">
                      {activeCategory.title}
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-[#F472B6] bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-md shrink-0">
                    View →
                  </span>
                </div>
              </div>

              {/* Supporting Stadium-Rounded Image 1 */}
              <div className="relative w-[38%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 z-20 transition-all duration-500 hover:scale-[1.04] hover:z-40 group cursor-pointer">
                <ResilientImage
                  src={activeCategory.supportingImage}
                  alt={activeCategory.supportingCaption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="text-xs font-black text-white bg-black/85 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 block truncate shadow-md">
                    {activeCategory.supportingCaption}
                  </span>
                </div>
              </div>

              {/* Supporting Stadium-Rounded Image 2 */}
              <div className="relative w-[36%] aspect-[3/3.8] rounded-[2.2rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 z-10 transition-all duration-500 hover:scale-[1.04] hover:z-40 group cursor-pointer">
                <ResilientImage
                  src={activeCategory.accentImage}
                  alt={activeCategory.accentCaption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="text-[9px] font-bold text-white/90 bg-black/75 px-2.5 py-1 rounded-full backdrop-blur-md block truncate">
                    {activeCategory.accentCaption}
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
