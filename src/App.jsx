import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './utilities/themeContext';
import { Navbar } from './components/Navbar';
import { AutoScrollBar } from './components/AutoScrollBar';
import { DestinationFooter } from './components/DestinationFooter';
import { BrandDetailDrawer } from './components/BrandDetailDrawer';
import { PageTransition } from './components/PageTransition';

import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { BrandsPage } from './pages/BrandsPage';
import { ShoppingPage } from './pages/ShoppingPage';
import { DiningPage } from './pages/DiningPage';
import { EntertainmentPage } from './pages/EntertainmentPage';
import { WhatsOnPage } from './pages/WhatsOnPage';
import { VisitUsPage } from './pages/VisitUsPage';
import { MallPageBackground } from './components/MallPageBackground';
import { initSmoothScroll } from './utilities/smoothScroll';

function MallRoutesShell() {
  const { pathname } = useLocation();
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    return initSmoothScroll();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-[#1B1325] dark:text-[#F6EFE7] transition-colors duration-300">
      {/* Universal CITY MALL Homepage Background Video & Visual Atmosphere */}
      <MallPageBackground />

      <Navbar />
      <AutoScrollBar />

      <main className="flex-1 relative z-10">
        <PageTransition routeKey={pathname}>
          <Routes>
            <Route
              path="/"
              element={<HomePage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/discover"
              element={<DiscoverPage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/explore"
              element={<DiscoverPage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/brands"
              element={<BrandsPage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/shopping"
              element={<ShoppingPage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/shopping/fashion"
              element={
                <ShoppingPage
                  initialCategory="fashion"
                  onInspectBrand={setSelectedBrand}
                />
              }
            />
            <Route
              path="/shopping/footwear"
              element={
                <ShoppingPage
                  initialCategory="footwear"
                  onInspectBrand={setSelectedBrand}
                />
              }
            />
            <Route
              path="/shopping/jewellery"
              element={
                <ShoppingPage
                  initialCategory="jewellery"
                  onInspectBrand={setSelectedBrand}
                />
              }
            />
            <Route
              path="/shopping/beauty"
              element={
                <ShoppingPage
                  initialCategory="beauty"
                  onInspectBrand={setSelectedBrand}
                />
              }
            />
            <Route
              path="/shopping/supermarket"
              element={
                <ShoppingPage
                  initialCategory="supermarket"
                  onInspectBrand={setSelectedBrand}
                />
              }
            />
            <Route
              path="/dining"
              element={<DiningPage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/entertainment"
              element={<EntertainmentPage onInspectBrand={setSelectedBrand} />}
            />
            <Route
              path="/whats-on"
              element={<WhatsOnPage onInspectBrand={setSelectedBrand} />}
            />
            <Route path="/visit-us" element={<VisitUsPage />} />
            <Route
              path="*"
              element={<HomePage onInspectBrand={setSelectedBrand} />}
            />
          </Routes>
        </PageTransition>
      </main>

      <div className="relative z-10">
        <DestinationFooter />
      </div>

      <BrandDetailDrawer
        brand={selectedBrand}
        onClose={() => setSelectedBrand(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MallRoutesShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
