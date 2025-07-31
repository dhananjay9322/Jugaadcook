import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyBar from './components/WhyBar';
import HowItWorks from './components/HowItWorks';
import VirtualFridge from './components/VirtualFridge';
import CommunityShowcase from './components/CommunityShowcase';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function AppContent() {
  const { language } = useLanguage();
  
  return (
    <div className={`min-h-screen ${language === 'HI' ? 'lang-hi' : 'lang-en'}`}>
      <Navbar />
      <HeroSection />
      <WhyBar />
      <HowItWorks />
      <VirtualFridge />
      <CommunityShowcase />
      <FAQ />
      <FinalCTA />
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;