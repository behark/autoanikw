import React, { useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/layout/AdminLayout';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'AutoAni',
    siteDescription: 'Premium luxury vehicles for exceptional people',
    contactEmail: 'info@autoani.com',
    contactPhone: '(555) 123-4567',
    address: '123 Luxury Ave, Premium City, PC 12345',
    currency: 'USD',
    taxRate: '8.5',
    notifications: {
      newInquiries: true,
      lowStock: true,
      salesReports: false,
      systemUpdates: true
    },
    displaySettings: {
      vehiclesPerPage: 12,
      showPriceRange: true,
      enableReservations: true,
      requireCustomsInfo: false
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => {
      if (section === 'notifications' || section === 'displaySettings') {
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof typeof prev] as object),
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'display', name: 'Display', icon: '🖥️' },
    { id: 'business', name: 'Business', icon: '🏢' }
  ];

  return (
    <>
      <Head>
        <title>Settings - AutoAni Admin</title>
        <meta name="description" content="Configure your AutoAni admin settings" />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
            <p className="text-neutral-600">Manage your application settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
                <div className="px-6 py-4 border-b border-neutral-200">
                  <h3 className="text-lg font-medium text-neutral-900">
                    {tabs.find(tab => tab.id === activeTab)?.name} Settings
                  </h3>
                </div>

                <div className="p-6">
                  {/* General Settings */}
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Site Name
                          </label>
                          <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            value={settings.contactEmail}
                            onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Site Description
                        </label>
                        <textarea
                          value={settings.siteDescription}
                          onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Contact Phone
                          </label>
                          <input
                            type="tel"
                            value={settings.contactPhone}
                            onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Currency
                          </label>
                          <select
                            value={settings.currency}
                            onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CAD">CAD (C$)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Business Address
                        </label>
                        <textarea
                          value={settings.address}
                          onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-neutral-900">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {key === 'newInquiries' && 'Get notified when new customer inquiries come in'}
                                {key === 'lowStock' && 'Alert when vehicle inventory is running low'}
                                {key === 'salesReports' && 'Receive weekly sales performance reports'}
                                {key === 'systemUpdates' && 'Get notified about system maintenance and updates'}
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value as boolean}
                                onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display Settings */}
                  {activeTab === 'display' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Vehicles Per Page
                          </label>
                          <select
                            value={settings.displaySettings.vehiclesPerPage}
                            onChange={(e) => handleInputChange('displaySettings', 'vehiclesPerPage', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={48}>48</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(settings.displaySettings).filter(([key]) => key !== 'vehiclesPerPage').map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-neutral-900">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {key === 'showPriceRange' && 'Display price ranges in vehicle listings'}
                                {key === 'enableReservations' && 'Allow customers to reserve vehicles'}
                                {key === 'requireCustomsInfo' && 'Require customs information for international vehicles'}
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value as boolean}
                                onChange={(e) => handleInputChange('displaySettings', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business Settings */}
                  {activeTab === 'business' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Tax Rate (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={settings.taxRate}
                            onChange={(e) => setSettings(prev => ({ ...prev, taxRate: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div className="bg-neutral-50 rounded-lg p-4">
                        <h4 className="font-medium text-neutral-900 mb-2">Business Hours</h4>
                        <div className="space-y-2 text-sm text-neutral-600">
                          <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                          <div>Saturday: 9:00 AM - 4:00 PM</div>
                          <div>Sunday: Closed</div>
                        </div>
                        <button className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Edit Hours
                        </button>
                      </div>

                      <div className="bg-neutral-50 rounded-lg p-4">
                        <h4 className="font-medium text-neutral-900 mb-2">Payment Methods</h4>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-neutral-700">Cash</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-neutral-700">Credit Card</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-neutral-700">Bank Transfer</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-neutral-700">Financing</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center"
                      >
                        {saving && (
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {saving ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
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

export default Settings;
