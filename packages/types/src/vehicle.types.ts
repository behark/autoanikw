// Vehicle Types for Admin Dashboard
import { MediaFile } from './media.types';

export interface Vehicle {
  _id: string;
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  color: string;
  engineSize?: string;
  features: string[];
  condition: VehicleCondition;
  status: VehicleStatus;
  images: MediaFile[];
  documents?: MediaFile[];
  location: string;
  vin?: string;
  licensePlate?: string;
  previousOwners?: number;
  serviceHistory?: ServiceRecord[];
  specifications: VehicleSpecifications;
  seoData?: SEOData;
  featured: boolean;
  views: number;
  inquiries: number;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum FuelType {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  LPG = 'lpg',
  CNG = 'cng'
}

export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  SEMI_AUTOMATIC = 'semi-automatic',
  CVT = 'cvt'
}

export enum BodyType {
  SEDAN = 'sedan',
  HATCHBACK = 'hatchback',
  SUV = 'suv',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  WAGON = 'wagon',
  TRUCK = 'truck',
  VAN = 'van',
  MOTORCYCLE = 'motorcycle'
}

export enum VehicleCondition {
  NEW = 'new',
  USED = 'used',
  CERTIFIED = 'certified'
}

export enum VehicleStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  RESERVED = 'reserved',
  UNDER_INSPECTION = 'under_inspection',
  DRAFT = 'draft',
  ARCHIVED = 'archived'
}

export interface VehicleSpecifications {
  doors: number;
  seats: number;
  cylinders?: number;
  horsepower?: number;
  torque?: string;
  topSpeed?: number;
  acceleration?: string; // 0-100 km/h
  fuelConsumption?: {
    city?: number;
    highway?: number;
    combined?: number;
  };
  emissions?: string;
  drivetrain?: 'FWD' | 'RWD' | 'AWD' | '4WD';
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    wheelbase?: number;
  };
}

export interface ServiceRecord {
  date: Date;
  mileage: number;
  description: string;
  cost?: number;
  serviceProvider?: string;
  documents?: MediaFile[];
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug?: string;
}

export interface CreateVehicleRequest {
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  color: string;
  engineSize?: string;
  features: string[];
  condition: VehicleCondition;
  status: VehicleStatus;
  location: string;
  vin?: string;
  licensePlate?: string;
  previousOwners?: number;
  specifications: VehicleSpecifications;
  seoData?: SEOData;
  featured?: boolean;
}

export interface UpdateVehicleRequest extends Partial<CreateVehicleRequest> {
  updatedBy: string;
}

export interface VehicleFilter {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  bodyType?: BodyType;
  condition?: VehicleCondition;
  status?: VehicleStatus;
  featured?: boolean;
  location?: string;
  search?: string;
}

export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
