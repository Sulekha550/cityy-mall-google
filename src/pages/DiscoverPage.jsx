import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Layers, Sparkles } from 'lucide-react';
import { ARCHITECTURAL_GALLERY, VIDEO_ASSETS } from '../assets/mediaManifest';
import { APPROVED_BRANDS, BRAND_CATEGORIES, MALL_IDENTITY } from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { AtriumAmbientCanvas } from '../animations/AtriumAmbientCanvas';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { BrandInsignia } from '../components/BrandInsignia';

export function DiscoverPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const archRef = useRef(null);
  const matrixRef = useRef(null);
  const [selectedCatId, setSelectedCatId] = useState(BRAND_CATEGORIES[0].id);

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
    };
  }, []);

  return (
    <div>
      {/* Section 1: Interactive 3D Atrium & Video Discovery Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB] dark:bg-[#151021]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.architecture}
          eager
          playbackRate={0.76}
          videoOpacityClassName="opacity-76 dark:opacity-68"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/88 via-[#EFE6FA]/52 to-[#E4F5F0]/80 dark:from-[#151021]/90 dark:via-[#1D1630]/58 dark:to-[#112226]/82"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6" data-motion="reveal">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#683BA4] dark:text-[#BFA1FF]">
              <Compass className="w-4 h-4" />
              <span>Spatial Discovery · {MALL_IDENTITY.city}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.06] text-[#1B1325] dark:text-[#F6EFE7]">
              Discover the Architecture of Everyday Leisure
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#433754] dark:text-[#D8CEE9]">
              Move your cursor across the prismatic vault to shift perspective and select any of the seven destination categories spanning apparel, athletics, fine jewellery, salons, daily hypermarket goods, INOX Cinemas, and dining inside CITY MALL, Gorakhpur.
            </p>

            {/* Category Compass Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              {BRAND_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedCategory.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1325] dark:bg-[#BFA1FF] text-[#FBF4EB] dark:text-[#151021] border-transparent'
                        : 'bg-[#FFFBF6]/90 dark:bg-[#1D1630]/90 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 hover:border-[#683BA4] dark:hover:border-[#BFA1FF]'
                    }`}
                  >
                    {cat.number} · {cat.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Interactive Vault Viewport (Clean solid-backed frame, no backdrop-blur over WebGL) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-[320px] sm:h-[390px] border border-[#2D1D48]/20 dark:border-[#E2D4FF]/20 bg-[#EFE6FA] dark:bg-[#191326] overflow-hidden shadow-2xl">
              <AtriumAmbientCanvas activeCategoryId={selectedCategory.id} />
              <div className="absolute bottom-4 left-4 right-4 bg-[#FFFBF6] dark:bg-[#151021] border border-[#2D1D48]/15 dark:border-[#E2D4FF]/15 px-4 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E7C71] dark:text-[#5EEAD4]">
                    Active Prismatic Wing · {categoryBrands.length}{' '}
                    {categoryBrands.length === 1 ? 'Outlet' : 'Outlets'}
                  </p>
                  <p className="font-display text-lg font-semibold text-[#1B1325] dark:text-[#F6EFE7] truncate">
                    {selectedCategory.title}
                  </p>
                </div>
                <Link
                  to={selectedCategory.route}
                  className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] bg-[#C9523C] dark:bg-[#F48C74] text-[#FBF4EB] dark:text-[#151021] shrink-0"
                >
                  Open Wing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Category Outlet Preview Strip */}
      <section
        ref={archRef}
        className="relative overflow-hidden py-20 sm:py-24 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#EFE6FA] dark:bg-[#1D1630]"
      >
        <VideoSectionBackground
          videoAsset={selectedCategory.video}
          playbackRate={0.76}
          videoOpacityClassName="opacity-76 dark:opacity-68"
          tintClassName="bg-gradient-to-b from-[#EFE6FA]/86 via-[#FBF4EB]/48 to-[#EFE6FA]/88 dark:from-[#1D1630]/88 dark:via-[#151021]/52 dark:to-[#1D1630]/88"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#683BA4] dark:text-[#BFA1FF] mb-1">
                Currently Inspecting {selectedCategory.number}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                {selectedCategory.title} Houses
              </h2>
            </div>
            <p className="text-sm text-[#433754] dark:text-[#D8CEE9] max-w-md">
              {selectedCategory.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBrands.map((brand, idx) => (
              <div
                key={brand.id}
                className={`border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/92 dark:bg-[#191326]/92 overflow-hidden ${
                  idx % 2 === 1 ? 'md:translate-y-4' : ''
                }`}
              >
                <div className="h-52 overflow-hidden">
                  <ResilientImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-display text-2xl font-semibold text-[#1B1325] dark:text-[#F6EFE7] truncate">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
                      {brand.tagline}
                    </p>
                    <button
                      type="button"
                      onClick={() => onInspectBrand(brand)}
                      className="pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C9523C] dark:text-[#F48C74] hover:underline cursor-pointer"
                    >
                      Outlet Overview →
                    </button>
                  </div>
                  <BrandInsignia
                    monogram={brand.monogram}
                    accentColor={brand.accentColor}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Architectural Interior Gallery over Storefront Video */}
      <section
        ref={matrixRef}
        className="relative overflow-hidden py-20 sm:py-24 bg-[#E4F5F0] dark:bg-[#112226]"
      >
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.brandsStorefronts}
          playbackRate={0.76}
          videoOpacityClassName="opacity-72 dark:opacity-64"
          tintClassName="bg-gradient-to-tr from-[#E4F5F0]/88 via-[#E6F1FC]/46 to-[#FBF4EB]/84 dark:from-[#112226]/90 dark:via-[#131C2E]/54 dark:to-[#151021]/86"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0E7C71] dark:text-[#5EEAD4]">
                <Layers className="w-4 h-4" />
                <span>Atrium Materiality</span>
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B1325] dark:text-[#F6EFE7]">
                Promenade Views &amp; Gathering Spaces
              </h2>
            </div>

            <Link
              to="/visit-us"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1B1325] dark:bg-[#5EEAD4] text-[#FBF4EB] dark:text-[#151021] hover:opacity-90 shrink-0"
            >
              <span>Plan Your Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div
              data-parallax="down"
              className="md:col-span-7 aspect-[16/10] overflow-hidden border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 shadow-xl"
            >
              <ResilientImage
                src={ARCHITECTURAL_GALLERY[2]}
                alt="Daylit promenade concourse inside CITY MALL"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-5 space-y-6">
              <div
                data-parallax="up"
                className="aspect-[16/10] overflow-hidden border border-[#2D1D48]/18 dark:border-[#E2D4FF]/18 shadow-lg"
              >
                <ResilientImage
                  src={ARCHITECTURAL_GALLERY[8]}
                  alt="Curated glass storefront promenade"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 bg-[#FFFBF6]/90 dark:bg-[#17262A]/90 space-y-2">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#C9523C] dark:text-[#F48C74]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Full Directory Access</span>
                </p>
                <p className="text-sm text-[#433754] dark:text-[#D8CEE9]">
                  Browse all twenty-seven approved retail, entertainment, and culinary destinations across Gorakhpur.
                </p>
                <Link
                  to="/brands"
                  className="inline-block pt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0E7C71] dark:text-[#5EEAD4] hover:underline"
                >
                  Open Complete Brand Showcase →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
