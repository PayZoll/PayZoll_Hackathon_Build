import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Key, Copy, Eye, EyeOff, 
  Plus, Trash2, RefreshCcw, AlertTriangle 
} from 'lucide-react';

export default function APISettings() {
  const [showKey, setShowKey] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState(['read']);

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk_live_123...abc',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'sk_test_456...xyz',
      created: '2024-01-10',
      lastUsed: '1 day ago',
      permissions: ['read'],
      status: 'active'
    }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Binance',
      status: 'connected',
      lastSync: '5 minutes ago'
    },
    {
      id: 2,
      name: 'Uniswap',
      status: 'pending',
      lastSync: 'Never'
    }
  ];

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    // Add toast notification here
  };

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">API Keys</h2>
              <p className="text-sm text-gray-400">Manage your API access tokens</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 
                           rounded-xl text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Generate New Key</span>
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{apiKey.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-400">Created: {apiKey.created}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">Last used: {apiKey.lastUsed}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleCopyKey(apiKey.key)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="font-mono text-sm bg-crypto-card/50 p-2 rounded">
                    {showKey ? apiKey.key : '•'.repeat(20)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {apiKey.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400
                               border border-indigo-500/20"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-200 font-semibold">Security Notice:</p>
              <p className="text-yellow-200/80 mt-1">
                Keep your API keys secure and never share them publicly. Rotate keys regularly
                and revoke any that may have been compromised.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                        flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">External Integrations</h2>
            <p className="text-sm text-gray-400">Connect third-party services</p>
          </div>
        </div>

        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                                flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <div className="text-sm text-gray-400">
                      Last synced: {integration.lastSync}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    integration.status === 'connected'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {integration.status}
                  </span>
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 rounded-xl bg-crypto-dark border border-gray-800 
                         text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all
                         flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Integration</span>
        </button>
      </div>

      {/* Documentation Section */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-4">API Documentation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 
                     transition-all group"
          >
            <h3 className="font-semibold group-hover:text-white transition-colors">
              Getting Started
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Learn the basics of our API integration
            </p>
          </a>
          
          <a
            href="#"
            className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 
                     transition-all group"
          >
            <h3 className="font-semibold group-hover:text-white transition-colors">
              API Reference
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Complete documentation of all endpoints
            </p>
          </a>
          
          <a
            href="#"
            className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 
                     transition-all group"
          >
            <h3 className="font-semibold group-hover:text-white transition-colors">
              Code Examples
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Sample code in various languages
            </p>
          </a>
          
          <a
            href="#"
            className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 
                     transition-all group"
          >
            <h3 className="font-semibold group-hover:text-white transition-colors">
              Best Practices
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Security and optimization guidelines
            </p>
          </a>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                   text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}