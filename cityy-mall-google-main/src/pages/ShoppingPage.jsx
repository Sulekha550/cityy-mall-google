import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, BRAND_CATEGORIES } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { BrandCategorySection } from '../sections/BrandCategoryCompositions';

const RETAIL_CATEGORY_IDS = [
  'fashion',
  'footwear',
  'jewellery',
  'beauty',
  'supermarket',
];

export function ShoppingPage({ initialCategory = null, onInspectBrand }) {
  const heroRef = useRef(null);

  const retailCategories = BRAND_CATEGORIES.filter((c) =>
    RETAIL_CATEGORY_IDS.includes(c.id)
  );

  const activeCategory = initialCategory
    ? retailCategories.find((c) => c.id === initialCategory) || retailCategories[0]
    : null;

  const categoriesToDisplay = activeCategory ? [activeCategory] : retailCategories;

  const heroVideo = activeCategory
    ? activeCategory.video
    : VIDEO_ASSETS.fashionRetail;

  useEffect(() => {
    return registerSectionMotion(heroRef.current, 'editorial');
  }, [initialCategory]);

  return (
    <div className="shopping-page-scope">
      {/* Dedicated Shopping Sub-route Hero Banner with Matched Category Video */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[100vh] flex items-center py-16 sm:py-20 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#EFE6FA] dark:bg-[#1D1630]"
      >
        <VideoSectionBackground
          videoAsset={heroVideo}
          eager
          playbackRate={0.78}
          videoOpacityClassName="opacity-80 dark:opacity-72"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/86 via-[#EFE6FA]/48 to-[#E4F5F0]/82 dark:from-[#151021]/88 dark:via-[#1D1630]/54 dark:to-[#112226]/84"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-4" data-motion="reveal">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              <ShoppingBag className="w-4 h-4" />
              <span>Retail Avenues · CITY MALL, Gorakhpur</span>
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              {activeCategory ? activeCategory.title : 'Retail & Lifestyle Shopping'}
            </h1>
            <p className="text-base sm:text-lg text-[#433754] dark:text-[#D8CEE9]">
              {activeCategory
                ? activeCategory.subtitle
                : 'Apparel, athletic footwear, fine gold, salons & everyday essentials.'}
            </p>
          </div>

          {/* Direct Route Sub-navigation Links */}
          <nav
            aria-label="Shopping Category Routes"
            className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#2D1D48]/14 dark:border-[#E2D4FF]/14"
          >
            <Link
              to="/shopping"
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                !activeCategory
                  ? 'bg-[#1B1325] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                  : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#C9523C]'
              }`}
            >
              All Shopping
            </Link>
            {retailCategories.map((cat) => {
              const isCurrent = activeCategory?.id === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={cat.route}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    isCurrent
                      ? 'bg-[#683BA4] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                      : 'bg-[#FFFBF6]/88 dark:bg-[#191326]/88 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#683BA4]'
                  }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Bespoke Retail Sections */}
      {categoriesToDisplay.map((cat) => (
        <BrandCategorySection
          key={cat.id}
          category={cat}
          brands={APPROVED_BRANDS.filter((b) => b.categoryId === cat.id)}
          onInspectBrand={onInspectBrand}
        />
      ))}
    </div>
  );
}
