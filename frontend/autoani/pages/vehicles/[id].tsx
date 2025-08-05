import { useRouter } from 'next/router';
import Head from 'next/head';
import MainLayout from '../../src/components/layout/MainLayout';
import { useState, useEffect } from 'react';
import { FaGasPump, FaTachometerAlt, FaCog, FaCalendarAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// Mock data - in a real app, you would fetch this from an API
const vehiclesData = {
  '1': {
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
    description: 'This beautiful Mercedes-Benz E-Class is in excellent condition with low mileage. Featuring premium leather seats, advanced navigation system, and a smooth automatic transmission, this luxury sedan is perfect for both city commuting and long drives.',
    features: [
      'Premium leather seats',
      'Advanced navigation system',
      'Panoramic sunroof',
      'Adaptive cruise control',
      'Heated and ventilated seats',
      'Premium sound system'
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618843479710-9973f4172098?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618843479428-f3de1171483e?q=80&w=600&auto=format&fit=crop',
    ]
  },
  '2': {
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
    description: 'This luxurious BMW 5 Series offers the perfect blend of performance and comfort. With its powerful diesel engine and sophisticated design, this vehicle delivers an exceptional driving experience along with premium features throughout.',
    features: [
      'Sport package',
      'Executive trim',
      'Digital dashboard',
      'Harman Kardon sound system',
      'Lane departure warning',
      'Parking assistant'
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?q=80&w=600&auto=format&fit=crop',
    ]
  },
  '3': {
    id: '3',
    title: 'Audi A6',
    price: 37500,
    year: 2021,
    mileage: 18000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=600&auto=format&fit=crop',
    brand: 'Audi',
    condition: 'Like New',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    description: 'This Audi A6 offers a perfect blend of technology, comfort, and performance. With its sleek design and advanced features, this vehicle represents the pinnacle of German engineering excellence, making every drive a pleasure.',
    features: [
      'Virtual cockpit',
      'MMI Navigation plus',
      'Bang & Olufsen sound system',
      'LED headlights',
      'S line exterior package',
      'Quattro all-wheel drive'
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603584173233-717295304976?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603584173189-5486874fccf8?q=80&w=600&auto=format&fit=crop',
    ]
  }
};

export default function VehicleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch from an API here
    if (id && typeof id === 'string' && vehiclesData[id]) {
      setVehicle(vehiclesData[id]);
      setActiveImage(vehiclesData[id].image);
      setIsLoading(false);
    } else if (id) {
      // Vehicle not found
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-32">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-80 bg-gray-300 rounded mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-40 bg-gray-300 rounded mb-6"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-3xl font-bold mb-6">Vehicle Not Found</h1>
          <p>Sorry, the vehicle you're looking for doesn't exist or has been removed.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>{vehicle.title} | AutoAni Luxury Vehicles</title>
        <meta name="description" content={`${vehicle.year} ${vehicle.title} - ${vehicle.condition} condition with ${vehicle.mileage.toLocaleString()} miles. Available at AutoAni Luxury Vehicles.`} />
        <meta property="og:title" content={`${vehicle.title} | AutoAni Luxury Vehicles`} />
        <meta property="og:description" content={`${vehicle.year} ${vehicle.title} - ${vehicle.condition} condition with ${vehicle.mileage.toLocaleString()} miles.`} />
        <meta property="og:image" content={vehicle.image} />
      </Head>

      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="rounded-lg overflow-hidden shadow-lg mb-4 aspect-w-16 aspect-h-10 bg-neutral-100">
              <img 
                src={activeImage} 
                alt={vehicle.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div 
                onClick={() => setActiveImage(vehicle.image)}
                className={`cursor-pointer rounded overflow-hidden aspect-w-3 aspect-h-2 ${activeImage === vehicle.image ? 'ring-2 ring-primary-500' : ''}`}
              >
                <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-cover" />
              </div>
              
              {vehicle.additionalImages.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`cursor-pointer rounded overflow-hidden aspect-w-3 aspect-h-2 ${activeImage === img ? 'ring-2 ring-primary-500' : ''}`}
                >
                  <img src={img} alt={`${vehicle.title} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Details */}
          <div>
            <h1 className="text-4xl font-bold text-neutral-800">{vehicle.title}</h1>
            
            <div className="mt-2 flex items-center">
              <span className="text-xl font-bold text-primary-600">${vehicle.price.toLocaleString()}</span>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaCalendarAlt className="text-primary-500 mr-2" />
                <span>Year: <strong>{vehicle.year}</strong></span>
              </div>
              <div className="flex items-center">
                <FaTachometerAlt className="text-primary-500 mr-2" />
                <span>Mileage: <strong>{vehicle.mileage.toLocaleString()} miles</strong></span>
              </div>
              <div className="flex items-center">
                <FaGasPump className="text-primary-500 mr-2" />
                <span>Fuel: <strong>{vehicle.fuelType}</strong></span>
              </div>
              <div className="flex items-center">
                <FaCog className="text-primary-500 mr-2" />
                <span>Transmission: <strong>{vehicle.transmission}</strong></span>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-3">Description</h2>
              <p className="text-neutral-600">{vehicle.description}</p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-3">Features</h2>
              <ul className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Form */}
            <div className="mt-8 bg-neutral-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Interested in this vehicle?</h2>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-primary-500" />
                  <span className="font-medium">Call us: <a href="tel:+15551234567" className="text-primary-600 hover:underline">+1 (555) 123-4567</a></span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary-500" />
                  <span className="font-medium">Email us: <a href="mailto:sales@autoani.com" className="text-primary-600 hover:underline">sales@autoani.com</a></span>
                </div>
                
                <div className="mt-4">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors">
                    Request More Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
