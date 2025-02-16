import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

const predictionData = [
  { month: 'Jan', actual: 3.2, predicted: 3.2, lower: 3.2, upper: 3.2 },
  { month: 'Feb', actual: 3.4, predicted: 3.5, lower: 3.3, upper: 3.7 },
  { month: 'Mar', actual: 3.6, predicted: 3.8, lower: 3.5, upper: 4.1 },
  { month: 'Apr', actual: null, predicted: 4.2, lower: 3.8, upper: 4.6 },
  { month: 'May', actual: null, predicted: 4.5, lower: 4.0, upper: 5.0 },
  { month: 'Jun', actual: null, predicted: 4.8, lower: 4.2, upper: 5.4 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-4 rounded-lg border border-gray-800">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((p, index) => (
          <p key={index} className="text-sm" style={{ color: p.color }}>
            {p.name}: ${p.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TokenPrediction() {
  const [timeframe, setTimeframe] = useState('6m');

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Token Price Prediction</h2>
          <p className="text-sm text-gray-400">ML-powered price forecasting</p>
        </div>

        <div className="flex items-center space-x-2">
          {['1m', '3m', '6m', '1y'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                timeframe === t
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-crypto-dark/70'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-crypto-dark rounded-xl p-6 border border-gray-800">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData}>
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Confidence Interval */}
              <Area
                dataKey="upper"
                stroke="none"
                fill="#6366f1"
                fillOpacity={0.1}
              />
              <Area
                dataKey="lower"
                stroke="none"
                fill="#6366f1"
                fillOpacity={0.1}
              />
              
              {/* Actual and Predicted Lines */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#6366f1"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">Actual Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-sm text-gray-400">Predicted Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/20" />
            <span className="text-sm text-gray-400">Confidence Interval</span>
          </div>
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold">Positive Factors</h3>
          </div>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Strong company performance</li>
            <li>• High employee retention rate</li>
            <li>• Market sector growth</li>
          </ul>
        </div>

        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-red-400 transform rotate-180" />
            <h3 className="font-semibold">Risk Factors</h3>
          </div>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Market volatility</li>
            <li>• Regulatory changes</li>
            <li>• Competition pressure</li>
          </ul>
        </div>

        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold">Key Metrics</h3>
          </div>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Confidence Level: 85%</li>
            <li>• Volatility Index: Medium</li>
            <li>• Trend Strength: High</li>
          </ul>
        </div>
      </div>
    </div>
  );
}