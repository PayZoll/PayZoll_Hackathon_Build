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
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 flex flex-col items-center">
          <div className="pt-10 pb-24 w-full">
            <Hero />
          </div>
          <div className="py-24 w-full">
            <Sponsors />
          </div>
          <div className="py-24 w-full">
            <Features />
          </div>
          <div className="py-24 w-full">
            <HowItWorks />
          </div>
          <div className="py-24 w-full">
            <Testimonials />
          </div>
          <div className="py-24 pb-32 w-full">
            <Pricing />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}