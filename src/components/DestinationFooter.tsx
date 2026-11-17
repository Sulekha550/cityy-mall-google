import { FOOTER_DATA, FilterId } from '../data/exhibitionData';

interface DestinationFooterProps {
  onJumpToZone: (zone: FilterId) => void;
}

const DISTRICT_ZONE_MAP: Record<string, FilterId> = {
  'The Grand Atrium & Oculus.': 'all',
  'Haute Couture & Brand Directory.': 'fashion',
  'Michelin Gastronomy & Dining.': 'dining',
  'Cinemas & VR Entertainment.': 'cinema',
  'Cultural Galas & Runways.': 'fashion',
  'Concierge, Valet & Spa Privée.': 'beauty',
  'Sovereign 24K Gift Card.': 'jewellery',
};

export function DestinationFooter({ onJumpToZone }: DestinationFooterProps) {
  return (
    <footer
      id="destination-footer"
      className="relative z-10 bg-[#141311] text-[#F7F4EE] border-t border-[#2E2A25] scroll-mt-14"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top Brand Monograph Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#2C2823]">
          <div className="lg:col-span-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C6A87A] mb-3">
              {FOOTER_DATA.eyebrow}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#F7F4EE] mb-3">
              {FOOTER_DATA.title}
            </h2>
            <p className="text-xs tracking-[0.22em] uppercase text-[#BFB7AA] mb-5">
              {FOOTER_DATA.tagline}
            </p>
            <p className="text-[15px] leading-relaxed text-[#CFC7BA] max-w-xl">
              {FOOTER_DATA.description}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col lg:items-end justify-between gap-6">
            <div className="lg:text-right">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A87A] mb-2">
                Exhibition Hours
              </p>
              <p className="font-serif text-2xl text-[#F7F4EE] tabular-nums">
                {FOOTER_DATA.hours}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="self-start lg:self-end px-5 py-2.5 text-xs tracking-[0.14em] uppercase border border-[#4A4237] text-[#F7F4EE] hover:border-[#C6A87A] hover:text-[#C6A87A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Return to Atrium Top
            </button>
          </div>
        </div>

        {/* 3-Column Directory & Concierge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 border-b border-[#2C2823]">
          <div>
            <h3 className="font-sans text-xs tracking-[0.18em] uppercase text-[#C6A87A] mb-5">
              SPATIAL DISTRICTS
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CFC7BA]">
              {FOOTER_DATA.spatialDistricts.map((item) => {
                const targetZone = DISTRICT_ZONE_MAP[item] ?? 'all';
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => onJumpToZone(targetZone)}
                      className="text-left hover:text-[#F7F4EE] transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.18em] uppercase text-[#C6A87A] mb-5">
              GUEST SERVICES
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CFC7BA]">
              {FOOTER_DATA.guestServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.18em] uppercase text-[#C6A87A] mb-5">
              COMMUNICATIONS
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#8E8579] uppercase tracking-wider">
                  Concierge
                </dt>
                <dd className="text-[#F7F4EE] tabular-nums mt-0.5">
                  <a
                    href="tel:+18005552489"
                    className="hover:text-[#C6A87A] transition-colors"
                  >
                    {FOOTER_DATA.communications.concierge}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#8E8579] uppercase tracking-wider">
                  General
                </dt>
                <dd className="text-[#F7F4EE] mt-0.5">
                  <a
                    href={`mailto:${FOOTER_DATA.communications.general}`}
                    className="hover:text-[#C6A87A] transition-colors"
                  >
                    {FOOTER_DATA.communications.general}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#8E8579] uppercase tracking-wider">
                  Press
                </dt>
                <dd className="text-[#F7F4EE] mt-0.5">
                  <a
                    href={`mailto:${FOOTER_DATA.communications.press}`}
                    className="hover:text-[#C6A87A] transition-colors"
                  >
                    {FOOTER_DATA.communications.press}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8E8579]">
          <p>{FOOTER_DATA.copyright}</p>
          <p className="tracking-[0.12em] uppercase">
            Metropolis Level 0–2 · 27 Verified Flagships
          </p>
        </div>
      </div>
    </footer>
  );
}
