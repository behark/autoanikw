import React, { useState, useEffect } from 'react';
import MediaManager from '../MediaManager';

interface Vehicle {
  _id: string;
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  engineSize?: string;
  features: string[];
  condition: string;
  status: string;
  images: any[];
  location: string;
  vin?: string;
  licensePlate?: string;
  previousOwners?: number;
  specifications: {
    doors: number;
    seats: number;
    cylinders?: number;
    horsepower?: number;
    torque?: string;
    topSpeed?: number;
    acceleration?: string;
    fuelConsumption?: {
      city?: number;
      highway?: number;
      combined?: number;
    };
    emissions?: string;
    drivetrain?: string;
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      wheelbase?: number;
    };
  };
  seoData?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    slug?: string;
  };
  featured: boolean;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSave: (vehicle: Partial<Vehicle>) => void;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    title: '',
    description: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    originalPrice: 0,
    mileage: 0,
    fuelType: 'petrol',
    transmission: 'manual',
    bodyType: 'sedan',
    color: '',
    engineSize: '',
    features: [],
    condition: 'used',
    status: 'available',
    images: [],
    location: '',
    vin: '',
    licensePlate: '',
    previousOwners: 1,
    specifications: {
      doors: 4,
      seats: 5,
      cylinders: 4,
      horsepower: 0,
      torque: '',
      topSpeed: 0,
      acceleration: '',
      fuelConsumption: {
        city: 0,
        highway: 0,
        combined: 0
      },
      emissions: '',
      drivetrain: 'FWD',
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        wheelbase: 0
      }
    },
    seoData: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      slug: ''
    },
    featured: false,
    ...vehicle
  });

  const [showMediaManager, setShowMediaManager] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
      setFeaturesInput(vehicle.features?.join(', ') || '');
      setKeywordsInput(vehicle.seoData?.keywords?.join(', ') || '');
    }
  }, [vehicle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Vehicle],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process features and keywords
    const processedData = {
      ...formData,
      features: featuresInput.split(',').map(f => f.trim()).filter(Boolean),
      seoData: {
        ...formData.seoData,
        keywords: keywordsInput.split(',').map(k => k.trim()).filter(Boolean)
      }
    };

    onSave(processedData);
  };

  const handleMediaSelect = (selectedMedia: any[]) => {
    setFormData(prev => ({
      ...prev,
      images: selectedMedia
    }));
    setShowMediaManager(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2023 BMW X5 xDrive40i"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., BMW"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., X5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (€) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (€)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mileage (km) *
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type *
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
              <option value="lpg">LPG</option>
              <option value="cng">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmission *
            </label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="semi-automatic">Semi-Automatic</option>
              <option value="cvt">CVT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Type *
            </label>
            <select
              name="bodyType"
              value={formData.bodyType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="suv">SUV</option>
              <option value="coupe">Coupe</option>
              <option value="convertible">Convertible</option>
              <option value="wagon">Wagon</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color *
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Alpine White"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engine Size
            </label>
            <input
              type="text"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 3.0L"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="certified">Certified Pre-Owned</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="reserved">Reserved</option>
              <option value="under_inspection">Under Inspection</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tirana, Albania"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VIN
            </label>
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Vehicle Identification Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Plate
            </label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Owners
            </label>
            <input
              type="number"
              name="previousOwners"
              value={formData.previousOwners}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed description of the vehicle..."
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features (comma-separated)
          </label>
          <textarea
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Leather seats, Sunroof, GPS navigation, Bluetooth, etc."
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {formData.images?.length || 0} images selected
              </span>
              <button
                type="button"
                onClick={() => setShowMediaManager(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Select Images
              </button>
            </div>
            
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.thumbnailUrl || image.url}
                      alt={image.alt || `Vehicle image ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doors
              </label>
              <input
                type="number"
                name="specifications.doors"
                value={formData.specifications?.doors}
                onChange={handleInputChange}
                min="2"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seats
              </label>
              <input
                type="number"
                name="specifications.seats"
                value={formData.specifications?.seats}
                onChange={handleInputChange}
                min="2"
                max="9"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cylinders
              </label>
              <input
                type="number"
                name="specifications.cylinders"
                value={formData.specifications?.cylinders}
                onChange={handleInputChange}
                min="1"
                max="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horsepower (HP)
              </label>
              <input
                type="number"
                name="specifications.horsepower"
                value={formData.specifications?.horsepower}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Torque
              </label>
              <input
                type="text"
                name="specifications.torque"
                value={formData.specifications?.torque}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 450 Nm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top Speed (km/h)
              </label>
              <input
                type="number"
                name="specifications.topSpeed"
                value={formData.specifications?.topSpeed}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                0-100 km/h (seconds)
              </label>
              <input
                type="text"
                name="specifications.acceleration"
                value={formData.specifications?.acceleration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 6.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drivetrain
              </label>
              <select
                name="specifications.drivetrain"
                value={formData.specifications?.drivetrain}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="FWD">Front Wheel Drive (FWD)</option>
                <option value="RWD">Rear Wheel Drive (RWD)</option>
                <option value="AWD">All Wheel Drive (AWD)</option>
                <option value="4WD">Four Wheel Drive (4WD)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                name="specifications.weight"
                value={formData.specifications?.weight}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Data */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                name="seoData.metaTitle"
                value={formData.seoData?.metaTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="SEO optimized title for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="seoData.metaDescription"
                value={formData.seoData?.metaDescription}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description for search engine results"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="SEO keywords related to this vehicle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                name="seoData.slug"
                value={formData.seoData?.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="url-friendly-slug-for-this-vehicle"
              />
            </div>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Feature this vehicle on homepage
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
          </button>
        </div>
      </form>

      {/* Media Manager Modal */}
      {showMediaManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden mx-4">
            <MediaManager
              vehicleId={vehicle?._id}
              category="vehicle_image"
              allowMultiple={true}
              onMediaSelect={handleMediaSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleForm;
