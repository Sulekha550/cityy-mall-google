import { AbstractSectionBackground } from './AbstractSectionBackground';

/**
 * Premium Abstract Animated Section Backdrop.
 * Replaces realistic video footage (people, crowds, food prep) with
 * pure abstract architectural animations:
 * - Slowly moving geometric golden lines
 * - Floating glowing particles & starlight dust
 * - Soft champagne & lavender gradient flows
 * - Shifting architectural line patterns & 3D facets
 * - Distinct procedural atmospheres across Hero, Shopping, Dining, Entertainment, etc.
 */
export function VideoSectionBackground({
  videoAsset,
  variant,
  tintClassName,
  className = '',
  videoOpacityClassName,
  videoFilterClassName,
  eager,
  playbackRate,
}) {
  return (
    <AbstractSectionBackground
      videoAsset={videoAsset}
      variant={variant}
      tintClassName={tintClassName}
      className={className}
    />
  );
}
