export function CityMallLogo({
  size = 'md',
  showText = true,
  className = '',
  textClassName = '',
  iconClassName = '',
}) {
  const sizeMap = {
    xs: { icon: 'w-5 h-5', text: 'text-sm tracking-[0.06em]' },
    sm: { icon: 'w-6 h-6', text: 'text-base tracking-[0.07em]' },
    md: { icon: 'w-7 h-7 sm:w-8 sm:h-8', text: 'text-lg sm:text-xl tracking-[0.08em]' },
    lg: { icon: 'w-9 h-9 sm:w-10 sm:h-10', text: 'text-2xl sm:text-3xl tracking-[0.08em]' },
    xl: { icon: 'w-12 h-12 sm:w-14 sm:h-14', text: 'text-3xl sm:text-4xl tracking-[0.09em]' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Original Signature Architectural Shopping Arch / Gateway Emblem */}
      <svg
        viewBox="0 0 36 36"
        className={`${currentSize.icon} shrink-0 drop-shadow-[0_2px_8px_rgba(219,39,119,0.22)] transition-transform duration-300 hover:scale-105 ${iconClassName}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cityMallLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DB2777" />
            <stop offset="50%" stopColor="#C026D3" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="cityMallLogoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DB2777" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Subtle Glass Fill */}
        <path
          d="M 7.5 30 L 7.5 15.5 C 7.5 13.5 9 12 11 12 L 25 12 C 27 12 28.5 13.5 28.5 15.5 L 28.5 30 L 22.5 30 L 22.5 20 C 22.5 16.5 20.5 14.5 18 14.5 C 15.5 14.5 13.5 16.5 13.5 20 L 13.5 30 Z"
          fill="url(#cityMallLogoGlow)"
        />

        {/* Top Handle / Curved Dome Arch */}
        <path
          d="M 11.5 13.5 C 11.5 8.5 14 5.5 18 5.5 C 22 5.5 24.5 8.5 24.5 13.5"
          fill="none"
          stroke="url(#cityMallLogoGrad)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Outer Bag Body with Inner Horseshoe Gateway Arch */}
        <path
          d="M 7.5 30 L 7.5 15.5 C 7.5 13.5 9 12 11 12 L 25 12 C 27 12 28.5 13.5 28.5 15.5 L 28.5 30 L 22.5 30 L 22.5 20 C 22.5 16.5 20.5 14.5 18 14.5 C 15.5 14.5 13.5 16.5 13.5 20 L 13.5 30 Z"
          fill="none"
          stroke="url(#cityMallLogoGrad)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark Typography */}
      {showText && (
        <span
          className={`font-display font-bold text-[#1B1325] dark:text-[#FAF0F8] whitespace-nowrap ${currentSize.text} ${textClassName}`}
        >
          CITY MALL
        </span>
      )}
    </div>
  );
}

export default CityMallLogo;
