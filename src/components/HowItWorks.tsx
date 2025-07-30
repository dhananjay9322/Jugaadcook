import React from 'react';
import { Key, Wand2, ChefHat } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            From Chaos to Creation in{' '}
            <span style={{ color: 'var(--brand-accent-orange)' }}>3 Simple Steps</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1: Unlock */}
          <div className="text-center animate-slide-up">
            <div className="relative mb-8">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ backgroundColor: 'var(--brand-accent-orange)' }}
              >
                <Key className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                1
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Unlock Your Pantry's Potential</h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Simply tap the ingredients you have. Our visual interface means no tedious typing.
            </p>
          </div>

          {/* Step 2: Discover */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative mb-8">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ backgroundColor: 'var(--brand-accent-orange)' }}
              >
                <Wand2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                2
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Discover Your Perfect 'Jugaad'</h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Our smart AI instantly reveals delicious recipes you can make right now.
            </p>
          </div>

          {/* Step 3: Create */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative mb-8">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ backgroundColor: 'var(--brand-accent-orange)' }}
              >
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                3
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Create with Joyful Confidence</h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Follow simple, step-by-step instructions designed for every skill level.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;