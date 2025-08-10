import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ActivityAction, EntityType } from '../../../types/activity';

interface ActivityLogFiltersProps {
  onApplyFilters: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
}

const ActivityLogFilters: React.FC<ActivityLogFiltersProps> = ({
  onApplyFilters,
  initialFilters = {}
}) => {
  const { t } = useTranslation('common');
  const [filters, setFilters] = useState({
    entityType: initialFilters.entityType || '',
    action: initialFilters.action || '',
    dateFrom: initialFilters.dateFrom || '',
    dateTo: initialFilters.dateTo || '',
    userId: initialFilters.userId || '',
    searchQuery: initialFilters.searchQuery || ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyFilters = () => {
    // Filter out empty values
    const appliedFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    onApplyFilters(appliedFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      entityType: '',
      action: '',
      dateFrom: '',
      dateTo: '',
      userId: '',
      searchQuery: ''
    });
    onApplyFilters({});
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('admin.activityLogs.filters.title')}
        </h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Entity Type Filter */}
          <div>
            <label htmlFor="entityType" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.activityLogs.filters.entityType')}
            </label>
            <select
              id="entityType"
              name="entityType"
              value={filters.entityType}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">{t('admin.activityLogs.filters.allEntities')}</option>
              <option value="vehicle">{t('admin.activityLogs.entities.vehicle')}</option>
              <option value="user">{t('admin.activityLogs.entities.user')}</option>
              <option value="media">{t('admin.activityLogs.entities.media')}</option>
              <option value="settings">{t('admin.activityLogs.entities.settings')}</option>
              <option value="report">{t('admin.activityLogs.entities.report')}</option>
              <option value="notification">{t('admin.activityLogs.entities.notification')}</option>
              <option value="system">{t('admin.activityLogs.entities.system')}</option>
            </select>
          </div>
          
          {/* Action Type Filter */}
          <div>
            <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.activityLogs.filters.action')}
            </label>
            <select
              id="action"
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">{t('admin.activityLogs.filters.allActions')}</option>
              <option value="create">{t('admin.activityLogs.actions.create')}</option>
              <option value="update">{t('admin.activityLogs.actions.update')}</option>
              <option value="delete">{t('admin.activityLogs.actions.delete')}</option>
              <option value="view">{t('admin.activityLogs.actions.view')}</option>
              <option value="login">{t('admin.activityLogs.actions.login')}</option>
              <option value="logout">{t('admin.activityLogs.actions.logout')}</option>
              <option value="import">{t('admin.activityLogs.actions.import')}</option>
              <option value="export">{t('admin.activityLogs.actions.export')}</option>
              <option value="publish">{t('admin.activityLogs.actions.publish')}</option>
              <option value="unpublish">{t('admin.activityLogs.actions.unpublish')}</option>
              <option value="upload">{t('admin.activityLogs.actions.upload')}</option>
              <option value="download">{t('admin.activityLogs.actions.download')}</option>
              <option value="settings_change">{t('admin.activityLogs.actions.settings_change')}</option>
              <option value="status_change">{t('admin.activityLogs.actions.status_change')}</option>
            </select>
          </div>
          
          {/* Search Query */}
          <div>
            <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.activityLogs.filters.searchQuery')}
            </label>
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              placeholder={t('admin.activityLogs.filters.searchPlaceholder')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          {/* Date Range */}
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.activityLogs.filters.dateFrom')}
            </label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.activityLogs.filters.dateTo')}
            </label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          {/* User ID Filter */}
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.activityLogs.filters.userId')}
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={filters.userId}
              onChange={handleFilterChange}
              placeholder={t('admin.activityLogs.filters.userIdPlaceholder')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleResetFilters}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {t('admin.activityLogs.filters.reset')}
        </button>
        <button
          type="button"
          onClick={handleApplyFilters}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {t('admin.activityLogs.filters.apply')}
        </button>
      </div>
    </div>
  );
};

export default ActivityLogFilters;
