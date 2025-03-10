import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SettingsHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
        <Link to="/dashboard" className="hover:text-white transition-colors flex items-center">
          <Home className="w-4 h-4 mr-1" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-white">Settings</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your account preferences and configurations
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                      flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}