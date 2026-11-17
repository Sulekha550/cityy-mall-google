export type ZoneId =
  | 'fashion'
  | 'footwear'
  | 'jewellery'
  | 'beauty'
  | 'supermarket'
  | 'cinema'
  | 'dining';

export type FilterId = 'all' | ZoneId;

export interface BrandFlagship {
  id: string;
  zoneId: ZoneId;
  name: string;
  category: string;
  type?: string;
  floor: string;
  location?: string;
  timing?: string;
  rating?: number;
  description?: string;
  highlights?: string[];
  buttonLabel: string;
  featured?: boolean;
  image: string;
  keywords: string[];
}

export interface ArchitecturalScene {
  src: string;
  title: string;
}

export interface ZoneDefinition {
  id: ZoneId;
  indexLabel: string;
  title: string;
  filterLabel: string;
  subtitle: string;
  listedLabel: string;
  count: number;
  theme: 'light' | 'dark' | 'travertine';
  backdropTone: string;
  sceneThemeColor: string;
  video: string;
  poster: string;
  scenes: ArchitecturalScene[];
  videoLabel: string;
}

export type Page3DKey =
  | 'home'
  | 'discover'
  | 'brands'
  | 'shopping'
  | 'dining'
  | 'entertainment'
  | 'whats-on'
  | 'visit-us';

export interface Page3DAsset {
  key: Page3DKey;
  video3d: string;
  poster3d: string;
  scenes: ArchitecturalScene[];
  cameraConcept: string;
  label: string;
}

export const PAGE_3D_MEDIA: Record<Page3DKey, Page3DAsset> = {
  home: {
    key: 'home',
    video3d: '/videos/home-3d.mp4',
    poster3d: '/posters/home-3d.jpg',
    scenes: [
      { src: '/posters/home-scene-2.jpg', title: 'Grand Mall Exterior & Reflecting Plaza' },
      { src: '/posters/home-scene-3.jpg', title: 'Monumental Travertine Entrance Foyer' },
      { src: '/posters/home-3d.jpg', title: 'Sunlit Central Atrium & Glass Elevators' },
      { src: '/posters/home-scene-4.jpg', title: 'Pearl-White Escalators & Shopping Avenue' },
    ],
    cameraConcept:
      'Exterior arrival glide into the sunlit pearl-white grand atrium, glass skylight canopy, elevators and interior greenery.',
    label: '0.25x 3D architectural sequence from grand exterior plaza into central atrium',
  },
  discover: {
    key: 'discover',
    video3d: '/videos/discover-3d.mp4',
    poster3d: '/posters/discover-3d.jpg',
    scenes: [
      { src: '/posters/discover-3d.jpg', title: 'Multi-Tier Bridges & Cascading Oculus' },
      { src: '/posters/discover-scene-2.jpg', title: 'Indoor Botanical Conservatory Garden' },
      { src: '/posters/discover-scene-3.jpg', title: 'Undulating Glass-Blue Sky Bridges' },
      { src: '/posters/discover-scene-4.jpg', title: 'Champagne Mezzanine Sculpture Lounge' },
    ],
    cameraConcept:
      'Slow elevated 3D fly-through across travertine sky bridges, atrium gardens, water sculptures and elliptical glass oculus.',
    label: '0.25x 3D architectural exploration of bridges, indoor gardens and mezzanine lounges',
  },
  brands: {
    key: 'brands',
    video3d: '/videos/brands-3d.mp4',
    poster3d: '/posters/brands-3d.jpg',
    scenes: [
      { src: '/posters/brands-3d.jpg', title: 'Fluted Travertine Colonnade Storefronts' },
      { src: '/posters/brands-scene-2.jpg', title: 'Curved Glass Haute Couture Gallery' },
      { src: '/posters/brands-scene-3.jpg', title: 'Minimalist Alabaster Flagship Interior' },
      { src: '/posters/brands-scene-4.jpg', title: 'Horology & Maison Vitrines Arcade' },
    ],
    cameraConcept:
      'Forward architectural dolly along fluted champagne-stone colonnades and frameless glass luxury brand storefronts.',
    label: '0.25x 3D walkthrough along luxury brand storefronts, vitrines and gallery interiors',
  },
  shopping: {
    key: 'shopping',
    video3d: '/videos/shopping-3d.mp4',
    poster3d: '/posters/shopping-3d.jpg',
    scenes: [
      { src: '/posters/shopping-3d.jpg', title: 'Haute Fashion & Boutique Pavilion' },
      { src: '/posters/shopping-scene-2.jpg', title: 'Minimalist Terrazzo Footwear Gallery' },
      { src: '/posters/shopping-scene-3.jpg', title: 'Frosted Crystal Jewellery Showroom' },
      { src: '/posters/shopping-scene-4.jpg', title: 'Botanical Beauty & Lifestyle Corridor' },
    ],
    cameraConcept:
      'Continuous 3D gallery pan spanning haute apparel salons, sculpted footwear plinths, frosted crystal jewellery counters and lifestyle wings.',
    label: '0.25x 3D walkthrough of fashion boutiques, footwear plinths and fine jewellery salons',
  },
  dining: {
    key: 'dining',
    video3d: '/videos/dining-3d.mp4',
    poster3d: '/posters/dining-3d.jpg',
    scenes: [
      { src: '/posters/dining-3d.jpg', title: 'Sunlit Rooftop Bistros & Peach Parasols' },
      { src: '/posters/dining-scene-2.jpg', title: 'Travertine Arches Fine Dining Hall' },
      { src: '/posters/dining-scene-3.jpg', title: 'Marble Patisserie & Sunlit Cafe Lounge' },
      { src: '/posters/dining-scene-4.jpg', title: 'Oak & Glass-Blue Culinary Pavilion' },
    ],
    cameraConcept:
      'Sun-drenched 3D terrace glide across travertine bistros, soft peach linen umbrellas, olive planters and glass-blue skylights.',
    label: '0.25x 3D culinary promenade spanning fine dining rooms, cafes and glass terraces',
  },
  entertainment: {
    key: 'entertainment',
    video3d: '/videos/entertainment-3d.mp4',
    poster3d: '/posters/entertainment-3d.jpg',
    scenes: [
      { src: '/posters/entertainment-3d.jpg', title: 'Sunlit IMAX & Gaming Dome Concourse' },
      { src: '/posters/entertainment-scene-2.jpg', title: 'INOX Cinema Multiplex Sanctuary' },
      { src: '/posters/discover-scene-3.jpg', title: 'Panoramic Glass Mezzanine Walkway' },
      { src: '/posters/discover-scene-4.jpg', title: 'Champagne Family Leisure Lounge' },
    ],
    cameraConcept:
      'Futuristic daylight 3D dome camera sweep past curved acoustic ribs, glass gaming lounges and IMAX multiplex portals.',
    label: '0.25x 3D architectural tour of daylight entertainment dome and cinema suites',
  },
  'whats-on': {
    key: 'whats-on',
    video3d: '/videos/whats-on-3d.mp4',
    poster3d: '/posters/whats-on-3d.jpg',
    scenes: [
      { src: '/posters/whats-on-3d.jpg', title: 'Reflecting Pool Runway & Floral Sculptures' },
      { src: '/posters/brands-scene-2.jpg', title: 'Seasonal Couture Exhibition Gallery' },
      { src: '/posters/brands-scene-3.jpg', title: 'Sculptural Vitrine Celebration Hall' },
      { src: '/posters/home-scene-4.jpg', title: 'Central Atrium Escalator Showcase' },
    ],
    cameraConcept:
      'Serene museum-grade 3D atrium runway and suspended floral sculptures mirrored over limestone reflecting pools.',
    label: '0.25x 3D exhibition sequence of runway galleries and floral art installations',
  },
  'visit-us': {
    key: 'visit-us',
    video3d: '/videos/visit-us-3d.mp4',
    poster3d: '/posters/visit-us-3d.jpg',
    scenes: [
      { src: '/posters/visit-us-3d.jpg', title: 'Aerial Arrival Plaza & Fountain Portico' },
      { src: '/posters/visit-us-scene-2.jpg', title: 'Grand Reception & Concierge Atrium' },
      { src: '/posters/home-scene-2.jpg', title: 'Glass Facade & Valet Reflecting Pool' },
      { src: '/posters/home-scene-3.jpg', title: 'Travertine Directory & Arrival Vaults' },
    ],
    cameraConcept:
      'Sweeping aerial 3D approach over sculpted ivory arrival canopy, fountain plaza, botanical gardens and clear glass curtain facade.',
    label: '0.25x 3D arrival plaza flyover, reception hall and visitor concierge courts',
  },
};

export const HERO_ATRIUM_IMAGE =
  '/src/assets/images/hero_city_mall_atrium_1794890880703.jpg';

export const HERO_VIDEO = PAGE_3D_MEDIA.home.video3d;
export const HERO_POSTER = PAGE_3D_MEDIA.home.poster3d;
export const BRANDS_STOREFRONTS_VIDEO = PAGE_3D_MEDIA.brands.video3d;
export const BRANDS_STOREFRONTS_POSTER = PAGE_3D_MEDIA.brands.poster3d;
export const DISCOVER_ARCHITECTURE_VIDEO = PAGE_3D_MEDIA.discover.video3d;
export const DISCOVER_ARCHITECTURE_POSTER = PAGE_3D_MEDIA.discover.poster3d;
export const EVENTS_EXPERIENCES_VIDEO = PAGE_3D_MEDIA['whats-on'].video3d;
export const EVENTS_EXPERIENCES_POSTER = PAGE_3D_MEDIA['whats-on'].poster3d;
export const VISIT_US_VIDEO = PAGE_3D_MEDIA['visit-us'].video3d;
export const VISIT_US_POSTER = PAGE_3D_MEDIA['visit-us'].poster3d;

export const ZONES: ZoneDefinition[] = [
  {
    id: 'fashion',
    indexLabel: 'ZONE 01',
    title: 'Fashion & Apparel',
    filterLabel: 'Fashion & Apparel',
    subtitle:
      'Designer boutiques, tailoring ateliers & contemporary ready-to-wear collections.',
    listedLabel: '6 Flagships Listed',
    count: 6,
    theme: 'light',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76',
    sceneThemeColor: '#C6A87A',
    video: PAGE_3D_MEDIA.brands.video3d,
    poster: '/posters/brands-scene-2.jpg',
    scenes: [
      { src: '/posters/brands-scene-2.jpg', title: 'Couture Glass Window Gallery' },
      { src: '/posters/shopping-3d.jpg', title: 'Fashion Boutique Pavilion' },
      { src: '/posters/brands-3d.jpg', title: 'Fluted Travertine Colonnade' },
      { src: '/posters/brands-scene-3.jpg', title: 'Minimalist Alabaster Showroom' },
    ],
    videoLabel: '0.25x 3D luxury fashion boutiques and tailoring salon corridor',
  },
  {
    id: 'footwear',
    indexLabel: 'ZONE 02',
    title: 'Footwear & Sportswear',
    filterLabel: 'Footwear & Sportswear',
    subtitle:
      'High-performance athletic runners, handcrafted nubuck boots & urban lifestyle footwear.',
    listedLabel: '6 Flagships Listed',
    count: 6,
    theme: 'travertine',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EAE5DC]/76',
    sceneThemeColor: '#8B7D6B',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/shopping-scene-2.jpg',
    scenes: [
      { src: '/posters/shopping-scene-2.jpg', title: 'Terrazzo Footwear Display Gallery' },
      { src: '/posters/shopping-3d.jpg', title: 'Sculpted Footwear Plinths' },
      { src: '/posters/home-scene-4.jpg', title: 'Level 0 Sports Promenade' },
      { src: '/posters/brands-3d.jpg', title: 'Athletic Flagship Colonnade' },
    ],
    videoLabel: '0.25x 3D footwear displays and sunlit athletic gallery walkthrough',
  },
  {
    id: 'jewellery',
    indexLabel: 'ZONE 03',
    title: 'Jewellery & Watches',
    filterLabel: 'Jewellery & Watches',
    subtitle:
      'Sovereign 22K/24K gold craftsmanship, certified solitaires & precision chronographs.',
    listedLabel: '2 Flagships Listed',
    count: 2,
    theme: 'light',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76',
    sceneThemeColor: '#D4AF37',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/shopping-scene-3.jpg',
    scenes: [
      { src: '/posters/shopping-scene-3.jpg', title: 'Frosted Crystal Jewellery Salon' },
      { src: '/posters/brands-scene-4.jpg', title: 'Champagne Horology Arcade' },
      { src: '/posters/brands-scene-3.jpg', title: 'Travertine Viewing Vitrines' },
      { src: '/posters/shopping-3d.jpg', title: 'Luminous Fine Retail Rotunda' },
    ],
    videoLabel: '0.25x 3D fine jewellery showcase and luminous horology salon',
  },
  {
    id: 'beauty',
    indexLabel: 'ZONE 04',
    title: 'Beauty & Lifestyle',
    filterLabel: 'Beauty & Lifestyle',
    subtitle:
      'Luxury hair sanctuaries, holistic aesthetic wellness & traditional bridal art.',
    listedLabel: '2 Flagships Listed',
    count: 2,
    theme: 'light',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76',
    sceneThemeColor: '#B89778',
    video: PAGE_3D_MEDIA.shopping.video3d,
    poster: '/posters/shopping-scene-4.jpg',
    scenes: [
      { src: '/posters/shopping-scene-4.jpg', title: 'Botanical Beauty & Apothecary Wing' },
      { src: '/posters/discover-scene-2.jpg', title: 'Sunlit Indoor Olive Conservatory' },
      { src: '/posters/discover-scene-4.jpg', title: 'Serene Wellness Lounge Terrace' },
      { src: '/posters/shopping-3d.jpg', title: 'Daylight Lifestyle Promenade' },
    ],
    videoLabel: '0.25x 3D beauty sanctuary and botanical lifestyle promenade',
  },
  {
    id: 'supermarket',
    indexLabel: 'ZONE 05',
    title: 'Supermarket & Retail',
    filterLabel: 'Supermarket & Retail',
    subtitle:
      'Gourmet organic market, international confectionery & lifestyle department concourse.',
    listedLabel: '1 Flagship Listed',
    count: 1,
    theme: 'travertine',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EAE5DC]/76',
    sceneThemeColor: '#6F7D65',
    video: PAGE_3D_MEDIA.discover.video3d,
    poster: '/posters/dining-scene-4.jpg',
    scenes: [
      { src: '/posters/dining-scene-4.jpg', title: 'Gourmet Timber & Glass Market Hall' },
      { src: '/posters/dining-scene-3.jpg', title: 'Artisanal Bakery & Coffee Bar' },
      { src: '/posters/discover-scene-2.jpg', title: 'Fresh Conservatory Concourse' },
      { src: '/posters/home-3d.jpg', title: 'Ground Level Anchor Atrium' },
    ],
    videoLabel: '0.25x 3D gourmet market hall and sunlit retail concourse',
  },
  {
    id: 'cinema',
    indexLabel: 'ZONE 06',
    title: 'Cinema & Multiplex',
    filterLabel: 'Cinema & Multiplex',
    subtitle:
      'VIP IMAX® 4K laser projection suites, Dolby Atmos® soundscapes & Insignia butler lounges.',
    listedLabel: '1 Flagship Listed',
    count: 1,
    theme: 'light',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76',
    sceneThemeColor: '#8C7A5B',
    video: PAGE_3D_MEDIA.entertainment.video3d,
    poster: '/posters/entertainment-3d.jpg',
    scenes: PAGE_3D_MEDIA.entertainment.scenes,
    videoLabel: '0.25x 3D daylight entertainment dome and IMAX multiplex portals',
  },
  {
    id: 'dining',
    indexLabel: 'ZONE 07',
    title: 'Food & Restaurants',
    filterLabel: 'Food & Restaurants',
    subtitle:
      'Royal Mughlai banquets, artisan Italian pizzerias, live charcoal grills & multi-cuisine bistros.',
    listedLabel: '9 Flagships Listed',
    count: 9,
    theme: 'light',
    backdropTone: 'from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76',
    sceneThemeColor: '#A86E44',
    video: PAGE_3D_MEDIA.dining.video3d,
    poster: '/posters/dining-3d.jpg',
    scenes: PAGE_3D_MEDIA.dining.scenes,
    videoLabel: '0.25x 3D rooftop bistros, cafes and sunlit fine dining arches',
  },
];

export const BRANDS: BrandFlagship[] = [
  // ZONE 01 — FASHION & APPAREL (6)
  {
    id: 'louis-philippe',
    zoneId: 'fashion',
    name: 'Louis Philippe',
    category: 'Featured Haute Couture',
    floor: 'First Floor · Level 1',
    location: 'Suite Haute Colonnade 1-130',
    description:
      'The Upper Crest of sartorial sophistication: Super 150s Merino wool suits, pure mulberry silk neckwear, and made-to-measure ceremonies.',
    buttonLabel: 'Explore Flagship',
    featured: true,
    image: '/src/assets/images/brand_louis_philippe_1794890880359.jpg',
    keywords: ['suiting', 'bespoke', 'menswear', 'wool', 'silk', 'tailoring', 'couture'],
  },
  {
    id: 'levis-store',
    zoneId: 'fashion',
    name: "Levi's Store",
    category: 'Denim & Heritage Apparel',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Promenade Unit G-104',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_levis_store_1794890881145.jpg',
    keywords: ['denim', 'jeans', 'heritage', 'jackets', 'casual'],
  },
  {
    id: 'w-for-woman',
    zoneId: 'fashion',
    name: 'W for Woman',
    category: 'Contemporary Ethnic Couture',
    floor: 'First Floor · Level 1',
    location: 'Suite Galleria Suite 1-108',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Boutique',
    image: '/src/assets/images/brand_w_for_woman_1794890882064.jpg',
    keywords: ['ethnic', 'womenswear', 'kurtas', 'festive', 'couture'],
  },
  {
    id: 'allen-solly',
    zoneId: 'fashion',
    name: 'Allen Solly',
    category: 'Smart Casuals & Friday Dressing',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Promenade Suite G-132',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_allen_solly_1794890880882.jpg',
    keywords: ['smart casual', 'friday dressing', 'blazers', 'shirts', 'apparel'],
  },
  {
    id: 'flying-machine',
    zoneId: 'fashion',
    name: 'Flying Machine',
    category: 'Youth Streetwear & Urban Denim',
    floor: 'First Floor · Level 1',
    location: 'Suite Youth Galleria 1-114',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_flying_machine_1794890882195.jpg',
    keywords: ['streetwear', 'urban', 'denim', 'hoodies', 'youth'],
  },
  {
    id: 'mufti',
    zoneId: 'fashion',
    name: 'Mufti',
    category: 'Alternative Casual Menswear',
    floor: 'First Floor · Level 1',
    location: 'Suite Fashion Concourse 1-124',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_mufti_1794890882506.jpg',
    keywords: ['menswear', 'chinos', 'shirts', 'casual'],
  },

  // ZONE 02 — FOOTWEAR & SPORTSWEAR (6)
  {
    id: 'adidas',
    zoneId: 'footwear',
    name: 'Adidas',
    category: 'Performance Sports & Athleisure',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Sports Flagship G-116',
    description:
      'Global sportswear titan showcasing Ultraboost Light energy return, Originals Trefoil streetwear, and high-performance soccer boot flagships.',
    buttonLabel: 'Explore Store',
    featured: true,
    image: '/src/assets/images/brand_adidas_1794890882802.jpg',
    keywords: ['ultraboost', 'sneakers', 'originals', 'soccer', 'athleisure', 'running'],
  },
  {
    id: 'puma',
    zoneId: 'footwear',
    name: 'Puma',
    category: 'Sportswear & Performance Athletic',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Sports Concourse G-120',
    description:
      'Forever Faster sports innovation uniting Olympic-grade NITRO™ foam velocity runners, motorsport collaborations, and high-fashion streetwear.',
    buttonLabel: 'Explore Store',
    featured: true,
    image: '/src/assets/images/brand_puma_1794890883151.jpg',
    keywords: ['nitro', 'motorsport', 'runners', 'sneakers', 'sportswear'],
  },
  {
    id: 'woodland-store',
    zoneId: 'footwear',
    name: 'Woodland Store',
    category: 'Outdoor & Adventure Gear',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Boulevard Unit G-110',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_woodland_store_1794890883929.jpg',
    keywords: ['boots', 'nubuck', 'hiking', 'outdoor', 'adventure'],
  },
  {
    id: 'skechers',
    zoneId: 'footwear',
    name: 'Skechers',
    category: 'Athletic Footwear & Comfort Shoes',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Sports Promenade G-126',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_skechers_1794890884397.jpg',
    keywords: ['walking', 'comfort', 'sneakers', 'athletic'],
  },
  {
    id: 'red-chief',
    zoneId: 'footwear',
    name: 'Red Chief',
    category: 'Genuine Leather Shoes & Boots',
    floor: 'First Floor · Level 1',
    location: 'Suite Leather Arcade 1-120',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_red_chief_1794890883654.jpg',
    keywords: ['leather', 'boots', 'formal', 'brogues', 'shoes'],
  },
  {
    id: 'metro-shoes',
    zoneId: 'footwear',
    name: 'Metro Shoes',
    category: 'Designer Footwear & Accessories',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Shoe Galleria G-124',
    timing: '10:00 AM – 10:00 PM',
    buttonLabel: 'Explore Store',
    image: '/src/assets/images/brand_metro_shoes_1794890885502.jpg',
    keywords: ['designer', 'heels', 'loafers', 'handbags', 'accessories'],
  },

  // ZONE 03 — JEWELLERY & WATCHES (2)
  {
    id: 'tanishq',
    zoneId: 'jewellery',
    name: 'Tanishq',
    category: 'Fine Jewellery & 22K/24K Gold',
    floor: 'Ground Floor · Level 0',
    location: 'Suite The Gilded Arcade G-102',
    description:
      "India's revered fine jewellery maison: certified 22K temple gold, VVS solitaire diamonds, handcrafted bridal kundan polki, and gemstone suites.",
    buttonLabel: 'Explore Boutique',
    featured: true,
    image: '/src/assets/images/brand_tanishq_1794890885153.jpg',
    keywords: ['jewellery', 'gold', '22k', '24k', 'diamond', 'solitaire', 'bridal', 'kundan'],
  },
  {
    id: 'titan-world',
    zoneId: 'jewellery',
    name: 'Titan World',
    category: 'Luxury Horology & Timepieces',
    floor: 'First Floor · Level 1',
    location: 'Suite Chrono Colonnade 1-102',
    description:
      'Mastery of ultra-slim mechanical horology: Titan Edge, Nebula solid 18K gold chronometers, and artisanal enamel dials.',
    buttonLabel: 'Explore Boutique',
    featured: true,
    image: '/src/assets/images/brand_titan_world_1794890886423.jpg',
    keywords: ['watches', 'horology', 'chronograph', 'nebula', 'edge', '18k gold'],
  },

  // ZONE 04 — BEAUTY & LIFESTYLE (2)
  {
    id: 'looks-salon',
    zoneId: 'beauty',
    name: 'Looks Salon',
    category: 'Luxury Hair & Grooming Salon',
    floor: 'First Floor · Level 1',
    location: 'Suite Wellness Suite 1-136',
    description:
      'Premier luxury unisex grooming destination featuring Kérastase bespoke hair rituals, master skin therapists, and bridal makeup suites.',
    buttonLabel: 'Explore Boutique',
    featured: true,
    image: '/src/assets/images/brand_looks_salon_1794890994338.jpg',
    keywords: ['salon', 'hair', 'grooming', 'kerastase', 'bridal', 'spa', 'wellness'],
  },
  {
    id: 'arjun-mehendi-art',
    zoneId: 'beauty',
    name: 'Arjun Mehendi Art',
    category: 'Traditional Mehendi & Bridal Art',
    floor: 'First Floor · Level 1',
    location: 'Suite Artisan Kiosk K-104',
    description:
      'Master bridal henna artist crafting organic dark-stain henna creations, intricate Rajasthani figures, and contemporary Arabic geometric florals.',
    buttonLabel: 'Explore Boutique',
    featured: true,
    image: '/src/assets/images/brand_arjun_mehendi_art_1794890888580.jpg',
    keywords: ['mehendi', 'henna', 'bridal', 'rajasthani', 'arabic', 'art'],
  },

  // ZONE 05 — SUPERMARKET & RETAIL (1)
  {
    id: 'spencers',
    zoneId: 'supermarket',
    name: "Spencer's",
    category: 'Anchor Gourmet Supermarket',
    type: 'Gourmet Hypermarket & Department · Metropolis Anchor',
    floor: 'Ground Floor · Level 0',
    location: 'Suite Anchor Concourse G-140',
    timing: '09:00 AM – 10:30 PM',
    description:
      'Comprehensive gourmet supermarket concourse featuring imported artisanal cheeses, live patisserie, fresh hydroponic greens, and home essentials.',
    highlights: [
      'Artisanal European Fromagerie.',
      'Live Sourdough Bakery & Patisserie.',
      'Hydroponic Organic Greens Cellar.',
    ],
    buttonLabel: 'Explore Supermarket',
    featured: true,
    image: '/src/assets/images/brand_spencers_1794890888200.jpg',
    keywords: ['supermarket', 'gourmet', 'cheese', 'bakery', 'organic', 'groceries'],
  },

  // ZONE 06 — CINEMA & MULTIPLEX (1)
  {
    id: 'inox-cinemas',
    zoneId: 'cinema',
    name: 'INOX Cinemas',
    category: 'Exclusive IMAX® Multiplex',
    type: 'Luxury Cinema & IMAX Multiplex · Metropolis Anchor',
    floor: 'Second Floor · Level 2',
    location: 'Suite Multiplex Suite 201',
    timing: '10:00 AM – Midnight',
    description:
      'Dual 4K commercial laser projectors with floor-to-ceiling curved silver screens and motorized heated Italian leather recliners.',
    highlights: [
      'IMAX® 4K Laser Projection.',
      'Dolby Atmos 128-Channel Audio.',
      'Insignia VIP Butler Service.',
    ],
    buttonLabel: 'Experience IMAX® Multiplex',
    featured: true,
    image: '/src/assets/images/brand_inox_cinemas_1794890994736.jpg',
    keywords: ['cinema', 'imax', 'multiplex', 'movies', 'dolby atmos', 'insignia'],
  },

  // ZONE 07 — FOOD & RESTAURANTS (9)
  {
    id: 'barbeque-nation',
    zoneId: 'dining',
    name: 'Barbeque Nation',
    category: 'Live Charcoal Grill & Buffet',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '12:00 PM – 11:00 PM',
    buttonLabel: 'Explore Dining',
    featured: true,
    image: '/src/assets/images/food_barbeque_nation_1794890995244.jpg',
    keywords: ['cuisine', 'grill', 'barbeque', 'buffet', 'charcoal', 'dining'],
  },
  {
    id: 'pizza-hut',
    zoneId: 'dining',
    name: 'Pizza Hut',
    category: 'Artisanal Pizza & Italian Casual',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '11:00 AM – 11:00 PM',
    buttonLabel: 'Explore Dining',
    image: '/src/assets/images/food_pizza_hut_1794890995282.jpg',
    keywords: ['cuisine', 'pizza', 'italian', 'dining', 'pasta'],
  },
  {
    id: 'kfc',
    zoneId: 'dining',
    name: 'KFC',
    category: 'Crispy Chicken & Quick Service',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '11:00 AM – 11:30 PM',
    buttonLabel: 'Explore Dining',
    image: '/src/assets/images/food_kfc_1794890995477.jpg',
    keywords: ['cuisine', 'chicken', 'crispy', 'quick service', 'dining'],
  },
  {
    id: 'pind-balluchi',
    zoneId: 'dining',
    name: 'Pind Balluchi',
    category: 'North Indian Heritage Dining',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '11:30 AM – 11:00 PM',
    buttonLabel: 'Explore Dining',
    featured: true,
    image: '/src/assets/images/food_pind_balluchi_1794890996422.jpg',
    keywords: ['cuisine', 'north indian', 'punjabi', 'heritage', 'naan', 'dal', 'dining'],
  },
  {
    id: 'the-mirch-masala-restaurant',
    zoneId: 'dining',
    name: 'The Mirch Masala Restaurant',
    category: 'Royal Mughlai & Tandoor Cuisine',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '11:30 AM – 11:00 PM',
    buttonLabel: 'Explore Dining',
    featured: true,
    image: '/src/assets/images/food_mirch_masala_1794890891184.jpg',
    keywords: ['cuisine', 'mughlai', 'tandoor', 'biryani', 'kebabs', 'dining'],
  },
  {
    id: 'cinnamon-restaurant',
    zoneId: 'dining',
    name: 'Cinnamon Restaurant',
    category: 'Multi-Cuisine Fine Dining & Bistro',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '12:00 PM – 11:30 PM',
    buttonLabel: 'Explore Dining',
    image: '/src/assets/images/food_cinnamon_restaurant_1794890996276.jpg',
    keywords: ['cuisine', 'fine dining', 'bistro', 'multi-cuisine', 'dining'],
  },
  {
    id: 'subrasa-orion-mall',
    zoneId: 'dining',
    name: 'Subrasa Orion Mall',
    category: 'Authentic Pure Veg Thali & Dining',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '11:00 AM – 11:00 PM',
    buttonLabel: 'Explore Dining',
    image: '/src/assets/images/food_subrasa_orion_1794890996648.jpg',
    keywords: ['cuisine', 'veg', 'vegetarian', 'thali', 'indian', 'dining'],
  },
  {
    id: 'rangrezza-restaurant-banquet-hall',
    zoneId: 'dining',
    name: 'Rangrezza Restaurant & Banquet Hall',
    category: 'Grand Banquets & Celebratory Feasts',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '11:00 AM – 11:30 PM',
    buttonLabel: 'Explore Dining',
    image: '/src/assets/images/food_rangrezza_banquet_1794890997396.jpg',
    keywords: ['cuisine', 'banquet', 'feast', 'celebration', 'dining'],
  },
  {
    id: 'dosa-plaza',
    zoneId: 'dining',
    name: 'Dosa Plaza',
    category: 'South Indian Specialty Delicacies',
    rating: 4.8,
    floor: 'Second Floor · Level 2',
    location: 'Culinary Terrace · Level 2',
    timing: '10:00 AM – 10:30 PM',
    buttonLabel: 'Explore Dining',
    image: '/src/assets/images/food_dosa_plaza_1794890997607.jpg',
    keywords: ['cuisine', 'south indian', 'dosa', 'filter coffee', 'dining'],
  },
];

export const CATEGORY_FILTERS: {
  id: FilterId;
  label: string;
  count: number;
}[] = [
  { id: 'all', label: 'All 27 Brands', count: 27 },
  { id: 'fashion', label: 'Fashion & Apparel', count: 6 },
  { id: 'footwear', label: 'Footwear & Sportswear', count: 6 },
  { id: 'jewellery', label: 'Jewellery & Watches', count: 2 },
  { id: 'beauty', label: 'Beauty & Lifestyle', count: 2 },
  { id: 'supermarket', label: 'Supermarket & Retail', count: 1 },
  { id: 'cinema', label: 'Cinema & Multiplex', count: 1 },
  { id: 'dining', label: 'Food & Restaurants', count: 9 },
];

export const FOOTER_DATA = {
  eyebrow: 'METROPOLIS DESTINATION',
  title: 'CITY MALL',
  tagline: 'SHOPPING • DINING • ENTERTAINMENT',
  description:
    'An architectural masterwork uniting 27 global iconic houses, Michelin culinary salons, and holographic multiplex worlds across 3 luxury tiers.',
  hours: 'Open Daily: 10:00 AM – 11:30 PM',
  spatialDistricts: [
    'The Grand Atrium & Oculus.',
    'Haute Couture & Brand Directory.',
    'Michelin Gastronomy & Dining.',
    'Cinemas & VR Entertainment.',
    'Cultural Galas & Runways.',
    'Concierge, Valet & Spa Privée.',
    'Sovereign 24K Gift Card.',
  ],
  guestServices: [
    'Privilege Gift Card & Experiences.',
    'VIP Chauffeured Valet Portico (East & West).',
    'Private Styling & Grooming Salons.',
    'Hands-Free Concierge Shopping Butler.',
    'Universal Accessibility & Priority Bays.',
    'Helipad & High-Speed EV Superchargers.',
  ],
  communications: {
    concierge: '+1 (800) 555-CITY',
    general: 'concierge@citymall.com',
    press: 'press@citymall.com',
  },
  copyright: '© 2026 CITY MALL Architectural Group. All rights reserved.',
};
