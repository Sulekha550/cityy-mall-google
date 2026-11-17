import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Film,
  ExternalLink,
  Clock,
  MapPin,
  Sparkles,
  Volume2,
  MonitorPlay,
  Armchair,
  Popcorn,
  Ticket,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CINEMA_POSTER_ASSETS, VIDEO_ASSETS } from '../assets/mediaManifest';
import {
  APPROVED_BRANDS,
  MALL_IDENTITY,
  SAMPLE_CINEMA_FEATURES,
} from '../utilities/brandsData';
import { registerSectionMotion } from '../animations/scrollAnimations';
import { VideoSectionBackground } from '../components/VideoSectionBackground';
import { ResilientImage } from '../components/ResilientImage';
import { RightVerticalSectionNav } from '../components/RightVerticalSectionNav';

const CINEMA_SECTIONS = [
  { id: 'cinema-hero', number: '01', title: 'PVR INOX Multiplex' },
  { id: 'cinema-auditoriums', number: '02', title: 'Audi Tech & Comfort' },
  { id: 'cinema-screenings', number: '03', title: 'Theatrical Slates' },
  { id: 'cinema-concourse', number: '04', title: 'Box Office & F&B' },
];

const AUDITORIUM_FEATURES = [
  {
    icon: MonitorPlay,
    title: '4K Laser Projection',
    description:
      'Ultra-sharp high frame rate projection delivering supreme colour depth, true blacks, and crystal clarity across silver screens.',
    accent: '#FFA07A',
  },
  {
    icon: Volume2,
    title: 'Spatial Dolby Surround',
    description:
      'Immersive multi-channel acoustics with overhead ceiling speakers, creating pinpoint three-dimensional sound staging.',
    accent: '#BFA1FF',
  },
  {
    icon: Armchair,
    title: 'Plush Recliner Loungers',
    description:
      'Motorized leatherette recliners with generous legroom, wide personal armrests, and dedicated in-audi waiter call service.',
    accent: '#F48C74',
  },
  {
    icon: Popcorn,
    title: 'Gourmet F&B Concourse',
    description:
      'Artisanal caramel popcorn, cheese nachos, steamed dim sums, loaded burgers, and chilled cafe beverages served fresh.',
    accent: '#5EEAD4',
  },
];

export function EntertainmentPage({ onInspectBrand }) {
  const heroRef = useRef(null);
  const audisRef = useRef(null);
  const featuresRef = useRef(null);
  const concourseRef = useRef(null);

  const inox = APPROVED_BRANDS.find((b) => b.id === 'inox-cinemas');
  const [selectedFeatureId, setSelectedFeatureId] = useState(
    SAMPLE_CINEMA_FEATURES[0].id
  );

  const selectedFeature =
    SAMPLE_CINEMA_FEATURES.find((f) => f.id === selectedFeatureId) ||
    SAMPLE_CINEMA_FEATURES[0];

  useEffect(() => {
    const cleanHero = registerSectionMotion(heroRef.current, 'editorial');
    const cleanAudis = registerSectionMotion(audisRef.current, 'cascade');
    const cleanFeatures = registerSectionMotion(featuresRef.current, 'cascade');
    const cleanConcourse = registerSectionMotion(concourseRef.current, 'editorial');

    return () => {
      cleanHero();
      cleanAudis();
      cleanFeatures();
      cleanConcourse();
    };
  }, []);

  return (
    <div className="bg-[#240C3E] text-[#F6EFE7]">
      {/* Right-Side Vertical Scroll-Spy Navigation (matching reference screenshots) */}
      <RightVerticalSectionNav sections={CINEMA_SECTIONS} />

      {/* =========================================================================
          SECTION 1: THEATRICAL HERO — PVR INOX CINEMAS
          Matches Reference Screenshot: Luminous royal violet & mulberry plum, sweeping top-right
          projector light beam, floating stardust, PVR INOX badge, and red beacon dot.
          ========================================================================= */}
      <section
        ref={heroRef}
        id="cinema-hero"
        className="relative overflow-hidden min-h-[100vh] flex flex-col justify-between py-12 sm:py-16 px-5 sm:px-8 lg:px-12 border-b border-white/15 bg-gradient-to-b from-[#562684] via-[#401A64] to-[#2A0F46]"
      >
        {/* Procedural Canvas Background with Sweeping Projector Beam (Zero Humans) */}
        <VideoSectionBackground
          variant="entertainment"
          eager
          playbackRate={0.75}
          videoOpacityClassName="opacity-95"
          tintClassName="bg-transparent"
        />

        {/* Ambient Top Projector Lens Flare, Beams & Stage Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {/* Radiant Lens Bloom at Top-Right */}
          <div className="absolute -top-20 -right-20 w-[450px] sm:w-[620px] h-[450px] sm:h-[620px] rounded-full bg-radial from-[#FFFFFF] via-[#FFE4A0]/85 via-[#C084FC]/50 to-transparent blur-3xl opacity-95" />

          {/* Broad Ambient Warm-Gold / Violet Stage Lighting across upper half */}
          <div className="absolute top-0 right-0 w-full h-[70%] bg-gradient-to-bl from-[#FFE8A3]/24 via-[#C084FC]/20 to-transparent blur-3xl" />

          {/* Soft Left Ambient Fill to keep text area bright and glowing */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#6B2E9E]/25 to-transparent pointer-events-none" />

          {/* Primary Sweeping Projector Beam Diagonal Cone */}
          <div
            className="absolute -top-16 -right-10 w-[170%] sm:w-[140%] h-[150%] opacity-75 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse 95% 75% at 94% 8%, rgba(255, 252, 235, 0.96) 0%, rgba(255, 232, 165, 0.70) 25%, rgba(225, 190, 255, 0.40) 55%, transparent 75%)',
              clipPath: 'polygon(96% 0%, 0% 28%, 0% 98%, 100% 88%)',
            }}
          />

          {/* Secondary Intense Bright Core Shaft */}
          <div
            className="absolute -top-10 -right-5 w-[140%] sm:w-[110%] h-[120%] opacity-60 mix-blend-screen"
            style={{
              background:
                'linear-gradient(220deg, rgba(255, 255, 245, 1) 0%, rgba(255, 238, 185, 0.75) 30%, rgba(225, 195, 255, 0.35) 65%, transparent 80%)',
              clipPath: 'polygon(98% 5%, 0% 48%, 15% 92%, 100% 65%)',
            }}
          />

          {/* Floating Theatrical Light Particles inside the beam */}
          <div className="absolute top-[28%] right-[32%] w-2.5 h-2.5 rounded-full bg-white/95 blur-[0.4px] animate-pulse" />
          <div className="absolute top-[42%] right-[52%] w-2 h-2 rounded-full bg-[#FFE8A3]/95 blur-[0.4px]" />
          <div className="absolute top-[56%] right-[38%] w-2.5 h-2.5 rounded-full bg-violet-200/90 blur-[0.6px]" />
          <div className="absolute top-[36%] right-[20%] w-2 h-2 rounded-full bg-white/85" />
          <div className="absolute top-[66%] right-[68%] w-1.5 h-1.5 rounded-full bg-[#FFE8A3]/85" />

          {/* Soft Stage Uplighting at bottom of viewport */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#C084FC]/22 via-[#FB923C]/14 to-transparent blur-2xl" />

          {/* Red Pulsing Cinema Beacon Dot (from reference screenshot) */}
          <div className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94E64] opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#C93248] shadow-[0_0_18px_#D94E64]" />
            </span>
          </div>
        </div>

        {/* Top Header Floating Badges Row (Matches Reference Screenshot) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between gap-4 pt-4 sm:pt-6">
          {/* Left: White Capsule Logo with PVR (red) + INOX (dark) */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#1B1325] shadow-2xl border border-white/80 ring-2 ring-white/20">
            <span className="text-[#C9523C] font-black text-sm sm:text-base tracking-tight">
              PVR
            </span>
            <span className="text-[#1B1325] font-black text-sm sm:text-base tracking-tight">
              INOX
            </span>
          </div>

          {/* Right: Dark Translucent Location Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] shadow-lg">
            <span>FOURTH FLOOR · PARK ROAD</span>
          </div>
        </div>

        {/* Center/Hero Content Block (Matches Reference Layout & Typography) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-12 sm:py-20 space-y-6">
          <div data-motion="reveal" className="space-y-4 max-w-2xl">
            {/* Kicker with Film Clapper Icon */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#FFA07A]">
              <Film className="w-4 h-4 text-[#FFA07A]" />
              <span>MULTIPLEX EXPERIENCE</span>
            </div>

            {/* Display Headline in Grand Serif with Soft Golden Luminous Gradient */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-normal tracking-tight leading-[1.04] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8EB] to-[#E9D5FF] drop-shadow-[0_4px_30px_rgba(255,235,175,0.3)]">
              PVR INOX Cinemas
            </h1>

            {/* Subtext from Reference */}
            <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed drop-shadow-sm">
              Laser projection, spatial Dolby surround acoustics, and plush recliner seating high above City Mall&apos;s central atrium.
            </p>
          </div>

          {/* Dual Action Booking Buttons */}
          <div data-motion="reveal" className="flex flex-wrap items-center gap-3.5 pt-2">
            {/* Primary: Book Tickets - BookMyShow */}
            <a
              href="https://in.bookmyshow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E5484D] hover:bg-[#D13438] text-white shadow-[0_0_25px_rgba(229,72,77,0.4)] transition-transform hover:scale-105"
            >
              <span>Book Tickets · BookMyShow</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
            </a>

            {/* Secondary: PVR INOX Official */}
            <a
              href="https://www.pvrcinemas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/12 hover:bg-white/22 border border-white/25 text-white backdrop-blur-md transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>PVR INOX Official</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Bottom Operating Meta Bar */}
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 text-xs text-white/70 font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FFA07A]" />
              <span>9:00 AM – 1:00 AM Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FFA07A]" />
              <span>Fourth Floor Multiplex Concourse</span>
            </div>
          </div>
          <span className="text-[#FFA07A]">Gorakhpur Premier Theatrical Destination</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: AUDITORIUM TECHNOLOGY & LUXURY RECLINERS
          ========================================================================= */}
      <section
        ref={audisRef}
        id="cinema-auditoriums"
        className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-[#2A0F46] via-[#38165B] to-[#260C40] border-b border-white/12"
      >
        {/* Ambient Stage Lighting Glow Pools */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#C084FC]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#FFA07A]/18 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div data-motion="reveal" className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFA07A]">
              Next-Gen Projection &amp; Sound
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Crafted for Cinematic Immersion
            </h2>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Every auditorium inside PVR INOX at CITY MALL features acoustic architecture tailored for pristine fidelity, crystal-clear 4K projection, and ultimate seating comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDITORIUM_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-white/20 bg-white/[0.09] hover:bg-white/[0.15] transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-[0_0_35px_rgba(255,160,122,0.22)] hover:border-[#FFA07A]/60 backdrop-blur-md space-y-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${feature.accent}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feature.accent }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THEATRICAL SCREENING SLATES & PREVIEWS
          ========================================================================= */}
      <section
        ref={featuresRef}
        id="cinema-screenings"
        className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-[#260C40] via-[#321252] to-[#200A38] border-b border-white/12"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/12 pb-6"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BFA1FF]">
                Theatrical Programme
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Now Showing &amp; Film Genres
              </h2>
            </div>
            <p className="text-xs text-white/65 max-w-sm">
              From global Hollywood IMAX and 3D tentpoles to Bollywood spectacles and regional epics, experience film with uncompromised sound and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Film Genres / Features Selector */}
            <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
              {SAMPLE_CINEMA_FEATURES.map((item, idx) => {
                const isSelected = item.id === selectedFeature.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedFeatureId(item.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E5484D] to-[#BA2E1B] text-white border-transparent shadow-[0_0_25px_rgba(229,72,77,0.35)] -translate-y-0.5 ring-2 ring-white/30'
                        : 'bg-white/[0.06] hover:bg-white/[0.10] border-white/12 text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider opacity-85">
                      <span>Screen 0{idx + 1} · {item.genre}</span>
                      <span>{item.format}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold mt-1">
                      {item.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Movie Showcase Card with Poster */}
            <div className="lg:col-span-7 rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.10] to-white/[0.04] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              <div className="w-48 sm:w-56 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden border border-white/25 shadow-2xl bg-black">
                <ResilientImage
                  src={selectedFeature.poster}
                  alt={selectedFeature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 border border-white/20 text-[#FFA07A] text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Theatrical Experience</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedFeature.title}
                </h3>

                <p className="text-xs font-mono uppercase tracking-widest text-[#BFA1FF]">
                  {selectedFeature.genre} · {selectedFeature.format}
                </p>

                <p className="text-xs sm:text-sm leading-relaxed text-white/80">
                  {selectedFeature.note}
                </p>

                <div className="pt-2">
                  <a
                    href="https://in.bookmyshow.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E5484D] hover:bg-[#D13438] text-white shadow-lg transition-transform hover:scale-105"
                  >
                    <span>Check Live Showtimes</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: BOX OFFICE GUIDANCE & CONCOURSE VISIT
          ========================================================================= */}
      <section
        ref={concourseRef}
        id="cinema-concourse"
        className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-t from-[#361556] via-[#260C40] to-[#1E0A34]"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5EEAD4]">
            <Ticket className="w-4 h-4 text-[#5EEAD4]" />
            <span>Box Office Desk &amp; Guest Concierge</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Seamless Booking &amp; Evening Entertainment
          </h2>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Tickets are available directly at the Fourth Floor box office desk or online via BookMyShow and PVR INOX official platforms. Combine your movie with dining at our Third Floor Terrace Promenade.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-2">
            <Link
              to="/dining"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#1B1325] hover:bg-white/90 shadow-xl transition-transform hover:scale-105"
            >
              <span>Explore Third Floor Dining</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/visit-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20 bg-white/10 hover:bg-white/18 text-white backdrop-blur-md transition-colors"
            >
              <span>Mall Parking &amp; Access</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
