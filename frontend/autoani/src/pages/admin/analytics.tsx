import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import StatsCard from '@/components/admin/components/StatsCard';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Analytics = () => {
  const { t, i18n } = useTranslation('common');
  
  const salesData = [
    { month: t('admin.analytics.months.jan'), sales: 12, revenue: 450000 },
    { month: t('admin.analytics.months.feb'), sales: 18, revenue: 680000 },
    { month: t('admin.analytics.months.mar'), sales: 15, revenue: 620000 },
    { month: t('admin.analytics.months.apr'), sales: 22, revenue: 850000 },
    { month: t('admin.analytics.months.may'), sales: 28, revenue: 1100000 },
    { month: t('admin.analytics.months.jun'), sales: 25, revenue: 950000 }
  ];

  const topBrands = [
    { brand: 'BMW', count: 15, percentage: 32 },
    { brand: 'Mercedes-Benz', count: 12, percentage: 26 },
    { brand: 'Audi', count: 10, percentage: 21 },
    { brand: 'Porsche', count: 6, percentage: 13 },
    { brand: 'Lexus', count: 4, percentage: 8 }
  ];

  const recentSales = [
    { vehicle: '2023 BMW X5', price: 75000, date: '2024-08-05', buyer: 'John Smith' },
    { vehicle: '2022 Mercedes S-Class', price: 89000, date: '2024-08-04', buyer: 'Sarah Johnson' },
    { vehicle: '2024 Audi A8', price: 92000, date: '2024-08-03', buyer: 'Michael Brown' },
    { vehicle: '2021 Porsche 911', price: 165000, date: '2024-08-02', buyer: 'Emily Davis' },
    { vehicle: '2023 Lexus LS', price: 78000, date: '2024-08-01', buyer: 'David Wilson' }
  ];

  // Format currency according to current locale
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(i18n.language === 'sq-AL' ? 'sq-AL' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <Head>
        <title>{t('admin.analytics.pageTitle')} - {t('admin.sidebar.title')}</title>
        <meta name="description" content={t('admin.analytics.pageDescription')} />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{t('admin.analytics.title')}</h1>
            <p className="text-neutral-600">{t('admin.analytics.subtitle')}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title={t('admin.analytics.metrics.totalRevenue')}
              value={formatCurrency(4650000)}
              change={t('admin.analytics.metrics.increaseMonth')}
              changeType="increase"
              icon="💰"
            />
            <StatsCard
              title={t('admin.analytics.metrics.vehiclesSold')}
              value="120"
              change={t('admin.analytics.metrics.increaseMonth')}
              changeType="increase"
              icon="🚗"
            />
            <StatsCard
              title={t('admin.analytics.metrics.averageSalePrice')}
              value={formatCurrency(76500)}
              change={t('admin.analytics.metrics.increaseMonth')}
              changeType="increase"
              icon="📈"
            />
            <StatsCard
              title={t('admin.analytics.metrics.conversionRate')}
              value="18.4%"
              change={t('admin.analytics.metrics.decreaseMonth')}
              changeType="decrease"
              icon="🎯"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">{t('admin.analytics.salesTrend.title')}</h3>
              <div className="space-y-3">
                {salesData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 text-sm text-neutral-600">{data.month}</div>
                      <div className="flex-1 bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(data.sales / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-neutral-900">
                        {t('admin.analytics.salesTrend.salesCount', { count: data.sales })}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatCurrency(data.revenue)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">{t('admin.analytics.topBrands.title')}</h3>
              <div className="space-y-4">
                {topBrands.map((brand, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">{brand.brand}</div>
                        <div className="text-sm text-neutral-500">
                          {t('admin.analytics.topBrands.vehicleCount', { count: brand.count })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-neutral-900">{brand.percentage}%</div>
                      <div className="w-12 bg-neutral-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary-600 h-1 rounded-full" 
                          style={{ width: `${brand.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900">{t('admin.analytics.recentSales.title')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.analytics.recentSales.columns.vehicle')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.analytics.recentSales.columns.price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.analytics.recentSales.columns.buyer')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.analytics.recentSales.columns.date')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.analytics.recentSales.columns.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {recentSales.map((sale, index) => (
                    <tr key={index} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{sale.vehicle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">
                          {formatCurrency(sale.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{sale.buyer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">
                          {new Date(sale.date).toLocaleDateString(
                            i18n.language === 'sq-AL' ? 'sq-AL' : 'en-US'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {t('admin.analytics.recentSales.status.completed')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h4 className="text-lg font-medium text-neutral-900 mb-3">
                {t('admin.analytics.insights.bestMonth.title')}
              </h4>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {t('admin.analytics.months.may')} 2024
              </div>
              <div className="text-sm text-neutral-600">
                {t('admin.analytics.insights.bestMonth.vehiclesSold', { count: 28 })}
              </div>
              <div className="text-sm text-neutral-600">
                {formatCurrency(1100000)} {t('admin.analytics.insights.revenue')}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h4 className="text-lg font-medium text-neutral-900 mb-3">
                {t('admin.analytics.insights.mostPopular.title')}
              </h4>
              <div className="text-3xl font-bold text-primary-600 mb-2">BMW X5</div>
              <div className="text-sm text-neutral-600">
                {t('admin.analytics.insights.mostPopular.unitsSold', { count: 8 })}
              </div>
              <div className="text-sm text-neutral-600">
                {t('admin.analytics.insights.mostPopular.avgPrice')}: {formatCurrency(68500)}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h4 className="text-lg font-medium text-neutral-900 mb-3">
                {t('admin.analytics.insights.forecast.title')}
              </h4>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatCurrency(1250000)}
              </div>
              <div className="text-sm text-neutral-600">
                {t('admin.analytics.insights.forecast.nextMonth')}
              </div>
              <div className="text-sm text-green-600 font-medium">
                +14% {t('admin.analytics.insights.forecast.projected')}
              </div>
            </div>
          </div>
          
          {/* Customer Demographics */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-6">
              {t('admin.analytics.demographics.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h5 className="font-medium text-neutral-900 mb-3">
                  {t('admin.analytics.demographics.age.title')}
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">18-25</div>
                    <div className="text-sm font-medium text-neutral-900">8%</div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1">
                    <div className="bg-primary-600 h-1 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">26-35</div>
                    <div className="text-sm font-medium text-neutral-900">22%</div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1">
                    <div className="bg-primary-600 h-1 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">36-45</div>
                    <div className="text-sm font-medium text-neutral-900">35%</div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1">
                    <div className="bg-primary-600 h-1 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">46-55</div>
                    <div className="text-sm font-medium text-neutral-900">25%</div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1">
                    <div className="bg-primary-600 h-1 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">56+</div>
                    <div className="text-sm font-medium text-neutral-900">10%</div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1">
                    <div className="bg-primary-600 h-1 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-neutral-900 mb-3">
                  {t('admin.analytics.demographics.gender.title')}
                </h5>
                <div className="flex space-x-4 h-32 items-end">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-sm font-medium text-neutral-900 mb-1">68%</div>
                    <div className="bg-primary-600 w-full" style={{ height: '68%' }}></div>
                    <div className="text-sm text-neutral-600 mt-2">
                      {t('admin.analytics.demographics.gender.male')}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-sm font-medium text-neutral-900 mb-1">32%</div>
                    <div className="bg-primary-300 w-full" style={{ height: '32%' }}></div>
                    <div className="text-sm text-neutral-600 mt-2">
                      {t('admin.analytics.demographics.gender.female')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-neutral-900 mb-3">
                  {t('admin.analytics.demographics.location.title')}
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">Tirana</div>
                    <div className="text-sm font-medium text-neutral-900">45%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">Durrës</div>
                    <div className="text-sm font-medium text-neutral-900">18%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">Vlorë</div>
                    <div className="text-sm font-medium text-neutral-900">12%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">Shkodër</div>
                    <div className="text-sm font-medium text-neutral-900">9%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-600">{t('admin.analytics.demographics.location.other')}</div>
                    <div className="text-sm font-medium text-neutral-900">16%</div>
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

export default Analytics;
