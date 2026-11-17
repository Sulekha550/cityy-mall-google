import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { MAIN_NAV_LINKS } from '../utilities/navigationData';
import { useTheme } from '../utilities/themeContext';

export function Navbar() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShoppingOpen, setMobileShoppingOpen] = useState(false);
  const headerRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const isActiveLink = (item) => {
    if (item.to === '/') return pathname === '/';
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 h-14 border-b border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#FBF4EB]/92 dark:bg-[#151021]/92 backdrop-blur-md transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Zone 1: Clean Single Wordmark */}
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-[0.08em] text-[#1B1325] dark:text-[#F6EFE7] whitespace-nowrap shrink-0"
        >
          CITY MALL
        </Link>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6"
          onMouseLeave={() => {
            closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 160);
          }}
        >
          {MAIN_NAV_LINKS.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const active = isActiveLink(item);
            const dropdownVisible = openDropdown === item.id;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                  setOpenDropdown(hasChildren ? item.id : null);
                }}
              >
                <Link
                  to={item.to}
                  className={`inline-flex items-center gap-1 py-1.5 text-[13px] font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                    active || dropdownVisible
                      ? 'text-[#C9523C] dark:text-[#F48C74] border-[#C9523C] dark:border-[#F48C74]'
                      : 'text-[#433754] dark:text-[#D8CEE9] border-transparent hover:text-[#1B1325] dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownVisible ? 'rotate-180' : 'opacity-70'
                      }`}
                    />
                  )}
                </Link>

                {hasChildren && dropdownVisible && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full pt-2 w-56 z-50"
                  >
                    <div className="bg-[#FFFBF6] dark:bg-[#1D1630] border border-[#2D1D48]/16 dark:border-[#E2D4FF]/16 shadow-xl py-1.5">
                      {item.children.map((sub) => {
                        const subActive = pathname === sub.to;
                        return (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            role="menuitem"
                            className={`block px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                              subActive
                                ? 'bg-[#EFE6FA] dark:bg-[#2B2145] text-[#683BA4] dark:text-[#BFA1FF]'
                                : 'text-[#1B1325] dark:text-[#F6EFE7] hover:bg-[#FDE8DF]/70 dark:hover:bg-[#261D3D]'
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

        {/* Zone 3: Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#2D1D48]/20 dark:border-[#E2D4FF]/25 bg-[#EFE6FA]/80 dark:bg-[#241B3B] text-[#1B1325] dark:text-[#F6EFE7] hover:border-[#C9523C] dark:hover:border-[#F48C74] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#F0B97A]" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#683BA4]" />
                <span>Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 border border-[#2D1D48]/18 dark:border-[#E2D4FF]/22 text-[#1B1325] dark:text-[#F6EFE7] cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-50 bg-[#FBF4EB] dark:bg-[#151021] border-t border-[#2D1D48]/15 dark:border-[#E2D4FF]/15 overflow-y-auto px-5 py-6">
          <nav aria-label="Mobile Navigation" className="space-y-1">
            {MAIN_NAV_LINKS.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const active = isActiveLink(item);
              return (
                <div
                  key={item.id}
                  className="border-b border-[#2D1D48]/10 dark:border-[#E2D4FF]/10 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 py-2 text-sm font-medium ${
                        active
                          ? 'text-[#C9523C] dark:text-[#F48C74]'
                          : 'text-[#1B1325] dark:text-[#F6EFE7]'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label="Toggle Shopping Categories"
                        onClick={() => setMobileShoppingOpen((prev) => !prev)}
                        className="p-2 text-[#433754] dark:text-[#D8CEE9] cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileShoppingOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && mobileShoppingOpen && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-1.5 text-sm ${
                            pathname === sub.to
                              ? 'text-[#683BA4] dark:text-[#BFA1FF] font-semibold'
                              : 'text-[#433754] dark:text-[#D8CEE9]'
                          }`}
                        >
                          {sub.label}
                        </Link>
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
