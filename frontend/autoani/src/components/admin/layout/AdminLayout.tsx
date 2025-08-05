import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊', current: router.pathname === '/admin' },
    { name: 'Vehicles', href: '/admin/vehicles', icon: '🚗', current: router.pathname.startsWith('/admin/vehicles') },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈', current: router.pathname === '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', current: router.pathname === '/admin/settings' },
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
            <span className="text-white text-xl font-bold">AutoAni Admin</span>
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
              <p className="text-sm font-medium text-neutral-700">Admin User</p>
              <Link href="/">
                <span className="text-xs text-primary-600 hover:text-primary-500">View Site</span>
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
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
