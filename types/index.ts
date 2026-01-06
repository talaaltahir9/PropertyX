export type PropertyType = 'House' | 'Apartment' | 'Plot';
export type PropertyStatus = 'Rent' | 'Sale';

export interface Property {
    id: number; // Keeping number for mock data, will be string/UUID for Supabase later
    title: string;
    price: number;
    location: string; // e.g., "Downtown, New York"
    city: string;
    type: PropertyType;
    status: PropertyStatus;
    images: string[];
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: number; // sq ft
    features: string[]; // Added for extra detail
    created_at: string;
}

export interface FilterState {
    location: string;
    minPrice: number | null;
    maxPrice: number | null;
    type: PropertyType | 'All';
    status: PropertyStatus | 'All';
    bedrooms: number | 'Any';
    sort?: string;
}
