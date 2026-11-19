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
    description: 'Supreme colour depth, true blacks & 4K laser clarity.',
    accent: '#DB2777',
  },
  {
    icon: Volume2,
    title: 'Spatial Dolby Surround',
    description: 'Immersive 3D multi-channel sound staging.',
    accent: '#7C3AED',
  },
  {
    icon: Armchair,
    title: 'Plush Recliner Loungers',
    description: 'Motorized leatherette recliners with waiter service.',
    accent: '#EC4899',
  },
  {
    icon: Popcorn,
    title: 'Gourmet F&B Concourse',
    description: 'Artisanal caramel popcorn, nachos & cafe beverages.',
    accent: '#0E7C71',
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
    <div className="bg-[#FBF4EB] dark:bg-[#151021] text-[#1B1325] dark:text-[#F6EFE7] transition-colors duration-300">
      {/* Right-Side Vertical Scroll-Spy Navigation (matching reference screenshots) */}
      <RightVerticalSectionNav sections={CINEMA_SECTIONS} />

      {/* =========================================================================
          SECTION 1: THEATRICAL HERO — PVR INOX CINEMAS
          Light Whitish Theme: Warm Ivory (#FBF4EB), Pure White (#FFFDF9), Delicate Peach & Champagne,
          Radiant top-right lens flare, flowing light beam, PVR INOX badge & red beacon.
          ========================================================================= */}
      <section
        ref={heroRef}
        id="cinema-hero"
        className="relative overflow-visible lg:overflow-hidden min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-between py-10 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-[#2D1D48]/14 dark:border-white/10 bg-transparent"
      >
        {/* Active Background Video & Procedural Cinema Projector Beam (Zero Humans) */}
        <VideoSectionBackground
          videoAsset={VIDEO_ASSETS.cinema}
          variant="entertainment"
          eager
          playbackRate={0.85}
          videoOpacityClassName="opacity-45 dark:opacity-35"
          tintClassName="bg-gradient-to-tr from-[#FBF4EB]/88 via-[#FFFDF9]/80 to-[#FDE8DF]/75 dark:from-[#151021]/88 dark:via-[#1D1630]/75 dark:to-[#151021]/90"
        />

        {/* Ambient Top Projector Lens Flare, Beams & Stage Lighting (Light & Luminous) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {/* Radiant Lens Bloom at Top-Right */}
          <div className="absolute -top-20 -right-20 w-[450px] sm:w-[620px] h-[450px] sm:h-[620px] rounded-full bg-radial from-white via-[#FFF7ED]/90 via-[#FED7AA]/40 to-transparent blur-3xl opacity-95" />

          {/* Broad Ambient Warm-Ivory Stage Lighting across upper half */}
          <div className="absolute top-0 right-0 w-full h-[70%] bg-gradient-to-bl from-[#FFFDF9]/70 via-[#FBF4EB]/50 to-transparent blur-3xl" />

          {/* Soft Left Ambient Fill to keep text area bright, clean and whitish */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#FFFDF9]/70 via-[#FBF4EB]/40 to-transparent pointer-events-none" />

          {/* Primary Sweeping Projector Beam Diagonal Cone */}
          <div
            className="absolute -top-16 -right-10 w-[170%] sm:w-[140%] h-[150%] opacity-80 mix-blend-multiply dark:mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse 95% 75% at 94% 8%, rgba(255, 255, 255, 1) 0%, rgba(254, 243, 199, 0.75) 25%, rgba(253, 232, 223, 0.45) 55%, transparent 75%)',
              clipPath: 'polygon(96% 0%, 0% 28%, 0% 98%, 100% 88%)',
            }}
          />

          {/* Secondary Intense Bright Core Shaft */}
          <div
            className="absolute -top-10 -right-5 w-[140%] sm:w-[110%] h-[120%] opacity-70 mix-blend-multiply dark:mix-blend-screen"
            style={{
              background:
                'linear-gradient(220deg, rgba(255, 255, 255, 1) 0%, rgba(255, 248, 220, 0.85) 30%, rgba(254, 240, 235, 0.50) 65%, transparent 80%)',
              clipPath: 'polygon(98% 5%, 0% 48%, 15% 92%, 100% 65%)',
            }}
          />

          {/* Floating Theatrical Light Particles inside the beam */}
          <div className="absolute top-[28%] right-[32%] w-2.5 h-2.5 rounded-full bg-[#DB2777]/80 dark:bg-white/95 blur-[0.4px] animate-pulse" />
          <div className="absolute top-[42%] right-[52%] w-2 h-2 rounded-full bg-[#C084FC]/85 blur-[0.4px]" />
          <div className="absolute top-[56%] right-[38%] w-2.5 h-2.5 rounded-full bg-[#F472B6]/90 blur-[0.6px]" />
          <div className="absolute top-[36%] right-[20%] w-2 h-2 rounded-full bg-[#E9D5FF]/90" />
          <div className="absolute top-[66%] right-[68%] w-1.5 h-1.5 rounded-full bg-[#FDA4AF]/85" />

          {/* Soft Stage Uplighting at bottom of viewport */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FCE7F3]/40 via-[#FFE4A0]/20 to-transparent blur-2xl" />

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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#1B1325] shadow-xl border border-[#2D1D48]/10 ring-2 ring-black/5 dark:ring-white/20">
            <span className="text-[#C9523C] font-black text-sm sm:text-base tracking-tight">
              PVR
            </span>
            <span className="text-[#1B1325] font-black text-sm sm:text-base tracking-tight">
              INOX
            </span>
          </div>

          {/* Right: Translucent Location Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-black/65 backdrop-blur-md border border-[#7C3AED]/20 text-[#24083E] dark:text-white/90 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] shadow-md">
            <span>FOURTH FLOOR · PARK ROAD</span>
          </div>
        </div>

        {/* Center/Hero Content Block (Deep Plum & Soft Lavender Headline) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-12 sm:py-20 space-y-6">
          <div data-motion="reveal" className="space-y-4 max-w-2xl">
            {/* Kicker with Film Clapper Icon */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#DB2777] dark:text-[#F472B6]">
              <Film className="w-4 h-4 text-[#DB2777] dark:text-[#F472B6]" />
              <span>MULTIPLEX EXPERIENCE</span>
            </div>

            {/* Display Headline with Vibrant Violet-Rose Gradient */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.04] text-[#1B1028] dark:text-[#FAF0F8]">
              PVR INOX{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                Laser 4K Cinemas
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#483359] dark:text-white/85 max-w-xl leading-relaxed font-medium">
              Laser projection, Dolby Atmos &amp; plush recliner auditoriums.
            </p>
          </div>

          {/* Dual Action Booking Buttons */}
          <div data-motion="reveal" className="flex flex-wrap items-center gap-3.5 pt-2">
            {/* Primary: Book Tickets - BookMyShow */}
            <a
              href="https://in.bookmyshow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E5484D] hover:bg-[#D13438] text-white shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <span>Book Tickets · BookMyShow</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
            </a>

            {/* Secondary: PVR INOX Official */}
            <a
              href="https://www.pvrcinemas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/85 hover:bg-white text-[#24083E] dark:bg-white/15 dark:hover:bg-white/25 dark:text-white border border-[#7C3AED]/25 dark:border-white/25 backdrop-blur-md shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <span>PVR INOX Official</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Bottom Operating Meta Bar */}
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#2D1D48]/12 dark:border-white/15 text-xs text-[#5D5070] dark:text-white/70 font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#DB2777] dark:text-[#F472B6]" />
              <span>9:00 AM – 1:00 AM Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#DB2777] dark:text-[#F472B6]" />
              <span>Fourth Floor Multiplex Concourse</span>
            </div>
          </div>
          <span className="text-[#7C3AED] dark:text-[#C084FC] font-semibold">
            Gorakhpur Premier Theatrical Destination
          </span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: AUDITORIUM TECHNOLOGY & LUXURY RECLINERS
          Continuous Whitish Ambient Theme matching Home Page
          ========================================================================= */}
      <section
        ref={audisRef}
        id="cinema-auditoriums"
        className="relative overflow-hidden py-16 sm:py-24 bg-transparent border-b border-[#2D1D48]/10 dark:border-white/10"
      >
        {/* Animated Background Canvas & Cinema Video Layer */}
        <VideoSectionBackground
          variant="entertainment-tech"
          videoAsset={VIDEO_ASSETS.cinema}
          playbackRate={0.65}
          videoOpacityClassName="opacity-30 dark:opacity-20"
          tintClassName="bg-gradient-to-b from-[#FBF4EB]/85 via-[#FFFDF9]/80 to-[#FAF6F0]/85 dark:from-[#151021]/88 dark:via-[#1D1630]/75 dark:to-[#151021]/90"
        />

        {/* Ambient Stage Lighting Glow Pools */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#FFFDF9]/50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#FBF4EB]/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div data-motion="reveal" className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#DB2777] dark:text-[#F472B6]">
              Next-Gen Projection &amp; Sound
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B1028] dark:text-white tracking-tight">
              Crafted for{' '}
              <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                Cinematic Immersion
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#5D5070] dark:text-[#D8CEE9] leading-relaxed">
              Pristine 4K laser projection, immersive acoustics &amp; recliner comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDITORIUM_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-[#7C3AED]/15 dark:border-white/15 bg-white/85 dark:bg-[#1F1230]/75 hover:bg-white dark:hover:bg-[#1F1230]/95 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:border-[#DB2777]/50 backdrop-blur-xl space-y-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                    style={{ backgroundColor: `${feature.accent}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feature.accent }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1B1325] dark:text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D5070] dark:text-[#D8CEE9] leading-relaxed">
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
          Continuous Whitish Ambient Theme matching Home Page
          ========================================================================= */}
      <section
        ref={featuresRef}
        id="cinema-screenings"
        className="relative overflow-hidden py-16 sm:py-24 bg-transparent border-b border-[#2D1D48]/10 dark:border-white/10"
      >
        {/* Animated Background Canvas & Cinema Video Layer */}
        <VideoSectionBackground
          variant="entertainment-screenings"
          videoAsset={VIDEO_ASSETS.cinema}
          playbackRate={0.65}
          videoOpacityClassName="opacity-30 dark:opacity-20"
          tintClassName="bg-gradient-to-b from-[#FFFDF9]/85 via-[#FBF4EB]/80 to-[#FFFDF9]/85 dark:from-[#151021]/88 dark:via-[#1D1630]/75 dark:to-[#151021]/90"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div
            data-motion="reveal"
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D1D48]/10 dark:border-white/12 pb-6"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED] dark:text-[#C084FC]">
                Theatrical Programme
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B1325] dark:text-white tracking-tight">
                Now Showing &amp;{' '}
                <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                  Film Genres
                </span>
              </h2>
            </div>
            <p className="text-xs text-[#5D5070] dark:text-white/65 max-w-sm">
              Hollywood 3D tentpoles, Bollywood spectacles &amp; regional epics.
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
                        ? 'bg-gradient-to-r from-[#DB2777] to-[#7C3AED] text-white border-transparent shadow-xl -translate-y-0.5 ring-2 ring-[#F472B6]/40'
                        : 'bg-white/80 dark:bg-[#1F1230]/75 hover:bg-white border-[#2D1D48]/12 dark:border-white/12 text-[#1B1028] dark:text-white/80 backdrop-blur-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider opacity-90">
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
            <div className="lg:col-span-7 rounded-3xl border border-[#7C3AED]/20 dark:border-white/20 bg-white/85 dark:bg-[#1F1230]/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10">
              <div className="w-48 sm:w-56 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden border border-[#2D1D48]/15 dark:border-white/25 shadow-2xl bg-black">
                <ResilientImage
                  src={selectedFeature.poster}
                  alt={selectedFeature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/12 border border-[#7C3AED]/25 text-[#7C3AED] dark:text-[#C084FC] text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Theatrical Experience</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1B1325] dark:text-white tracking-tight">
                  {selectedFeature.title}
                </h3>

                <p className="text-xs font-mono uppercase tracking-widest text-[#DB2777] dark:text-[#F472B6]">
                  {selectedFeature.genre} · {selectedFeature.format}
                </p>

                <p className="text-xs sm:text-sm leading-relaxed text-[#5D5070] dark:text-white/80">
                  {selectedFeature.note}
                </p>

                <div className="pt-2">
                  <a
                    href="https://in.bookmyshow.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E5484D] hover:bg-[#D13438] text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
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
          Continuous Whitish Ambient Theme matching Home Page
          ========================================================================= */}
      <section
        ref={concourseRef}
        id="cinema-concourse"
        className="relative overflow-hidden py-16 sm:py-20 bg-transparent"
      >
        {/* Animated Background Canvas & Cinema Video Layer */}
        <VideoSectionBackground
          variant="entertainment-concourse"
          videoAsset={VIDEO_ASSETS.cinema}
          playbackRate={0.65}
          videoOpacityClassName="opacity-30 dark:opacity-20"
          tintClassName="bg-gradient-to-t from-[#FBF4EB]/85 via-[#FFFDF9]/80 to-[#FAF6F0]/85 dark:from-[#151021]/88 dark:via-[#1D1630]/75 dark:to-[#151021]/90"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED] dark:text-[#5EEAD4]">
            <Ticket className="w-4 h-4 text-[#7C3AED] dark:text-[#5EEAD4]" />
            <span>Box Office Desk &amp; Guest Concierge</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B1325] dark:text-white tracking-tight">
            Seamless Booking &amp;{' '}
            <span className="font-serif italic font-normal inline-block bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
              Evening Entertainment
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#5D5070] dark:text-white/80 max-w-xl mx-auto leading-relaxed">
            Tickets are available directly at the Fourth Floor box office desk or online via BookMyShow and PVR INOX official platforms. Combine your movie with dining at our Third Floor Terrace Promenade.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-2">
            <Link
              to="/dining"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white hover:opacity-95 shadow-xl transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Explore Third Floor Dining</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/visit-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#7C3AED]/25 dark:border-white/20 bg-white/85 dark:bg-white/10 text-[#1B1325] dark:text-white hover:bg-white shadow-md transition-colors cursor-pointer"
            >
              <span>Mall Parking &amp; Access</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
