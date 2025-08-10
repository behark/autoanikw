import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  PhotoIcon, 
  DocumentIcon, 
  TrashIcon, 
  PencilIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface MediaFile {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  tags?: string[];
  category: string;
  uploadedBy: string;
  vehicleId?: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaManagerProps {
  vehicleId?: string;
  onMediaSelect?: (media: MediaFile[]) => void;
  allowMultiple?: boolean;
  category?: string;
}

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const SUPPORTED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const MediaManager: React.FC<MediaManagerProps> = ({
  vehicleId,
  onMediaSelect,
  allowMultiple = true,
  category = 'vehicle_image'
}) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: category,
    search: '',
    vehicleId: vehicleId || ''
  });
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Fetch media files
  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...filters
      });

      const response = await fetch(`/api/admin/media?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch media');
      
      const data = await response.json();
      setMediaFiles(data.data.media);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // File upload with dropzone
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        if (vehicleId) formData.append('vehicleId', vehicleId);

        const response = await fetch('/api/admin/media/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Upload failed');
        }

        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      const newMedia = results.map(result => result.data);
      
      setMediaFiles(prev => [...newMedia, ...prev]);
      setShowUploadModal(false);
      
      // Auto-select uploaded files if in selection mode
      if (onMediaSelect) {
        setSelectedFiles(prev => allowMultiple ? [...prev, ...newMedia] : [newMedia[0]]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [category, vehicleId, onMediaSelect, allowMultiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  // Delete media file
  const deleteMedia = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete media');

      setMediaFiles(prev => prev.filter(m => m._id !== mediaId));
      setSelectedFiles(prev => prev.filter(m => m._id !== mediaId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete media');
    }
  };

  // Update media metadata
  const updateMedia = async (mediaId: string, updates: Partial<MediaFile>) => {
    try {
      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update media');

      const result = await response.json();
      setMediaFiles(prev => prev.map(m => m._id === mediaId ? result.data : m));
      setEditingMedia(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update media');
    }
  };

  // Toggle file selection
  const toggleSelection = (media: MediaFile) => {
    if (!onMediaSelect) return;

    setSelectedFiles(prev => {
      if (allowMultiple) {
        const isSelected = prev.some(f => f._id === media._id);
        return isSelected 
          ? prev.filter(f => f._id !== media._id)
          : [...prev, media];
      } else {
        return [media];
      }
    });
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="media-manager bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Media Manager</h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <CloudArrowUpIcon className="h-5 w-5" />
            Upload Files
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search files..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="vehicle_image">Vehicle Images</option>
            <option value="vehicle_document">Vehicle Documents</option>
            <option value="website_content">Website Content</option>
            <option value="banner">Banners</option>
            <option value="logo">Logos</option>
            <option value="other">Other</option>
          </select>
          <FunnelIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Files</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getInputProps()} />
              <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {uploading ? (
                <p className="text-gray-600">Uploading...</p>
              ) : isDragActive ? (
                <p className="text-blue-600">Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: Images (JPG, PNG, WebP, GIF), Documents (PDF, DOC, DOCX)
                  </p>
                  <p className="text-sm text-gray-500">Max size: 10MB per file</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media Grid */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : mediaFiles.length === 0 ? (
          <div className="text-center py-12">
            <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No media files found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mediaFiles.map((media) => {
              const isImage = SUPPORTED_IMAGE_TYPES.includes(media.mimetype);
              const isSelected = selectedFiles.some(f => f._id === media._id);

              return (
                <div
                  key={media._id}
                  className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSelection(media)}
                >
                  {/* Media Preview */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {isImage ? (
                      <img
                        src={media.thumbnailUrl || media.url}
                        alt={media.alt || media.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <DocumentIcon className="h-12 w-12 text-gray-400" />
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(media.url, '_blank');
                        }}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingMedia(media);
                        }}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMedia(media._id);
                        }}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-600 truncate" title={media.originalName}>
                      {media.originalName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(media.size)}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Media</h3>
              <button
                onClick={() => setEditingMedia(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateMedia(editingMedia._id, {
                  alt: formData.get('alt') as string,
                  caption: formData.get('caption') as string,
                  tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean)
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  name="alt"
                  defaultValue={editingMedia.alt || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <textarea
                  name="caption"
                  defaultValue={editingMedia.caption || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={editingMedia.tags?.join(', ') || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMedia(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selection Actions */}
      {onMediaSelect && selectedFiles.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFiles([])}
                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Selection
              </button>
              <button
                onClick={() => onMediaSelect(selectedFiles)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Use Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
