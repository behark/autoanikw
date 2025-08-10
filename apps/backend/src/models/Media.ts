import mongoose, { Schema, Document } from 'mongoose';
import { MediaFile, MediaCategory } from '@autoanikw/types';

// Extend the MediaFile interface to include Document methods
export interface IMedia extends Omit<MediaFile, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const mediaSchema = new Schema<IMedia>({
  filename: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 0
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  alt: {
    type: String,
    trim: true
  },
  caption: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: Object.values(MediaCategory),
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  metadata: {
    width: Number,
    height: Number,
    format: String,
    colorSpace: String,
    orientation: Number,
    compression: String,
    dpi: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
mediaSchema.index({ category: 1, createdAt: -1 });
mediaSchema.index({ uploadedBy: 1, createdAt: -1 });
mediaSchema.index({ vehicleId: 1 });
mediaSchema.index({ tags: 1 });
mediaSchema.index({ originalName: 'text', alt: 'text', caption: 'text' });

// Virtual for file size in human readable format
mediaSchema.virtual('sizeFormatted').get(function(this: IMedia) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (this.size === 0) return '0 Bytes';
  const i = Math.floor(Math.log(this.size) / Math.log(1024));
  return Math.round(this.size / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Pre-remove middleware to clean up files
mediaSchema.pre('deleteOne', { document: true, query: false }, async function(this: IMedia) {
  // This would be handled by the controller calling the cloudinary delete service
  console.log(`Cleaning up media file: ${this.filename}`);
});

export const Media = mongoose.model<IMedia>('Media', mediaSchema);
