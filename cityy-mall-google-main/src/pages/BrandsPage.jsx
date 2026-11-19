import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Building2,
  Check,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { BRAND_IMAGES } from '../assets/imageRegistry';
import { MALL_IDENTITY } from '../utilities/brandsData';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';

// ============================================================================
// ALL 17 OFFICIAL CITY MALL BRANDS
// Complete authentic data with real boutique photography & suite mapping
// ============================================================================
export const BRANDS_DIRECTORY = {
  // --- LEVEL 00: GROUND FLOOR ---
  'louis-philippe': {
    id: 'louis-philippe',
    name: 'Louis Philippe',
    shortName: 'Louis Philippe',
    monogram: 'LP',
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-04',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Tailored Menswear, Bespoke Suiting & Luxury Ceremonial Attire',
    category: 'Haute Menswear',
    accentColor: '#4A154B',
    badgeBg: '#2D114D',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.louisPhilippe,
    features: ['Made-to-Measure Suiting', 'Silk & Linen Salon', 'Ceremonial Wardrobe'],
  },
  'levis-store': {
    id: 'levis-store',
    name: "Levi's Store",
    shortName: "Levi's",
    monogram: 'LV',
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-11',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Iconic 501 Original Denim & Contemporary Casual Collections',
    category: 'Heritage Denim',
    accentColor: '#C41230',
    badgeBg: '#C41230',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.levisStore,
    features: ['Tailor Shop Bar', '501 Archive Display', 'Sustainable Denim'],
  },
  'tanishq': {
    id: 'tanishq',
    name: 'Tanishq',
    shortName: 'Tanishq',
    monogram: 'TQ',
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-01',
    hours: '10:30 AM – 09:30 PM',
    tagline: 'Certified 22K Gold, Polki, Solitaires & Bridal Jewellery',
    category: 'Fine Gold & Diamonds',
    accentColor: '#B45309',
    badgeBg: '#FEF3C7',
    badgeColor: '#78350F',
    image: BRAND_IMAGES.tanishq,
    features: ['Rivaah Bridal Lounge', 'Solitaire Vault', 'Karatmeter Testing'],
  },
  'titan-world': {
    id: 'titan-world',
    name: 'Titan World',
    shortName: 'Titan World',
    monogram: 'TW',
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-02',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Swiss Automatics, Edge Ceramic & Precision Timepieces',
    category: 'Precision Horology',
    accentColor: '#1E293B',
    badgeBg: '#0F172A',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.titanWorld,
    features: ['Titan Edge Showcase', 'Watch Care Clinic', 'Smart Timepiece Bay'],
  },
  'metro-shoes': {
    id: 'metro-shoes',
    name: 'Metro Shoes',
    shortName: 'Metro Shoes',
    monogram: 'MS',
    floor: 'Ground Floor',
    levelCode: 'LEVEL 00',
    suite: 'Suite G-08',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Bridal Stilettos, Formal Loafers & Contemporary Leatherwear',
    category: 'Fashion & Formal Footwear',
    accentColor: '#6B21A8',
    badgeBg: '#581C87',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.metroShoes,
    features: ['Bridal Footwear Salon', 'Handcrafted Loafers', 'Leather Accessories'],
  },

  // --- LEVEL 01: FIRST FLOOR ---
  'allen-solly': {
    id: 'allen-solly',
    name: 'Allen Solly',
    shortName: 'Allen Solly',
    monogram: 'AS',
    floor: 'First Floor',
    levelCode: 'LEVEL 01',
    suite: 'Suite 1-14',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Friday Dressing, Playful Workwear, Chinos & Smart Casuals',
    category: 'Smart Casuals',
    accentColor: '#047857',
    badgeBg: '#064E3B',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.allenSolly,
    features: ['Friday Dressing Hub', 'Urban Chinos Rack', 'Polo & Knitwear'],
  },
  'w-for-woman': {
    id: 'w-for-woman',
    name: 'W for Woman',
    shortName: 'W for Woman',
    monogram: 'W',
    floor: 'First Floor',
    levelCode: 'LEVEL 01',
    suite: 'Suite 1-08',
    hours: '10:00 AM – 09:30 PM',
    tagline: 'Contemporary Ethnic & Fusion Festive Women’s Apparel',
    category: 'Ethnic Couture',
    accentColor: '#B45309',
    badgeBg: '#FEF3C7',
    badgeColor: '#78350F',
    image: BRAND_IMAGES.wForWoman,
    features: ['Festive Drapes Studio', 'Pastel Kurti Lounge', 'Occasion Ensembles'],
  },
  'mufti': {
    id: 'mufti',
    name: 'Mufti',
    shortName: 'Mufti',
    monogram: 'MF',
    floor: 'First Floor',
    levelCode: 'LEVEL 01',
    suite: 'Suite 1-18',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Alternative Streetwear, Expressive Casuals & Raw Denim',
    category: 'Contemporary Streetwear',
    accentColor: '#1E1B4B',
    badgeBg: '#0F172A',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.mufti,
    features: ['Expressive Shirts Line', 'Distressed Denim Line', 'Street Casuals'],
  },
  'flying-machine': {
    id: 'flying-machine',
    name: 'Flying Machine',
    shortName: 'Flying Machine',
    monogram: 'FM',
    floor: 'First Floor',
    levelCode: 'LEVEL 01',
    suite: 'Suite 1-22',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Bold Youth Denim, Graphic Tees & Urban Outerwear',
    category: 'Youth Denim & Outerwear',
    accentColor: '#DC2626',
    badgeBg: '#991B1B',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.flyingMachine,
    features: ['Tripmachine Capsule', 'Graphic Apparel', 'Stretch Denim Lab'],
  },

  // --- LEVEL 02: SECOND FLOOR ---
  'adidas': {
    id: 'adidas',
    name: 'Adidas',
    shortName: 'Adidas',
    monogram: 'AD',
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-02',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Performance Footwear, Ultraboost & Originals Sportswear',
    category: 'Athletic Footwear',
    accentColor: '#0F172A',
    badgeBg: '#000000',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.adidas,
    features: ['Ultraboost Trial Lab', 'Originals Heritage Wall', 'Performance Sportswear'],
  },
  'puma': {
    id: 'puma',
    name: 'Puma',
    shortName: 'Puma',
    monogram: 'PM',
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-05',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Speed Running Shoes, Nitro Foam Tech & Motorsport Collections',
    category: 'Sportswear & Footwear',
    accentColor: '#C9523C',
    badgeBg: '#111827',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.puma,
    features: ['Nitro Running Station', 'Motorsport Showcase', 'Training Apparel'],
  },
  'woodland-store': {
    id: 'woodland-store',
    name: 'Woodland Store',
    shortName: 'Woodland',
    monogram: 'WL',
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-12',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'All-Terrain Leather Boots & Outdoor Adventure Equipment',
    category: 'Outdoor Boots & Gear',
    accentColor: '#15803D',
    badgeBg: '#14532D',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.woodlandStore,
    features: ['Rugged Boot Trail Test', 'Climbing Gear Rack', 'Weatherproof Apparel'],
  },
  'skechers': {
    id: 'skechers',
    name: 'Skechers',
    shortName: 'Skechers',
    monogram: 'SK',
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-18',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Hands-Free Slip-ins, Arch Fit & Walking Comfort Footwear',
    category: 'Comfort Walking Footwear',
    accentColor: '#002D62',
    badgeBg: '#0A2540',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.skechers,
    features: ['Hands-Free Step Bar', 'Arch Fit Cushion Testing', 'Gowalk Gallery'],
  },
  'red-chief': {
    id: 'red-chief',
    name: 'Red Chief',
    shortName: 'Red Chief',
    monogram: 'RC',
    floor: 'Second Floor',
    levelCode: 'LEVEL 02',
    suite: 'Suite 2-24',
    hours: '10:00 AM – 10:00 PM',
    tagline: 'Genuine Leather Casual Shoes, Rugged Boots & Accessories',
    category: 'Pure Leather Footwear',
    accentColor: '#B91C1C',
    badgeBg: '#7F1D1D',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.redChief,
    features: ['Pure Leather Craft Wall', 'Rugged Boot Display', 'Belt & Wallet Bar'],
  },

  // --- ANCHORS & LIFESTYLE: UPPER & LOWER FLOORS ---
  'inox-cinemas': {
    id: 'inox-cinemas',
    name: 'INOX Cinemas',
    shortName: 'INOX Cinemas',
    monogram: 'IX',
    floor: 'Fourth Floor',
    levelCode: 'LEVEL 04',
    suite: 'Multiplex Level',
    hours: '09:00 AM – 01:00 AM',
    tagline: 'Multiplex INSIGNIA, Laser 4K Projection & Dolby Atmos Sound',
    category: 'Multiplex Cinema & Entertainment',
    accentColor: '#004B93',
    badgeBg: '#002B5B',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.inoxCinemas,
    features: ['INSIGNIA Luxury Recliners', 'Laser 4K Projection', 'Gourmet Cine-Dining'],
  },
  'looks-salon': {
    id: 'looks-salon',
    name: 'Looks Salon',
    shortName: 'Looks Salon',
    monogram: 'LK',
    floor: 'Third Floor',
    levelCode: 'LEVEL 03',
    suite: 'Suite 3-06',
    hours: '10:00 AM – 09:30 PM',
    tagline: 'Luxury Hair Styling, Bespoke Facial Therapy & Grooming',
    category: 'Luxury Salon & Wellness',
    accentColor: '#DB2777',
    badgeBg: '#831843',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.looksSalon,
    features: ['Private Styling Pods', 'Kerastase Hair Therapy', 'VIP Grooming Lounge'],
  },
  'spencers': {
    id: 'spencers',
    name: "Spencer's",
    shortName: "Spencer's",
    monogram: 'SP',
    floor: 'Lower Ground',
    levelCode: 'LEVEL LG',
    suite: 'Suite LG-01',
    hours: '08:30 AM – 10:30 PM',
    tagline: 'Fresh Gourmet Pantry, Global Delicacies & Family Essentials',
    category: 'Gourmet Hypermarket',
    accentColor: '#059669',
    badgeBg: '#064E3B',
    badgeColor: '#FFFFFF',
    image: BRAND_IMAGES.spencers,
    features: ['Artisan Bakery', 'Farm-Fresh Produce', 'Imported Gourmet Cellar'],
  },
};

// ============================================================================
// 4 DISTINCT LEVEL ZONES FOR CITY MALL
// Alternating layout and unique ambient theme per zone matching the reference screenshots
// ============================================================================
export const SHOPPING_FLOOR_ZONES = [
  // SECTION 1: GROUND FLOOR (Card Left, Image Right - Soft Terracotta / Peach Ambient)
  {
    id: 'zone-ground-floor',
    anchorId: 'level-00',
    levelCode: 'LEVEL 00 · GROUND FLOOR',
    shortCode: 'Level 00',
    title: 'Flagship Icons & Haute Horlogerie',
    subtitle: '5 flagship menswear, heritage denim, certified gold and precision watchmaking salons along the main atrium.',
    brandIds: ['louis-philippe', 'levis-store', 'tanishq', 'titan-world', 'metro-shoes'],
    isReversed: false, // Card Left, Image Right
    theme: 'peach', // Peach / warm ivory background with subtle contours
  },

  // SECTION 2: FIRST FLOOR (Image Left, Card Right - Wavy Aqua / Teal Contours)
  {
    id: 'zone-first-floor',
    anchorId: 'level-01',
    levelCode: 'LEVEL 01 · FIRST FLOOR',
    shortCode: 'Level 01',
    title: 'Denim, Ethnic Couture & Streetwear',
    subtitle: '4 contemporary Indian ethnic, European smart casuals & expressive streetwear destinations along the upper promenade.',
    brandIds: ['allen-solly', 'w-for-woman', 'mufti', 'flying-machine'],
    isReversed: true, // Image Left, Card Right (Exact match to screenshot 1)
    theme: 'teal', // Teal wavy curves & glowing nodes
  },

  // SECTION 3: SECOND FLOOR (Card Left, Image Right - Concentric Lavender / Pink Rings)
  {
    id: 'zone-second-floor',
    anchorId: 'level-02',
    levelCode: 'LEVEL 02 · SECOND FLOOR',
    shortCode: 'Level 02',
    title: 'Athletic Performance & Outdoor Adventure',
    subtitle: '5 global athletic footwear, speed trainers, rugged leather boots & comfortable walking boutiques.',
    brandIds: ['adidas', 'puma', 'woodland-store', 'skechers', 'red-chief'],
    isReversed: false, // Card Left, Image Right
    theme: 'lavender', // Concentric lilac / pink fluid rings
  },

  // SECTION 4: ANCHOR DESTINATIONS (Image Left, Card Right - Royal Amethyst / Cinema Gold)
  {
    id: 'zone-anchors',
    anchorId: 'level-anchors',
    levelCode: 'LEVEL LG – 04 · ANCHOR DESTINATIONS',
    shortCode: 'Anchors',
    title: 'Multiplex Cinema, Wellness & Hypermarket',
    subtitle: '3 anchor lifestyle destinations: INSIGNIA Laser 4K multiplex cinema, bespoke luxury salon & family gourmet hypermarket.',
    brandIds: ['inox-cinemas', 'looks-salon', 'spencers'],
    isReversed: true, // Image Left, Card Right
    theme: 'gold', // Gold / violet ambient glow
  },
];

// Authentic Brand Logo / Monogram Badge Component
function BrandBadgeEmblem({ brandId, className = 'w-9 h-7' }) {
  const brand = BRANDS_DIRECTORY[brandId];
  if (!brand) return null;

  switch (brandId) {
    case 'inox-cinemas':
      return (
        <div className={`${className} rounded-xl bg-[#002B5B] text-white flex items-center justify-center font-black text-[10px] tracking-tight shrink-0 shadow-xs border border-white/20`}>
          <span>IN<span className="text-amber-400">O</span>X</span>
        </div>
      );

    case 'levis-store':
      return (
        <div className={`${className} rounded-xl bg-[#C41230] text-white flex items-center justify-center font-serif italic font-black text-[10px] tracking-tight shrink-0 shadow-xs`}>
          <span>Levi&apos;s</span>
        </div>
      );

    case 'louis-philippe':
      return (
        <div className={`${className} rounded-xl bg-[#2D114D] text-white flex items-center justify-center font-serif font-black text-[10px] tracking-tight shrink-0 shadow-xs`}>
          <span>LP</span>
        </div>
      );

    case 'adidas':
      return (
        <div className={`${className} rounded-xl bg-black text-white flex items-center justify-center font-black text-[10px] shrink-0 shadow-xs`}>
          <span>///</span>
        </div>
      );

    case 'puma':
      return (
        <div className={`${className} rounded-xl bg-[#111827] text-white flex items-center justify-center font-black text-[9px] tracking-wider shrink-0 shadow-xs`}>
          <span>PUMA</span>
        </div>
      );

    case 'woodland-store':
      return (
        <div className={`${className} rounded-xl bg-[#14532D] text-white flex items-center justify-center font-black text-[8px] tracking-wider shrink-0 shadow-xs`}>
          <span>WOOD</span>
        </div>
      );

    case 'allen-solly':
      return (
        <div className={`${className} rounded-xl bg-[#064E3B] text-white flex items-center justify-center font-serif font-black text-[10px] tracking-tight shrink-0 shadow-xs`}>
          <span>AS</span>
        </div>
      );

    case 'tanishq':
      return (
        <div className={`${className} rounded-xl bg-[#FEF3C7] text-[#78350F] border border-amber-300 flex items-center justify-center font-serif font-black text-[9px] tracking-wider shrink-0 shadow-xs`}>
          <span>TQ</span>
        </div>
      );

    case 'w-for-woman':
      return (
        <div className={`${className} rounded-xl bg-[#FEF3C7] text-[#78350F] border border-amber-300 flex items-center justify-center font-serif font-black text-xs shrink-0 shadow-xs`}>
          <span>W</span>
        </div>
      );

    default:
      return (
        <div
          className={`${className} rounded-xl text-white flex items-center justify-center font-black text-[10px] tracking-tight shrink-0 shadow-xs`}
          style={{ backgroundColor: brand.badgeBg || brand.accentColor }}
        >
          <span>{brand.monogram}</span>
        </div>
      );
  }
}

// ============================================================================
// INDIVIDUAL FLOOR ZONE SECTION
// Supports Alternating Left/Right Layout & Custom Ambient Theme per Floor Zone
// ============================================================================
function FloorZoneSection({ zone, onInspectBrand }) {
  const [selectedBrandId, setSelectedBrandId] = useState(zone.brandIds[0]);

  const activeBrand = BRANDS_DIRECTORY[selectedBrandId] || BRANDS_DIRECTORY[zone.brandIds[0]];

  return (
    <section
      id={zone.anchorId}
      className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/10 dark:border-white/10"
    >
      {/* Subtle ambient lighting accent */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-300/15 via-pink-300/10 to-transparent blur-3xl" />
        <div className="absolute -top-10 right-10 w-96 h-96 bg-gradient-to-bl from-amber-200/15 via-purple-200/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ===================================================================
              FLOATING WHITE PILL CARD CONTAINER
              Order switches depending on zone.isReversed!
             =================================================================== */}
          <div
            className={`lg:col-span-5 relative rounded-[2.5rem] bg-white/95 dark:bg-[#1C122C]/95 backdrop-blur-2xl border-2 border-white/90 dark:border-white/15 shadow-[0_20px_60px_rgba(147,51,234,0.08)] p-7 sm:p-9 space-y-6 ${zone.isReversed ? 'lg:order-2' : 'lg:order-1'
              }`}
          >
            {/* Header Kicker & Titles */}
            <div className="space-y-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#9333EA] dark:text-[#F472B6] block">
                {zone.levelCode}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1E112A] dark:text-[#FAF0F8] leading-[1.12]">
                {zone.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C426E] dark:text-[#D8CEE9] font-medium leading-relaxed">
                {zone.subtitle}
              </p>
            </div>

            {/* Interactive Brand Selector Pills Grid (Exact Orion Mall Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {zone.brandIds.map((brandId) => {
                const brand = BRANDS_DIRECTORY[brandId];
                if (!brand) return null;
                const isSelected = activeBrand.id === brand.id;

                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setSelectedBrandId(brand.id)}
                    onMouseEnter={() => setSelectedBrandId(brand.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl transition-all cursor-pointer text-left border ${isSelected
                      ? 'bg-purple-500/10 dark:bg-purple-500/20 border-2 border-[#9333EA] dark:border-[#C084FC] shadow-md ring-2 ring-purple-400/30 scale-[1.02]'
                      : 'bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/25 hover:bg-white dark:hover:bg-white/10'
                      }`}
                  >
                    {/* Brand Insignia Emblem Badge */}
                    <BrandBadgeEmblem brandId={brand.id} className="w-8 h-6 sm:w-9 sm:h-7" />

                    {/* Brand Name */}
                    <div className="min-w-0 flex-1">
                      <span className={`block font-bold text-xs sm:text-sm tracking-tight truncate ${isSelected ? 'text-[#9333EA] dark:text-[#F472B6]' : 'text-[#1E112A] dark:text-[#FAF0F8]'
                        }`}>
                        {brand.shortName}
                      </span>
                      <span className="text-[10px] text-[#8C769F] dark:text-[#C5B3D9] block truncate font-medium">
                        {brand.suite}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#9333EA] dark:text-[#F472B6] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Inspect Details Action Footer */}
            <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-[#9333EA] dark:text-[#F472B6]">
                  {activeBrand.hours}
                </span>
                <span className="text-xs text-[#5C426E] dark:text-[#D8CEE9] font-medium">
                  {activeBrand.floor} · {activeBrand.suite}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onInspectBrand?.(activeBrand)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] text-white shadow-lg shadow-pink-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Inspect Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ===================================================================
              MONUMENTAL ARCHITECTURAL SHOWCASE VITRINE
              High-resolution store interior photograph with floating bottom pill
             =================================================================== */}
          <div
            className={`lg:col-span-7 relative aspect-[16/11] sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/95 dark:border-white/20 bg-black/10 group cursor-pointer ${zone.isReversed ? 'lg:order-1' : 'lg:order-2'
              }`}
            onClick={() => onInspectBrand?.(activeBrand)}
          >
            {/* Real Boutique Photograph */}
            <ResilientImage
              key={activeBrand.id}
              src={activeBrand.image}
              alt={`${activeBrand.name} Showcase`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Floor Tag Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#F472B6] animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">
                {activeBrand.floor} · {activeBrand.suite}
              </span>
            </div>

            {/* Bottom Floating Pill (Exact Orion Mall Style) */}
            <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#1A0E2A]/95 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <BrandBadgeEmblem brandId={activeBrand.id} className="w-10 h-8 sm:w-11 sm:h-9" />
                <div className="min-w-0">
                  <h4 className="font-display text-sm sm:text-base font-black text-[#1E112A] dark:text-white truncate">
                    {activeBrand.name}
                  </h4>
                  <p className="text-[11px] text-[#6B5A7D] dark:text-[#D8CEE9] truncate font-medium">
                    {activeBrand.tagline}
                  </p>
                </div>
              </div>

              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-md hover:scale-105 transition-all shrink-0"
                style={{ backgroundColor: activeBrand.accentColor }}
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN BRANDS PAGE COMPONENT
// Elegant Hero Section + 4 Alternating Floor Zone Sections
// ============================================================================
export function BrandsPage({ onInspectBrand }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Quick search matching across all 17 brands
  const filteredBrands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return Object.values(BRANDS_DIRECTORY).filter((b) => {
      return (
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.floor.toLowerCase().includes(q) ||
        b.suite.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const scrollToZone = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBF4EB] dark:bg-[#151021] text-[#1E112A] dark:text-[#FAF0F8] transition-colors duration-300 overflow-x-hidden selection:bg-pink-500/20">

      {/* Background matches Homepage Signature Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.mallHero}
          variant="hero"
          eager
          playbackRate={0.25}
          videoOpacityClassName="opacity-88 dark:opacity-78"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/82 via-[#EFE6FA]/42 to-[#FDE8DF]/35 dark:from-[#151021]/84 dark:via-[#1D1630]/46 dark:to-[#241724]/38"
        />
      </div>

      {/* =========================================================================
          1. ELEGANT HERO SECTION
          Refined editorial aesthetic with fluid light curves, stats & quick jump
         ========================================================================= */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#2D1D48]/10 dark:border-white/10">

        {/* Soft Ambient Hero Highlights */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-12 left-1/4 w-3 h-3 rounded-full bg-amber-400/70 blur-[1px] animate-pulse" />
          <div className="absolute bottom-16 right-1/4 w-3.5 h-3.5 rounded-full bg-pink-400/60 blur-[1px] animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">

          {/* Spaced Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-pink-400/30 text-[#9333EA] dark:text-[#F472B6] text-[11px] font-bold tracking-[0.24em] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{MALL_IDENTITY.name} · THE RETAIL COMPENDIUM</span>
          </div>

          {/* Grand Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-[#1E112A] dark:text-[#FAF0F8]">
            The Pinnacle of Global{' '}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
              Fashion &amp; Luxury
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-[#5C426E] dark:text-[#D8CEE9] font-medium max-w-2xl mx-auto leading-relaxed">
            Curated across four architectural promenades in Gorakhpur — discover 17 official flagship boutiques, athletic pavilions, fine jewelry salons, and multiplex entertainment.
          </p>

          {/* Quick Level Jump Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {SHOPPING_FLOOR_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => scrollToZone(zone.anchorId)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#3D264E] dark:text-[#FAF0F8] hover:bg-[#1E112A] hover:text-white dark:hover:bg-white dark:hover:text-[#1E112A] shadow-xs hover:scale-105"
              >
                <span>{zone.shortCode}</span> · <span className="opacity-80 font-normal">{zone.title.split('&')[0]}</span>
              </button>
            ))}
          </div>

          {/* Concierge Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-[#D946EF] absolute left-4 top-1/2 -translate-y-1/2 pointer-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any of the 17 official brands or suites..."
                aria-label="Search brands"
                className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-full border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#1C122C]/95 text-[#1E112A] dark:text-white placeholder:text-[#8C769F] focus:outline-none focus:ring-2 focus:ring-[#D946EF] shadow-lg shadow-purple-500/5 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#6E557F] hover:text-black dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Dropdown Results */}
            {searchQuery && (
              <div className="mt-2 p-3 rounded-2xl bg-white dark:bg-[#1C122C] border border-black/10 dark:border-white/15 shadow-2xl text-left space-y-1 max-h-60 overflow-y-auto">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => onInspectBrand?.(b)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <BrandBadgeEmblem brandId={b.id} className="w-7 h-5" />
                        <div>
                          <span className="text-xs font-bold block">{b.name}</span>
                          <span className="text-[10px] text-[#6B5A7D] dark:text-[#D8CEE9]">{b.floor} · {b.suite}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9333EA]" />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center py-2 text-[#6B5A7D]">No matching official brand found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE 4 ALTERNATING FLOOR ZONE SECTIONS
          Section 1: Level 00 (Card Left, Image Right - Peach Theme)
          Section 2: Level 01 (Image Left, Card Right - Teal Contours Theme)
          Section 3: Level 02 (Card Left, Image Right - Lavender Rings Theme)
          Section 4: Anchors (Image Left, Card Right - Gold Radiance Theme)
         ========================================================================= */}
      <div className="space-y-0">
        {SHOPPING_FLOOR_ZONES.map((zone) => (
          <FloorZoneSection
            key={zone.id}
            zone={zone}
            onInspectBrand={onInspectBrand}
          />
        ))}
      </div>

      {/* =========================================================================
          3. BRAND DIRECTORY FOOTER CONCIERGE BANNER
          Closing luxury experience section with timings, map & quick explore CTAs
         ========================================================================= */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#2D1D48]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] p-8 sm:p-12 lg:p-16 overflow-hidden bg-white/90 dark:bg-[#1C122C]/90 backdrop-blur-2xl border-2 border-white/95 dark:border-white/15 shadow-2xl">
            {/* Ambient Lighting Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-300/25 via-purple-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-300/20 via-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, Value Props & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-[#9333EA] dark:text-[#F472B6] text-xs font-bold uppercase tracking-widest border border-purple-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Experience CITY MALL Gorakhpur</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1E112A] dark:text-[#FAF0F8] leading-[1.08]">
                    17 Premier Brands.{' '}
                    <span className="font-serif italic font-normal bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                      One Grand Mall.
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-[#5C426E] dark:text-[#D8CEE9] font-medium leading-relaxed max-w-xl">
                    From bespoke haute couture tailoring to certified diamond jewelry, athletic footwear, multi-screen laser cinema and family dining — spend a luxurious day at Gorakhpur&apos;s living promenade.
                  </p>
                </div>

                {/* Concierge Feature Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                    <Clock className="w-4 h-4 text-[#D946EF]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C769F] block">Visiting Hours</span>
                    <span className="text-xs font-bold text-[#1E112A] dark:text-white block">10:00 AM – 10:00 PM</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                    <MapPin className="w-4 h-4 text-[#D946EF]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C769F] block">Location</span>
                    <span className="text-xs font-bold text-[#1E112A] dark:text-white block">Civil Lines, Gorakhpur</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                    <Building2 className="w-4 h-4 text-[#D946EF]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C769F] block">Levels</span>
                    <span className="text-xs font-bold text-[#1E112A] dark:text-white block">Level LG to Level 04</span>
                  </div>
                </div>

                {/* Direct Page Navigation CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/dining"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] text-white shadow-lg shadow-pink-500/25 hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Explore 9 Dining Venues</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/entertainment"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 text-[#1E112A] dark:text-white hover:bg-black/5 transition-all cursor-pointer"
                  >
                    <span>INOX Laser 4K</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/visit-us"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 text-[#1E112A] dark:text-white hover:bg-black/5 transition-all cursor-pointer"
                  >
                    <span>Directions & Parking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Architectural Directory Grid Quick Filter */}
              <div className="lg:col-span-5 relative p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9333EA] dark:text-[#F472B6] block">
                  Complete 17 Flagship Directory
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.values(BRANDS_DIRECTORY).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onInspectBrand?.(b)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#1E112A] dark:text-white hover:border-[#D946EF] hover:scale-105 transition-all cursor-pointer shadow-2xs"
                    >
                      <BrandBadgeEmblem brandId={b.id} className="w-5 h-4 text-[8px]" />
                      <span>{b.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default BrandsPage;
