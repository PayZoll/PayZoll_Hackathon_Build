import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Sun, Moon, Layout, 
  Grid, Sliders, Check 
} from 'lucide-react';

export default function CustomizationSettings() {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [layout, setLayout] = useState('default');

  const colors = [
    { id: 1, value: '#6366f1', name: 'Indigo' },
    { id: 2, value: '#8b5cf6', name: 'Purple' },
    { id: 3, value: '#a855f7', name: 'Violet' },
    { id: 4, value: '#ec4899', name: 'Pink' },
    { id: 5, value: '#10b981', name: 'Emerald' }
  ];

  const layouts = [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard dashboard layout'
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Condensed view with smaller elements'
    },
    {
      id: 'comfortable',
      name: 'Comfortable',
      description: 'Spacious layout with larger elements'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                        flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Theme Settings</h2>
            <p className="text-sm text-gray-400">Customize your dashboard appearance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme Mode */}
          <div className="space-y-4">
            <label className="block text-sm text-gray-400">Theme Mode</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center space-x-2 p-4 rounded-xl border 
                         transition-all ${
                           theme === 'light'
                             ? 'bg-indigo-500/10 border-indigo-500/50 text-white'
                             : 'bg-crypto-dark border-gray-800 text-gray-400 hover:text-white'
                         }`}
              >
                <Sun className="w-5 h-5" />
                <span>Light</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center space-x-2 p-4 rounded-xl border 
                         transition-all ${
                           theme === 'dark'
                             ? 'bg-indigo-500/10 border-indigo-500/50 text-white'
                             : 'bg-crypto-dark border-gray-800 text-gray-400 hover:text-white'
                         }`}
              >
                <Moon className="w-5 h-5" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-4">
            <label className="block text-sm text-gray-400">Accent Color</label>
            <div className="grid grid-cols-5 gap-4">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setAccentColor(color.value)}
                  className="relative w-full aspect-square rounded-xl border border-gray-800 
                           hover:border-gray-700 transition-all group"
                  style={{ backgroundColor: color.value }}
                >
                  {accentColor === color.value && (
                    <Check className="absolute inset-0 m-auto w-5 h-5 text-white" />
                  )}
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                        flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Layout Settings</h2>
            <p className="text-sm text-gray-400">Configure dashboard layout</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layouts.map((l) => (
            <button
              key={l.id}
              onClick={() => setLayout(l.id)}
              className={`p-4 rounded-xl border transition-all text-left ${
                layout === l.id
                  ? 'bg-indigo-500/10 border-indigo-500/50'
                  : 'bg-crypto-dark border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Grid className="w-5 h-5 text-indigo-400" />
                <span className="font-semibold">{l.name}</span>
              </div>
              <p className="text-sm text-gray-400">{l.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Widget Settings */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                        flex items-center justify-center">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Widget Settings</h2>
            <p className="text-sm text-gray-400">Customize dashboard widgets</p>
          </div>
        </div>

        <div className="space-y-4">
          {['Overview Stats', 'Recent Activity', 'Charts & Graphs'].map((widget) => (
            <div
              key={widget}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800"
            >
              <div>
                <div className="font-semibold">{widget}</div>
                <div className="text-sm text-gray-400">Toggle widget visibility</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                              peer-checked:bg-indigo-600"></div>
              </label>
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