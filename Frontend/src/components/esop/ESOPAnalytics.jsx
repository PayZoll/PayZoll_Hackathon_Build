import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, PieChart as PieChartIcon, BarChart2 } from 'lucide-react';

const participationData = [
  { department: 'Engineering', employees: 45, participation: 85 },
  { department: 'Marketing', employees: 25, participation: 75 },
  { department: 'Sales', employees: 35, participation: 90 },
  { department: 'HR', employees: 15, participation: 70 },
  { department: 'Finance', employees: 20, participation: 80 }
];

const distributionData = [
  { name: 'Vested', value: 600000, color: '#6366f1' },
  { name: 'Unvested', value: 300000, color: '#8b5cf6' },
  { name: 'Reserved', value: 100000, color: '#a855f7' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-3 rounded-lg border border-gray-800">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((p, index) => (
          <p key={index} className="text-sm" style={{ color: p.color }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ESOPAnalytics() {
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <h2 className="text-xl font-bold mb-6">Analytics & Insights</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Participation */}
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Employee Participation</h3>
              <p className="text-sm text-gray-400">By department</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis 
                  dataKey="department" 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="participation" 
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Token Distribution */}
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                          flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Token Distribution</h3>
              <p className="text-sm text-gray-400">Current allocation</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center space-x-6 mt-4">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Average Vesting Period</div>
          <div className="text-xl font-bold mt-1">4 Years</div>
          <div className="text-sm text-green-400">Standard Schedule</div>
        </div>

        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Employee Retention Rate</div>
          <div className="text-xl font-bold mt-1">92%</div>
          <div className="text-sm text-green-400">+5% from last year</div>
        </div>

        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Token Value Growth</div>
          <div className="text-xl font-bold mt-1">156%</div>
          <div className="text-sm text-green-400">Since inception</div>
        </div>
      </div>
    </div>
  );
}