import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Media } from '../models/Media';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/media.service';
import { logActivity } from '../services/activity.service';
import { 
  MediaFile, 
  MediaCategory, 
  ApiResponse, 
  MediaListResponse,
  BulkUploadResponse,
  ActivityAction,
  ActivityResource
} from '@autoanikw/types';

// Upload single media file
export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      } as ApiResponse);
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded'
      } as ApiResponse);
      return;
    }

    const { category, alt, caption, tags, vehicleId } = req.body;
    const userId = req.user.id;

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file, category);

    // Create media record
    const media = new Media({
      filename: uploadResult.public_id,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: uploadResult.secure_url,
      thumbnailUrl: uploadResult.eager?.[0]?.secure_url,
      alt,
      caption,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      category: category as MediaCategory,
      uploadedBy: userId,
      vehicleId,
      metadata: {
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format
      }
    });

    await media.save();

    // Log activity
    await logActivity({
      userId,
      action: ActivityAction.UPLOAD,
      resource: ActivityResource.MEDIA,
      resourceId: media._id.toString(),
      details: {
        title: `Uploaded ${media.originalName}`,
        description: `Media file uploaded to category: ${category}`,
        metadata: {
          filename: media.filename,
          size: media.size,
          mimetype: media.mimetype
        }
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({
      success: true,
      data: media,
      message: 'Media uploaded successfully'
    } as ApiResponse<MediaFile>);

  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload media',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// Upload multiple media files
export const bulkUploadMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No files uploaded'
      } as ApiResponse);
      return;
    }

    const { category, vehicleId } = req.body;
    const userId = req.user.id;
    const files = req.files as Express.Multer.File[];

    const successful: MediaFile[] = [];
    const failed: Array<{ filename: string; error: string }> = [];

    for (const file of files) {
      try {
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(file, category);

        // Create media record
        const media = new Media({
          filename: uploadResult.public_id,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: uploadResult.secure_url,
          thumbnailUrl: uploadResult.eager?.[0]?.secure_url,
          category: category as MediaCategory,
          uploadedBy: userId,
          vehicleId,
          metadata: {
            width: uploadResult.width,
            height: uploadResult.height,
            format: uploadResult.format
          }
        });

        await media.save();
        successful.push(media.toObject() as MediaFile);

      } catch (error) {
        failed.push({
          filename: file.originalname,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Log activity
    await logActivity({
      userId,
      action: ActivityAction.UPLOAD,
      resource: ActivityResource.MEDIA,
      details: {
        title: `Bulk uploaded ${successful.length} files`,
        description: `Bulk upload completed. ${successful.length} successful, ${failed.length} failed`,
        metadata: {
          totalFiles: files.length,
          successful: successful.length,
          failed: failed.length
        }
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({
      success: true,
      data: {
        successful,
        failed,
        totalUploaded: successful.length,
        totalFailed: failed.length
      } as BulkUploadResponse,
      message: `Bulk upload completed. ${successful.length} successful, ${failed.length} failed`
    } as ApiResponse<BulkUploadResponse>);

  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process bulk upload',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// Get media list with filters
export const getMediaList = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      vehicleId,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter query
    const filter: any = {};
    if (category) filter.category = category;
    if (vehicleId) filter.vehicleId = vehicleId;
    if (search) {
      filter.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { caption: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    // Get total count
    const total = await Media.countDocuments(filter);

    // Get media with pagination
    const media = await Media.find(filter)
      .populate('uploadedBy', 'username email')
      .populate('vehicleId', 'title brand model')
      .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        media,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      } as MediaListResponse,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    } as ApiResponse<MediaListResponse>);

  } catch (error) {
    console.error('Get media list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media list',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// Get single media file
export const getMediaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid media ID'
      } as ApiResponse);
      return;
    }

    const media = await Media.findById(id)
      .populate('uploadedBy', 'username email')
      .populate('vehicleId', 'title brand model');

    if (!media) {
      res.status(404).json({
        success: false,
        message: 'Media not found'
      } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      data: media,
      message: 'Media retrieved successfully'
    } as ApiResponse<MediaFile>);

  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// Update media metadata
export const updateMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      } as ApiResponse);
      return;
    }

    const { id } = req.params;
    const { alt, caption, tags, category } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid media ID'
      } as ApiResponse);
      return;
    }

    const media = await Media.findById(id);
    if (!media) {
      res.status(404).json({
        success: false,
        message: 'Media not found'
      } as ApiResponse);
      return;
    }

    // Update fields
    if (alt !== undefined) media.alt = alt;
    if (caption !== undefined) media.caption = caption;
    if (tags !== undefined) media.tags = tags.split(',').map((tag: string) => tag.trim());
    if (category !== undefined) media.category = category;
    media.updatedAt = new Date();

    await media.save();

    // Log activity
    await logActivity({
      userId,
      action: ActivityAction.UPDATE,
      resource: ActivityResource.MEDIA,
      resourceId: media._id.toString(),
      details: {
        title: `Updated ${media.originalName}`,
        description: 'Media metadata updated',
        changes: { alt, caption, tags, category }
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      data: media,
      message: 'Media updated successfully'
    } as ApiResponse<MediaFile>);

  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update media',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// Delete media
export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid media ID'
      } as ApiResponse);
      return;
    }

    const media = await Media.findById(id);
    if (!media) {
      res.status(404).json({
        success: false,
        message: 'Media not found'
      } as ApiResponse);
      return;
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(media.filename);

    // Delete from database
    await Media.findByIdAndDelete(id);

    // Log activity
    await logActivity({
      userId,
      action: ActivityAction.DELETE,
      resource: ActivityResource.MEDIA,
      resourceId: id,
      details: {
        title: `Deleted ${media.originalName}`,
        description: 'Media file deleted',
        metadata: {
          filename: media.filename,
          originalName: media.originalName
        }
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Media deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};
