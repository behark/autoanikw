import React, { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '@/components/layout/MainLayout';

export default function ContactPage() {
  const { t } = useTranslation('common');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
        <meta name="keywords" content={t('contact.meta.keywords')} />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('contact.hero.title')}</h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                {t('contact.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information & Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-8">{t('contact.info.title')}</h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  {t('contact.info.description')}
                </p>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{t('contact.info.phone.title')}</h3>
                      <p className="text-neutral-600 mb-1">{t('contact.info.phone.number')}</p>
                      <p className="text-sm text-neutral-500">{t('contact.info.phone.hours')}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{t('contact.info.email.title')}</h3>
                      <p className="text-neutral-600 mb-1">{t('contact.info.email.address')}</p>
                      <p className="text-sm text-neutral-500">{t('contact.info.email.support')}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{t('contact.info.address.title')}</h3>
                      <p className="text-neutral-600 mb-1">{t('contact.info.address.line1')}</p>
                      <p className="text-neutral-600 mb-1">{t('contact.info.address.line2')}</p>
                      <p className="text-neutral-600">{t('contact.info.address.line3')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('contact.form.title')}</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">{t('contact.form.success')}</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t('contact.form.name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder={t('contact.form.name')}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t('contact.form.phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="+355 XX XXX XXX"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t('contact.form.subject')} *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder={t('contact.form.subject')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder={t('contact.form.message')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white py-3 px-6 rounded-md font-semibold transition-colors flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.submit')}...
                        </>
                      ) : (
                        t('contact.form.submit')
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('contact.map.title')}</h2>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
              <div className="bg-neutral-200 rounded-lg h-64 flex items-center justify-center mb-6">
                <span className="text-neutral-500 text-lg">Interactive Map</span>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-neutral-900">{t('contact.info.address.line1')}</p>
                <p className="text-neutral-600">{t('contact.info.address.line2')}</p>
                <p className="text-neutral-600">{t('contact.info.address.line3')}</p>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {t('contact.map.directions')}
                </button>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {t('contact.map.view')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('contact.hours.title')}</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('contact.hours.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Business Hours */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">{t('contact.hours.title')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="font-medium text-neutral-700">{t('contact.hours.monday')}</span>
                    <span className="text-neutral-600">{t('contact.hours.time')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="font-medium text-neutral-700">{t('contact.hours.saturday')}</span>
                    <span className="text-neutral-600">{t('contact.hours.time')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="font-medium text-neutral-700">{t('contact.hours.sunday')}</span>
                    <span className="text-neutral-600">{t('contact.hours.appointment')}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <strong>{t('contact.hours.note')}</strong> {t('contact.hours.appointment')}
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">{t('contact.map.title')}</h3>
                <div className="bg-neutral-200 rounded-lg h-64 flex items-center justify-center mb-6">
                  <span className="text-neutral-500 text-lg">Interactive Map</span>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-neutral-900">{t('contact.info.address.line1')}</p>
                  <p className="text-neutral-600">{t('contact.info.address.line2')}</p>
                  <p className="text-neutral-600">{t('contact.info.address.line3')}</p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    {t('contact.map.directions')}
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    {t('contact.map.view')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('contact.faq.title')}</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('contact.faq.description')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('contact.faq.trade')}</h3>
                <p className="text-neutral-600">
                  {t('contact.faq.trade.description')}
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('contact.faq.financing')}</h3>
                <p className="text-neutral-600">
                  {t('contact.faq.financing.description')}
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('contact.faq.history')}</h3>
                <p className="text-neutral-600">
                  {t('contact.faq.history.description')}
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('contact.faq.locate')}</h3>
                <p className="text-neutral-600">
                  {t('contact.faq.locate.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">{t('contact.call.title')}</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              {t('contact.call.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:555-123-4567" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                {t('contact.call.phone')}
              </a>
              <a 
                href="/vehicles" 
                className="border border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                {t('contact.call.inventory')}
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
