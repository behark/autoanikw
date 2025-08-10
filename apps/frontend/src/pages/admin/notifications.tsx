import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import adminAPI from '../../services/adminAPI';
import { Notification, NotificationType } from '../../types/notification';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'sq-AL', ['common']))
    }
  };
};

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getNotifications();
      if (response.success) {
        setNotifications(response.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
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

  const getPriorityColor = (priority?: string) => {
    switch(priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-blue-500';
      case 'low':
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sq-AL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter notifications based on active tab and selected type
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || (activeTab === 'unread' && !notification.isRead);
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    return matchesTab && matchesType;
  });

  // Group notifications by date (today, yesterday, older)
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = new Date(notification.createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let group = 'older';
    if (date.toDateString() === today.toDateString()) {
      group = 'today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      group = 'yesterday';
    }
    
    if (!groups[group]) {
      groups[group] = [];
    }
    
    groups[group].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('admin.notifications.title')}
            </h1>
            
            {notifications.some(notification => !notification.isRead) && (
              <button
                onClick={handleMarkAllAsRead}
                className="mt-3 sm:mt-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('admin.notifications.markAllAsRead')}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6 py-3" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('all')}
                className={`${
                  activeTab === 'all'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t('admin.notifications.all')}
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`${
                  activeTab === 'unread'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t('admin.notifications.unread')}
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Type filters */}
          <div className="px-6 py-3 border-b border-gray-200 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'all' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.filters.allTypes')}
            </button>
            <button
              onClick={() => setSelectedType('system')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'system' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.types.system')}
            </button>
            <button
              onClick={() => setSelectedType('vehicle')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'vehicle' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.types.vehicle')}
            </button>
            <button
              onClick={() => setSelectedType('user')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'user' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.types.user')}
            </button>
            <button
              onClick={() => setSelectedType('media')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'media' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.types.media')}
            </button>
            <button
              onClick={() => setSelectedType('alert')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'alert' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.types.alert')}
            </button>
            <button
              onClick={() => setSelectedType('info')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === 'info' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('admin.notifications.types.info')}
            </button>
          </div>

          {/* Notifications list */}
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="py-10 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">
                  {activeTab === 'unread' ? t('admin.notifications.allRead') : t('admin.notifications.noNotifications')}
                </p>
              </div>
            ) : (
              <>
                {/* Today's notifications */}
                {groupedNotifications['today'] && groupedNotifications['today'].length > 0 && (
                  <div>
                    <h3 className="px-6 py-3 text-sm font-medium text-gray-500 bg-gray-50">
                      {t('admin.notifications.filters.today')}
                    </h3>
                    <ul className="divide-y divide-gray-200">
                      {groupedNotifications['today'].map(notification => (
                        <li 
                          key={notification._id} 
                          className={`p-6 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-2xl">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <div className="flex items-center">
                                  {notification.priority && (
                                    <span className={`${getPriorityColor(notification.priority)} h-2 w-2 rounded-full mr-2`} title={t(`admin.notifications.priority.${notification.priority}`)}></span>
                                  )}
                                  <p className="text-sm text-gray-500">
                                    {getTimeAgo(notification.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <div className="mt-2 flex">
                                {notification.link && (
                                  <a 
                                    href={notification.link} 
                                    className="text-sm text-primary-600 hover:text-primary-800 mr-4"
                                  >
                                    {t('admin.notifications.view')}
                                  </a>
                                )}
                                {!notification.isRead && (
                                  <button 
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    {t('admin.notifications.markAsRead')}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Yesterday's notifications */}
                {groupedNotifications['yesterday'] && groupedNotifications['yesterday'].length > 0 && (
                  <div>
                    <h3 className="px-6 py-3 text-sm font-medium text-gray-500 bg-gray-50">
                      {t('admin.notifications.filters.yesterday')}
                    </h3>
                    <ul className="divide-y divide-gray-200">
                      {groupedNotifications['yesterday'].map(notification => (
                        <li 
                          key={notification._id} 
                          className={`p-6 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-2xl">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <div className="flex items-center">
                                  {notification.priority && (
                                    <span className={`${getPriorityColor(notification.priority)} h-2 w-2 rounded-full mr-2`} title={t(`admin.notifications.priority.${notification.priority}`)}></span>
                                  )}
                                  <p className="text-sm text-gray-500">
                                    {getTimeAgo(notification.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <div className="mt-2 flex">
                                {notification.link && (
                                  <a 
                                    href={notification.link} 
                                    className="text-sm text-primary-600 hover:text-primary-800 mr-4"
                                  >
                                    {t('admin.notifications.view')}
                                  </a>
                                )}
                                {!notification.isRead && (
                                  <button 
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    {t('admin.notifications.markAsRead')}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Older notifications */}
                {groupedNotifications['older'] && groupedNotifications['older'].length > 0 && (
                  <div>
                    <h3 className="px-6 py-3 text-sm font-medium text-gray-500 bg-gray-50">
                      {t('admin.notifications.filters.older')}
                    </h3>
                    <ul className="divide-y divide-gray-200">
                      {groupedNotifications['older'].map(notification => (
                        <li 
                          key={notification._id} 
                          className={`p-6 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-2xl">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <div className="flex items-center">
                                  {notification.priority && (
                                    <span className={`${getPriorityColor(notification.priority)} h-2 w-2 rounded-full mr-2`} title={t(`admin.notifications.priority.${notification.priority}`)}></span>
                                  )}
                                  <p className="text-sm text-gray-500">
                                    {formatDate(notification.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <div className="mt-2 flex">
                                {notification.link && (
                                  <a 
                                    href={notification.link} 
                                    className="text-sm text-primary-600 hover:text-primary-800 mr-4"
                                  >
                                    {t('admin.notifications.view')}
                                  </a>
                                )}
                                {!notification.isRead && (
                                  <button 
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    {t('admin.notifications.markAsRead')}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;
