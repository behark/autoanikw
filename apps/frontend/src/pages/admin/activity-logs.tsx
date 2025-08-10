import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import ActivityLogFilters from '../../components/admin/activity/ActivityLogFilters';
import ActivityLogTable from '../../components/admin/activity/ActivityLogTable';
import adminAPI from '../../services/adminAPI';
import { ActivityLog } from '../../types/activity';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'sq-AL', ['common']))
    }
  };
};

const ActivityLogsPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });

  useEffect(() => {
    fetchLogs();
  }, [pagination.currentPage, filters]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getActivityLogs({
        ...filters,
        page: pagination.currentPage,
        limit: pagination.limit
      });

      if (response.success) {
        setLogs(response.logs);
        setPagination(prevPagination => ({
          ...prevPagination,
          totalItems: response.total,
          totalPages: Math.ceil(response.total / response.limit)
        }));
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      currentPage: page
    }));
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setPagination(prevPagination => ({
      ...prevPagination,
      currentPage: 1
    }));
  };

  const handleClearLogs = async () => {
    if (window.confirm(t('admin.activityLogs.confirmClear'))) {
      try {
        const response = await adminAPI.clearActivityLogs();
        if (response.success) {
          fetchLogs();
        }
      } catch (error) {
        console.error('Error clearing activity logs:', error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              {t('admin.activityLogs.title')}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button
                onClick={handleClearLogs}
                className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {t('admin.activityLogs.clearLogs')}
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('admin.activityLogs.export')}
              </button>
            </div>
          </div>
          
          <p className="mt-2 text-sm text-gray-500">
            {t('admin.activityLogs.description')}
          </p>
        </div>

        <ActivityLogFilters
          initialFilters={filters}
          onApplyFilters={handleFilterChange}
        />

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('admin.activityLogs.results')} 
            {pagination.totalItems > 0 && (
              <span className="text-gray-500 font-normal">
                ({pagination.totalItems} {t('admin.activityLogs.totalEntries')})
              </span>
            )}
          </h2>

          <ActivityLogTable
            logs={logs}
            loading={loading}
            onPageChange={handlePageChange}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            filters={filters}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActivityLogsPage;
