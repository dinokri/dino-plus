export type OfferType = 'prodaja' | 'iznajmljivanje';

export type PropertyType = 
  | 'stan' 
  | 'kuca' 
  | 'zemljiste' 
  | 'poslovni' 
  | 'vikendica' 
  | 'turisticka';

export interface Agent {
  name: string;
  agency: string;
  phone: string;
  email: string;
  rating: number;
  experienceYears: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  offerType: OfferType;
  propertyType: PropertyType;
  price: number; // in KM
  priceSuffix?: string; // e.g. '/mjesečno'
  city: string;
  neighborhood: string;
  address?: string;
  coordinates: Coordinates;
  area: number; // m²
  landArea?: number; // m²
  rooms: number;
  bathrooms: number;
  floor?: string;
  totalFloors?: number;
  yearBuilt?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  images: string[];
  description: string;
  features: string[];
  hasParking: boolean;
  hasBalcony: boolean;
  hasElevator: boolean;
  isFurnished: boolean;
  agent: Agent;
  createdAt: string;
  isDemo: boolean;
}

export interface FilterState {
  offerType: 'sve' | OfferType;
  city: string;
  neighborhood?: string;
  propertyType: 'sve' | PropertyType;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
  rooms: number | null;
  bathrooms: number | null;
  hasParking: boolean;
  hasBalcony: boolean;
  hasElevator: boolean;
  isFurnished: boolean;
  searchQuery: string;
}

export type SortOption = 
  | 'najnovije' 
  | 'cijena-rastuce' 
  | 'cijena-opadajuce' 
  | 'kvadratura-opadajuce' 
  | 'kvadratura-rastuce';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
