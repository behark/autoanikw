// Vehicle type definitions

export interface VehicleImage {
  url: string;
  alt?: string;
  isMain?: boolean;
}

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  features: string[];
  specifications: {
    engine?: string;
    transmission?: string;
    fuelType?: string;
    mileage?: number;
    exteriorColor?: string;
    interiorColor?: string;
  };
  status: 'available' | 'sold' | 'reserved';
  images: VehicleImage[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface VehicleResponse {
  success: boolean;
  data: Vehicle;
  message?: string;
}

export interface VehiclesResponse {
  success: boolean;
  data: Vehicle[];
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface VehicleSearchParams {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: 'available' | 'sold' | 'reserved';
  page?: number;
  limit?: number;
  sort?: string;
}
