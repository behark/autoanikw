import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

// Import the NotificationDropdown with SSR disabled to prevent hydration mismatch
const NotificationDropdown = dynamic(
  () => import('../notifications/NotificationDropdown'),
  { ssr: false }
);

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  // Format date on client-side only to avoid hydration mismatch
  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'sq-AL', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    );
  }, [i18n.language]);

  const navigation = [
    { name: t('admin.sidebar.dashboard'), href: '/admin', icon: '📊', current: router.asPath === '/admin' },
    { name: t('admin.sidebar.vehicles'), href: '/admin/vehicles', icon: '🚗', current: router.asPath.startsWith('/admin/vehicles') },
    { name: t('admin.sidebar.mediaLibrary'), href: '/admin/media', icon: '📸', current: router.asPath.startsWith('/admin/media') },
    { name: t('admin.sidebar.analytics'), href: '/admin/analytics', icon: '📈', current: router.asPath === '/admin/analytics' },
    { name: t('admin.sidebar.activityLogs'), href: '/admin/activity-logs', icon: '📝', current: router.asPath === '/admin/activity-logs' },
    { name: t('admin.sidebar.settings'), href: '/admin/settings', icon: '⚙️', current: router.asPath === '/admin/settings' || router.asPath.startsWith('/admin/settings/') },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-neutral-900 opacity-75" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-primary-600 to-primary-700">
          <Link href="/admin">
            <span className="text-white text-xl font-bold">{t('admin.sidebar.title')}</span>
          </Link>
        </div>
        
        <nav className="mt-8">
          <div className="px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
              >
                <span className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md mb-1 transition-colors ${
                  item.current
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}>
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-neutral-700">{t('admin.sidebar.user.adminUser')}</p>
              <Link href="/">
                <span className="text-xs text-primary-600 hover:text-primary-500">{t('admin.sidebar.user.viewSite')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-neutral-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                type="button"
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">{t('admin.sidebar.openSidebar')}</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-500">
                  {formattedDate}
                </span>
                
                {/* Notification Dropdown */}
                <NotificationDropdown />
                
                {/* User dropdown would go here */}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
