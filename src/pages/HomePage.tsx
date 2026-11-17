import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Compass, MapPin, Sparkles, Utensils, Film, ShoppingBag } from 'lucide-react';
import {
  BRANDS,
  BrandFlagship,
  PAGE_3D_MEDIA,
} from '../data/exhibitionData';
import { PageHero } from '../components/PageHero';
import { ExhibitionImage } from '../components/ExhibitionImage';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

interface HomePageProps {
  onExploreBrand: (brand: BrandFlagship) => void;
}

const DESTINATION_PILLARS = [
  {
    eyebrow: '01 · ARCHITECTURE',
    title: 'Discover Metropolis',
    description:
      'Traverse three travertine and skylight tiers connecting The Grand Atrium & Oculus, Haute Colonnade, and Second Floor Terrace.',
    to: '/discover',
    cta: 'Explore Architecture',
    icon: Compass,
  },
  {
    eyebrow: '02 · COMPLETE INDEX',
    title: 'All 27 Flagships',
    description:
      'Search and filter every verified couture atelier, athletic flagship, fine jeweller, salon, hypermarket, cinema, and restaurant.',
    to: '/brands',
    cta: 'Open Brand Exhibition',
    icon: Sparkles,
  },
  {
    eyebrow: '03 · RETAIL AVENUES',
    title: 'Shopping Boulevards',
    description:
      'Step into haute suiting, heritage denim, performance sneakers, certified 22K solitaires, beauty sanctuaries, electronics, and family wings.',
    to: '/shopping',
    cta: 'Enter Shopping',
    icon: ShoppingBag,
  },
  {
    eyebrow: '04 · LEVEL 2 TERRACE',
    title: 'Culinary & Gastronomy',
    description:
      'Experience 9 signature Level 2 restaurants uniting live charcoal grills, royal Mughlai banquets, pizzerias, and specialty South Indian bistros.',
    to: '/dining',
    cta: 'Reserve Dining',
    icon: Utensils,
  },
  {
    eyebrow: '05 · IMAX & ARCADES',
    title: 'Entertainment Suites',
    description:
      'Immerse in INOX Cinemas 4K Laser IMAX® halls, 128-channel Dolby Atmos® suites, VR arcade pavilions, and supervised Junior Play Zones.',
    to: '/entertainment',
    cta: 'View Entertainment',
    icon: Film,
  },
  {
    eyebrow: '06 · CONCIERGE & ARRIVAL',
    title: 'Plan Your Visit',
    description:
      'Explore the interactive floor directory, East & West VIP valet porticoes, EV superchargers, 24K Gift Cards, and guest concierge services.',
    to: '/visit-us',
    cta: 'Visitor Information',
    icon: MapPin,
  },
];

const SPOTLIGHT_IDS = ['louis-philippe', 'tanishq', 'inox-cinemas', 'barbeque-nation'];

export function HomePage({ onExploreBrand }: HomePageProps) {
  const spotlights = SPOTLIGHT_IDS.map((id) => BRANDS.find((b) => b.id === id)).filter(
    (b): b is BrandFlagship => Boolean(b)
  );
  const homeMedia = PAGE_3D_MEDIA.home;
  const brandsMedia = PAGE_3D_MEDIA.brands;
  const discoverMedia = PAGE_3D_MEDIA.discover;

  return (
    <div>
      {/* HERO ATRIUM 0.25x 3D MULTI-SCENE SHOWCASE */}
      <PageHero
        id="hero-atrium"
        eyebrow="CURATED BRAND PROMENADE"
        title="SOVEREIGN RETAIL EXHIBITION"
        subtitle="METROPOLIS LEVEL 0–2"
        description="An international luxury retail exhibition. Discover all 27 verified flagship houses across haute couture, fine horology, activewear, Michelin-standard gastronomy, and IMAX laser cinema."
        video={homeMedia.video3d}
        poster={homeMedia.poster3d}
        scenes={homeMedia.scenes}
        videoLabel={homeMedia.label}
        stats={[
          { value: '27', label: '27 Iconic Houses Live' },
          { value: '07', label: '7 Architectural Zones' },
          { value: '100%', label: '100% Direct Storefronts' },
        ]}
        actions={
          <>
            <Link
              to="/brands"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.14em] uppercase font-medium bg-[#1A1816] text-[#FAF8F4] hover:bg-[#9A7B4F] transition-colors whitespace-nowrap"
            >
              <span>Browse All 27 Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/discover"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.14em] uppercase font-medium border border-[#1A1816]/30 bg-[#FAF8F4]/85 text-[#1A1816] hover:border-[#9A7B4F] hover:text-[#9A7B4F] transition-colors whitespace-nowrap"
            >
              <span>Discover Tiers</span>
            </Link>
          </>
        }
      />

      {/* CURATED DESTINATION GATEWAYS — DEDICATED MULTI-PAGE ROUTING */}
      <section
        id="home-gateways"
        className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 sm:py-24 border-b border-[#DED5C7]"
      >
        <ScrollVideoBackground
          src={brandsMedia.video3d}
          poster={brandsMedia.poster3d}
          scenes={brandsMedia.scenes}
          triggerSelector="#home-gateways"
          playbackSpeed={0.25}
          videoOpacityClassName="opacity-55"
          blendModeClassName="mix-blend-normal"
          overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
          label={brandsMedia.label}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 sm:p-7 mb-10 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.2em] uppercase text-[#8C6F47] mb-2 font-medium">
                CURATED DESTINATIONS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1816]">
                Explore CITY MALL by Wing &amp; Experience
              </h2>
            </div>
            <Link
              to="/whats-on"
              className="inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase font-medium text-[#1A1816] border-b border-[#9A7B4F] pb-1 hover:text-[#9A7B4F] transition-colors shrink-0"
            >
              <span>Seasonal Galas &amp; Gift Cards</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {DESTINATION_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.to}
                  to={pillar.to}
                  className="group bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#9A7B4F] transition-colors shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-[11px] tracking-[0.16em] uppercase text-[#7A6852]">
                        {pillar.eyebrow}
                      </span>
                      <Icon className="w-4 h-4 text-[#9A7B4F]" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-3 group-hover:text-[#9A7B4F] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A433B]">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#EAE2D4] flex items-center justify-between text-xs tracking-[0.12em] uppercase font-medium text-[#1A1816] group-hover:text-[#9A7B4F]">
                    <span>{pillar.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT SIGNATURE HOUSES WITH 0.25x 3D SCENE BACKDROP */}
      <section
        id="home-spotlights"
        className="relative overflow-hidden py-16 sm:py-24 bg-[#EFEAE1] text-[#1A1816]"
      >
        <ScrollVideoBackground
          src={discoverMedia.video3d}
          poster={discoverMedia.poster3d}
          scenes={discoverMedia.scenes}
          triggerSelector="#home-spotlights"
          playbackSpeed={0.25}
          videoOpacityClassName="opacity-55"
          blendModeClassName="mix-blend-normal"
          overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
          label={discoverMedia.label}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 sm:p-7 mb-10 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-2 font-medium">
                CURATED HIGHLIGHTS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816]">
                Four Anchor Houses of Metropolis
              </h2>
            </div>
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium bg-[#1A1816] text-[#FAF8F4] hover:bg-[#9A7B4F] transition-colors shrink-0"
            >
              <span>View All 27 Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spotlights.map((brand) => (
              <article
                key={brand.id}
                className="group bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DDD4C6] overflow-hidden flex flex-col shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D7]">
                  <ExhibitionImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.12em] uppercase text-[#7A6852] mb-1">
                      {brand.category}
                    </p>
                    <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-1.5">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-[#5C5349] tabular-nums">{brand.floor}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E6DED0]">
                    <button
                      type="button"
                      onClick={() => onExploreBrand(brand)}
                      className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-medium text-[#1A1816] hover:text-[#9A7B4F] transition-colors cursor-pointer"
                    >
                      <span>{brand.buttonLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
