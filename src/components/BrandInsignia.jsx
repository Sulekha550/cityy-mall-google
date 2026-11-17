/**
 * Distinctive architectural monogram seal rendered for each approved house.
 * Avoids fabricated trademark counterfeits while visually separating house marks from photography.
 */
export function BrandInsignia({ monogram, accentColor = '#683BA4', size = 'md' }) {
  const dims =
    size === 'lg'
      ? 'w-14 h-14 text-lg'
      : size === 'sm'
      ? 'w-9 h-9 text-xs'
      : 'w-11 h-11 text-sm';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 font-display font-semibold tracking-wider select-none border transition-transform duration-300 ${dims} bg-[#FFFBF6]/90 dark:bg-[#1D1630]/90 text-[#1B1325] dark:text-[#F6EFE7] border-[#2D1D48]/20 dark:border-[#E2D4FF]/25`}
      style={{
        boxShadow: `inset 0 0 0 2px ${accentColor}22`,
      }}
      aria-hidden="true"
    >
      <span
        className="absolute top-1 left-1 w-1.5 h-1.5"
        style={{ backgroundColor: accentColor }}
      />
      <span>{monogram}</span>
    </div>
  );
}
