import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
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

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen">
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
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;