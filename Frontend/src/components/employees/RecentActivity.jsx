import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, UserMinus, Wallet, 
  RefreshCcw, Clock, CheckCircle 
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'employee_added',
    message: 'New employee John Doe added to Engineering team',
    timestamp: '2 hours ago',
    icon: UserPlus,
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 2,
    type: 'salary_paid',
    message: 'Monthly salary processed for Marketing team',
    timestamp: '5 hours ago',
    icon: Wallet,
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 3,
    type: 'wallet_updated',
    message: 'Sarah Smith updated their wallet address',
    timestamp: '1 day ago',
    icon: RefreshCcw,
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 4,
    type: 'employee_left',
    message: 'Mike Johnson has been deactivated',
    timestamp: '2 days ago',
    icon: UserMinus,
    color: 'from-red-600 to-orange-600'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-crypto-dark/50 rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${activity.color} 
                            flex items-center justify-center transform transition-transform 
                            group-hover:scale-110`}>
                <activity.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}