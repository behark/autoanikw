import React, { useState, useEffect } from 'react';
import { FaGasPump, FaTachometerAlt, FaCog, FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import LazyImage from '../ui/LazyImage';
import { VehicleGridSkeleton } from '../ui/LoadingStates';
import Link from 'next/link';

interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  image: string;
  brand: string;
  condition?: 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';
  fuelType?: string;
  transmission?: string;
  featured?: boolean;
  special?: boolean;
  isNew?: boolean;
}

const FEATURED_VEHICLES: Vehicle[] = [
  {
    id: '1',
    title: 'Mercedes-Benz E-Class',
    price: 42500,
    year: 2021,
    mileage: 15000,
    image: 'https://images.unsplash.com/photo-1617469767053-8a5eb08d093d?q=80&w=600&auto=format&fit=crop',
    brand: 'Mercedes-Benz',
    condition: 'Excellent',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    featured: true
  },
  {
    id: '2',
    title: 'BMW 5 Series',
    price: 39900,
    year: 2020,
    mileage: 22000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop',
    brand: 'BMW',
    condition: 'Excellent',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    special: true
  },
  {
    id: '3',
    title: 'Audi A6',
    price: 37500,
    year: 2021,
    mileage: 18000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=600&auto=format&fit=crop',
    brand: 'Audi',
    condition: 'Like New',
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '4',
    title: 'Lexus RX 350',
    price: 45000,
    year: 2022,
    mileage: 12000,
    image: 'https://images.unsplash.com/photo-1612997951749-ae9c3fffafc0?q=80&w=600&auto=format&fit=crop',
    brand: 'Lexus',
    condition: 'New',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    isNew: true
  }
];

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className="group bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 bg-neutral-100 overflow-hidden">
        <LazyImage 
          src={vehicle.image} 
          alt={vehicle.title}
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          objectFit="cover"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10 transition-all"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? 
            <FaHeart className="text-primary-500 text-lg" /> : 
            <FaRegHeart className="text-neutral-600 text-lg group-hover:text-primary-500" />}
        </button>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {vehicle.featured && (
            <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md animate-fadeIn">
              Featured
            </span>
          )}
          {vehicle.special && (
            <span className="bg-premium-DEFAULT text-white text-xs font-bold px-2 py-1 rounded-md shadow-md animate-slideDown">
              Special Offer
            </span>
          )}
          {vehicle.isNew && (
            <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded-md shadow-md animate-slideUp">
              New Arrival
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-primary-600 transition-colors">{vehicle.title}</h3>
          <div className="flex items-center">
            <FaStar className="text-primary-500 mr-1" />
            <span className="text-xs font-medium">{vehicle.condition}</span>
          </div>
        </div>
        
        <div className="text-primary-600 font-semibold text-xl mb-3">
          ${vehicle.price.toLocaleString()}
        </div>
        
        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <FaTachometerAlt className="mr-1 text-neutral-500" />
            <span>{vehicle.mileage.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <FaGasPump className="mr-1 text-neutral-500" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center">
            <FaCog className="mr-1 text-neutral-500" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-neutral-500 text-sm">{vehicle.year}</span>
          <Link 
            href={`/vehicles/${vehicle.id}`}
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium group-hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedVehicles: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Simulate data fetching with loading state
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set the vehicles from our mock data
        setVehicles(FEATURED_VEHICLES);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary-800">Featured Vehicles</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our selection of premium pre-owned vehicles, meticulously inspected and maintained to the highest standards.
          </p>
        </div>
        
        {isLoading ? (
          <VehicleGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <a 
            href="/vehicles" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            View All Vehicles
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
