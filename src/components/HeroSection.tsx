import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToRecipes = () => {
    const recipesSection = document.querySelector('[data-section="recipes"]');
    if (recipesSection) {
      recipesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="pt-20 lg:pt-28 pb-16 lg:pb-24" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Pane - Text Content */}
          <div className="order-2 lg:order-1 animate-fade-in">
            {/* Tagline */}
            <div className="mb-6">
              <span 
                className="inline-flex items-center text-sm font-semibold tracking-wide uppercase px-4 py-2 rounded-full"
                style={{ color: 'var(--brand-accent-orange)', backgroundColor: 'rgba(249, 168, 38, 0.1)' }}
              >
                👋 NO MORE "KHANE MEIN KYA HAI?"
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Your fridge is full of{' '}
              <span style={{ color: 'var(--brand-accent-orange)' }}>meals</span>, not just ingredients.
            </h1>

            {/* Sub-headline */}
            <p className="text-xl lg:text-2xl mb-8 leading-relaxed animate-slide-up" style={{ color: 'var(--text-muted)', animationDelay: '0.2s' }}>
              JugaadCook turns forgotten vegetables and leftover ingredients into delicious meals. End the daily dinner stress, stop wasting food, and rediscover the joy of cooking.
            </p>

            {/* Primary CTA */}
            <button 
              onClick={scrollToRecipes}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover-lift animate-scale-in mb-8"
              style={{ backgroundColor: 'var(--brand-accent-green)', animationDelay: '0.4s' }}
            >
              Unlock My Kitchen's Potential
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            {/* Social Proof */}
            <p className="text-sm animate-fade-in" style={{ color: 'var(--text-muted)', animationDelay: '0.6s' }}>
              Join 50,000+ smart cooks turning waste into taste across India
            </p>
          </div>

          {/* Right Pane - Dynamic Jugaad Animation */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg h-96">
              {/* Animation Container */}
              <div className="relative w-full h-full">
                
                {/* Central Plate/Dish */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center text-4xl shadow-2xl animate-pulse"
                    style={{ 
                      backgroundColor: 'var(--brand-accent-green)',
                      animation: 'pulse 3s ease-in-out infinite'
                    }}
                  >
                    🍲
                  </div>
                </div>

                {/* Floating Ingredients - Phase 1 */}
                {isLoaded && (
                  <>
                    {/* Tomato - Top Left */}
                    <div 
                      className="absolute top-8 left-8 w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-2xl animate-float-ingredient-1"
                      style={{ animationDelay: '0.5s' }}
                    >
                      🍅
                    </div>
                    
                    {/* Onion - Top Right */}
                    <div 
                      className="absolute top-12 right-12 w-14 h-14 bg-purple-200 rounded-full shadow-lg flex items-center justify-center text-xl animate-float-ingredient-2"
                      style={{ animationDelay: '1s' }}
                    >
                      🧅
                    </div>
                    
                    {/* Paneer - Bottom Left */}
                    <div 
                      className="absolute bottom-16 left-12 w-12 h-10 bg-yellow-100 rounded shadow-lg flex items-center justify-center text-lg animate-float-ingredient-3"
                      style={{ animationDelay: '1.5s' }}
                    >
                      🧀
                    </div>
                    
                    {/* Ginger - Bottom Right */}
                    <div 
                      className="absolute bottom-20 right-8 w-12 h-12 bg-orange-200 rounded-full shadow-lg flex items-center justify-center text-lg animate-float-ingredient-4"
                      style={{ animationDelay: '2s' }}
                    >
                      🧄
                    </div>
                    
                    {/* Cilantro - Middle Left */}
                    <div 
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-14 animate-float-ingredient-5"
                      style={{ animationDelay: '2.5s' }}
                    >
                      🌿
                    </div>
                    
                    {/* Rice - Middle Right */}
                    <div 
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-lg animate-float-ingredient-6"
                      style={{ animationDelay: '3s' }}
                    >
                      🍚
                    </div>
                    
                    {/* Potato - Top Center */}
                    <div 
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center text-lg animate-float-ingredient-7"
                      style={{ animationDelay: '3.5s' }}
                    >
                      🥔
                    </div>
                    
                    {/* Bell Pepper - Bottom Center */}
                    <div 
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-400 rounded-full shadow-lg flex items-center justify-center text-lg animate-float-ingredient-8"
                      style={{ animationDelay: '4s' }}
                    >
                      🫑
                    </div>
                  </>
                )}

                {/* Assembly Lines - Visual connection to plate */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-orange-300 rounded-full opacity-30 animate-spin-slow"></div>
                
                {/* Jugaad Tagline */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-fade-in" style={{ animationDelay: '4.5s' }}>
                  <div 
                    className="px-6 py-3 rounded-full text-sm font-semibold shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--brand-accent-orange)',
                      color: 'white'
                    }}
                  >
                    ✨ Jugaad Magic ✨
                  </div>
                </div>

                {/* Sparkle Effects */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle-1"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-sparkle-2"></div>
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-sparkle-3"></div>
                <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-sparkle-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;