import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../src/components/admin/layout/AdminLayout';
import StatsCard from '../../src/components/admin/components/StatsCard';

const Analytics = () => {
  const salesData = [
    { month: 'Jan', sales: 12, revenue: 450000 },
    { month: 'Feb', sales: 18, revenue: 680000 },
    { month: 'Mar', sales: 15, revenue: 620000 },
    { month: 'Apr', sales: 22, revenue: 850000 },
    { month: 'May', sales: 28, revenue: 1100000 },
    { month: 'Jun', sales: 25, revenue: 950000 }
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

  return (
    <>
      <Head>
        <title>Analytics - AutoAni Admin</title>
        <meta name="description" content="Sales analytics and performance metrics" />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
            <p className="text-neutral-600">Track your sales performance and inventory insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Revenue"
              value="$4.65M"
              change="+12.5% this month"
              changeType="increase"
              icon="💰"
            />
            <StatsCard
              title="Vehicles Sold"
              value="120"
              change="+8.3% this month"
              changeType="increase"
              icon="🚗"
            />
            <StatsCard
              title="Average Sale Price"
              value="$76,500"
              change="+5.2% this month"
              changeType="increase"
              icon="📈"
            />
            <StatsCard
              title="Conversion Rate"
              value="18.4%"
              change="-2.1% this month"
              changeType="decrease"
              icon="🎯"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Sales Trend</h3>
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
                      <div className="text-sm font-medium text-neutral-900">{data.sales} sales</div>
                      <div className="text-xs text-neutral-500">${(data.revenue / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Top Brands</h3>
              <div className="space-y-4">
                {topBrands.map((brand, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">{brand.brand}</div>
                        <div className="text-sm text-neutral-500">{brand.count} vehicles</div>
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
              <h3 className="text-lg font-medium text-neutral-900">Recent Sales</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
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
                          ${sale.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{sale.buyer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">
                          {new Date(sale.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
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
              <h4 className="text-lg font-medium text-neutral-900 mb-3">Best Performing Month</h4>
              <div className="text-3xl font-bold text-primary-600 mb-2">May 2024</div>
              <div className="text-sm text-neutral-600">28 vehicles sold</div>
              <div className="text-sm text-neutral-600">$1.1M revenue</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h4 className="text-lg font-medium text-neutral-900 mb-3">Average Days to Sell</h4>
              <div className="text-3xl font-bold text-neutral-900 mb-2">24 days</div>
              <div className="text-sm text-green-600">↗ 15% improvement</div>
              <div className="text-sm text-neutral-600">from last quarter</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h4 className="text-lg font-medium text-neutral-900 mb-3">Most Popular Category</h4>
              <div className="text-3xl font-bold text-neutral-900 mb-2">Luxury SUV</div>
              <div className="text-sm text-neutral-600">45% of all sales</div>
              <div className="text-sm text-primary-600">Premium segment</div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Analytics;
