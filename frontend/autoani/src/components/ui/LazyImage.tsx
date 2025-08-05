import React, { useEffect, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholderColor?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  placeholderColor = 'bg-neutral-100',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    // Skip intersection observer if the image has priority
    if (priority) return;

    let observer: IntersectionObserver;
    let canceled = false;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!canceled && entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px' }); // Start loading 200px before it enters the viewport

      const element = document.getElementById(`lazy-image-${src}`);
      if (element) {
        observer.observe(element);
      }
    } else {
      // Fallback for browsers that don't support Intersection Observer
      setIsInView(true);
    }

    return () => {
      canceled = true;
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, priority]);

  // Generate a unique ID based on the image source
  const imageId = `lazy-image-${src}`;

  return (
    <div 
      id={imageId}
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        width: width ? `${width}px` : '100%', 
        height: height ? `${height}px` : '100%' 
      }}
    >
      {/* Placeholder */}
      <div 
        className={`absolute inset-0 ${placeholderColor} ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} 
        aria-hidden="true"
      />

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${objectFit ? `object-${objectFit}` : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};

export default LazyImage;
