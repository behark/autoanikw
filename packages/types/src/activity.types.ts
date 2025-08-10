// Activity Logging for Admin Dashboard
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

export interface CreateActivityLogRequest {
  userId: string;
  action: ActivityAction;
  resource: ActivityResource;
  resourceId?: string;
  details: ActivityDetails;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActivityLogFilter {
  userId?: string;
  action?: ActivityAction;
  resource?: ActivityResource;
  resourceId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface ActivityLogResponse {
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
