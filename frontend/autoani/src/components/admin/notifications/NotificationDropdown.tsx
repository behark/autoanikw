import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Notification } from '../../../types/notification';
import adminAPI from '../../../services/adminAPI';

interface NotificationDropdownProps {
  onMarkAllAsRead?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onMarkAllAsRead
}) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    
    // Set up polling for new notifications
    const interval = setInterval(() => {
      fetchNotifications(false);
    }, 60000); // Check for new notifications every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Handle clicks outside the dropdown to close it
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotifications = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    
    try {
      const response = await adminAPI.getNotifications();
      if (response.success) {
        setNotifications(response.notifications);
        setUnreadCount(response.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await adminAPI.markNotificationAsRead(notificationId);
      if (response.success) {
        // Update local state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            notification._id === notificationId 
              ? { ...notification, isRead: true } 
              : notification
          )
        );
        setUnreadCount(prevCount => Math.max(0, prevCount - 1));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await adminAPI.markAllNotificationsAsRead();
      if (response.success) {
        // Update local state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => ({ ...notification, isRead: true }))
        );
        setUnreadCount(0);
        
        if (onMarkAllAsRead) onMarkAllAsRead();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'vehicle':
        return '🚗';
      case 'system':
        return '⚙️';
      case 'user':
        return '👤';
      case 'media':
        return '🖼️';
      case 'alert':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '🔔';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffSec < 60) {
      return t('admin.notifications.timeAgo.justNow');
    } else if (diffMin < 60) {
      return `${diffMin} ${diffMin === 1 ? t('admin.notifications.timeAgo.minute') : t('admin.notifications.timeAgo.minutes')}`;
    } else if (diffHour < 24) {
      return `${diffHour} ${diffHour === 1 ? t('admin.notifications.timeAgo.hour') : t('admin.notifications.timeAgo.hours')}`;
    } else {
      return `${diffDay} ${diffDay === 1 ? t('admin.notifications.timeAgo.day') : t('admin.notifications.timeAgo.days')}`;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50">
          <div className="p-3 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">
              {t('admin.notifications.title')}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary-600 hover:text-primary-800"
              >
                {t('admin.notifications.markAllAsRead')}
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {t('admin.notifications.noNotifications')}
              </div>
            ) : (
              <div>
                {notifications.map(notification => (
                  <div
                    key={notification._id}
                    className={`p-3 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex">
                      <div className="mr-3 text-xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        {notification.link ? (
                          <Link
                            href={notification.link}
                            onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                          >
                            <span className="block text-sm font-medium text-gray-900">
                              {notification.title}
                            </span>
                          </Link>
                        ) : (
                          <span className="block text-sm font-medium text-gray-900">
                            {notification.title}
                          </span>
                        )}
                        <p className="text-xs text-gray-500">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {getTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="ml-2 text-xs text-gray-400 hover:text-gray-600"
                          title={t('admin.notifications.markAsRead')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-2">
            <Link href="/admin/notifications">
              <span onClick={() => setIsOpen(false)} className="block w-full text-center py-2 text-sm text-primary-600 hover:text-primary-900 hover:bg-gray-50 rounded">
                {t('admin.notifications.viewAll')}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
