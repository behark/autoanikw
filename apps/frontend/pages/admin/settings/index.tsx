import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Tab } from '@headlessui/react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { SiteSetting, SettingGroup, SettingsFormData } from '@/types/settings';
import adminAPI from '@/services/adminAPI';
import MediaPicker from '@/components/admin/components/MediaPicker';

const Settings = () => {
  const { t } = useTranslation('common');
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [formData, setFormData] = useState<SettingsFormData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [activeImageSetting, setActiveImageSetting] = useState<string>('');

  // Group settings by their 'group' property
  const settingGroups: Record<string, SiteSetting[]> = settings.reduce((acc, setting) => {
    if (!acc[setting.group]) {
      acc[setting.group] = [];
    }
    acc[setting.group].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>);

  // The order in which we want to display the tabs
  const groupOrder: SettingGroup[] = [
    'general',
    'contact',
    'social',
    'seo',
    'appearance',
    'localization',
    'advanced'
  ];

  // Filter and order the groups based on our predefined order
  const orderedGroups = Object.entries(settingGroups)
    .filter(([group]) => groupOrder.includes(group as SettingGroup))
    .sort(([a], [b]) => {
      return groupOrder.indexOf(a as SettingGroup) - groupOrder.indexOf(b as SettingGroup);
    });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getSettings();
      if (response.success) {
        setSettings(response.settings);
        
        // Initialize form data with current setting values
        const initialData: SettingsFormData = {};
        response.settings.forEach(setting => {
          // Handle object values by converting to string[] if possible, or stringify otherwise
          if (typeof setting.value === 'object' && setting.value !== null) {
            if (Array.isArray(setting.value)) {
              // Convert array to string[] if possible
              initialData[setting.key] = setting.value.map(item => String(item));
            } else {
              // Skip complex objects or convert to string if needed
              console.warn(`Skipping complex object value for setting: ${setting.key}`);
              // Alternative: convert to JSON string if needed:
              // initialData[setting.key] = JSON.stringify(setting.value);
            }
          } else {
            // Handle primitive types (string, number, boolean)
            initialData[setting.key] = setting.value as string | number | boolean;
          }
        });
        setFormData(initialData);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      const response = await adminAPI.bulkUpdateSettings(formData);
      if (response.success) {
        setSettings(response.settings);
        setSaveSuccess(true);
        
        // Reset form data with updated values
        const updatedData: SettingsFormData = {};
        response.settings.forEach(setting => {
          // Handle object values by converting to string[] if possible, or stringify otherwise
          if (typeof setting.value === 'object' && setting.value !== null) {
            if (Array.isArray(setting.value)) {
              // Convert array to string[] if possible
              updatedData[setting.key] = setting.value.map(item => String(item));
            } else {
              // Skip complex objects or convert to string if needed
              console.warn(`Skipping complex object value for setting: ${setting.key}`);
              // Alternative: convert to JSON string if needed:
              // updatedData[setting.key] = JSON.stringify(setting.value);
            }
          } else {
            // Handle primitive types (string, number, boolean)
            updatedData[setting.key] = setting.value as string | number | boolean;
          }
        });
        setFormData(updatedData);
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(response.message || t('admin.settings.saveFailed'));
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveError(t('admin.settings.saveFailed'));
    } finally {
      setSaving(false);
    }
  };

  const handleMediaSelect = (selectedItems: any[]) => {
    if (selectedItems.length > 0 && activeImageSetting) {
      const selectedUrl = selectedItems[0].url;
      handleInputChange(activeImageSetting, selectedUrl);
      setIsMediaPickerOpen(false);
    }
  };

  const openMediaPicker = (settingKey: string) => {
    setActiveImageSetting(settingKey);
    setIsMediaPickerOpen(true);
  };

  const renderSettingInput = (setting: SiteSetting) => {
    const { key, type, label, description, options } = setting;
    const value = formData[key];

    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            id={key}
            value={value as string}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={key}
            value={value as string}
            onChange={(e) => handleInputChange(key, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            id={key}
            value={value as number}
            onChange={(e) => handleInputChange(key, Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={key}
              checked={!!value}
              onChange={(e) => handleInputChange(key, e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={key} className="ml-2 block text-sm text-gray-900">
              {label}
            </label>
          </div>
        );
      
      case 'select':
        return (
          <select
            id={key}
            value={value as string}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              id={key}
              value={value as string}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="p-1 border border-gray-300 rounded-md shadow-sm h-10 w-12"
            />
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="text"
              id={key}
              value={value as string}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {value && typeof value === 'string' && (
              <div className="mt-2">
                <img 
                  src={value.startsWith('http') ? value : `${process.env.NEXT_PUBLIC_API_URL || ''}${value}`} 
                  alt={`Preview of ${label}`} 
                  className="h-16 object-contain rounded border border-gray-200"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => openMediaPicker(key)}
              className="px-3 py-1 text-sm border border-gray-300 rounded shadow-sm hover:bg-gray-50"
            >
              {t('admin.settings.selectFromMedia')}
            </button>
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            id={key}
            value={value as string}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        );
    }
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('admin.settings.title')}
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  {/* Status messages */}
                  {saveSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                      {t('admin.settings.saveSuccess')}
                    </div>
                  )}
                  {saveError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                      {saveError}
                    </div>
                  )}
                  
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6 overflow-x-auto">
                      {orderedGroups.map(([group, groupSettings]) => (
                        <Tab
                          key={group}
                          className={({ selected }) =>
                            `w-full py-2.5 text-sm font-medium leading-5 rounded-lg whitespace-nowrap
                             ${
                               selected
                                 ? 'bg-white shadow text-primary-700'
                                 : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                             }
                            `
                          }
                        >
                          {t(`admin.settings.groups.${group}`)}
                        </Tab>
                      ))}
                    </Tab.List>
                    
                    <form onSubmit={handleSubmit}>
                      <Tab.Panels className="mt-2">
                        {orderedGroups.map(([group, groupSettings]) => (
                          <Tab.Panel
                            key={group}
                            className="space-y-6 bg-white p-3"
                          >
                            {groupSettings.map(setting => (
                              <div key={setting._id} className={`${setting.type === 'boolean' ? '' : 'grid grid-cols-1 md:grid-cols-3 gap-4'} py-4 border-b border-gray-200`}>
                                {setting.type !== 'boolean' && (
                                  <div className="space-y-1">
                                    <label
                                      htmlFor={setting.key}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      {setting.label}
                                    </label>
                                    {setting.description && (
                                      <p className="text-xs text-gray-500">
                                        {setting.description}
                                      </p>
                                    )}
                                  </div>
                                )}
                                <div className={setting.type === 'boolean' ? 'py-1' : 'md:col-span-2'}>
                                  {renderSettingInput(setting)}
                                </div>
                              </div>
                            ))}
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          type="submit"
                          disabled={saving}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                            saving ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {saving ? t('admin.settings.saving') : t('admin.settings.save')}
                        </button>
                      </div>
                    </form>
                  </Tab.Group>
                  
                  {/* Media Picker Modal */}
                  {isMediaPickerOpen && (
                    <MediaPicker
                      onClose={() => setIsMediaPickerOpen(false)}
                      onSelect={handleMediaSelect}
                      multiple={false}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'sq-AL', ['common'])),
    },
  };
};

export default Settings;
