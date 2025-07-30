import React from 'react';
import { ChefHat, Lightbulb, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'var(--text-primary)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Our Mission</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Press</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Support Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-300">
                Subscribe to our newsletter for weekly recipe inspiration
              </p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-700 text-white rounded-l-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button 
                  className="px-4 py-2 text-sm font-medium rounded-r-lg"
                  style={{ backgroundColor: 'var(--brand-accent-orange)' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* JugaadCook Logo & Tagline */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <ChefHat className="w-8 h-8" style={{ color: 'var(--brand-accent-orange)' }} />
                <Lightbulb className="w-4 h-4 absolute -top-1 -right-1" style={{ color: 'var(--brand-accent-orange)' }} />
              </div>
              <div className="text-xl font-bold">
                <span className="text-white">Jugaad</span>
                <span style={{ color: 'var(--brand-accent-orange)' }}>Cook</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Waste less, taste more.
            </p>
            <p className="text-xs text-gray-400">
              Transforming kitchen chaos into culinary creation, one meal at a time.
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 JugaadCook. All rights reserved. Made with ❤️ for home cooks across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;