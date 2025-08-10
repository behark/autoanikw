import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '../src/components/layout/MainLayout';
import Navbar from '../src/components/layout/Navbar';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <MainLayout>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content={t('keywords')} />
        <meta property="og:title" content={t('og.title')} />
        <meta property="og:description" content={t('og.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autoani.netlify.app" />
        <meta property="og:image" content="https://autoani.netlify.app/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://autoani.netlify.app" />
      </Head>

      {/* Luxury Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">500+</span>
              <span className="hero-stat-label">{t('hero.stats.vehicles')}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">25+</span>
              <span className="hero-stat-label">{t('hero.stats.experience')}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">98%</span>
              <span className="hero-stat-label">{t('hero.stats.satisfaction')}</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <a href="/vehicles" className="btn-primary">{t('hero.buttons.inventory')}</a>
            <a href="/about" className="btn-secondary">{t('hero.buttons.about')}</a>
          </div>
        </div>
      </section>

      {/* Premium Selection Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('premiumSelection.badge')}</span>
            <h2 className="section-title">{t('premiumSelection.title')}</h2>
            <p className="section-subtitle">
              {t('premiumSelection.subtitle')}
            </p>
          </div>
          
          <div className="vehicle-grid">
            {/* Luxury Vehicle Card 1 */}
            <div className="vehicle-card">
              <div className="vehicle-image">
                <div className="vehicle-badge">{t('vehicle.badge.premium')}</div>
                <div className="vehicle-image-placeholder">
                  {t('vehicle.image.mercedes')}
                </div>
              </div>
              <div className="vehicle-content">
                <div className="vehicle-brand">{t('vehicle.brand.mercedes')}</div>
                <h3 className="vehicle-title">{t('vehicle.title.mercedes')}</h3>
                <div className="vehicle-price">{t('vehicle.price.mercedes')}</div>
                <div className="vehicle-details">
                  <span className="vehicle-detail">{t('vehicle.details.mercedes')}</span>
                </div>
                <div className="vehicle-actions">
                  <a href="#" className="btn btn-primary btn-sm">{t('vehicle.actions.viewDetails')}</a>
                  <a href="#" className="btn btn-secondary btn-sm">{t('vehicle.actions.contact')}</a>
                </div>
              </div>
            </div>

            {/* Luxury Vehicle Card 2 */}
            <div className="vehicle-card">
              <div className="vehicle-image">
                <div className="vehicle-badge">{t('vehicle.badge.certified')}</div>
                <div className="vehicle-image-placeholder">
                  {t('vehicle.image.bmw')}
                </div>
              </div>
              <div className="vehicle-content">
                <div className="vehicle-brand">{t('vehicle.brand.bmw')}</div>
                <h3 className="vehicle-title">{t('vehicle.title.bmw')}</h3>
                <div className="vehicle-price">{t('vehicle.price.bmw')}</div>
                <div className="vehicle-details">
                  <span className="vehicle-detail">{t('vehicle.details.bmw')}</span>
                </div>
                <div className="vehicle-actions">
                  <a href="#" className="btn btn-primary btn-sm">{t('vehicle.actions.viewDetails')}</a>
                  <a href="#" className="btn btn-secondary btn-sm">{t('vehicle.actions.contact')}</a>
                </div>
              </div>
            </div>

            {/* Luxury Vehicle Card 3 */}
            <div className="vehicle-card">
              <div className="vehicle-image">
                <div className="vehicle-badge">{t('vehicle.badge.exclusive')}</div>
                <div className="vehicle-image-placeholder">
                  {t('vehicle.image.audi')}
                </div>
              </div>
              <div className="vehicle-content">
                <div className="vehicle-brand">{t('vehicle.brand.audi')}</div>
                <h3 className="vehicle-title">{t('vehicle.title.audi')}</h3>
                <div className="vehicle-price">{t('vehicle.price.audi')}</div>
                <div className="vehicle-details">
                  <span className="vehicle-detail">{t('vehicle.details.audi')}</span>
                </div>
                <div className="vehicle-actions">
                  <a href="#" className="btn btn-primary btn-sm">{t('vehicle.actions.viewDetails')}</a>
                  <a href="#" className="btn btn-secondary btn-sm">{t('vehicle.actions.contact')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('premiumServices.badge')}</span>
            <h2 className="section-title">{t('premiumServices.title')}</h2>
            <p className="section-subtitle">
              {t('premiumServices.subtitle')}
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3 className="service-title">{t('premiumServices.inspection.title')}</h3>
              <p className="service-description">
                {t('premiumServices.inspection.description')}
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3 className="service-title">{t('premiumServices.warranty.title')}</h3>
              <p className="service-description">
                {t('premiumServices.warranty.description')}
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3 className="service-title">{t('premiumServices.brands.title')}</h3>
              <p className="service-description">
                {t('premiumServices.brands.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <p>{t('footer')}</p>
        </div>
      </footer>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}