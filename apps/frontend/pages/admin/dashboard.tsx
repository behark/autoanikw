import React, { useState, useEffect } from 'react';

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

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockStats: DashboardStats = {
      vehicles: {
        total: 47,
        available: 32,
        sold: 8,
        reserved: 5,
        featured: 12,
        recentlyAdded: 6,
        byCondition: { new: 15, used: 30, certified: 2 },
        byBrand: { BMW: 12, Mercedes: 8, Audi: 10, Toyota: 7, Honda: 5, Other: 5 },
        averagePrice: 35000,
        totalValue: 1645000
      },
      users: {
        total: 25,
        active: 23,
        inactive: 2,
        byRole: { admin: 2, manager: 3, editor: 8, viewer: 12 },
        recentLogins: 18,
        newThisMonth: 4
      },
      media: {
        totalFiles: 342,
        totalSize: 1024 * 1024 * 850, // 850MB
        images: 320,
        documents: 22,
        byCategory: { vehicle_image: 280, vehicle_document: 20, website_content: 30, banner: 8, logo: 4 },
        recentUploads: 25
      },
      activity: {
        totalActions: 1250,
        todayActions: 28,
        weekActions: 156,
        monthActions: 624,
        byAction: { create: 200, update: 450, delete: 80, view: 350, upload: 170 },
        byResource: { vehicle: 400, media: 350, user: 150, system: 200, settings: 150 }
      }
    };

    const mockVehicles: Vehicle[] = [
      {
        _id: '1',
        title: '2023 BMW X5 xDrive40i',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        price: 65000,
        status: 'available',
        condition: 'new',
        featured: true,
        images: [],
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        _id: '2',
        title: '2022 Mercedes-Benz C-Class',
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2022,
        price: 45000,
        status: 'available',
        condition: 'used',
        featured: false,
        images: [],
        createdAt: '2024-01-10T14:20:00Z'
      },
      {
        _id: '3',
        title: '2021 Audi A4 Quattro',
        brand: 'Audi',
        model: 'A4',
        year: 2021,
        price: 38000,
        status: 'sold',
        condition: 'used',
        featured: false,
        images: [],
        createdAt: '2024-01-05T09:15:00Z'
      }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setVehicles(mockVehicles);
      setLoading(false);
    }, 1000);
  }, []);

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
              <span className="text-sm text-gray-500">Welcome back, Admin</span>
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
                    <p className="text-sm font-medium text-gray-600">Today&apos;s Activities</p>
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
                    .sort(([,a], [,b]) => (b as number) - (a as number))
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

            {/* Media Usage */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Storage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.media.totalFiles}</p>
                  <p className="text-sm text-gray-600">Total Files</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{formatFileSize(stats.media.totalSize)}</p>
                  <p className="text-sm text-gray-600">Storage Used</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{stats.media.recentUploads}</p>
                  <p className="text-sm text-gray-600">Recent Uploads</p>
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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <span>+</span>
                Add Vehicle
              </button>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Vehicle Image */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-6xl">🚗</span>
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
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 text-sm">
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📷</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Media Manager</h3>
                <p className="text-gray-600 mb-4">Upload and manage images and documents for your vehicles</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Open Media Manager
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Monitoring</h3>
                <p className="text-gray-600">Track all system activities and user actions</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      defaultValue="AutoAni"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="info@autoani.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Upload Size (MB)
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Quality
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
