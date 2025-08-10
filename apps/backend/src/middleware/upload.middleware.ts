import multer from 'multer';
import { Request } from 'express';

// Supported file types
const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
];

const SUPPORTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const ALL_SUPPORTED_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_DOCUMENT_TYPES];

// File size limits
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check if file type is supported
  if (!ALL_SUPPORTED_TYPES.includes(file.mimetype)) {
    return cb(new Error(`Unsupported file type: ${file.mimetype}. Supported types: ${ALL_SUPPORTED_TYPES.join(', ')}`));
  }

  // Check file size based on type
  const isImage = SUPPORTED_IMAGE_TYPES.includes(file.mimetype);
  const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_FILE_SIZE;
  
  // Note: This size check in fileFilter doesn't work with multer
  // We'll handle size checking in the controller or use multer's built-in limits
  
  cb(null, true);
};

// Multer configuration for memory storage (we'll upload to Cloudinary)
const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10 // Maximum 10 files for bulk upload
  },
  fileFilter
});

// Export multer instance
export const upload = multerConfig;

// Validation middleware for file uploads
export const validateFileUpload = (req: Request, res: any, next: any) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }

  // Additional validations can be added here
  next();
};

// File type validation helpers
export const isImage = (mimetype: string): boolean => {
  return SUPPORTED_IMAGE_TYPES.includes(mimetype);
};

export const isDocument = (mimetype: string): boolean => {
  return SUPPORTED_DOCUMENT_TYPES.includes(mimetype);
};

// Generate unique filename
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
};

// File size formatter
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

// Validate image dimensions (for when we need specific sizes)
export const validateImageDimensions = (
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number,
  minWidth?: number,
  minHeight?: number
): boolean => {
  if (maxWidth && width > maxWidth) return false;
  if (maxHeight && height > maxHeight) return false;
  if (minWidth && width < minWidth) return false;
  if (minHeight && height < minHeight) return false;
  return true;
};

// Error handler for multer errors
export const handleMulterError = (error: any, req: Request, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}`
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 10 files allowed.'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          message: 'Unexpected file field name.'
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'File upload error: ' + error.message
        });
    }
  }

  if (error.message.includes('Unsupported file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  next(error);
};
