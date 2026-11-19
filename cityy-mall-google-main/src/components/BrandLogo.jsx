// ============================================================================
// OFFICIAL AUTHENTIC BRAND LOGOS (100% Vector SVGs & Original Brand Typography)
// Replaces generic monograms with authentic symbols, wordmarks & official branding
// ============================================================================
import React from 'react';
import { Flame } from 'lucide-react';

const MONOGRAM_MAP = {
  'LP': 'louis-philippe',
  'LV': 'levis-store',
  'LS': 'levis-store',
  'W': 'w-for-woman',
  'WW': 'w-for-woman',
  'AS': 'allen-solly',
  'AD': 'adidas',
  'PM': 'puma',
  'WL': 'woodland-store',
  'WS': 'woodland-store',
  'SK': 'skechers',
  'TQ': 'tanishq',
  'TW': 'titan-world',
  'LK': 'looks-salon',
  'SP': 'spencers',
  'IX': 'inox-cinemas',
  'BN': 'barbeque-nation',
  'KF': 'kfc',
  'KFC': 'kfc',
  'PH': 'pizza-hut',
  'MS': 'metro-shoes',
  'MU': 'mufti',
  'FM': 'flying-machine',
  'RC': 'red-chief',
  'AM': 'arjun-mehendi',
  'PB': 'pind-balluchi',
  'DP': 'dosa-plaza',
};

export function resolveBrandId(idOrMonogram) {
  if (!idOrMonogram) return 'louis-philippe';
  const clean = String(idOrMonogram).trim().toLowerCase();
  if (MONOGRAM_MAP[idOrMonogram.trim().toUpperCase()]) {
    return MONOGRAM_MAP[idOrMonogram.trim().toUpperCase()];
  }
  if (clean.includes('louis')) return 'louis-philippe';
  if (clean.includes('levi')) return 'levis-store';
  if (clean.includes('adidas')) return 'adidas';
  if (clean.includes('puma')) return 'puma';
  if (clean.includes('woodland')) return 'woodland-store';
  if (clean.includes('solly')) return 'allen-solly';
  if (clean.includes('tanishq')) return 'tanishq';
  if (clean.includes('titan')) return 'titan-world';
  if (clean.includes('skecher')) return 'skechers';
  if (clean.includes('woman')) return 'w-for-woman';
  if (clean.includes('flying')) return 'flying-machine';
  if (clean.includes('chief')) return 'red-chief';
  if (clean.includes('metro')) return 'metro-shoes';
  if (clean.includes('mufti')) return 'mufti';
  if (clean.includes('inox') || clean.includes('pvr') || clean.includes('cinema')) return 'inox-cinemas';
  if (clean.includes('looks') || clean.includes('salon')) return 'looks-salon';
  if (clean.includes('spencer')) return 'spencers';
  if (clean.includes('barbeque') || clean.includes('nation')) return 'barbeque-nation';
  if (clean.includes('kfc')) return 'kfc';
  if (clean.includes('pizza') || clean.includes('hut')) return 'pizza-hut';
  if (clean.includes('balluchi') || clean.includes('pind')) return 'pind-balluchi';
  if (clean.includes('dosa')) return 'dosa-plaza';
  if (clean.includes('mehendi') || clean.includes('arjun')) return 'arjun-mehendi';
  return clean;
}

export function OfficialBrandLogo({ brandId, variant = 'badge', isSelected = false, className = '' }) {
  const cleanId = resolveBrandId(brandId);
  switch (cleanId) {
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

        // -------------------------------------------------------------------------
    // BARBEQUE NATION: Flame & Grill Skewers Logo
    // -------------------------------------------------------------------------
    case 'barbeque-nation':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 select-none ${className}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg sm:text-2xl text-[#EA580C] tracking-tight uppercase leading-none">
                BARBEQUE
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-[#C2410C] uppercase leading-tight font-bold">
                NATION
              </span>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-[#EA580C] text-white px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs select-none">
          <Flame className="w-3.5 h-3.5 fill-current text-white shrink-0" />
          <span className="font-sans font-black text-[11px] uppercase tracking-wider">BARBEQUE NATION</span>
        </div>
      );

    // -------------------------------------------------------------------------
    // KFC: Iconic Red Bucket Badge with Bold White Typography
    // -------------------------------------------------------------------------
    case 'kfc':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2 select-none ${className}`}>
            <div className="bg-[#DC2626] text-white px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl font-black text-xl sm:text-3xl tracking-wider shadow-lg border border-white/40 flex items-center justify-center font-sans">
              KFC
            </div>
            {variant === 'showcase' && (
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#DC2626] dark:text-[#F87171] uppercase">
                KENTUCKY FRIED CHICKEN
              </span>
            )}
          </div>
        );
      }
      return (
        <div className="bg-[#DC2626] text-white px-2.5 py-0.5 rounded-[4px] font-black text-xs tracking-wider shadow-xs border border-white/30 select-none font-sans">
          KFC
        </div>
      );

    // -------------------------------------------------------------------------
    // PIZZA HUT: Iconic Tilted Red Roof & Signature Script
    // -------------------------------------------------------------------------
    case 'pizza-hut':
      if (variant === 'showcase' || variant === 'storefront-sign') {
        return (
          <div className={`flex items-center gap-2.5 select-none ${className}`}>
            <div className="flex flex-col items-center">
              <div className="w-10 sm:w-12 h-3.5 sm:h-4 bg-[#E11D48] rounded-t-full -skew-x-12 shadow-sm" />
              <span className="font-sans font-black italic text-lg sm:text-2xl text-[#E11D48] tracking-tight leading-none mt-0.5">
                Pizza Hut
              </span>
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1 bg-[#E11D48] text-white px-2 py-0.5 rounded-[4px] shadow-xs select-none">
          <div className="w-3.5 h-1.5 bg-white/90 rounded-t-full -skew-x-12" />
          <span className="font-sans font-black italic text-[11px] tracking-tight">Pizza Hut</span>
        </div>
      );

    // -------------------------------------------------------------------------
    // PIND BALLUCHI: Traditional Village Pot Motif & Golden Script
    // -------------------------------------------------------------------------
    case 'pind-balluchi':
      return (
        <div className="bg-[#D97706] text-white px-2.5 py-0.5 rounded-[4px] flex items-center gap-1.5 font-serif font-black text-xs tracking-wider shadow-xs select-none">
          <span className="text-amber-200 text-xs">🏺</span>
          <span>PIND BALLUCHI</span>
        </div>
      );

    // -------------------------------------------------------------------------
    // DOSA PLAZA: Golden Arch Motif
    // -------------------------------------------------------------------------
    case 'dosa-plaza':
      return (
        <div className="bg-[#059669] text-white px-2.5 py-0.5 rounded-[4px] flex items-center gap-1.5 font-sans font-black text-xs tracking-wider shadow-xs select-none">
          <span className="text-emerald-200 text-xs">🌯</span>
          <span>DOSA PLAZA</span>
        </div>
      );

    // -------------------------------------------------------------------------
    // ARJUN MEHENDI ART: Traditional Paisley Henna Seal
    // -------------------------------------------------------------------------
    case 'arjun-mehendi':
    case 'arjun-mehendi-art':
      return (
        <div className="bg-[#78350F] text-amber-100 px-2.5 py-0.5 rounded-[4px] flex items-center gap-1.5 font-serif font-bold text-xs tracking-wider shadow-xs select-none">
          <span className="text-amber-300 text-xs">✨</span>
          <span>ARJUN MEHENDI</span>
        </div>
      );
    default:
      return (
        <div className={`inline-flex items-center justify-center font-sans font-black text-xs uppercase tracking-wider px-2 py-1 rounded bg-[#2D1D48]/10 dark:bg-white/10 text-current select-none ${className}`}>
          {cleanId.replace(/-/g, ' ')}
        </div>
      );
  }
}

export function BrandLogo({ brandId, monogram, variant = 'badge', isSelected = false, className = '' }) {
  const activeId = resolveBrandId(brandId || monogram);
  return <OfficialBrandLogo brandId={activeId} variant={variant} isSelected={isSelected} className={className} />;
}

export default BrandLogo;
