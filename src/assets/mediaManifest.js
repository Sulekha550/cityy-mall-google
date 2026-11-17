import { SCENE_IMAGES } from './imageRegistry';

export const VIDEO_ASSETS = {
  mallHero: {
    src: '/videos/mall-hero.mp4',
    poster: '/posters/mall-hero.webp',
    fallbackImage: SCENE_IMAGES.home3dAtrium,
    label: 'CITY MALL Gorakhpur grand sunlit atrium promenade',
  },
  architecture: {
    src: '/videos/mall-architecture.mp4',
    poster: '/posters/mall-architecture.webp',
    fallbackImage: SCENE_IMAGES.discover3dInterior,
    label: 'Modern glass canopies, skylights, and sculpted interior walkways',
  },
  brandsStorefronts: {
    src: '/videos/brands-storefronts.mp4',
    poster: '/posters/brands-storefronts.webp',
    fallbackImage: SCENE_IMAGES.brands3dStorefronts,
    label: 'Luxury glass retail storefronts and colonnade avenue',
  },
  fashionRetail: {
    src: '/videos/fashion-retail.mp4',
    poster: '/posters/fashion-retail.webp',
    fallbackImage: SCENE_IMAGES.brandsScene2,
    label: 'Apparel boutiques, tailored wardrobes, and style showcases',
  },
  footwearSportswear: {
    src: '/videos/footwear-sportswear.mp4',
    poster: '/posters/footwear-sportswear.webp',
    fallbackImage: SCENE_IMAGES.shoppingScene2,
    label: 'Athletic performance galleries and artisan leather footwear displays',
  },
  jewelleryWatches: {
    src: '/videos/jewellery-watches.mp4',
    poster: '/posters/jewellery-watches.webp',
    fallbackImage: SCENE_IMAGES.shoppingScene3,
    label: 'Fine gold jewellery salons and precision timepiece vitrines',
  },
  beautyLifestyle: {
    src: '/videos/beauty-lifestyle.mp4',
    poster: '/posters/beauty-lifestyle.webp',
    fallbackImage: SCENE_IMAGES.shoppingScene4,
    label: 'Hair grooming lounge, beauty treatments, and ceremonial bridal art',
  },
  supermarket: {
    src: '/videos/supermarket.mp4',
    poster: '/posters/supermarket.webp',
    fallbackImage: SCENE_IMAGES.brandSpencers,
    label: 'Daily market aisles, gourmet pantry, and retail convenience',
  },
  dining: {
    src: '/videos/dining.mp4',
    poster: '/posters/dining.webp',
    fallbackImage: SCENE_IMAGES.dining3dTerrace,
    label: 'Vibrant dining salons, grill kitchens, and hospitality tables',
  },
  cinema: {
    src: '/videos/cinema.mp4',
    poster: '/posters/cinema.webp',
    fallbackImage: SCENE_IMAGES.entertainment3dDome,
    label: 'INOX Cinemas multiplex screens and evening theatrical destination',
  },
  events: {
    src: '/videos/events.mp4',
    poster: '/posters/events.webp',
    fallbackImage: SCENE_IMAGES.whatsOn3dGala,
    label: 'Seasonal atrium gatherings, festive ambiance, and showcases',
  },
  visitUsEntrance: {
    src: '/videos/visit-us-entrance.mp4',
    poster: '/posters/visit-us-entrance.webp',
    fallbackImage: SCENE_IMAGES.visitUs3dPlaza,
    label: 'Welcoming arrival plaza and entrance courtyard at CITY MALL, Gorakhpur',
  },
};

export const ARCHITECTURAL_GALLERY = [
  SCENE_IMAGES.heroCityMallAtrium,
  SCENE_IMAGES.home3dAtrium,
  SCENE_IMAGES.homeScene2,
  SCENE_IMAGES.homeScene3,
  SCENE_IMAGES.homeScene4,
  SCENE_IMAGES.discoverScene2,
  SCENE_IMAGES.discoverScene3,
  SCENE_IMAGES.discoverScene4,
  SCENE_IMAGES.brandsScene3,
  SCENE_IMAGES.brandsScene4,
  SCENE_IMAGES.diningScene2,
  SCENE_IMAGES.diningScene3,
  SCENE_IMAGES.diningScene4,
];

export const CINEMA_POSTER_ASSETS = {
  odyssey: SCENE_IMAGES.cinemaPosterOdyssey,
  heritage: SCENE_IMAGES.cinemaPosterHeritage,
  showcaseFrame: SCENE_IMAGES.brandInoxCinemas,
  domeFrame: SCENE_IMAGES.entertainment3dDome,
};
