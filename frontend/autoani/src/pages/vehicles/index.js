import React, { useState, useEffect } from 'react';
import MainLayout from '../../src/components/layout/MainLayout';
import SeoHead from '../../src/components/seo/SeoHead';
import { LazyImage } from '../../src/components/ui/LazyImage';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  const { t } = useTranslation('common');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={vehicle.image}
          alt={vehicle.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(vehicle.price)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-neutral-900">{vehicle.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-sm text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
            {t('vehicles.vehicle.year')}: {vehicle.year}
          </span>
          <span className="text-sm text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
            {t('vehicles.vehicle.mileage', { value: vehicle.mileage.toLocaleString() })}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-neutral-600">
            {vehicle.condition} • {vehicle.transmission}
          </div>
          <a 
            href={`/vehicles/${vehicle.slug}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {t('vehicles.vehicle.details')} →
          </a>
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
  const { t } = useTranslation('common');
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
        title={t('vehicles.meta.title')}
        description={t('vehicles.meta.description')}
        keywords={t('vehicles.meta.keywords')}
        structuredData={!isLoading ? generateVehicleListingsSchema() : undefined}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('vehicles.hero.title')}</h1>
            <p className="text-xl text-neutral-300">
              {t('vehicles.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-white py-6 sticky top-0 shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-neutral-700 mb-1">{t('vehicles.filters.brand.label')}</label>
              <select
                name="brand"
                className="w-full md:w-40 py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.brand}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">{t('vehicles.filters.brand.all')}</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-neutral-700 mb-1">{t('vehicles.filters.year.label')}</label>
              <select
                name="year"
                className="w-full md:w-40 py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.year}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">{t('vehicles.filters.year.all')}</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-neutral-700 mb-1">{t('vehicles.filters.price.label')}</label>
              <select
                name="priceRange"
                className="w-full md:w-48 py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.priceRange}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">{t('vehicles.filters.price.all')}</option>
                <option value="under30k">{t('vehicles.filters.price.under30k')}</option>
                <option value="30kTo60k">{t('vehicles.filters.price.30kTo60k')}</option>
                <option value="60kTo100k">{t('vehicles.filters.price.60kTo100k')}</option>
                <option value="over100k">{t('vehicles.filters.price.over100k')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          // Loading state
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-900">Loading...</h2>
            </div>
            <VehicleGridSkeleton />
          </>
        ) : (
          <>
            {filteredVehicles.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-neutral-900">
                    {t('vehicles.listing.results', { count: filteredVehicles.length })}
                  </h2>
                  {/* Sort options would go here */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">{t('vehicles.listing.noResults')}</h2>
                <p className="text-neutral-600 mb-8">
                  Try adjusting your filters or browse our entire collection.
                </p>
                <button 
                  onClick={() => setFilters({ brand: '', year: '', priceRange: '' })}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  {t('vehicles.filters.brand.all')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
