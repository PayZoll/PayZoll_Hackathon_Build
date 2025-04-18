import React from 'react';
import { ArrowRight, Wallet2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id='home' className="py-10 md:py-16">
      <div className="relative flex items-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-glow"></div>
        
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 relative z-10">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-sm">Web3 Payroll Solution</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="gradient-text">
                  Decentralized
                </span>
                <br />
                <span className="text-white">
                  Payroll Protocol
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                Experience the future of payroll with blockchain-powered instant global payments, zero-knowledge privacy, and complete automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <button className="btn-primary flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
                <button className="btn-secondary">
                  Read Docs
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-12 pt-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">$100M+</span>
                  <span className="text-gray-400 text-sm mt-1">Total Volume</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">50k+</span>
                  <span className="text-gray-400 text-sm mt-1">Transactions</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">10k+</span>
                  <span className="text-gray-400 text-sm mt-1">Users</span>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-gradient-conic from-indigo-500/40 via-purple-500/40 to-indigo-500/40 rounded-full filter blur-3xl opacity-30"></div>
              <div className="relative w-full max-w-md h-auto animate-float">
                <Wallet2 className="w-full h-full text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}