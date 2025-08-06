import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminLayout from '../../../src/components/admin/layout/AdminLayout';
import UserForm from '../../../src/components/admin/components/UserForm';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const AddUser = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleCancel = () => {
    router.push('/admin/users');
  };

  return (
    <>
      <Head>
        <title>{t('admin.userManager.form.addUser')} - {t('admin.sidebar.title')}</title>
        <meta name="description" content={t('admin.userManager.pageDescription')} />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{t('admin.userManager.form.addUser')}</h1>
            <p className="text-neutral-600">{t('admin.userManager.description')}</p>
          </div>

          {/* User Form */}
          <UserForm onCancel={handleCancel} />
        </div>
      </AdminLayout>
    </>
  );
};

export default AddUser;
