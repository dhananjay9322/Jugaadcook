import React, { useState, useEffect } from 'react';
import { ChefHat, Lightbulb, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'scroll-shadow bg-white/95 backdrop-blur-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <ChefHat className="w-8 h-8 text-orange-500" style={{ color: 'var(--brand-accent-orange)' }} />
              <Lightbulb className="w-4 h-4 absolute -top-1 -right-1" style={{ color: 'var(--brand-accent-orange)' }} />
            </div>
            <div className="text-xl font-bold">
              <span style={{ color: 'var(--text-primary)' }}>Jugaad</span>
              <span style={{ color: 'var(--brand-accent-orange)' }}>Cook</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
              How It Works
            </a>
            <a href="#mission" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
              Our Mission
            </a>
            <a href="#blog" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
              Blog
            </a>

            {/* Login/User Button */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {currentUser.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-200 hover-lift"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsSignupModalOpen(true)}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-200 hover-lift"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
            <div className="px-4 py-6 space-y-4">
              <a href="#how-it-works" className="block text-gray-700 hover:text-orange-500 transition-colors duration-200">
                How It Works
              </a>
              <a href="#mission" className="block text-gray-700 hover:text-orange-500 transition-colors duration-200">
                Our Mission
              </a>
              <a href="#blog" className="block text-gray-700 hover:text-orange-500 transition-colors duration-200">
                Blog
              </a>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                
                {currentUser ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <User size={14} className="text-gray-600" />
                      <span className="text-sm text-gray-700">
                        {currentUser.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="px-3 py-1 text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <LogOut size={14} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-3 py-1 border-2 border-gray-300 rounded-full text-sm"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setIsSignupModalOpen(true)}
                      className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </nav>
  );
};

export default Navbar;