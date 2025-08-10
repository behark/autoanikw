import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { MediaItem as MediaItemType, isImageFile } from '../../../types/media';
import adminAPI from '../../../services/adminAPI';

interface MediaPickerProps {
  onSelect: (media: MediaItemType | MediaItemType[]) => void;
  onClose: () => void;
  multiple?: boolean;
  selectedIds?: string[];
}

const MediaPicker: React.FC<MediaPickerProps> = ({
  onSelect,
  onClose,
  multiple = false,
  selectedIds = []
}) => {
  const { t } = useTranslation('common');
  const [media, setMedia] = useState<MediaItemType[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set(selectedIds));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('images'); // Default to images only

  // Fetch media on component mount
  useEffect(() => {
    fetchMedia();
  }, []);

  // Apply filters and search whenever these values change
  useEffect(() => {
    let result = [...media];
    
    // Default filter to images only
    if (activeFilter === 'images') {
      result = result.filter(item => isImageFile(item.mimeType));
    } else if (activeFilter === 'documents') {
      result = result.filter(item => !isImageFile(item.mimeType));
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.filename.toLowerCase().includes(query) ||
          item.originalFilename.toLowerCase().includes(query) ||
          (item.altText && item.altText.toLowerCase().includes(query))
      );
    }
    
    // Sort by newest first
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredMedia(result);
  }, [media, activeFilter, searchQuery]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getMedia();
      if (response && response.media) {
        setMedia(response.media);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaClick = (mediaItem: MediaItemType) => {
    if (!multiple) {
      onSelect(mediaItem);
      onClose();
      return;
    }

    const newSelectedMedia = new Set(selectedMedia);
    
    if (newSelectedMedia.has(mediaItem._id)) {
      newSelectedMedia.delete(mediaItem._id);
    } else {
      newSelectedMedia.add(mediaItem._id);
    }
    
    setSelectedMedia(newSelectedMedia);
  };

  const handleConfirmSelection = () => {
    if (multiple) {
      const selectedItems = media.filter(item => selectedMedia.has(item._id));
      onSelect(selectedItems);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">
            {t('admin.mediaLibrary.title')}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {t('admin.mediaLibrary.filters.all')}
              </button>
              <button
                onClick={() => setActiveFilter('images')}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'images'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {t('admin.mediaLibrary.filters.images')}
              </button>
              <button
                onClick={() => setActiveFilter('documents')}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'documents'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {t('admin.mediaLibrary.filters.documents')}
              </button>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('admin.mediaLibrary.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900">
                {t('admin.mediaLibrary.search.noResults')}
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div 
                  key={item._id}
                  onClick={() => handleMediaClick(item)}
                  className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition-all
                    ${selectedMedia.has(item._id) ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:shadow-md'}`}
                >
                  {/* Selected indicator */}
                  {selectedMedia.has(item._id) && (
                    <div className="absolute top-2 left-2 z-10 bg-blue-500 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Media preview */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                    {isImageFile(item.mimeType) ? (
                      <img 
                        src={item.thumbnailUrl || item.url} 
                        alt={item.altText || item.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        <span className="text-4xl mb-2">
                          {item.mimeType === 'application/pdf' ? '📄' : '📁'}
                        </span>
                        <span className="text-xs text-gray-600 truncate max-w-full">
                          {item.filename}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Media info */}
                  <div className="p-2">
                    <h4 className="text-sm font-medium truncate" title={item.originalFilename}>
                      {item.originalFilename}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="p-4 border-t flex justify-between items-center">
          <div>
            {multiple && selectedMedia.size > 0 && (
              <span className="text-sm text-gray-600">
                {t('admin.mediaLibrary.bulkActions.selected', { count: selectedMedia.size })}
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {t('admin.mediaLibrary.confirmDelete.cancel')}
            </button>
            <button
              onClick={handleConfirmSelection}
              disabled={multiple && selectedMedia.size === 0}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                multiple && selectedMedia.size === 0 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {t('common.select')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPicker;
