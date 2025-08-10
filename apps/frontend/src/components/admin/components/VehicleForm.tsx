import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import MediaPicker from './MediaPicker';
import { MediaItem as MediaItemType } from '../../../types/media';

interface Vehicle {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  brand: string;
  vehicleModel: string;
  year: number;
  price: number;
  engine: string;
  fuel: string;
  mileage: number;
  power: string;
  transmission: string;
  color: string;
  features: string[];
  categories: string[];
  isNew: boolean;
  hasCustoms: boolean;
  status: 'available' | 'sold' | 'reserved';
  images?: Array<{
    url: string;
    altText?: string;
    isPrimary?: boolean;
  }>;
}

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSubmit: (vehicle: Vehicle, images: FileList | null) => void;
  onCancel: () => void;
  loading?: boolean;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, onSubmit, onCancel, loading = false }) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<Vehicle>({
    title: vehicle?.title || '',
    subtitle: vehicle?.subtitle || '',
    description: vehicle?.description || '',
    brand: vehicle?.brand || '',
    vehicleModel: vehicle?.vehicleModel || '',
    year: vehicle?.year || new Date().getFullYear(),
    price: vehicle?.price || 0,
    engine: vehicle?.engine || '',
    fuel: vehicle?.fuel || '',
    mileage: vehicle?.mileage || 0,
    power: vehicle?.power || '',
    transmission: vehicle?.transmission || '',
    color: vehicle?.color || '',
    features: vehicle?.features || [],
    categories: vehicle?.categories || [],
    isNew: vehicle?.isNew || false,
    hasCustoms: vehicle?.hasCustoms || false,
    status: vehicle?.status || 'available',
    ...(vehicle?._id && { _id: vehicle._id })
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [newFeature, setNewFeature] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<Array<{
    url: string;
    altText?: string;
    isPrimary?: boolean;
  }>>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(-1);
  const [showMediaPicker, setShowMediaPicker] = useState<boolean>(false);

  // Initialize existing images if editing a vehicle
  useEffect(() => {
    if (vehicle?.images && vehicle.images.length > 0) {
      setExistingImages(vehicle.images);
      // Find primary image index
      const primaryIndex = vehicle.images.findIndex(img => img.isPrimary);
      setPrimaryImageIndex(primaryIndex !== -1 ? primaryIndex : 0);
    }
  }, [vehicle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Include existing images and images to delete in the form data
    const vehicleDataWithImages = {
      ...formData,
      existingImages: existingImages.filter(img => !imagesToDelete.includes(img.url)),
      imagesToDelete
    };
    onSubmit(vehicleDataWithImages, images);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? Number(value) : value
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(files);
      
      // Create preview URLs for new images
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagePreviewUrls(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeExistingImage = (url: string) => {
    setImagesToDelete([...imagesToDelete, url]);
    
    // If removing the primary image, set a new one
    const imgIndex = existingImages.findIndex(img => img.url === url);
    if (imgIndex === primaryImageIndex && existingImages.length > 1) {
      const newPrimaryIndex = imgIndex === 0 ? 1 : 0;
      setPrimaryImageIndex(newPrimaryIndex);
      
      // Update existing images to reflect the new primary status
      const updatedImages = [...existingImages];
      updatedImages.forEach((img, idx) => {
        img.isPrimary = idx === newPrimaryIndex;
      });
      setExistingImages(updatedImages);
    }
  };

  const removeNewImage = (index: number) => {
    // Create a new FileList without the removed image
    const dt = new DataTransfer();
    if (images) {
      Array.from(images).forEach((file, i) => {
        if (i !== index) dt.items.add(file);
      });
      setImages(dt.files.length > 0 ? dt.files : null);
    }
    
    // Remove the preview URL
    setImagePreviewUrls(imagePreviewUrls.filter((_, i) => i !== index));
  };

  const setAsPrimaryImage = (isExisting: boolean, index: number) => {
    if (isExisting) {
      // Update existing images
      const updatedImages = existingImages.map((img, idx) => ({
        ...img,
        isPrimary: idx === index
      }));
      setExistingImages(updatedImages);
      setPrimaryImageIndex(index);
    }
    // For new images, the first one will be primary when submitted
  };

  const handleSelectFromLibrary = (selectedMedia: MediaItemType | MediaItemType[]) => {
    if (Array.isArray(selectedMedia)) {
      // Handle multiple selection
      const newImages = [...existingImages];
      
      // Add each selected media item to existing images
      selectedMedia.forEach(media => {
        if (!existingImages.some(img => img.url === media.url)) {
          newImages.push({
            url: media.url,
            altText: media.altText || '',
            isPrimary: existingImages.length === 0 && newImages.length === 1 // Set as primary if it's the first image
          });
        }
      });
      
      setExistingImages(newImages);
      
      // If we didn't have a primary image before, set the first one as primary
      if (primaryImageIndex === -1 && newImages.length > 0) {
        setPrimaryImageIndex(0);
      }
    } else {
      // Handle single selection
      if (!existingImages.some(img => img.url === selectedMedia.url)) {
        const newImages = [...existingImages, {
          url: selectedMedia.url,
          altText: selectedMedia.altText || '',
          isPrimary: existingImages.length === 0 // Set as primary if it's the first image
        }];
        
        setExistingImages(newImages);
        
        // If we didn't have a primary image before, set this as primary
        if (primaryImageIndex === -1) {
          setPrimaryImageIndex(newImages.length - 1);
        }
      }
    }
    
    setShowMediaPicker(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="text-lg font-medium text-neutral-900">
          {vehicle ? t('admin.vehicleManager.form.title') : t('admin.dashboard.quickActions.addVehicle.title')}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.title')} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder={t('admin.vehicleManager.form.placeholders.title')}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.subtitle')}
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.brand')} *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.model')} *
            </label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.year')} *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.price')} *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.mileage')}
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.engine')}
            </label>
            <input
              type="text"
              name="engine"
              value={formData.engine}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.fuelType')}
            </label>
            <select
              name="fuel"
              value={formData.fuel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select fuel type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Plugin Hybrid">Plugin Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.transmission')}
            </label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.power')}
            </label>
            <input
              type="text"
              name="power"
              value={formData.power}
              onChange={handleInputChange}
              placeholder="e.g., 300hp"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.condition')}
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('admin.vehicleManager.form.fields.description')} *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder={t('admin.vehicleManager.form.placeholders.description')}
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('admin.vehicleManager.form.fields.features')}
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder={t('admin.vehicleManager.form.placeholders.features')}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {t('admin.vehicleManager.form.buttons.add')}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('admin.vehicleManager.form.fields.categories')}
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder={t('admin.vehicleManager.form.placeholders.categories')}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {t('admin.vehicleManager.form.buttons.add')}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-800"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="ml-2 text-neutral-600 hover:text-neutral-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Vehicle Images */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-neutral-700">
              {t('admin.vehicleManager.form.fields.images')}
            </label>
            <button
              type="button"
              onClick={() => setShowMediaPicker(true)}
              className="inline-flex items-center px-3 py-1 border border-primary-300 text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd" />
                <path d="M4 6h12M4 10h12M4 14h12" />
              </svg>
              {t('admin.mediaLibrary.selectFromLibrary')}
            </button>
          </div>
          
          {/* Upload new images */}
          <div className="mt-1">
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="sr-only"
              id="vehicle-images"
            />
            <label
              htmlFor="vehicle-images"
              className="block w-full px-4 py-2 text-sm text-center text-neutral-700 border-2 border-neutral-300 border-dashed rounded-md cursor-pointer hover:border-primary-500 hover:text-primary-500"
            >
              {t('admin.vehicleManager.form.imageUploadLabel')}
            </label>
          </div>

          {/* Display image previews */}
          {(existingImages.length > 0 || imagePreviewUrls.length > 0) && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">
                {t('admin.vehicleManager.form.imagePreviewTitle')}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Existing images */}
                {existingImages.filter(img => !imagesToDelete.includes(img.url)).map((img, index) => (
                  <div key={`existing-${index}`} className="relative border rounded-md overflow-hidden group">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <img 
                        src={img.url} 
                        alt={img.altText || 'Vehicle image'} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute top-0 right-0 p-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button"
                        onClick={() => setAsPrimaryImage(true, index)}
                        className={`p-1 rounded-full ${primaryImageIndex === index ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'}`}
                        title={primaryImageIndex === index ? t('admin.vehicleManager.form.primaryImage') : t('admin.vehicleManager.form.setPrimaryImage')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <button 
                        type="button"
                        onClick={() => removeExistingImage(img.url)}
                        className="p-1 bg-white text-red-600 rounded-full hover:bg-red-100"
                        title={t('admin.vehicleManager.form.removeImage')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    {primaryImageIndex === index && (
                      <div className="absolute bottom-0 left-0 right-0 bg-yellow-500 text-white text-xs py-1 text-center">
                        {t('admin.vehicleManager.form.primaryImage')}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* New uploaded images */}
                {imagePreviewUrls.map((url, index) => (
                  <div key={`new-${index}`} className="relative border rounded-md overflow-hidden group">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <img 
                        src={url} 
                        alt={`New upload ${index + 1}`} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute top-0 right-0 p-1">
                      <button 
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="p-1 bg-white text-red-600 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        title={t('admin.vehicleManager.form.removeImage')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs py-1 text-center">
                      {t('admin.vehicleManager.form.newUpload')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status and Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('admin.vehicleManager.form.fields.status')}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="available">{t('admin.vehicleManager.status.available')}</option>
              <option value="sold">{t('admin.vehicleManager.status.sold')}</option>
              <option value="reserved">{t('admin.vehicleManager.status.reserved')}</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isNew"
              checked={formData.isNew}
              onChange={handleInputChange}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <label className="ml-2 text-sm text-neutral-700">
              {t('admin.vehicleManager.form.fields.isNew')}
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="hasCustoms"
              checked={formData.hasCustoms}
              onChange={handleInputChange}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <label className="ml-2 text-sm text-neutral-700">
              {t('admin.vehicleManager.form.fields.hasCustoms')}
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? t('common.submitting') : vehicle ? t('common.save') : t('common.create')}
          </button>
        </div>
      </form>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <MediaPicker
          onSelect={handleSelectFromLibrary}
          onClose={() => setShowMediaPicker(false)}
          multiple={true}
          selectedIds={existingImages.map(img => img.url)}
        />
      )}
    </div>
  );
};

export default VehicleForm;
