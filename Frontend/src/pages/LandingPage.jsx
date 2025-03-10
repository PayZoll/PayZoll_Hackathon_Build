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
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="pt-10 pb-24">
            <Hero />
          </div>
          <div className="py-24">
            <Sponsors />
          </div>
          <div className="py-24">
            <Features />
          </div>
          <div className="py-24">
            <HowItWorks />
          </div>
          <div className="py-24">
            <Testimonials />
          </div>
          <div className="py-24 pb-32">
            <Pricing />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}