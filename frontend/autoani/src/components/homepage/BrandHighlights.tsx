import React from 'react';

const BRANDS = [
  { name: 'Mercedes-Benz', logo: '/images/brands/mercedes-benz.png' },
  { name: 'BMW', logo: '/images/brands/bmw.png' },
  { name: 'Audi', logo: '/images/brands/audi.png' },
  { name: 'Lexus', logo: '/images/brands/lexus.png' },
  { name: 'Porsche', logo: '/images/brands/porsche.png' },
  { name: 'Volvo', logo: '/images/brands/volvo.png' },
];

const BrandHighlights: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Trusted Luxury Brands</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We partner with the world's most respected automotive manufacturers to bring you quality vehicles.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {BRANDS.map((brand) => (
            <div 
              key={brand.name}
              className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-full flex items-center justify-center">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/images/brand-placeholder.png';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/vehicles" 
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Browse vehicles by brand →
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandHighlights;
