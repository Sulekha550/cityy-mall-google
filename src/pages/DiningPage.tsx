import { Star, Utensils, Coffee, Wine, Clock, MapPin } from 'lucide-react';
import {
  BRANDS,
  BrandFlagship,
  PAGE_3D_MEDIA,
  ZONES,
} from '../data/exhibitionData';
import { PageHero, SubRouteTab } from '../components/PageHero';
import { ZoneShowcaseSection } from '../components/ZoneShowcases';
import { ExhibitionImage } from '../components/ExhibitionImage';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

export type DiningSubCategory =
  | 'all'
  | 'restaurants'
  | 'food-court'
  | 'cafes'
  | 'fine-dining';

interface DiningPageProps {
  subCategory?: DiningSubCategory;
  onExploreBrand: (brand: BrandFlagship) => void;
}

const DINING_BRAND_GROUPS: Record<DiningSubCategory, string[]> = {
  all: [
    'barbeque-nation',
    'pizza-hut',
    'kfc',
    'pind-balluchi',
    'the-mirch-masala-restaurant',
    'cinnamon-restaurant',
    'subrasa-orion-mall',
    'rangrezza-restaurant-banquet-hall',
    'dosa-plaza',
  ],
  restaurants: [
    'barbeque-nation',
    'pizza-hut',
    'pind-balluchi',
    'subrasa-orion-mall',
  ],
  'food-court': ['kfc', 'pizza-hut', 'dosa-plaza'],
  cafes: ['dosa-plaza', 'cinnamon-restaurant', 'spencers'],
  'fine-dining': [
    'the-mirch-masala-restaurant',
    'cinnamon-restaurant',
    'rangrezza-restaurant-banquet-hall',
    'pind-balluchi',
  ],
};

const DINING_META: Record<
  DiningSubCategory,
  {
    eyebrow: string;
    title: string;
    description: string;
    crumb: string;
    poster: string;
  }
> = {
  all: {
    eyebrow: 'ZONE 07 · CULINARY TERRACE · LEVEL 2',
    title: 'FOOD & DESTINATION RESTAURANTS',
    description:
      'All 9 verified 4.8★ dining venues across the Second Floor Culinary Terrace—spanning live charcoal grills, royal Mughlai banquets, heritage tandoor rooms, Italian pizzerias, and specialty South Indian bistros.',
    crumb: 'Dining',
    poster: '/posters/dining-3d.jpg',
  },
  restaurants: {
    eyebrow: 'DINING · FAMILY & SIGNATURE TABLES',
    title: 'SIGNATURE RESTAURANTS',
    description:
      'Vibrant full-service dining rooms featuring live on-table charcoal grills, North Indian heritage dishes, authentic pure vegetarian thalis, and Italian classics.',
    crumb: 'Restaurants',
    poster: '/posters/dining-scene-2.jpg',
  },
  'food-court': {
    eyebrow: 'DINING · EXPRESS CULINARY TERRACE',
    title: 'FOOD COURT & QUICK SERVICE',
    description:
      'Fast, chef-crafted favourites on Level 2 ideal before or after IMAX® screenings—crispy classics, hot stone-baked pizzas, and freshly griddled dosas.',
    crumb: 'Food Court',
    poster: '/posters/dining-scene-4.jpg',
  },
  cafes: {
    eyebrow: 'DINING · COFFEE SALONS & PATISSERIE',
    title: 'CAFÉS, FILTER COFFEE & PATISSERIE',
    description:
      'Brewed single-origin filter coffees at Dosa Plaza, evening dessert pairings at Cinnamon Bistro, and warm sourdough viennoiserie at Spencer’s Patisserie.',
    crumb: 'Cafes',
    poster: '/posters/dining-scene-3.jpg',
  },
  'fine-dining': {
    eyebrow: 'DINING · ROYAL BANQUETS & CHEF TABLES',
    title: 'FINE DINING & BANQUET HALLS',
    description:
      'Elevated evening gastronomy showcasing Royal Mughlai slow-cooked biryanis, multi-cuisine tasting menus, and grand private celebration suites.',
    crumb: 'Fine Dining',
    poster: '/posters/dining-scene-2.jpg',
  },
};

export function DiningPage({
  subCategory = 'all',
  onExploreBrand,
}: DiningPageProps) {
  const meta = DINING_META[subCategory];
  const diningZone = ZONES.find((z) => z.id === 'dining')!;
  const matchedIds = DINING_BRAND_GROUPS[subCategory];
  const filteredDining = BRANDS.filter((b) => matchedIds.includes(b.id));
  const diningMedia = PAGE_3D_MEDIA.dining;
  const discoverMedia = PAGE_3D_MEDIA.discover;

  const tabs: SubRouteTab[] = [
    { label: 'All 9 Venues', to: '/dining', active: subCategory === 'all' },
    {
      label: 'Restaurants',
      to: '/dining/restaurants',
      active: subCategory === 'restaurants',
    },
    {
      label: 'Food Court',
      to: '/dining/food-court',
      active: subCategory === 'food-court',
    },
    { label: 'Cafes', to: '/dining/cafes', active: subCategory === 'cafes' },
    {
      label: 'Fine Dining',
      to: '/dining/fine-dining',
      active: subCategory === 'fine-dining',
    },
  ];

  return (
    <div>
      <PageHero
        id={`dining-hero-${subCategory}`}
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
        video={diningMedia.video3d}
        poster={meta.poster}
        scenes={diningMedia.scenes}
        videoLabel={diningMedia.label}
        breadcrumb={
          subCategory === 'all'
            ? [{ label: 'Home', to: '/' }, { label: 'Dining' }]
            : [
                { label: 'Home', to: '/' },
                { label: 'Dining', to: '/dining' },
                { label: meta.crumb },
              ]
        }
        subRoutes={tabs}
        stats={[
          { value: '09', label: 'Culinary Destinations' },
          { value: '4.8★', label: 'Verified Guest Rating' },
          { value: 'L2', label: 'Culinary Terrace Wing' },
        ]}
        compact
      />

      {/* CULINARY CURATION NOTES */}
      <section
        id="dining-curation"
        className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-12 border-b border-[#DED5C7]"
      >
        <ScrollVideoBackground
          src={discoverMedia.video3d}
          poster={discoverMedia.poster3d}
          scenes={discoverMedia.scenes}
          triggerSelector="#dining-curation"
          playbackSpeed={0.25}
          videoOpacityClassName="opacity-52"
          blendModeClassName="mix-blend-normal"
          overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
          label={discoverMedia.label}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 shadow-sm">
            <Utensils className="w-4 h-4 text-[#9A7B4F] mb-2.5" />
            <h2 className="font-serif text-xl font-medium mb-1.5">
              Second Floor Terrace
            </h2>
            <p className="text-sm text-[#4A433B]">
              Adjacent to INOX IMAX® suites with valet drop-off elevator access directly to Level 2.
            </p>
          </div>
          <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 shadow-sm">
            <Wine className="w-4 h-4 text-[#9A7B4F] mb-2.5" />
            <h2 className="font-serif text-xl font-medium mb-1.5">
              Private Celebrations
            </h2>
            <p className="text-sm text-[#4A433B]">
              Bespoke banquet seating at Rangrezza Restaurant &amp; Banquet Hall for milestone gatherings.
            </p>
          </div>
          <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 shadow-sm">
            <Coffee className="w-4 h-4 text-[#9A7B4F] mb-2.5" />
            <h2 className="font-serif text-xl font-medium mb-1.5">
              All-Day Service
            </h2>
            <p className="text-sm text-[#4A433B]">
              Morning filter coffees from 10:00 AM through late evening banquets until 11:30 PM.
            </p>
          </div>
        </div>
      </section>

      {subCategory === 'all' ? (
        <ZoneShowcaseSection
          zone={diningZone}
          brands={filteredDining}
          onExplore={onExploreBrand}
          isFiltered={false}
        />
      ) : (
        <section
          id={`dining-subgrid-${subCategory}`}
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={diningMedia.video3d}
            poster={meta.poster}
            scenes={diningMedia.scenes}
            triggerSelector={`#dining-subgrid-${subCategory}`}
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={diningMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredDining.map((brand) => (
                <article
                  key={brand.id}
                  className="group bg-[#FAF8F4]/95 border border-[#DFD7C8] overflow-hidden flex flex-col shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D7]">
                    <ExhibitionImage
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] tracking-[0.12em] uppercase text-[#7A6852] truncate">
                          {brand.category}
                        </span>
                        {brand.rating && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums">
                            <Star className="w-3.5 h-3.5 fill-[#9A7B4F] text-[#9A7B4F]" />
                            {brand.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-2xl font-medium mb-2">
                        {brand.name}
                      </h3>
                      <div className="text-xs text-[#5F574D] space-y-1">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#9A7B4F]" />
                          <span>{brand.floor} · {brand.location ?? 'Level 2'}</span>
                        </p>
                        {brand.timing && (
                          <p className="flex items-center gap-1.5 tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-[#9A7B4F]" />
                            <span>{brand.timing}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onExploreBrand(brand)}
                      className="self-start text-xs tracking-[0.12em] uppercase font-medium pb-1 border-b border-[#1A1816]/40 hover:text-[#9A7B4F] hover:border-[#9A7B4F] transition-colors cursor-pointer"
                    >
                      {brand.buttonLabel}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
