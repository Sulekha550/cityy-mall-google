import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Gift, Sparkles } from 'lucide-react';
import {
  ArchitecturalScene,
  BRANDS,
  BrandFlagship,
  PAGE_3D_MEDIA,
  ZONES,
  ZoneId,
} from '../data/exhibitionData';
import { PageHero, SubRouteTab } from '../components/PageHero';
import { ZoneShowcaseSection } from '../components/ZoneShowcases';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

export type ShoppingSubCategory =
  | 'all'
  | 'fashion'
  | 'footwear'
  | 'jewellery'
  | 'beauty'
  | 'electronics'
  | 'toys-kids';

interface ShoppingPageProps {
  subCategory?: ShoppingSubCategory;
  onExploreBrand: (brand: BrandFlagship) => void;
}

const SHOPPING_META: Record<
  ShoppingSubCategory,
  {
    eyebrow: string;
    title: string;
    description: string;
    video: string;
    poster: string;
    scenes: ArchitecturalScene[];
    videoLabel: string;
    zones: ZoneId[];
    crumb: string;
  }
> = {
  all: {
    eyebrow: 'SHOPPING BOULEVARDS · LEVEL 0–1',
    title: 'LUXURY RETAIL & MAISON GALLERIES',
    description:
      'Traverse haute tailoring ateliers, heritage denim houses, performance athletic flagships, certified 22K solitaires, wellness salons, smart lifestyle electronics, and family retail wings.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: PAGE_3D_MEDIA.shopping.poster3d,
    scenes: PAGE_3D_MEDIA.shopping.scenes,
    videoLabel: PAGE_3D_MEDIA.shopping.label,
    zones: ['fashion', 'footwear', 'jewellery', 'beauty', 'supermarket'],
    crumb: 'Shopping',
  },
  fashion: {
    eyebrow: 'ZONE 01 · FASHION & APPAREL',
    title: 'HAUTE COUTURE & APPAREL',
    description:
      'Designer boutiques, tailoring ateliers & contemporary ready-to-wear collections uniting Super 150s Merino suiting, heritage denim, ethnic couture, and smart casuals.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/brands-scene-2.jpg',
    scenes: [
      { src: '/posters/brands-scene-2.jpg', title: 'Couture Glass Window Gallery' },
      { src: '/posters/shopping-3d.jpg', title: 'Fashion Boutique Pavilion' },
      { src: '/posters/brands-3d.jpg', title: 'Fluted Travertine Storefronts' },
      { src: '/posters/brands-scene-3.jpg', title: 'Minimalist Alabaster Salon' },
    ],
    videoLabel: '0.25x 3D luxury fashion boutiques and tailoring salon corridor',
    zones: ['fashion'],
    crumb: 'Fashion',
  },
  footwear: {
    eyebrow: 'ZONE 02 · FOOTWEAR & SPORTSWEAR',
    title: 'FOOTWEAR & PERFORMANCE ATHLETICS',
    description:
      'High-performance athletic runners, NITRO™ foam velocity shoes, handcrafted nubuck expedition boots, and designer leather dress footwear.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/shopping-scene-2.jpg',
    scenes: [
      { src: '/posters/shopping-scene-2.jpg', title: 'Terrazzo Footwear Showroom' },
      { src: '/posters/shopping-3d.jpg', title: 'Sculpted Footwear Plinths' },
      { src: '/posters/home-scene-4.jpg', title: 'Level 0 Athletic Avenue' },
      { src: '/posters/brands-3d.jpg', title: 'Flagship Sportswear Colonnade' },
    ],
    videoLabel: '0.25x 3D sculptural footwear plinths and athletic retail gallery',
    zones: ['footwear'],
    crumb: 'Footwear',
  },
  jewellery: {
    eyebrow: 'ZONE 03 · JEWELLERY & WATCHES',
    title: 'FINE JEWELLERY & HOROLOGY',
    description:
      'Sovereign 22K/24K gold craftsmanship, bridal kundan polki, VVS solitaire diamonds, and ultra-slim mechanical chronometers.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/shopping-scene-3.jpg',
    scenes: [
      { src: '/posters/shopping-scene-3.jpg', title: 'Frosted Crystal Jewellery Salon' },
      { src: '/posters/brands-scene-4.jpg', title: 'Champagne Horology Arcade' },
      { src: '/posters/brands-scene-3.jpg', title: 'Travertine Solitaire Vitrines' },
      { src: '/posters/shopping-3d.jpg', title: 'Luminous Fine Retail Rotunda' },
    ],
    videoLabel: '0.25x 3D luminous fine jewellery vitrines and horology salon',
    zones: ['jewellery'],
    crumb: 'Jewellery & Watches',
  },
  beauty: {
    eyebrow: 'ZONE 04 · BEAUTY & LIFESTYLE',
    title: 'BEAUTY, GROOMING & BRIDAL ART',
    description:
      'Luxury unisex hair sanctuaries, Kérastase rituals, skin therapeutics, and intricate Rajasthani & Arabic organic bridal mehendi art.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/shopping-scene-4.jpg',
    scenes: [
      { src: '/posters/shopping-scene-4.jpg', title: 'Botanical Beauty & Perfume Wing' },
      { src: '/posters/discover-scene-2.jpg', title: 'Indoor Conservatory Walkway' },
      { src: '/posters/discover-scene-4.jpg', title: 'Wellness & Spa Lounge' },
      { src: '/posters/shopping-3d.jpg', title: 'Sunlit Lifestyle Corridor' },
    ],
    videoLabel: '0.25x 3D wellness sanctuary and botanical beauty gallery',
    zones: ['beauty'],
    crumb: 'Beauty & Lifestyle',
  },
  electronics: {
    eyebrow: 'SMART LIVING · HOROLOGY & DEPARTMENT TECH',
    title: 'ELECTRONICS & SMART HOROLOGY',
    description:
      'Explore connected smartwatches, precision horological instruments at Titan World, and home & personal kitchen appliances inside the Spencer’s Department Anchor.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/brands-scene-4.jpg',
    scenes: [
      { src: '/posters/brands-scene-4.jpg', title: 'Chrono Colonnade Gallery' },
      { src: '/posters/shopping-scene-3.jpg', title: 'Precision Horology Vitrines' },
      { src: '/posters/discover-scene-3.jpg', title: 'Modern Architectural Bridges' },
      { src: '/posters/home-scene-4.jpg', title: 'Metropolis Retail Concourse' },
    ],
    videoLabel: '0.25x 3D architectural smart lifestyle and horology concourse',
    zones: ['supermarket', 'jewellery'],
    crumb: 'Electronics',
  },
  'toys-kids': {
    eyebrow: 'JUNIOR PROMENADE · FAMILY & KIDS WING',
    title: 'TOYS, KIDS APPAREL & FAMILY RETAIL',
    description:
      'Family shopping across artisanal confectionery and educational toy aisles at Spencer’s, junior athletic trainers at Adidas & Skechers, and festive youth silhouettes at W for Woman.',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/discover-scene-2.jpg',
    scenes: [
      { src: '/posters/discover-scene-2.jpg', title: 'Botanical Family Concourse' },
      { src: '/posters/shopping-scene-2.jpg', title: 'Junior Footwear Display Gallery' },
      { src: '/posters/dining-scene-3.jpg', title: 'Confectionery & Bakery Pavilion' },
      { src: '/posters/discover-scene-4.jpg', title: 'Family Seating Mezzanine' },
    ],
    videoLabel: '0.25x 3D bright family retail wing and junior lifestyle boutiques',
    zones: ['supermarket', 'footwear'],
    crumb: 'Toys & Kids',
  },
};

export function ShoppingPage({
  subCategory = 'all',
  onExploreBrand,
}: ShoppingPageProps) {
  const meta = SHOPPING_META[subCategory];
  const brandsMedia = PAGE_3D_MEDIA.brands;
  const shoppingMedia = PAGE_3D_MEDIA.shopping;

  const tabs: SubRouteTab[] = [
    { label: 'All Shopping', to: '/shopping', active: subCategory === 'all' },
    { label: 'Fashion', to: '/shopping/fashion', active: subCategory === 'fashion' },
    { label: 'Footwear', to: '/shopping/footwear', active: subCategory === 'footwear' },
    {
      label: 'Jewellery & Watches',
      to: '/shopping/jewellery',
      active: subCategory === 'jewellery',
    },
    {
      label: 'Beauty & Lifestyle',
      to: '/shopping/beauty',
      active: subCategory === 'beauty',
    },
    {
      label: 'Electronics',
      to: '/shopping/electronics',
      active: subCategory === 'electronics',
    },
    { label: 'Toys & Kids', to: '/shopping/toys-kids', active: subCategory === 'toys-kids' },
  ];

  const activeZones = ZONES.filter((z) => meta.zones.includes(z.id));

  return (
    <div>
      <PageHero
        id={`shopping-hero-${subCategory}`}
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
        video={meta.video}
        poster={meta.poster}
        scenes={meta.scenes}
        videoLabel={meta.videoLabel}
        breadcrumb={
          subCategory === 'all'
            ? [{ label: 'Home', to: '/' }, { label: 'Shopping' }]
            : [
                { label: 'Home', to: '/' },
                { label: 'Shopping', to: '/shopping' },
                { label: meta.crumb },
              ]
        }
        subRoutes={tabs}
        compact
      />

      {/* Dedicated Editorial Banner for Electronics Sub-Route */}
      {subCategory === 'electronics' && (
        <section
          id="shopping-electronics-highlights"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-14 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={brandsMedia.video3d}
            poster={brandsMedia.poster3d}
            scenes={brandsMedia.scenes}
            triggerSelector="#shopping-electronics-highlights"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={brandsMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 shadow-sm">
              <Cpu className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-1">
                First Floor · Chrono Colonnade 1-102
              </p>
              <h2 className="font-serif text-2xl font-medium mb-2">
                Connected Horology &amp; Smart Timepieces
              </h2>
              <p className="text-sm text-[#4A433B] leading-relaxed mb-4">
                Discover AMOLED fitness chronographs, hybrid smartwatches, and precision quartz instruments curated inside Titan World.
              </p>
              <button
                type="button"
                onClick={() => {
                  const titan = BRANDS.find((b) => b.id === 'titan-world');
                  if (titan) onExploreBrand(titan);
                }}
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-medium text-[#1A1816] hover:text-[#9A7B4F] cursor-pointer"
              >
                <span>Inspect Titan World Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-1">
                Ground Floor · Anchor Concourse G-140
              </p>
              <h2 className="font-serif text-2xl font-medium mb-2">
                Personal Care &amp; Home Electricals Concourse
              </h2>
              <p className="text-sm text-[#4A433B] leading-relaxed mb-4">
                Spencer’s Department Anchor houses small kitchen appliances, espresso brewers, grooming electronics, and accessories.
              </p>
              <button
                type="button"
                onClick={() => {
                  const spencers = BRANDS.find((b) => b.id === 'spencers');
                  if (spencers) onExploreBrand(spencers);
                }}
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-medium text-[#1A1816] hover:text-[#9A7B4F] cursor-pointer"
              >
                <span>Explore Spencer&apos;s Department</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Editorial Banner for Toys & Kids Sub-Route */}
      {subCategory === 'toys-kids' && (
        <section
          id="shopping-toys-highlights"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-14 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={shoppingMedia.video3d}
            poster={shoppingMedia.poster3d}
            scenes={shoppingMedia.scenes}
            triggerSelector="#shopping-toys-highlights"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={shoppingMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 shadow-sm">
              <Gift className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <h2 className="font-serif text-2xl font-medium mb-2">
                Toys &amp; Imported Confectionery
              </h2>
              <p className="text-sm text-[#4A433B] leading-relaxed">
                Educational building sets, family board games, and international treats inside Spencer’s Concourse G-140.
              </p>
            </div>
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <h2 className="font-serif text-2xl font-medium mb-2">
                Junior Performance Sneakers
              </h2>
              <p className="text-sm text-[#4A433B] leading-relaxed">
                Lightweight running silhouettes and cushioned everyday footwear at Adidas, Puma, and Skechers on Ground Level 0.
              </p>
            </div>
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="font-serif text-2xl font-medium mb-2">
                  Kids Play Zone · Level 2
                </h2>
                <p className="text-sm text-[#4A433B] leading-relaxed mb-4">
                  Pair family retail with supervised soft-play suites and VR lounges on the Second Floor Entertainment Deck.
                </p>
              </div>
              <Link
                to="/entertainment/kids-play-zone"
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-medium text-[#9A7B4F]"
              >
                <span>Open Kids Play Zone</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* MATCHING ZONE SHOWCASES */}
      {activeZones.map((zone) => {
        const zoneBrands = BRANDS.filter((b) => b.zoneId === zone.id);
        return (
          <ZoneShowcaseSection
            key={zone.id}
            zone={zone}
            brands={zoneBrands}
            onExplore={onExploreBrand}
            isFiltered={subCategory !== 'all'}
          />
        );
      })}
    </div>
  );
}
