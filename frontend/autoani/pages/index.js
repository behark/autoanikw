import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const router = useRouter();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">AutoAni</h1>
          <p className="text-xl mb-8">
            Welcome to AutoAni - Your premier auto dealership platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push('/vehicles')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Browse Vehicles
            </button>
            <button
              onClick={() => router.push('/about')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};