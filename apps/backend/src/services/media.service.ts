import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  eager?: Array<{
    secure_url: string;
    width?: number;
    height?: number;
  }>;
}

// Upload file to Cloudinary with optimization
export const uploadToCloudinary = async (
  file: Express.Multer.File,
  category: string
): Promise<CloudinaryUploadResult> => {
  try {
    let fileBuffer = file.buffer;
    
    // Optimize image if it's an image file
    if (file.mimetype.startsWith('image/')) {
      try {
        fileBuffer = await sharp(file.buffer)
          .resize(2000, 2000, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .jpeg({ 
            quality: 85,
            progressive: true 
          })
          .toBuffer();
      } catch (sharpError) {
        console.warn('Sharp optimization failed, using original file:', sharpError);
        fileBuffer = file.buffer;
      }
    }

    const uploadOptions: any = {
      folder: `autoanikw/${category}`,
      resource_type: 'auto',
      quality: 'auto:good',
      fetch_format: 'auto',
    };

    // Add transformations for images
    if (file.mimetype.startsWith('image/')) {
      uploadOptions.eager = [
        {
          width: 400,
          height: 300,
          crop: 'fill',
          quality: 'auto:good',
          fetch_format: 'auto'
        },
        {
          width: 800,
          height: 600,
          crop: 'limit',
          quality: 'auto:good',
          fetch_format: 'auto'
        }
      ];
      uploadOptions.eager_async = true;
    }

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload file to Cloudinary: ${error}`);
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      console.warn(`Failed to delete file from Cloudinary: ${publicId}`, result);
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete file from Cloudinary: ${error}`);
  }
};

// Get Cloudinary URL with transformations
export const getOptimizedImageUrl = (
  publicId: string,
  transformations: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string => {
  const {
    width = 800,
    height = 600,
    crop = 'limit',
    quality = 'auto:good',
    format = 'auto'
  } = transformations;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: format,
    secure: true
  });
};

// Generate thumbnail URL
export const getThumbnailUrl = (publicId: string): string => {
  return getOptimizedImageUrl(publicId, {
    width: 300,
    height: 200,
    crop: 'fill'
  });
};

// Bulk delete files from Cloudinary
export const bulkDeleteFromCloudinary = async (publicIds: string[]): Promise<void> => {
  try {
    if (publicIds.length === 0) return;
    
    const result = await cloudinary.api.delete_resources(publicIds);
    console.log('Bulk delete result:', result);
  } catch (error) {
    console.error('Cloudinary bulk delete error:', error);
    throw new Error(`Failed to bulk delete files from Cloudinary: ${error}`);
  }
};

// Get media usage statistics
export const getCloudinaryUsage = async () => {
  try {
    const result = await cloudinary.api.usage();
    return {
      plan: result.plan,
      credits: result.credits,
      bandwidth: {
        used: result.bandwidth.used_bytes,
        limit: result.bandwidth.limit
      },
      storage: {
        used: result.storage.used_bytes,
        limit: result.storage.limit
      },
      transformations: {
        used: result.transformations.used,
        limit: result.transformations.limit
      }
    };
  } catch (error) {
    console.error('Failed to get Cloudinary usage:', error);
    throw new Error('Failed to get media usage statistics');
  }
};
