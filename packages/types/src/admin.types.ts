// Admin Dashboard Types
export interface DashboardStats {
  vehicles: VehicleStats;
  users: UserStats;
  media: MediaStats;
  activity: ActivityStats;
  sales: SalesStats;
}

export interface VehicleStats {
  total: number;
  available: number;
  sold: number;
  reserved: number;
  featured: number;
  recentlyAdded: number;
  byCondition: Record<string, number>;
  byBrand: Record<string, number>;
  averagePrice: number;
  totalValue: number;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: Record<string, number>;
  recentLogins: number;
  newThisMonth: number;
}

export interface MediaStats {
  totalFiles: number;
  totalSize: number; // in bytes
  images: number;
  documents: number;
  byCategory: Record<string, number>;
  recentUploads: number;
}

export interface ActivityStats {
  totalActions: number;
  todayActions: number;
  weekActions: number;
  monthActions: number;
  byAction: Record<string, number>;
  byResource: Record<string, number>;
}

export interface SalesStats {
  totalSold: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageSalePrice: number;
  conversionRate: number;
  topSellingBrands: Array<{
    brand: string;
    count: number;
    revenue: number;
  }>;
}

export interface AdminNotification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  severity: NotificationSeverity;
  userId?: string;
  resourceId?: string;
  resourceType?: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export enum NotificationType {
  SYSTEM = 'system',
  USER = 'user',
  VEHICLE = 'vehicle',
  MEDIA = 'media',
  SALES = 'sales',
  SECURITY = 'security'
}

export enum NotificationSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  severity: NotificationSeverity;
  userId?: string;
  resourceId?: string;
  resourceType?: string;
  actionUrl?: string;
  expiresAt?: Date;
}

export interface NotificationFilter {
  type?: NotificationType;
  severity?: NotificationSeverity;
  read?: boolean;
  userId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
