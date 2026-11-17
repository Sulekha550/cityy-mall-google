import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Gift, Sparkles, Tag } from 'lucide-react';
import { PAGE_3D_MEDIA } from '../data/exhibitionData';
import { PageHero, SubRouteTab } from '../components/PageHero';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

export type WhatsOnSubCategory = 'all' | 'events' | 'offers' | 'gift-cards';

interface WhatsOnPageProps {
  subCategory?: WhatsOnSubCategory;
}

const WHATS_ON_META: Record<
  WhatsOnSubCategory,
  {
    eyebrow: string;
    title: string;
    description: string;
    crumb: string;
    poster: string;
  }
> = {
  all: {
    eyebrow: "WHAT'S ON · METROPOLIS SEASONAL PROGRAMME",
    title: 'GALAS, OFFERS & 24K GIFT CARDS',
    description:
      'Atrium fashion presentations, private horology viewings, seasonal dining privileges, and the Sovereign 24K Gift Card accepted across all 27 CITY MALL flagships.',
    crumb: "What's On",
    poster: '/posters/whats-on-3d.jpg',
  },
  events: {
    eyebrow: 'CULTURAL CALENDAR · THE GRAND ATRIUM',
    title: 'RUNWAYS, GALAS & EXHIBITIONS',
    description:
      'Bespoke seasonal programming unfolding beneath The Grand Atrium & Oculus across autumn/winter tailoring showcases, chamber evenings, and festive markets.',
    crumb: 'Events',
    poster: '/posters/whats-on-3d.jpg',
  },
  offers: {
    eyebrow: 'MEMBER & VISITOR PRIVILEGES',
    title: 'CURATED OFFERS & PROMOTIONS',
    description:
      'Complimentary valet upgrades, private salon consultations, and dining + IMAX® evening privileges curated across our 27 houses.',
    crumb: 'Offers & Promotions',
    poster: '/posters/brands-scene-2.jpg',
  },
  'gift-cards': {
    eyebrow: 'THE UNIVERSAL METROPOLIS PASS',
    title: 'SOVEREIGN 24K GIFT CARD',
    description:
      'Presented in champagne-embossed ivory keepsake cases or delivered digitally—valid at every couture atelier, fine jeweller, salon, supermarket, IMAX®, and restaurant.',
    crumb: 'Gift Cards',
    poster: '/posters/brands-scene-3.jpg',
  },
};

const UPCOMING_EVENTS = [
  {
    date: 'Every Friday · 7:30 PM',
    location: 'The Grand Atrium · Level 0',
    title: 'Oculus Evening String Quartet & Lighting',
    summary:
      'Acoustic chamber recitals paired with espresso & patisserie tastings from Level 2 culinary partners.',
  },
  {
    date: 'Saturdays · 4:00 PM – 8:00 PM',
    location: 'Haute Colonnade · Level 1',
    title: 'Bespoke Sartorial Fitting Salon',
    summary:
      'Private Super 150s suiting consultations led by master tailors at Louis Philippe.',
  },
  {
    date: 'Sundays · 11:00 AM – 6:00 PM',
    location: 'Bridal Sanctuary · Level 1',
    title: 'Heirloom Gold & Bridal Henna Showcase',
    summary:
      'Combined bridal trousseau previews across Tanishq, W for Woman, Looks Salon, and Arjun Mehendi Art.',
  },
];

const SEASONAL_OFFERS = [
  {
    tag: 'Horology & Fine Jewellery',
    title: 'Private Vault Viewing & Appraisal',
    detail:
      'Book an appointment at Tanishq or Titan World to receive complimentary ultrasonic timepiece care and priority concierge valet.',
  },
  {
    tag: 'Cinema & Gastronomy',
    title: 'IMAX® Insignia & Level 2 Dinner Pairing',
    detail:
      'Present same-day INOX Cinemas IMAX® tickets for priority seating at Barbeque Nation, Pind Balluchi, or Cinnamon Restaurant.',
  },
  {
    tag: 'Shopping Butler',
    title: 'Complimentary Hands-Free Escort',
    detail:
      'Same-day cumulative purchases from three or more flagships include complimentary East & West Portico parcel loading.',
  },
];

export function WhatsOnPage({ subCategory = 'all' }: WhatsOnPageProps) {
  const meta = WHATS_ON_META[subCategory];
  const [selectedTier, setSelectedTier] = useState('INR 10,000');
  const [giftReserved, setGiftReserved] = useState(false);

  const whatsOnMedia = PAGE_3D_MEDIA['whats-on'];
  const brandsMedia = PAGE_3D_MEDIA.brands;
  const discoverMedia = PAGE_3D_MEDIA.discover;

  const tabs: SubRouteTab[] = [
    { label: 'Overview', to: '/whats-on', active: subCategory === 'all' },
    { label: 'Events', to: '/whats-on/events', active: subCategory === 'events' },
    {
      label: 'Offers & Promotions',
      to: '/whats-on/offers',
      active: subCategory === 'offers',
    },
    {
      label: 'Gift Cards',
      to: '/whats-on/gift-cards',
      active: subCategory === 'gift-cards',
    },
  ];

  return (
    <div>
      <PageHero
        id={`whats-on-hero-${subCategory}`}
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
        video={whatsOnMedia.video3d}
        poster={meta.poster}
        scenes={whatsOnMedia.scenes}
        videoLabel={whatsOnMedia.label}
        breadcrumb={
          subCategory === 'all'
            ? [{ label: 'Home', to: '/' }, { label: "What's On" }]
            : [
                { label: 'Home', to: '/' },
                { label: "What's On", to: '/whats-on' },
                { label: meta.crumb },
              ]
        }
        subRoutes={tabs}
        compact
      />

      {/* EVENTS SECTION */}
      {(subCategory === 'all' || subCategory === 'events') && (
        <section
          id="whats-on-events"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={whatsOnMedia.video3d}
            poster={whatsOnMedia.poster3d}
            scenes={whatsOnMedia.scenes}
            triggerSelector="#whats-on-events"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={whatsOnMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="p-6 mb-8 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
              <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#8C6F47]" />
                <span>CURATED ATRIUM PROGRAMME</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816]">
                Upcoming Galas &amp; Runway Sessions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {UPCOMING_EVENTS.map((ev) => (
                <article
                  key={ev.title}
                  className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-7 flex flex-col justify-between gap-4 shadow-sm"
                >
                  <div>
                    <p className="text-xs tracking-[0.12em] uppercase text-[#9A7B4F] mb-2 tabular-nums">
                      {ev.date}
                    </p>
                    <h3 className="font-serif text-2xl font-medium mb-2">
                      {ev.title}
                    </h3>
                    <p className="text-sm text-[#4A433B] leading-relaxed">
                      {ev.summary}
                    </p>
                  </div>
                  <p className="pt-4 border-t border-[#ECE4D7] text-xs text-[#6E6254]">
                    {ev.location}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OFFERS SECTION */}
      {(subCategory === 'all' || subCategory === 'offers') && (
        <section
          id="whats-on-offers"
          className="relative overflow-hidden bg-[#EFEAE1] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={brandsMedia.video3d}
            poster={brandsMedia.poster3d}
            scenes={brandsMedia.scenes}
            triggerSelector="#whats-on-offers"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={brandsMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="p-6 mb-8 bg-[#FAF8F4]/88 backdrop-blur-md border border-[#DFD7C8] shadow-sm">
              <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-2 font-medium">
                <Tag className="w-3.5 h-3.5 text-[#8C6F47]" />
                <span>SEASONAL MAISON PRIVILEGES</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816]">
                Exclusive Visitor &amp; Dining Privileges
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {SEASONAL_OFFERS.map((offer) => (
                <article
                  key={offer.title}
                  className="bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DDD4C6] p-7 flex flex-col justify-between gap-5 shadow-sm"
                >
                  <div>
                    <p className="text-xs tracking-[0.14em] uppercase text-[#8C6F47] mb-2 font-medium">
                      {offer.tag}
                    </p>
                    <h3 className="font-serif text-2xl font-medium mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A433B]">
                      {offer.detail}
                    </p>
                  </div>
                  <Link
                    to="/visit-us/contact"
                    className="self-start text-xs tracking-[0.12em] uppercase text-[#9A7B4F] hover:text-[#1A1816] transition-colors font-medium"
                  >
                    Reserve via Concierge →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GIFT CARDS SECTION */}
      {(subCategory === 'all' || subCategory === 'gift-cards') && (
        <section
          id="whats-on-giftcards"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16"
        >
          <ScrollVideoBackground
            src={discoverMedia.video3d}
            poster={discoverMedia.poster3d}
            scenes={discoverMedia.scenes}
            triggerSelector="#whats-on-giftcards"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={discoverMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="bg-[#FAF8F4]/96 text-[#1A1816] border border-[#D8CFC0] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-sm">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-3 font-medium">
                  <Gift className="w-4 h-4" />
                  <span>UNIVERSAL METROPOLIS CURRENCY</span>
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-4">
                  Sovereign 24K Gift Card
                </h2>
                <p className="text-[15px] leading-relaxed text-[#474139] mb-6">
                  Redeemable across every single store and restaurant at CITY MALL—from bespoke suiting at Louis Philippe and fine gold at Tanishq to IMAX® suites and celebratory banquets.
                </p>
                <div className="flex flex-wrap gap-4 text-xs tracking-[0.1em] uppercase text-[#7A6852] font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>Zero Expiration Fee</span>
                  </span>
                  <span>·</span>
                  <span>27 Flagships Participating</span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white text-[#1A1816] p-6 sm:p-8 border border-[#D8CFC0]">
                <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-3">
                  Select Presentation Value
                </p>
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {['INR 5,000', 'INR 10,000', 'INR 25,000', 'INR 50,000'].map(
                    (tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => {
                          setSelectedTier(tier);
                          setGiftReserved(false);
                        }}
                        className={`py-2.5 text-xs font-medium border cursor-pointer transition-colors tabular-nums ${
                          selectedTier === tier
                            ? 'bg-[#1A1816] text-[#F7F4EE] border-[#1A1816]'
                            : 'bg-[#FAF8F4] text-[#1A1816] border-[#DDD4C6] hover:border-[#9A7B4F]'
                        }`}
                      >
                        {tier}
                      </button>
                    )
                  )}
                </div>

                {giftReserved ? (
                  <div className="p-4 bg-[#EAE3D7] border border-[#9A7B4F] flex items-start gap-2.5 text-xs text-[#1A1816]">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7B4F] shrink-0 mt-0.5" />
                    <span>
                      Sovereign 24K Gift Card ({selectedTier}) queued for pickup at Ground Floor Concierge Desk.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setGiftReserved(true)}
                    className="w-full py-3 text-xs tracking-[0.14em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors cursor-pointer"
                  >
                    Reserve {selectedTier} Keepsake Card
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
