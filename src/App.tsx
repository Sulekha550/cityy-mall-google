import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRANDS, BrandFlagship } from './data/exhibitionData';
import { Navbar } from './components/Navbar';
import { DestinationFooter } from './components/DestinationFooter';
import { BrandDetailModal } from './components/BrandDetailModal';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { BrandsPage } from './pages/BrandsPage';
import { ShoppingPage } from './pages/ShoppingPage';
import { DiningPage } from './pages/DiningPage';
import { EntertainmentPage } from './pages/EntertainmentPage';
import { WhatsOnPage } from './pages/WhatsOnPage';
import { VisitUsPage } from './pages/VisitUsPage';

gsap.registerPlugin(ScrollTrigger);

function RouteScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState<BrandFlagship | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1A1816] overflow-x-clip">
      <RouteScrollManager />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage onExploreBrand={setSelectedBrand} />} />
          <Route
            path="/discover"
            element={<DiscoverPage onExploreBrand={setSelectedBrand} />}
          />
          <Route
            path="/brands"
            element={<BrandsPage onExploreBrand={setSelectedBrand} />}
          />

          {/* Shopping & Dropdown Sub-Routes */}
          <Route
            path="/shopping"
            element={<ShoppingPage subCategory="all" onExploreBrand={setSelectedBrand} />}
          />
          <Route
            path="/shopping/fashion"
            element={
              <ShoppingPage subCategory="fashion" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/shopping/footwear"
            element={
              <ShoppingPage subCategory="footwear" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/shopping/jewellery"
            element={
              <ShoppingPage subCategory="jewellery" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/shopping/beauty"
            element={
              <ShoppingPage subCategory="beauty" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/shopping/electronics"
            element={
              <ShoppingPage subCategory="electronics" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/shopping/toys-kids"
            element={
              <ShoppingPage subCategory="toys-kids" onExploreBrand={setSelectedBrand} />
            }
          />

          {/* Dining & Dropdown Sub-Routes */}
          <Route
            path="/dining"
            element={<DiningPage subCategory="all" onExploreBrand={setSelectedBrand} />}
          />
          <Route
            path="/dining/restaurants"
            element={
              <DiningPage subCategory="restaurants" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/dining/food-court"
            element={
              <DiningPage subCategory="food-court" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/dining/cafes"
            element={<DiningPage subCategory="cafes" onExploreBrand={setSelectedBrand} />}
          />
          <Route
            path="/dining/fine-dining"
            element={
              <DiningPage subCategory="fine-dining" onExploreBrand={setSelectedBrand} />
            }
          />

          {/* Entertainment & Dropdown Sub-Routes */}
          <Route
            path="/entertainment"
            element={
              <EntertainmentPage subCategory="all" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/entertainment/cinema"
            element={
              <EntertainmentPage subCategory="cinema" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/entertainment/gaming"
            element={
              <EntertainmentPage subCategory="gaming" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/entertainment/kids-play-zone"
            element={
              <EntertainmentPage
                subCategory="kids-play-zone"
                onExploreBrand={setSelectedBrand}
              />
            }
          />

          {/* What's On & Dropdown Sub-Routes */}
          <Route path="/whats-on" element={<WhatsOnPage subCategory="all" />} />
          <Route path="/whats-on/events" element={<WhatsOnPage subCategory="events" />} />
          <Route path="/whats-on/offers" element={<WhatsOnPage subCategory="offers" />} />
          <Route
            path="/whats-on/gift-cards"
            element={<WhatsOnPage subCategory="gift-cards" />}
          />

          {/* Visit Us & Dropdown Sub-Routes */}
          <Route
            path="/visit-us"
            element={
              <VisitUsPage subCategory="overview" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/visit-us/map"
            element={<VisitUsPage subCategory="map" onExploreBrand={setSelectedBrand} />}
          />
          <Route
            path="/visit-us/floor-directory"
            element={
              <VisitUsPage
                subCategory="floor-directory"
                onExploreBrand={setSelectedBrand}
              />
            }
          />
          <Route
            path="/visit-us/parking"
            element={
              <VisitUsPage subCategory="parking" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/visit-us/services"
            element={
              <VisitUsPage subCategory="services" onExploreBrand={setSelectedBrand} />
            }
          />
          <Route
            path="/visit-us/contact"
            element={
              <VisitUsPage subCategory="contact" onExploreBrand={setSelectedBrand} />
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <DestinationFooter />

      <BrandDetailModal
        brand={selectedBrand}
        allVisibleBrands={BRANDS}
        onClose={() => setSelectedBrand(null)}
        onSelectBrand={(brand) => setSelectedBrand(brand)}
      />
    </div>
  );
}
