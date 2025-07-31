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

  // Recipe database
  const recipes: Recipe[] = [
    {
      id: 1,
      title: 'Paneer Butter Masala',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '25 Mins',
      difficulty: 'Easy',
      ingredients: ['Paneer', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Butter', 'Cream'],
      dietary: ['Veg']
    },
    {
      id: 2,
      title: 'Aloo Gobi',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '20 Mins',
      difficulty: 'Easy',
      ingredients: ['Potato', 'Cauliflower', 'Onion', 'Ginger', 'Garlic', 'Turmeric'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 3,
      title: 'Palak Paneer',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '30 Mins',
      difficulty: 'Medium',
      ingredients: ['Paneer', 'Spinach', 'Onion', 'Ginger', 'Garlic', 'Cream'],
      dietary: ['Veg']
    },
    {
      id: 4,
      title: 'Jeera Rice',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '15 Mins',
      difficulty: 'Easy',
      ingredients: ['Rice', 'Onion', 'Cumin', 'Ghee'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 5,
      title: 'Dal Tadka',
      image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '35 Mins',
      difficulty: 'Easy',
      ingredients: ['Dal', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Turmeric'],
      dietary: ['Veg', 'Spicy']
    },
    {
      id: 6,
      title: 'Stuffed Bell Pepper',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '40 Mins',
      difficulty: 'Medium',
      ingredients: ['Bell Pepper', 'Rice', 'Onion', 'Tomato', 'Cheese'],
      dietary: ['Veg']
    },
    {
      id: 7,
      title: 'Quick Tomato Pasta',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '20 Mins',
      difficulty: 'Easy',
      ingredients: ['Pasta', 'Tomato', 'Onion', 'Garlic', 'Olive Oil', 'Basil'],
      dietary: ['Veg']
    },
    {
      id: 8,
      title: 'Yogurt Curry',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '25 Mins',
      difficulty: 'Easy',
      ingredients: ['Yogurt', 'Onion', 'Ginger', 'Garlic', 'Turmeric', 'Cumin'],
      dietary: ['Veg']
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
      
      // Recipe matches if at least 60% of its ingredients are available
      const matchPercentage = matchingIngredients.length / recipe.ingredients.length;
      return matchPercentage >= 0.6;
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
      // Extract ingredients from user input
      const foundIngredients = extractIngredients(inputValue);
      
      if (foundIngredients.length > 0) {
        // Find recipes based on ingredients
        const matchingRecipes = findRecipesByIngredients(foundIngredients);
        
        if (matchingRecipes.length > 0) {
          const ingredientsList = foundIngredients.join(', ');
          const recipeCount = matchingRecipes.length;
          
          const responseText = `Great! I found ${recipeCount} recipe${recipeCount > 1 ? 's' : ''} you can make with ${ingredientsList}:`;
          
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            isUser: false,
            timestamp: new Date(),
            recipes: matchingRecipes.slice(0, 3) // Show top 3 recipes
          };
          
          setMessages(prev => [...prev, botMessage]);
        } else {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `I found ${foundIngredients.join(', ')} in your ingredients, but I don't have enough recipes that match these ingredients. Try adding more ingredients or ask me for cooking tips with what you have!`,
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