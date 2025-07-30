import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Star, Leaf, Flame, Heart, Share2, BookOpen, Users, X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Import all recipe images
import palakPaneerImg from '../palak paneer.557Z.png';
import butterChickenImg from '../Butter Chicken (Murgh Makhani).825Z.png';
import chanaMasalaImg from '../Chana Masala (Spiced Chickpea Curry).301Z.png';
import alooGobiImg from '../Aloo Gobi.641Z.png';
import dalTadkaImg from '../Dal Tadka.272Z.png';
import chickenBiryaniImg from '../Chicken Biryani.649Z.png';
import masalaDosaImg from '../Masala Dosa.839Z.png';
import samosaImg from '../Samosa.063Z.png';
import pavBhajiImg from '../Pav Bhaji.589Z.png';
import roganJoshImg from '../Rogan Josh.538Z.png';
import lemonRiceImg from '../Lemon Rice (Chitranna).208Z.png';
import mangoLassiImg from '../Mango Lassi.144Z.png';
import chickenKormaImg from '../Chicken Korma.985Z.png';
import onionPakoraImg from '../Onion Pakora (Bhaji).957Z.png';
import saagAlooImg from '../Saag Aloo.564Z.png';
import tandooriChickenImg from '../Tandoori Chicken.750Z.png';
import keemaMatarImg from '../Keema Matar.472Z.png';
import kheerImg from '../Kheer (Indian Rice Pudding).612Z.png';
import bhindiMasalaImg from '../Bhindi Masala.306Z.png';
import paniPuriImg from '../Pani Puri (Golgappa).141Z.png';

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  difficulty: string;
  ingredients: string[];
  dietary: string[];
  shortDescription: string;
  instructions: string[];
  servings: number;
  cuisine: string;
}

const VirtualFridge: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const ingredients = [
    'Paneer', 'Tomato', 'Onion', 'Potato', 'Yogurt', 
    'Ginger', 'Garlic', 'Rice', 'Spinach', 
    'Bell Pepper', 'Chicken', 'Cauliflower',
    'Chickpeas', 'Lentils', 'Milk', 'Cream', 'Butter',
    'Mango', 'Cashews', 'Gram Flour', 'Peas', 'Okra',
    'Lemon', 'Peanuts', 'Curry Leaves', 'Sugar', 'Ghee',
    'Spices', 'Mint', 'Tamarind'
  ];

  const filters = [
    { id: 'All', label: 'All Recipes', icon: null },
    { id: 'Veg', label: 'Veg Only', icon: Leaf },
    { id: 'Spicy', label: 'Spicy', icon: Flame },
    { id: 'Jain', label: 'Jain', icon: Star }
  ];

  const recipes: Recipe[] = useMemo(() => [
    {
      id: 1,
      title: "Palak Paneer",
      image: palakPaneerImg,
      shortDescription: "A classic North Indian dish where soft paneer cubes are simmered in a creamy, mildly spiced spinach gravy.",
      instructions: [
        "Blanch 250g of fresh spinach in boiling water for 2 minutes, then immediately transfer to ice-cold water.",
        "Drain the spinach and blend it into a smooth puree. Set aside.",
        "Heat 1 tbsp of oil in a pan. Sauté 200g of paneer cubes until lightly golden. Remove and set aside.",
        "In the same pan, add 1 tbsp of butter. Add 1 tsp of cumin seeds and let them splutter.",
        "Add 1 finely chopped onion and sauté until translucent.",
        "Add 1 tbsp of ginger-garlic paste and cook for one minute.",
        "Add 1 finely chopped tomato and cook until soft.",
        "Stir in 1/2 tsp turmeric powder, 1 tsp coriander powder, and 1/2 tsp red chili powder. Cook for 2 minutes.",
        "Pour in the spinach puree and 1/4 cup of water. Mix well and bring to a simmer.",
        "Add 2 tbsp of fresh cream and the sautéed paneer cubes.",
        "Season with salt and 1/2 tsp of garam masala. Simmer for 5 minutes. Serve hot."
      ],
      time: "30 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "North Indian",
      ingredients: ['Paneer', 'Spinach', 'Onion', 'Ginger', 'Garlic', 'Tomato', 'Cream'],
      dietary: ['Veg']
    },
    {
      id: 2,
      title: "Butter Chicken (Murgh Makhani)",
      image: butterChickenImg,
      shortDescription: "The world-famous, decadent, and creamy tomato-based curry with tender tandoori chicken pieces.",
      instructions: [
        "Marination: In a bowl, mix 500g boneless chicken pieces with 1/2 cup yogurt, 1 tbsp ginger-garlic paste, 1 tsp red chili powder, 1 tsp tandoori masala, and salt. Marinate for at least 1 hour.",
        "Grill or pan-fry the marinated chicken until cooked through and slightly charred. Set aside.",
        "Gravy: Heat 2 tbsp of butter in a pan. Add 1 tbsp ginger-garlic paste and sauté.",
        "Add 2 cups of tomato puree and 1/4 cup of cashew paste. Cook for 10 minutes until the mixture thickens.",
        "Stir in 1 tsp red chili powder, 1 tsp sugar, and salt to taste.",
        "For a smooth texture, blend the gravy and strain it through a fine-mesh sieve.",
        "Return the gravy to the pan. Add the cooked chicken pieces.",
        "Pour in 1/4 cup of fresh cream and 1 tsp of crushed kasuri methi (dried fenugreek leaves).",
        "Simmer on low heat for 5-7 minutes. Garnish with more cream and cilantro."
      ],
      time: "45 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "North Indian",
      ingredients: ['Chicken', 'Yogurt', 'Ginger', 'Garlic', 'Tomato', 'Cream', 'Butter'],
      dietary: ['Spicy']
    },
    {
      id: 3,
      title: "Chana Masala (Spiced Chickpea Curry)",
      image: chanaMasalaImg,
      shortDescription: "A popular and protein-packed vegetarian curry made with chickpeas in a spicy onion-tomato gravy.",
      instructions: [
        "Heat 2 tbsp of oil in a pressure cooker or pot. Add 1 tsp cumin seeds, 1 bay leaf, and a pinch of asafoetida.",
        "Add 1 large finely chopped onion and sauté until golden brown.",
        "Add 1 tbsp ginger-garlic paste and cook for a minute.",
        "Add 2 finely chopped tomatoes or 1 cup tomato puree. Cook until oil starts to separate.",
        "Add 1/2 tsp turmeric, 2 tsp coriander powder, 1 tsp red chili powder, and 2 tsp chana masala powder. Sauté for one minute.",
        "Add 2 cups of soaked & boiled chickpeas (or canned, drained). Mix well to coat with the masala.",
        "Add 1.5 cups of water and salt to taste.",
        "If using a pressure cooker, cook for 2 whistles. If using a pot, cover and simmer for 15-20 minutes.",
        "Slightly mash some chickpeas with the back of a spoon to thicken the gravy.",
        "Garnish with 1/2 tsp garam masala, chopped cilantro, and a squeeze of lemon juice."
      ],
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "North Indian",
      ingredients: ['Chickpeas', 'Onion', 'Ginger', 'Garlic', 'Tomato'],
      dietary: ['Veg', 'Spicy']
    },
    {
      id: 4,
      title: "Aloo Gobi",
      image: alooGobiImg,
      shortDescription: "A comforting and simple dry curry made with potatoes (aloo) and cauliflower (gobi).",
      instructions: [
        "Heat 3 tbsp of oil in a large pan or kadai.",
        "Add 1 tsp of cumin seeds and let them crackle.",
        "Add 1 finely chopped onion and sauté until light brown.",
        "Add 1 tsp of grated ginger and 2 chopped green chilies. Sauté for 30 seconds.",
        "Add 2 medium-sized potato cubes and cook for 5 minutes, stirring occasionally.",
        "Add 1 medium-sized cauliflower, cut into florets. Mix well.",
        "Add 1/2 tsp turmeric powder, 1 tsp coriander powder, and salt to taste. Stir to coat everything evenly.",
        "Cover the pan and cook on low heat for 15-20 minutes, or until both potatoes and cauliflower are tender. Stir every 5 minutes to prevent sticking.",
        "Once cooked, uncover and increase the heat to medium-high for 2 minutes to get a slight roast.",
        "Garnish with 1/2 tsp garam masala and fresh cilantro."
      ],
      time: "30 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "North Indian",
      ingredients: ['Potato', 'Cauliflower', 'Onion', 'Ginger'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 5,
      title: "Dal Tadka",
      image: dalTadkaImg,
      shortDescription: "A comforting and flavorful yellow lentil curry tempered with ghee and spices.",
      instructions: [
        "Wash and soak 1 cup of toor dal (pigeon pea lentils) for 30 minutes.",
        "Pressure cook the dal with 3 cups of water, 1/2 tsp turmeric powder, and salt until soft (about 3-4 whistles).",
        "For Tadka (Tempering): Heat 2 tbsp of ghee in a small pan.",
        "Add 1 tsp of mustard seeds and 1 tsp of cumin seeds. Let them splutter.",
        "Add 4-5 cloves of chopped garlic and sauté until golden.",
        "Add 1-2 dried red chilies and a pinch of asafoetida (hing).",
        "Turn off the heat and add 1/2 tsp of red chili powder. Be careful not to burn it.",
        "Pour this hot tempering over the cooked dal immediately.",
        "Mix well and bring to a quick boil.",
        "Garnish with chopped cilantro and serve hot with rice."
      ],
      time: "20 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "North Indian",
      ingredients: ['Lentils', 'Ginger', 'Garlic'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 6,
      title: "Chicken Biryani",
      image: chickenBiryaniImg,
      shortDescription: "A royal and aromatic layered rice dish made with marinated chicken, fragrant spices, and long-grain basmati rice.",
      instructions: [
        "Marinate Chicken: Mix 500g chicken pieces with 1 cup yogurt, 2 tbsp ginger-garlic paste, 1 tsp turmeric, 2 tsp red chili powder, 2 tbsp biryani masala, juice of 1 lemon, a handful of chopped mint and cilantro. Marinate for 2 hours.",
        "Cook Rice: Wash 2 cups of basmati rice. Boil water in a large pot with whole spices (bay leaf, cinnamon, cardamom) and salt. Add rice and cook until it is 70% done. Drain and set aside.",
        "Fry Onions: Thinly slice 2 large onions and deep fry them until golden and crisp (birista).",
        "Cook Chicken: Heat 3 tbsp of oil/ghee in a heavy-bottomed pot. Add the marinated chicken and cook for 15-20 minutes until it's almost cooked.",
        "Layering: In the same pot over the chicken, spread half of the cooked rice.",
        "Sprinkle half of the fried onions, mint, and cilantro.",
        "Spread the remaining rice on top.",
        "Top with the rest of the fried onions, mint, cilantro, 2 tbsp of ghee, and saffron-infused milk (a pinch of saffron in 2 tbsp warm milk).",
        "Dum Cooking: Cover the pot with a tight lid (seal with dough if possible). Cook on very low heat (dum) for 20-25 minutes.",
        "Let it rest for 10 minutes before fluffing the layers gently with a fork."
      ],
      time: "90 mins",
      servings: 6,
      difficulty: "Hard",
      cuisine: "Hyderabadi",
      ingredients: ['Chicken', 'Rice', 'Yogurt', 'Ginger', 'Garlic', 'Onion'],
      dietary: ['Spicy']
    },
    {
      id: 7,
      title: "Masala Dosa",
      image: masalaDosaImg,
      shortDescription: "A famous South Indian crispy crepe made from fermented rice and lentil batter, filled with a savory potato stuffing.",
      instructions: [
        "Batter: Use a store-bought dosa batter or make your own by soaking and grinding rice and urad dal. The batter should be fermented overnight.",
        "Potato Filling: Boil and mash 3 medium potatoes.",
        "Heat 1 tbsp oil. Add 1 tsp mustard seeds, 1 tsp chana dal, and a few curry leaves.",
        "Add 1 finely chopped onion and sauté until soft.",
        "Add 1/2 tsp turmeric powder, the mashed potatoes, and salt. Mix well. Add a little water if too dry.",
        "Garnish the filling with chopped cilantro and set aside.",
        "Making Dosa: Heat a non-stick tawa or cast-iron skillet on medium-high heat. Sprinkle some water; if it sizzles and evaporates, the tawa is ready.",
        "Pour a ladleful of batter in the center and quickly spread it outwards in a circular motion to form a thin crepe.",
        "Drizzle 1 tsp of oil or ghee around the edges and on top.",
        "When the base is golden and crispy, place a spoonful of the potato filling in the center and fold the dosa. Serve immediately with sambar and chutney."
      ],
      time: "40 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "South Indian",
      ingredients: ['Rice', 'Potato', 'Onion'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 8,
      title: "Samosa",
      image: samosaImg,
      shortDescription: "The quintessential Indian snack - a deep-fried pastry with a savory filling of spiced potatoes and peas.",
      instructions: [
        "Dough: Mix 2 cups of all-purpose flour, 1/2 tsp carom seeds (ajwain), salt, and 4 tbsp of oil until it resembles breadcrumbs. Gradually add cold water to form a stiff dough. Cover and rest for 30 minutes.",
        "Filling: Boil and crumble 3 large potatoes.",
        "Heat 1 tbsp oil. Sauté 1 tsp cumin seeds, then add 1 tsp grated ginger and 1 chopped green chili.",
        "Add 1/2 cup of green peas and cook for 2 minutes.",
        "Add 1/2 tsp turmeric, 1 tsp coriander powder, 1/2 tsp garam masala, and 1 tsp amchur (dry mango powder).",
        "Add the crumbled potatoes and salt. Mix well. Let it cool.",
        "Assembly: Divide the dough into small balls. Roll each into an oval, then cut it in half.",
        "Take one semicircle, form a cone shape by overlapping the straight edge and sealing with water.",
        "Fill the cone with the potato mixture and seal the top edge securely.",
        "Frying: Heat oil in a deep pan on low-medium heat. Gently drop the samosas and fry for 10-15 minutes, turning occasionally, until golden brown and crisp."
      ],
      time: "60 mins",
      servings: 8,
      difficulty: "Medium",
      cuisine: "North Indian",
      ingredients: ['Potato', 'Ginger', 'Oil'],
      dietary: ['Veg']
    },
    {
      id: 9,
      title: "Pav Bhaji",
      image: pavBhajiImg,
      shortDescription: "A flavorful mash of mixed vegetables cooked in a special blend of spices and served with soft, buttered bread rolls. A Mumbai street food favorite.",
      instructions: [
        "Boil 2 potatoes, 1 cup cauliflower florets, 1/2 cup green peas, and 1 chopped carrot until very soft. Mash them together and set aside.",
        "Heat 2 tbsp butter and 1 tbsp oil in a large pan.",
        "Add 1 large finely chopped onion and sauté until translucent.",
        "Add 1 tbsp ginger-garlic paste and 1 chopped green capsicum. Sauté for 2-3 minutes.",
        "Add 2 finely chopped tomatoes and cook until mushy.",
        "Add 1/2 tsp turmeric powder, 1 tsp red chili powder, and 3-4 tbsp of pav bhaji masala. Cook for 2 minutes.",
        "Add the mashed vegetable mixture to the pan. Add 1 cup of water and salt to taste.",
        "Using a potato masher, mash everything together in the pan until well combined. Simmer for 10-15 minutes, mashing occasionally.",
        "Add another tbsp of butter and juice of half a lemon. Mix well.",
        "Slit pav (bread rolls) horizontally, apply butter, and toast on a hot tawa until golden. Serve hot bhaji topped with more butter, onions, and cilantro."
      ],
      time: "35 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "Maharashtrian",
      ingredients: ['Potato', 'Onion', 'Ginger', 'Garlic', 'Tomato', 'Butter'],
      dietary: ['Veg']
    },
    {
      id: 10,
      title: "Rogan Josh",
      image: roganJoshImg,
      shortDescription: "A signature aromatic lamb curry from Kashmir, known for its brilliant red color and robust flavor from fennel and ginger.",
      instructions: [
        "Heat 4 tbsp of mustard oil in a heavy-bottomed pot until it smokes lightly. Let it cool slightly.",
        "Add whole spices: 1 black cardamom, 2 green cardamoms, 1-inch cinnamon stick, and 2 cloves. Sauté for 30 seconds.",
        "Add 500g of lamb or mutton pieces and brown them on all sides on high heat.",
        "Lower the heat. Add a pinch of asafoetida and 2 tbsp of Kashmiri red chili powder (which gives color without much heat). Stir well.",
        "In a separate bowl, whisk 1 cup of yogurt until smooth.",
        "Slowly add the whisked yogurt to the pot, a little at a time, stirring constantly to prevent curdling.",
        "Add 1 tbsp of fennel powder, 1 tsp of dried ginger powder, and salt to taste. Mix well.",
        "Add 2 cups of hot water. Bring the curry to a boil.",
        "Cover the pot and simmer on low heat for 1 to 1.5 hours, or until the lamb is tender and the gravy is thick and deep red.",
        "Garnish with a swirl of any remaining yogurt or cream and serve hot."
      ],
      time: "120 mins",
      servings: 6,
      difficulty: "Hard",
      cuisine: "Kashmiri",
      ingredients: ['Lamb', 'Yogurt', 'Ginger', 'Oil'],
      dietary: ['Spicy']
    },
    {
      id: 21,
      title: "Lemon Rice (Chitranna)",
      image: lemonRiceImg,
      shortDescription: "A tangy, fragrant, and light South Indian rice dish flavored with lemon juice, tempering spices, and peanuts.",
      instructions: [
        "You'll need 3 cups of cooked and cooled rice. Ensure the grains are separate.",
        "Heat 2 tbsp of oil in a pan. Add 1 tsp of mustard seeds and let them crackle.",
        "Add 1 tbsp of chana dal (split chickpeas) and 1 tsp of urad dal (split black gram). Sauté until they turn golden.",
        "Add 2 tbsp of raw peanuts and sauté until they are crunchy.",
        "Add 2 dried red chilies, a sprig of curry leaves, and a pinch of asafoetida. Sauté for 30 seconds.",
        "Add 1/2 tsp of turmeric powder and mix. Turn off the heat.",
        "Pour this tempering over the cooked rice.",
        "Add salt to taste and the juice of 1-2 large lemons (to your preference).",
        "Gently mix everything together until the rice is evenly yellow and coated with the spices.",
        "Garnish with fresh cilantro and serve at room temperature or warm."
      ],
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "South Indian",
      ingredients: ['Rice', 'Lemon', 'Peanuts', 'Curry Leaves'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 22,
      title: "Mango Lassi",
      image: mangoLassiImg,
      shortDescription: "A creamy and refreshing yogurt-based smoothie made with sweet mango pulp, a quintessential Indian summer drink.",
      instructions: [
        "Peel and chop 2 ripe, sweet mangoes (or use 1 cup of canned mango pulp).",
        "Add the chopped mangoes to a blender jar.",
        "Add 1 cup of plain, thick yogurt.",
        "Add 1/2 cup of milk (or water for a lighter lassi).",
        "Add 2-4 tbsp of sugar or honey, depending on the sweetness of the mangoes.",
        "Add a pinch of ground cardamom for fragrance.",
        "Add 4-5 ice cubes to the blender.",
        "Blend on high speed until everything is smooth and creamy.",
        "Taste and adjust sweetness if necessary.",
        "Pour into tall glasses, garnish with chopped pistachios or a mint leaf, and serve chilled."
      ],
      time: "10 mins",
      servings: 2,
      difficulty: "Easy",
      cuisine: "Punjabi",
      ingredients: ['Mango', 'Yogurt', 'Milk', 'Sugar'],
      dietary: ['Veg']
    },
    {
      id: 23,
      title: "Chicken Korma",
      image: chickenKormaImg,
      shortDescription: "A mild yet rich chicken curry cooked in a delectable white gravy made from yogurt, nuts, and aromatic spices.",
      instructions: [
        "Marinate 500g of chicken pieces with 1 tbsp ginger-garlic paste and salt for 30 minutes.",
        "Make a fine paste by blending 1/4 cup cashews, 1 tbsp poppy seeds, and a little water. Set aside.",
        "Heat 3 tbsp ghee in a pot. Sauté whole spices (bay leaf, cinnamon, green cardamoms).",
        "Add 1 thinly sliced large onion and fry until it is light golden.",
        "Add the marinated chicken and sear on high heat for 5-7 minutes.",
        "Lower the heat, add 1 cup of well-whisked plain yogurt, stirring constantly to prevent curdling.",
        "Stir in the cashew paste, 1 tsp coriander powder, and 1/2 tsp white pepper powder.",
        "Add 1 cup of water or chicken stock, cover, and cook on low heat for 20-25 minutes until chicken is tender.",
        "Uncover and stir in 2 tbsp of fresh cream.",
        "Finish with a pinch of garam masala and a few drops of rose or kewra water (optional). Garnish with fried onions."
      ],
      time: "60 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "Mughlai",
      ingredients: ['Chicken', 'Yogurt', 'Cashews', 'Ghee'],
      dietary: ['Spicy']
    },
    {
      id: 24,
      title: "Onion Pakora (Bhaji)",
      image: onionPakoraImg,
      shortDescription: "Crispy fritters made with onions and gram flour batter. The perfect crunchy, savory snack, especially on a rainy day.",
      instructions: [
        "Thinly slice 2 large onions. Place them in a large bowl.",
        "Add salt to the onions and mix well. Let it sit for 10 minutes. The onions will release water.",
        "To the onions, add 1 tsp red chili powder, 1/2 tsp turmeric powder, 1 tsp carom seeds (ajwain), and a handful of chopped cilantro.",
        "Add 1 cup of gram flour (besan) to the bowl.",
        "Mix everything together without adding any water first. The moisture from the onions should be enough to start binding the flour.",
        "If needed, add 1-2 tablespoons of water to form a very thick, sticky batter that just coats the onions.",
        "Heat oil for deep frying in a kadai or deep pan over medium-high heat.",
        "Drop small, irregular dollops of the onion batter into the hot oil. Do not overcrowd the pan.",
        "Fry for 4-5 minutes, turning occasionally, until the pakoras are deep golden brown and crispy.",
        "Remove with a slotted spoon onto a plate lined with paper towels. Serve hot with chutney or ketchup."
      ],
      time: "30 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "North Indian",
      ingredients: ['Onion', 'Gram Flour', 'Oil', 'Spices'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 25,
      title: "Saag Aloo",
      image: saagAlooImg,
      shortDescription: "A simple yet delicious Punjabi curry combining tender potatoes with a flavorful blend of puréed leafy greens like spinach and mustard greens.",
      instructions: [
        "Wash and chop 500g of mixed greens (spinach is primary, add mustard greens or fenugreek for more flavor).",
        "Blanch the greens in boiling water for 3 minutes, then refresh in ice-cold water. Drain and coarsely blend into a paste.",
        "Boil 3 medium potatoes until tender, then peel and cube them.",
        "Heat 2 tbsp of oil or ghee in a pan. Add 1 tsp of cumin seeds.",
        "Add 1 finely chopped onion and sauté until golden.",
        "Add 1 tbsp of finely chopped ginger and garlic, and cook for another minute.",
        "Add 1 chopped tomato and cook until soft. Stir in 1/2 tsp turmeric and 1 tsp coriander powder.",
        "Add the prepared green saag paste and the cubed potatoes.",
        "Season with salt, mix well, and simmer for 10 minutes for the flavors to meld.",
        "Finish with a squeeze of lemon juice and a dollop of butter or ghee before serving."
      ],
      time: "45 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "Punjabi",
      ingredients: ['Spinach', 'Potato', 'Onion', 'Ginger', 'Garlic'],
      dietary: ['Veg']
    },
    {
      id: 26,
      title: "Tandoori Chicken",
      image: tandooriChickenImg,
      shortDescription: "Chicken marinated in yogurt and a fiery spice blend, then roasted in a tandoor (or oven/grill) to smoky perfection.",
      instructions: [
        "Take 4 chicken leg quarters and make deep gashes in the meat.",
        "First Marination: Rub the chicken with 1 tbsp lemon juice, 1 tsp red chili powder, and salt. Set aside for 20 minutes.",
        "Second Marination: In a bowl, whisk 1 cup of thick yogurt. Add 2 tbsp ginger-garlic paste, 2 tbsp tandoori masala, 1 tsp garam masala, and 2 tbsp of mustard oil.",
        "For the classic red color, add a few drops of food coloring or 1 tbsp of Kashmiri red chili powder. Mix well.",
        "Coat the chicken pieces thoroughly with this second marinade, ensuring it gets into the gashes.",
        "Refrigerate and marinate for at least 4 hours, or preferably overnight.",
        "Preheat your oven to 220°C (425°F). Place the chicken on a wire rack over a baking tray.",
        "Bake for 20-25 minutes.",
        "Flip the chicken pieces, baste with melted butter or oil, and bake for another 15-20 minutes until cooked through and charred at the edges.",
        "For a smoky flavor (optional), place a small bowl with a hot piece of charcoal in the tray, pour 1 tsp ghee over it, and cover for 5 minutes. Serve with onion rings."
      ],
      time: "90 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "North Indian",
      ingredients: ['Chicken', 'Yogurt', 'Ginger', 'Garlic', 'Spices'],
      dietary: ['Spicy']
    },
    {
      id: 27,
      title: "Keema Matar",
      image: keemaMatarImg,
      shortDescription: "A hearty and flavorful dish of minced meat (usually lamb) and green peas cooked in a spiced onion-tomato gravy.",
      instructions: [
        "Heat 3 tbsp of oil in a pressure cooker or pot. Add whole spices (bay leaf, cinnamon, cloves).",
        "Add 2 finely chopped large onions and sauté until they are a deep golden brown.",
        "Add 2 tbsp ginger-garlic paste and cook for one minute until the raw smell is gone.",
        "Add 500g of minced meat (lamb or chicken). Sauté on high heat for 5-7 minutes until the keema changes color and is no longer lumpy.",
        "Add 2 finely chopped tomatoes and mix well.",
        "Add spice powders: 1 tsp turmeric, 2 tsp coriander powder, 1 tsp red chili powder, and salt. Cook until tomatoes are soft and oil separates.",
        "Add 1 cup of green peas (matar) and 1/2 cup of yogurt (optional, for richness). Mix well.",
        "Add 1 cup of hot water. If using a pressure cooker, cook for 2-3 whistles. If in a pot, cover and simmer for 20-25 minutes.",
        "Uncover and cook for a few more minutes if there is excess water, until you get your desired consistency.",
        "Garnish with 1 tsp garam masala and lots of fresh cilantro."
      ],
      time: "50 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "North Indian",
      ingredients: ['Lamb', 'Peas', 'Onion', 'Tomato', 'Ginger', 'Garlic'],
      dietary: ['Spicy']
    },
    {
      id: 28,
      title: "Kheer (Indian Rice Pudding)",
      image: kheerImg,
      shortDescription: "A creamy, slow-cooked Indian rice pudding made with milk, rice, sugar, and flavored with cardamom, saffron, and nuts.",
      instructions: [
        "Wash and soak 1/4 cup of basmati rice for 30 minutes. Drain well.",
        "In a heavy-bottomed pot, bring 1 liter (4 cups) of full-fat milk to a boil.",
        "Add the soaked rice to the boiling milk.",
        "Reduce the heat to low and simmer, stirring every few minutes to prevent sticking at the bottom.",
        "Cook for 25-30 minutes, or until the rice is completely cooked and the milk has thickened considerably.",
        "Add 1/2 cup of sugar (or to taste) and stir until it dissolves completely.",
        "Add 1/2 tsp of ground cardamom and a generous pinch of saffron strands (soaked in a little warm milk).",
        "Stir in 2 tbsp of chopped nuts like almonds, pistachios, and cashews.",
        "Cook for another 5 minutes until the kheer reaches a creamy, pudding-like consistency.",
        "Serve warm or chilled, garnished with more nuts and saffron."
      ],
      time: "60 mins",
      servings: 6,
      difficulty: "Easy",
      cuisine: "North Indian",
      ingredients: ['Rice', 'Milk', 'Sugar', 'Nuts', 'Saffron'],
      dietary: ['Veg']
    },
    {
      id: 29,
      title: "Bhindi Masala",
      image: bhindiMasalaImg,
      shortDescription: "A popular and flavorful dry curry made with okra (ladies' finger), onions, tomatoes, and a blend of aromatic spices.",
      instructions: [
        "Wash and thoroughly pat dry 500g of okra (bhindi). This is crucial to prevent sliminess. Trim the ends and chop into 1-inch pieces.",
        "Heat 3 tbsp of oil in a wide pan. Add the chopped okra and pan-fry on medium-high heat for 7-8 minutes until it is lightly browned and no longer slimy. Remove from the pan and set aside.",
        "In the same pan, add 1 tbsp more oil. Add 1 tsp of cumin seeds.",
        "Add 1 large sliced onion and sauté until translucent.",
        "Add 1 tsp of ginger-garlic paste and cook for a minute.",
        "Add 2 chopped tomatoes and cook until soft.",
        "Add spice powders: 1/2 tsp turmeric, 1 tsp coriander powder, 1 tsp red chili powder, and 1 tsp amchur (dry mango powder). Cook for 2 minutes.",
        "Add the fried okra back into the pan along with salt.",
        "Gently toss everything together to coat the okra with the masala. Cook for 5 more minutes on low heat.",
        "Finish with 1/2 tsp garam masala and garnish with fresh cilantro."
      ],
      time: "35 mins",
      servings: 4,
      difficulty: "Easy",
      cuisine: "North Indian",
      ingredients: ['Okra', 'Onion', 'Tomato', 'Ginger', 'Garlic'],
      dietary: ['Veg', 'Jain']
    },
    {
      id: 30,
      title: "Pani Puri (Golgappa)",
      image: paniPuriImg,
      shortDescription: "A popular street-food snack consisting of a hollow, crispy fried ball (puri) filled with a mixture of flavored water (pani), chutney, potato, and chickpeas.",
      instructions: [
        "Prepare Filling: In a bowl, mash 2 boiled potatoes. Add 1/2 cup boiled chickpeas, 1 finely chopped small onion, and salt. Mix well.",
        "Prepare Sweet Chutney: Mix 4 tbsp of tamarind paste with 4 tbsp of jaggery/sugar and 1/2 cup hot water. Stir until dissolved.",
        "Prepare Pani (Spicy Water) Base: In a blender, combine 1 cup fresh mint leaves, 1/2 cup fresh cilantro, 1-inch ginger, and 2-3 green chilies. Blend to a smooth paste with a little water.",
        "Strain this green paste through a sieve into a large jug.",
        "To the strained liquid, add 4 cups of chilled water.",
        "Add 2 tbsp of pani puri masala (or chaat masala), 1 tsp black salt, and juice of 1 lemon. Stir well.",
        "Add a handful of boondi (tiny fried gram flour balls) to the pani. Chill until ready to serve.",
        "Get Puris Ready: You'll need about 30-40 ready-made hollow puris (golgappe).",
        "Assemble: Gently tap a hole in the center of one puri.",
        "Fill the puri with a teaspoon of the potato filling, a few drops of sweet chutney, and then dip it completely into the chilled pani and eat immediately."
      ],
      time: "45 mins",
      servings: 6,
      difficulty: "Medium",
      cuisine: "Street Food",
      ingredients: ['Potato', 'Chickpeas', 'Mint', 'Cilantro', 'Tamarind'],
      dietary: ['Veg']
    }
  ], []);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleFavorite = (recipeId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavorites(newFavorites);
  };

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeRecipeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  useEffect(() => {
    let filtered = recipes;

    // Filter by selected ingredients - show recipes that contain ALL selected ingredients
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(recipe => 
        selectedIngredients.every(ingredient => 
          recipe.ingredients.includes(ingredient)
        )
      );
    }

    // Filter by dietary preferences
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(recipe => 
        recipe.dietary.includes(selectedFilter)
      );
    }

    setDisplayedRecipes(filtered);
  }, [selectedIngredients, selectedFilter, recipes]);

  const clearFilters = () => {
    setSelectedIngredients([]);
    setSelectedFilter('All');
  };

  return (
    <>
      <section className="py-20" style={{ backgroundColor: 'var(--background-primary)' }} data-section="recipes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {t('recipes.title')}{' '}
              <span style={{ color: 'var(--brand-accent-orange)' }}>{t('recipes.titleHighlight')}</span>
            </h2>
          </div>

          {/* Interactive Ingredient Selector */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              {t('recipes.ingredientsPrompt')}
            </h3>
            
            {/* Selected Ingredients Display */}
            {selectedIngredients.length > 0 && (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-orange-800">
                    Selected: {selectedIngredients.join(', ')}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {ingredients.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`ingredient-pill px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedIngredients.includes(ingredient) 
                      ? 'bg-orange-500 text-white shadow-lg' 
                      : 'bg-white shadow-md hover:shadow-lg hover:bg-gray-50'
                  }`}
                >
                  {ingredient}
                </button>
              ))}
            </div>

            {/* Dietary Preference Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedFilter === filter.id 
                        ? 'text-white' 
                        : 'bg-white shadow-md hover:shadow-lg'
                    }`}
                    style={{ 
                      backgroundColor: selectedFilter === filter.id ? 'var(--brand-accent-green)' : undefined 
                    }}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{t(`recipes.filters.${filter.id.toLowerCase()}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipe Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedRecipes.map((recipe, index) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Recipe Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(recipe.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.has(recipe.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={favorites.has(recipe.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-gray-100 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Recipe Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.shortDescription}
                  </p>

                  {/* Recipe Meta */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {recipe.cuisine}
                    </span>
                  </div>

                  {/* View Instructions Button */}
                  <button
                    onClick={() => openRecipeModal(recipe)}
                    className="flex items-center justify-center w-full text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors py-2 border-t border-gray-100"
                  >
                    <span className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{t('recipes.viewFull')}</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {displayedRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: 'var(--text-muted)' }}>
                Select some ingredients to see delicious recipes you can make!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recipe Modal */}
      {isModalOpen && selectedRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeRecipeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                      <button
                        onClick={closeRecipeModal}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">{t('recipes.backToRecipes')}</span>
                      </button>
                <button
                  onClick={closeRecipeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  {/* Recipe Header */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Recipe Image */}
                    <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
                      <img 
                        src={selectedRecipe.image} 
                        alt={selectedRecipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Recipe Info */}
                    <div className="space-y-4">
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {selectedRecipe.title}
                      </h1>
                      
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {selectedRecipe.shortDescription}
                      </p>

                      {/* Recipe Meta */}
                      <div className="grid grid-cols-2 gap-4">
                                                      <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500">{t('recipes.cookTime')}</p>
                                  <p className="font-semibold">{selectedRecipe.time}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500">{t('recipes.servings')}</p>
                                  <p className="font-semibold">{selectedRecipe.servings} {t('recipes.people')}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500">{t('recipes.difficulty')}</p>
                                  <p className="font-semibold">{selectedRecipe.difficulty}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className="w-5 h-5 text-gray-500">🌍</span>
                                <div>
                                  <p className="text-sm text-gray-500">{t('recipes.cuisine')}</p>
                                  <p className="font-semibold">{selectedRecipe.cuisine}</p>
                                </div>
                              </div>
                      </div>

                                                  {/* Ingredients */}
                            <div>
                              <h3 className="text-lg font-semibold mb-3">{t('recipes.ingredients')}</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedRecipe.ingredients.map((ingredient, index) => (
                                  <span 
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                  >
                                    {ingredient}
                                  </span>
                                ))}
                              </div>
                            </div>
                    </div>
                  </div>

                                          {/* Instructions */}
                        <div>
                          <h3 className="text-2xl font-bold mb-6">{t('recipes.instructions')}</h3>
                          <div className="space-y-4">
                            {selectedRecipe.instructions.map((instruction, index) => (
                              <div key={index} className="flex space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualFridge;