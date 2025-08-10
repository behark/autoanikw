import React from 'react';

// Skeleton loader for vehicle cards
export const VehicleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="bg-neutral-200 h-48 w-full"></div>
      
      {/* Content area */}
      <div className="p-4">
        {/* Title placeholder */}
        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
        
        {/* Price placeholder */}
        <div className="h-5 bg-neutral-200 rounded w-1/3 mb-4"></div>
        
        {/* Features placeholders */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-4 bg-neutral-200 rounded w-16"></div>
          ))}
        </div>
        
        {/* Button placeholder */}
        <div className="h-10 bg-neutral-200 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

// Grid of vehicle card skeletons
export const VehicleGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(count).fill(0).map((_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Skeleton for text content
export const TextSkeleton: React.FC<{ lines?: number, width?: string }> = ({ 
  lines = 3,
  width = 'w-full'
}) => {
  return (
    <div className="animate-pulse space-y-2">
      {Array(lines).fill(0).map((_, index) => (
        <div 
          key={index} 
          className={`h-4 bg-neutral-200 rounded ${width} ${index === lines - 1 ? 'w-2/3' : ''}`}
        ></div>
      ))}
    </div>
  );
};

// Circular spinner for button loading states
export const Spinner: React.FC<{ size?: string, color?: string }> = ({ 
  size = 'w-5 h-5', 
  color = 'text-white' 
}) => {
  return (
    <svg 
      className={`animate-spin ${size} ${color}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

// Full page loading overlay
export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="w-12 h-12" color="text-primary-600" />
        <p className="mt-4 text-primary-800 font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Loading button state
export const LoadingButton: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ isLoading, children, className = '', onClick }) => {
  return (
    <button
      className={`relative ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  );
};
