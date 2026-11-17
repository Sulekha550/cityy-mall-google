import { Link } from 'react-router-dom';
import { FOOTER_DATA, PAGE_3D_MEDIA } from '../data/exhibitionData';
import { ScrollVideoBackground } from './ScrollVideoBackground';

const DISTRICT_ROUTE_MAP: Record<string, string> = {
  'The Grand Atrium & Oculus.': '/discover',
  'Haute Couture & Brand Directory.': '/brands',
  'Michelin Gastronomy & Dining.': '/dining',
  'Cinemas & VR Entertainment.': '/entertainment',
  'Cultural Galas & Runways.': '/whats-on/events',
  'Concierge, Valet & Spa Privée.': '/visit-us/services',
  'Sovereign 24K Gift Card.': '/whats-on/gift-cards',
};

const SERVICE_ROUTE_MAP: Record<string, string> = {
  'Privilege Gift Card & Experiences.': '/whats-on/gift-cards',
  'VIP Chauffeured Valet Portico (East & West).': '/visit-us/parking',
  'Private Styling & Grooming Salons.': '/shopping/beauty',
  'Hands-Free Concierge Shopping Butler.': '/visit-us/services',
  'Universal Accessibility & Priority Bays.': '/visit-us/services',
  'Helipad & High-Speed EV Superchargers.': '/visit-us/parking',
};

export function DestinationFooter() {
  const media = PAGE_3D_MEDIA['visit-us'];

  return (
    <footer
      id="destination-footer"
      className="relative z-10 overflow-hidden bg-[#EFEAE1] text-[#1A1816] border-t border-[#DED5C7]"
    >
      <ScrollVideoBackground
        src={media.video3d}
        poster={media.poster3d}
        scenes={media.scenes}
        triggerSelector="#destination-footer"
        playbackSpeed={0.25}
        videoOpacityClassName="opacity-48"
        blendModeClassName="mix-blend-normal"
        overlayClassName="bg-gradient-to-b from-[#FAF8F4]/80 via-[#F7F4EE]/68 to-[#EFEAE1]/86"
        label={media.label}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top Brand Monograph Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#D8CFC0]">
          <div className="lg:col-span-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8C6F47] mb-3 font-medium">
              {FOOTER_DATA.eyebrow}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#1A1816] mb-3">
              {FOOTER_DATA.title}
            </h2>
            <p className="text-xs tracking-[0.22em] uppercase text-[#6E6254] mb-5">
              {FOOTER_DATA.tagline}
            </p>
            <p className="text-[15px] leading-relaxed text-[#474139] max-w-xl">
              {FOOTER_DATA.description}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col lg:items-end justify-between gap-6">
            <div className="lg:text-right">
              <p className="text-xs tracking-[0.16em] uppercase text-[#8C6F47] mb-2 font-medium">
                Exhibition Hours
              </p>
              <p className="font-serif text-2xl text-[#1A1816] tabular-nums">
                {FOOTER_DATA.hours}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/visit-us/contact"
                className="px-5 py-2.5 text-xs tracking-[0.14em] uppercase bg-[#1A1816] text-[#FAF8F4] hover:bg-[#9A7B4F] transition-colors whitespace-nowrap"
              >
                Concierge Desk
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-5 py-2.5 text-xs tracking-[0.14em] uppercase border border-[#1A1816]/35 bg-[#FAF8F4]/85 text-[#1A1816] hover:border-[#9A7B4F] hover:text-[#9A7B4F] transition-colors cursor-pointer whitespace-nowrap"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Directory & Concierge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 border-b border-[#D8CFC0]">
          <div>
            <h3 className="font-sans text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-5 font-medium">
              SPATIAL DISTRICTS
            </h3>
            <ul className="space-y-2.5 text-sm text-[#474139]">
              {FOOTER_DATA.spatialDistricts.map((item) => {
                const to = DISTRICT_ROUTE_MAP[item] ?? '/brands';
                return (
                  <li key={item}>
                    <Link
                      to={to}
                      className="text-left hover:text-[#9A7B4F] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-5 font-medium">
              GUEST SERVICES
            </h3>
            <ul className="space-y-2.5 text-sm text-[#474139]">
              {FOOTER_DATA.guestServices.map((service) => {
                const to = SERVICE_ROUTE_MAP[service] ?? '/visit-us/services';
                return (
                  <li key={service}>
                    <Link
                      to={to}
                      className="hover:text-[#9A7B4F] transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.18em] uppercase text-[#8C6F47] mb-5 font-medium">
              COMMUNICATIONS
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#6E6254] uppercase tracking-wider">
                  Concierge
                </dt>
                <dd className="text-[#1A1816] tabular-nums mt-0.5 font-medium">
                  <a
                    href="tel:+18005552489"
                    className="hover:text-[#9A7B4F] transition-colors"
                  >
                    {FOOTER_DATA.communications.concierge}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#6E6254] uppercase tracking-wider">
                  General
                </dt>
                <dd className="text-[#1A1816] mt-0.5 font-medium">
                  <a
                    href={`mailto:${FOOTER_DATA.communications.general}`}
                    className="hover:text-[#9A7B4F] transition-colors"
                  >
                    {FOOTER_DATA.communications.general}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#6E6254] uppercase tracking-wider">
                  Press
                </dt>
                <dd className="text-[#1A1816] mt-0.5 font-medium">
                  <a
                    href={`mailto:${FOOTER_DATA.communications.press}`}
                    className="hover:text-[#9A7B4F] transition-colors"
                  >
                    {FOOTER_DATA.communications.press}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E6254]">
          <p>{FOOTER_DATA.copyright}</p>
          <p className="tracking-[0.12em] uppercase">
            Metropolis Level 0–2 · 27 Verified Flagships
          </p>
        </div>
      </div>
    </footer>
  );
}
