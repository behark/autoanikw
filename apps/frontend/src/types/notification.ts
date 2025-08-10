export interface Notification {
  _id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
  priority?: NotificationPriority;
}

export type NotificationType = 
  | 'system' 
  | 'vehicle' 
  | 'user' 
  | 'media' 
  | 'alert' 
  | 'info';

export type NotificationPriority = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'urgent';

export interface NotificationResponse {
  success: boolean;
  notifications: Notification[];
  unreadCount: number;
  message?: string;
}

// Mock data for notifications
export const mockNotifications: Notification[] = [
  {
    _id: 'notif-1',
    type: 'vehicle',
    title: 'New Vehicle Listing',
    message: 'A new vehicle has been added to your inventory',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    link: '/admin/vehicles',
    priority: 'medium'
  },
  {
    _id: 'notif-2',
    type: 'system',
    title: 'System Update',
    message: 'The system will undergo maintenance tonight at 02:00 AM',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'high'
  },
  {
    _id: 'notif-3',
    type: 'user',
    title: 'New User Registered',
    message: 'A new admin user has been created and awaits approval',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    link: '/admin/users',
    priority: 'medium'
  },
  {
    _id: 'notif-4',
    type: 'alert',
    title: 'Low Inventory Alert',
    message: 'You have less than 10 available vehicles in your inventory',
    isRead: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    link: '/admin/vehicles',
    priority: 'high'
  },
  {
    _id: 'notif-5',
    type: 'info',
    title: 'Analytics Report Ready',
    message: 'Your monthly analytics report is ready to view',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    link: '/admin/analytics',
    priority: 'low'
  },
  {
    _id: 'notif-6',
    type: 'media',
    title: 'Storage Limit Warning',
    message: 'You have used 80% of your media storage capacity',
    isRead: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    link: '/admin/media',
    priority: 'medium'
  }
];
