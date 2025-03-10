import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Mail, MessageSquare, Smartphone, 
  Slack, MessageCircle, AlertTriangle, Plus 
} from 'lucide-react';

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const notificationTypes = [
    {
      id: 'payments',
      title: 'Payment Notifications',
      description: 'Updates about payroll processing and transactions',
      email: true,
      push: true
    },
    {
      id: 'security',
      title: 'Security Alerts',
      description: 'Important security-related notifications',
      email: true,
      push: true
    },
    {
      id: 'employees',
      title: 'Employee Updates',
      description: 'Changes to employee information and status',
      email: true,
      push: false
    }
  ];

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      icon: Slack,
      status: 'connected',
      webhook: 'https://hooks.slack.com/...'
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: MessageCircle,
      status: 'disconnected',
      webhook: ''
    }
  ];

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Email Notifications</h2>
              <p className="text-sm text-gray-400">Manage email alerts</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="space-y-4">
          {notificationTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800"
            >
              <div>
                <div className="font-semibold">{type.title}</div>
                <div className="text-sm text-gray-400">{type.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={type.email}
                  disabled={!emailNotifications}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                              peer-checked:bg-indigo-600 disabled:opacity-50"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                          flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Push Notifications</h2>
              <p className="text-sm text-gray-400">Manage browser notifications</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="space-y-4">
          {notificationTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800"
            >
              <div>
                <div className="font-semibold">{type.title}</div>
                <div className="text-sm text-gray-400">{type.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={type.push}
                  disabled={!pushNotifications}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                              peer-checked:bg-indigo-600 disabled:opacity-50"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                          flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Integrations</h2>
              <p className="text-sm text-gray-400">Connect messaging platforms</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg 
                         text-gray-400 hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>

        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800"
            >
              <div className="flex items-center space-x-4">
                <integration.icon className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="font-semibold">{integration.name}</div>
                  <div className="text-sm text-gray-400">
                    {integration.status === 'connected' ? integration.webhook : 'Not connected'}
                  </div>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm ${
                integration.status === 'connected'
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20'
              } transition-colors`}>
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
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