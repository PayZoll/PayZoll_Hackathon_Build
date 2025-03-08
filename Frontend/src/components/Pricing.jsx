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
    features: [
      'Unlimited employees',
      'Full feature access',
      'Dedicated support',
      'Custom integration',
      'Advanced security', 
      'SLA guarantee'
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative bg-gradient-to-b from-transparent to-crypto-dark/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Start Enjoying PayZoll Today
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business and scale with confidence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-20 place-items-center max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 w-full max-w-md ${
                plan.popular
                  ? 'bg-gradient-to-b from-indigo-600/90 to-purple-600/90 text-white shadow-xl shadow-indigo-500/20 border border-indigo-400/20'
                  : 'bg-crypto-card/60 border border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="text-center mb-8">
                {plan.popular && (
                  <span className="bg-indigo-400/20 text-indigo-200 text-sm px-4 py-1 rounded-full mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <div className="text-5xl font-bold mb-2">
                  {plan.price}
                </div>
                <div className={plan.popular ? 'text-indigo-200' : 'text-gray-400'}>
                  {plan.duration}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-5 w-5 mr-3 ${plan.popular ? 'text-indigo-200' : 'text-indigo-400'}`} />
                    <span className={plan.popular ? 'text-indigo-100' : 'text-gray-400'}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-4 rounded-2xl text-center transition-all duration-300 font-semibold ${
                  plan.popular
                    ? 'bg-white text-indigo-600 hover:shadow-lg hover:shadow-white/10'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}