import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MoreVertical } from 'lucide-react';

const scheduledPayments = [
  {
    id: 1,
    title: 'Monthly Salary',
    amount: '$145,678',
    date: 'Jan 31, 2024',
    employees: 156,
    status: 'scheduled'
  },
  {
    id: 2,
    title: 'Performance Bonus',
    amount: '$25,000',
    date: 'Feb 15, 2024',
    employees: 45,
    status: 'pending'
  },
  {
    id: 3,
    title: 'Quarterly Incentives',
    amount: '$50,000',
    date: 'Mar 1, 2024',
    employees: 78,
    status: 'scheduled'
  }
];

export default function ScheduledPayments() {
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Scheduled Payments</h2>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {scheduledPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-crypto-dark/50 rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                              flex items-center justify-center transform transition-transform 
                              group-hover:scale-110">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-white transition-colors">
                    {payment.title}
                  </h3>
                  <div className="text-sm text-gray-400">
                    {payment.amount}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {payment.date}
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-4 h-4 mr-1" />
                  {payment.employees} employees
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                payment.status === 'scheduled'
                  ? 'bg-green-400/10 text-green-400'
                  : 'bg-yellow-400/10 text-yellow-400'
              }`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-crypto-dark border border-gray-800 
                       text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all">
        Schedule New Payment
      </button>
    </div>
  );
}