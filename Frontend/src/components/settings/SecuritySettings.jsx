import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Smartphone, Key, Lock,
  Laptop, AlertTriangle, CheckCircle
} from 'lucide-react';

export default function SecuritySettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const authorizedDevices = [
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'Desktop',
      lastAccess: '2 hours ago',
      location: 'New York, US',
      current: true
    },
    {
      id: 2,
      name: 'iPhone 12',
      type: 'Mobile',
      lastAccess: '1 day ago',
      location: 'New York, US',
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Two-Factor Authentication</h2>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={is2FAEnabled}
              onChange={() => {
                setIs2FAEnabled(!is2FAEnabled);
                if (!is2FAEnabled) setShowQRCode(true);
              }}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {showQRCode && (
          <div className="bg-crypto-dark rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-center mb-4">
              {/* Placeholder for QR Code */}
              <div className="w-48 h-48 bg-white rounded-lg"></div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Scan this QR code with your authenticator app
              </p>
              <div className="font-mono text-lg mb-4 bg-crypto-card/50 p-2 rounded">
                ABCD-EFGH-IJKL-MNOP
              </div>
              <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                             text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                Verify Code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password Security */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                        flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Password Security</h2>
            <p className="text-sm text-gray-400">Manage your password settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-semibold">Change Password</div>
                <div className="text-sm text-gray-400">Last changed 30 days ago</div>
              </div>
            </div>
            <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Update
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="font-semibold">Password Requirements</div>
                <div className="text-sm text-gray-400">Minimum 12 characters with symbols</div>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>

      {/* Authorized Devices */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Authorized Devices</h2>

        <div className="space-y-4">
          {authorizedDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                              flex items-center justify-center">
                  {device.type === 'Desktop' ? (
                    <Laptop className="w-5 h-5 text-white" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-semibold flex items-center space-x-2">
                    <span>{device.name}</span>
                    {device.current && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                        Current Device
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Last active {device.lastAccess} • {device.location}
                  </div>
                </div>
              </div>
              {!device.current && (
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  Revoke Access
                </button>
              )}
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