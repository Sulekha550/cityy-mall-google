import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
} from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { BRAND_IMAGES } from '../assets/imageRegistry';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

// Master catalog of all 23 approved brands inside CITY MALL
// Ordered so that at activeIndex = 0, the 9 visible carousel panels match the reference image exactly:
// Titan World (-4), Woodland (-3), Puma (-2), Levi's (-1), INOX Cinemas (0), Skechers (+1), W for Woman (+2), Flying Machine (+3), Red Chief (+4)
const ALL_HOMEPAGE_BRANDS = [
  {
    id: 'inox-cinemas',
    name: 'INOX Cinemas',
    category: 'Cinema & Multiplex',
    categoryId: 'cinema',
    floor: 'Fourth Floor',
    suite: 'Multiplex Level',
    tagline: 'Multiplex INSIGNIA & Laser 4K Screens',
    accentColor: '#1E40AF',
    image: BRAND_IMAGES.inoxCinemas,
  },
  {
    id: 'skechers',
    name: 'Skechers',
    category: 'Footwear & Sportswear',
    categoryId: 'footwear',
    floor: 'Second Floor',
    suite: 'Suite 2-18',
    tagline: 'Comfort Step & Performance Running Footwear',
    accentColor: '#2563EB',
    image: BRAND_IMAGES.skechers,
  },
  {
    id: 'w-for-woman',
    name: 'W for Woman',
    category: 'Fashion & Ethnic',
    categoryId: 'fashion',
    floor: 'First Floor',
    suite: 'Suite 1-08',
    tagline: 'Contemporary Indian & Fusion Women’s Wear',
    accentColor: '#D97706',
    image: BRAND_IMAGES.wForWoman,
  },
  {
    id: 'flying-machine',
    name: 'Flying Machine',
    category: 'Fashion & Denim',
    categoryId: 'fashion',
    floor: 'First Floor',
    suite: 'Suite 1-10',
    tagline: 'New Generation Cool & Authentic Denimwear',
    accentColor: '#E11D48',
    image: BRAND_IMAGES.flyingMachine,
  },
  {
    id: 'red-chief',
    name: 'Red Chief',
    category: 'Footwear & Leather',
    categoryId: 'footwear',
    floor: 'Second Floor',
    suite: 'Suite 2-08',
    tagline: 'Genuine Leather Footwear & Lifestyle Gear',
    accentColor: '#B91C1C',
    image: BRAND_IMAGES.redChief,
  },
  {
    id: 'adidas',
    name: 'Adidas',
    category: 'Footwear & Sportswear',
    categoryId: 'footwear',
    floor: 'Second Floor',
    suite: 'Suite 2-02',
    tagline: 'Athletic Footwear & Performance Sportswear',
    accentColor: '#0284C7',
    image: BRAND_IMAGES.adidas,
  },
  {
    id: 'allen-solly',
    name: 'Allen Solly',
    category: 'Fashion & Apparel',
    categoryId: 'fashion',
    floor: 'First Floor',
    suite: 'Suite 1-14',
    tagline: 'Friday Dressing & Smart Tailored Workwear',
    accentColor: '#059669',
    image: BRAND_IMAGES.allenSolly,
  },
  {
    id: 'louis-philippe',
    name: 'Louis Philippe',
    category: 'Fashion & Apparel',
    categoryId: 'fashion',
    floor: 'Ground Floor',
    suite: 'Suite G-04',
    tagline: 'Haute Menswear & Sovereign Formalwear',
    accentColor: '#6B21A8',
    image: BRAND_IMAGES.louisPhilippe,
  },
  {
    id: 'tanishq',
    name: 'Tanishq',
    category: 'Jewellery & Watches',
    categoryId: 'jewellery',
    floor: 'Ground Floor',
    suite: 'Suite G-01',
    tagline: 'Imperial 24K Gold & Certified Solitaires',
    accentColor: '#D97706',
    image: BRAND_IMAGES.tanishq,
  },
  {
    id: 'metro-shoes',
    name: 'Metro Shoes',
    category: 'Footwear & Accessories',
    categoryId: 'footwear',
    floor: 'Second Floor',
    suite: 'Suite 2-15',
    tagline: 'Artisan Dress Shoes & Contemporary Footwear',
    accentColor: '#C026D3',
    image: BRAND_IMAGES.metroShoes,
  },
  {
    id: 'looks-salon',
    name: 'Looks Salon',
    category: 'Beauty & Lifestyle',
    categoryId: 'beauty',
    floor: 'Third Floor',
    suite: 'Suite 3-06',
    tagline: 'Luxury Salon Grooming & Wellness Sanctuary',
    accentColor: '#DB2777',
    image: BRAND_IMAGES.looksSalon,
  },
  {
    id: 'spencers',
    name: "Spencer's",
    category: 'Supermarket & Retail',
    categoryId: 'supermarket',
    floor: 'Lower Ground',
    suite: 'Suite LG-01',
    tagline: 'Gourmet Hypermarket & Everyday Goods',
    accentColor: '#16A34A',
    image: BRAND_IMAGES.spencers,
  },
  {
    id: 'pizza-hut',
    name: 'Pizza Hut',
    category: 'Dining & Cafes',
    categoryId: 'dining',
    floor: 'Third Floor',
    suite: 'Suite 3-02',
    tagline: 'Pan Pizzas, Melted Mozzarella & Garlic Bread',
    accentColor: '#E11D48',
    image: BRAND_IMAGES.pizzaHut,
  },
  {
    id: 'kfc',
    name: 'KFC',
    category: 'Dining & Cafes',
    categoryId: 'dining',
    floor: 'Third Floor',
    suite: 'Suite 3-04',
    tagline: 'Crispy Fried Chicken Buckets & Zinger Burgers',
    accentColor: '#DC2626',
    image: BRAND_IMAGES.kfc,
  },
  {
    id: 'barbeque-nation',
    name: 'Barbeque Nation',
    category: 'Dining & Cafes',
    categoryId: 'dining',
    floor: 'Third Floor',
    suite: 'Suite 3-01',
    tagline: 'Live Charcoal Table Grills & Limitless Buffet',
    accentColor: '#EA580C',
    image: BRAND_IMAGES.barbequeNation,
  },
  {
    id: 'mufti',
    name: 'Mufti',
    category: 'Fashion & Apparel',
    categoryId: 'fashion',
    floor: 'First Floor',
    suite: 'Suite 1-16',
    tagline: 'Urban Streetwear & Expressive Casuals',
    accentColor: '#4F46E5',
    image: BRAND_IMAGES.mufti,
  },
  {
    id: 'arjun-mehendi',
    name: 'Arjun Mehendi Art',
    category: 'Beauty & Lifestyle',
    categoryId: 'beauty',
    floor: 'First Floor',
    suite: 'Atrium Pavilion',
    tagline: 'Ceremonial Henna & Bridal Mehendi Artistry',
    accentColor: '#B45309',
    image: BRAND_IMAGES.arjunMehendi,
  },
  {
    id: 'pind-balluchi',
    name: 'Pind Balluchi',
    category: 'Dining & Cafes',
    categoryId: 'dining',
    floor: 'Third Floor',
    suite: 'Suite 3-08',
    tagline: 'Authentic Village Ambience & Awadhi Delicacies',
    accentColor: '#D97706',
    image: BRAND_IMAGES.pindBalluchi,
  },
  {
    id: 'dosa-plaza',
    name: 'Dosa Plaza',
    category: 'Dining & Cafes',
    categoryId: 'dining',
    floor: 'Third Floor',
    suite: 'Suite 3-10',
    tagline: '104+ Varieties of Fusion & Pure Veg Dosas',
    accentColor: '#059669',
    image: BRAND_IMAGES.dosaPlaza,
  },
  {
    id: 'titan-world',
    name: 'Titan World',
    category: 'Jewellery & Watches',
    categoryId: 'jewellery',
    floor: 'Ground Floor',
    suite: 'Suite G-02',
    tagline: 'Precision Chronometers & Haute Horlogerie',
    accentColor: '#475569',
    image: BRAND_IMAGES.titanWorld,
  },
  {
    id: 'woodland-store',
    name: 'Woodland',
    category: 'Footwear & Outdoor',
    categoryId: 'footwear',
    floor: 'Second Floor',
    suite: 'Suite 2-12',
    tagline: 'Outdoor Rugged Boots & Expedition Gear',
    accentColor: '#15803D',
    image: BRAND_IMAGES.woodlandStore,
  },
  {
    id: 'puma',
    name: 'Puma',
    category: 'Footwear & Sportswear',
    categoryId: 'footwear',
    floor: 'Second Floor',
    suite: 'Suite 2-05',
    tagline: 'Forever Faster Speed & Athletic Sportswear',
    accentColor: '#EA580C',
    image: BRAND_IMAGES.puma,
  },
  {
    id: 'levis-store',
    name: "Levi's",
    category: 'Fashion & Denim',
    categoryId: 'fashion',
    floor: 'Ground Floor',
    suite: 'Suite G-11',
    tagline: 'Iconic Heritage Denim & 501 Collection',
    accentColor: '#DC2626',
    image: BRAND_IMAGES.levisStore,
  },
];

// Authentic Vector Brand Logos rendered inside floating glass panels
function BrandLogoEmblem({ brandId, className = 'w-full h-full' }) {
  switch (brandId) {
    case 'inox-cinemas':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="flex items-center tracking-tighter font-black text-2xl sm:text-3xl font-display text-[#004B93] dark:text-[#60A5FA]">
            <span>IN</span>
            <div className="relative inline-flex items-center justify-center mx-0.5">
              <span>O</span>
              <span className="absolute inset-0 flex items-center justify-center text-[#F59E0B] text-lg sm:text-xl font-black">
                ☀
              </span>
            </div>
            <span>X</span>
          </div>
          <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-[#004B93] dark:text-[#93C5FD] mt-0.5">
            CINEMAS
          </span>
        </div>
      );

    case 'levis-store':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <div className="relative bg-[#C41230] px-4 py-2 sm:px-5 sm:py-2.5 rounded-b-xl shadow-md flex items-center justify-center">
            <span className="font-display font-black text-white text-base sm:text-xl tracking-tight leading-none italic font-serif">
              Levi&apos;s
            </span>
            <span className="absolute -top-1 -right-1 text-[8px] font-bold text-white bg-[#C41230] rounded-full px-1">
              ®
            </span>
          </div>
        </div>
      );

    case 'puma':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 100 48" className="w-16 sm:w-20 h-8 sm:h-10 fill-current text-[#111827] dark:text-white">
            <path d="M78 6c-3-2-7-1-9 1l-14 11-7-4c-3-2-7-2-10 0l-12 8c-3 2-4 5-3 8l2 6-8 4c-3 2-5 5-5 9h5c2-3 4-5 7-6l9-5 6 3c3 1 7 1 10-1l14-9 6 3c3 2 7 1 9-1l12-10c2-2 2-5 0-7l-12-7z" />
          </svg>
          <span className="font-display font-black tracking-[0.18em] text-lg sm:text-2xl text-[#111827] dark:text-white mt-0.5">
            PUMA
          </span>
        </div>
      );

    case 'woodland-store':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-9 h-9 sm:w-11 sm:h-11 text-[#15803D] dark:text-[#4ADE80] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 2L4 12h4l-3 6h6v4h2v-4h6l-3-6h4L12 2z" />
            </svg>
          </div>
          <span className="font-display font-black tracking-[0.14em] text-xs sm:text-sm uppercase text-[#15803D] dark:text-[#4ADE80] mt-1">
            WOODLAND
          </span>
        </div>
      );

    case 'titan-world':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#1E293B] dark:border-white flex items-center justify-center font-display font-black text-base sm:text-lg text-[#1E293B] dark:text-white">
            T
          </div>
          <span className="font-display font-extrabold tracking-[0.2em] text-xs sm:text-sm text-[#1E293B] dark:text-white mt-1">
            TITAN
          </span>
          <span className="text-[8px] font-mono tracking-[0.24em] text-[#64748B] dark:text-[#CBD5E1] uppercase">
            WORLD
          </span>
        </div>
      );

    case 'skechers':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="relative border-3 border-[#002D62] dark:border-[#60A5FA] px-3.5 py-1 rounded-xl shadow-xs">
            <span className="font-display font-black italic text-xl sm:text-2xl text-[#002D62] dark:text-[#60A5FA] tracking-tighter">
              S
            </span>
          </div>
          <span className="font-display font-black italic tracking-wider text-xs sm:text-sm text-[#002D62] dark:text-[#60A5FA] mt-1">
            SKECHERS
          </span>
        </div>
      );

    case 'w-for-woman':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <span className="font-serif font-bold text-3xl sm:text-4xl text-[#B45309] dark:text-[#FBBF24] leading-none">
            W
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#78350F] dark:text-[#FDE68A] mt-1">
            FOR WOMAN
          </span>
        </div>
      );

    case 'flying-machine':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="text-[#DC2626]">
            <svg viewBox="0 0 48 24" className="w-12 sm:w-14 h-6 fill-current">
              <path d="M24 6l6 6-6 4-6-4 6-6zm14-2c-4 2-8 5-12 8l-2-2 10-7 4 1zm-28 0l4-1 10 7-2 2c-4-3-8-6-12-8z" />
            </svg>
          </div>
          <span className="font-display font-black tracking-tight text-[11px] sm:text-xs text-[#DC2626] uppercase mt-0.5">
            FLYING MACHINE
          </span>
        </div>
      );

    case 'red-chief':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="bg-[#B91C1C] text-white px-3 py-1 rounded-lg font-black text-xs sm:text-sm tracking-wider shadow-sm flex items-center gap-1">
            <span>RED CHIEF</span>
          </div>
        </div>
      );

    case 'adidas':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="flex items-end gap-1.5 h-6 sm:h-7 text-[#0F172A] dark:text-white">
            <span className="w-2 h-3.5 bg-current rounded-xs -skew-x-12" />
            <span className="w-2 h-5 bg-current rounded-xs -skew-x-12" />
            <span className="w-2 h-6.5 bg-current rounded-xs -skew-x-12" />
          </div>
          <span className="font-display font-black tracking-tight text-xs sm:text-sm text-[#0F172A] dark:text-white lowercase mt-0.5">
            adidas
          </span>
        </div>
      );

    case 'allen-solly':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-8 h-8 rounded-full border-2 border-[#047857] dark:border-[#34D399] flex items-center justify-center text-[#047857] dark:text-[#34D399] font-serif font-black text-base">
            AS
          </div>
          <span className="font-display font-black tracking-widest text-[10px] sm:text-xs uppercase text-[#047857] dark:text-[#34D399] mt-1">
            ALLEN SOLLY
          </span>
        </div>
      );

    case 'louis-philippe':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="text-[#581C87] dark:text-[#C084FC]">
            <svg viewBox="0 0 24 16" className="w-9 sm:w-11 h-6 fill-current">
              <path d="M2 14h20v2H2zm2-2l3-8 5 5 5-5 3 8H4z" />
            </svg>
          </div>
          <span className="font-serif font-black tracking-widest text-[10px] sm:text-xs text-[#581C87] dark:text-[#C084FC] uppercase mt-0.5">
            LOUIS PHILIPPE
          </span>
        </div>
      );

    case 'tanishq':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="font-serif font-black text-2xl sm:text-3xl text-[#92400E] dark:text-[#FBBF24] leading-none">
            T
          </div>
          <span className="font-serif font-bold tracking-[0.22em] text-xs sm:text-sm text-[#92400E] dark:text-[#FBBF24] uppercase mt-0.5">
            TANISHQ
          </span>
        </div>
      );

    case 'pizza-hut':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-10 sm:w-12 h-4 sm:h-5 bg-[#E11D48] rounded-t-full -skew-x-12 shadow-xs" />
          <span className="font-display font-black italic text-xs sm:text-sm text-[#E11D48] tracking-tight mt-0.5">
            Pizza Hut
          </span>
        </div>
      );

    case 'kfc':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <div className="bg-[#DC2626] text-white px-3 py-1.5 rounded-xl font-black text-base sm:text-lg tracking-wider shadow-sm border border-white/40">
            KFC
          </div>
        </div>
      );

    case 'barbeque-nation':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="flex items-center gap-1 text-[#EA580C]">
            <Flame className="w-4 h-4 fill-current" />
            <span className="font-display font-black text-xs sm:text-sm tracking-tight uppercase">
              BARBEQUE
            </span>
          </div>
          <span className="text-[8px] font-mono tracking-[0.28em] text-[#C2410C] uppercase">
            NATION
          </span>
        </div>
      );

    case 'spencers':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <span className="font-display font-black italic text-sm sm:text-base text-[#15803D] dark:text-[#4ADE80] tracking-tight">
            spencer&apos;s
          </span>
        </div>
      );

    case 'looks-salon':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <span className="font-display font-black tracking-widest text-xs sm:text-sm text-[#9D174D] dark:text-[#F472B6] uppercase">
            LOOKS
          </span>
          <span className="text-[8px] font-mono tracking-[0.28em] text-[#BE185D] dark:text-[#F472B6] uppercase">
            SALON
          </span>
        </div>
      );

    case 'metro-shoes':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C026D3] text-white flex items-center justify-center font-display font-black text-xs sm:text-sm">
            M
          </div>
          <span className="font-display font-black tracking-widest text-[10px] sm:text-xs text-[#C026D3] uppercase mt-0.5">
            METRO
          </span>
        </div>
      );

    case 'mufti':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <span className="font-display font-black tracking-[0.2em] text-sm sm:text-base text-[#1E1B4B] dark:text-white uppercase">
            MUFTI
          </span>
        </div>
      );

    case 'pind-balluchi':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center text-sm shadow-xs">
            🏺
          </div>
          <span className="font-serif font-black tracking-wider text-xs sm:text-sm text-[#D97706] uppercase mt-1">
            PIND BALLUCHI
          </span>
        </div>
      );

    case 'dosa-plaza':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center text-sm shadow-xs">
            🌯
          </div>
          <span className="font-display font-black tracking-wider text-xs sm:text-sm text-[#059669] dark:text-[#34D399] uppercase mt-1">
            DOSA PLAZA
          </span>
        </div>
      );

    case 'arjun-mehendi':
    case 'arjun-mehendi-art':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="w-8 h-8 rounded-full bg-[#78350F] text-amber-200 flex items-center justify-center text-sm shadow-xs">
            ✨
          </div>
          <span className="font-serif font-bold tracking-wider text-xs sm:text-sm text-[#78350F] dark:text-[#FDE68A] uppercase mt-1">
            ARJUN MEHENDI
          </span>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <span className="font-display font-black text-xs sm:text-sm text-[#1B1325] dark:text-white uppercase tracking-wider">
            {brandId.replace(/-/g, ' ')}
          </span>
        </div>
      );
  }
}

export function HomeBrandSpotlightSection({ onInspectBrand }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // Center showcase index (INOX Cinemas)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredBrandId, setHoveredBrandId] = useState(null);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ALL_HOMEPAGE_BRANDS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ALL_HOMEPAGE_BRANDS.length) % ALL_HOMEPAGE_BRANDS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ALL_HOMEPAGE_BRANDS.length);
  };

  // 3D Carousel Item Positions: 9 visible panels from -4 to +4
  // Perfectly matches the reference image:
  // -4: Titan World | -3: Woodland | -2: Puma | -1: Levi's | 0: INOX Cinemas | +1: Skechers | +2: W for Woman | +3: Flying Machine | +4: Red Chief
  const visibleCarouselIndices = useMemo(() => {
    const total = ALL_HOMEPAGE_BRANDS.length;
    const offsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    return offsets.map((offset) => {
      const idx = (activeIndex + offset + total * 10) % total;
      return {
        brand: ALL_HOMEPAGE_BRANDS[idx],
        offset,
        idx,
      };
    });
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="home-spotlight"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-center overflow-visible lg:overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-transparent select-none"
    >
      {/* =========================================================================
          BACKGROUND (Hero Section Signature Interactive Video & Abstract Canvas)
         ========================================================================= */}
      <VideoSectionBackground
        videoAsset={VIDEO_ASSETS.mallHero}
        variant="hero"
        eager
        playbackRate={0.25}
        videoOpacityClassName="opacity-88 dark:opacity-78"
        tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 sm:space-y-10">

        {/* =========================================================================
            HERO DISPLAY HEADER (Exact Reference Style from Screenshot)
            "P R E M I U M   B R A N D S"
            "Shop the World's Leading Brands"
            "FASHION • LIFESTYLE • BEAUTY • MORE"
            "Explore All Brands →"
           ========================================================================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto pt-2" data-motion="reveal">
          {/* Spaced Kicker */}
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-[#701A75] dark:text-[#F472B6]">
              P R E M I U M &nbsp; B R A N D S
            </span>
          </div>

          {/* Grand Title */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#1E112A] dark:text-[#FAF0F8]">
            Shop the World&apos;s{' '}
            <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-[#9333EA] sm:text-transparent">
              Leading Brands
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#6B5A7D] dark:text-[#D8CEE9]">
            FASHION &nbsp;•&nbsp; LIFESTYLE &nbsp;•&nbsp; BEAUTY &nbsp;•&nbsp; MORE
          </p>

          {/* Pill CTA Button (Exact match from reference) */}
          <div className="pt-1">
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.14em] uppercase bg-gradient-to-r from-[#D946EF] via-[#EC4899] to-[#8B5CF6] text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Explore All Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            THE 3D CURVED VITRINE ROTUNDA (Centerpiece of the Reference Image)
            9 Floating frosted glass panels along the illuminated floor track
           ========================================================================= */}
        <div className="relative pt-6 pb-4">

          {/* Circular Illuminated Floor Ring Reflection */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-20 rounded-[100%] border-2 border-white/70 dark:border-white/20 bg-gradient-to-r from-pink-300/25 via-purple-300/20 to-amber-200/25 shadow-[0_0_40px_rgba(236,72,153,0.3)] pointer-events-none" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-14 rounded-[100%] border border-white/40 dark:border-white/10 pointer-events-none" />

          {/* Curved Vitrine Carousel Track */}
          <div className="relative min-h-[260px] sm:min-h-[300px] flex items-center justify-center perspective-[1400px]">
            {visibleCarouselIndices.map(({ brand, offset, idx }) => {
              const isCenter = offset === 0;

              // 3D positioning styles for 9 panels matching reference
              let transformStyle = '';
              let opacityClass = 'opacity-100';
              let zIndex = 30;

              if (isCenter) {
                transformStyle = 'translateX(0) scale(1.18) translateZ(80px)';
                zIndex = 40;
                opacityClass = 'opacity-100';
              } else if (offset === -1) {
                transformStyle = 'translateX(-115%) scale(0.96) rotateY(12deg) translateZ(35px)';
                zIndex = 30;
                opacityClass = 'opacity-95';
              } else if (offset === 1) {
                transformStyle = 'translateX(115%) scale(0.96) rotateY(-12deg) translateZ(35px)';
                zIndex = 30;
                opacityClass = 'opacity-95';
              } else if (offset === -2) {
                transformStyle = 'translateX(-218%) scale(0.82) rotateY(20deg) translateZ(-10px)';
                zIndex = 20;
                opacityClass = 'hidden sm:block opacity-85';
              } else if (offset === 2) {
                transformStyle = 'translateX(218%) scale(0.82) rotateY(-20deg) translateZ(-10px)';
                zIndex = 20;
                opacityClass = 'hidden sm:block opacity-85';
              } else if (offset === -3) {
                transformStyle = 'translateX(-312%) scale(0.70) rotateY(26deg) translateZ(-50px)';
                zIndex = 10;
                opacityClass = 'hidden md:block opacity-75';
              } else if (offset === 3) {
                transformStyle = 'translateX(312%) scale(0.70) rotateY(-26deg) translateZ(-50px)';
                zIndex = 10;
                opacityClass = 'hidden md:block opacity-75';
              } else if (offset === -4) {
                transformStyle = 'translateX(-398%) scale(0.58) rotateY(32deg) translateZ(-90px)';
                zIndex = 5;
                opacityClass = 'hidden xl:block opacity-65';
              } else if (offset === 4) {
                transformStyle = 'translateX(398%) scale(0.58) rotateY(-32deg) translateZ(-90px)';
                zIndex = 5;
                opacityClass = 'hidden xl:block opacity-65';
              }

              const isHovered = hoveredBrandId === brand.id;

              return (
                <div
                  key={`${brand.id}-${offset}`}
                  onClick={() => {
                    if (isCenter) {
                      onInspectBrand?.(brand);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  onMouseEnter={() => setHoveredBrandId(brand.id)}
                  onMouseLeave={() => setHoveredBrandId(null)}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={`absolute w-44 sm:w-52 md:w-60 aspect-[16/11] rounded-3xl cursor-pointer select-none ${opacityClass} group`}
                >
                  {/* Floating Frosted Glass Panel Container */}
                  <div
                    className={`relative w-full h-full rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-300 border-2 ${isCenter
                        ? 'bg-white/92 dark:bg-[#1D112E]/92 backdrop-blur-2xl border-white shadow-[0_20px_50px_rgba(236,72,153,0.3)] ring-4 ring-pink-400/30'
                        : 'bg-white/80 dark:bg-[#1C122C]/80 backdrop-blur-xl border-white/80 dark:border-white/15 shadow-xl hover:border-pink-300 hover:scale-105'
                      }`}
                  >
                    {/* Glossy Top Sheen Reflection Diagonal */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/30 via-white/10 to-transparent pointer-events-none" />

                    {/* Subtle Floor Glow Reflection on bottom edge of panel */}
                    <div
                      className="absolute -bottom-1 inset-x-6 h-2 rounded-full blur-xs opacity-75"
                      style={{ backgroundColor: brand.accentColor }}
                    />

                    {/* FRONT: Authentic Brand Logo / Emblem - Centered & Clean (Exact match to reference) */}
                    <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 ${isHovered && isCenter ? 'opacity-0' : 'opacity-100'}`}>
                      <BrandLogoEmblem brandId={brand.id} className="w-full h-16 sm:h-20" />
                    </div>

                    {/* REVEAL ON HOVER (Center Card): Real Store Architectural Image + Quick Inspect */}
                    {isCenter && (
                      <div
                        className={`absolute inset-2 rounded-2xl overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                          }`}
                      >
                        <ResilientImage
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end text-white">
                          <span className="text-[10px] font-mono text-[#FFA07A] block">
                            {brand.floor} · {brand.suite}
                          </span>
                          <span className="text-xs font-bold truncate">
                            {brand.name}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-300 mt-1">
                            <span>Inspect Boutique</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left & Right Frosted Glass Navigation Buttons */}
          <div className="absolute inset-y-0 left-2 sm:left-6 flex items-center z-40 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Brand"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/85 dark:bg-[#1D112E]/85 backdrop-blur-xl border border-white/80 dark:border-white/20 text-[#1B1325] dark:text-white shadow-lg hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-2 sm:right-6 flex items-center z-40 pointer-events-none">
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Brand"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/85 dark:bg-[#1D112E]/85 backdrop-blur-xl border border-white/80 dark:border-white/20 text-[#1B1325] dark:text-white shadow-lg hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 5 Dot Pagination Indicators (Exact match to reference) */}
          <div className="flex items-center justify-center gap-1.5 pt-6">
            {[0, 1, 2, 3, 4].map((dotIdx) => {
              const total = ALL_HOMEPAGE_BRANDS.length;
              const isCurrent = Math.floor(((activeIndex % total) / total) * 5) === dotIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveIndex(Math.floor((dotIdx / 5) * total))}
                  aria-label={`Go to section ${dotIdx + 1}`}
                  className="relative p-2.5 flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
                >
                  <span
                    className={`rounded-full transition-transform duration-300 ${isCurrent
                        ? 'w-2.5 h-2.5 bg-[#9333EA] scale-125 shadow-xs'
                        : 'w-2 h-2 bg-black/25 dark:bg-white/35 hover:scale-110'
                      }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}