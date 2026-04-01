import { Business, Review } from '../types';

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Commercial Bank of Ethiopia',
    category: 'Banks',
    description: 'The largest commercial bank in Ethiopia, providing diverse financial services.',
    location: 'Churchill Road, Addis Ababa',
    rating: 4.2,
    reviewCount: 1250,
    image: 'https://images.unsplash.com/photo-1541354346786-a7406485ff39?auto=format&fit=crop&q=80&w=800',
    verified: true,
    phone: '+251 11 551 5004'
  },
  {
    id: '2',
    name: 'Tomoca Coffee',
    category: 'Cafes',
    description: 'The first coffee roasting company in Ethiopia, established in 1953.',
    location: 'Piazza, Addis Ababa',
    rating: 4.8,
    reviewCount: 850,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9e99553b-30f0-4e4b-84f2-5d7e53442c4d/ethiopian-cafe-category-94202514-1775071407694.webp',
    verified: true,
    phone: '0911223344'
  },
  {
    id: '3',
    name: 'Sunshine Real Estate',
    category: 'Real Estate',
    description: 'Premier real estate developer in Addis Ababa offering luxury apartments and villas.',
    location: 'Bole, Addis Ababa',
    rating: 4.5,
    reviewCount: 320,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9e99553b-30f0-4e4b-84f2-5d7e53442c4d/business-real-estate-category-76df9b4d-1775071400841.webp',
    verified: true,
    phone: '+251 11 661 3322'
  },
  {
    id: '4',
    name: 'Ride Transport',
    category: 'Transport',
    description: 'Leading ride-hailing service in Ethiopia connecting passengers with safe rides.',
    location: 'All Addis Ababa',
    rating: 4.6,
    reviewCount: 2100,
    image: 'https://images.unsplash.com/photo-1549813067-12a020954082?auto=format&fit=crop&q=80&w=800',
    verified: true,
    phone: '8294'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    businessId: '2',
    userName: 'Abebe Kebede',
    rating: 5,
    comment: 'The best macchiato in town! Authentic Ethiopian coffee experience.',
    date: '2023-10-24',
    likes: 12
  },
  {
    id: 'r2',
    businessId: '1',
    userName: 'Selam Tesfaye',
    rating: 4,
    comment: 'Services are improving, digital banking is quite helpful now.',
    date: '2023-11-05',
    likes: 5
  }
];