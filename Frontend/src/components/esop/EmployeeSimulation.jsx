import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, Lock, ArrowRight, 
  Calendar, TrendingUp, DollarSign 
} from 'lucide-react';

export default function EmployeeSimulation() {
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Employee View Simulation</h2>
          <p className="text-sm text-gray-400">Preview the employee's perspective</p>
        </div>
      </div>

      {/* Token Holdings */}
      <div className="bg-crypto-dark rounded-xl p-6 border border-gray-800 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                        flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Token Holdings</div>
            <div className="text-2xl font-bold text-white">10,000 ESOP</div>
            <div className="text-sm text-green-400">≈ $32,000 USD</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-crypto-card/50 rounded-lg p-4">
            <div className="text-sm text-gray-400">Vested Tokens</div>
            <div className="text-lg font-semibold text-indigo-400">6,000 ESOP</div>
            <div className="text-sm text-gray-400">60% of total</div>
          </div>
          <div className="bg-crypto-card/50 rounded-lg p-4">
            <div className="text-sm text-gray-400">Locked Tokens</div>
            <div className="text-lg font-semibold text-gray-400">4,000 ESOP</div>
            <div className="text-sm text-gray-400">40% remaining</div>
          </div>
        </div>

        {/* Vesting Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Vesting Progress</span>
            <span className="text-indigo-400">60%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full w-[60%] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              style={{ transition: 'width 1s ease-in-out' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Start: Jan 2023</span>
            <span>End: Dec 2024</span>
          </div>
        </div>
      </div>

      {/* Claim Options */}
      <div className="space-y-4">
        <h3 className="font-semibold">Available Actions</h3>
        
        <button className="w-full group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 
                         hover:border-indigo-500/50 rounded-xl p-4 transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
                            flex items-center justify-center transform transition-transform 
                            group-hover:scale-110">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold group-hover:text-white transition-colors">
                  Claim Vested Tokens
                </div>
                <div className="text-sm text-gray-400">
                  6,000 ESOP available to claim
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </button>

        <button className="w-full group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 
                         hover:border-indigo-500/50 rounded-xl p-4 transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                            flex items-center justify-center transform transition-transform 
                            group-hover:scale-110">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold group-hover:text-white transition-colors">
                  Convert to Fiat
                </div>
                <div className="text-sm text-gray-400">
                  Current rate: 1 ESOP = $3.20
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </button>

        <button className="w-full group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 
                         hover:border-indigo-500/50 rounded-xl p-4 transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                            flex items-center justify-center transform transition-transform 
                            group-hover:scale-110">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold group-hover:text-white transition-colors">
                  View Vesting Schedule
                </div>
                <div className="text-sm text-gray-400">
                  Next unlock: 1,000 ESOP in 30 days
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
}