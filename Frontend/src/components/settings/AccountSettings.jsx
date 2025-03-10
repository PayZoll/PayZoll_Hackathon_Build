import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Plus, Trash2 } from 'lucide-react';

export default function AccountSettings() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Super Admin',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Admin',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Admin Profile */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Admin Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                         focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                         focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                         focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Role</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                         focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Management */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Management</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 
                           rounded-xl text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Admin</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-crypto-dark/90 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {admins.map((admin) => (
                <tr key={admin.id} className="group hover:bg-crypto-dark/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 
                                    flex items-center justify-center text-white">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="text-white">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400">
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Based Access */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Role-Based Access Control</h2>

        <div className="space-y-4">
          {['Super Admin', 'Admin', 'Manager'].map((role) => (
            <div key={role} className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-semibold">{role}</h3>
                </div>
                <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                  Edit Permissions
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-gray-400">User Management</div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={role === 'Super Admin'} readOnly />
                    <span>Create/Edit Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={role !== 'Manager'} readOnly />
                    <span>Delete Users</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400">Payment Management</div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked readOnly />
                    <span>View Payments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={role !== 'Manager'} readOnly />
                    <span>Process Payments</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400">Settings</div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={role === 'Super Admin'} readOnly />
                    <span>Manage Settings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={role === 'Super Admin'} readOnly />
                    <span>API Access</span>
                  </div>
                </div>
              </div>
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