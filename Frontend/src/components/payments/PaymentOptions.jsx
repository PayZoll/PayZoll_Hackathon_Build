import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, Building2, Calendar,
  DollarSign, ArrowRight
} from 'lucide-react';

export default function PaymentOptions() {
  const options = [
    {
      title: 'Pay All Employees',
      description: 'Process payments for all active employees',
      icon: Users,
      color: 'from-indigo-600 to-purple-600',
      amount: '$145,678',
      employees: 156
    },
    {
      title: 'Pay Selected Employees',
      description: 'Choose specific employees to pay',
      icon: UserPlus,
      color: 'from-blue-600 to-indigo-600',
      amount: null,
      employees: null
    },
    {
      title: 'Pay by Department',
      description: 'Process payments by department',
      icon: Building2,
      color: 'from-purple-600 to-pink-600',
      departments: ['Engineering', 'Marketing', 'Sales']
    },
    {
      title: 'Schedule Payment',
      description: 'Set up future dated payments',
      icon: Calendar,
      color: 'from-green-600 to-emerald-600',
      scheduled: 3
    }
  ];

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <h2 className="text-xl font-bold mb-6">Payment Options</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 hover:border-indigo-500/50 
                     rounded-xl p-6 transition-all text-left"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} 
                            flex items-center justify-center transform transition-transform 
                            group-hover:scale-110`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold mb-1 group-hover:text-white transition-colors">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {option.description}
                </p>
                
                {option.amount && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-indigo-400">
                        {option.amount}
                      </div>
                      <div className="text-sm text-gray-400">
                        {option.employees} employees
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center
                                group-hover:bg-indigo-500 transition-colors">
                      <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                )}

                {option.departments && (
                  <div className="flex flex-wrap gap-2">
                    {option.departments.map((dept) => (
                      <span
                        key={dept}
                        className="px-2 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400
                                border border-indigo-500/20"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                )}

                {option.scheduled && (
                  <div className="text-sm text-gray-400">
                    {option.scheduled} payments scheduled
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-crypto-dark/50 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Next Payroll Date</div>
            <div className="font-semibold">December 31, 2024</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Processing Time</div>
            <div className="font-semibold">~30 seconds</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Gas Fees (Est.)</div>
            <div className="font-semibold text-green-400">$0.01</div>
          </div>
        </div>
      </div>
    </div>
  );
}