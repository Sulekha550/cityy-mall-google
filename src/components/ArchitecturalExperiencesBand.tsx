import { ArrowUpRight } from 'lucide-react';
import {
  DISCOVER_ARCHITECTURE_POSTER,
  DISCOVER_ARCHITECTURE_VIDEO,
  EVENTS_EXPERIENCES_POSTER,
  EVENTS_EXPERIENCES_VIDEO,
  FilterId,
} from '../data/exhibitionData';
import { ScrollVideoBackground } from './ScrollVideoBackground';

interface ArchitecturalExperiencesBandProps {
  onJumpToZone: (zone: FilterId) => void;
}

const LEVELS = [
  {
    level: 'Level 0 · Ground Floor',
    title: 'The Grand Atrium & Sports Promenade',
    summary:
      "Home to Spencer's Gourmet Hypermarket, Tanishq Fine Jewellery, Adidas, Puma, Levi's Store, Allen Solly, Woodland Store, Skechers, and Metro Shoes.",
    zoneId: 'supermarket' as FilterId,
  },
  {
    level: 'Level 1 · First Floor',
    title: 'Haute Colonnade & Horology Gallery',
    summary:
      'Featuring Louis Philippe Haute Couture, Titan World Horology, W for Woman, Flying Machine, Mufti, Red Chief, Looks Salon, and Arjun Mehendi Art.',
    zoneId: 'fashion' as FilterId,
  },
  {
    level: 'Level 2 · Second Floor',
    title: 'IMAX® Laser Multiplex & Culinary Terrace',
    summary:
      'Uniting INOX Cinemas VIP IMAX® suites with all 9 destination restaurants from royal Mughlai banquets to artisanal Italian pizzerias.',
    zoneId: 'dining' as FilterId,
  },
];

export function ArchitecturalExperiencesBand({
  onJumpToZone,
}: ArchitecturalExperiencesBandProps) {
  return (
    <>
      {/* DISCOVER — GRAND MALL ARCHITECTURE & LEVEL INDEX */}
      <section
        id="discover-architecture"
        className="relative overflow-hidden py-20 sm:py-28 bg-[#141311] text-[#F7F4EE] border-b border-[#2C2721]"
      >
        <ScrollVideoBackground
          src={DISCOVER_ARCHITECTURE_VIDEO}
          poster={DISCOVER_ARCHITECTURE_POSTER}
          label="Grand mall architecture, escalators, and panoramic retail avenues"
          videoOpacityClassName="opacity-100"
          overlayClassName="bg-gradient-to-b from-[#141311]/38 via-[#141311]/16 to-[#141311]/44"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl p-6 sm:p-7 mb-10 bg-[#141311]/60 backdrop-blur-sm border border-white/15">
            <p className="text-xs tracking-[0.2em] uppercase text-[#DFC496] mb-3">
              DISCOVER · METROPOLIS LEVEL 0–2
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF8F4]">
              Three Luxury Tiers of Architectural Retail
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#EAE3D7]">
              Soaring glass canopies, travertine walkways, and panoramic atrium
              perspectives connecting all 27 verified flagship houses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {LEVELS.map((tier) => (
              <div
                key={tier.level}
                className="bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DFD7C8] p-7 flex flex-col justify-between gap-6 shadow-xl"
              >
                <div>
                  <p className="text-xs tracking-[0.14em] uppercase text-[#7A6852] mb-2 tabular-nums">
                    {tier.level}
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-[#1A1816] mb-3">
                    {tier.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4A433B]">
                    {tier.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E6DED0]">
                  <button
                    type="button"
                    onClick={() => onJumpToZone(tier.zoneId)}
                    className="group inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-medium text-[#1A1816] hover:text-[#9A7B4F] transition-colors cursor-pointer"
                  >
                    <span>Explore Tier</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS & EXPERIENCES — CULTURAL GALAS & VIP CONCIERGE */}
      <section
        id="events-experiences"
        className="relative overflow-hidden py-20 sm:py-28 bg-[#141311] text-[#F7F4EE]"
      >
        <ScrollVideoBackground
          src={EVENTS_EXPERIENCES_VIDEO}
          poster={EVENTS_EXPERIENCES_POSTER}
          label="Cultural galas, luxury exhibitions, and evening hospitality experiences"
          videoOpacityClassName="opacity-100"
          overlayClassName="bg-gradient-to-b from-[#141311]/38 via-[#141311]/16 to-[#141311]/44"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-[#191714]/92 border border-[#38322A] p-8 sm:p-10 flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#C6A87A] mb-3">
                  EVENTS &amp; EXPERIENCES
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EE] mb-4">
                  Cultural Galas, Private Runways &amp; Sovereign Concierge
                </h2>
                <p className="text-[15px] leading-relaxed text-[#D8D0C3]">
                  From evening couture showcases in The Grand Atrium &amp;
                  Oculus to private styling salons, hands-free shopping butler
                  escorts, and East &amp; West VIP chauffeured valet arrival.
                </p>
              </div>
              <div className="pt-5 border-t border-[#2E2A25] flex flex-wrap items-center gap-6 text-xs tracking-[0.12em] uppercase text-[#C6A87A]">
                <span>VIP Chauffeured Valet</span>
                <span aria-hidden="true">·</span>
                <span>Private Styling Salons</span>
                <span aria-hidden="true">·</span>
                <span>Sovereign 24K Gift Card</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF8F4]/95 text-[#1A1816] border border-[#DFD7C8] p-8 sm:p-10 flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <p className="text-xs tracking-[0.16em] uppercase text-[#7A6852] mb-2">
                  Guest Concierge Desk
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816] mb-3">
                  Curate Your Metropolis Visit
                </h3>
                <p className="text-sm leading-relaxed text-[#4A433B]">
                  Reserve bespoke tailoring appointments, priority IMAX®
                  Insignia seating, or celebratory banquet tables directly
                  through any flagship dossier above.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E6DED0] flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onJumpToZone('cinema')}
                  className="px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors cursor-pointer"
                >
                  IMAX® VIP Lounge
                </button>
                <button
                  type="button"
                  onClick={() => onJumpToZone('jewellery')}
                  className="px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium border border-[#1A1816]/30 text-[#1A1816] hover:border-[#9A7B4F] hover:text-[#9A7B4F] transition-colors cursor-pointer"
                >
                  Fine Horology Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
