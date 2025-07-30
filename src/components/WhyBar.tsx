import React from 'react';
import { PiggyBank, Recycle, Heart } from 'lucide-react';

const WhyBar: React.FC = () => {
  return (
    <section className="py-12" style={{ backgroundColor: 'var(--background-light-green)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--brand-accent-orange)' }}>
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Money</h3>
            <p style={{ color: 'var(--text-muted)' }}>Turn existing ingredients into meals instead of ordering takeout</p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--brand-accent-green)' }}>
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fight Food Waste</h3>
            <p style={{ color: 'var(--text-muted)' }}>Give forgotten vegetables and leftovers a second life</p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--brand-accent-orange)' }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Eat Healthier</h3>
            <p style={{ color: 'var(--text-muted)' }}>Home-cooked meals with fresh ingredients you choose</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBar;