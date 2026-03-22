export interface ProductVideo {
  src: string;
  instagramUrl: string;
}

export interface Product {
  id: string;
  label: string;
  thumbnail: { src: string; srcAvif: string; srcWebp: string; alt: string };
  video: ProductVideo;
}

export const products: Product[] = [
  {
    id: 'sweatshirt',
    label: 'Sudaderas',
    thumbnail: { src: '/assets/images/products/hoodie1.jpg', srcAvif: '/assets/images/products/hoodie1.avif', srcWebp: '/assets/images/products/hoodie1.webp', alt: 'Sudaderas deportivas de alta calidad para entrenamiento en gimnasio' },
    video: { src: '/assets/videos/products/sweatshirt.mp4', instagramUrl: 'https://www.instagram.com/reel/DP1xbFLivBj/' },
  },
  {
    id: 'tankTop',
    label: 'Camisetas Tank',
    thumbnail: { src: '/assets/images/products/sleeveless-t-shirt.jpg', srcAvif: '/assets/images/products/sleeveless-t-shirt.avif', srcWebp: '/assets/images/products/sleeveless-t-shirt.webp', alt: 'Camisetas sin mangas para entrenamiento intenso en el gimnasio' },
    video: { src: '/assets/videos/products/tank-top.mp4', instagramUrl: 'https://www.instagram.com/reel/DKIOFzZCXl4/' },
  },
  {
    id: 'tracksuit',
    label: 'Chandal',
    thumbnail: { src: '/assets/images/products/sweat-suit.jpg', srcAvif: '/assets/images/products/sweat-suit.avif', srcWebp: '/assets/images/products/sweat-suit.webp', alt: 'Chándal completo para sesiones de entrenamiento y competición' },
    video: { src: '/assets/videos/products/tracksuit.mp4', instagramUrl: 'https://www.instagram.com/reel/DJHv-4aiI7L/' },
  },
  {
    id: 'tShirt',
    label: 'Camisetas',
    thumbnail: { src: '/assets/images/products/t-shirt.jpg', srcAvif: '/assets/images/products/t-shirt.avif', srcWebp: '/assets/images/products/t-shirt.webp', alt: 'Camisetas clásicas para entrenamientos diarios de fitness' },
    video: { src: '/assets/videos/products/t-shirt.mp4', instagramUrl: 'https://www.instagram.com/reel/DA6dryjIWD8/' },
  },
  {
    id: 'straps',
    label: 'Straps',
    thumbnail: { src: '/assets/images/products/straps.jpg', srcAvif: '/assets/images/products/straps.avif', srcWebp: '/assets/images/products/straps.webp', alt: 'Straps para mejorar el agarre en levantamiento de pesas' },
    video: { src: '/assets/videos/products/straps.mp4', instagramUrl: 'https://www.instagram.com/reel/CrMDmKgoFcU/' },
  },
  {
    id: 'beltWristbands',
    label: 'Cinturon y muñequeras',
    thumbnail: { src: '/assets/images/products/belt-and-wristbands.jpg', srcAvif: '/assets/images/products/belt-and-wristbands.avif', srcWebp: '/assets/images/products/belt-and-wristbands.webp', alt: 'Cinturón y muñequeras para soporte en powerlifting y levantamiento' },
    video: { src: '/assets/videos/products/belt-and-wristbands.mp4', instagramUrl: 'https://www.instagram.com/reel/CyO0mjYI18q/' },
  },
];
