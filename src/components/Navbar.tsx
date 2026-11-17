import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

interface DropdownRouteItem {
  label: string;
  to: string;
}

interface NavMenuItem {
  id: string;
  label: string;
  to: string;
  matchPrefix?: string;
  items?: DropdownRouteItem[];
}

const NAV_ITEMS: NavMenuItem[] = [
  {
    id: 'home',
    label: 'HOME',
    to: '/',
  },
  {
    id: 'discover',
    label: 'DISCOVER',
    to: '/discover',
    matchPrefix: '/discover',
  },
  {
    id: 'brands',
    label: 'BRANDS',
    to: '/brands',
    matchPrefix: '/brands',
  },
  {
    id: 'shopping',
    label: 'SHOPPING',
    to: '/shopping',
    matchPrefix: '/shopping',
    items: [
      { label: 'Fashion', to: '/shopping/fashion' },
      { label: 'Footwear', to: '/shopping/footwear' },
      { label: 'Jewellery & Watches', to: '/shopping/jewellery' },
      { label: 'Beauty & Lifestyle', to: '/shopping/beauty' },
      { label: 'Electronics', to: '/shopping/electronics' },
      { label: 'Toys & Kids', to: '/shopping/toys-kids' },
    ],
  },
  {
    id: 'dining',
    label: 'DINING',
    to: '/dining',
    matchPrefix: '/dining',
    items: [
      { label: 'Restaurants', to: '/dining/restaurants' },
      { label: 'Food Court', to: '/dining/food-court' },
      { label: 'Cafes', to: '/dining/cafes' },
      { label: 'Fine Dining', to: '/dining/fine-dining' },
    ],
  },
  {
    id: 'entertainment',
    label: 'ENTERTAINMENT',
    to: '/entertainment',
    matchPrefix: '/entertainment',
    items: [
      { label: 'Cinema', to: '/entertainment/cinema' },
      { label: 'Gaming & Arcade', to: '/entertainment/gaming' },
      { label: 'Kids Play Zone', to: '/entertainment/kids-play-zone' },
    ],
  },
  {
    id: 'whats-on',
    label: "WHAT'S ON",
    to: '/whats-on',
    matchPrefix: '/whats-on',
    items: [
      { label: 'Events', to: '/whats-on/events' },
      { label: 'Offers & Promotions', to: '/whats-on/offers' },
      { label: 'Gift Cards', to: '/whats-on/gift-cards' },
    ],
  },
  {
    id: 'visit-us',
    label: 'VISIT US',
    to: '/visit-us',
    matchPrefix: '/visit-us',
    items: [
      { label: 'Mall Map', to: '/visit-us/map' },
      { label: 'Floor Directory', to: '/visit-us/floor-directory' },
      { label: 'Parking', to: '/visit-us/parking' },
      { label: 'Mall Services', to: '/visit-us/services' },
      { label: 'Contact Us', to: '/visit-us/contact' },
    ],
  },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>('shopping');

  const closeTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close menus whenever route changes
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (id: string, hasItems: boolean) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(hasItems ? id : null);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 140);
  };

  const isItemActive = (item: NavMenuItem) => {
    if (item.to === '/') return pathname === '/';
    return item.matchPrefix ? pathname.startsWith(item.matchPrefix) : pathname === item.to;
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 h-14 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#DED5C7]"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Left Logo */}
        <Link
          to="/"
          className="font-serif text-lg sm:text-xl font-semibold tracking-[0.12em] text-[#1A1816] whitespace-nowrap shrink-0"
        >
          CITY MALL
        </Link>

        {/* Right Compact Desktop Navigation — Exactly 8 Main Items */}
        <nav
          aria-label="CITY MALL Navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0"
          onMouseLeave={handleMouseLeave}
        >
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.items && item.items.length > 0);
            const isOpen = openDropdown === item.id;
            const isActive = isItemActive(item);

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id, hasDropdown)}
              >
                <Link
                  to={item.to}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  aria-haspopup={hasDropdown ? 'menu' : undefined}
                  className={`inline-flex items-center gap-1 py-1.5 text-[11px] xl:text-xs tracking-[0.14em] uppercase font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive || isOpen
                      ? 'text-[#1A1816] border-[#9A7B4F]'
                      : 'text-[#524B42] border-transparent hover:text-[#1A1816] hover:border-[#C6A87A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#9A7B4F]' : 'opacity-70'
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Panel */}
                {hasDropdown && item.items && (
                  <div
                    role="menu"
                    className={`absolute right-0 top-full pt-2.5 w-56 transition-all duration-150 origin-top ${
                      isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-1.5 pointer-events-none'
                    }`}
                  >
                    <div className="bg-[#FAF8F4] border border-[#D8CFC0] shadow-xl py-2">
                      {item.items.map((sub) => {
                        const subActive = pathname === sub.to;
                        return (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            role="menuitem"
                            className={`block w-full text-left px-4 py-2 text-xs tracking-[0.06em] transition-colors ${
                              subActive
                                ? 'bg-[#EFEAE1] text-[#9A7B4F] font-medium'
                                : 'text-[#2F2A24] hover:bg-[#EFEAE1] hover:text-[#9A7B4F]'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#1A1816] hover:bg-[#EAE3D7] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-50 bg-[#F7F4EE] border-t border-[#DED5C7] overflow-y-auto px-5 py-6">
          <nav aria-label="Mobile Navigation" className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.items && item.items.length > 0);
              const isExpanded = mobileExpanded === item.id;
              const isActive = isItemActive(item);

              return (
                <div key={item.id} className="border-b border-[#E5DDD0] py-2">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 py-2.5 text-xs tracking-[0.16em] uppercase font-medium ${
                        isActive ? 'text-[#9A7B4F]' : 'text-[#1A1816]'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {hasDropdown && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : item.id)
                        }
                        className="p-2 text-[#524B42] hover:text-[#1A1816] cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#9A7B4F]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasDropdown && isExpanded && item.items && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.items.map((sub) => {
                        const subActive = pathname === sub.to;
                        return (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block w-full text-left py-2 text-sm transition-colors ${
                              subActive
                                ? 'text-[#9A7B4F] font-medium'
                                : 'text-[#4A433B] hover:text-[#9A7B4F]'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
