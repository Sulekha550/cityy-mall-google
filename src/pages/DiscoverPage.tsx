import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Compass, Layers, ShieldCheck } from 'lucide-react';
import {
  BRANDS,
  BrandFlagship,
  HERO_ATRIUM_IMAGE,
  PAGE_3D_MEDIA,
} from '../data/exhibitionData';
import { PageHero } from '../components/PageHero';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';
import { ExhibitionImage } from '../components/ExhibitionImage';

interface DiscoverPageProps {
  onExploreBrand: (brand: BrandFlagship) => void;
}

const FLOOR_TIERS = [
  {
    levelKey: 'Ground Floor · Level 0',
    title: 'The Grand Atrium & Sports Promenade',
    subtitle:
      'Anchoring CITY MALL with sweeping natural oculus daylight, fine jewellery vaults, high-performance sportswear ateliers, and gourmet market pavilions.',
    route: '/shopping/footwear',
    zoneLabel: 'Explore Ground Level Wings',
  },
  {
    levelKey: 'First Floor · Level 1',
    title: 'Haute Colonnade & Horology Gallery',
    subtitle:
      'Dedicated to made-to-measure menswear, contemporary ethnic couture, precision 18K mechanical horology, luxury hair wellness sanctuaries, and artisan bridal henna.',
    route: '/shopping/fashion',
    zoneLabel: 'Explore First Floor Boutiques',
  },
  {
    levelKey: 'Second Floor · Level 2',
    title: 'IMAX® Laser Multiplex & Culinary Terrace',
    subtitle:
      'Rising above the atrium with curved 4K IMAX® laser screens, 128-channel Dolby Atmos® halls, VR gaming suites, and all 9 destination gastronomy salons.',
    route: '/dining',
    zoneLabel: 'Explore Culinary & Multiplex',
  },
];

export function DiscoverPage({ onExploreBrand }: DiscoverPageProps) {
  const discoverMedia = PAGE_3D_MEDIA.discover;
  const homeMedia = PAGE_3D_MEDIA.home;
  const brandsMedia = PAGE_3D_MEDIA.brands;

  return (
    <div>
      <PageHero
        id="discover-hero"
        eyebrow="ARCHITECTURAL PROMENADE · LEVEL 0–2"
        title="DISCOVER METROPOLIS ARCHITECTURE"
        description="A three-tier travertine and glass sanctuary curated for effortless orientation—where international fashion colonnades, fine horology vaults, and a rooftop culinary terrace converge beneath a daylight oculus."
        video={discoverMedia.video3d}
        poster={discoverMedia.poster3d}
        scenes={discoverMedia.scenes}
        videoLabel={discoverMedia.label}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Discover' }]}
        stats={[
          { value: '3', label: 'Architectural Tiers' },
          { value: '27', label: 'Flagship Suites' },
          { value: '02', label: 'VIP Valet Porticoes' },
        ]}
        actions={
          <Link
            to="/visit-us/map"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.14em] uppercase font-medium bg-[#1A1816] text-[#FAF8F4] hover:bg-[#9A7B4F] transition-colors"
          >
            <span>Open Mall Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      />

      {/* ARCHITECTURAL MONOGRAPH & SPATIAL PHILOSOPHY */}
      <section
        id="discover-levels"
        className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 sm:py-24 border-b border-[#DED5C7]"
      >
        <ScrollVideoBackground
          src={homeMedia.video3d}
          poster={homeMedia.poster3d}
          scenes={homeMedia.scenes}
          triggerSelector="#discover-levels"
          playbackSpeed={0.25}
          videoOpacityClassName="opacity-55"
          blendModeClassName="mix-blend-normal"
          overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
          label={homeMedia.label}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 bg-[#FAF8F4]/95 border border-[#DFD7C8] p-6 sm:p-10 shadow-sm">
            <div className="lg:col-span-6 aspect-[16/10] overflow-hidden border border-[#DFD7C8] bg-[#EAE3D7]">
              <ExhibitionImage
                src={HERO_ATRIUM_IMAGE}
                alt="CITY MALL Grand Atrium and Glass Oculus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs tracking-[0.18em] uppercase text-[#7A6852]">
                SPATIAL DESIGN PHILOSOPHY
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816]">
                The Grand Atrium &amp; Oculus
              </h2>
              <p className="text-[15px] leading-relaxed text-[#474139]">
                Designed with wide Roman travertine avenues, acoustic champagne-bronze canopies, and step-free elevators linking every wing from Ground Level 0 to the Culinary Terrace on Level 2, CITY MALL pairs architectural serenity with immediate flagship legibility.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="bg-white border border-[#DDD4C6] p-4">
                  <Compass className="w-4 h-4 text-[#9A7B4F] mb-2" />
                  <p className="font-serif text-lg font-medium">360° Sightlines</p>
                  <p className="text-xs text-[#5C5349] mt-1">
                    Uninterrupted glass balustrades across all three luxury levels.
                  </p>
                </div>
                <div className="bg-white border border-[#DDD4C6] p-4">
                  <ShieldCheck className="w-4 h-4 text-[#9A7B4F] mb-2" />
                  <p className="font-serif text-lg font-medium">Direct Portals</p>
                  <p className="text-xs text-[#5C5349] mt-1">
                    100% verified flagship storefronts with dedicated suite addresses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* THREE FLOORS DETAILED INDEX */}
          <div className="space-y-8">
            {FLOOR_TIERS.map((tier) => {
              const tierBrands = BRANDS.filter((b) => b.floor === tier.levelKey);
              return (
                <article
                  key={tier.levelKey}
                  className="bg-[#FAF8F4]/96 border border-[#DDD4C6] p-7 sm:p-10 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E6DED0]">
                    <div className="max-w-2xl">
                      <p className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#7A6852] mb-2 tabular-nums">
                        <Layers className="w-3.5 h-3.5 text-[#9A7B4F]" />
                        <span>{tier.levelKey}</span>
                      </p>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
                        {tier.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#4A433B]">
                        {tier.subtitle}
                      </p>
                    </div>
                    <Link
                      to={tier.route}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors shrink-0"
                    >
                      <span>{tier.zoneLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tierBrands.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => onExploreBrand(brand)}
                        className="text-left p-4 bg-white border border-[#E5DDD0] hover:border-[#9A7B4F] transition-colors cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="font-serif text-lg font-medium text-[#1A1816] truncate">
                            {brand.name}
                          </p>
                          <p className="text-xs text-[#6E6254] truncate">
                            {brand.location ?? brand.category}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#9A7B4F] shrink-0" />
                      </button>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AMBIENT ATRIUM EXPERIENCES BAND */}
      <section
        id="discover-experiences"
        className="relative overflow-hidden py-16 sm:py-24 bg-[#EFEAE1] text-[#1A1816]"
      >
        <ScrollVideoBackground
          src={brandsMedia.video3d}
          poster={brandsMedia.poster3d}
          scenes={brandsMedia.scenes}
          triggerSelector="#discover-experiences"
          playbackSpeed={0.25}
          videoOpacityClassName="opacity-55"
          blendModeClassName="mix-blend-normal"
          overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
          label={brandsMedia.label}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/brands"
            className="bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DDD4C6] p-7 hover:border-[#9A7B4F] transition-colors shadow-sm"
          >
            <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
              Directory
            </p>
            <h3 className="font-serif text-2xl font-medium mb-2">
              Complete 27-Brand Index
            </h3>
            <p className="text-sm text-[#4A433B]">
              Filter by haute couture, athletic performance, horology, wellness, or gastronomy.
            </p>
          </Link>
          <Link
            to="/visit-us/services"
            className="bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DDD4C6] p-7 hover:border-[#9A7B4F] transition-colors shadow-sm"
          >
            <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
              Hospitality
            </p>
            <h3 className="font-serif text-2xl font-medium mb-2">
              Concierge &amp; Butler Escort
            </h3>
            <p className="text-sm text-[#4A433B]">
              Hands-free package delivery to East &amp; West VIP Valet porticoes.
            </p>
          </Link>
          <Link
            to="/visit-us/parking"
            className="bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DDD4C6] p-7 hover:border-[#9A7B4F] transition-colors shadow-sm"
          >
            <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2">
              Arrival
            </p>
            <h3 className="font-serif text-2xl font-medium mb-2">
              Chauffeured Valet &amp; EV Hub
            </h3>
            <p className="text-sm text-[#4A433B]">
              Priority underground bays, high-speed EV chargers, and private helipad access.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
