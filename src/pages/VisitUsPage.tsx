import { FormEvent, useState } from 'react';
import {
  ArrowUpRight,
  Car,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  Phone,
  Shield,
  Zap,
} from 'lucide-react';
import {
  BRANDS,
  BrandFlagship,
  FOOTER_DATA,
  PAGE_3D_MEDIA,
} from '../data/exhibitionData';
import { PageHero, SubRouteTab } from '../components/PageHero';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

export type VisitUsSubCategory =
  | 'overview'
  | 'map'
  | 'floor-directory'
  | 'parking'
  | 'services'
  | 'contact';

interface VisitUsPageProps {
  subCategory?: VisitUsSubCategory;
  onExploreBrand: (brand: BrandFlagship) => void;
}

const VISIT_META: Record<
  VisitUsSubCategory,
  {
    eyebrow: string;
    title: string;
    description: string;
    crumb: string;
    poster: string;
  }
> = {
  overview: {
    eyebrow: 'VISITOR INFORMATION · METROPOLIS LEVEL 0–2',
    title: 'VISIT CITY MALL CONCIERGE',
    description:
      'Open daily from 10:00 AM to 11:30 PM with East & West VIP Chauffeured Valet Porticoes, EV high-speed chargers, interactive floor directories, and personal shopping butlers.',
    crumb: 'Visit Us',
    poster: '/posters/visit-us-3d.jpg',
  },
  map: {
    eyebrow: 'SPATIAL NAVIGATION · INTERACTIVE LEVELS',
    title: 'METROPOLIS ARCHITECTURAL MAP',
    description:
      'Inspect every wing across Ground Level 0, First Floor Level 1, and Second Floor Level 2—with direct suite coordinates from G-102 to Multiplex Suite 201.',
    crumb: 'Mall Map',
    poster: '/posters/home-scene-2.jpg',
  },
  'floor-directory': {
    eyebrow: 'COMPLETE 27-BRAND FLOOR INDEX',
    title: 'FLOOR-BY-FLOOR DIRECTORY',
    description:
      'Browse all 27 verified houses organized cleanly by floor level, suite number, category, and opening hours.',
    crumb: 'Floor Directory',
    poster: '/posters/home-scene-3.jpg',
  },
  parking: {
    eyebrow: 'ARRIVAL & MOBILITY · EAST & WEST PORTICOES',
    title: 'VIP VALET & EV SUPERCHARGER HUB',
    description:
      'Dedicated East & West VIP Chauffeur drop-off lanes, sheltered underground bays, priority universal access parking, and 150kW high-speed EV bays.',
    crumb: 'Parking',
    poster: '/posters/visit-us-3d.jpg',
  },
  services: {
    eyebrow: 'HOSPITALITY & CONCIERGE',
    title: 'PRIVATE SALONS & GUEST SERVICES',
    description:
      'Hands-free parcel porter assistance, private styling suites, wheelchair hospitality, stroller lending, and sovereign gift wrapping at Level 0.',
    crumb: 'Mall Services',
    poster: '/posters/visit-us-scene-2.jpg',
  },
  contact: {
    eyebrow: 'DIRECT COMMUNICATIONS DESK',
    title: 'CONTACT CONCIERGE & PRESS',
    description:
      'Reach our Guest Relations desk by telephone, email, or submit an advance concierge request for private boutique appointments and valet arrivals.',
    crumb: 'Contact Us',
    poster: '/posters/home-scene-3.jpg',
  },
};

export function VisitUsPage({
  subCategory = 'overview',
  onExploreBrand,
}: VisitUsPageProps) {
  const meta = VISIT_META[subCategory];
  const [selectedFloor, setSelectedFloor] = useState<string>(
    'Ground Floor · Level 0'
  );
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const visitMedia = PAGE_3D_MEDIA['visit-us'];
  const discoverMedia = PAGE_3D_MEDIA.discover;
  const brandsMedia = PAGE_3D_MEDIA.brands;
  const shoppingMedia = PAGE_3D_MEDIA.shopping;
  const homeMedia = PAGE_3D_MEDIA.home;

  const tabs: SubRouteTab[] = [
    { label: 'Overview', to: '/visit-us', active: subCategory === 'overview' },
    { label: 'Mall Map', to: '/visit-us/map', active: subCategory === 'map' },
    {
      label: 'Floor Directory',
      to: '/visit-us/floor-directory',
      active: subCategory === 'floor-directory',
    },
    { label: 'Parking', to: '/visit-us/parking', active: subCategory === 'parking' },
    {
      label: 'Mall Services',
      to: '/visit-us/services',
      active: subCategory === 'services',
    },
    {
      label: 'Contact Us',
      to: '/visit-us/contact',
      active: subCategory === 'contact',
    },
  ];

  const floors = [
    'Ground Floor · Level 0',
    'First Floor · Level 1',
    'Second Floor · Level 2',
  ];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div>
      <PageHero
        id={`visit-us-hero-${subCategory}`}
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
        video={visitMedia.video3d}
        poster={meta.poster}
        scenes={visitMedia.scenes}
        videoLabel={visitMedia.label}
        breadcrumb={
          subCategory === 'overview'
            ? [{ label: 'Home', to: '/' }, { label: 'Visit Us' }]
            : [
                { label: 'Home', to: '/' },
                { label: 'Visit Us', to: '/visit-us' },
                { label: meta.crumb },
              ]
        }
        subRoutes={tabs}
        compact
      />

      {/* INTERACTIVE MALL MAP */}
      {(subCategory === 'overview' || subCategory === 'map') && (
        <section
          id="visit-us-map"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={discoverMedia.video3d}
            poster={discoverMedia.poster3d}
            scenes={discoverMedia.scenes}
            triggerSelector="#visit-us-map"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={discoverMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 mb-8 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
              <div>
                <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-2 font-medium">
                  <Compass className="w-4 h-4 text-[#8C6F47]" />
                  <span>INTERACTIVE ARCHITECTURAL PLAN</span>
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816]">
                  Select a Level to Inspect Wings &amp; Suites
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {floors.map((floor) => (
                  <button
                    key={floor}
                    type="button"
                    onClick={() => setSelectedFloor(floor)}
                    className={`px-4 py-2 text-xs font-medium border cursor-pointer transition-colors ${
                      selectedFloor === floor
                        ? 'bg-[#1A1816] text-[#FAF8F4] border-[#1A1816]'
                        : 'bg-white text-[#2F2A24] border-[#D8CFC0] hover:border-[#9A7B4F]'
                    }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF8F4]/95 border border-[#D8CFC0] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#ECE4D7] pb-4 mb-6">
                <p className="font-serif text-2xl font-medium">{selectedFloor}</p>
                <span className="text-xs tracking-[0.12em] uppercase text-[#7A6852] tabular-nums">
                  {BRANDS.filter((b) => b.floor === selectedFloor).length} Active Suites
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BRANDS.filter((b) => b.floor === selectedFloor).map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => onExploreBrand(brand)}
                    className="text-left p-4 bg-white border border-[#E5DDD0] hover:border-[#9A7B4F] transition-colors cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.1em] uppercase text-[#7A6852] truncate">
                        {brand.location ?? 'Level Suite'}
                      </p>
                      <p className="font-serif text-lg font-medium text-[#1A1816] truncate">
                        {brand.name}
                      </p>
                      <p className="text-xs text-[#5C5349] truncate">
                        {brand.category}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#9A7B4F] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMPLETE FLOOR DIRECTORY */}
      {subCategory === 'floor-directory' && (
        <section
          id="visit-us-directory"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={brandsMedia.video3d}
            poster={brandsMedia.poster3d}
            scenes={brandsMedia.scenes}
            triggerSelector="#visit-us-directory"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={brandsMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
            {floors.map((floor) => {
              const list = BRANDS.filter((b) => b.floor === floor);
              return (
                <div key={floor} className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#ECE4D7] pb-4 mb-5">
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium">
                      {floor}
                    </h2>
                    <span className="text-xs tracking-[0.12em] uppercase text-[#7A6852] tabular-nums">
                      {list.length} Flagships
                    </span>
                  </div>
                  <div className="divide-y divide-[#EFEAE1]">
                    {list.map((brand) => (
                      <div
                        key={brand.id}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-serif text-xl font-medium text-[#1A1816]">
                            {brand.name}
                          </p>
                          <p className="text-xs text-[#5C5349]">
                            {brand.category} · {brand.location ?? floor}
                          </p>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="text-xs text-[#7A6852] tabular-nums">
                            {brand.timing ?? '10:00 AM – 10:00 PM'}
                          </span>
                          <button
                            type="button"
                            onClick={() => onExploreBrand(brand)}
                            className="text-xs tracking-[0.12em] uppercase font-medium text-[#9A7B4F] hover:text-[#1A1816] cursor-pointer"
                          >
                            Dossier →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PARKING & MOBILITY */}
      {(subCategory === 'overview' || subCategory === 'parking') && (
        <section
          id="visit-us-parking"
          className="relative overflow-hidden bg-[#EFEAE1] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={visitMedia.video3d}
            poster={visitMedia.poster3d}
            scenes={visitMedia.scenes}
            triggerSelector="#visit-us-parking"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={visitMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 shadow-sm">
              <Car className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <h3 className="font-serif text-2xl font-medium mb-2">
                VIP Chauffeured Valet
              </h3>
              <p className="text-sm text-[#4A433B] leading-relaxed">
                Available at both East &amp; West Arrival Porticoes directly connecting into Ground Level 0 and IMAX® lifts.
              </p>
            </div>
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 shadow-sm">
              <Zap className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <h3 className="font-serif text-2xl font-medium mb-2">
                EV Superchargers &amp; Helipad
              </h3>
              <p className="text-sm text-[#4A433B] leading-relaxed">
                High-speed DC charging bays on Basement P1 alongside private helipad transfer coordination by appointment.
              </p>
            </div>
            <div className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 shadow-sm">
              <Shield className="w-5 h-5 text-[#9A7B4F] mb-3" />
              <h3 className="font-serif text-2xl font-medium mb-2">
                Priority Accessibility Bays
              </h3>
              <p className="text-sm text-[#4A433B] leading-relaxed">
                Step-free elevator lobbies beside every accessible bay with complimentary wheelchair escort on arrival.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* GUEST SERVICES */}
      {(subCategory === 'overview' || subCategory === 'services') && (
        <section
          id="visit-us-services"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={shoppingMedia.video3d}
            poster={shoppingMedia.poster3d}
            scenes={shoppingMedia.scenes}
            triggerSelector="#visit-us-services"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={shoppingMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="p-6 mb-8 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816]">
                Complimentary Guest Services
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FOOTER_DATA.guestServices.map((service) => (
                <div
                  key={service}
                  className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-6 flex items-start gap-3 shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-[#9A7B4F] shrink-0 mt-1" />
                  <p className="text-sm text-[#2F2A24] leading-relaxed">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT & CONCIERGE DESK */}
      {(subCategory === 'overview' || subCategory === 'contact') && (
        <section
          id="visit-us-contact"
          className="relative overflow-hidden bg-[#EFEAE1] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={homeMedia.video3d}
            poster={homeMedia.poster3d}
            scenes={homeMedia.scenes}
            triggerSelector="#visit-us-contact"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={homeMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6 p-7 bg-[#FAF8F4]/95 border border-[#D8CFC0] text-[#1A1816] shadow-sm">
              <p className="text-xs tracking-[0.18em] uppercase text-[#8C6F47] font-medium">
                DIRECT CHANNELS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium">
                Reach CITY MALL Concierge
              </h2>
              <div className="space-y-4 text-sm text-[#474139]">
                <p className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9A7B4F]" />
                  <span>{FOOTER_DATA.hours}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9A7B4F]" />
                  <span>{FOOTER_DATA.communications.concierge}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9A7B4F]" />
                  <span>{FOOTER_DATA.communications.general}</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF8F4]/95 border border-[#D8CFC0] p-7 sm:p-9 shadow-sm">
              {contactSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#9A7B4F] mx-auto" />
                  <h3 className="font-serif text-2xl font-medium">
                    Concierge Request Logged
                  </h3>
                  <p className="text-sm text-[#5C5349] max-w-md mx-auto">
                    Our Ground Floor Atrium desk has received your inquiry and will reply via email within 30 minutes during mall operating hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    className="mt-2 px-5 py-2 text-xs tracking-[0.12em] uppercase border border-[#1A1816] cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3 text-sm bg-white border border-[#D8CFC0] focus:outline-none focus:border-[#9A7B4F]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 text-sm bg-white border border-[#D8CFC0] focus:outline-none focus:border-[#9A7B4F]"
                    />
                  </div>
                  <select className="w-full px-4 py-3 text-sm bg-white border border-[#D8CFC0] focus:outline-none focus:border-[#9A7B4F]">
                    <option>Personal Shopping &amp; Stylist Inquiry</option>
                    <option>VIP Valet &amp; Accessibility Arrival</option>
                    <option>Private Banquet / Group Dining</option>
                    <option>General Mall &amp; Lost Property</option>
                  </select>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our concierge team curate your visit?"
                    className="w-full px-4 py-3 text-sm bg-white border border-[#D8CFC0] focus:outline-none focus:border-[#9A7B4F]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs tracking-[0.14em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors cursor-pointer"
                  >
                    Submit Concierge Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
