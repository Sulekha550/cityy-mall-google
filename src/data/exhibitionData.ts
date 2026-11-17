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
  videoLabel: string;
}

export const HERO_ATRIUM_IMAGE =
  '/src/assets/images/hero_city_mall_atrium_1794890880703.jpg';

export const HERO_VIDEO = '/videos/mall-hero.mp4';
export const HERO_POSTER = '/posters/mall-hero.webp';
export const DISCOVER_ARCHITECTURE_VIDEO = '/videos/mall-architecture.mp4';
export const DISCOVER_ARCHITECTURE_POSTER = '/posters/mall-architecture.webp';
export const EVENTS_EXPERIENCES_VIDEO = '/videos/events.mp4';
export const EVENTS_EXPERIENCES_POSTER = '/posters/events.webp';

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
    backdropTone: 'from-[#141311]/38 via-[#141311]/15 to-[#141311]/42',
    sceneThemeColor: '#C6A87A',
    video: '/videos/fashion-retail.mp4',
    poster: '/posters/fashion-retail.webp',
    videoLabel: 'Luxury fashion boutique interior footage',
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
    backdropTone: 'from-[#141311]/38 via-[#141311]/15 to-[#141311]/42',
    sceneThemeColor: '#8B7D6B',
    video: '/videos/footwear-sportswear.mp4',
    poster: '/posters/footwear-sportswear.webp',
    videoLabel: 'Sneaker displays and footwear retail store footage',
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
    theme: 'dark',
    backdropTone: 'from-[#11100E]/42 via-[#11100E]/18 to-[#11100E]/46',
    sceneThemeColor: '#D4AF37',
    video: '/videos/jewellery-watches.mp4',
    poster: '/posters/jewellery-watches.webp',
    videoLabel: 'Fine jewellery showcase and macro diamond footage',
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
    backdropTone: 'from-[#141311]/38 via-[#141311]/15 to-[#141311]/42',
    sceneThemeColor: '#B89778',
    video: '/videos/beauty-lifestyle.mp4',
    poster: '/posters/beauty-lifestyle.webp',
    videoLabel: 'Luxury beauty and hair salon styling footage',
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
    backdropTone: 'from-[#141311]/38 via-[#141311]/15 to-[#141311]/42',
    sceneThemeColor: '#6F7D65',
    video: '/videos/supermarket.mp4',
    poster: '/posters/supermarket.webp',
    videoLabel: 'Gourmet supermarket aisle and fresh retail footage',
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
    theme: 'dark',
    backdropTone: 'from-[#0E0D0C]/42 via-[#0E0D0C]/18 to-[#0E0D0C]/46',
    sceneThemeColor: '#8C7A5B',
    video: '/videos/cinema.mp4',
    poster: '/posters/cinema.webp',
    videoLabel: 'Luxury cinema theatre auditorium footage',
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
    backdropTone: 'from-[#141311]/38 via-[#141311]/15 to-[#141311]/42',
    sceneThemeColor: '#A86E44',
    video: '/videos/dining.mp4',
    poster: '/posters/dining.webp',
    videoLabel: 'Upscale restaurant interior and gourmet dining ambiance footage',
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
