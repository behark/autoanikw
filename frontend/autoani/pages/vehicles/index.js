import React, { useState, useEffect } from 'react';
import MainLayout from '../../src/components/layout/MainLayout';
import SeoHead from '../../src/components/seo/SeoHead';
import { LazyImage } from '../../src/components/ui/LazyImage';

// Mock data for vehicle listings
const VEHICLE_LISTINGS = [
  {
    id: 'v1',
    title: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2022,
    price: 89900,
    mileage: 12500,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1563720223809-b9c9c4f47d76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'mercedes-benz-s-class-2022'
  },
  {
    id: 'v2',
    title: 'BMW 7 Series',
    brand: 'BMW',
    model: '7 Series',
    year: 2021,
    price: 79900,
    mileage: 18200,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    slug: 'bmw-7-series-2021'
  },
  {
    id: 'v3',
    title: 'Audi A8',
    brand: 'Audi',
    model: 'A8',
    year: 2022,
    price: 85900,
    mileage: 9800,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'audi-a8-2022'
  },
  {
    id: 'v4',
    title: 'Porsche 911',
    brand: 'Porsche',
    model: '911',
    year: 2021,
    price: 119900,
    mileage: 7500,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1584060622420-0ad49f9d11e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'porsche-911-2021'
  },
  {
    id: 'v5',
    title: 'Range Rover Sport',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2022,
    price: 95900,
    mileage: 14200,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1536149955494-5c6411ca1cf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'range-rover-sport-2022'
  },
  {
    id: 'v6',
    title: 'Tesla Model S',
    brand: 'Tesla',
    model: 'Model S',
    year: 2022,
    price: 89900,
    mileage: 8900,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    slug: 'tesla-model-s-2022'
  }
];

// Vehicle Card Component
const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      <div className="relative h-48 w-full">
        <LazyImage
          src={vehicle.image}
          alt={vehicle.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
          ${vehicle.price.toLocaleString()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-neutral-900">{vehicle.title}</h3>
        <div className="mt-2 text-sm text-neutral-600">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
              {vehicle.year}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
              {vehicle.mileage.toLocaleString()} mi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
              {vehicle.fuelType}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <a 
            href={`/vehicles/${vehicle.slug}`}
            className="text-primary-600 hover:text-primary-800 font-semibold text-sm"
          >
            View Details
          </a>
          <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs font-medium">{vehicle.brand}</span>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton for Vehicle Cards
const VehicleCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="bg-neutral-200 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-5 bg-neutral-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
        <div className="mt-2 flex flex-wrap gap-3">
          <div className="h-3 bg-neutral-200 rounded w-12"></div>
          <div className="h-3 bg-neutral-200 rounded w-16"></div>
          <div className="h-3 bg-neutral-200 rounded w-14"></div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="h-4 bg-neutral-200 rounded w-20"></div>
          <div className="h-4 bg-neutral-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

// Grid Skeleton for Loading State
const VehicleGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default function VehiclesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    year: '',
    priceRange: ''
  });
  
  // Generate structured data for vehicle listings
  const generateVehicleListingsSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'itemListElement': vehicles.map((vehicle, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Vehicle',
          'name': vehicle.title,
          'description': `${vehicle.year} ${vehicle.title} in ${vehicle.condition} condition with ${vehicle.mileage.toLocaleString()} miles`,
          'brand': {
            '@type': 'Brand',
            'name': vehicle.brand
          },
          'modelDate': vehicle.year.toString(),
          'vehicleTransmission': vehicle.transmission,
          'fuelType': vehicle.fuelType,
          'mileageFromOdometer': {
            '@type': 'QuantitativeValue',
            'value': vehicle.mileage,
            'unitCode': 'SMI'
          },
          'offers': {
            '@type': 'Offer',
            'price': vehicle.price,
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': `https://autoani.com/vehicles/${vehicle.slug}`
          },
          'image': vehicle.image,
          'url': `https://autoani.com/vehicles/${vehicle.slug}`
        }
      }))
    };
  };
  
  // Simulate fetching data with loading state
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setVehicles(VEHICLE_LISTINGS);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVehicles();
  }, []);
  
  // Filter vehicles
  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.brand && vehicle.brand !== filters.brand) return false;
    if (filters.year && vehicle.year.toString() !== filters.year) return false;
    // Add more filters as needed
    return true;
  });
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Get unique brands for filter options
  const brands = [...new Set(VEHICLE_LISTINGS.map(v => v.brand))];
  const years = [...new Set(VEHICLE_LISTINGS.map(v => v.year))];
  
  return (
    <MainLayout>
      {/* Page-specific SEO with schema.org markup */}
      <SeoHead 
        title="Luxury Vehicles Inventory | AutoAni"
        description="Browse our exclusive collection of premium pre-owned luxury vehicles. Find your next dream car with AutoAni's curated selection."
        keywords="luxury vehicles, premium cars, pre-owned vehicles, luxury dealership, auto listings"
        structuredData={!isLoading ? generateVehicleListingsSchema() : undefined}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exceptional Vehicles</h1>
            <p className="text-xl text-neutral-300">
              Discover our handpicked collection of premium vehicles, each selected for their excellence in performance, design, and condition.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-white py-6 sticky top-0 shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Brand</label>
              <select
                name="brand"
                className="w-full md:w-40 py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.brand}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Year</label>
              <select
                name="year"
                className="w-full md:w-40 py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.year}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Price Range</label>
              <select
                name="priceRange"
                className="w-full md:w-40 py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.priceRange}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">Any Price</option>
                <option value="0-50000">Under $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000+">$100,000+</option>
              </select>
            </div>
            <button
              className="mt-4 md:mt-6 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors ml-auto"
              disabled={isLoading}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Vehicles Grid */}
      <div className="bg-neutral-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-neutral-800">
              {!isLoading ? `${filteredVehicles.length} Vehicles Available` : 'Loading Vehicles...'}
            </h2>
            <div className="flex gap-2">
              <button className="bg-white p-2 rounded-md border border-neutral-200 hover:bg-neutral-50">
                <span className="sr-only">Grid view</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-neutral-600" viewBox="0 0 16 16">
                  <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                </svg>
              </button>
              <button className="p-2 rounded-md border border-neutral-200 hover:bg-neutral-50">
                <span className="sr-only">List view</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-neutral-600" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <VehicleGridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
              {filteredVehicles.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <h3 className="text-xl font-semibold text-neutral-700">No vehicles match your filter criteria</h3>
                  <p className="text-neutral-600 mt-2">Try adjusting your filters or browse all vehicles</p>
                  <button 
                    onClick={() => setFilters({ brand: '', year: '', priceRange: '' })}
                    className="mt-4 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Pagination */}
          {!isLoading && filteredVehicles.length > 0 && (
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button className="px-4 py-2 border border-neutral-300 rounded-l-md bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 border-t border-b border-neutral-300 bg-primary-50 text-primary-700 font-medium">
                  1
                </button>
                <button className="px-4 py-2 border-t border-b border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50">
                  2
                </button>
                <button className="px-4 py-2 border border-neutral-300 rounded-r-md bg-white text-neutral-700 hover:bg-neutral-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
