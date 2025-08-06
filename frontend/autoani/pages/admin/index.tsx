import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../src/components/admin/layout/AdminLayout';
import StatsCard from '../../src/components/admin/components/StatsCard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
