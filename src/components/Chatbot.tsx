import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, X, Send, Bot, User, ChefHat, Clock, Star } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  recipes?: Recipe[];
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  difficulty: string;
  ingredients: string[];
  dietary: string[];
  shortDescription?: string;
  instructions?: string[];
  servings?: number;
  cuisine?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your JugaadCook assistant! 🍳 I can help you find recipes based on the ingredients you have at home. Just tell me what's in your fridge or pantry, and I'll suggest delicious meals you can make!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Recipe database with full instructions
  const recipes: Recipe[] = [
    {
      id: 1,
      title: 'Palak Paneer',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '30 Mins',
      difficulty: 'Medium',
      ingredients: ['Paneer', 'Spinach', 'Onion', 'Ginger', 'Garlic', 'Tomato', 'Cream'],
      dietary: ['Veg'],
      shortDescription: 'A classic North Indian dish where soft paneer cubes are simmered in a creamy, mildly spiced spinach gravy.',
      instructions: [
        'Blanch 250g of fresh spinach in boiling water for 2 minutes, then immediately transfer to ice-cold water.',
        'Drain the spinach and blend it into a smooth puree. Set aside.',
        'Heat 1 tbsp of oil in a pan. Sauté 200g of paneer cubes until lightly golden. Remove and set aside.',
        'In the same pan, add 1 tbsp of butter. Add 1 tsp of cumin seeds and let them splutter.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add 1 tbsp of ginger-garlic paste and cook for one minute.',
        'Add 1 finely chopped tomato and cook until soft.',
        'Stir in 1/2 tsp turmeric powder, 1 tsp coriander powder, and 1/2 tsp red chili powder. Cook for 2 minutes.',
        'Pour in the spinach puree and 1/4 cup of water. Mix well and bring to a simmer.',
        'Add 2 tbsp of fresh cream and the sautéed paneer cubes.',
        'Season with salt and 1/2 tsp of garam masala. Simmer for 5 minutes. Serve hot.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 2,
      title: 'Butter Chicken (Murgh Makhani)',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '45 Mins',
      difficulty: 'Medium',
      ingredients: ['Chicken', 'Yogurt', 'Ginger', 'Garlic', 'Tomato', 'Cream', 'Butter'],
      dietary: ['Spicy'],
      shortDescription: 'The world-famous, decadent, and creamy tomato-based curry with tender tandoori chicken pieces.',
      instructions: [
        'Marination: In a bowl, mix 500g boneless chicken pieces with 1/2 cup yogurt, 1 tbsp ginger-garlic paste, 1 tsp red chili powder, 1 tsp tandoori masala, and salt. Marinate for at least 1 hour.',
        'Grill or pan-fry the marinated chicken until cooked through and slightly charred. Set aside.',
        'Gravy: Heat 2 tbsp of butter in a pan. Add 1 tbsp ginger-garlic paste and sauté.',
        'Add 2 cups of tomato puree and 1/4 cup of cashew paste. Cook for 10 minutes until the mixture thickens.',
        'Stir in 1 tsp red chili powder, 1 tsp sugar, and salt to taste.',
        'For a smooth texture, blend the gravy and strain it through a fine-mesh sieve.',
        'Return the gravy to the pan. Add the cooked chicken pieces.',
        'Pour in 1/4 cup of fresh cream and 1 tsp of crushed kasuri methi (dried fenugreek leaves).',
        'Simmer on low heat for 5-7 minutes. Garnish with more cream and cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 3,
      title: 'Chana Masala (Spiced Chickpea Curry)',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '25 Mins',
      difficulty: 'Easy',
      ingredients: ['Chickpeas', 'Onion', 'Ginger', 'Garlic', 'Tomato'],
      dietary: ['Veg', 'Spicy'],
      shortDescription: 'A popular and protein-packed vegetarian curry made with chickpeas in a spicy onion-tomato gravy.',
      instructions: [
        'Heat 2 tbsp of oil in a pressure cooker or pot. Add 1 tsp cumin seeds, 1 bay leaf, and a pinch of asafoetida.',
        'Add 1 large finely chopped onion and sauté until golden brown.',
        'Add 1 tbsp ginger-garlic paste and cook for a minute.',
        'Add 2 finely chopped tomatoes or 1 cup tomato puree. Cook until oil starts to separate.',
        'Add 1/2 tsp turmeric, 2 tsp coriander powder, 1 tsp red chili powder, and 2 tsp chana masala powder. Sauté for one minute.',
        'Add 2 cups of soaked & boiled chickpeas (or canned, drained). Mix well to coat with the masala.',
        'Add 1.5 cups of water and salt to taste.',
        'If using a pressure cooker, cook for 2 whistles. If using a pot, cover and simmer for 15-20 minutes.',
        'Slightly mash some chickpeas with the back of a spoon to thicken the gravy.',
        'Garnish with 1/2 tsp garam masala, chopped cilantro, and a squeeze of lemon juice.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 4,
      title: 'Aloo Gobi',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '20 Mins',
      difficulty: 'Easy',
      ingredients: ['Potato', 'Cauliflower', 'Onion', 'Ginger', 'Garlic', 'Turmeric'],
      dietary: ['Veg', 'Jain'],
      shortDescription: 'A comforting and simple dry curry made with potatoes (aloo) and cauliflower (gobi).',
      instructions: [
        'Heat 3 tbsp of oil in a large pan or kadai.',
        'Add 1 tsp of cumin seeds and let them crackle.',
        'Add 1 finely chopped onion and sauté until light brown.',
        'Add 1 tsp of grated ginger and 2 chopped green chilies. Sauté for 30 seconds.',
        'Add 2 medium-sized potato cubes and cook for 5 minutes, stirring occasionally.',
        'Add 1 medium-sized cauliflower, cut into florets. Mix well.',
        'Add 1/2 tsp turmeric powder, 1 tsp coriander powder, and salt to taste. Stir to coat everything evenly.',
        'Cover the pan and cook on low heat for 15-20 minutes, or until potatoes and cauliflower are both tender. Stir every 5 minutes to prevent sticking.',
        'Once cooked, remove the lid and increase heat to medium-high for 2 minutes to get a light roast.',
        'Garnish with 1/2 tsp garam masala and fresh cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 5,
      title: 'Dal Tadka',
      image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '35 Mins',
      difficulty: 'Easy',
      ingredients: ['Lentils', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Turmeric'],
      dietary: ['Veg', 'Spicy'],
      shortDescription: 'A comforting lentil dish with aromatic tempering of spices.',
      instructions: [
        'Cook 1 cup of toor dal in a pressure cooker with 3 cups of water for 3 whistles.',
        'Heat 2 tbsp of ghee in a separate pan.',
        'Add 1 tsp cumin seeds, 1 tsp mustard seeds, and 2 dry red chilies. Let them crackle.',
        'Add 1 finely chopped onion and sauté until golden brown.',
        'Add 1 tbsp ginger-garlic paste and cook for a minute.',
        'Add 1 finely chopped tomato and cook until soft.',
        'Add 1/2 tsp turmeric powder, 1 tsp red chili powder, and salt to taste.',
        'Add the cooked dal and mix well.',
        'Simmer for 5-7 minutes until the gravy thickens.',
        'Garnish with 1/2 tsp garam masala and chopped cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 6,
      title: 'Paneer Butter Masala',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '25 Mins',
      difficulty: 'Easy',
      ingredients: ['Paneer', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Butter', 'Cream'],
      dietary: ['Veg'],
      shortDescription: 'Rich and creamy paneer in tomato gravy.',
      instructions: [
        'Heat 2 tbsp of butter in a pan. Add 1 tbsp ginger-garlic paste and sauté.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add 2 finely chopped tomatoes and cook until soft.',
        'Add 1/2 tsp turmeric, 1 tsp coriander powder, 1 tsp red chili powder, and 1 tsp garam masala. Cook for 2 minutes.',
        'Add 1/4 cup of cashew paste and 1/4 cup of tomato puree. Cook for 5 minutes.',
        'Add 200g of paneer cubes and mix gently.',
        'Pour in 1/4 cup of fresh cream and simmer for 3-4 minutes.',
        'Garnish with fresh cream and cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 7,
      title: 'Jeera Rice',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '15 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Onion', 'Cumin', 'Ghee'],
      dietary: ['Veg', 'Jain'],
      shortDescription: 'Fragrant rice with cumin seeds.',
      instructions: [
        'Cook 1 cup of basmati rice and set aside.',
        'Heat 2 tbsp of ghee in a pan.',
        'Add 1 tsp of cumin seeds and let them crackle.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add the cooked rice and mix gently.',
        'Season with salt and cook for 2-3 minutes.',
        'Garnish with fresh cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 8,
      title: 'Tomato Rice',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '25 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Tomato', 'Onion', 'Garlic', 'Ginger', 'Turmeric'],
      dietary: ['Veg', 'Spicy'],
      shortDescription: 'A quick and spicy South Indian rice dish.',
      instructions: [
        'Cook 1 cup of rice and set aside.',
        'Heat 2 tbsp of oil in a pan.',
        'Add 1 tsp of mustard seeds and let them crackle.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add 1 tbsp ginger-garlic paste and cook for a minute.',
        'Add 2 finely chopped tomatoes and cook until soft.',
        'Add 1/2 tsp turmeric, 1 tsp red chili powder, and salt to taste.',
        'Add the cooked rice and mix gently.',
        'Cook for 2-3 minutes and garnish with fresh cilantro.'
      ],
      servings: 4,
      cuisine: 'South Indian'
    },
    {
      id: 9,
      title: 'Spinach Rice',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '30 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Spinach', 'Onion', 'Garlic', 'Ginger', 'Turmeric'],
      dietary: ['Veg', 'Jain'],
      shortDescription: 'Healthy rice cooked with spinach.',
      instructions: [
        'Blanch 200g of spinach and blend into a puree.',
        'Cook 1 cup of rice and set aside.',
        'Heat 2 tbsp of oil in a pan.',
        'Add 1 tsp of cumin seeds and let them crackle.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add 1 tbsp ginger-garlic paste and cook for a minute.',
        'Add the spinach puree and cook for 2 minutes.',
        'Add the cooked rice and mix gently.',
        'Season with salt and cook for 2-3 minutes.',
        'Garnish with fresh cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 10,
      title: 'Paneer Fried Rice',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '20 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Paneer', 'Onion', 'Carrot', 'Peas', 'Soy Sauce'],
      dietary: ['Veg'],
      shortDescription: 'Indo-Chinese style fried rice with paneer.',
      instructions: [
        'Cook 1 cup of rice and set aside.',
        'Heat 2 tbsp of oil in a wok or large pan.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add 1/2 cup of mixed vegetables (carrots, peas) and cook for 2 minutes.',
        'Add 100g of paneer cubes and cook for 1 minute.',
        'Add the cooked rice and mix gently.',
        'Add 2 tbsp of soy sauce and salt to taste.',
        'Cook for 2-3 minutes and garnish with spring onions.'
      ],
      servings: 4,
      cuisine: 'Indo-Chinese'
    },
    {
      id: 11,
      title: 'Garlic Rice',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '15 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Garlic', 'Onion', 'Ghee', 'Cumin'],
      dietary: ['Veg', 'Jain'],
      shortDescription: 'Aromatic rice with garlic and spices.',
      instructions: [
        'Cook 1 cup of rice and set aside.',
        'Heat 2 tbsp of ghee in a pan.',
        'Add 1 tsp of cumin seeds and let them crackle.',
        'Add 2 tbsp of finely chopped garlic and sauté until golden.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add the cooked rice and mix gently.',
        'Season with salt and cook for 2-3 minutes.',
        'Garnish with fresh cilantro.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 12,
      title: 'Khichdi',
      image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '30 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Lentils', 'Onion', 'Ginger', 'Garlic', 'Turmeric', 'Cumin', 'Ghee'],
      dietary: ['Veg', 'Jain'],
      shortDescription: 'A comforting one-pot meal made with rice and lentils, perfect for digestion and comfort food.',
      instructions: [
        'Wash 1 cup of rice and 1/2 cup of moong dal together until water runs clear.',
        'Heat 2 tbsp of ghee in a pressure cooker or heavy-bottomed pot.',
        'Add 1 tsp of cumin seeds and let them crackle.',
        'Add 1 finely chopped onion and sauté until translucent.',
        'Add 1 tbsp ginger-garlic paste and cook for a minute.',
        'Add 1/2 tsp turmeric powder and stir for 30 seconds.',
        'Add the washed rice and dal mixture.',
        'Add 3 cups of water and salt to taste.',
        'If using pressure cooker, cook for 2 whistles. If using pot, cover and simmer for 20-25 minutes.',
        'Let it rest for 5 minutes before serving.',
        'Garnish with fresh cilantro and serve hot with pickle or yogurt.'
      ],
      servings: 4,
      cuisine: 'North Indian'
    },
    {
      id: 13,
      title: 'Chicken Biryani',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '60 Mins',
      difficulty: 'Hard',
      ingredients: ['Chicken', 'Rice', 'Onion', 'Ginger', 'Garlic', 'Yogurt', 'Spices'],
      dietary: ['Spicy'],
      shortDescription: 'Aromatic layered rice dish with tender chicken and fragrant spices.',
      instructions: [
        'Marinate 500g chicken with yogurt, ginger-garlic paste, and biryani masala for 1 hour.',
        'Cook 2 cups of basmati rice until 70% done. Drain and set aside.',
        'Heat oil in a large pot and add whole spices (cardamom, cinnamon, bay leaves).',
        'Add sliced onions and sauté until golden brown.',
        'Add the marinated chicken and cook until 70% done.',
        'Layer half the rice, then chicken, then remaining rice.',
        'Add saffron milk and seal the pot with dough.',
        'Cook on low heat for 20-25 minutes.',
        'Let it rest for 10 minutes before serving.',
        'Garnish with fried onions, mint, and cilantro.'
      ],
      servings: 6,
      cuisine: 'Hyderabadi'
    }
  ];

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDeLpITbB9zaPCvo8f6A_R6J208k6ukuSs');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect direct recipe requests
  const detectRecipeRequest = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    
    // Common recipe request patterns
    const recipePatterns = [
      /how to make (.+)/i,
      /give me recipe for (.+)/i,
      /tell me steps for (.+)/i,
      /recipe for (.+)/i,
      /how to cook (.+)/i,
      /steps for (.+)/i,
      /make (.+)/i,
      /cook (.+)/i
    ];
    
    for (const pattern of recipePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return null;
  };

  // Find recipe by name (fuzzy matching)
  const findRecipeByName = (recipeName: string): Recipe | null => {
    const lowerRecipeName = recipeName.toLowerCase();
    
    // First try exact match
    const exactMatch = recipes.find(recipe => 
      recipe.title.toLowerCase() === lowerRecipeName
    );
    if (exactMatch) return exactMatch;
    
    // Try partial matches
    const partialMatches = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerRecipeName) ||
      lowerRecipeName.includes(recipe.title.toLowerCase())
    );
    
    if (partialMatches.length > 0) {
      // Return the best match (shortest title or most similar)
      return partialMatches.sort((a, b) => {
        const aScore = Math.abs(a.title.length - recipeName.length);
        const bScore = Math.abs(b.title.length - recipeName.length);
        return aScore - bScore;
      })[0];
    }
    
    // Try matching common variations and spelling variants
    const variations: { [key: string]: string } = {
      'paneer masala': 'Paneer Butter Masala',
      'rajma chawal': 'Chana Masala (Spiced Chickpea Curry)',
      'chicken biryani': 'Chicken Biryani',
      'palak paneer': 'Palak Paneer',
      'butter chicken': 'Butter Chicken (Murgh Makhani)',
      'chana masala': 'Chana Masala (Spiced Chickpea Curry)',
      'aloo gobi': 'Aloo Gobi',
      'dal tadka': 'Dal Tadka',
      'jeera rice': 'Jeera Rice',
      'tomato rice': 'Tomato Rice',
      'spinach rice': 'Spinach Rice',
      'paneer fried rice': 'Paneer Fried Rice',
      'garlic rice': 'Garlic Rice',
      // Add spelling variants for khichdi
      'khichadi': 'Khichdi',
      'kichadi': 'Khichdi',
      'khichari': 'Khichdi',
      'kichari': 'Khichdi',
      'khichdi': 'Khichdi',
      'kichdi': 'Khichdi'
    };
    
    const variationMatch = variations[lowerRecipeName];
    if (variationMatch) {
      return recipes.find(recipe => recipe.title === variationMatch) || null;
    }
    
    return null;
  };

  // Format full recipe response
  const formatFullRecipe = (recipe: Recipe): string => {
    let response = `🍽️ **${recipe.title}**\n\n`;
    
    if (recipe.shortDescription) {
      response += `${recipe.shortDescription}\n\n`;
    }
    
    response += `**📝 Ingredients:**\n`;
    recipe.ingredients.forEach(ingredient => {
      response += `- ${ingredient}\n`;
    });
    
    if (recipe.instructions && recipe.instructions.length > 0) {
      response += `\n**👨‍🍳 Instructions:**\n`;
      recipe.instructions.forEach((instruction, index) => {
        response += `${index + 1}. ${instruction}\n`;
      });
    }
    
    response += `\n💡 *Tip: If you're missing an ingredient, I can help you substitute!*`;
    
    return response;
  };

  // Extract ingredients from user input
  const extractIngredients = (text: string): string[] => {
    const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
    const uniqueIngredients = [...new Set(allIngredients)];
    
    const lowerText = text.toLowerCase();
    const foundIngredients = uniqueIngredients.filter(ingredient => 
      lowerText.includes(ingredient.toLowerCase())
    );
    
    return foundIngredients;
  };

  // Find recipes based on available ingredients
  const findRecipesByIngredients = (availableIngredients: string[]): Recipe[] => {
    if (availableIngredients.length === 0) return [];
    
    return recipes.filter(recipe => {
      const matchingIngredients = recipe.ingredients.filter(ingredient =>
        availableIngredients.some(available => 
          available.toLowerCase() === ingredient.toLowerCase()
        )
      );
      
      // Recipe matches if at least 50% of its ingredients are available
      const matchPercentage = matchingIngredients.length / recipe.ingredients.length;
      return matchPercentage >= 0.5;
    }).sort((a, b) => {
      // Sort by match percentage (higher first)
      const aMatchPercentage = a.ingredients.filter(ingredient =>
        availableIngredients.some(available => 
          available.toLowerCase() === ingredient.toLowerCase()
        )
      ).length / a.ingredients.length;
      
      const bMatchPercentage = b.ingredients.filter(ingredient =>
        availableIngredients.some(available => 
          available.toLowerCase() === ingredient.toLowerCase()
        )
      ).length / b.ingredients.length;
      
      return bMatchPercentage - aMatchPercentage;
    });
  };

  // Get recipe description based on title
  const getRecipeDescription = (title: string): string => {
    const descriptions: { [key: string]: string } = {
      'Palak Paneer': '🧀🌿 Creamy spinach curry with paneer cubes.',
      'Dal Tadka': '🌶 A comfort meal made with lentils, garlic, and basic spices.',
      'Tomato Rice': '🍅🍚 A quick and spicy South Indian rice dish.',
      'Paneer Butter Masala': '🧀🍅 Rich and creamy paneer in tomato gravy.',
      'Aloo Gobi': '🥔🥦 Simple potato and cauliflower curry.',
      'Jeera Rice': '🍚🌿 Fragrant rice with cumin seeds.',
      'Spinach Rice': '🌿🍚 Healthy rice cooked with spinach.',
      'Paneer Fried Rice': '🧀🍚 Indo-Chinese style fried rice with paneer.',
      'Garlic Rice': '🧄🍚 Aromatic rice with garlic and spices.',
      'Stuffed Bell Pepper': '🫑🧀 Bell peppers stuffed with rice and vegetables.',
      'Quick Tomato Pasta': '🍝🍅 Simple pasta with tomato sauce.',
      'Yogurt Curry': '🥛🌿 Tangy curry made with yogurt and spices.'
    };
    
    return descriptions[title] || `${title} - A delicious recipe you can make with your ingredients.`;
  };

  // Check for dietary preferences
  const checkDietaryPreferences = (text: string): string[] => {
    const preferences: string[] = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('veg') || lowerText.includes('vegetarian')) {
      preferences.push('Veg');
    }
    if (lowerText.includes('jain')) {
      preferences.push('Jain');
    }
    if (lowerText.includes('spicy') || lowerText.includes('hot')) {
      preferences.push('Spicy');
    }
    if (lowerText.includes('quick') || lowerText.includes('fast') || lowerText.includes('easy')) {
      preferences.push('Quick');
    }
    
    return preferences;
  };

  // Filter recipes by dietary preferences
  const filterByDietaryPreferences = (recipes: Recipe[], preferences: string[]): Recipe[] => {
    if (preferences.length === 0) return recipes;
    
    return recipes.filter(recipe => {
      return preferences.some(pref => recipe.dietary.includes(pref));
    });
  };

  const isFoodRelated = (text: string): boolean => {
    const foodKeywords = [
      'food', 'cook', 'recipe', 'ingredient', 'meal', 'dish', 'cuisine', 'kitchen',
      'nutrition', 'diet', 'healthy', 'calories', 'protein', 'vitamin', 'mineral',
      'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'beverage', 'drink',
      'vegetable', 'fruit', 'meat', 'fish', 'poultry', 'dairy', 'grain', 'spice',
      'herb', 'sauce', 'dressing', 'baking', 'grilling', 'frying', 'boiling',
      'restaurant', 'chef', 'cooking', 'preparation', 'storage', 'preservation',
      'organic', 'vegan', 'vegetarian', 'gluten', 'allergy', 'intolerance',
      'paneer', 'tomato', 'onion', 'potato', 'yogurt', 'ginger', 'garlic', 'rice',
      'dal', 'spinach', 'bell pepper', 'cilantro', 'cauliflower', 'turmeric',
      'cumin', 'butter', 'cream', 'cheese', 'pasta', 'olive oil', 'basil'
    ];
    
    const lowerText = text.toLowerCase();
    return foodKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // First check for direct recipe requests
      const requestedRecipe = detectRecipeRequest(inputValue);
      
      if (requestedRecipe) {
        const recipe = findRecipeByName(requestedRecipe);
        
        if (recipe) {
          // Found the recipe - provide full recipe
          const fullRecipeResponse = formatFullRecipe(recipe);
          
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: fullRecipeResponse,
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, botMessage]);
        } else {
          // Recipe not found - automatically use Gemini API
          try {
            const geminiPrompt = `Give me a full Indian recipe for '${requestedRecipe}'. Include:
1. List of ingredients with quantities
2. Step-by-step cooking instructions
3. Total cooking time
4. Helpful cooking tips
Format it clearly with emojis and section headers like this:

🍛 **[Dish Name]**
📝 **Ingredients:**
- [list ingredients with quantities]

👨‍🍳 **Instructions:**
1. [step 1]
2. [step 2]
...

⏱️ **Time:** [cooking time]
💡 **Tip:** [helpful cooking tip]`;

            const result = await model.generateContent(geminiPrompt);
            const response = await result.response;
            const geminiRecipe = response.text();
            
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: geminiRecipe,
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, botMessage]);
          } catch (error) {
            console.error('Gemini API error:', error);
            const errorResponse = `I couldn't find that recipe in my list and something went wrong while fetching from my chef partner. Please try again in a moment.`;
            
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: errorResponse,
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, botMessage]);
          }
        }
      } else {
        // Extract ingredients from user input
        const foundIngredients = extractIngredients(inputValue);
        const dietaryPreferences = checkDietaryPreferences(inputValue);
        
        if (foundIngredients.length > 0) {
          // Find recipes based on ingredients
          let matchingRecipes = findRecipesByIngredients(foundIngredients);
          
          // Filter by dietary preferences if specified
          if (dietaryPreferences.length > 0) {
            matchingRecipes = filterByDietaryPreferences(matchingRecipes, dietaryPreferences);
          }
          
          if (matchingRecipes.length > 0) {
            const ingredientsList = foundIngredients.join(', ');
            const recipeCount = matchingRecipes.length;
            
            let responseText = `Great! Based on what you have, here are some recipes you can try:`;
            
            // Add dietary preference info if specified
            if (dietaryPreferences.length > 0) {
              responseText += `\n\nI've filtered for ${dietaryPreferences.join(', ')} recipes as requested.`;
            }
            
            // Add recipe descriptions
            const recipeDescriptions = matchingRecipes.slice(0, 5).map(recipe => 
              `${recipe.title} ${getRecipeDescription(recipe.title)}`
            ).join('\n\n');
            
            responseText += `\n\n${recipeDescriptions}`;
            
            // Add follow-up question if few ingredients
            if (foundIngredients.length <= 3) {
              responseText += `\n\n💡 Tip: Try adding more ingredients for better recipe matches!`;
            }
            
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: responseText,
              isUser: false,
              timestamp: new Date(),
              recipes: matchingRecipes.slice(0, 3) // Show top 3 recipes
            };
            
            setMessages(prev => [...prev, botMessage]);
            
            // Add follow-up question for better matching
            if (matchingRecipes.length <= 2) {
              setTimeout(() => {
                const followUpMessage: Message = {
                  id: (Date.now() + 2).toString(),
                  text: "Do you have any other ingredients? Or would you prefer:\n• Vegetarian or non-vegetarian?\n• Spicy or mild?\n• Quick recipes (under 20 mins)?",
                  isUser: false,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, followUpMessage]);
              }, 1000);
            }
          } else {
            let responseText = `I found ${foundIngredients.join(', ')} in your ingredients, but I don't have exact matches.`;
            
            // Check for near matches
            const nearMatches = recipes.filter(recipe => {
              const matchingIngredients = recipe.ingredients.filter(ingredient =>
                foundIngredients.some(available => 
                  available.toLowerCase() === ingredient.toLowerCase()
                )
              );
              return matchingIngredients.length >= 2; // At least 2 ingredients match
            }).slice(0, 3);
            
            if (nearMatches.length > 0) {
              responseText += `\n\nHere are some recipes you could try with a few additional ingredients:`;
              const nearMatchDescriptions = nearMatches.map(recipe => 
                `${recipe.title} ${getRecipeDescription(recipe.title)}`
              ).join('\n\n');
              responseText += `\n\n${nearMatchDescriptions}`;
            }
            
            responseText += `\n\n💡 Try adding more ingredients or ask me for cooking tips!`;
            
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: responseText,
              isUser: false,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
          }
        } else {
          // Check if the question is food-related
          if (!isFoodRelated(inputValue)) {
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: "I'm your JugaadCook assistant! I can help you find recipes based on ingredients you have at home. Just tell me what's in your fridge or pantry, like 'I have paneer, tomato, and onion' and I'll suggest delicious meals you can make!",
              isUser: false,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
          } else {
            // Use AI for general food questions
            const prompt = `You are a helpful JugaadCook assistant. Answer the following question about food, cooking, recipes, nutrition, or related topics. Keep your response concise, helpful, and focused on food. If the question is not food-related, politely redirect to food topics.

Question: ${inputValue}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: text,
              isUser: false,
              timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
          }
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">JugaadCook Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      
                      {/* Recipe Cards */}
                      {message.recipes && message.recipes.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.recipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <ChefHat size={20} className="text-orange-500" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{recipe.title}</h4>
                                  <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                                    <div className="flex items-center space-x-1">
                                      <Clock size={12} />
                                      <span>{recipe.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star size={12} />
                                      <span>{recipe.difficulty}</span>
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Ingredients: {recipe.ingredients.slice(0, 3).join(', ')}
                                    {recipe.ingredients.length > 3 && '...'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {message.isUser && <User size={16} className="mt-1 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me what ingredients you have (e.g., paneer, tomato, onion)..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 