import { HomeHeroSection } from '../sections/HomeHeroSection';
import { HomePromenadeSection } from '../sections/HomePromenadeSection';
import { HomeRealmsCarouselSection } from '../sections/HomeRealmsCarouselSection';
import { HomeBrandSpotlightSection } from '../sections/HomeBrandSpotlightSection';
import { HomeDiningCinemaDualSection } from '../sections/HomeDiningCinemaDualSection';
import { RightVerticalSectionNav } from '../components/RightVerticalSectionNav';

export function HomePage({ onInspectBrand }) {
  return (
    <div className="relative">
      <RightVerticalSectionNav />
      <HomeHeroSection onInspectBrand={onInspectBrand} />
      <HomePromenadeSection />
      <HomeRealmsCarouselSection />
      <HomeBrandSpotlightSection onInspectBrand={onInspectBrand} />
      <HomeDiningCinemaDualSection onInspectBrand={onInspectBrand} />
    </div>
  );
}
