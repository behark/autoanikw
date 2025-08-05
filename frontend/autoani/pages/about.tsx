import React from 'react';
import Head from 'next/head';
import MainLayout from '../src/components/layout/MainLayout';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - AutoAni | Premium Luxury Vehicles</title>
        <meta name="description" content="Learn about AutoAni's commitment to excellence in luxury automotive sales. Discover our story, values, and dedication to exceptional customer service." />
        <meta name="keywords" content="about AutoAni, luxury car dealer, premium vehicles, automotive excellence, customer service" />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About AutoAni</h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                Dedicated to delivering exceptional luxury vehicles and unparalleled customer experiences 
                since our founding. We believe every journey should be extraordinary.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
                  <p>
                    Founded with a vision to redefine the luxury automotive experience, AutoAni has been 
                    at the forefront of premium vehicle sales for over two decades. Our journey began with 
                    a simple belief: that exceptional people deserve exceptional vehicles.
                  </p>
                  <p>
                    From our humble beginnings as a boutique dealership, we have grown into a trusted 
                    destination for discerning customers who appreciate quality, craftsmanship, and 
                    uncompromising attention to detail.
                  </p>
                  <p>
                    Today, we continue to uphold the same principles that guided our founding: integrity, 
                    excellence, and an unwavering commitment to customer satisfaction.
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
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Mission & Values</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                We are committed to providing an exceptional automotive experience that exceeds expectations 
                and builds lasting relationships with our valued customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Excellence</h3>
                <p className="text-neutral-600">
                  We maintain the highest standards in everything we do, from vehicle selection 
                  to customer service, ensuring every interaction reflects our commitment to quality.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Integrity</h3>
                <p className="text-neutral-600">
                  Transparency and honesty guide every transaction. We build trust through clear 
                  communication and ethical business practices that put our customers first.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Innovation</h3>
                <p className="text-neutral-600">
                  We embrace cutting-edge technology and modern approaches to enhance the 
                  automotive buying experience while respecting traditional values of craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our experienced professionals are passionate about luxury vehicles and dedicated 
                to helping you find the perfect match for your lifestyle and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-neutral-500">CEO Photo</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Executive Leadership</h3>
                <p className="text-primary-600 font-medium mb-4">Chief Executive Officer</p>
                <p className="text-neutral-600">
                  Leading the company with vision and expertise, driving innovation in the 
                  luxury automotive industry while maintaining our core values.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-neutral-500">Manager Photo</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Sales Management</h3>
                <p className="text-primary-600 font-medium mb-4">Sales Director</p>
                <p className="text-neutral-600">
                  Overseeing customer relationships and ensuring every client receives 
                  personalized attention and expert guidance throughout their journey.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-neutral-500">Specialist Photo</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Vehicle Specialists</h3>
                <p className="text-primary-600 font-medium mb-4">Product Experts</p>
                <p className="text-neutral-600">
                  Our knowledgeable specialists possess deep expertise in luxury vehicles, 
                  helping customers make informed decisions with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Choose AutoAni</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Discover what sets us apart in the luxury automotive market and why 
                discerning customers choose AutoAni for their vehicle needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Quality Assurance</h3>
                <p className="text-neutral-600 text-sm">
                  Every vehicle undergoes rigorous inspection and meets our exacting standards for quality and performance.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">🏅</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Expert Service</h3>
                <p className="text-neutral-600 text-sm">
                  Our team of professionals provides knowledgeable guidance and exceptional service at every step.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Warranty Protection</h3>
                <p className="text-neutral-600 text-sm">
                  Comprehensive warranty options provide peace of mind and protection for your investment.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl">💎</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Luxury Experience</h3>
                <p className="text-neutral-600 text-sm">
                  From consultation to delivery, we ensure every aspect of your experience reflects luxury and sophistication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Experience the AutoAni difference. Let us help you find the perfect luxury vehicle 
              that matches your lifestyle and exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/vehicles" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                View Our Inventory
              </a>
              <a 
                href="/contact" 
                className="border border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
