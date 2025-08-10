import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { User, formatUserName, getUserRoleName, getUserStatusBadgeType } from '@/types/user';
import adminAPI from '@/services/adminAPI';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const UserManagement = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminAPI.getUsers();
        setUsers(response.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return user.status === 'active';
    if (activeFilter === 'inactive') return user.status === 'inactive';
    if (activeFilter === 'admin') return user.role === 'admin';
    if (activeFilter === 'staff') return user.role === 'manager' || user.role === 'editor';
    return true;
  });

  const handleAddUser = () => {
    router.push('/admin/users/add');
  };

  const handleEditUser = (userId: string) => {
    router.push(`/admin/users/edit/${userId}`);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await adminAPI.deleteUser(userToDelete._id);
      setUsers(users.filter(user => user._id !== userToDelete._id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString(
      i18n.language === 'sq-AL' ? 'sq-AL' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  return (
    <>
      <Head>
        <title>{t('admin.userManager.pageTitle')} - {t('admin.sidebar.title')}</title>
        <meta name="description" content={t('admin.userManager.pageDescription')} />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">{t('admin.userManager.title')}</h1>
              <p className="text-neutral-600">{t('admin.userManager.description')}</p>
            </div>
            <button 
              onClick={handleAddUser}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              {t('admin.userManager.addUser')}
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeFilter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('admin.userManager.filters.all')}
            </button>
            <button 
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeFilter === 'active' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('admin.userManager.filters.active')}
            </button>
            <button 
              onClick={() => setActiveFilter('inactive')}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeFilter === 'inactive' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('admin.userManager.filters.inactive')}
            </button>
            <button 
              onClick={() => setActiveFilter('admin')}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeFilter === 'admin' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('admin.userManager.filters.admin')}
            </button>
            <button 
              onClick={() => setActiveFilter('staff')}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeFilter === 'staff' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('admin.userManager.filters.staff')}
            </button>
          </div>

          {/* User Count */}
          <div className="text-sm text-neutral-500">
            {t('admin.userManager.userCount', { count: filteredUsers.length })}
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.userManager.table.name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.userManager.table.email')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.userManager.table.role')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.userManager.table.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.userManager.table.lastLogin')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t('admin.userManager.table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                          <span className="text-neutral-600">{t('common.loading')}</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-neutral-500">
                        {t('common.noResults')}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-900">
                            {formatUserName(user)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-600">
                            {getUserRoleName(user.role, t)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getUserStatusBadgeType(user.status) === 'success' 
                              ? 'bg-green-100 text-green-800' 
                              : getUserStatusBadgeType(user.status) === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {t(`admin.userManager.status.${user.status}`)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-600">
                            {user.lastLogin ? formatDate(user.lastLogin) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => handleEditUser(user._id)}
                            className="text-primary-600 hover:text-primary-900 mr-3"
                          >
                            {t('common.edit')}
                          </button>
                          <button
                            onClick={() => confirmDelete(user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t('common.delete')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-neutral-900">{t('admin.userManager.confirmDelete.title')}</h3>
                      <div className="mt-2">
                        <p className="text-sm text-neutral-500">
                          {t('admin.userManager.confirmDelete.message')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteUser}
                  >
                    {t('admin.userManager.confirmDelete.confirm')}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    {t('admin.userManager.confirmDelete.cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default UserManagement;
