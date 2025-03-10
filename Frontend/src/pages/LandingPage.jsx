import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import Sponsors from '../components/Sponsors';
import Testimonials from '../components/TestimonialsSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-crypto-dark text-white">
      <div className="fixed inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent"></div>
      <div className="relative">
        <Navbar />
        <Hero />
        <Sponsors />
        <Features />
        <HowItWorks />
        
        <Testimonials />
        
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}