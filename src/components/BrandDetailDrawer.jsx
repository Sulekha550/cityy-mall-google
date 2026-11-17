import { useEffect } from 'react';
import { ArrowRight, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandInsignia } from './BrandInsignia';
import { ResilientImage } from './ResilientImage';
import { MALL_IDENTITY } from '../utilities/brandsData';

export function BrandDetailDrawer({ brand, onClose }) {
  useEffect(() => {
    if (!brand) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [brand, onClose]);

  if (!brand) return null;

  const destinationRoute =
    brand.categoryId === 'dining'
      ? '/dining'
      : brand.categoryId === 'cinema'
      ? '/entertainment'
      : `/shopping/${brand.categoryId}`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#151021]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={`${brand.name} overview`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg h-full overflow-y-auto bg-[#FBF4EB] dark:bg-[#191326] text-[#1B1325] dark:text-[#F6EFE7] border-l border-[#2D1D48]/15 dark:border-[#E2D4FF]/15 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="relative h-72 sm:h-80 overflow-hidden bg-[#EFE6FA] dark:bg-[#231B38]">
            <ResilientImage
              src={brand.image}
              alt={brand.name}
              priority
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close outlet details"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#FBF4EB]/90 dark:bg-[#151021]/90 text-[#1B1325] dark:text-[#F6EFE7] border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 hover:scale-105 transition-transform cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-7 sm:p-9 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#683BA4] dark:text-[#BFA1FF] mb-2">
                  {brand.categoryName}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
                  {brand.name}
                </h2>
              </div>
              <BrandInsignia
                monogram={brand.monogram}
                accentColor={brand.accentColor}
                size="lg"
              />
            </div>

            <p className="text-base leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              {brand.tagline}
            </p>

            <div className="pt-5 border-t border-[#2D1D48]/15 dark:border-[#E2D4FF]/15 space-y-3 text-sm text-[#433754] dark:text-[#D8CEE9]">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9523C] dark:text-[#F48C74] shrink-0" />
                <span>Located inside {MALL_IDENTITY.fullTitle}</span>
              </p>
              <p className="text-xs text-[#5D5070] dark:text-[#B5A7D0] leading-relaxed">
                Storefront directory signage and mall customer desk guidance inside CITY MALL, Gorakhpur assist guests directly to this outlet.
              </p>
            </div>
          </div>
        </div>

        <div className="p-7 sm:p-9 border-t border-[#2D1D48]/15 dark:border-[#E2D4FF]/15 flex flex-wrap items-center justify-between gap-4 bg-[#EFE6FA]/60 dark:bg-[#211836]">
          <Link
            to={destinationRoute}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-semibold bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <span>Explore {brand.categoryName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#433754] dark:text-[#D8CEE9] hover:text-[#1B1325] dark:hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
