import React from 'react';
import Head from 'next/head';
import MainLayout from '../src/components/layout/MainLayout';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Services - AutoAni | Premium Automotive Services</title>
        <meta name="description" content="Discover AutoAni's comprehensive range of premium automotive services including sales, financing, maintenance, and concierge services for luxury vehicles." />
        <meta name="keywords" content="automotive services, luxury car services, vehicle financing, maintenance, concierge services, AutoAni" />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Premium Services</h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                Comprehensive automotive solutions designed to exceed your expectations. 
                From sales to service, we provide excellence at every touchpoint.
              </p>
            </div>
          </div>
        </div>

        {/* Main Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Core Services</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                We offer a complete range of services to ensure your luxury automotive 
                experience is seamless, enjoyable, and tailored to your unique needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vehicle Sales */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <span className="text-primary-600 text-2xl">🚗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Premium Vehicle Sales</h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Our curated selection of luxury vehicles undergoes rigorous inspection and certification. 
                  Each vehicle is handpicked for its exceptional quality, performance, and condition.
                </p>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Comprehensive 150-point vehicle inspection
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Detailed vehicle history reports
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Professional detailing and preparation
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Transparent pricing and documentation
                  </li>
                </ul>
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
                  Flexible financing options tailored to your financial situation. Our experienced 
                  finance team works with premium lenders to secure competitive rates and terms.
                </p>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Competitive interest rates and flexible terms
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Quick pre-approval process
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Lease and purchase options available
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Trade-in evaluation and processing
                  </li>
                </ul>
              </div>

              {/* Maintenance & Service */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <span className="text-primary-600 text-2xl">🔧</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Maintenance & Service</h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Professional maintenance and service programs designed to keep your luxury vehicle 
                  performing at its peak. Our certified technicians use only premium parts and fluids.
                </p>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Factory-certified technicians and equipment
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Genuine OEM parts and premium fluids
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Comprehensive service packages
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Convenient scheduling and pickup/delivery
                  </li>
                </ul>
              </div>

              {/* Concierge Services */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <span className="text-primary-600 text-2xl">👔</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Concierge Services</h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  White-glove service that extends beyond the showroom. Our concierge team handles 
                  every detail to ensure a seamless and luxurious ownership experience.
                </p>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Vehicle delivery and pickup services
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Insurance coordination and claims assistance
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    Registration and title transfer services
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    24/7 customer support and assistance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Additional Services</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Comprehensive support services designed to enhance your ownership experience 
                and protect your investment for years to come.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Extended Warranties</h3>
                <p className="text-neutral-600 mb-4">
                  Comprehensive warranty programs that provide peace of mind and protect 
                  against unexpected repair costs.
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Multiple coverage levels available</li>
                  <li>• Nationwide service network</li>
                  <li>• Transferable to new owners</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">🚙</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Trade-In Services</h3>
                <p className="text-neutral-600 mb-4">
                  Professional vehicle appraisal and trade-in services that maximize 
                  the value of your current vehicle.
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Expert market-based valuations</li>
                  <li>• Quick appraisal process</li>
                  <li>• Competitive trade-in offers</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Vehicle Inspection</h3>
                <p className="text-neutral-600 mb-4">
                  Thorough pre-purchase inspections for vehicles from other sources 
                  to ensure quality and peace of mind.
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Comprehensive 150-point inspection</li>
                  <li>• Detailed inspection reports</li>
                  <li>• Professional recommendations</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Vehicle Sourcing</h3>
                <p className="text-neutral-600 mb-4">
                  Can't find the exact vehicle you're looking for? Our sourcing team 
                  will locate your dream car from our network.
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Nationwide dealer network</li>
                  <li>• Custom search parameters</li>
                  <li>• Quality assurance guarantee</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Detailing Services</h3>
                <p className="text-neutral-600 mb-4">
                  Professional detailing services to keep your luxury vehicle looking 
                  pristine and maintaining its value.
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Interior and exterior detailing</li>
                  <li>• Paint protection services</li>
                  <li>• Ceramic coating applications</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Customer Support</h3>
                <p className="text-neutral-600 mb-4">
                  Dedicated customer support team available to assist with any questions 
                  or concerns throughout your ownership experience.
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• 24/7 customer support hotline</li>
                  <li>• Dedicated account managers</li>
                  <li>• Priority service scheduling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Service Process</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Experience a streamlined process designed for your convenience and peace of mind. 
                Every step is crafted to exceed your expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Consultation</h3>
                <p className="text-neutral-600 text-sm">
                  We begin with a detailed consultation to understand your needs, preferences, and budget requirements.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Selection</h3>
                <p className="text-neutral-600 text-sm">
                  Our experts help you select the perfect vehicle from our curated inventory or source it specially for you.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Financing</h3>
                <p className="text-neutral-600 text-sm">
                  We arrange competitive financing options and handle all paperwork to make the process seamless.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Delivery</h3>
                <p className="text-neutral-600 text-sm">
                  Your vehicle is prepared to perfection and delivered with white-glove service and complete documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Experience Premium Service</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Ready to experience the AutoAni difference? Contact us today to learn more about 
              our services and how we can assist with your luxury automotive needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Schedule Consultation
              </a>
              <a 
                href="/vehicles" 
                className="border border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Browse Inventory
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
