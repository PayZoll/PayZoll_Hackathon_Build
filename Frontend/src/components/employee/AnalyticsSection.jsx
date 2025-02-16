import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart2 } from 'lucide-react';

const salaryData = [
  { month: 'Jan', salary: 12500, bonus: 0 },
  { month: 'Feb', salary: 12500, bonus: 2500 },
  { month: 'Mar', salary: 12500, bonus: 0 },
  { month: 'Apr', salary: 12500, bonus: 1500 },
  { month: 'May', salary: 12500, bonus: 0 },
  { month: 'Jun', salary: 12500, bonus: 3000 }
];

const performanceData = [
  { metric: 'Productivity', value: 85 },
  { metric: 'Quality', value: 92 },
  { metric: 'Teamwork', value: 88 },
  { metric: 'Innovation', value: 78 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-3 rounded-lg border border-gray-800">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }} className="text-sm">
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsSection() {
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <h2 className="text-xl font-bold mb-6">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Trends */}
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Salary Trends</h3>
              <p className="text-sm text-gray-400">6-month history</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="salary" name="Base Salary" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bonus" name="Bonus" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                          flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Performance Metrics</h3>
              <p className="text-sm text-gray-400">Current quarter</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
                <YAxis dataKey="metric" type="category" stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell 
                      key={index}
                      fill={entry.value >= 90 ? '#10b981' : 
                            entry.value >= 80 ? '#6366f1' : 
                            '#f59e0b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Average Monthly Earnings</div>
          <div className="text-xl font-bold mt-1">$13,500</div>
          <div className="text-sm text-green-400">+8% from last quarter</div>
        </div>

        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Performance Rating</div>
          <div className="text-xl font-bold mt-1">4.5/5.0</div>
          <div className="text-sm text-green-400">Top 10% in team</div>
        </div>

        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Token Growth Rate</div>
          <div className="text-xl font-bold mt-1">156%</div>
          <div className="text-sm text-green-400">Since grant date</div>
        </div>

        <div className="bg-crypto-dark rounded-lg p-4 border border-gray-800">
          <div className="text-sm text-gray-400">Next Review</div>
          <div className="text-xl font-bold mt-1">Mar 15</div>
          <div className="text-sm text-gray-400">45 days remaining</div>
        </div>
      </div>
    </div>
  );
}