import { Property, FilterState, SortOption } from '../types/property';

export const initialFilterState: FilterState = {
  offerType: 'sve',
  city: '',
  propertyType: 'sve',
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  rooms: null,
  bathrooms: null,
  hasParking: false,
  hasBalcony: false,
  hasElevator: false,
  isFurnished: false,
  searchQuery: '',
};

export function filterProperties(properties: Property[], filters: Partial<FilterState>): Property[] {
  return properties.filter((property) => {
    // Offer type
    if (filters.offerType && filters.offerType !== 'sve') {
      if (property.offerType !== filters.offerType) {
        return false;
      }
    }

    // City
    if (filters.city && filters.city.trim() !== '') {
      if (property.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    // Neighborhood
    if (filters.neighborhood && filters.neighborhood.trim() !== '') {
      if (!property.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
        return false;
      }
    }

    // Property type
    if (filters.propertyType && filters.propertyType !== 'sve') {
      if (property.propertyType !== filters.propertyType) {
        return false;
      }
    }

    // Min price
    if (filters.minPrice !== null && filters.minPrice !== undefined && filters.minPrice > 0) {
      if (property.price < filters.minPrice) {
        return false;
      }
    }

    // Max price
    if (filters.maxPrice !== null && filters.maxPrice !== undefined && filters.maxPrice > 0) {
      if (property.price > filters.maxPrice) {
        return false;
      }
    }

    // Min area
    if (filters.minArea !== null && filters.minArea !== undefined && filters.minArea > 0) {
      if (property.area < filters.minArea) {
        return false;
      }
    }

    // Max area
    if (filters.maxArea !== null && filters.maxArea !== undefined && filters.maxArea > 0) {
      if (property.area > filters.maxArea) {
        return false;
      }
    }

    // Rooms (exact or greater)
    if (filters.rooms !== null && filters.rooms !== undefined && filters.rooms > 0) {
      if (property.rooms < filters.rooms) {
        return false;
      }
    }

    // Bathrooms (exact or greater)
    if (filters.bathrooms !== null && filters.bathrooms !== undefined && filters.bathrooms > 0) {
      if (property.bathrooms < filters.bathrooms) {
        return false;
      }
    }

    // Features
    if (filters.hasParking && !property.hasParking) return false;
    if (filters.hasBalcony && !property.hasBalcony) return false;
    if (filters.hasElevator && !property.hasElevator) return false;
    if (filters.isFurnished && !property.isFurnished) return false;

    // Search query (title, neighborhood, city, description)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const match =
        property.title.toLowerCase().includes(q) ||
        property.city.toLowerCase().includes(q) ||
        property.neighborhood.toLowerCase().includes(q) ||
        property.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });
}

export function sortProperties(properties: Property[], sort: SortOption): Property[] {
  const sorted = [...properties];
  switch (sort) {
    case 'najnovije':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'cijena-rastuce':
      return sorted.sort((a, b) => a.price - b.price);
    case 'cijena-opadajuce':
      return sorted.sort((a, b) => b.price - a.price);
    case 'kvadratura-opadajuce':
      return sorted.sort((a, b) => b.area - a.area);
    case 'kvadratura-rastuce':
      return sorted.sort((a, b) => a.area - b.area);
    default:
      return sorted;
  }
}

export function formatPriceKM(price: number, suffix?: string): string {
  const formatted = price.toLocaleString('bs-BA');
  return `${formatted} KM${suffix ? ` ${suffix}` : ''}`;
}

export function getPropertyTypeLabel(type: Property['propertyType']): string {
  switch (type) {
    case 'stan':
      return 'Stan';
    case 'kuca':
      return 'Kuća';
    case 'zemljiste':
      return 'Zemljište';
    case 'poslovni':
      return 'Poslovni prostor';
    case 'vikendica':
      return 'Vikendica';
    case 'turisticka':
      return 'Turistička nekretnina';
    default:
      return type;
  }
}
