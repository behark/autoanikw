import mongoose, { Document, Schema } from 'mongoose';

// Vehicle Image interface
export interface IVehicleImage {
  url: string;
  altText?: string;
  isPrimary?: boolean;
}

// Vehicle schema interface
export interface IVehicle extends Document {
  title: string;
  subtitle?: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  engine: string;
  fuel: string;
  mileage: number;
  power: string;
  transmission: string;
  color: string;
  images: IVehicleImage[];
  features: string[];
  categories: string[];
  isNew: boolean;
  hasCustoms: boolean;
  status: 'available' | 'sold' | 'reserved';
  createdAt: Date;
  updatedAt: Date;
}

// Image schema
const VehicleImageSchema = new Schema<IVehicleImage>({
  url: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: ''
  },
  isPrimary: {
    type: Boolean,
    default: false
  }
});

// Vehicle schema
const VehicleSchema = new Schema<IVehicle>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  engine: {
    type: String,
    required: [true, 'Engine is required']
  },
  fuel: {
    type: String,
    required: [true, 'Fuel type is required']
  },
  mileage: {
    type: Number,
    required: [true, 'Mileage is required']
  },
  power: {
    type: String,
    required: [true, 'Power is required']
  },
  transmission: {
    type: String,
    required: [true, 'Transmission is required']
  },
  color: {
    type: String,
    required: [true, 'Color is required']
  },
  images: [VehicleImageSchema],
  features: [{
    type: String,
    trim: true
  }],
  categories: [{
    type: String,
    trim: true
  }],
  isNew: {
    type: Boolean,
    default: false
  },
  hasCustoms: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Add text search index for search functionality
VehicleSchema.index({
  title: 'text',
  subtitle: 'text',
  description: 'text',
  brand: 'text',
  model: 'text'
});

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
