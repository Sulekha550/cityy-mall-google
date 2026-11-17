import { Link } from 'react-router-dom';
import { MAIN_NAV_LINKS } from '../utilities/navigationData';
import { BRAND_CATEGORIES, MALL_IDENTITY } from '../utilities/brandsData';

export function DestinationFooter() {
  return (
    <footer className="border-t border-[#2D1D48]/14 dark:border-[#E2D4FF]/14 bg-[#EFE6FA] dark:bg-[#191326] text-[#1B1325] dark:text-[#F6EFE7] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2D1D48]/12 dark:border-[#E2D4FF]/12">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl font-bold tracking-[0.06em]">
              {MALL_IDENTITY.name}
            </p>
            <p className="text-sm font-medium text-[#683BA4] dark:text-[#BFA1FF]">
              Gorakhpur, Uttar Pradesh, India
            </p>
            <p className="text-sm leading-relaxed text-[#433754] dark:text-[#D8CEE9] max-w-md">
              A vibrant shopping, culinary, and multiplex destination in Gorakhpur uniting fashion houses, footwear outlets, fine jewellery, beauty salons, Spencer&apos;s supermarket, INOX Cinemas, and nine dining venues.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5D5070] dark:text-[#B5A7D0]">
              Explore Pages
            </p>
            <ul className="space-y-2 text-sm">
              {MAIN_NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="text-[#433754] dark:text-[#D8CEE9] hover:text-[#C9523C] dark:hover:text-[#F48C74] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5D5070] dark:text-[#B5A7D0]">
              Approved Categories
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {BRAND_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={cat.route}
                    className="text-[#433754] dark:text-[#D8CEE9] hover:text-[#0E7C71] dark:hover:text-[#5EEAD4] transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5D5070] dark:text-[#B5A7D0]">
          <span>CITY MALL, Gorakhpur, Uttar Pradesh</span>
          <span>Shopping · Dining · INOX Cinemas</span>
        </div>
      </div>
    </footer>
  );
}
