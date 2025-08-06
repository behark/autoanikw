import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { MediaItem as MediaItemType, formatFileSize, isImageFile } from '../../../types/media';
import adminAPI from '../../../services/adminAPI';

interface MediaItemProps {
  media: MediaItemType;
  isSelected: boolean;
  onSelect: (media: MediaItemType) => void;
  onDelete: (media: MediaItemType) => void;
  onEdit: (media: MediaItemType) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  media,
  isSelected,
  onSelect,
  onDelete,
  onEdit
}) => {
  const { t } = useTranslation('common');
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDelete = async () => {
    try {
      await adminAPI.deleteMedia(media._id);
      onDelete(media);
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(media.url);
    // Could add a toast notification here
  };

  const isImage = isImageFile(media.mimeType);
  
  return (
    <div 
      className={`relative group rounded-lg overflow-hidden shadow-sm border transition-all
      ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:shadow-md'}`}
      onClick={() => onSelect(media)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 z-10 bg-blue-500 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Media preview */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {isImage ? (
          <img 
            src={media.thumbnailUrl || media.url} 
            alt={media.altText || media.filename}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl mb-2">
              {media.mimeType === 'application/pdf' ? '📄' : '📁'}
            </span>
            <span className="text-xs text-gray-600 truncate max-w-full">
              {media.filename}
            </span>
          </div>
        )}
      </div>
      
      {/* Media info */}
      <div className="p-2">
        <h4 className="text-sm font-medium truncate" title={media.originalFilename}>
          {media.originalFilename}
        </h4>
        <p className="text-xs text-gray-600">
          {formatFileSize(media.filesize)}
        </p>
      </div>

      {/* Actions overlay */}
      {showActions && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(media);
              }}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
              title={t('admin.mediaLibrary.imageActions.edit')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopyUrl();
              }}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
              title={t('admin.mediaLibrary.imageDetails.copyUrl')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-2 bg-white rounded-full hover:bg-red-100"
              title={t('admin.mediaLibrary.imageActions.delete')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-2">
              {t('admin.mediaLibrary.confirmDelete.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('admin.mediaLibrary.confirmDelete.message')}
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800"
              >
                {t('admin.mediaLibrary.confirmDelete.cancel')}
              </button>
              <button 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  handleDelete();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
              >
                {t('admin.mediaLibrary.confirmDelete.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaItem;
