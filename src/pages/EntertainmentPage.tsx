import { Link } from 'react-router-dom';
import { Film, Gamepad2, Sparkles, Trophy, Users } from 'lucide-react';
import {
  ArchitecturalScene,
  BRANDS,
  BrandFlagship,
  PAGE_3D_MEDIA,
  ZONES,
} from '../data/exhibitionData';
import { PageHero, SubRouteTab } from '../components/PageHero';
import { ZoneShowcaseSection } from '../components/ZoneShowcases';
import { ScrollVideoBackground } from '../components/ScrollVideoBackground';

export type EntertainmentSubCategory =
  | 'all'
  | 'cinema'
  | 'gaming'
  | 'kids-play-zone';

interface EntertainmentPageProps {
  subCategory?: EntertainmentSubCategory;
  onExploreBrand: (brand: BrandFlagship) => void;
}

const ENTERTAINMENT_META: Record<
  EntertainmentSubCategory,
  {
    eyebrow: string;
    title: string;
    description: string;
    video: string;
    poster: string;
    scenes: ArchitecturalScene[];
    videoLabel: string;
    crumb: string;
  }
> = {
  all: {
    eyebrow: 'ENTERTAINMENT DECK · LEVEL 2',
    title: 'IMAX® CINEMA, VR ARCADES & JUNIOR PLAY',
    description:
      'Home to INOX Cinemas 4K Laser IMAX® multiplex suites alongside high-frame-rate VR simulators, e-sports arenas, and supervised family studios.',
    video: PAGE_3D_MEDIA.entertainment.video3d,
    poster: PAGE_3D_MEDIA.entertainment.poster3d,
    scenes: PAGE_3D_MEDIA.entertainment.scenes,
    videoLabel: PAGE_3D_MEDIA.entertainment.label,
    crumb: 'Entertainment',
  },
  cinema: {
    eyebrow: 'ZONE 06 · INOX CINEMAS MULTIPLEX',
    title: 'IMAX® 4K LASER & INSIGNIA VIP',
    description:
      'Dual 4K commercial laser projection with curved wall-to-wall silver screens, 128-channel Dolby Atmos® acoustics, and motorized Italian leather recliners.',
    video: PAGE_3D_MEDIA.entertainment.video3d,
    poster: '/posters/entertainment-scene-2.jpg',
    scenes: [
      { src: '/posters/entertainment-scene-2.jpg', title: 'INOX Cinema Multiplex Sanctuary' },
      { src: '/posters/entertainment-3d.jpg', title: 'Sunlit IMAX Dome Concourse' },
      { src: '/posters/discover-scene-4.jpg', title: 'Insignia Champagne Lounge' },
      { src: '/posters/discover-scene-3.jpg', title: 'Level 2 Sky-Bridge Overlook' },
    ],
    videoLabel: '0.25x 3D tour of IMAX cinema suites and multiplex dome',
    crumb: 'Cinema',
  },
  gaming: {
    eyebrow: 'LEVEL 2 WEST WING · HOLOGRAPHIC ARENA',
    title: 'GAMING & VR ARCADE PAVILION',
    description:
      'Full-motion F1 telemetry cockpits, multiplayer holographic VR quests, synchronized rhythm stations, and championship e-sports lounges.',
    video: PAGE_3D_MEDIA.entertainment.video3d,
    poster: '/posters/entertainment-3d.jpg',
    scenes: [
      { src: '/posters/entertainment-3d.jpg', title: 'Glass Gaming & E-Sports Pavilion' },
      { src: '/posters/discover-scene-3.jpg', title: 'Futuristic Atrium Sky Bridges' },
      { src: '/posters/entertainment-scene-2.jpg', title: 'West Wing Multiplex Deck' },
      { src: '/posters/discover-scene-4.jpg', title: 'Players & Spectators Lounge' },
    ],
    videoLabel: '0.25x 3D tour of sunlit futuristic VR gaming and e-sports pavilion',
    crumb: 'Gaming & Arcade',
  },
  'kids-play-zone': {
    eyebrow: 'LEVEL 2 FAMILY DECK · SUPERVISED STUDIO',
    title: 'KIDS PLAY ZONE & CREATIVE LAB',
    description:
      'Architectural indoor soft-play trails, padded climbing towers, interactive robotics tables, and curated weekend puppetry & storytelling hours.',
    video: PAGE_3D_MEDIA.entertainment.video3d,
    poster: '/posters/discover-scene-2.jpg',
    scenes: [
      { src: '/posters/discover-scene-2.jpg', title: 'Sunlit Indoor Botanical Play Deck' },
      { src: '/posters/discover-scene-4.jpg', title: 'Parent Lounge Overlook' },
      { src: '/posters/entertainment-3d.jpg', title: 'Daylight Family Entertainment Wing' },
      { src: '/posters/dining-scene-3.jpg', title: 'Nearby Level 2 Cafe Terrace' },
    ],
    videoLabel: '0.25x 3D walkthrough of family entertainment wing and play decks',
    crumb: 'Kids Play Zone',
  },
};

export function EntertainmentPage({
  subCategory = 'all',
  onExploreBrand,
}: EntertainmentPageProps) {
  const meta = ENTERTAINMENT_META[subCategory];
  const cinemaZone = ZONES.find((z) => z.id === 'cinema')!;
  const inoxBrand = BRANDS.filter((b) => b.zoneId === 'cinema');
  const entertainmentMedia = PAGE_3D_MEDIA.entertainment;

  const tabs: SubRouteTab[] = [
    {
      label: 'All Entertainment',
      to: '/entertainment',
      active: subCategory === 'all',
    },
    {
      label: 'Cinema',
      to: '/entertainment/cinema',
      active: subCategory === 'cinema',
    },
    {
      label: 'Gaming & Arcade',
      to: '/entertainment/gaming',
      active: subCategory === 'gaming',
    },
    {
      label: 'Kids Play Zone',
      to: '/entertainment/kids-play-zone',
      active: subCategory === 'kids-play-zone',
    },
  ];

  return (
    <div>
      <PageHero
        id={`entertainment-hero-${subCategory}`}
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
        video={meta.video}
        poster={meta.poster}
        scenes={meta.scenes}
        videoLabel={meta.videoLabel}
        breadcrumb={
          subCategory === 'all'
            ? [{ label: 'Home', to: '/' }, { label: 'Entertainment' }]
            : [
                { label: 'Home', to: '/' },
                { label: 'Entertainment', to: '/entertainment' },
                { label: meta.crumb },
              ]
        }
        subRoutes={tabs}
        stats={[
          { value: '4K Laser', label: 'Dual IMAX® Projection' },
          { value: '128ch', label: 'Dolby Atmos® Sound' },
          { value: 'Midnight', label: 'Nightly Showtimes' },
        ]}
        compact
      />

      {/* INOX CINEMAS ZONE */}
      {(subCategory === 'all' || subCategory === 'cinema') && (
        <ZoneShowcaseSection
          zone={cinemaZone}
          brands={inoxBrand}
          onExplore={onExploreBrand}
          isFiltered={subCategory === 'cinema'}
        />
      )}

      {/* GAMING & ARCADE / KIDS PLAY HIGHLIGHTS */}
      {(subCategory === 'all' ||
        subCategory === 'gaming' ||
        subCategory === 'kids-play-zone') && (
        <section
          id="entertainment-leisure-wings"
          className="relative overflow-hidden bg-[#F7F4EE] text-[#1A1816] py-16 border-b border-[#DED5C7]"
        >
          <ScrollVideoBackground
            src={entertainmentMedia.video3d}
            poster={entertainmentMedia.poster3d}
            scenes={entertainmentMedia.scenes}
            triggerSelector="#entertainment-leisure-wings"
            playbackSpeed={0.25}
            videoOpacityClassName="opacity-55"
            blendModeClassName="mix-blend-normal"
            overlayClassName="bg-gradient-to-b from-[#FAF8F4]/72 via-[#F7F4EE]/36 to-[#EFEAE1]/76"
            label={entertainmentMedia.label}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-8 flex flex-col justify-between gap-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-[0.14em] uppercase text-[#7A6852]">
                    Level 2 · West Multiplex Concourse
                  </span>
                  <Gamepad2 className="w-5 h-5 text-[#9A7B4F]" />
                </div>
                <h2 className="font-serif text-3xl font-medium mb-3">
                  Holographic VR &amp; E-Sports Pavilion
                </h2>
                <p className="text-sm leading-relaxed text-[#4A433B] mb-5">
                  Step into free-roam VR chambers, 6-axis racing motion pods, and arcade classics designed for competitive social nights right beside INOX Cinemas.
                </p>
                <ul className="space-y-2 text-xs text-[#5C5349]">
                  <li className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>Friday Night Sim-Racing Time Trials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>Zero-Latency Wireless Co-Op Arenas</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/entertainment/gaming"
                className="self-start px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors"
              >
                Explore Gaming Pavilion
              </Link>
            </article>

            <article className="bg-[#FAF8F4]/95 border border-[#DDD4C6] p-8 flex flex-col justify-between gap-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-[0.14em] uppercase text-[#7A6852]">
                    Level 2 · Family Sanctuary Suite 2-108
                  </span>
                  <Users className="w-5 h-5 text-[#9A7B4F]" />
                </div>
                <h2 className="font-serif text-3xl font-medium mb-3">
                  Supervised Kids Play Zone
                </h2>
                <p className="text-sm leading-relaxed text-[#4A433B] mb-5">
                  Curated tactile discovery studio with padded adventure mazes, toddler sensory corners, certified supervision, and direct visibility from Culinary Terrace cafés.
                </p>
                <ul className="space-y-2 text-xs text-[#5C5349]">
                  <li className="flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>Daily 10:30 AM – 9:30 PM Supervised Sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>Anti-Microbial Cushioned Activity Architecture</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/entertainment/kids-play-zone"
                className="self-start px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-medium border border-[#1A1816] text-[#1A1816] hover:bg-[#1A1816] hover:text-[#F7F4EE] transition-colors"
              >
                Explore Play Studio
              </Link>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}
