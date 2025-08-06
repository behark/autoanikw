import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '@/components/layout/MainLayout';

export default function ServicesPage() {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Head>
        <title>{t('services.meta.title')}</title>
        <meta name="description" content={t('services.meta.description')} />
        <meta name="keywords" content={t('services.meta.keywords')} />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                Premium automotive solutions tailored to your needs
              </p>
            </div>
          </div>
        </div>

        {/* Simplified content to avoid i18n mapping issues */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Core Services</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                We offer a comprehensive range of automotive services
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vehicle Sales */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <span className="text-primary-600 text-2xl">🚗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Vehicle Sales</h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Find your perfect vehicle from our curated collection
                </p>
              </div>

              {/* Financing Solutions */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <span className="text-primary-600 text-2xl">💳</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Financing Solutions</h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Flexible financing options to fit your budget
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/vehicles" 
                className="border border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                View Inventory
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
