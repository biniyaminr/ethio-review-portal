export type Category = 'Banks' | 'Cafes' | 'Software' | 'Real Estate' | 'Import/Export' | 'Retail' | 'Hospitality' | 'Transport';

export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  verified: boolean;
  phone: string;
  website?: string;
}

export interface Review {
  id: string;
  businessId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  likes: number;
}