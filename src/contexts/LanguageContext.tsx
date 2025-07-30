import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'HI';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  EN: {
    // Navbar
    'nav.howItWorks': 'How It Works',
    'nav.ourMission': 'Our Mission',
    'nav.blog': 'Blog',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.user': 'User',

    // Hero Section
    'hero.tagline': 'NO MORE "KHANE MEIN KYA HAI?"',
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
  },
  HI: {
    // Navbar
    'nav.howItWorks': 'कैसे काम करता है',
    'nav.ourMission': 'हमारा मिशन',
    'nav.blog': 'ब्लॉग',
    'nav.login': 'लॉगिन',
    'nav.signup': 'साइन अप',
    'nav.logout': 'लॉगआउट',
    'nav.user': 'उपयोगकर्ता',

    // Hero Section
    'hero.tagline': 'अब नहीं "खाने में क्या है?"',
    'hero.title': 'आपकी फ्रिज में सिर्फ सामग्री नहीं,',
    'hero.titleHighlight': 'भोजन',
    'hero.titleEnd': ' भरा है।',
    'hero.subtitle': 'जुगाड़कुक भूली हुई सब्जियों और बचे हुए सामग्री को स्वादिष्ट भोजन में बदल देता है। दैनिक डिनर के तनाव को समाप्त करें, भोजन की बर्बादी रोकें, और खाना बनाने का आनंद फिर से खोजें।',
    'hero.cta': 'मेरी रसोई की क्षमता खोलें',
    'hero.socialProof': '50,000+ स्मार्ट रसोइयों के साथ जुड़ें जो बर्बादी को स्वाद में बदल रहे हैं',
    'hero.jugaadMagic': '✨ जुगाड़ जादू ✨',

    // Recipe Section
    'recipes.title': 'आज रात आप क्या',
    'recipes.titleHighlight': 'बना सकते हैं?',
    'recipes.ingredientsPrompt': 'घर में जो सामग्री है उसे क्लिक करें:',
    'recipes.filters.all': 'सभी रेसिपी',
    'recipes.filters.veg': 'सिर्फ शाकाहारी',
    'recipes.filters.spicy': 'मसालेदार',
    'recipes.filters.jain': 'जैन',
    'recipes.viewFull': 'पूरी रेसिपी देखें',
    'recipes.backToRecipes': 'रेसिपी पर वापस',
    'recipes.cookTime': 'पकाने का समय',
    'recipes.servings': 'सर्विंग्स',
    'recipes.difficulty': 'कठिनाई',
    'recipes.cuisine': 'खाना',
    'recipes.ingredients': 'सामग्री',
    'recipes.instructions': 'निर्देश',
    'recipes.people': 'लोग',

    // Community Section
    'community.title': 'हमारे',
    'community.titleHighlight': 'समुदाय की रसोई से',
    'community.mission.title': 'अच्छा पकाएं।',
    'community.mission.subtitle': 'अच्छा करें।',
    'community.mission.description': 'हमारे साथ आप जो भी भोजन पकाते हैं, वह आपकी जेब के लिए एक छोटी जीत और ग्रह के लिए एक बड़ी जीत है। हम भारत में 40% बर्बाद होने वाले भोजन को कम करने के मिशन पर हैं, एक स्वादिष्ट भोजन एक समय।',

    // Signup Modal
    'signup.title': 'अपना खाता बनाएं',
    'signup.fullName': 'पूरा नाम',
    'signup.email': 'ईमेल',
    'signup.password': 'पासवर्ड',
    'signup.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'signup.submit': 'साइन अप',
    'signup.cancel': 'रद्द करें',
    'signup.alreadyHaveAccount': 'पहले से खाता है?',
    'signup.login': 'लॉगिन',
    'signup.validation.required': 'यह फील्ड आवश्यक है',
    'signup.validation.email': 'कृपया एक वैध ईमेल दर्ज करें',
    'signup.validation.passwordMatch': 'पासवर्ड मेल नहीं खाते',
    'signup.validation.passwordLength': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',

    // Footer
    'footer.copyright': '© 2024 जुगाड़कुक। सर्वाधिकार सुरक्षित।',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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