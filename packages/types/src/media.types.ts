// Media and File Management Types
export interface MediaFile {
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
  category: MediaCategory;
  uploadedBy: string;
  vehicleId?: string;
  metadata?: MediaMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export enum MediaCategory {
  VEHICLE_IMAGE = 'vehicle_image',
  VEHICLE_DOCUMENT = 'vehicle_document',
  USER_AVATAR = 'user_avatar',
  WEBSITE_CONTENT = 'website_content',
  BANNER = 'banner',
  LOGO = 'logo',
  OTHER = 'other'
}

export interface MediaMetadata {
  width?: number;
  height?: number;
  format?: string;
  colorSpace?: string;
  orientation?: number;
  compression?: string;
  dpi?: number;
}

export interface UploadMediaRequest {
  file: File | Buffer;
  category: MediaCategory;
  alt?: string;
  caption?: string;
  tags?: string[];
  vehicleId?: string;
}

export interface MediaUploadResponse {
  media: MediaFile;
  success: boolean;
  message?: string;
}

export interface MediaFilter {
  category?: MediaCategory;
  vehicleId?: string;
  uploadedBy?: string;
  mimetype?: string;
  search?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
}

export interface MediaListResponse {
  media: MediaFile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BulkUploadResponse {
  successful: MediaFile[];
  failed: Array<{
    filename: string;
    error: string;
  }>;
  totalUploaded: number;
  totalFailed: number;
}

// Supported file types
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
] as const;

export const SUPPORTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
