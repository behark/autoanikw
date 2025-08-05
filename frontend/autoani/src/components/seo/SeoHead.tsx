import React from 'react';
import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

const SeoHead: React.FC<SeoProps> = ({
  title = 'AutoAni | Premium Vehicle Dealership',
  description = "Discover exceptional vehicles with AutoAni's curated selection and premium service. Find your perfect luxury car today.",
  keywords = 'luxury cars, premium vehicles, auto dealer, used cars, premium dealership, AutoAni',
  ogImage = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ogUrl = 'https://autoani.com',
  canonical,
  noindex = false,
  structuredData,
  children,
}) => {
  const fullTitle = title.includes('AutoAni') ? title : `${title} | AutoAni`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title key="title">{fullTitle}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords} key="keywords" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} key="canonical" />}
      
      {/* Robots Meta Tag */}
      <meta 
        name="robots" 
        content={noindex ? 'noindex, nofollow' : 'index, follow'}
        key="robots" 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:url" content={ogUrl} key="og:url" />
      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={ogImage} key="og:image" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta property="twitter:url" content={ogUrl} key="twitter:url" />
      <meta property="twitter:title" content={fullTitle} key="twitter:title" />
      <meta property="twitter:description" content={description} key="twitter:description" />
      <meta property="twitter:image" content={ogImage} key="twitter:image" />
      
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Structured Data / Schema.org */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          key="structured-data"
        />
      )}
      
      {children}
    </Head>
  );
};

// Default schema.org structured data for organization
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'AutoAni',
    url: 'https://autoani.com',
    logo: 'https://autoani.com/logo.png',
    image: 'https://autoani.com/showroom.jpg',
    description: 'Premium vehicle dealership specializing in luxury vehicles and exceptional customer service.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Luxury Lane',
      addressLocality: 'Beverly Hills',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '34.0736',
      longitude: '118.4004',
    },
    telephone: '+1-310-555-0123',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-18:00',
    priceRange: '$$$',
    sameAs: [
      'https://www.facebook.com/autoani',
      'https://www.instagram.com/autoani',
      'https://twitter.com/autoani',
    ],
  };
};

// Schema.org structured data for vehicle listings
export const getVehicleSchema = (vehicle: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: vehicle.title,
    description: `${vehicle.year} ${vehicle.title} in ${vehicle.condition} condition with ${vehicle.mileage.toLocaleString()} miles`,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    model: vehicle.title.replace(`${vehicle.brand} `, ''),
    vehicleModelDate: vehicle.year.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'SMI',
    },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    image: vehicle.image,
  };
};

export default SeoHead;
