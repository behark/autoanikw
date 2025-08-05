import React, { useState } from 'react';
import Head from 'next/head';
import MainLayout from '../src/components/layout/MainLayout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    vehicleInterest: ''
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
        message: '',
        preferredContact: 'email',
        vehicleInterest: ''
      });
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Contact Us - AutoAni | Get in Touch with Our Team</title>
        <meta name="description" content="Contact AutoAni for premium luxury vehicle sales and services. Visit our showroom, call us, or send a message to our expert team today." />
        <meta name="keywords" content="contact AutoAni, luxury car dealer contact, automotive consultation, vehicle inquiry, showroom location" />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                Ready to find your perfect luxury vehicle? Our expert team is here to assist you 
                with personalized service and professional guidance.
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
                <h2 className="text-3xl font-bold text-neutral-900 mb-8">Get in Touch</h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Whether you're looking for a specific vehicle, need more information about our services, 
                  or want to schedule a consultation, we're here to help. Reach out to us through any of 
                  the following methods.
                </p>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">Phone</h3>
                      <p className="text-neutral-600 mb-1">(555) 123-4567</p>
                      <p className="text-sm text-neutral-500">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm text-neutral-500">Saturday: 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">Email</h3>
                      <p className="text-neutral-600 mb-1">info@autoani.com</p>
                      <p className="text-neutral-600 mb-1">sales@autoani.com</p>
                      <p className="text-sm text-neutral-500">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">Showroom Location</h3>
                      <p className="text-neutral-600 mb-1">123 Luxury Avenue</p>
                      <p className="text-neutral-600 mb-1">Premium City, PC 12345</p>
                      <p className="text-sm text-neutral-500">Appointments recommended</p>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600">🚨</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">24/7 Support</h3>
                      <p className="text-neutral-600 mb-1">(555) 123-HELP</p>
                      <p className="text-sm text-neutral-500">Emergency roadside assistance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-neutral-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-neutral-600">
                      Thank you for contacting us. A member of our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
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
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <label htmlFor="preferredContact" className="block text-sm font-medium text-neutral-700 mb-2">
                          Preferred Contact Method
                        </label>
                        <select
                          id="preferredContact"
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="text">Text Message</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Select a subject</option>
                          <option value="vehicle-inquiry">Vehicle Inquiry</option>
                          <option value="financing">Financing Questions</option>
                          <option value="service">Service Appointment</option>
                          <option value="trade-in">Trade-In Evaluation</option>
                          <option value="general">General Information</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="vehicleInterest" className="block text-sm font-medium text-neutral-700 mb-2">
                          Vehicle of Interest
                        </label>
                        <input
                          type="text"
                          id="vehicleInterest"
                          name="vehicleInterest"
                          value={formData.vehicleInterest}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="e.g., 2023 BMW X5"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Please provide details about your inquiry or how we can assist you..."
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
                          Sending Message...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Business Hours & Location</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Visit our premium showroom to see our luxury vehicles in person and meet with our expert team.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Business Hours */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Hours of Operation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="font-medium text-neutral-700">Monday - Friday</span>
                    <span className="text-neutral-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="font-medium text-neutral-700">Saturday</span>
                    <span className="text-neutral-600">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="font-medium text-neutral-700">Sunday</span>
                    <span className="text-neutral-600">By Appointment Only</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <strong>Note:</strong> We recommend scheduling an appointment to ensure personalized 
                    attention and to have your preferred vehicle available for viewing.
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Find Our Showroom</h3>
                <div className="bg-neutral-200 rounded-lg h-64 flex items-center justify-center mb-6">
                  <span className="text-neutral-500 text-lg">Interactive Map</span>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-neutral-900">123 Luxury Avenue</p>
                  <p className="text-neutral-600">Premium City, PC 12345</p>
                  <p className="text-neutral-600">United States</p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Get Directions
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View on Maps
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
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Quick answers to common questions about our services, processes, and policies.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Do you accept trade-ins?</h3>
                <p className="text-neutral-600">
                  Yes, we accept trade-ins on most vehicles. Our expert appraisers will evaluate your current 
                  vehicle and provide a competitive market-based offer that can be applied toward your purchase.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">What financing options are available?</h3>
                <p className="text-neutral-600">
                  We offer a variety of financing options including traditional auto loans, lease programs, 
                  and special financing for qualified buyers. Our finance team works with multiple lenders 
                  to secure the best rates and terms.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Do you provide vehicle history reports?</h3>
                <p className="text-neutral-600">
                  Absolutely. Every vehicle in our inventory comes with a comprehensive vehicle history report 
                  and has undergone our rigorous 150-point inspection process to ensure quality and reliability.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Can you help locate a specific vehicle?</h3>
                <p className="text-neutral-600">
                  Yes, our vehicle sourcing team can help locate specific makes, models, colors, and 
                  option packages through our extensive dealer network. Contact us with your requirements 
                  and we'll find your perfect vehicle.
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
              Whether you're ready to purchase, have questions about our inventory, or need assistance 
              with financing, our team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:555-123-4567" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Call Now: (555) 123-4567
              </a>
              <a 
                href="/vehicles" 
                className="border border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                View Our Inventory
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
