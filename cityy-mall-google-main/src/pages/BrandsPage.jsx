import { useEffect, useState, useMemo, useRef } from 'react';
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

// ============================================================================
// OFFICIAL AUTHENTIC BRAND LOGOS (100% Vector SVGs & Original Brand Typography)
// Replaces plain-text names with authentic symbols, wordmarks & official branding
// ============================================================================
export function OfficialBrandLogo({ brandId, variant = 'badge', isSelected = false, className = '' }) {
  const brand = BRANDS_DIRECTORY[brandId];
  if (!brand) return null;

  switch (brandId) {
    // -------------------------------------------------------------------------
    // 1. LEVI'S: Iconic Red Batwing Logo with white serif script & registered mark
    // -------------------------------------------------------------------------
    case 'levis-store':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-3 select-none ${className}`}>
            <div className="relative bg-[#C41230] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-b-xl shadow-lg flex items-center justify-center">
              <span className="font-serif italic font-black text-xl sm:text-2xl tracking-tight leading-none text-white drop-shadow-xs">
                Levi&apos;s
              </span>
              <span className="absolute -top-1 -right-1 text-[8px] font-bold text-white bg-[#C41230] rounded-full px-1">
                ®
              </span>
            </div>
            {variant === 'showcase' && (
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#C41230] dark:text-[#F87171] uppercase">
                ORIGINAL 501® JEANS
              </span>
            )}
          </div>
        );
      }
      return (
        <div className="relative bg-[#C41230] text-white px-2.5 py-1 rounded-[4px] shadow-xs flex items-center justify-center select-none">
          <span className="font-serif italic font-black text-xs sm:text-sm tracking-tight leading-none text-white">
            Levi&apos;s
          </span>
          <span className="text-[7px] font-bold ml-[1px] leading-none opacity-90">®</span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 2. ADIDAS: Iconic Three Angled Performance Stripes + Lowercase Wordmark
    // -------------------------------------------------------------------------
    case 'adidas':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="flex items-end gap-1.5 h-6 sm:h-8 text-black dark:text-white">
              <span className="w-2 sm:w-2.5 h-3.5 sm:h-4 bg-current rounded-xs -skew-x-[18deg]" />
              <span className="w-2 sm:w-2.5 h-5 sm:h-6 bg-current rounded-xs -skew-x-[18deg]" />
              <span className="w-2 sm:w-2.5 h-6.5 sm:h-8 bg-current rounded-xs -skew-x-[18deg]" />
            </div>
            <span className="font-sans font-black text-2xl sm:text-3xl text-black dark:text-white tracking-tighter leading-none lowercase">
              adidas
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1.5 select-none text-black dark:text-white">
          <div className="flex items-end gap-[2px] h-3.5">
            <span className="w-[3px] h-[7px] bg-current rounded-[0.5px] -skew-x-[18deg]" />
            <span className="w-[3px] h-[10px] bg-current rounded-[0.5px] -skew-x-[18deg]" />
            <span className="w-[3px] h-[13px] bg-current rounded-[0.5px] -skew-x-[18deg]" />
          </div>
          <span className="font-sans font-black text-xs sm:text-sm tracking-tighter leading-none lowercase">
            adidas
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 3. PUMA: Iconic Leaping Cat Silhouette + Bold Geometric Uppercase Wordmark
    // -------------------------------------------------------------------------
    case 'puma':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <svg viewBox="0 0 100 48" className="w-10 sm:w-14 h-5 sm:h-7 fill-current text-black dark:text-white">
              <path d="M78 6c-3-2-7-1-9 1l-14 11-7-4c-3-2-7-2-10 0l-12 8c-3 2-4 5-3 8l2 6-8 4c-3 2-5 5-5 9h5c2-3 4-5 7-6l9-5 6 3c3 1 7 1 10-1l14-9 6 3c3 2 7 1 9-1l12-10c2-2 2-5 0-7l-12-7z" />
            </svg>
            <span className="font-sans font-black text-2xl sm:text-3xl text-black dark:text-white tracking-[0.16em] leading-none uppercase">
              PUMA
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1.5 select-none text-black dark:text-white">
          <svg viewBox="0 0 100 48" className="w-5 sm:w-6 h-3 sm:h-3.5 fill-current">
            <path d="M78 6c-3-2-7-1-9 1l-14 11-7-4c-3-2-7-2-10 0l-12 8c-3 2-4 5-3 8l2 6-8 4c-3 2-5 5-5 9h5c2-3 4-5 7-6l9-5 6 3c3 1 7 1 10-1l14-9 6 3c3 2 7 1 9-1l12-10c2-2 2-5 0-7l-12-7z" />
          </svg>
          <span className="font-sans font-black text-[11px] sm:text-xs tracking-[0.14em] leading-none uppercase">
            PUMA
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 4. WOODLAND: Iconic Pine Tree Silhouette + Rugged Outdoor Wordmark
    // -------------------------------------------------------------------------
    case 'woodland-store':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#14532D] text-[#4ADE80] flex items-center justify-center p-1.5 shadow-md shrink-0">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d="M12 2L4 12h4l-3 6h6v4h2v-4h6l-3-6h4L12 2z" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="font-sans font-black text-lg sm:text-2xl text-[#14532D] dark:text-[#4ADE80] tracking-[0.18em] uppercase block">
                WOODLAND
              </span>
              <span className="text-[8px] font-mono tracking-[0.24em] text-neutral-500 uppercase">OUTDOOR EXPEDITION</span>
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1 select-none text-[#14532D] dark:text-[#4ADE80]">
          <div className="w-4 h-4 rounded-full bg-[#14532D] text-[#4ADE80] flex items-center justify-center p-0.5 shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 2L4 12h4l-3 6h6v4h2v-4h6l-3-6h4L12 2z" />
            </svg>
          </div>
          <span className="font-sans font-black text-[10px] sm:text-[11px] tracking-wider leading-none uppercase">
            WOODLAND
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 5. LOUIS PHILIPPE: Royal Gold Crown Crest + Aristocratic Haute Serif
    // -------------------------------------------------------------------------
    case 'louis-philippe':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#2D114D] border border-amber-400/40 flex items-center justify-center shadow-md shrink-0">
              <svg viewBox="0 0 24 16" className="w-5 h-3.5 sm:w-6 sm:h-4 fill-current text-amber-300">
                <path d="M2 14h20v2H2zm2-2l3-8 5 5 5-5 3 8H4z" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="font-serif font-black text-base sm:text-2xl text-[#2D114D] dark:text-[#E9D5FF] tracking-[0.14em] uppercase block">
                LOUIS PHILIPPE
              </span>
              <span className="text-[8px] font-serif italic text-amber-600 dark:text-amber-400 tracking-wider">HAUTE MENSWEAR</span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#2D114D] text-amber-300 px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <svg viewBox="0 0 24 16" className="w-3.5 h-2.5 fill-current shrink-0 text-amber-300">
            <path d="M2 14h20v2H2zm2-2l3-8 5 5 5-5 3 8H4z" />
          </svg>
          <span className="font-serif font-black text-[9px] sm:text-[10px] tracking-wider text-amber-100 uppercase">
            LOUIS PHILIPPE
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 6. ALLEN SOLLY: Circular Stag AS Monogram Crest + Classic Smart Casuals
    // -------------------------------------------------------------------------
    case 'allen-solly':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#047857] dark:border-[#34D399] bg-[#064E3B] text-emerald-100 flex items-center justify-center font-serif font-black text-base sm:text-lg shadow-md shrink-0">
              AS
            </div>
            <div className="leading-tight">
              <span className="font-sans font-black text-base sm:text-2xl text-[#047857] dark:text-[#34D399] tracking-[0.18em] uppercase block">
                ALLEN SOLLY
              </span>
              <span className="text-[8px] font-mono tracking-[0.22em] text-neutral-500 uppercase">FRIDAY DRESSING</span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#064E3B] text-emerald-100 px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <span className="font-serif font-black text-[8px] text-emerald-300 border border-emerald-400/50 rounded-full w-3.5 h-3.5 flex items-center justify-center">AS</span>
          <span className="font-sans font-black text-[9px] sm:text-[10px] tracking-wider uppercase text-white">
            ALLEN SOLLY
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 7. TANISHQ: Ornate Tata Royal Gold 'T' Seal + Wide Letterspaced Wordmark
    // -------------------------------------------------------------------------
    case 'tanishq':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-amber-500 text-amber-900 flex items-center justify-center font-serif font-black text-xl sm:text-2xl shadow-md shrink-0">
              T
            </div>
            <div className="leading-tight">
              <span className="font-serif font-bold text-lg sm:text-3xl text-[#92400E] dark:text-[#FBBF24] tracking-[0.24em] uppercase block">
                TANISHQ
              </span>
              <span className="text-[8px] font-serif text-amber-700 dark:text-amber-300 tracking-[0.3em] uppercase">A TATA PRODUCT</span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#FEF3C7] border border-amber-400/80 text-amber-900 px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <span className="font-serif font-black text-xs text-amber-800 leading-none">T</span>
          <span className="font-serif font-bold text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-amber-950">
            TANISHQ
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 8. TITAN WORLD: Precision Chronometer Dial Seal + Horology Branding
    // -------------------------------------------------------------------------
    case 'titan-world':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#1E293B] dark:border-white bg-[#0F172A] text-white flex items-center justify-center font-sans font-black text-base sm:text-xl shadow-md shrink-0">
              T
            </div>
            <div className="leading-tight">
              <span className="font-sans font-black text-base sm:text-2xl text-[#0F172A] dark:text-white tracking-[0.22em] uppercase block">
                TITAN
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">WORLD · PRECISION</span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#0F172A] text-white px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <div className="w-3.5 h-3.5 rounded-full border border-sky-400 flex items-center justify-center text-[7px] font-bold text-sky-300">T</div>
          <span className="font-sans font-black text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-sky-100">
            TITAN
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 9. SKECHERS: Italic 'S' Performance Box + Italic Bold Wordmark
    // -------------------------------------------------------------------------
    case 'skechers':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="border-2 sm:border-3 border-[#002D62] dark:border-[#60A5FA] bg-[#0A2540] text-[#60A5FA] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl shadow-md shrink-0">
              <span className="font-sans font-black italic text-lg sm:text-2xl tracking-tighter">S</span>
            </div>
            <span className="font-sans font-black italic text-lg sm:text-2xl text-[#002D62] dark:text-[#60A5FA] tracking-wide uppercase">
              SKECHERS
            </span>
          </div>
        );
      }
      return (
        <div className="bg-[#0A2540] text-[#60A5FA] px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <span className="font-sans font-black italic text-xs tracking-tighter">S</span>
          <span className="font-sans font-black italic text-[9px] sm:text-[10px] tracking-wide uppercase text-white">
            SKECHERS
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 10. W FOR WOMAN: Rich Maroon & Gold Ethnic W Logo + Wordmark
    // -------------------------------------------------------------------------
    case 'w-for-woman':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <span className="font-serif font-black text-2xl sm:text-4xl text-[#B45309] dark:text-[#FBBF24] leading-none shrink-0">
              W
            </span>
            <div className="leading-tight">
              <span className="font-serif font-bold text-base sm:text-2xl text-[#78350F] dark:text-[#FDE68A] tracking-[0.16em] uppercase block">
                FOR WOMAN
              </span>
              <span className="text-[8px] font-sans text-amber-700 dark:text-amber-300 tracking-[0.24em] uppercase">CONTEMPORARY ETHNIC</span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#831843] text-amber-200 px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <span className="font-serif font-black text-xs leading-none text-amber-300">W</span>
          <span className="font-serif font-bold text-[8px] sm:text-[9px] tracking-wider text-amber-100 uppercase">
            W FOR WOMAN
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 11. FLYING MACHINE: Winged Eagle Arrowhead Logo + Authentic Wordmark
    // -------------------------------------------------------------------------
    case 'flying-machine':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="text-[#DC2626] shrink-0">
              <svg viewBox="0 0 48 24" className="w-8 sm:w-12 h-4 sm:h-6 fill-current">
                <path d="M24 6l6 6-6 4-6-4 6-6zm14-2c-4 2-8 5-12 8l-2-2 10-7 4 1zm-28 0l4-1 10 7-2 2c-4-3-8-6-12-8z" />
              </svg>
            </div>
            <span className="font-sans font-black text-base sm:text-2xl text-[#DC2626] tracking-tight uppercase">
              FLYING MACHINE
            </span>
          </div>
        );
      }
      return (
        <div className="bg-red-700 text-white px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <svg viewBox="0 0 48 24" className="w-3.5 h-2 fill-current shrink-0">
            <path d="M24 6l6 6-6 4-6-4 6-6zm14-2c-4 2-8 5-12 8l-2-2 10-7 4 1zm-28 0l4-1 10 7-2 2c-4-3-8-6-12-8z" />
          </svg>
          <span className="font-sans font-black text-[8px] sm:text-[9px] tracking-tight uppercase">
            FLYING MACHINE
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 12. RED CHIEF: Crimson Leather Badge + Heavy Bold Wordmark
    // -------------------------------------------------------------------------
    case 'red-chief':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="bg-[#B91C1C] text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-sans font-black text-base sm:text-xl tracking-wider shadow-md shrink-0">
              RED CHIEF
            </div>
            <span className="text-[9px] font-mono tracking-[0.24em] text-neutral-500 uppercase">GENUINE LEATHER</span>
          </div>
        );
      }
      return (
        <div className="bg-[#B91C1C] text-white px-2 py-0.5 rounded-[4px] flex items-center justify-center font-sans font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow-2xs select-none">
          RED CHIEF
        </div>
      );

    // -------------------------------------------------------------------------
    // 13. METRO SHOES: Magenta Diamond 'M' Emblem + Tracked Wordmark
    // -------------------------------------------------------------------------
    case 'metro-shoes':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#581C87] text-white flex items-center justify-center font-sans font-black text-lg sm:text-xl shadow-md shrink-0">
              <span className="text-[#F472B6]">M</span>
            </div>
            <span className="font-sans font-black text-xl sm:text-3xl text-[#581C87] dark:text-[#F472B6] tracking-[0.2em] uppercase">
              METRO
            </span>
          </div>
        );
      }
      return (
        <div className="bg-[#581C87] text-white px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <span className="text-[#F472B6] font-black text-xs leading-none">M</span>
          <span className="font-sans font-black text-[9px] sm:text-[10px] tracking-widest uppercase">
            METRO
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 14. MUFTI: Modern Streetwear Curved Wave Mark + Bold Wordmark
    // -------------------------------------------------------------------------
    case 'mufti':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <span className="font-sans font-black text-xl sm:text-3xl text-[#1E1B4B] dark:text-white tracking-[0.24em] uppercase">
              MUFTI
            </span>
            <span className="text-[9px] font-mono tracking-[0.26em] text-indigo-400 uppercase">DENIM CO.</span>
          </div>
        );
      }
      return (
        <div className="bg-black text-white px-2.5 py-0.5 rounded-[4px] flex items-center justify-center font-sans font-black text-[10px] sm:text-[11px] tracking-[0.2em] uppercase shadow-2xs select-none">
          MUFTI
        </div>
      );

    // -------------------------------------------------------------------------
    // 15. INOX CINEMAS: Multiplex Sun Logo + Letterspaced CINEMAS Mark
    // -------------------------------------------------------------------------
    case 'inox-cinemas':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <div className="flex items-center tracking-tighter font-black text-xl sm:text-4xl text-[#004B93] dark:text-[#60A5FA]">
              <span>IN</span>
              <span className="text-amber-400 mx-0.5">☀</span>
              <span>X</span>
            </div>
            <div className="leading-tight">
              <span className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-[#004B93] dark:text-[#93C5FD] block">
                CINEMAS
              </span>
              <span className="text-[8px] font-mono tracking-[0.25em] text-amber-500 uppercase">INSIGNIA LASER 4K</span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#004B93] text-white px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 shadow-2xs select-none">
          <span className="font-black text-[10px] sm:text-[11px] tracking-tight text-white">
            IN<span className="text-amber-400">☀</span>X
          </span>
          <span className="text-[7px] sm:text-[8px] font-mono font-bold tracking-widest text-sky-200 uppercase">
            CINEMAS
          </span>
        </div>
      );

    // -------------------------------------------------------------------------
    // 16. LOOKS SALON: Luxury Salon Wine Badge + LOOKS Typography
    // -------------------------------------------------------------------------
    case 'looks-salon':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <span className="font-sans font-black text-xl sm:text-3xl text-[#9D174D] dark:text-[#F472B6] tracking-[0.24em] uppercase">
              LOOKS
            </span>
            <span className="text-[9px] font-mono tracking-[0.28em] text-pink-400 uppercase">SALON & PRIVÉ</span>
          </div>
        );
      }
      return (
        <div className="bg-[#831843] text-white px-2.5 py-0.5 rounded-[4px] flex items-center justify-center font-sans font-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase shadow-2xs select-none">
          LOOKS
        </div>
      );

    // -------------------------------------------------------------------------
    // 17. SPENCER'S: Fresh Food Emerald Leaf Badge + Lowercase Italic Wordmark
    // -------------------------------------------------------------------------
    case 'spencers':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            <span className="font-sans font-black italic text-xl sm:text-3xl text-[#15803D] dark:text-[#4ADE80] tracking-tight">
              spencer&apos;s
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] text-emerald-600 dark:text-emerald-400 uppercase">HYPERMARKET</span>
          </div>
        );
      }
      return (
        <div className="bg-[#15803D] text-white px-2 py-0.5 rounded-[4px] flex items-center justify-center gap-1 font-sans font-black italic text-[10px] sm:text-[11px] tracking-tight shadow-2xs select-none">
          <span className="text-emerald-200">🌱</span>spencer&apos;s
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <span className="font-sans font-black text-xs uppercase tracking-wider">
            {brand.shortName}
          </span>
        </div>
      );
  }
}

// Backward compatible helper for small badges
function BrandBadgeEmblem({ brandId, className = 'w-10 h-7' }) {
  return <OfficialBrandLogo brandId={brandId} variant="badge" className={className} />;
}

// ============================================================================
// ELEGANT ABSTRACT SECTION BACKGROUND WITH FLUID PASTEL CURVES & GLOWING NODES
// Pixel-accurate match to Orion Mall Shopping section background aesthetics
// ============================================================================
function FloorZoneDecorations({ theme = 'lavender' }) {
  const configs = {
    peach: {
      curves: [
        'M-100,120 C200,60 500,280 900,160 C1300,40 1600,240 1900,180',
        'M-80,240 C280,180 620,400 1050,260 C1450,120 1720,320 2000,260',
      ],
      stroke: 'rgba(251, 146, 60, 0.24)',
      dotColor: '#FB923C',
      dots: [
        { cx: 320, cy: 110, r: 5 },
        { cx: 780, cy: 220, r: 6 },
        { cx: 1240, cy: 90, r: 4 },
        { cx: 1620, cy: 210, r: 5 },
      ],
    },
    teal: {
      curves: [
        'M-100,180 C250,280 650,80 1100,220 C1550,360 1750,140 2000,200',
        'M-80,90 C320,190 720,20 1180,160 C1620,300 1800,90 2000,130',
      ],
      stroke: 'rgba(20, 184, 166, 0.24)',
      dotColor: '#14B8A6',
      dots: [
        { cx: 220, cy: 260, r: 5 },
        { cx: 680, cy: 100, r: 6 },
        { cx: 1140, cy: 230, r: 4 },
        { cx: 1580, cy: 330, r: 6 },
      ],
    },
    lavender: {
      curves: [
        'M-100,140 C300,40 600,320 1080,180 C1500,60 1750,260 2000,200',
        'M-80,260 C320,160 680,420 1150,280 C1550,140 1800,340 2000,280',
      ],
      stroke: 'rgba(168, 85, 247, 0.22)',
      dotColor: '#A855F7',
      dots: [
        { cx: 280, cy: 70, r: 5 },
        { cx: 740, cy: 280, r: 6 },
        { cx: 1200, cy: 140, r: 4 },
        { cx: 1660, cy: 220, r: 5 },
      ],
    },
    gold: {
      curves: [
        'M-100,200 C280,100 620,340 1060,200 C1500,80 1750,280 2000,220',
        'M-80,120 C240,40 580,260 1020,140 C1460,20 1720,220 2000,160',
      ],
      stroke: 'rgba(244, 63, 94, 0.22)',
      dotColor: '#F43F5E',
      dots: [
        { cx: 260, cy: 110, r: 5 },
        { cx: 720, cy: 310, r: 6 },
        { cx: 1180, cy: 160, r: 4 },
        { cx: 1640, cy: 240, r: 5 },
      ],
    },
  }[theme || 'lavender'];

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1920 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover opacity-80 dark:opacity-30"
        preserveAspectRatio="none"
      >
        {configs.curves.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={configs.stroke}
            strokeWidth={i === 0 ? '2.5' : '1.8'}
            strokeDasharray={i === 1 ? '6 8' : undefined}
          />
        ))}
        {configs.dots.map((dot, i) => (
          <g key={i}>
            <circle cx={dot.cx} cy={dot.cy} r={dot.r * 2.2} fill={configs.dotColor} fillOpacity="0.18" />
            <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill={configs.dotColor} fillOpacity="0.75" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================================================
// INDIVIDUAL FLOOR ZONE SECTION
// Supports Alternating Left/Right Layout & Custom Ambient Theme per Floor Zone
// ============================================================================
function FloorZoneSection({ zone, onInspectBrand }) {
  const [selectedBrandId, setSelectedBrandId] = useState(zone.brandIds[0]);

  const activeBrand = BRANDS_DIRECTORY[selectedBrandId] || BRANDS_DIRECTORY[zone.brandIds[0]];

  // Theme-specific accent tokens for pill highlights and tags
  const themeStyles = {
    peach: {
      accentText: 'text-amber-700 dark:text-amber-400',
      activeBorder: 'border-amber-500 dark:border-amber-400',
      activeBg: 'bg-amber-50/80 dark:bg-amber-950/40',
      activeRing: 'ring-amber-400/20',
      tagText: 'text-amber-600 dark:text-amber-400',
      titleGradient: 'from-[#EA580C] via-[#F59E0B] to-[#E11D48]',
    },
    teal: {
      accentText: 'text-teal-700 dark:text-teal-300',
      activeBorder: 'border-teal-500 dark:border-teal-400',
      activeBg: 'bg-teal-50/80 dark:bg-teal-950/40',
      activeRing: 'ring-teal-400/20',
      tagText: 'text-teal-600 dark:text-teal-400',
      titleGradient: 'from-[#0D9488] via-[#06B6D4] to-[#8B5CF6]',
    },
    lavender: {
      accentText: 'text-[#9333EA] dark:text-[#F472B6]',
      activeBorder: 'border-[#9333EA] dark:border-[#C084FC]',
      activeBg: 'bg-purple-50/80 dark:bg-purple-950/40',
      activeRing: 'ring-purple-400/20',
      tagText: 'text-[#9333EA] dark:text-[#F472B6]',
      titleGradient: 'from-[#9333EA] via-[#D946EF] to-[#EC4899]',
    },
    gold: {
      accentText: 'text-rose-700 dark:text-rose-400',
      activeBorder: 'border-rose-500 dark:border-rose-400',
      activeBg: 'bg-rose-50/80 dark:bg-rose-950/40',
      activeRing: 'ring-rose-400/20',
      tagText: 'text-rose-600 dark:text-rose-400',
      titleGradient: 'from-[#D97706] via-[#F59E0B] to-[#DB2777]',
    },
  }[zone.theme || 'lavender'];

  const titleParts = zone.title.split('&');
  const mainTitle = titleParts[0].trim();
  const highlightTitle = titleParts.slice(1).join('&').trim();

  return (
    <section
      id={zone.anchorId}
      className="relative min-h-0 lg:min-h-[75vh] flex flex-col justify-center overflow-hidden py-8 sm:py-14 lg:py-20 border-b border-[#2D1D48]/10 dark:border-white/10"
    >
      {/* Decorative Fluid Vector Curves & Glow Dots (Matches Reference Screenshots) */}
      <FloorZoneDecorations theme={zone.theme} />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          {/* ===================================================================
              FLOATING WHITE PILL CARD CONTAINER
              Order switches depending on zone.isReversed!
             =================================================================== */}
          <div
            className={`lg:col-span-5 relative rounded-3xl sm:rounded-[2.5rem] bg-white/95 dark:bg-[#1C122C]/95 backdrop-blur-2xl border-2 border-white/90 dark:border-white/15 shadow-[0_15px_45px_rgba(147,51,234,0.08)] p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5 ${zone.isReversed ? 'lg:order-2' : 'lg:order-1'
              }`}
          >
            {/* Header Kicker & Titles */}
            <div className="space-y-1.5">
              <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] ${themeStyles.tagText} block`}>
                {zone.levelCode}
              </span>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1E112A] dark:text-[#FAF0F8] leading-[1.14]">
                {mainTitle}
                {highlightTitle && (
                  <>
                    {' '}&amp;{' '}
                    <span className={`font-serif italic font-normal inline-block bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>
                      {highlightTitle}
                    </span>
                  </>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C426E] dark:text-[#D8CEE9] font-medium leading-relaxed">
                {zone.subtitle}
              </p>
            </div>

            {/* Interactive Brand Selector Pills Grid (Clean Orion Mall Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
              {zone.brandIds.map((brandId) => {
                const brand = BRANDS_DIRECTORY[brandId];
                if (!brand) return null;
                const isSelected = activeBrand.id === brand.id;

                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setSelectedBrandId(brand.id)}
                    className={`w-full flex items-center gap-2.5 p-1.5 sm:p-2 pr-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer text-left border ${isSelected
                      ? `${themeStyles.activeBg} border-2 ${themeStyles.activeBorder} shadow-sm ring-2 ${themeStyles.activeRing}`
                      : 'bg-white dark:bg-white/5 border-neutral-200/90 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25 hover:bg-neutral-50/60 dark:hover:bg-white/10 shadow-2xs'
                      }`}
                  >
                    {/* Brand Official Logo Badge Box */}
                    <div className="w-[74px] sm:w-[84px] h-8 sm:h-9 rounded-lg bg-neutral-100/90 dark:bg-black/40 border border-neutral-200/70 dark:border-white/10 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                      <OfficialBrandLogo brandId={brand.id} variant="badge" isSelected={isSelected} />
                    </div>

                    {/* Brand Name Text (High contrast, elegant font, matches reference images) */}
                    <span className={`font-semibold text-xs sm:text-sm tracking-tight truncate ${isSelected ? themeStyles.accentText : 'text-neutral-800 dark:text-neutral-100'
                      }`}>
                      {brand.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Inspect Details Action Footer */}
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-0.5">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#9333EA] dark:text-[#F472B6]">
                  {activeBrand.hours}
                </span>
                <span className="text-xs text-[#3D264E] dark:text-[#D8CEE9] font-medium">
                  {activeBrand.floor} · {activeBrand.suite}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onInspectBrand?.(activeBrand)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] text-white shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
            className={`lg:col-span-7 relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white/95 dark:border-white/20 bg-black/10 group cursor-pointer ${zone.isReversed ? 'lg:order-1' : 'lg:order-2'
              }`}
            onClick={() => onInspectBrand?.(activeBrand)}
          >
            {/* Real Boutique Photograph */}
            <ResilientImage
              key={activeBrand.id}
              src={activeBrand.image}
              alt={`${activeBrand.name} Showcase`}
              priority={zone.id === 'zone-ground-floor'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Floor Tag Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 shadow-lg pointer-events-none">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F472B6] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">
                {activeBrand.floor} · {activeBrand.suite}
              </span>
            </div>

            {/* Bottom Floating Pill (Exact Orion Mall Style) */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 z-10 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-[#1A0E2A]/95 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-xl flex items-center gap-3 sm:gap-4">
              <div className="w-[84px] sm:w-[98px] h-10 sm:h-11 rounded-xl bg-neutral-100/90 dark:bg-black/50 border border-neutral-200/80 dark:border-white/10 flex items-center justify-center p-1 shrink-0 shadow-xs overflow-hidden">
                <OfficialBrandLogo brandId={activeBrand.id} variant="badge" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight truncate">
                    {activeBrand.name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-[#9333EA] dark:text-[#F472B6] shrink-0">
                    {activeBrand.suite}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-300 font-medium truncate mt-0.5">
                  {activeBrand.tagline}
                </p>
              </div>

              <span
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md hover:scale-105 transition-all shrink-0"
                style={{ backgroundColor: activeBrand.accentColor }}
              >
                <span>Inspect</span>
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

  // Lightweight staged preloading so initial viewport loads instantly without network contention
  useEffect(() => {
    // 1. Immediately preload only the first visible ground floor showcase
    const primaryImg = new Image();
    primaryImg.src = BRANDS_DIRECTORY['louis-philippe']?.image;

    // 2. Sequentially preload remaining 3 floor defaults on idle intervals
    const floorDefaults = [
      BRANDS_DIRECTORY['allen-solly']?.image,
      BRANDS_DIRECTORY['adidas']?.image,
      BRANDS_DIRECTORY['inox-cinemas']?.image,
    ].filter(Boolean);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < floorDefaults.length) {
        const nextImg = new Image();
        nextImg.src = floorDefaults[idx];
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const scrollToZone = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#1E112A] dark:text-[#FAF0F8] transition-colors duration-300 overflow-x-hidden selection:bg-pink-500/20">

      {/* Main Content Wrapper - strictly relative z-10 so all text sits above background */}
      <div className="relative z-10">

        {/* =========================================================================
            1. ELEGANT HERO SECTION
            Refined editorial aesthetic with fluid light curves, stats & quick jump
           ========================================================================= */}
        <section className="relative min-h-[50vh] sm:min-h-[65vh] flex flex-col justify-center items-center text-center overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#2D1D48]/10 dark:border-white/10">

          {/* Soft Ambient Hero Highlights */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute top-12 left-1/4 w-3 h-3 rounded-full bg-amber-400/70 blur-[1px] animate-pulse" />
            <div className="absolute bottom-16 right-1/4 w-3.5 h-3.5 rounded-full bg-pink-400/60 blur-[1px] animate-pulse" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">

            {/* Spaced Kicker */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-pink-400/30 text-[#9333EA] dark:text-[#F472B6] text-[10px] sm:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{MALL_IDENTITY.name} · THE RETAIL COMPENDIUM</span>
            </div>

            {/* Grand Title - with high-contrast mobile fallback so text never disappears */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.08] text-[#1B1028] dark:text-[#FAF0F8]">
              The Pinnacle of Global{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-[#9333EA] sm:text-transparent">
                Fashion &amp; Luxury
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-base text-[#4A3358] dark:text-[#D8CEE9] font-medium max-w-2xl mx-auto leading-relaxed px-1">
              Curated across four architectural promenades in Gorakhpur — discover 17 official flagship boutiques, athletic pavilions, fine jewelry salons, and multiplex entertainment.
            </p>

            {/* Quick Level Jump Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {SHOPPING_FLOOR_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => scrollToZone(zone.anchorId)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap cursor-pointer bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#3D264E] dark:text-[#FAF0F8] hover:bg-[#1E112A] hover:text-white dark:hover:bg-white dark:hover:text-[#1E112A] shadow-xs active:scale-95"
                >
                  <span>{zone.shortCode}</span> · <span className="opacity-80 font-normal">{zone.title.split('&')[0]}</span>
                </button>
              ))}
            </div>

            {/* Concierge Search Bar */}
            <div className="pt-1 sm:pt-2 max-w-md mx-auto w-full">
              <div className="relative">
                <Search className="w-4 h-4 text-[#D946EF] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any of the 17 official brands or suites..."
                  aria-label="Search brands"
                  className="w-full pl-10 sm:pl-11 pr-9 sm:pr-10 py-2.5 sm:py-3 text-xs sm:text-sm rounded-full border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#1C122C]/95 text-[#1E112A] dark:text-white placeholder:text-[#8C769F] focus:outline-none focus:ring-2 focus:ring-[#D946EF] shadow-lg shadow-purple-500/5 transition-all"
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
                <div className="mt-2 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#1C122C] border border-black/10 dark:border-white/15 shadow-2xl text-left space-y-1 max-h-52 overflow-y-auto">
                  {filteredBrands.length > 0 ? (
                    filteredBrands.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => onInspectBrand?.(b)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <BrandBadgeEmblem brandId={b.id} className="w-8 h-6 sm:w-9 sm:h-6.5 shrink-0" />
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
          Section 1: Level 00 (Card Left, Image Right)
          Section 2: Level 01 (Image Left, Card Right)
          Section 3: Level 02 (Card Left, Image Right)
          Section 4: Anchors (Image Left, Card Right)
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
        <section className="relative z-10 py-10 sm:py-20 lg:py-24 px-3 sm:px-6 lg:px-8 border-t border-[#2D1D48]/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl sm:rounded-[3rem] p-5 sm:p-10 lg:p-16 overflow-hidden bg-white/90 dark:bg-[#1C122C]/90 backdrop-blur-2xl border-2 border-white/95 dark:border-white/15 shadow-xl sm:shadow-2xl">
              {/* Ambient Lighting Glows */}
              <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-bl from-pink-300/25 via-purple-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-amber-300/20 via-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Left Column: Heading, Value Props & CTAs */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-[#9333EA] dark:text-[#F472B6] text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-purple-500/20">
                      <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      <span>Experience CITY MALL Gorakhpur</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1E112A] dark:text-[#FAF0F8] leading-[1.08]">
                      17 Premier Brands.{' '}
                      <span className="font-serif italic font-normal bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                        One Grand Mall.
                      </span>
                    </h3>
                    <p className="text-xs sm:text-base text-[#5C426E] dark:text-[#D8CEE9] font-medium leading-relaxed max-w-xl">
                      From bespoke haute couture tailoring to certified diamond jewelry, athletic footwear, multi-screen laser cinema and family dining — spend a luxurious day at Gorakhpur&apos;s living promenade.
                    </p>
                  </div>

                  {/* Concierge Feature Badges */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1 sm:pt-2">
                    <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5 sm:space-y-1 text-center sm:text-left">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D946EF] mx-auto sm:mx-0" />
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C769F] block">Visiting Hours</span>
                      <span className="text-[10px] sm:text-xs font-bold text-[#1E112A] dark:text-white block">10 AM – 10 PM</span>
                    </div>
                    <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5 sm:space-y-1 text-center sm:text-left">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D946EF] mx-auto sm:mx-0" />
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C769F] block">Location</span>
                      <span className="text-[10px] sm:text-xs font-bold text-[#1E112A] dark:text-white block truncate">Civil Lines</span>
                    </div>
                    <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-0.5 sm:space-y-1 text-center sm:text-left">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D946EF] mx-auto sm:mx-0" />
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C769F] block">Levels</span>
                      <span className="text-[10px] sm:text-xs font-bold text-[#1E112A] dark:text-white block">LG to Level 04</span>
                    </div>
                  </div>

                  {/* Direct Page Navigation CTAs */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <Link
                      to="/dining"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] text-white shadow-md shadow-pink-500/25 active:scale-95 transition-all cursor-pointer text-center"
                    >
                      <span>Explore 9 Dining Venues</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/entertainment"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 text-[#1E112A] dark:text-white hover:bg-black/5 active:scale-95 transition-all cursor-pointer text-center"
                    >
                      <span>INOX Laser 4K</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/visit-us"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 text-[#1E112A] dark:text-white hover:bg-black/5 active:scale-95 transition-all cursor-pointer text-center"
                    >
                      <span>Directions & Parking</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Architectural Directory Grid Quick Filter */}
                <div className="lg:col-span-5 relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3 sm:space-y-4">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9333EA] dark:text-[#F472B6] block">
                    Complete 17 Flagship Directory
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {Object.values(BRANDS_DIRECTORY).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => onInspectBrand?.(b)}
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#1E112A] dark:text-white hover:border-[#D946EF] active:scale-95 transition-all cursor-pointer shadow-2xs"
                      >
                        <BrandBadgeEmblem brandId={b.id} className="w-7 h-5 sm:w-8 sm:h-5.5 shrink-0" />
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
    </div>
  );
}

export default BrandsPage;
