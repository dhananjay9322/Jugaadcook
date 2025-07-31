import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translate, getRecipeInstructions, type Language } from '../utils/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  getInstructions: (recipeTitle: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations (fallback)
const englishTranslations: { [key: string]: string } = {
  // Navbar
  'nav.howItWorks': 'How It Works',
  'nav.ourMission': 'Our Mission',
  'nav.blog': 'Blog',
  'nav.login': 'Login',
  'nav.signup': 'Sign Up',
  'nav.logout': 'Logout',
  'nav.user': 'User',

  // Hero Section
  'hero.tagline': '🍽JugaadCook. Soch bandh, cook shuru.',
  'hero.title': 'Your fridge is full of',
  'hero.titleHighlight': 'meals',
  'hero.titleEnd': ', not just ingredients.',
  'hero.subtitle': 'JugaadCook turns forgotten vegetables and leftover ingredients into delicious meals. End the daily dinner stress, stop wasting food, and rediscover the joy of cooking.',
  'hero.cta': 'Unlock My Kitchen\'s Potential',
  'hero.socialProof': 'Join 50,000+ smart cooks turning waste into taste across India',
  'hero.jugaadMagic': '✨ Jugaad Magic ✨',

  // Recipe Section
  'recipes.title': 'What Could You',
  'recipes.titleHighlight': 'Create Tonight?',
  'recipes.ingredientsPrompt': 'Click the ingredients you have at home:',
  'recipes.filters.all': 'All Recipes',
  'recipes.filters.veg': 'Veg Only',
  'recipes.filters.spicy': 'Spicy',
  'recipes.filters.jain': 'Jain',
  'recipes.viewFull': 'View Full Recipe',
  'recipes.backToRecipes': 'Back to Recipes',
  'recipes.cookTime': 'Cook Time',
  'recipes.servings': 'Servings',
  'recipes.difficulty': 'Difficulty',
  'recipes.cuisine': 'Cuisine',
  'recipes.ingredients': 'Ingredients',
  'recipes.instructions': 'Instructions',
  'recipes.people': 'people',

  // Community Section
  'community.title': 'From Our',
  'community.titleHighlight': 'Community\'s Kitchen',
  'community.mission.title': 'Cook Good.',
  'community.mission.subtitle': 'Do Good.',
  'community.mission.description': 'Every meal you cook with us is a small victory for your wallet and a big one for the planet. We\'re on a mission to cut down the 40% of food wasted in India, one delicious meal at a time.',

  // Signup Modal
  'signup.title': 'Create Your Account',
  'signup.fullName': 'Full Name',
  'signup.email': 'Email',
  'signup.password': 'Password',
  'signup.confirmPassword': 'Confirm Password',
  'signup.submit': 'Sign Up',
  'signup.cancel': 'Cancel',
  'signup.alreadyHaveAccount': 'Already have an account?',
  'signup.login': 'Login',
  'signup.validation.required': 'This field is required',
  'signup.validation.email': 'Please enter a valid email',
  'signup.validation.passwordMatch': 'Passwords do not match',
  'signup.validation.passwordLength': 'Password must be at least 6 characters',

  // Footer
  'footer.copyright': '© 2024 JugaadCook. All rights reserved.',
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string, fallback?: string): string => {
    // Try to get translation from the new i18n system
    const translation = translate(key, language, fallback);
    
    // If no translation found and we have a fallback, use it
    if (translation === key && fallback) {
      return fallback;
    }
    
    // If still no translation, try English translations as fallback
    if (translation === key && language === 'HI') {
      return englishTranslations[key] || key;
    }
    
    return translation;
  };

  const getInstructions = (recipeTitle: string): string[] => {
    return getRecipeInstructions(recipeTitle, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getInstructions }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 