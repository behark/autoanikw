export interface ActivityLog {
  _id: string;
  userId: string;
  userName: string;
  action: ActivityAction;
  entityType: EntityType;
  entityId?: string;
  entityName?: string;
  details?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  ipAddress?: string;
}

export type ActivityAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'login'
  | 'logout'
  | 'import'
  | 'export'
  | 'publish'
  | 'unpublish'
  | 'upload'
  | 'download'
  | 'settings_change'
  | 'status_change'
  | 'other';

export type EntityType =
  | 'vehicle'
  | 'user'
  | 'media'
  | 'settings'
  | 'report'
  | 'notification'
  | 'system';

export interface ActivityLogResponse {
  success: boolean;
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

// Mock activity logs for demonstration
export const mockActivityLogs: ActivityLog[] = [
  {
    _id: 'log-1',
    userId: 'user-1',
    userName: 'Admin User',
    action: 'create',
    entityType: 'vehicle',
    entityId: 'vehicle-123',
    entityName: 'Mercedes-Benz E-Class 2022',
    details: 'Created new vehicle listing',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.1'
  },
  {
    _id: 'log-2',
    userId: 'user-1',
    userName: 'Admin User',
    action: 'update',
    entityType: 'vehicle',
    entityId: 'vehicle-124',
    entityName: 'BMW X5 2021',
    details: 'Updated vehicle price from €45,000 to €42,500',
    metadata: {
      oldPrice: 45000,
      newPrice: 42500
    },
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.1'
  },
  {
    _id: 'log-3',
    userId: 'user-2',
    userName: 'John Doe',
    action: 'upload',
    entityType: 'media',
    entityName: 'audi-a8-2023.jpg',
    details: 'Uploaded new media file',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.2'
  },
  {
    _id: 'log-4',
    userId: 'user-1',
    userName: 'Admin User',
    action: 'settings_change',
    entityType: 'settings',
    entityName: 'Contact Information',
    details: 'Updated company phone number',
    metadata: {
      setting: 'contact_phone',
      oldValue: '+355 42 123 456',
      newValue: '+355 42 987 654'
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.1'
  },
  {
    _id: 'log-5',
    userId: 'user-3',
    userName: 'Jane Smith',
    action: 'login',
    entityType: 'system',
    details: 'User logged in',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.3'
  },
  {
    _id: 'log-6',
    userId: 'user-2',
    userName: 'John Doe',
    action: 'delete',
    entityType: 'vehicle',
    entityId: 'vehicle-125',
    entityName: 'Porsche Cayenne 2020',
    details: 'Deleted vehicle listing',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.2'
  },
  {
    _id: 'log-7',
    userId: 'user-1',
    userName: 'Admin User',
    action: 'create',
    entityType: 'user',
    entityId: 'user-5',
    entityName: 'Maria Garcia',
    details: 'Created new user account',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.1'
  },
  {
    _id: 'log-8',
    userId: 'user-1',
    userName: 'Admin User',
    action: 'status_change',
    entityType: 'vehicle',
    entityId: 'vehicle-126',
    entityName: 'Audi Q7 2022',
    details: 'Changed status from Available to Sold',
    metadata: {
      oldStatus: 'available',
      newStatus: 'sold'
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.1'
  },
  {
    _id: 'log-9',
    userId: 'user-3',
    userName: 'Jane Smith',
    action: 'export',
    entityType: 'report',
    entityName: 'Sales Report June 2025',
    details: 'Exported monthly sales report',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.3'
  },
  {
    _id: 'log-10',
    userId: 'user-2',
    userName: 'John Doe',
    action: 'publish',
    entityType: 'vehicle',
    entityId: 'vehicle-127',
    entityName: 'Lexus RX 2023',
    details: 'Published vehicle listing',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: '192.168.1.2'
  }
];
