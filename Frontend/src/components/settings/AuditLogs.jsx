import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, Search, Filter, Download,
  User, Wallet, Settings, Shield, Calendar,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const activityLogs = [
  {
    id: 1,
    type: 'payment',
    action: 'Payment Processed',
    details: 'Monthly salary payment for Engineering team',
    user: 'John Doe',
    timestamp: '2 hours ago',
    amount: '-145,678 USD',
    status: 'completed'
  },
  {
    id: 2,
    type: 'security',
    action: '2FA Enabled',
    details: 'Two-factor authentication activated',
    user: 'Sarah Smith',
    timestamp: '5 hours ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'wallet',
    action: 'Wallet Connected',
    details: 'New wallet address added',
    user: 'Mike Johnson',
    timestamp: '1 day ago',
    address: '0x1234...5678',
    status: 'success'
  }
];

const getActionIcon = (type) => {
  switch (type) {
    case 'payment':
      return Wallet;
    case 'security':
      return Shield;
    case 'wallet':
      return Wallet;
    case 'settings':
      return Settings;
    default:
      return ClipboardList;
  }
};

const getActionColor = (type) => {
  switch (type) {
    case 'payment':
      return 'from-indigo-600 to-purple-600';
    case 'security':
      return 'from-green-600 to-emerald-600';
    case 'wallet':
      return 'from-blue-600 to-indigo-600';
    case 'settings':
      return 'from-purple-600 to-pink-600';
    default:
      return 'from-gray-600 to-gray-700';
  }
};

export default function AuditLogs() {
  const [dateRange, setDateRange] = useState('7d');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Activity Logs</h2>
              <p className="text-sm text-gray-400">Track all system activities</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-64 bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                         focus:outline-none focus:border-indigo-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg 
                           text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg 
                           text-gray-400 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              className="bg-crypto-dark border border-gray-800 rounded-lg px-4 py-2 text-sm
                       focus:outline-none focus:border-indigo-500 transition-colors"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="custom">Custom range</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="bg-crypto-dark border border-gray-800 rounded-lg px-4 py-2 text-sm
                       focus:outline-none focus:border-indigo-500 transition-colors"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="payment">Payments</option>
              <option value="security">Security</option>
              <option value="wallet">Wallet</option>
              <option value="settings">Settings</option>
            </select>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {activityLogs.map((log) => {
            const ActionIcon = getActionIcon(log.type);
            const actionColor = getActionColor(log.type);

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-crypto-dark rounded-xl p-4 border border-gray-800 
                         hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${actionColor}
                                  flex items-center justify-center transform transition-transform 
                                  group-hover:scale-110`}>
                      <ActionIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold group-hover:text-white transition-colors">
                        {log.action}
                      </div>
                      <div className="text-sm text-gray-400">{log.details}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{log.user}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {log.amount && (
                      <div className="text-red-400 flex items-center justify-end space-x-1">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>{log.amount}</span>
                      </div>
                    )}
                    {log.address && (
                      <div className="font-mono text-sm text-gray-400">{log.address}</div>
                    )}
                    <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                      log.status === 'completed'
                        ? 'bg-green-500/10 text-green-400'
                        : log.status === 'failed'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing 10 of 156 activities
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              3
            </button>
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}