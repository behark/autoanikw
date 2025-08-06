import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ActivityLog, ActivityAction, EntityType } from '../../../types/activity';

interface ActivityLogTableProps {
  logs: ActivityLog[];
  loading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  onFilterChange?: (filters: Record<string, any>) => void;
  filters?: Record<string, any>;
}

const ActivityLogTable: React.FC<ActivityLogTableProps> = ({
  logs,
  loading,
  onPageChange,
  currentPage,
  totalPages,
  onFilterChange,
  filters = {}
}) => {
  const { t } = useTranslation('common');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const getActionColor = (action: ActivityAction) => {
    switch (action) {
      case 'create':
      case 'publish':
        return 'text-green-600';
      case 'update':
      case 'settings_change':
      case 'status_change':
        return 'text-blue-600';
      case 'delete':
      case 'unpublish':
        return 'text-red-600';
      case 'login':
      case 'logout':
        return 'text-purple-600';
      case 'import':
      case 'export':
      case 'upload':
      case 'download':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActionIcon = (action: ActivityAction) => {
    switch (action) {
      case 'create':
        return '➕';
      case 'update':
        return '✏️';
      case 'delete':
        return '🗑️';
      case 'view':
        return '👁️';
      case 'login':
        return '🔑';
      case 'logout':
        return '🚪';
      case 'import':
        return '📥';
      case 'export':
        return '📤';
      case 'publish':
        return '📢';
      case 'unpublish':
        return '🔕';
      case 'upload':
        return '📤';
      case 'download':
        return '📥';
      case 'settings_change':
        return '⚙️';
      case 'status_change':
        return '🔄';
      default:
        return '❓';
    }
  };

  const getEntityIcon = (entityType: EntityType) => {
    switch (entityType) {
      case 'vehicle':
        return '🚗';
      case 'user':
        return '👤';
      case 'media':
        return '🖼️';
      case 'settings':
        return '⚙️';
      case 'report':
        return '📊';
      case 'notification':
        return '🔔';
      case 'system':
        return '💻';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('sq-AL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleExpand = (logId: string) => {
    if (expandedLogId === logId) {
      setExpandedLogId(null);
    } else {
      setExpandedLogId(logId);
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-sm text-gray-500">
            {t('admin.activityLogs.pagination.showing')} {currentPage} {t('admin.activityLogs.pagination.of')} {totalPages}
          </p>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            &larr; {t('admin.activityLogs.pagination.prev')}
          </button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            const pageNum = currentPage - 2 + index;
            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    pageNum === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t('admin.activityLogs.pagination.next')} &rarr;
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">{t('admin.activityLogs.noLogs')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              {t('admin.activityLogs.columns.action')}
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              {t('admin.activityLogs.columns.details')}
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              {t('admin.activityLogs.columns.user')}
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              {t('admin.activityLogs.columns.date')}
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
              {t('admin.activityLogs.columns.expand')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {logs.map((log) => (
            <React.Fragment key={log._id}>
              <tr className={expandedLogId === log._id ? 'bg-blue-50' : undefined}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">{getActionIcon(log.action)}</span>
                    <span className={`font-medium ${getActionColor(log.action)}`}>
                      {t(`admin.activityLogs.actions.${log.action}`)}
                    </span>
                  </div>
                  <div className="text-gray-500 flex items-center mt-1">
                    <span className="mr-1">{getEntityIcon(log.entityType)}</span>
                    {t(`admin.activityLogs.entities.${log.entityType}`)}
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-gray-900">
                  <div className="font-medium truncate max-w-xs">
                    {log.entityName || log.entityType}
                  </div>
                  <div className="text-gray-500 truncate max-w-xs">
                    {log.details || t('admin.activityLogs.noDetails')}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {log.userName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(log.createdAt)}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <button
                    onClick={() => toggleExpand(log._id)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    {expandedLogId === log._id ? 
                      t('admin.activityLogs.actions.collapse') : 
                      t('admin.activityLogs.actions.expand')}
                  </button>
                </td>
              </tr>
              {expandedLogId === log._id && (
                <tr className="bg-blue-50">
                  <td colSpan={5} className="p-4">
                    <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
                      <h4 className="font-medium mb-2">{t('admin.activityLogs.detailedInfo')}</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{t('admin.activityLogs.fields.id')}</p>
                          <p className="text-sm">{log._id}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{t('admin.activityLogs.fields.ip')}</p>
                          <p className="text-sm">{log.ipAddress || t('admin.activityLogs.notAvailable')}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{t('admin.activityLogs.fields.entityId')}</p>
                          <p className="text-sm">{log.entityId || t('admin.activityLogs.notAvailable')}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{t('admin.activityLogs.fields.userId')}</p>
                          <p className="text-sm">{log.userId}</p>
                        </div>
                      </div>
                      
                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-sm font-medium mb-1">{t('admin.activityLogs.metadata')}</h5>
                          <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default ActivityLogTable;
