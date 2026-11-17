import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FilterId } from '../data/exhibitionData';

export type NavSectionId =
  | 'home'
  | 'discover'
  | 'brands'
  | 'shopping'
  | 'dining'
  | 'entertainment'
  | 'whats-on'
  | 'visit-us';

export interface NavAction {
  navId: NavSectionId;
  filterZone?: FilterId;
  searchHint?: string;
  targetElementId?: string;
}

interface DropdownItem {
  label: string;
  action: NavAction;
}

interface NavMenuItem {
  id: NavSectionId;
  label: string;
  action?: NavAction;
  items?: DropdownItem[];
}

const NAV_ITEMS: NavMenuItem[] = [
  {
    id: 'home',
    label: 'HOME',
    action: { navId: 'home', targetElementId: 'hero-atrium' },
  },
  {
    id: 'discover',
    label: 'DISCOVER',
    action: { navId: 'discover', targetElementId: 'discover-architecture' },
  },
  {
    id: 'brands',
    label: 'BRANDS',
    action: {
      navId: 'brands',
      filterZone: 'all',
      targetElementId: 'exhibition-catalogue',
    },
  },
  {
    id: 'shopping',
    label: 'SHOPPING',
    items: [
      {
        label: 'Fashion',
        action: {
          navId: 'shopping',
          filterZone: 'fashion',
          targetElementId: 'zone-fashion',
        },
      },
      {
        label: 'Footwear',
        action: {
          navId: 'shopping',
          filterZone: 'footwear',
          targetElementId: 'zone-footwear',
        },
      },
      {
        label: 'Jewellery & Watches',
        action: {
          navId: 'shopping',
          filterZone: 'jewellery',
          targetElementId: 'zone-jewellery',
        },
      },
      {
        label: 'Beauty & Lifestyle',
        action: {
          navId: 'shopping',
          filterZone: 'beauty',
          targetElementId: 'zone-beauty',
        },
      },
      {
        label: 'Electronics',
        action: {
          navId: 'shopping',
          filterZone: 'supermarket',
          targetElementId: 'zone-supermarket',
        },
      },
      {
        label: 'Toys & Kids',
        action: {
          navId: 'shopping',
          filterZone: 'supermarket',
          targetElementId: 'zone-supermarket',
        },
      },
    ],
  },
  {
    id: 'dining',
    label: 'DINING',
    items: [
      {
        label: 'Restaurants',
        action: {
          navId: 'dining',
          filterZone: 'dining',
          targetElementId: 'zone-dining',
        },
      },
      {
        label: 'Food Court',
        action: {
          navId: 'dining',
          filterZone: 'dining',
          targetElementId: 'zone-dining',
        },
      },
      {
        label: 'Cafes',
        action: {
          navId: 'dining',
          filterZone: 'dining',
          targetElementId: 'zone-dining',
        },
      },
      {
        label: 'Fine Dining',
        action: {
          navId: 'dining',
          filterZone: 'dining',
          targetElementId: 'zone-dining',
        },
      },
    ],
  },
  {
    id: 'entertainment',
    label: 'ENTERTAINMENT',
    items: [
      {
        label: 'Cinema',
        action: {
          navId: 'entertainment',
          filterZone: 'cinema',
          targetElementId: 'zone-cinema',
        },
      },
      {
        label: 'Gaming & Arcade',
        action: {
          navId: 'entertainment',
          filterZone: 'cinema',
          targetElementId: 'zone-cinema',
        },
      },
      {
        label: 'Kids Play Zone',
        action: {
          navId: 'entertainment',
          targetElementId: 'events-experiences',
        },
      },
    ],
  },
  {
    id: 'whats-on',
    label: "WHAT'S ON",
    items: [
      {
        label: 'Events',
        action: {
          navId: 'whats-on',
          targetElementId: 'events-experiences',
        },
      },
      {
        label: 'Offers & Promotions',
        action: {
          navId: 'whats-on',
          targetElementId: 'events-experiences',
        },
      },
      {
        label: 'Gift Cards',
        action: {
          navId: 'whats-on',
          targetElementId: 'destination-footer',
        },
      },
    ],
  },
  {
    id: 'visit-us',
    label: 'VISIT US',
    items: [
      {
        label: 'Mall Map',
        action: {
          navId: 'visit-us',
          targetElementId: 'discover-architecture',
        },
      },
      {
        label: 'Floor Directory',
        action: {
          navId: 'visit-us',
          targetElementId: 'discover-architecture',
        },
      },
      {
        label: 'Parking',
        action: {
          navId: 'visit-us',
          targetElementId: 'destination-footer',
        },
      },
      {
        label: 'Mall Services',
        action: {
          navId: 'visit-us',
          targetElementId: 'destination-footer',
        },
      },
      {
        label: 'Contact Us',
        action: {
          navId: 'visit-us',
          targetElementId: 'destination-footer',
        },
      },
    ],
  },
];

interface NavbarProps {
  activeNav: NavSectionId;
  onNavigate: (action: NavAction) => void;
}

export function Navbar({ activeNav, onNavigate }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<NavSectionId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<NavSectionId | null>(
    'shopping'
  );
  const closeTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

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

  const handleMouseEnter = (id: NavSectionId, hasItems: boolean) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (hasItems) {
      setOpenDropdown(id);
    } else {
      setOpenDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 140);
  };

  const triggerAction = (action: NavAction) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(action);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 h-14 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#DED5C7]"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Left Logo */}
        <a
          href="#hero-atrium"
          onClick={(e) => {
            e.preventDefault();
            triggerAction({ navId: 'home', targetElementId: 'hero-atrium' });
          }}
          className="font-serif text-lg sm:text-xl font-semibold tracking-[0.12em] text-[#1A1816] whitespace-nowrap shrink-0"
        >
          CITY MALL
        </a>

        {/* Right Compact Desktop Navigation — Exactly 8 Items */}
        <nav
          aria-label="CITY MALL Navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0"
          onMouseLeave={handleMouseLeave}
        >
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.items && item.items.length > 0);
            const isOpen = openDropdown === item.id;
            const isActive = activeNav === item.id;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id, hasDropdown)}
              >
                <button
                  type="button"
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  aria-haspopup={hasDropdown ? 'menu' : undefined}
                  onClick={() => {
                    if (item.action) {
                      triggerAction(item.action);
                    } else if (hasDropdown) {
                      setOpenDropdown(isOpen ? null : item.id);
                    }
                  }}
                  className={`inline-flex items-center gap-1 py-1.5 text-[11px] xl:text-xs tracking-[0.14em] uppercase font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
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
                </button>

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
                      {item.items.map((sub) => (
                        <button
                          key={sub.label}
                          role="menuitem"
                          type="button"
                          onClick={() => triggerAction(sub.action)}
                          className="w-full text-left px-4 py-2 text-xs tracking-[0.06em] text-[#2F2A24] hover:bg-[#EFEAE1] hover:text-[#9A7B4F] transition-colors cursor-pointer"
                        >
                          {sub.label}
                        </button>
                      ))}
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
              const isActive = activeNav === item.id;

              return (
                <div key={item.id} className="border-b border-[#E5DDD0] py-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (item.action) {
                        triggerAction(item.action);
                      } else if (hasDropdown) {
                        setMobileExpanded(isExpanded ? null : item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between py-2.5 text-xs tracking-[0.16em] uppercase font-medium cursor-pointer ${
                      isActive ? 'text-[#9A7B4F]' : 'text-[#1A1816]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#9A7B4F]' : ''
                        }`}
                      />
                    )}
                  </button>

                  {hasDropdown && isExpanded && item.items && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.items.map((sub) => (
                        <button
                          key={sub.label}
                          type="button"
                          onClick={() => triggerAction(sub.action)}
                          className="w-full text-left py-2 text-sm text-[#4A433B] hover:text-[#9A7B4F] transition-colors cursor-pointer"
                        >
                          {sub.label}
                        </button>
                      ))}
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
