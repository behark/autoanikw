import mongoose, { Schema, Document } from 'mongoose';

// Activity Log Types (inline for now)
export enum ActivityAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view',
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPLOAD = 'upload',
  DOWNLOAD = 'download',
  EXPORT = 'export',
  IMPORT = 'import',
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
  FEATURE = 'feature',
  UNFEATURE = 'unfeature'
}

export enum ActivityResource {
  USER = 'user',
  VEHICLE = 'vehicle',
  MEDIA = 'media',
  SYSTEM = 'system',
  SETTINGS = 'settings',
  CONTENT = 'content'
}

export interface ActivityDetails {
  title: string;
  description?: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface ActivityLog {
  _id: string;
  userId: string;
  userEmail: string;
  action: ActivityAction;
  resource: ActivityResource;
  resourceId?: string;
  details: ActivityDetails;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface IActivityLog extends Omit<ActivityLog, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const activityLogSchema = new Schema<IActivityLog>({
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: Object.values(ActivityAction),
    required: true
  },
  resource: {
    type: String,
    enum: Object.values(ActivityResource),
    required: true
  },
  resourceId: {
    type: String
  },
  details: {
    title: {
      type: String,
      required: true
    },
    description: String,
    changes: Schema.Types.Mixed,
    metadata: Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false // We use custom timestamp field
});

// Indexes for better performance
activityLogSchema.index({ userId: 1, timestamp: -1 });
activityLogSchema.index({ action: 1, timestamp: -1 });
activityLogSchema.index({ resource: 1, timestamp: -1 });
activityLogSchema.index({ resourceId: 1, timestamp: -1 });
activityLogSchema.index({ timestamp: -1 });

export const ActivityLogModel = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
