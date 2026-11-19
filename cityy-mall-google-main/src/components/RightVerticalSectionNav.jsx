import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home-hero', number: '01', title: 'Living Promenade' },
  { id: 'home-promenade', number: '02', title: 'Architectural Rhythm' },
  { id: 'home-realms', number: '03', title: 'Curated Realms' },
  { id: 'home-spotlight', number: '04', title: 'Flagship Collection' },
  { id: 'home-dining-cinema', number: '05', title: 'Dining & INOX' },
];

/**
 * Premium Right-Side Vertical Section Navigation
 * Matches reference scroll storytelling with live scroll-spy, glowing active dot,
 * and hover tooltip indicators.
 */
export function RightVerticalSectionNav({ sections = SECTIONS }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || 'home-hero');
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight * 0.42;

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i].id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPos >= top) {
                setActiveSection(sections[i].id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Section Navigation"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3.5 select-none pointer-events-auto"
    >
      {/* Subtle vertical spine track */}
      <div className="absolute inset-y-2 w-px bg-[#2D1D48]/14 dark:bg-[#E2D4FF]/16 pointer-events-none" />

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div
            key={sec.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Hover Tooltip Pill (Slides out to the left) */}
            <div
              className={`absolute right-7 py-1 px-3 rounded-sm border whitespace-nowrap text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 pointer-events-none shadow-lg ${
                isHovered || (isActive && hoveredSection === null)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2'
              } ${
                isActive
                  ? 'border-[#C9523C]/35 dark:border-[#F48C74]/40 bg-[#1B1325] text-[#FBF4EB] dark:bg-[#F48C74] dark:text-[#151021]'
                  : 'border-[#2D1D48]/16 dark:border-[#E2D4FF]/18 bg-[#FFFBF6]/95 dark:bg-[#1D1630]/95 text-[#1B1325] dark:text-[#F6EFE7] backdrop-blur-md'
              }`}
            >
              <span className="font-mono text-[9px] opacity-75 mr-1.5">{sec.number}</span>
              <span>{sec.title}</span>
            </div>

            {/* Interactive Dot */}
            <button
              type="button"
              onClick={() => scrollToSection(sec.id)}
              aria-label={`Scroll to ${sec.title}`}
              aria-current={isActive ? 'true' : undefined}
              className="relative p-1.5 flex items-center justify-center cursor-pointer group focus:outline-none"
            >
              {/* Active subtle halo ring */}
              {isActive && (
                <span className="absolute w-5 h-5 rounded-full border border-[#C9523C]/40 dark:border-[#F48C74]/50 pointer-events-none" />
              )}

              {/* Active glow halo */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-[#C9523C] dark:bg-[#F48C74] shadow-[0_0_12px_rgba(201,82,60,0.65)] ring-2 ring-[#FFFBF6] dark:ring-[#151021]'
                    : 'w-2 h-2 bg-[#2D1D48]/35 dark:bg-[#E2D4FF]/40 group-hover:bg-[#683BA4] dark:group-hover:bg-[#BFA1FF] group-hover:scale-125'
                }`}
              />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
