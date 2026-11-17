import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Flame,
  Sparkles,
  Utensils,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Users,
  Heart,
  Pizza,
  UtensilsCrossed,
} from 'lucide-react';
import { ARCHITECTURAL_GALLERY } from '../assets/mediaManifest';
import { BRAND_IMAGES, SCENE_IMAGES } from '../assets/imageRegistry';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { RightVerticalSectionNav } from '../components/RightVerticalSectionNav';

const DINING_SECTIONS = [
  { id: 'dining-hero', number: '01', title: 'Flavours Pavilion' },
  { id: 'dining-flame', number: '02', title: 'Flame Grills' },
  { id: 'dining-pizza', number: '03', title: 'Stone-Baked 450°' },
  { id: 'dining-styles', number: '04', title: 'Dining Atmospheres' },
  { id: 'dining-terrace', number: '05', title: 'Dining Terrace' },
];

// CITY MALL's exact 9 approved dining outlets
export const APPROVED_DINING_OUTLETS = [
  {
    id: 'barbeque-nation',
    name: 'Barbeque Nation',
    monogram: 'BN',
    accentColor: '#C9523C',
    floor: 'Third Floor · Suite T-01',
    kicker: 'LIVE TABLE GRILL & BUFFET',
    headline: 'Smoky, Sizzling & Flame-Roasted at Your Table',
    description:
      'Interactive charcoal grills embedded directly into handcrafted timber tables, accompanied by limitless appetizers, aromatic dum biryanis, and rich kulfi platters.',
    hours: '12:00 PM – 11:00 PM',
    location: 'Third Floor Terrace Promenade',
    foodImage: BRAND_IMAGES.barbequeNation,
    interiorImage: SCENE_IMAGES.diningScene4,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Unlimited table skewers roasted over live charcoal embers with personalized marinades and signature table flags.',
        image: BRAND_IMAGES.barbequeNation,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Crispy corn, cajun spiced potatoes, mutton seekh kebabs, coastal prawns, slow-dum biryani & live kulfi counter.',
        image: SCENE_IMAGES.diningScene2,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Warm amber timber paneling, central gourmet buffet island, plush leatherette booths & celebration music.',
        image: SCENE_IMAGES.diningScene4,
      },
    ],
  },
  {
    id: 'pizza-hut',
    name: 'Pizza Hut',
    monogram: 'PH',
    accentColor: '#D63F28',
    floor: 'Third Floor · Food Court',
    kicker: 'PAN PIZZAS & FRESH SIDES',
    headline: 'Golden Oven-Baked Crusts, Melted to Perfection',
    description:
      'Signature deep-dish pan pizzas loaded with stretchy mozzarella, sun-ripened herb marinara, golden garlic breadsticks, and refreshing chilled mocktails.',
    hours: '11:00 AM – 11:00 PM',
    location: 'Third Floor Food Court',
    foodImage: BRAND_IMAGES.pizzaHut,
    interiorImage: SCENE_IMAGES.diningScene3,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Freshly kneaded artisan dough baked in stone-deck pizza ovens with rich cheese pulls and bubbling crusts.',
        image: BRAND_IMAGES.pizzaHut,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Classic Margherita, Cheese Maxx Veggie Supreme, Fiery Chicken Sausage, cheesy garlic pull-aparts & mocktails.',
        image: SCENE_IMAGES.diningScene3,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Casual red-leatherette booths, open view pizza counter, warm pendant lighting & fast-casual family seating.',
        image: SCENE_IMAGES.dining3dTerrace,
      },
    ],
  },
  {
    id: 'kfc',
    name: 'KFC',
    monogram: 'KFC',
    accentColor: '#C93B2B',
    floor: 'Third Floor · Food Court',
    kicker: 'CRISPY CHICKEN & BURGERS',
    headline: '11 Secret Herbs & Spices, Finger Lickin’ Good',
    description:
      'World-famous pressure-fried golden chicken, crunchy zinger burgers, spicy popcorn bites, and chilled chocolate krushers crafted for quick indulgence.',
    hours: '11:00 AM – 11:00 PM',
    location: 'Third Floor Food Court',
    foodImage: BRAND_IMAGES.kfc,
    interiorImage: SCENE_IMAGES.diningScene2,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Signature golden pressure-fried chicken prepared daily with the original secret blend of 11 herbs and spices.',
        image: BRAND_IMAGES.kfc,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Hot & crispy chicken buckets, classic crunchy zinger burgers, fiery peri-peri strips, and chocolate lava cakes.',
        image: SCENE_IMAGES.diningScene2,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Vibrant modern diner atmosphere, self-ordering touch kiosks, fast service counters & spacious seating booths.',
        image: SCENE_IMAGES.dining3dTerrace,
      },
    ],
  },
  {
    id: 'pind-balluchi',
    name: 'Pind Balluchi',
    monogram: 'PB',
    accentColor: '#B36624',
    floor: 'Third Floor · Suite T-05',
    kicker: 'PUNJABI HERITAGE & TANDOOR',
    headline: 'Rustic Punjabi Soul & Clay-Oven Traditions',
    description:
      'Authentic village-style Punjabi dining featuring slow-simmered dal makhani, char-grilled chicken tikka, butter-basted rotis, and thick sweet lassi served in copper tumblers.',
    hours: '12:00 PM – 11:00 PM',
    location: 'Third Floor Dining Avenue',
    foodImage: BRAND_IMAGES.pindBalluchi,
    interiorImage: SCENE_IMAGES.diningScene4,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Rich Awadhi and Punjabi culinary heritage served in rustic mud-tiled courtyards with royal North Indian hospitality.',
        image: BRAND_IMAGES.pindBalluchi,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Murgh makhani, Amritsari kulcha, paneer tikka, slow-simmered dal balluchi & thick saffron sweet lassi.',
        image: SCENE_IMAGES.diningScene4,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Intricately carved timber partitions, warm earthen lanterns, copper tableware & nostalgic rural warmth.',
        image: SCENE_IMAGES.diningScene3,
      },
    ],
  },
  {
    id: 'mirch-masala',
    name: 'The Mirch Masala Restaurant',
    monogram: 'MM',
    accentColor: '#C9523C',
    floor: 'Third Floor · Suite T-08',
    kicker: 'AWADHI & NORTH INDIAN CUISINE',
    headline: 'Aromatic Spices, Dum Cooking & Royal Flavours',
    description:
      'Slow-dum biryanis, richly spiced gravies, and succulent Awadhi kebabs crafted using traditional royal recipes from the kitchens of Purvanchal.',
    hours: '12:00 PM – 11:00 PM',
    location: 'Third Floor Terrace Promenade',
    foodImage: BRAND_IMAGES.mirchMasala,
    interiorImage: SCENE_IMAGES.dining3dTerrace,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Slow dum-pukht cooking sealed with dough handis to capture delicate cardamom and saffron herbal aromas.',
        image: BRAND_IMAGES.mirchMasala,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Lucknowi mutton dum biryani, paneer lababdar, garlic butter naan, galouti kebabs & shahi tukda dessert.',
        image: SCENE_IMAGES.diningScene3,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Brass-accented royal chandeliers, opulent velvet seating, warm golden mood lighting & soft classical melodies.',
        image: SCENE_IMAGES.dining3dTerrace,
      },
    ],
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon Restaurant',
    monogram: 'CN',
    accentColor: '#0E7C71',
    floor: 'Third Floor · Suite T-10',
    kicker: 'MULTI-CUISINE FINE DINING',
    headline: 'Contemporary Gastronomy & Elegant Hospitality',
    description:
      'Curated multi-cuisine dining blending Indian culinary treasures, pan-Asian wok specialties, and Continental sizzlers in a serene, chandelier-lit dining hall.',
    hours: '12:30 PM – 11:00 PM',
    location: 'Third Floor West Wing',
    foodImage: BRAND_IMAGES.cinnamon,
    interiorImage: SCENE_IMAGES.diningScene3,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Gourmet chef-curated tasting plates pairing global culinary techniques with beloved regional ingredients.',
        image: BRAND_IMAGES.cinnamon,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Truffle butter naan, grilled river sole, wild mushroom risotto, dim sums & molten Belgian chocolate cake.',
        image: SCENE_IMAGES.diningScene2,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Crystal chandelier ceilings, crisp white linen tables, private family alcoves & soothing acoustic jazz.',
        image: SCENE_IMAGES.diningScene3,
      },
    ],
  },
  {
    id: 'subrasa',
    name: 'Subrasa Orion Mall',
    monogram: 'SB',
    accentColor: '#B36624',
    floor: 'Third Floor · Food Promenade',
    kicker: 'TRADITIONAL THALIS & SWEETS',
    headline: 'Pure Flavours, Rich Desi Ghee & Authentic Thalis',
    description:
      'Wholesome regional vegetarian thalis served with steaming phulkas, fragrant dal tadka, seasonal heirloom sabzis, rasmalai, and traditional festival mithai.',
    hours: '11:00 AM – 10:30 PM',
    location: 'Third Floor Food Promenade',
    foodImage: BRAND_IMAGES.subrasa,
    interiorImage: SCENE_IMAGES.diningScene4,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Unlimited silver-platter thali service with ever-changing daily regional curries and hot ghee breads.',
        image: BRAND_IMAGES.subrasa,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Maharaja vegetarian thali, malpua rabdi, dry fruit kachori, Gujarati kadhi & chilled kesar badam milk.',
        image: SCENE_IMAGES.diningScene4,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Bright, welcoming family-style seating with hand-painted folk murals, brass tableware & warm cordial staff.',
        image: SCENE_IMAGES.dining3dTerrace,
      },
    ],
  },
  {
    id: 'rangrezza',
    name: 'Rangrezza Restaurant & Banquet Hall',
    monogram: 'RG',
    accentColor: '#683BA4',
    floor: 'Third Floor · Suite T-12',
    kicker: 'CELEBRATORY BANQUETS & BUFFETS',
    headline: 'Grand Feasts, Festive Celebrations & Lavish Banquets',
    description:
      'Expansive banquet dining accommodating up to 300 guests for family celebrations, wedding receptions, birthday parties, and festive weekend culinary spreads.',
    hours: '12:00 PM – 11:30 PM',
    location: 'Third Floor Grand Terrace',
    foodImage: BRAND_IMAGES.rangrezza,
    interiorImage: SCENE_IMAGES.dining3dTerrace,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Full-service hospitality with custom celebration menus, live chat counters, and dedicated event stages.',
        image: BRAND_IMAGES.rangrezza,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Grand celebration buffet with 40+ dishes, live pasta counter, royal biryani pots & ice cream sundae station.',
        image: SCENE_IMAGES.diningScene3,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Opulent crystal chandeliers, customizable stage lighting, velvet draped banquet seating & sound staging.',
        image: SCENE_IMAGES.dining3dTerrace,
      },
    ],
  },
  {
    id: 'dosa-plaza',
    name: 'Dosa Plaza',
    monogram: 'DP',
    accentColor: '#0E7C71',
    floor: 'Third Floor · Food Court',
    kicker: 'SOUTH INDIAN & FUSION DOSAS',
    headline: 'Crisp Golden Dosas, Filter Coffee & 100+ Varieties',
    description:
      'From traditional paper-thin butter masala dosas and steamed fluffy idlis to inventive fusion dosas paired with freshly brewed hot South Indian filter coffee.',
    hours: '10:30 AM – 10:30 PM',
    location: 'Third Floor Food Court',
    foodImage: BRAND_IMAGES.dosaPlaza,
    interiorImage: SCENE_IMAGES.diningScene2,
    panels: [
      {
        id: 'experience',
        title: 'Signature Dining Experience',
        description:
          'Live griddle theatrical cooking where crisp dosas are folded hot and served with trio chutneys and sambar.',
        image: BRAND_IMAGES.dosaPlaza,
      },
      {
        id: 'food',
        title: 'Food & Specialities',
        description:
          'Mysore masala dosa, schezwan cheese dosa, crispy medu vada, podi idlis & aromatic degree filter kaapi.',
        image: SCENE_IMAGES.diningScene2,
      },
      {
        id: 'ambience',
        title: 'Restaurant Ambience',
        description:
          'Fast-casual booth seating with bright cheerful lighting, open griddle viewing & quick takeaway access.',
        image: SCENE_IMAGES.dining3dTerrace,
      },
    ],
  },
];

// Pizza Hut Stone-Baked Specialities (Matching Reference Screenshot 2)
const PIZZA_TABS = [
  {
    id: 'hand-tossed',
    label: 'Hand-Tossed',
    title: 'Hand-Tossed Signature Pizzas',
    description:
      'Stone-baked crust stretched fresh to order with bubbling mozzarella & zesty oregano.',
    image: BRAND_IMAGES.pizzaHut,
    thumb: SCENE_IMAGES.diningScene3,
  },
  {
    id: 'cheese-burst',
    label: 'Cheese Burst',
    title: 'Cheese Burst Deep-Dish Crusts',
    description:
      'Molten liquid cheddar cheese filled crust loaded with double toppings and garlic butter dip.',
    image: SCENE_IMAGES.diningScene3,
    thumb: BRAND_IMAGES.pizzaHut,
  },
  {
    id: 'choco-lava',
    label: 'Choco Lava',
    title: 'Warm Choco Volcano Cake',
    description:
      'Freshly oven-baked chocolate cake with an irresistible warm molten chocolate lava center.',
    image: SCENE_IMAGES.diningScene2,
    thumb: SCENE_IMAGES.diningScene4,
  },
];

export function DiningPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const flameRef = useRef(null);
  const pizzaRef = useRef(null);
  const mosaicRef = useRef(null);
  const terraceRef = useRef(null);

  // Active restaurant selection for Section 2 (Dark Burgundy Flame Grill Showcase)
  const [selectedOutletIndex, setSelectedOutletIndex] = useState(0);
  const [selectedPanelIndex, setSelectedPanelIndex] = useState(0);
  const [swappedImage, setSwappedImage] = useState(false);

  // Active tab & swapped state for Section 3 (Warm Champagne Stone-Baked Showcase)
  const [activePizzaTab, setActivePizzaTab] = useState(0);
  const [swappedPizzaImage, setSwappedPizzaImage] = useState(false);

  const activeOutlet = APPROVED_DINING_OUTLETS[selectedOutletIndex];
  const activePanel = activeOutlet.panels[selectedPanelIndex];

  const handleSelectOutlet = (index) => {
    setSelectedOutletIndex(index);
    setSelectedPanelIndex(0);
    setSwappedImage(false);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanFlame = registerSectionMotion(flameRef.current, 'editorial');
    const cleanPizza = registerSectionMotion(pizzaRef.current, 'editorial');
    const cleanMosaic = registerSectionMotion(mosaicRef.current, 'cascade');
    const cleanTerrace = registerSectionMotion(terraceRef.current, 'editorial');

    return () => {
      cleanHero();
      cleanFlame();
      cleanPizza();
      cleanMosaic();
      cleanTerrace();
    };
  }, []);

  // Visuals for Section 2
  const primaryVisual = swappedImage
    ? activeOutlet.interiorImage
    : activePanel.image || activeOutlet.foodImage;

  const secondaryVisual = swappedImage
    ? activePanel.image || activeOutlet.foodImage
    : activeOutlet.interiorImage;

  // Visuals for Section 3
  const currentPizza = PIZZA_TABS[activePizzaTab];
  const pizzaMainVisual = swappedPizzaImage ? currentPizza.thumb : currentPizza.image;
  const pizzaThumbVisual = swappedPizzaImage ? currentPizza.image : currentPizza.thumb;

  return (
    <div className="bg-[#FBF5EE] dark:bg-[#140605] text-[#1B1325] dark:text-[#F6EFE7] transition-colors duration-300">
      {/* Right Vertical Scroll-Spy Navigation (matching reference screenshots) */}
      <RightVerticalSectionNav sections={DINING_SECTIONS} />

      {/* =========================================================================
          SECTION 1: HERO — "THIRD FLOOR FLAVOURS"
          Soft champagne & lavender gradient + flowing golden wavy lines + floating dots
          Left: Display title, narrative text, brand badge dock & highlights
          Right: Premium sunlit terrace visual showcase with overlapping skewer thumbnail
          Zero Humans!
          ========================================================================= */}
      <section
        ref={heroRef}
        id="dining-hero"
        className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 dark:border-white/10"
      >
        {/* Soft Champagne & Golden Wave Lines Canvas (Zero Humans) */}
        <VideoSectionBackground
          variant="dining-hero"
          eager
          videoOpacityClassName="opacity-95"
          tintClassName="bg-transparent"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Kicker, Title, Narrative Text & Floating Brand Dock (7 cols) */}
            <div data-motion="reveal" className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                {/* Kicker with Cutlery Icon */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B36624]/10 dark:bg-[#E39857]/15 border border-[#B36624]/20 text-xs font-semibold tracking-[0.2em] uppercase text-[#B36624] dark:text-[#E39857]">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>THIRD FLOOR PAVILION</span>
                </div>

                {/* Display Headline */}
                <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1B1325] dark:text-[#F6EFE7] leading-[1.08] sm:leading-[1.04]">
                  Third Floor Flavours
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg text-[#5D5070] dark:text-[#D8CEE9] leading-relaxed max-w-xl">
                  Live table grills, crispy golden chicken &amp; oven-baked pizzas served across CITY MALL&apos;s sunlit culinary deck.
                </p>

                {/* Supporting Narrative Text */}
                <p className="text-xs sm:text-sm text-[#736388] dark:text-[#B5A7D0] leading-relaxed max-w-xl">
                  A sun-drenched culinary promenade bringing together 9 verified dining destinations — from interactive charcoal skewers and 450° stone-baked ovens to royal Awadhi gravies and degree filter kaapi.
                </p>
              </div>

              {/* Floating Rounded Brand Badges Dock */}
              <div className="pt-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#1D1628]/85 backdrop-blur-xl border border-[#2D1D48]/14 dark:border-white/15 shadow-2xl">
                  {/* KFC */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOutletIndex(2); // KFC
                      scrollToSection('dining-flame');
                    }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#E4002B] text-white font-black text-[11px] sm:text-xs tracking-wider shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="font-black">KFC</span>
                  </button>

                  {/* Barbeque Nation */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOutletIndex(0); // Barbeque Nation
                      scrollToSection('dining-flame');
                    }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#C9523C] text-white font-bold text-[11px] sm:text-xs tracking-wider shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Barbeque Nation</span>
                  </button>

                  {/* Pizza Hut */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('dining-pizza')}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#006699] text-white font-bold text-[11px] sm:text-xs tracking-wider shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Pizza className="w-3.5 h-3.5" />
                    <span>Pizza Hut</span>
                  </button>
                </div>
              </div>

              {/* Key Quick Highlights Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#5D5070] dark:text-[#B5A7D0] font-mono border-t border-[#2D1D48]/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B36624] dark:text-[#E39857]" />
                  <span>11:00 AM – 11:00 PM Daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B36624] dark:text-[#E39857]" />
                  <span>Third Floor Promenade Deck</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Frame with Overlapping Thumbnail (5 cols) */}
            <div data-motion="reveal" className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/15 bg-[#201524]">
                <ResilientImage
                  src={SCENE_IMAGES.dining3dTerrace}
                  alt="CITY MALL Dining Terrace"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                {/* Floating Top-Left Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/75 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/20 text-white">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFA07A]" />
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white/95">
                    9 Approved Outlets
                  </span>
                </div>

                {/* Floating Bottom-Left Card (hidden on narrow mobile to avoid overlap with thumbnail) */}
                <div className="hidden sm:block absolute bottom-4 left-4 z-20 max-w-[210px] bg-black/75 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFA07A]">
                    Third Floor Terrace
                  </span>
                  <p className="text-xs text-white/90 font-medium leading-tight">
                    Sunlit Promenade &amp; Social Culinary Deck
                  </p>
                </div>

                {/* Overlapping Floating Thumbnail on bottom right */}
                <div
                  onClick={() => scrollToSection('dining-flame')}
                  title="Explore live table grills"
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 w-28 sm:w-36 aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl bg-black/80 cursor-pointer group hover:scale-105 transition-all"
                >
                  <ResilientImage
                    src={BRAND_IMAGES.barbequeNation}
                    alt="Barbeque live skewer grill"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors flex items-end p-1.5">
                    <span className="text-[9px] font-mono text-white/95 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      Live Grills
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FLAME GRILL & SIZZLING RESTAURANT SHOWCASE (Screenshot 1)
          Deep burgundy & glowing horizontal amber streaks (Zero Humans)
          ========================================================================= */}
      <section
        ref={flameRef}
        id="dining-flame"
        className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#D63F28]/25 bg-[#170605] text-[#F6EFE7]"
      >
        <VideoSectionBackground
          variant="dining"
          eager
          videoOpacityClassName="opacity-85"
          tintClassName="bg-gradient-to-tr from-[#160504]/96 via-[#250A07]/88 to-[#130504]/96"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Restaurant Selector Strip — 9 Approved Outlets */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {APPROVED_DINING_OUTLETS.map((outlet, idx) => {
              const isActive = idx === selectedOutletIndex;
              return (
                <button
                  key={outlet.id}
                  type="button"
                  onClick={() => handleSelectOutlet(idx)}
                  className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#D63F28] text-white shadow-lg ring-2 ring-[#FFA07A]/40 -translate-y-0.5'
                      : 'bg-white/10 hover:bg-white/18 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: outlet.accentColor || '#FFA07A' }}
                  />
                  <span>{outlet.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Cinematic Split Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN: Brand Header, Headline, Narrative & 3 Information Panels (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <div
                    className="px-3 py-1.5 rounded-lg text-white font-black text-xs tracking-wider shadow-md uppercase"
                    style={{ backgroundColor: activeOutlet.accentColor || '#D63F28' }}
                  >
                    {activeOutlet.name}
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#FFA07A]">
                    {activeOutlet.kicker}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFA07A]/90 pt-1">
                  <Flame className="w-3.5 h-3.5 text-[#D63F28]" />
                  <span>{activeOutlet.floor}</span>
                </div>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold leading-[1.08] text-[#FFF6EA] tracking-tight">
                {activeOutlet.headline}
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                {activeOutlet.description}
              </p>

              {/* Three Interactive Information Panels */}
              <div className="space-y-2.5 pt-1">
                {activeOutlet.panels.map((panel, idx) => {
                  const isActive = idx === selectedPanelIndex;
                  return (
                    <div
                      key={panel.id}
                      onClick={() => {
                        setSelectedPanelIndex(idx);
                        setSwappedImage(false);
                      }}
                      className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D63F28] to-[#BA2E1B] text-white shadow-xl ring-1 ring-[#FFA07A]/40 -translate-y-0.5'
                          : 'bg-white/8 hover:bg-white/14 border border-white/10 text-white/80 hover:text-white backdrop-blur-md'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="font-display text-sm sm:text-base font-bold tracking-tight">
                          {panel.title}
                        </h3>
                        <span
                          className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-black/35 text-white'
                              : 'bg-white/12 text-white/70'
                          }`}
                        >
                          {isActive ? 'VIEWING' : 'EXPLORE'}
                        </span>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isActive ? 'text-white/95' : 'text-white/65'
                        }`}
                      >
                        {panel.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Info Strip: Operating Hours & Floor Location */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#FFA07A]/85 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D63F28]" />
                  <span>{activeOutlet.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D63F28]" />
                  <span>{activeOutlet.location}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Large Food Image + Overlapping Interior Thumbnail (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#240A07]">
                <ResilientImage
                  key={primaryVisual}
                  src={primaryVisual}
                  alt={activeOutlet.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                <div className="absolute bottom-4 left-4 z-20 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFA07A]">
                    {activePanel.title}
                  </span>
                </div>

                <div
                  onClick={() => setSwappedImage(!swappedImage)}
                  title="Click to switch view"
                  className="absolute bottom-4 right-4 z-20 w-36 sm:w-44 aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl bg-black/80 cursor-pointer group hover:scale-105 transition-all"
                >
                  <ResilientImage
                    src={secondaryVisual}
                    alt={`${activeOutlet.name} interior ambiance`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors flex items-end p-1.5">
                    <span className="text-[9px] font-mono text-white/95 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {swappedImage ? 'Show Food' : 'Show Lounge'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WARM CHAMPAGNE STONE-BAKED OVEN SHOWCASE (Screenshot 2)
          Pure abstract concentric rings: ZERO men, ZERO women!
          ========================================================================= */}
      <section
        ref={pizzaRef}
        id="dining-pizza"
        className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 border-b border-[#2D1D48]/14 bg-[#FDF7EE] dark:bg-[#1A0F0B] text-[#1B1325] dark:text-[#F6EFE7]"
      >
        <VideoSectionBackground
          variant="bake"
          eager
          videoOpacityClassName="opacity-90"
          tintClassName="bg-transparent"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: Floating Rounded Card with Stone-Baked Freshness (6 cols) */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFDF9]/95 dark:bg-[#20141D]/95 backdrop-blur-md p-7 sm:p-9 rounded-3xl border border-white/80 dark:border-white/10 shadow-2xl space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D63F28] text-white flex items-center justify-center font-black text-xs shadow-md">
                      PH
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#1B1325] dark:text-[#F6EFE7] tracking-tight">
                        Pizza Hut
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D63F28]">
                        OVEN-BAKED FRESHNESS
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D63F28] pt-1">
                    <Pizza className="w-3.5 h-3.5" />
                    <span>THIRD FLOOR · STONE-BAKED FRESHNESS</span>
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold leading-[1.08] text-[#1B1325] dark:text-[#F6EFE7] tracking-tight">
                  Fresh Dough. 450° Oven Heat.
                </h3>

                <p className="text-sm leading-relaxed text-[#5D5070] dark:text-[#D8CEE9]">
                  Hand-stretched dough with bubbling mozzarella, stuffed garlic breadsticks, and warm choco lava cakes baked fresh to order.
                </p>

                {/* Interactive Pill Tabs */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {PIZZA_TABS.map((tab, idx) => {
                    const isActive = idx === activePizzaTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActivePizzaTab(idx);
                          setSwappedPizzaImage(false);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#0E5A7A] text-white shadow-md ring-1 ring-[#0E5A7A]/30 -translate-y-0.5'
                            : 'bg-white/80 dark:bg-white/8 text-[#433754] dark:text-[#D8CEE9] border border-[#2D1D48]/14 dark:border-white/12 hover:border-[#0E5A7A]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Detail Text */}
                <div className="p-4 rounded-2xl bg-[#0E5A7A]/6 dark:bg-[#0E5A7A]/15 border border-[#0E5A7A]/15 space-y-1">
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#0E5A7A] dark:text-[#5EEAD4]">
                    {currentPizza.title}
                  </h4>
                  <p className="text-xs text-[#433754] dark:text-[#D8CEE9] leading-relaxed">
                    {currentPizza.description}
                  </p>
                </div>

                {/* Bottom Operating Info */}
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#5D5070] dark:text-[#B5A7D0] font-mono border-t border-[#2D1D48]/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D63F28]" />
                    <span>11:00 AM – 11:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D63F28]" />
                    <span>Third Floor Counter</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Large Pizza Food Image + Overlapping Secondary Dish Thumbnail */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/15 bg-[#251812]">
                <ResilientImage
                  key={pizzaMainVisual}
                  src={pizzaMainVisual}
                  alt={currentPizza.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/40 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0E5A7A] dark:text-[#5EEAD4]">
                    {currentPizza.title}
                  </span>
                </div>

                <div
                  onClick={() => setSwappedPizzaImage(!swappedPizzaImage)}
                  title="Click to switch view"
                  className="absolute bottom-4 right-4 z-20 w-36 sm:w-44 aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/80 dark:border-white/40 shadow-2xl bg-black/80 cursor-pointer group hover:scale-105 transition-all"
                >
                  <ResilientImage
                    src={pizzaThumbVisual}
                    alt="Alternate pizza view"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-1.5">
                    <span className="text-[9px] font-mono text-white/95 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {swappedPizzaImage ? 'Show Pizza' : 'Show Sides'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FOUR SIGNATURE CULINARY AMBIANCES (ZERO HUMANS)
          ========================================================================= */}
      <section
        ref={mosaicRef}
        id="dining-styles"
        className="relative overflow-hidden py-16 sm:py-24 bg-[#1B0A08] border-b border-white/10 text-[#F6EFE7]"
      >
        <VideoSectionBackground
          variant="events"
          videoOpacityClassName="opacity-70"
          tintClassName="bg-gradient-to-tr from-[#1B0A08]/92 via-[#230C0A]/85 to-[#1B0A08]/92"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div data-motion="reveal" className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#FFA07A]">
              <Flame className="w-4 h-4 text-[#D63F28]" />
              <span>Culinary Expressions</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FFF6EA]">
              Four Signature Dining Atmospheres
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Every dining destination at CITY MALL, Gorakhpur is created around a distinctive mood—from live table grills to authentic regional thalis and festive celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/6 backdrop-blur-md p-6 rounded-2xl border border-white/12 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#D63F28]/25 flex items-center justify-center text-[#FFA07A]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Live Table Grills
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Charcoal-embedded table skewers, custom spice glazes, and limitless feast courses at Barbeque Nation.
              </p>
            </div>

            <div className="bg-white/6 backdrop-blur-md p-6 rounded-2xl border border-white/12 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FFA07A]/25 flex items-center justify-center text-[#FFA07A]">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                North Indian &amp; Awadhi
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Slow-dum handi biryanis, royal dal makhani, and clay-tandoor kebabs at Pind Balluchi &amp; The Mirch Masala.
              </p>
            </div>

            <div className="bg-white/6 backdrop-blur-md p-6 rounded-2xl border border-white/12 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#5EEAD4]/25 flex items-center justify-center text-[#5EEAD4]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Southern &amp; Pure Veg
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Crispy golden fusion dosas, aromatic filter kaapi, and heritage thalis at Dosa Plaza &amp; Subrasa.
              </p>
            </div>

            <div className="bg-white/6 backdrop-blur-md p-6 rounded-2xl border border-white/12 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#BFA1FF]/25 flex items-center justify-center text-[#BFA1FF]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Banquets &amp; Global Bites
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                300-guest celebratory banquet suites at Rangrezza alongside hot pan pizzas &amp; crispy chicken at Pizza Hut &amp; KFC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SUNLIT DINING TERRACE PROMENADE (ZERO HUMANS)
          ========================================================================= */}
      <section
        ref={terraceRef}
        id="dining-terrace"
        className="relative overflow-hidden py-16 sm:py-24 bg-[#140605] border-b border-white/10 text-[#F6EFE7]"
      >
        <VideoSectionBackground
          variant="explore"
          videoOpacityClassName="opacity-75"
          tintClassName="bg-gradient-to-tr from-[#140605]/94 via-[#1C0907]/88 to-[#140605]/94"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#FFA07A]">
              <Sparkles className="w-4 h-4 text-[#D63F28]" />
              <span>Spatial Atmosphere</span>
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FFF6EA] leading-[1.08]">
              The Sunlit Dining Terrace &amp; Food Promenade
            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Designed with expansive open skylights and double-height architectural glass canopies, the Dining Promenade on Level 3 pairs natural daylight dining with vibrant evening hospitality.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5EEAD4] mt-1 shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">
                  Sunlit daytime terrace seating with ambient starlight evening chandeliers.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5EEAD4] mt-1 shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">
                  FSSAI-certified live kitchen viewing and rigorous hygiene protocols.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5EEAD4] mt-1 shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">
                  Dedicated family cabanas, kids high chairs, and stroller-accessible walkways.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[16/10] rounded-3xl overflow-hidden border border-white/18 shadow-2xl bg-[#220B08]">
            <ResilientImage
              src={ARCHITECTURAL_GALLERY[10]}
              alt="Culinary terrace ambience inside CITY MALL"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
