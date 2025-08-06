import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '../src/components/layout/MainLayout';

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
        <meta name="keywords" content={t('about.meta.keywords')} />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('about.hero.title')}</h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">{t('about.story.title')}</h2>
                <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
                  <p>
                    {t('about.story.paragraph1')}
                  </p>
                  <p>
                    {t('about.story.paragraph2')}
                  </p>
                  <p>
                    {t('about.story.paragraph3')}
                  </p>
                </div>
              </div>
              <div className="bg-neutral-200 rounded-lg h-96 flex items-center justify-center">
                <span className="text-neutral-500 text-lg">Company History Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">{t('about.mission.title')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('about.mission.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{t('about.mission.values.excellence.title')}</h3>
                <p className="text-neutral-600">
                  {t('about.mission.values.excellence.description')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{t('about.mission.values.integrity.title')}</h3>
                <p className="text-neutral-600">
                  {t('about.mission.values.integrity.description')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{t('about.mission.values.innovation.title')}</h3>
                <p className="text-neutral-600">
                  {t('about.mission.values.innovation.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">{t('about.team.title')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('about.team.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-neutral-500">CEO Photo</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('about.team.members.ceo.role')}</h3>
                <p className="text-primary-600 font-medium mb-4">{t('about.team.members.ceo.position')}</p>
                <p className="text-neutral-600">
                  {t('about.team.members.ceo.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-neutral-500">Manager Photo</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('about.team.members.sales.role')}</h3>
                <p className="text-primary-600 font-medium mb-4">{t('about.team.members.sales.position')}</p>
                <p className="text-neutral-600">
                  {t('about.team.members.sales.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-neutral-500">Specialist Photo</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('about.team.members.specialists.role')}</h3>
                <p className="text-primary-600 font-medium mb-4">{t('about.team.members.specialists.position')}</p>
                <p className="text-neutral-600">
                  {t('about.team.members.specialists.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">{t('about.whyChoose.title')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('about.whyChoose.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{t('about.whyChoose.reasons.quality.title')}</h3>
                <p className="text-neutral-600 text-sm">
                  {t('about.whyChoose.reasons.quality.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">🏅</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{t('about.whyChoose.reasons.service.title')}</h3>
                <p className="text-neutral-600 text-sm">
                  {t('about.whyChoose.reasons.service.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{t('about.whyChoose.reasons.warranty.title')}</h3>
                <p className="text-neutral-600 text-sm">
                  {t('about.whyChoose.reasons.warranty.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">💎</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{t('about.whyChoose.reasons.experience.title')}</h3>
                <p className="text-neutral-600 text-sm">
                  {t('about.whyChoose.reasons.experience.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">{t('about.cta.title')}</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/vehicles" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                {t('about.cta.inventory')}
              </a>
              <a 
                href="/contact" 
                className="border border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                {t('about.cta.contact')}
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
