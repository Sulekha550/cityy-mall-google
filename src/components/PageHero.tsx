import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArchitecturalScene } from '../data/exhibitionData';
import { ScrollVideoBackground } from './ScrollVideoBackground';

export interface SubRouteTab {
  label: string;
  to: string;
  active: boolean;
}

interface PageHeroProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description: string;
  video: string;
  poster: string;
  scenes?: ArchitecturalScene[];
  videoLabel: string;
  breadcrumb?: { label: string; to?: string }[];
  subRoutes?: SubRouteTab[];
  actions?: ReactNode;
  stats?: { value: string; label: string }[];
  compact?: boolean;
}

export function PageHero({
  id,
  eyebrow,
  title,
  subtitle,
  description,
  video,
  poster,
  scenes,
  videoLabel,
  breadcrumb,
  subRoutes,
  actions,
  stats,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      id={id}
      className={`relative z-10 flex flex-col justify-end overflow-hidden bg-[#F5F1E9] text-[#1A1816] border-b border-[#DED5C7] ${
        compact ? 'min-h-[46vh] lg:min-h-[52vh]' : 'min-h-[76vh] lg:min-h-[84vh]'
      }`}
    >
      <ScrollVideoBackground
        src={video}
        poster={poster}
        scenes={scenes}
        eager
        triggerSelector={`#${id}`}
        playbackSpeed={0.25}
        videoOpacityClassName="opacity-58"
        blendModeClassName="mix-blend-normal"
        overlayClassName="bg-gradient-to-t from-[#FAF8F4]/90 via-[#F7F4EE]/55 to-[#FAF8F4]/30"
        label={videoLabel}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10 sm:pb-14">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-[#6E6254] mb-5"
          >
            {breadcrumb.map((crumb, idx) => (
              <span key={crumb.label} className="inline-flex items-center gap-2">
                {idx > 0 && <span aria-hidden="true">/</span>}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-[#9A7B4F] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#9A7B4F] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#8C6F47] mb-3 font-medium">
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4rem] font-medium tracking-tight leading-[1.06] text-[#1A1816]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 font-serif text-lg sm:text-2xl tracking-[0.15em] uppercase text-[#5C5349]">
              {subtitle}
            </p>
          )}
          <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#2F2A24] max-w-2xl">
            {description}
          </p>
        </div>

        {(stats || actions) && (
          <div className="mt-9 pt-7 border-t border-[#DED5C7] flex flex-col lg:flex-row lg:items-end justify-between gap-7">
            {stats && stats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1816] tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs tracking-[0.14em] uppercase text-[#8C6F47] mt-1 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}

            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
        )}

        {subRoutes && subRoutes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#DED5C7] flex items-center gap-2 overflow-x-auto lg:flex-wrap no-scrollbar pb-1">
            {subRoutes.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                className={`px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium transition-colors whitespace-nowrap shrink-0 border ${
                  tab.active
                    ? 'bg-[#1A1816] text-[#FAF8F4] border-[#1A1816]'
                    : 'bg-[#FAF8F4]/90 text-[#2F2A24] border-[#D8CFC0] hover:border-[#9A7B4F] hover:text-[#9A7B4F]'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
