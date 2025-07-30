import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "Is JugaadCook really free?",
      answer: "Yes! JugaadCook is completely free to use. We believe everyone deserves access to creative cooking solutions that help reduce food waste and save money."
    },
    {
      question: "What cuisines are included?",
      answer: "We focus primarily on Indian cuisine with regional specialties from across the country. We also include popular international dishes that use common Indian ingredients."
    },
    {
      question: "Can I add my own recipes?",
      answer: "Absolutely! You can contribute your own family recipes and jugaad cooking tips to help our community grow. Every recipe goes through our quality review process."
    },
    {
      question: "How do you handle dietary restrictions like allergies?",
      answer: "Our platform includes comprehensive filters for vegetarian, vegan, Jain, gluten-free, and other dietary preferences. You can also specify allergies in your profile for personalized recommendations."
    },
    {
      question: "How is this different from just Googling recipes?",
      answer: "JugaadCook specifically matches recipes to YOUR available ingredients, not the other way around. No more buying groceries for recipes - we help you use what you already have!"
    },
    {
      question: "Do I need to install an app?",
      answer: "JugaadCook works perfectly in your web browser on any device. No app installation required, though we do have mobile apps available for an even better experience."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Got Questions?{' '}
            <span style={{ color: 'var(--brand-accent-orange)' }}>We've Got Answers.</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--brand-accent-orange)' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--brand-accent-orange)' }} />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 animate-slide-up">
                    <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;