import React from 'react';
import { BrandLogo, resolveBrandId } from './BrandLogo';

/**
 * Authentic brand insignia & emblem seal rendered for each approved house.
 * Displays official vector SVGs and trademark typography.
 */
export function BrandInsignia({
  brandId,
  monogram,
  accentColor = '#683BA4',
  size = 'md',
  className = '',
}) {
  const activeBrandId = resolveBrandId(brandId || monogram);
  const variant = size === 'lg' ? 'showcase' : 'badge';

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <BrandLogo brandId={activeBrandId} variant={variant} />
    </div>
  );
}

export default BrandInsignia;
