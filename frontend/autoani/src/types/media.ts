// Media item interface definition
export interface MediaItem {
  _id: string;
  filename: string;
  originalFilename: string;
  filesize: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  width?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Media response interface for API responses
export interface MediaResponse {
  success: boolean;
  data: MediaItem[] | MediaItem;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Helper function to format file size in human readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper to get the file extension
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Helper to check if a file is an image
export const isImageFile = (mimeType: string): boolean => {
  return mimeType.startsWith('image/');
};

// Helper to check if a file is a document (PDF, DOC, etc.)
export const isDocumentFile = (mimeType: string): boolean => {
  const docTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  return docTypes.includes(mimeType);
};

// Helper to get appropriate icon based on mime type
export const getFileIcon = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) {
    return '🖼️';
  } else if (mimeType === 'application/pdf') {
    return '📄';
  } else if (
    mimeType === 'application/msword' || 
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return '📝';
  } else {
    return '📁';
  }
};
