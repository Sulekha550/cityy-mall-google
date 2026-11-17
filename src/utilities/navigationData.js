export const MAIN_NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'discover', label: 'Discover', to: '/discover' },
  { id: 'brands', label: 'Brands', to: '/brands' },
  {
    id: 'shopping',
    label: 'Shopping',
    to: '/shopping',
    children: [
      { label: 'All Shopping', to: '/shopping' },
      { label: 'Fashion & Apparel', to: '/shopping/fashion' },
      { label: 'Footwear & Sportswear', to: '/shopping/footwear' },
      { label: 'Jewellery & Watches', to: '/shopping/jewellery' },
      { label: 'Beauty & Lifestyle', to: '/shopping/beauty' },
      { label: 'Supermarket & Retail', to: '/shopping/supermarket' },
    ],
  },
  { id: 'dining', label: 'Dining', to: '/dining' },
  { id: 'entertainment', label: 'Entertainment', to: '/entertainment' },
  { id: 'whats-on', label: "What's On", to: '/whats-on' },
  { id: 'visit-us', label: 'Visit Us', to: '/visit-us' },
];
