import fullLogoWebp from '../assets/city-mall-logo.webp';
import iconWebp from '../assets/city-mall-icon.webp';

export function CityMallLogo({
  size = 'md',
  showText = true,
  className = '',
  textClassName = '',
  iconClassName = '',
}) {
  const sizeMap = {
    xs: { icon: 'h-4 w-4', full: 'h-6', text: 'text-xs tracking-[0.06em]' },
    sm: { icon: 'h-5 w-5', full: 'h-7', text: 'text-sm tracking-[0.07em]' },
    md: { icon: 'h-7 w-7 sm:h-8 sm:w-8', full: 'h-8 sm:h-9', text: 'text-base sm:text-lg tracking-[0.08em]' },
    lg: { icon: 'h-9 w-9 sm:h-10 sm:w-10', full: 'h-10 sm:h-12', text: 'text-xl sm:text-2xl tracking-[0.08em]' },
    xl: { icon: 'h-12 w-12 sm:h-14 sm:w-14', full: 'h-14 sm:h-16', text: 'text-2xl sm:text-3xl tracking-[0.09em]' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (showText) {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <img
          src={fullLogoWebp}
          alt="CITY MALL"
          width={54}
          height={34}
          className={`${currentSize.full} w-auto object-contain shrink-0 drop-shadow-xs transition-transform duration-300 hover:scale-105 ${iconClassName}`}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={iconWebp}
        alt="CITY MALL"
        width={20}
        height={20}
        className={`${currentSize.icon} object-contain shrink-0 drop-shadow-xs transition-transform duration-300 hover:scale-105 ${iconClassName}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export default CityMallLogo;
