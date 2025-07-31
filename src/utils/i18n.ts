import hiTranslations from '../translations/hi.json';

export type Language = 'EN' | 'HI';

interface TranslationData {
  [key: string]: any;
}

// Import Hindi translations
const translations: Record<Language, TranslationData> = {
  EN: {}, // English translations are handled in LanguageContext
  HI: hiTranslations
};

// Helper function to get nested object value
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

// Main translation function
export const translate = (key: string, language: Language, fallback?: string): string => {
  const translation = getNestedValue(translations[language], key);
  
  if (translation !== undefined) {
    return translation;
  }
  
  // If no translation found and fallback provided, return fallback
  if (fallback) {
    return fallback;
  }
  
  // Return the key itself as last resort
  return key;
};

// Get recipe instructions in Hindi
export const getRecipeInstructions = (recipeTitle: string, language: Language): string[] => {
  if (language !== 'HI') {
    return []; // Return empty for English (use original instructions)
  }
  
  // Map recipe titles to instruction keys
  const instructionMap: { [key: string]: string } = {
    'Palak Paneer': 'recipeInstructions.palakPaneer',
    'Butter Chicken (Murgh Makhani)': 'recipeInstructions.butterChicken',
    'Chana Masala (Spiced Chickpea Curry)': 'recipeInstructions.chanaMasala',
    'Aloo Gobi': 'recipeInstructions.alooGobi',
    'Dal Tadka': 'recipeInstructions.dalTadka'
  };
  
  const instructionKey = instructionMap[recipeTitle];
  if (instructionKey) {
    const instructions = getNestedValue(translations.HI, instructionKey);
    return Array.isArray(instructions) ? instructions : [];
  }
  
  return [];
};

// Interpolation helper for dynamic values
export const interpolate = (template: string, values: { [key: string]: string | number }): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
}; 