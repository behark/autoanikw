import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">AutoAni</h3>
            <p className="text-neutral-400 mb-4">
              Your trusted partner for premium vehicles. We provide exceptional automotive experiences with carefully curated luxury vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#vehicle-sales" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Premium Vehicle Sales
                </Link>
              </li>
              <li>
                <Link href="/services#financing" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Financing Options
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Vehicle Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services#warranty" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Extended Warranty
                </Link>
              </li>
              <li>
                <Link href="/services#concierge" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Concierge Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary-400" />
                <span className="text-neutral-400">
                  123 Luxury Lane<br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-primary-400" />
                <a href="tel:+15551234567" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary-400" />
                <a href="mailto:info@autoani.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  info@autoani.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} AutoAni. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-neutral-500 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-500 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-neutral-500 hover:text-primary-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
