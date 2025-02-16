import React from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  CreditCard,
  Wallet,
  Shield,
  Bell,
  Code,
  ClipboardList,
  Palette,
  Scale,
  Trash2
} from 'lucide-react';

export default function SettingsNav({ activeSection, onSectionChange }) {
  const navItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'account', label: 'Account', icon: User },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API & Integrations', icon: Code },
    { id: 'audit', label: 'Audit Logs', icon: ClipboardList },
    { id: 'customization', label: 'Customization', icon: Palette },
    { id: 'compliance', label: 'Compliance', icon: Scale },
    { id: 'delete', label: 'Delete Account', icon: Trash2, danger: true }
  ];

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all sticky top-8">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group relative ${
              activeSection === item.id
                ? 'text-white bg-indigo-500/10 border border-indigo-500/50'
                : item.danger
                ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl"
              />
            )}
            <item.icon className={`w-5 h-5 ${
              activeSection === item.id ? 'text-indigo-400' : item.danger ? 'text-red-400' : ''
            }`} />
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}