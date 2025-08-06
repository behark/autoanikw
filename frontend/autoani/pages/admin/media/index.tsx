import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminLayout from '../../../src/components/admin/layout/AdminLayout';
import MediaUploader from '../../../src/components/admin/components/MediaUploader';
import MediaItem from '../../../src/components/admin/components/MediaItem';
import { MediaItem as MediaItemType } from '../../../src/types/media';
import adminAPI from '../../../src/services/adminAPI';

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const MediaLibrary = () => {
  const { t } = useTranslation('common');
  const [media, setMedia] = useState<MediaItemType[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showUploader, setShowUploader] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

  // Fetch media on component mount
  useEffect(() => {
    fetchMedia();
  }, []);

  // Apply filters, search, and sorting whenever these values change
  useEffect(() => {
    let result = [...media];
    
    // Apply filter
    if (activeFilter === 'images') {
      result = result.filter(item => item.mimeType.startsWith('image/'));
    } else if (activeFilter === 'documents') {
      result = result.filter(item => !item.mimeType.startsWith('image/'));
    } else if (activeFilter === 'recent') {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      result = result.filter(item => new Date(item.createdAt) > oneWeekAgo);
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
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'nameAZ':
        result.sort((a, b) => a.originalFilename.localeCompare(b.originalFilename));
        break;
      case 'nameZA':
        result.sort((a, b) => b.originalFilename.localeCompare(a.originalFilename));
        break;
    }
    
    setFilteredMedia(result);
  }, [media, activeFilter, searchQuery, sortBy]);

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

  const handleMediaUploadComplete = (newMedia: MediaItemType[]) => {
    setMedia(prev => [...newMedia, ...prev]);
    setShowUploader(false);
  };

  const handleMediaSelect = (item: MediaItemType) => {
    if (selectedMedia.has(item._id)) {
      const newSelection = new Set(selectedMedia);
      newSelection.delete(item._id);
      setSelectedMedia(newSelection);
    } else {
      setSelectedMedia(new Set(selectedMedia).add(item._id));
    }
    setSelectedItem(item);
  };

  const handleMediaEdit = (item: MediaItemType) => {
    setSelectedItem(item);
  };

  const handleMediaDelete = (item: MediaItemType) => {
    setMedia(prev => prev.filter(m => m._id !== item._id));
    
    // If this was selected, remove it from selection
    if (selectedMedia.has(item._id)) {
      const newSelection = new Set(selectedMedia);
      newSelection.delete(item._id);
      setSelectedMedia(newSelection);
    }
    
    // If this was the selected item for detail view
    if (selectedItem && selectedItem._id === item._id) {
      setSelectedItem(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMedia.size === 0) return;
    
    const idsToDelete = Array.from(selectedMedia);
    try {
      await adminAPI.bulkDeleteMedia(idsToDelete);
      setMedia(prev => prev.filter(m => !selectedMedia.has(m._id)));
      setSelectedMedia(new Set());
    } catch (error) {
      console.error('Error bulk deleting media:', error);
    }
  };

  const handleClearSelection = () => {
    setSelectedMedia(new Set());
  };

  return (
    <>
      <Head>
        <title>{t('admin.mediaLibrary.pageTitle')} - {t('admin.sidebar.title')}</title>
        <meta name="description" content={t('admin.mediaLibrary.pageDescription')} />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('admin.mediaLibrary.title')}</h1>
              <p className="mt-1 text-sm text-gray-600">{t('admin.mediaLibrary.description')}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowUploader(!showUploader)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('admin.mediaLibrary.uploadMedia')}
              </button>
            </div>
          </div>

          {/* Media Uploader */}
          {showUploader && (
            <MediaUploader onUploadComplete={handleMediaUploadComplete} />
          )}

          {/* Media Count + Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-sm text-gray-600">
                {t('admin.mediaLibrary.mediaCount', { count: filteredMedia.length })}
              </p>
            </div>
            
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
              <button
                onClick={() => setActiveFilter('recent')}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'recent'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {t('admin.mediaLibrary.filters.recent')}
              </button>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
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
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{t('admin.mediaLibrary.sortBy.label')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">{t('admin.mediaLibrary.sortBy.newest')}</option>
                <option value="oldest">{t('admin.mediaLibrary.sortBy.oldest')}</option>
                <option value="nameAZ">{t('admin.mediaLibrary.sortBy.nameAZ')}</option>
                <option value="nameZA">{t('admin.mediaLibrary.sortBy.nameZA')}</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions (if any media selected) */}
          {selectedMedia.size > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h4 className="font-medium">{t('admin.mediaLibrary.bulkActions.title')}</h4>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {t('admin.mediaLibrary.bulkActions.selected', { count: selectedMedia.size })}
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleClearSelection}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
                >
                  {t('admin.mediaLibrary.confirmDelete.cancel')}
                </button>
                <button 
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  {t('admin.mediaLibrary.bulkActions.delete')}
                </button>
              </div>
            </div>
          )}

          {/* Media Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900">
                {searchQuery ? t('admin.mediaLibrary.search.noResults') : t('admin.mediaLibrary.noFilesSelected')}
              </h3>
              {!searchQuery && (
                <p className="mt-1 text-gray-600">
                  {t('admin.mediaLibrary.dragAndDrop')}
                </p>
              )}
              <button
                onClick={() => setShowUploader(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t('admin.mediaLibrary.uploadMedia')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <MediaItem
                  key={item._id}
                  media={item}
                  isSelected={selectedMedia.has(item._id)}
                  onSelect={handleMediaSelect}
                  onDelete={handleMediaDelete}
                  onEdit={handleMediaEdit}
                />
              ))}
            </div>
          )}

          {/* Media Details Panel (when a media item is selected) */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40 overflow-hidden">
              <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">
                      {t('admin.mediaLibrary.imageDetails.title')}
                    </h3>
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Media preview */}
                  <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                    {selectedItem.mimeType.startsWith('image/') ? (
                      <img
                        src={selectedItem.url}
                        alt={selectedItem.altText || selectedItem.filename}
                        className="max-h-64 max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center py-8">
                        <span className="text-5xl mb-4">
                          {selectedItem.mimeType === 'application/pdf' ? '📄' : '📁'}
                        </span>
                        <span className="text-gray-600">{selectedItem.originalFilename}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        {t('admin.mediaLibrary.imageDetails.filename')}
                      </h4>
                      <p className="text-sm break-all">{selectedItem.originalFilename}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          {t('admin.mediaLibrary.imageDetails.filesize')}
                        </h4>
                        <p className="text-sm">
                          {new Intl.NumberFormat().format(selectedItem.filesize / 1024)} KB
                        </p>
                      </div>
                      
                      {selectedItem.width && selectedItem.height && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            {t('admin.mediaLibrary.imageDetails.dimensions')}
                          </h4>
                          <p className="text-sm">
                            {selectedItem.width} x {selectedItem.height}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        {t('admin.mediaLibrary.imageDetails.uploadedOn')}
                      </h4>
                      <p className="text-sm">
                        {new Date(selectedItem.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Alt text edit field (for images) */}
                    {selectedItem.mimeType.startsWith('image/') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {t('admin.mediaLibrary.imageDetails.altText')}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            value={selectedItem.altText || ''}
                            onChange={(e) => {
                              setSelectedItem({
                                ...selectedItem,
                                altText: e.target.value
                              });
                            }}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={async () => {
                              try {
                                await adminAPI.updateMedia(selectedItem._id, {
                                  altText: selectedItem.altText
                                });
                                // Update in main media array
                                setMedia(prev => 
                                  prev.map(m => 
                                    m._id === selectedItem._id 
                                      ? { ...m, altText: selectedItem.altText }
                                      : m
                                  )
                                );
                              } catch (error) {
                                console.error('Error updating alt text:', error);
                              }
                            }}
                            className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {t('admin.mediaLibrary.imageDetails.updateAltText')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedItem.url);
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      {t('admin.mediaLibrary.imageDetails.copyUrl')}
                    </button>
                    
                    <a
                      href={selectedItem.url}
                      download={selectedItem.originalFilename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {t('admin.mediaLibrary.imageDetails.downloadOriginal')}
                    </a>
                    
                    <button
                      onClick={() => {
                        handleMediaDelete(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {t('admin.mediaLibrary.imageDetails.delete')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default MediaLibrary;
