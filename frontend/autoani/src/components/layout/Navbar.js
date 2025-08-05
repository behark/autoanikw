import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            AutoAni
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/vehicles" className="text-gray-300 hover:text-white transition-colors">
              Vehicles
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
              Admin
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/vehicles" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Vehicles
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="block px-3 py-2 text-primary-400 hover:text-primary-300 transition-colors font-medium">
                Admin
              </Link>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}