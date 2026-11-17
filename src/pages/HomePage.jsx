import { HomeHeroSection } from '../sections/HomeHeroSection';
import { HomePromenadeSection } from '../sections/HomePromenadeSection';
import { HomeRealmsCarouselSection } from '../sections/HomeRealmsCarouselSection';
import { HomeBrandSpotlightSection } from '../sections/HomeBrandSpotlightSection';
import { HomeAllBrandsShowcaseSection } from '../sections/HomeAllBrandsShowcaseSection';
import { HomeDiningPanoramaSection } from '../sections/HomeDiningPanoramaSection';
import { HomeCinemaBannerSection } from '../sections/HomeCinemaBannerSection';

export function HomePage({ onInspectBrand }) {
  return (
    <div>
      <HomeHeroSection onInspectBrand={onInspectBrand} />
      <HomePromenadeSection />
      <HomeRealmsCarouselSection />
      <HomeBrandSpotlightSection onInspectBrand={onInspectBrand} />
      <HomeAllBrandsShowcaseSection onInspectBrand={onInspectBrand} />
      <HomeDiningPanoramaSection onInspectBrand={onInspectBrand} />
      <HomeCinemaBannerSection onInspectBrand={onInspectBrand} />
    </div>
  );
}
