import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Utensils, Film, Sparkles } from 'lucide-react';
import { registerSectionMotion } from '../animations/scrollAnimations';

/**
 * Premium Dual Stage Showcase: Dining Terrace (Left) & PVR INOX Cinemas (Right)
 * Matches reference layout with side-by-side architectural storytelling,
 * cinematic projector light beam, interactive brand chips, and floor indicators.
 */
export function HomeDiningCinemaDualSection({ onInspectBrand }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    return registerSectionMotion(sectionRef.current, 'editorial');
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home-dining-cinema"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#140C20]"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[100vh] items-stretch">
        {/* =====================================================================
            LEFT HALF: DINING TERRACE (Third Floor)
           ===================================================================== */}
        <div className="relative flex flex-col justify-end p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden bg-gradient-to-b from-[#2E2038]/60 via-[#1B1126]/90 to-[#120A1C]">
          {/* Ambient Champagne/Gold Gradient & Particle Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top gold radiance */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#EAB74E]/25 via-[#FDE8DF]/15 to-transparent blur-3xl" />
            <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#683BA4]/18 blur-3xl" />

            {/* Faint geometric starlight dots */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#EAB74E_1px,transparent_1px)] [background-size:36px_36px]" />
          </div>

          {/* Left Content */}
          <div className="relative z-10 space-y-6 max-w-xl" data-motion="reveal">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#EAB74E]">
              <Utensils className="w-3.5 h-3.5" />
              <span>Third Floor</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08]">
              Dining Terrace
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base leading-relaxed text-[#D8CEE9]/85 max-w-lg">
              Live table grills, golden wood-fired pizzas, authentic regional specialties &amp; quick crispy buckets in a vibrant social court.
            </p>

            {/* Brand Pills Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Barbeque Nation Chip */}
              <div className="bg-[#1D142A]/90 hover:bg-[#281C38] border border-white/12 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs text-white shadow-md transition-colors">
                <span className="w-5 h-5 rounded-full bg-[#C9523C] text-white flex items-center justify-center font-bold text-[9px] font-mono">
                  BN
                </span>
                <span className="font-medium">Barbeque Nation</span>
              </div>

              {/* KFC Chip */}
              <div className="bg-[#1D142A]/90 hover:bg-[#281C38] border border-white/12 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs text-white shadow-md transition-colors">
                <span className="px-1.5 py-0.5 rounded bg-white text-[#C9523C] font-extrabold text-[10px] tracking-tight">
                  KFC
                </span>
                <span className="font-medium">KFC</span>
              </div>

              {/* Pizza Hut Chip */}
              <div className="bg-[#1D142A]/90 hover:bg-[#281C38] border border-white/12 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs text-white shadow-md transition-colors">
                <span className="w-4 h-4 rounded-full bg-[#C9523C] text-white flex items-center justify-center font-serif text-[10px] italic font-bold">
                  P
                </span>
                <span className="font-medium">Pizza Hut</span>
              </div>
            </div>

            {/* Gold CTA Button */}
            <div className="pt-3">
              <Link
                to="/dining"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.14em] uppercase font-semibold bg-[#EAB74E] hover:bg-[#DCA83E] text-[#1B1325] rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
              >
                <span>Open Third Floor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT HALF: PVR INOX CINEMAS (Fourth Floor)
           ===================================================================== */}
        <div className="relative flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-b from-[#1C0F2D] via-[#150A22] to-[#0D0517]">
          {/* Theatrical Projector Light Beam & Dust Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Sweeping Projector Beam Cone */}
            <div
              className="absolute -top-16 -left-20 w-[140%] h-[120%] opacity-35"
              style={{
                background:
                  'radial-gradient(ellipse 85% 65% at 5% 30%, rgba(240, 218, 170, 0.45) 0%, rgba(191, 161, 255, 0.28) 35%, rgba(217, 78, 100, 0.15) 60%, transparent 80%)',
                clipPath: 'polygon(0% 15%, 100% 0%, 100% 85%, 0% 45%)',
              }}
            />

            {/* Secondary warm accent ray */}
            <div
              className="absolute top-10 -left-10 w-[120%] h-[80%] opacity-25"
              style={{
                background:
                  'linear-gradient(105deg, rgba(255, 235, 175, 0.5) 0%, rgba(191, 161, 255, 0.15) 50%, transparent 85%)',
                clipPath: 'polygon(0% 25%, 100% 10%, 100% 70%, 0% 35%)',
              }}
            />

            {/* Theatrical Starlight Particles in beam */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/70 blur-[1px] animate-pulse" />
            <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-[#EAB74E]/80 blur-[0.5px]" />
            <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-white/60" />
            <div className="absolute top-2/5 right-1/4 w-2 h-2 rounded-full bg-violet-300/60 blur-[1px]" />

            {/* Glowing Red Cinema Beacon Dot (from reference) */}
            <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94E64] opacity-75" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-[#C93248] shadow-[0_0_16px_#D94E64]" />
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative z-10 space-y-6 max-w-xl" data-motion="reveal">
            {/* PVR INOX Logo Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-[#1B1325] font-extrabold tracking-tight text-sm shadow-md">
                <span className="text-[#C9523C]">PVR</span>
                <span className="text-[#1B1325]">INOX</span>
              </span>
            </div>

            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#BFA1FF]">
              <Film className="w-3.5 h-3.5" />
              <span>Fourth Floor</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08]">
              PVR INOX Cinemas
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base leading-relaxed text-[#D8CEE9]/85 max-w-lg">
              Laser projection, Dolby surround sound &amp; plush recliner auditoriums crowning CITY MALL, Gorakhpur.
            </p>

            {/* Dual Cinema Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Primary: Now Showing */}
              <Link
                to="/entertainment"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.14em] uppercase font-semibold bg-gradient-to-r from-[#D94E64] to-[#C23C52] hover:opacity-95 text-white rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
              >
                <span>Now Showing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary: Book Tickets */}
              <Link
                to="/entertainment"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.14em] uppercase font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl shadow-md backdrop-blur-md transition-colors"
              >
                <span>Book Tickets</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
