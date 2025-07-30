import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--brand-accent-orange)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sparkles decoration */}
        <div className="flex justify-center mb-6">
          <Sparkles className="w-12 h-12 text-white animate-float" />
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
          Ready to Stop Staring and Start Creating?
        </h2>

        {/* Sub-headline */}
        <p className="text-xl lg:text-2xl text-white/90 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Your next delicious, home-cooked meal is a click away.
        </p>

        {/* CTA Button */}
        <button 
          className="inline-flex items-center px-10 py-4 text-xl font-semibold text-white rounded-full hover-lift animate-scale-in shadow-xl"
          style={{ backgroundColor: 'var(--brand-accent-green)', animationDelay: '0.4s' }}
        >
          Unlock My Kitchen's Potential
          <ArrowRight className="ml-3 w-6 h-6" />
        </button>

        {/* Additional motivation */}
        <p className="mt-8 text-white/80 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Join thousands of smart cooks who've already discovered the magic ✨
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;