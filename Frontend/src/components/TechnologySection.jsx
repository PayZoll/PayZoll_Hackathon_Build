import React from 'react';
import { ShieldCheck, Cpu, Wallet } from 'lucide-react';

const technologies = [
  {
    icon: ShieldCheck,
    title: "Zero-Knowledge Proofs (ZKPs)",
    description: "Protect sensitive employee data while enabling seamless verification."
  },
  {
    icon: Cpu,
    title: "Smart Contracts",
    description: "Fully automated, error-free payment execution."
  },
  {
    icon: Wallet,
    title: "Binance Offramp Integration",
    description: "Convert crypto to fiat directly in the employee dashboard."
  }
];

const TechnologySection = () => {
  return (
    <section className="py-20 bg-crypto-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'rotate(30deg)',
              background: `linear-gradient(45deg, ${
                Math.random() > 0.5 ? '#6366f1' : '#a855f7'
              }33, transparent)`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Advanced Blockchain Innovation Meets{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Payroll Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Leveraging cutting-edge technology for seamless payroll management
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              {technologies.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-64 bg-crypto-card border border-gray-800 rounded-2xl transform"
                  style={{
                    top: `${index * 20}px`,
                    left: `${index * 20}px`,
                    zIndex: technologies.length - index,
                    opacity: 0.6 + (index * 0.2)
                  }}
                />
              ))}
              
              <div className="relative z-10 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 transform hover:scale-105 transition-transform">
                <div className="space-y-6">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                          <tech.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {tech.title}
                        </h3>
                        <p className="text-gray-400">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse flex items-center justify-center">
                      <Cpu className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="absolute w-16 h-16"
                      style={{
                        transform: `rotate(${(360 / technologies.length) * index}deg) translateX(120px)`,
                      }}
                    >
                      <div className="w-full h-full animate-spin-slow" style={{ animationDirection: index % 2 ? 'reverse' : 'normal' }}>
                        <div className="w-16 h-16 rounded-lg bg-crypto-card border border-indigo-500/20 flex items-center justify-center transform hover:scale-110 transition-transform">
                          <tech.icon className="w-8 h-8 text-indigo-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;