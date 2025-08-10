import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import VehicleForm from '../../src/components/admin/vehicles/VehicleForm';
import MediaManager from '../../src/components/admin/MediaManager';

interface DashboardStats {
  vehicles: {
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
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    byRole: Record<string, number>;
    recentLogins: number;
    newThisMonth: number;
  };
  media: {
    totalFiles: number;
    totalSize: number;
    images: number;
    documents: number;
    byCategory: Record<string, number>;
    recentUploads: number;
  };
  activity: {
    totalActions: number;
    todayActions: number;
    weekActions: number;
    monthActions: number;
    byAction: Record<string, number>;
    byResource: Record<string, number>;
  };
}

interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: string;
  condition: string;
  featured: boolean;
  images: any[];
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicleFormMode, setVehicleFormMode] = useState<'add' | 'edit'>('add');

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
    }
  };

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch vehicles');
      
      const data = await response.json();
      setVehicles(data.data.vehicles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchVehicles()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Handle vehicle save
  const handleVehicleSave = async (vehicleData: Partial<Vehicle>) => {
    try {
      const url = vehicleFormMode === 'edit' && selectedVehicle 
        ? `/api/vehicles/${selectedVehicle._id}` 
        : '/api/vehicles';
      
      const method = vehicleFormMode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(vehicleData)
      });

      if (!response.ok) throw new Error('Failed to save vehicle');

      // Refresh vehicles list
      await fetchVehicles();
      setShowVehicleForm(false);
      setSelectedVehicle(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save vehicle');
    }
  };

  // Handle vehicle delete
  const handleVehicleDelete = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete vehicle');

      // Refresh vehicles list
      await fetchVehicles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vehicle');
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AutoAni Admin Dashboard</title>
        <meta name="description" content="Manage your car dealership efficiently" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AutoAni Admin Dashboard</h1>
                <p className="text-gray-600">Manage your car dealership efficiently</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Welcome back, Admin
                </span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
                { id: 'media', label: 'Media', icon: '📷' },
                { id: 'activity', label: 'Activity Logs', icon: '📝' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
              <button 
                onClick={() => setError(null)}
                className="float-right text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && stats && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-3xl">🚗</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.vehicles.total}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-3xl">💰</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Value</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.vehicles.totalValue)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-3xl">📷</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Media Files</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.media.totalFiles}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-3xl">📝</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today's Activities</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activity.todayActions}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Status Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="font-medium text-green-600">{stats.vehicles.available}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sold</span>
                      <span className="font-medium text-blue-600">{stats.vehicles.sold}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Reserved</span>
                      <span className="font-medium text-yellow-600">{stats.vehicles.reserved}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Featured</span>
                      <span className="font-medium text-purple-600">{stats.vehicles.featured}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Brands</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.vehicles.byBrand)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([brand, count]) => (
                      <div key={brand} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{brand}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Vehicle Management</h2>
                <button
                  onClick={() => {
                    setVehicleFormMode('add');
                    setSelectedVehicle(null);
                    setShowVehicleForm(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <span>+</span>
                  Add Vehicle
                </button>
              </div>

              {/* Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div key={vehicle._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Vehicle Image */}
                    <div className="h-48 bg-gray-200">
                      {vehicle.images && vehicle.images.length > 0 ? (
                        <img
                          src={vehicle.images[0].thumbnailUrl || vehicle.images[0].url}
                          alt={vehicle.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-6xl">🚗</span>
                        </div>
                      )}
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {vehicle.title}
                        </h3>
                        {vehicle.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        {vehicle.year} {vehicle.brand} {vehicle.model}
                      </p>
                      
                      <p className="text-2xl font-bold text-blue-600 mb-3">
                        {formatCurrency(vehicle.price)}
                      </p>

                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                        <span className={`px-2 py-1 rounded-full ${
                          vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'sold' ? 'bg-red-100 text-red-800' :
                          vehicle.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                        </span>
                        <span className="capitalize">{vehicle.condition}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setVehicleFormMode('edit');
                            setSelectedVehicle(vehicle);
                            setShowVehicleForm(true);
                          }}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleVehicleDelete(vehicle._id)}
                          className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Media Management</h2>
              <MediaManager />
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Activity logs will be displayed here...</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Settings panel will be displayed here...</p>
              </div>
            </div>
          )}
        </main>

        {/* Vehicle Form Modal */}
        {showVehicleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <VehicleForm
                vehicle={selectedVehicle || undefined}
                onSave={handleVehicleSave}
                onCancel={() => {
                  setShowVehicleForm(false);
                  setSelectedVehicle(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const AdminDashboard = () => {
  const { t } = useTranslation('common');

  // Mock data - replace with real API calls
  const stats = [
    {
      title: t('admin.dashboard.stats.totalVehicles'),
      value: '47',
      change: `+12% ${t('admin.dashboard.stats.fromLastMonth')}`,
      changeType: 'increase' as const,
      icon: '🚗'
    },
    {
      title: t('admin.dashboard.stats.available'),
      value: '32',
      change: `+8% ${t('admin.dashboard.stats.fromLastMonth')}`,
      changeType: 'increase' as const,
      icon: '✅'
    },
    {
      title: t('admin.dashboard.stats.soldThisMonth'),
      value: '8',
      change: `+25% ${t('admin.dashboard.stats.fromLastMonth')}`,
      changeType: 'increase' as const,
      icon: '💰'
    },
    {
      title: t('admin.dashboard.stats.totalRevenue'),
      value: '€485,000',
      change: `+18% ${t('admin.dashboard.stats.fromLastMonth')}`,
      changeType: 'increase' as const,
      icon: '📈'
    }
  ];

  const recentActivities = [
    { 
      action: t('admin.dashboard.recentActivity.actionTypes.vehicleAdded'), 
      item: '2024 BMW X5', 
      time: `2 ${t('admin.dashboard.recentActivity.timeAgo.hoursAgo')}`, 
      type: 'success' 
    },
    { 
      action: t('admin.dashboard.recentActivity.actionTypes.vehicleSold'), 
      item: '2022 Mercedes S-Class', 
      time: `4 ${t('admin.dashboard.recentActivity.timeAgo.hoursAgo')}`, 
      type: 'info' 
    },
    { 
      action: t('admin.dashboard.recentActivity.actionTypes.priceUpdated'), 
      item: '2023 Audi A8', 
      time: `6 ${t('admin.dashboard.recentActivity.timeAgo.hoursAgo')}`, 
      type: 'warning' 
    },
    { 
      action: t('admin.dashboard.recentActivity.actionTypes.vehicleReserved'), 
      item: '2021 Porsche 911', 
      time: `1 ${t('admin.dashboard.recentActivity.timeAgo.dayAgo')}`, 
      type: 'info' 
    },
    { 
      action: t('admin.dashboard.recentActivity.actionTypes.vehicleDeleted'), 
      item: '2020 Lexus LS', 
      time: `2 ${t('admin.dashboard.recentActivity.timeAgo.daysAgo')}`, 
      type: 'error' 
    }
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
        <title>{t('admin.meta.title')}</title>
        <meta name="description" content={t('admin.meta.description')} />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{t('admin.dashboard.title')}</h1>
            <p className="text-neutral-600">{t('admin.dashboard.welcomeMessage')}</p>
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
              <h3 className="text-lg font-medium text-neutral-900 mb-4">{t('admin.dashboard.quickActions.title')}</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">➕</span>
                    <div>
                      <div className="font-medium text-primary-900">{t('admin.dashboard.quickActions.addVehicle.title')}</div>
                      <div className="text-sm text-primary-600">{t('admin.dashboard.quickActions.addVehicle.description')}</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🚗</span>
                    <div>
                      <div className="font-medium text-neutral-900">{t('admin.dashboard.quickActions.manageInventory.title')}</div>
                      <div className="text-sm text-neutral-600">{t('admin.dashboard.quickActions.manageInventory.description')}</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    <div>
                      <div className="font-medium text-neutral-900">{t('admin.dashboard.quickActions.analytics.title')}</div>
                      <div className="text-sm text-neutral-600">{t('admin.dashboard.quickActions.analytics.description')}</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚙️</span>
                    <div>
                      <div className="font-medium text-neutral-900">{t('admin.dashboard.quickActions.settings.title')}</div>
                      <div className="text-sm text-neutral-600">{t('admin.dashboard.quickActions.settings.description')}</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">{t('admin.dashboard.recentActivity.title')}</h3>
              {recentActivities.length === 0 ? (
                <p className="text-neutral-500 text-center py-6">{t('admin.dashboard.recentActivity.noActivity')}</p>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-1">{getActivityIcon(activity.type)}</div>
                      <div>
                        <div className={`font-medium ${getActivityColor(activity.type)}`}>{activity.action}</div>
                        <div className="text-sm text-neutral-600">{activity.item}</div>
                        <div className="text-xs text-neutral-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Inventory Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-neutral-900">{t('admin.dashboard.inventory.title')}</h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {t('admin.dashboard.inventory.viewAll')}
                </button>
              </div>
              
              <div className="space-y-3">
                {/* This would typically be replaced with actual inventory data */}
                <div className="flex justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <div>
                    <div className="font-medium">Mercedes-Benz</div>
                    <div className="text-sm text-neutral-500">12 vehicles</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">€820,000</div>
                    <div className="text-sm text-neutral-500">Total value</div>
                  </div>
                </div>
                
                <div className="flex justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <div>
                    <div className="font-medium">BMW</div>
                    <div className="text-sm text-neutral-500">9 vehicles</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">€680,000</div>
                    <div className="text-sm text-neutral-500">Total value</div>
                  </div>
                </div>
                
                <div className="flex justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <div>
                    <div className="font-medium">Audi</div>
                    <div className="text-sm text-neutral-500">7 vehicles</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">€520,000</div>
                    <div className="text-sm text-neutral-500">Total value</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
