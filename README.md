# Food Assistant Chatbot

A React-based website with an integrated food-focused chatbot powered by Google's Gemini AI.

## Features

- **Food-Focused Chatbot**: AI assistant that only answers questions related to food, cooking, recipes, and nutrition
- **Modern UI**: Clean, responsive design with a floating chat widget
- **Real-time Responses**: Powered by Gemini 2.0 Flash Pro model
- **Smart Filtering**: Automatically detects and redirects non-food questions
- **User-Friendly**: Intuitive chat interface with loading states and timestamps

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

### Netlify Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Environment Variables**
   In Netlify dashboard, go to Site settings > Environment variables and add:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Deploy**
   - Netlify will automatically build and deploy your site
   - Your site will be available at a Netlify URL

## Chatbot Features

### Food-Related Topics Covered:
- Cooking tips and techniques
- Recipe suggestions and modifications
- Nutrition advice and dietary information
- Ingredient substitutions
- Food storage and preservation
- Dietary restrictions (vegan, vegetarian, gluten-free, etc.)
- Restaurant recommendations
- Culinary techniques and methods

### Smart Filtering:
The chatbot uses keyword detection to ensure only food-related questions are answered. Non-food questions are politely redirected to food topics.

### UI Features:
- Floating chat button in bottom-right corner
- Expandable chat window
- Message timestamps
- Loading indicators
- Responsive design
- Keyboard shortcuts (Enter to send)

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Generative AI (Gemini 2.0 Flash Pro)
- **Build Tool**: Vite

## API Configuration

The chatbot is configured to use Gemini 2.0 Flash Pro model with the following settings:
- Model: `gemini-2.0-flash-exp`
- Focus: Food-related queries only
- Response Style: Concise and helpful

## Security

- API keys are stored in environment variables
- Client-side filtering prevents non-food queries from reaching the API
- Error handling for API failures

## Usage

1. Click the chat icon in the bottom-right corner
2. Type your food-related question
3. Receive instant AI-powered responses
4. The chatbot will only answer questions about food, cooking, recipes, nutrition, and related topics

## Example Questions

- "How do I make the perfect scrambled eggs?"
- "What can I substitute for buttermilk in a recipe?"
- "Is quinoa gluten-free?"
- "How long can I store cooked chicken in the fridge?"
- "What are some healthy breakfast options?"
- "How do I cook pasta al dente?" 