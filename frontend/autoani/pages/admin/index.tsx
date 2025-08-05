import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../src/components/admin/layout/AdminLayout';
import StatsCard from '../../src/components/admin/components/StatsCard';

const AdminDashboard = () => {
  // Mock data - replace with real API calls
  const stats = [
    {
      title: 'Total Vehicles',
      value: '47',
      change: '+12% from last month',
      changeType: 'increase' as const,
      icon: '🚗'
    },
    {
      title: 'Available',
      value: '32',
      change: '+8% from last month',
      changeType: 'increase' as const,
      icon: '✅'
    },
    {
      title: 'Sold This Month',
      value: '8',
      change: '+25% from last month',
      changeType: 'increase' as const,
      icon: '💰'
    },
    {
      title: 'Total Revenue',
      value: '$485,000',
      change: '+18% from last month',
      changeType: 'increase' as const,
      icon: '📈'
    }
  ];

  const recentActivities = [
    { action: 'Vehicle Added', item: '2024 BMW X5', time: '2 hours ago', type: 'success' },
    { action: 'Vehicle Sold', item: '2022 Mercedes S-Class', time: '4 hours ago', type: 'info' },
    { action: 'Price Updated', item: '2023 Audi A8', time: '6 hours ago', type: 'warning' },
    { action: 'Vehicle Reserved', item: '2021 Porsche 911', time: '1 day ago', type: 'info' },
    { action: 'Vehicle Deleted', item: '2020 Lexus LS', time: '2 days ago', type: 'error' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '📋';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'info': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-neutral-600';
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - AutoAni</title>
        <meta name="description" content="AutoAni Admin Dashboard" />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-neutral-600">Welcome back! Here's what's happening with your inventory.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">➕</span>
                    <div>
                      <div className="font-medium text-primary-900">Add New Vehicle</div>
                      <div className="text-sm text-primary-600">Create a new vehicle listing</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    <div>
                      <div className="font-medium text-neutral-900">View Analytics</div>
                      <div className="text-sm text-neutral-600">Check sales and performance</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚙️</span>
                    <div>
                      <div className="font-medium text-neutral-900">Settings</div>
                      <div className="text-sm text-neutral-600">Manage your preferences</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{getActivityIcon(activity.type)}</span>
                      <div>
                        <div className="font-medium text-neutral-900">
                          <span className={getActivityColor(activity.type)}>{activity.action}</span>
                          {' '}{activity.item}
                        </div>
                        <div className="text-sm text-neutral-500">{activity.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Vehicles Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Recent Vehicles</h3>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mock recent vehicles */}
              {[
                { title: '2024 BMW X5', price: '$65,000', status: 'available', image: '/placeholder-car.jpg' },
                { title: '2023 Mercedes S-Class', price: '$89,000', status: 'reserved', image: '/placeholder-car.jpg' },
                { title: '2022 Audi A8', price: '$72,000', status: 'available', image: '/placeholder-car.jpg' }
              ].map((vehicle, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg p-4">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-neutral-900">{vehicle.title}</h4>
                  <p className="text-primary-600 font-semibold">{vehicle.price}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
