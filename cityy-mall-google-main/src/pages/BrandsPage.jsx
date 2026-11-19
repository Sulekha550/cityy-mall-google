import { useMemo, useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  MapPin,
  Film,
  Compass,
  Clock,
  Camera,
} from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { SCENE_IMAGES } from '../assets/imageRegistry';
import {
  APPROVED_BRANDS,
  SAMPLE_CINEMA_FEATURES,
  MALL_IDENTITY,
} from '../utilities/brandsData';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

// Curated architectural multi-image angles per brand
const BRAND_GALLERY_IMAGES = {
  'louis-philippe': [
    APPROVED_BRANDS.find((b) => b.id === 'louis-philippe')?.image,
    SCENE_IMAGES.brandsScene2,
    SCENE_IMAGES.shoppingScene2,
  ],
  'levis-store': [
    APPROVED_BRANDS.find((b) => b.id === 'levis-store')?.image,
    SCENE_IMAGES.shoppingScene2,
    SCENE_IMAGES.brandsScene3,
  ],
  'w-for-woman': [
    APPROVED_BRANDS.find((b) => b.id === 'w-for-woman')?.image,
    SCENE_IMAGES.shoppingScene3,
    SCENE_IMAGES.brandsScene4,
  ],
  'allen-solly': [
    APPROVED_BRANDS.find((b) => b.id === 'allen-solly')?.image,
    SCENE_IMAGES.brandsScene4,
    SCENE_IMAGES.shoppingScene2,
  ],
  'adidas': [
    APPROVED_BRANDS.find((b) => b.id === 'adidas')?.image,
    SCENE_IMAGES.brandsScene2,
    SCENE_IMAGES.shoppingScene4,
  ],
  'puma': [
    APPROVED_BRANDS.find((b) => b.id === 'puma')?.image,
    SCENE_IMAGES.brandsScene3,
    SCENE_IMAGES.shoppingScene3,
  ],
  'woodland-store': [
    APPROVED_BRANDS.find((b) => b.id === 'woodland-store')?.image,
    SCENE_IMAGES.shoppingScene2,
    SCENE_IMAGES.brandsScene4,
  ],
  'skechers': [
    APPROVED_BRANDS.find((b) => b.id === 'skechers')?.image,
    SCENE_IMAGES.shoppingScene4,
    SCENE_IMAGES.brandsScene2,
  ],
  'tanishq': [
    APPROVED_BRANDS.find((b) => b.id === 'tanishq')?.image,
    SCENE_IMAGES.brandsScene3,
    SCENE_IMAGES.shoppingScene2,
  ],
  'titan-world': [
    APPROVED_BRANDS.find((b) => b.id === 'titan-world')?.image,
    SCENE_IMAGES.brandsScene2,
    SCENE_IMAGES.shoppingScene4,
  ],
  'looks-salon': [
    APPROVED_BRANDS.find((b) => b.id === 'looks-salon')?.image,
    SCENE_IMAGES.brandsScene3,
    SCENE_IMAGES.shoppingScene3,
  ],
  'spencers': [
    APPROVED_BRANDS.find((b) => b.id === 'spencers')?.image,
    SCENE_IMAGES.shoppingScene4,
    SCENE_IMAGES.brandsScene4,
  ],
  'inox-cinemas': [
    APPROVED_BRANDS.find((b) => b.id === 'inox-cinemas')?.image,
    SCENE_IMAGES.cinemaPosterHeritage,
    SCENE_IMAGES.cinemaPosterOdyssey,
  ],
};

// Mall floor directory mapping for CITY MALL Gorakhpur premier outlets
const BRAND_FLOOR_MAP = {
  'louis-philippe': {
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-04',
    levelId: 'gf',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Haute Menswear',
    color: '#818CF8',
    access: 'Central Promenade',
  },
  'levis-store': {
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-11',
    levelId: 'gf',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Iconic Denim',
    color: '#F87171',
    access: 'Central Promenade',
  },
  'w-for-woman': {
    floor: 'First Floor',
    levelCode: 'LEVEL 01',
    suite: 'Suite 1-08',
    levelId: '1f',
    hours: '10:00 AM – 09:30 PM',
    tag: 'Contemporary Ethnic',
    color: '#F472B6',
    access: 'East Wing Gallery',
  },
  'allen-solly': {
    floor: 'First Floor',
    levelCode: 'LEVEL 01',
    suite: 'Suite 1-14',
    levelId: '1f',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Smart Casuals',
    color: '#34D399',
    access: 'West Wing Concourse',
  },
  'adidas': {
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-02',
    levelId: '2f',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Athletic Performance',
    color: '#38BDF8',
    access: 'Central Arena',
  },
  'puma': {
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-05',
    levelId: '2f',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Speed & Sportswear',
    color: '#FB923C',
    access: 'North Wing Promenade',
  },
  'woodland-store': {
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-12',
    levelId: '2f',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Outdoor Adventure',
    color: '#A3E635',
    access: 'South Concourse',
  },
  'skechers': {
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-18',
    levelId: '2f',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Comfort & Running',
    color: '#A78BFA',
    access: 'East Wing',
  },
  'tanishq': {
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-01',
    levelId: 'gf',
    hours: '10:30 AM – 09:30 PM',
    tag: 'Gold & Diamonds',
    color: '#FBBF24',
    access: 'Main Frontage Atrium',
  },
  'titan-world': {
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-02',
    levelId: 'gf',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Haute Horlogerie',
    color: '#CBD5E1',
    access: 'West Gallery',
  },
  'looks-salon': {
    floor: 'Third Floor',
    levelCode: 'LEVEL 03',
    suite: 'Suite 3-06',
    levelId: '3f',
    hours: '10:00 AM – 09:30 PM',
    tag: 'Salon & Wellness',
    color: '#E879F9',
    access: 'West Wing Pavilion',
  },
  'spencers': {
    floor: 'Lower Ground',
    levelCode: 'LEVEL LG',
    suite: 'Suite LG-01',
    levelId: 'lg',
    hours: '08:30 AM – 10:30 PM',
    tag: 'Hypermarket',
    color: '#4ADE80',
    access: 'Lower Ground Atrium',
  },
  'inox-cinemas': {
    floor: 'Fourth Floor',
    levelCode: 'LEVEL 04',
    suite: 'Multiplex Level',
    levelId: '4f',
    hours: '09:00 AM – 01:00 AM',
    tag: 'Multiplex INSIGNIA',
    color: '#F43F5E',
    access: 'Express Elevator & Escalator',
  },
};

// Floor Levels for Architectural Discovery
const FLOOR_LEVELS = [
  { id: 'all', shortLabel: 'All Levels', badge: '13 Outlets' },
  { id: 'gf', shortLabel: 'Level 00', badge: 'Ground' },
  { id: '1f', shortLabel: 'Level 01', badge: 'Fashion' },
  { id: '2f', shortLabel: 'Level 02', badge: 'Sportswear' },
  { id: '3f', shortLabel: 'Level 03', badge: 'Salon' },
  { id: 'lg', shortLabel: 'Level LG', badge: "Spencer's" },
  { id: '4f', shortLabel: 'Level 04', badge: 'INOX' },
];

export function BrandsPage({ onInspectBrand }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [activeBrandId, setActiveBrandId] = useState('louis-philippe');
  const [activeImageAngleIndex, setActiveImageAngleIndex] = useState(0);

  // Filter out any dining/filler brands, keeping strictly the 13 premier retail houses
  const premier13Brands = useMemo(() => {
    return APPROVED_BRANDS.filter((b) => b.categoryId !== 'dining');
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredBrands = useMemo(() => {
    return premier13Brands.filter((b) => {
      const matchesCat =
        selectedCategory === 'all' || b.categoryId === selectedCategory;
      if (!matchesCat) return false;

      const floorInfo = BRAND_FLOOR_MAP[b.id];
      const matchesFloor =
        selectedFloor === 'all' || floorInfo?.levelId === selectedFloor;
      if (!matchesFloor) return false;

      if (!normalizedQuery) return true;
      return (
        b.name.toLowerCase().includes(normalizedQuery) ||
        b.categoryName.toLowerCase().includes(normalizedQuery) ||
        b.tagline.toLowerCase().includes(normalizedQuery) ||
        (floorInfo?.floor || '').toLowerCase().includes(normalizedQuery) ||
        (floorInfo?.suite || '').toLowerCase().includes(normalizedQuery)
      );
    });
  }, [premier13Brands, normalizedQuery, selectedCategory, selectedFloor]);

  // Keep activeBrand synchronized
  const activeBrand = useMemo(() => {
    const found = filteredBrands.find((b) => b.id === activeBrandId);
    return found || filteredBrands[0] || premier13Brands[0];
  }, [filteredBrands, activeBrandId, premier13Brands]);

  // Reset angle index when brand changes
  useEffect(() => {
    setActiveImageAngleIndex(0);
  }, [activeBrand?.id]);

  const activeFloorData = BRAND_FLOOR_MAP[activeBrand?.id] || {
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-01',
    hours: '10:00 AM – 10:00 PM',
    tag: 'Luxury Boutique',
    color: '#D63F28',
    access: 'Central Promenade',
  };

  const galleryImages = BRAND_GALLERY_IMAGES[activeBrand?.id] || [
    activeBrand?.image,
    SCENE_IMAGES.brandsScene2,
    SCENE_IMAGES.shoppingScene2,
  ];

  const currentDisplayImage =
    galleryImages[activeImageAngleIndex] || activeBrand?.image;

  return (
    <div className="relative min-h-screen bg-[#FAF4ED] dark:bg-[#140D1F] text-[#1E112A] dark:text-[#FAF0F8] transition-colors duration-300">
      {/* Animated Ambient Background */}
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.brandsStorefronts}
        variant="brands"
        eager
        playbackRate={0.65}
        videoOpacityClassName="opacity-60 dark:opacity-45"
        tintClassName="bg-gradient-to-b from-[#FAF4ED]/90 via-[#F3E5F5]/60 to-[#FCE7F3]/85 dark:from-[#140D1F]/94 dark:via-[#1E122E]/70 dark:to-[#140D1F]/96"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:py-10 space-y-8 sm:space-y-10">

        {/* =========================================================================
            TOP MINIMAL HEADER & SEARCH (Ultra-Crisp Text)
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2D1D48]/12 dark:border-white/12">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D63F28] dark:text-[#FFA07A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>13 Premier Flagships · {MALL_IDENTITY.name}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1D1129] dark:text-[#FAF0F8]">
              Flagship Boutiques
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#D63F28] dark:text-[#FFA07A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search boutique or floor..."
              aria-label="Search brands directory"
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-[#1E122E]/90 text-[#1D1129] dark:text-[#FAF0F8] placeholder:text-[#6E557F] dark:placeholder:text-[#BFA1FF] focus:outline-none focus:ring-2 focus:ring-[#D63F28] transition-all shadow-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6E557F] hover:text-[#1D1129] dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            FLOOR LEVEL FILTER PILLS (Orion Mall Style)
           ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D63F28] dark:text-[#FFA07A] shrink-0 flex items-center gap-1.5 mr-1">
            <Compass className="w-3.5 h-3.5" /> Level:
          </span>
          {FLOOR_LEVELS.map((lvl) => {
            const active = selectedFloor === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setSelectedFloor(lvl.id);
                  const firstMatch =
                    lvl.id === 'all'
                      ? premier13Brands[0]
                      : premier13Brands.find(
                          (b) => BRAND_FLOOR_MAP[b.id]?.levelId === lvl.id
                        );
                  if (firstMatch) setActiveBrandId(firstMatch.id);
                }}
                className={`px-3.5 py-1.5 text-xs rounded-full font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  active
                    ? 'bg-[#D63F28] text-white border-[#D63F28] shadow-md shadow-[#D63F28]/25 scale-[1.02]'
                    : 'bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#4A3258] dark:text-[#D8C7E5] hover:border-[#D63F28]/50 hover:bg-white'
                }`}
              >
                {lvl.shortLabel} · <span className="opacity-80 text-[10px] font-medium">{lvl.badge}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            MASTER BRAND STAGE (Exact Reference Style: Multi-Image Showcase + Zero Cards)
            Left: Floor Kicker + Headline + 1-Line Text + 2-Column Brand Logo Pills
            Right: Monumental Stadium Vitrine + Multi-Angle Switcher + Bottom Capsule
           ========================================================================= */}
        {activeBrand && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Kicker, Title & Interactive Brand Logo Pills (5 cols) */}
              <div className="lg:col-span-5 space-y-5" data-motion="reveal">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D63F28] dark:text-[#FFA07A] block">
                    {activeFloorData.levelCode} • {activeFloorData.floor.toUpperCase()}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D1129] dark:text-[#FAF0F8] tracking-tight leading-[1.08]">
                    Flagship Icons &amp; Tech
                  </h2>
                  <p className="text-xs sm:text-sm text-[#3D2E50] dark:text-[#D8CEE9] font-medium leading-relaxed">
                    {filteredBrands.length} premier boutiques on {activeFloorData.floor}.
                  </p>
                </div>

                {/* 2-Column Brand Logo Pills (Exact Orion Mall Reference Style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-[460px] overflow-y-auto pr-1 scrollbar-none">
                  {filteredBrands.map((brand) => {
                    const isSelected = brand.id === activeBrand.id;
                    const bFloor = BRAND_FLOOR_MAP[brand.id];

                    return (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => setActiveBrandId(brand.id)}
                        onMouseEnter={() => setActiveBrandId(brand.id)}
                        className={`group/btn flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer text-left border ${
                          isSelected
                            ? 'bg-[#D63F28]/10 dark:bg-white/15 border-2 border-[#D63F28] dark:border-[#FFA07A] shadow-md ring-2 ring-[#FFA07A]/30 scale-[1.01]'
                            : 'bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover:bg-white dark:hover:bg-white/10'
                        }`}
                      >
                        {/* Monogram / Insignia Pill */}
                        <div
                          className={`w-9 h-7 sm:w-10 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs border transition-colors ${
                            isSelected
                              ? 'bg-[#D63F28] text-white border-transparent'
                              : 'bg-black/5 dark:bg-white/10 text-[#1B1325] dark:text-[#FAF0F8] border-black/5 dark:border-white/10'
                          }`}
                        >
                          {brand.monogram}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`block font-extrabold text-xs sm:text-sm tracking-tight truncate ${
                              isSelected
                                ? 'text-[#D63F28] dark:text-[#FFA07A]'
                                : 'text-[#1B1325] dark:text-[#FAF0F8]'
                            }`}
                          >
                            {brand.name}
                          </span>
                          <span className="text-[10px] text-[#5D5070] dark:text-[#D8CEE9] block truncate font-medium">
                            {bFloor?.suite || bFloor?.floor}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Multi-Image Architectural Vitrine (7 cols) */}
              <div className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border-3 border-white/95 dark:border-white/20 bg-[#250B08] group">
                
                {/* Active Storefront / Scene Image */}
                <ResilientImage
                  src={currentDisplayImage}
                  alt={`${activeBrand.name} Store Showcase`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Top Left Badge: Floor & Suite */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFA07A] animate-pulse" />
                  <span className="text-xs font-black text-white tracking-wide">
                    {activeFloorData.floor} · {activeFloorData.suite}
                  </span>
                </div>

                {/* Top Right: Architectural Multi-Angle Switcher */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/25 shadow-lg">
                  {galleryImages.map((img, idx) => {
                    const isActive = idx === activeImageAngleIndex;
                    const labels = ['Showroom', 'Facade', 'Atrium'];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageAngleIndex(idx);
                        }}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#D63F28] text-white shadow-xs'
                            : 'text-white/80 hover:text-white hover:bg-white/15'
                        }`}
                      >
                        {labels[idx] || `Angle 0${idx + 1}`}
                      </button>
                    );
                  })}
                </div>

                {/* Overlapping Secondary Vitrine (Corner Window) */}
                {galleryImages[1] && activeImageAngleIndex === 0 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageAngleIndex(1);
                    }}
                    className="hidden sm:block absolute bottom-24 right-4 z-20 w-36 sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/80 dark:border-white/30 shadow-2xl bg-black/80 cursor-pointer group/sec hover:scale-105 transition-transform"
                    title="Click to view Atrium Facade"
                  >
                    <ResilientImage
                      src={galleryImages[1]}
                      alt={`${activeBrand.name} Concourse View`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/sec:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2 pointer-events-none">
                      <span className="text-[9px] font-mono font-bold text-white bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <Camera className="w-2.5 h-2.5 text-[#FFA07A]" />
                        Atrium Facade
                      </span>
                    </div>
                  </div>
                )}

                {/* Floating Bottom Card / Pill (Exact Orion Mall Reference Style) */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-[#1C0A08]/95 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D63F28]/10 dark:bg-[#FFA07A]/15 text-[#D63F28] dark:text-[#FFA07A] border border-[#D63F28]/20">
                        0{filteredBrands.findIndex((b) => b.id === activeBrand.id) + 1} / 13
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-[#1B1325] dark:text-[#FFF6EA] tracking-tight truncate">
                        {activeBrand.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#433754] dark:text-[#D8CEE9] line-clamp-1">
                      {activeFloorData.hours} · {activeBrand.tagline}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onInspectBrand?.(activeBrand)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.14em] bg-gradient-to-r from-[#D63F28] to-[#B36624] text-white shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer shrink-0"
                  >
                    <span>Inspect Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ALL-BRAND ARCHITECTURAL LOOKBOOK RUNWAY (Pure Visual Vitrines, Zero Bulky Cards)
               ========================================================================= */}
            <div className="space-y-3 pt-6 border-t border-[#2D1D48]/12 dark:border-white/12">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D63F28] animate-pulse" />
                  <span className="font-bold uppercase tracking-[0.16em] text-[#D63F28] dark:text-[#FFA07A] text-xs">
                    Haute Boutique Vitrines · All {filteredBrands.length} Flagships
                  </span>
                </div>
                <span className="text-xs font-mono text-[#5C426E] dark:text-[#BFA1FF]">
                  Select boutique to spotlight
                </span>
              </div>

              {/* Horizontally Overlapping Stadium-Rounded Vitrines */}
              <div className="relative flex items-center justify-start overflow-x-auto pb-4 pt-1 scrollbar-none">
                <div className="flex items-center -space-x-6 sm:-space-x-10 w-max select-none py-2">
                  {filteredBrands.map((brand, idx) => {
                    const isSelected = activeBrand.id === brand.id;
                    const floorInfo = BRAND_FLOOR_MAP[brand.id] || { floor: 'Ground Floor', suite: 'Suite G-01' };

                    return (
                      <div
                        key={brand.id}
                        onMouseEnter={() => setActiveBrandId(brand.id)}
                        onClick={() => {
                          setActiveBrandId(brand.id);
                          onInspectBrand?.(brand);
                        }}
                        className={`relative shrink-0 ${
                          isSelected
                            ? 'w-64 sm:w-80 aspect-[16/11] rounded-[2.5rem] z-30 ring-3 ring-[#D63F28] dark:ring-[#FFA07A] shadow-2xl scale-[1.04]'
                            : 'w-48 sm:w-60 aspect-[3/3.8] rounded-[2.2rem] ' + (idx % 2 === 0 ? 'z-20' : 'z-10')
                        } overflow-hidden shadow-xl border-3 border-white/95 dark:border-white/20 transition-all duration-500 hover:scale-[1.05] hover:z-40 cursor-pointer group`}
                      >
                        <ResilientImage
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/75 text-white/95 backdrop-blur-md border border-white/20 shadow-md">
                            {floorInfo.floor}
                          </span>
                          <div className="w-7 h-7 rounded-xl bg-white/95 dark:bg-[#1A0E2A]/95 backdrop-blur-md shadow-md flex items-center justify-center font-black text-xs text-[#1D1129] dark:text-[#FAF0F8] border border-white/40">
                            <span>{brand.monogram}</span>
                          </div>
                        </div>

                        {/* Bottom Floating Metadata */}
                        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-1.5">
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono font-bold text-[#FFA07A] block truncate">
                              {floorInfo.suite}
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-white drop-shadow-md truncate tracking-tight">
                              {brand.name}
                            </h4>
                          </div>
                          <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#D63F28] to-[#B36624] px-2.5 py-0.5 rounded-full shadow-md shrink-0">
                            Inspect ↗
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =========================================================================
                PURE ARCHITECTURAL LOOKBOOK GRID (High-Res Images, Zero Card Boxes)
               ========================================================================= */}
            <div className="space-y-4 pt-6 border-t border-[#2D1D48]/12 dark:border-white/12">
              <div className="flex items-center justify-between px-1">
                <span className="font-bold uppercase tracking-[0.16em] text-[#D63F28] dark:text-[#FFA07A] text-xs">
                  Architectural Storefront Directory
                </span>
                <span className="text-xs font-mono text-[#5C426E] dark:text-[#BFA1FF]">
                  {filteredBrands.length} Showrooms
                </span>
              </div>

              {/* Pure High-Res Photo Vitrines in a 3-Column Architectural Mosaic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrands.map((brand) => {
                  const isSelected = activeBrand.id === brand.id;
                  const floorInfo = BRAND_FLOOR_MAP[brand.id] || { floor: 'Ground Floor', suite: 'Suite G-01' };

                  return (
                    <div
                      key={brand.id}
                      onClick={() => {
                        setActiveBrandId(brand.id);
                        onInspectBrand?.(brand);
                      }}
                      className={`group relative aspect-[16/11] rounded-3xl overflow-hidden shadow-xl border-2 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-[#D63F28] ring-2 ring-[#FFA07A]/40 scale-[1.02]'
                          : 'border-white/80 dark:border-white/15 hover:border-[#D63F28]/60 hover:scale-[1.01]'
                      }`}
                    >
                      <ResilientImage
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/75 text-white backdrop-blur-md border border-white/20">
                          {floorInfo.floor} · {floorInfo.suite}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-white/95 dark:bg-[#1A0E2A]/95 backdrop-blur-md shadow-md flex items-center justify-center font-black text-xs text-[#1D1129] dark:text-[#FAF0F8]">
                          {brand.monogram}
                        </div>
                      </div>

                      {/* Bottom Floating Pill with Name and Tagline */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15">
                        <div className="min-w-0">
                          <h4 className="text-sm font-black text-white tracking-tight truncate">
                            {brand.name}
                          </h4>
                          <p className="text-[11px] text-white/80 truncate font-medium">
                            {brand.tagline}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#D63F28] to-[#B36624] px-3 py-1 rounded-xl shrink-0">
                          View ↗
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section: Multiplex Cinema Highlights (When Cinema is Selected) */}
        {selectedCategory === 'cinema' && (
          <div className="rounded-3xl border border-[#2D1D48]/15 dark:border-white/15 bg-[#1A0E2A] text-white p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#F472B6]" />
                <h3 className="font-display text-xl font-bold text-white">
                  INOX Cinemas Multiplex Features
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#E9D5FF]">
                Fourth Floor Multiplex
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SAMPLE_CINEMA_FEATURES.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-2"
                >
                  <p className="text-xs font-bold text-[#F472B6]">
                    {item.genre}
                  </p>
                  <h4 className="font-display text-base font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/70 line-clamp-1">
                    {item.format}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
