import React, { useState } from 'react';
import { FaSearch, FaCar, FaStar, FaArrowRight, FaCheck } from 'react-icons/fa';
import { BsChevronCompactDown } from 'react-icons/bs';

interface SearchFilterProps {
  title: string;
  options: string[];
  placeholder?: string;
  isDropdown?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ title, options, placeholder, isDropdown = true }) => {
  const id = `filter-${title.toLowerCase().replace(/\s/g, '-')}`;
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block text-xs font-semibold mb-1 text-gray-800">{title}</label>
      {isDropdown ? (
        <select 
          id={id}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          aria-label={`Select ${title}`}
        >
          <option value="">{placeholder || `Select ${title}`}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input 
          id={id}
          type="text" 
          placeholder={placeholder || title}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          aria-label={placeholder || title}
        />
      )}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'used'>('all');
  
  return (
    <section className="relative overflow-hidden text-white" aria-labelledby="hero-heading">
      {/* Hero background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" 
           aria-hidden="true" />
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        aria-hidden="true"
        role="img"
        aria-label="Luxury car background image"
      />
      
      <div className="container mx-auto px-4 pt-32 pb-16 md:py-48 relative z-20">
        {/* Main hero content */}
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-6 animate-fadeIn">
            Premium Vehicle Selection
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slideUp">
            Exceptional Vehicles <br className="hidden md:block" />
            <span className="text-primary-400">for Exceptional People</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-8 animate-slideUp animation-delay-100">
            Discover premium quality vehicles with AutoAni's curated selection and exceptional service.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-slideUp animation-delay-200">
            <a 
              href="/vehicles" 
              className="group bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 flex items-center gap-2"
            >
              View Our Inventory
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="/about" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium py-3 px-8 rounded-md transition-all duration-300 backdrop-blur-sm"
            >
              About Us
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 md:gap-10 text-sm animate-fadeIn animation-delay-300">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded-full">
                <FaCheck className="text-primary-400 h-3 w-3" />
              </span>
              <span>Premium Selection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded-full">
                <FaCheck className="text-primary-400 h-3 w-3" />
              </span>
              <span>Expert Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded-full">
                <FaCheck className="text-primary-400 h-3 w-3" />
              </span>
              <span>Financing Options</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search panel */}
      <div className="relative z-30 container mx-auto px-4 -mt-8 md:-mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6 animate-slideUp animation-delay-400">
          {/* Search tabs */}
          <div 
            className="flex flex-wrap border-b border-gray-200 mb-6"
            role="tablist"
            aria-label="Vehicle search categories"
          >
            <button 
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-4 font-medium mr-6 ${activeTab === 'all' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400 transition-colors'}`}
              role="tab"
              aria-selected={activeTab === 'all'}
              aria-controls="all-vehicles-panel"
              id="all-vehicles-tab"
              tabIndex={activeTab === 'all' ? 0 : -1}
            >
              All Vehicles
            </button>
            <button 
              onClick={() => setActiveTab('new')}
              className={`pb-4 px-4 font-medium mr-6 ${activeTab === 'new' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400 transition-colors'}`}
              role="tab"
              aria-selected={activeTab === 'new'}
              aria-controls="new-arrivals-panel"
              id="new-arrivals-tab"
              tabIndex={activeTab === 'new' ? 0 : -1}
            >
              New Arrivals
            </button>
            <button 
              onClick={() => setActiveTab('used')}
              className={`pb-4 px-4 font-medium ${activeTab === 'used' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400 transition-colors'}`}
              role="tab"
              aria-selected={activeTab === 'used'}
              aria-controls="special-offers-panel"
              id="special-offers-tab"
              tabIndex={activeTab === 'used' ? 0 : -1}
            >
              Special Offers
            </button>
          </div>
          
          {/* Search filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <SearchFilter 
              title="Make" 
              options={['BMW', 'Mercedes', 'Audi', 'Porsche', 'Tesla']} 
              placeholder="All Makes"
            />
            <SearchFilter 
              title="Model" 
              options={['X5', 'E-Class', 'A6', '911', 'Model S']} 
              placeholder="All Models"
            />
            <SearchFilter 
              title="Price Range" 
              options={['$0 - $10,000', '$10,000 - $20,000', '$20,000 - $50,000', '$50,000+']} 
              placeholder="Any Price"
            />
            <SearchFilter 
              title="Keywords" 
              options={[]} 
              placeholder="Search by keywords"
              isDropdown={false}
            />
            <div className="flex-none">
              <label className="block text-xs font-semibold mb-1 opacity-0" aria-hidden="true">Search</label>
              <button 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Search for vehicles"
                id="vehicle-search-button"
                type="submit"
              >
                <FaSearch className="inline mr-2" aria-hidden="true" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-0 right-0 z-20 justify-center animate-bounce hidden md:flex">
        <BsChevronCompactDown className="text-white h-8 w-8" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HeroSection;
