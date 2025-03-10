import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    duration: 'for 1 month',
    features: [
      'Up to 10 employees',
      'Basic payroll features', 
      'Email support',
      'Basic analytics'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    duration: 'tailored for you',
    popular: true,
    features: [
      'Unlimited employees',
      'Full feature access & SLA guarantee',
      'Dedicated support & Advanced security',
      'Custom integration',
      'White-label options'
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-gradient-to-b from-transparent to-crypto-dark/50 flex flex-col items-center w-full">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Enjoying <span className="gradient-text">PayZoll Today</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto px-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-xl p-8 w-full max-w-md ${
                plan.popular
                  ? 'bg-crypto-card border-2 border-purple-500/20'
                  : 'bg-crypto-card border border-gray-800'
              }`}
            >
              <div className="flex-grow flex flex-col">
                <div className="text-center mb-8">
                  {plan.popular && (
                    <span className="bg-purple-500/10 text-purple-300 text-sm px-4 py-1 rounded-full mb-4 inline-block">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                  </div>
                  <div className="text-gray-400 text-base">
                    {plan.duration}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-purple-400" />
                      <span className="text-gray-400 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-4 rounded-lg text-center ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white/5 text-white border border-white/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}