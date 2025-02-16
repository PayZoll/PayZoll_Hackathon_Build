import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Jan', Engineering: 45000, Marketing: 28000, Sales: 35000 },
  { name: 'Feb', Engineering: 48000, Marketing: 29000, Sales: 37000 },
  { name: 'Mar', Engineering: 47000, Marketing: 30000, Sales: 38000 },
  { name: 'Apr', Engineering: 49000, Marketing: 31000, Sales: 40000 },
  { name: 'May', Engineering: 51000, Marketing: 32000, Sales: 41000 },
  { name: 'Jun', Engineering: 52000, Marketing: 33000, Sales: 42000 }
];

const timeframes = ['Weekly', 'Monthly', 'Quarterly'];
const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-4 rounded-lg border border-gray-800">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }} className="text-sm">
            {`${p.name}: $${p.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GraphSection() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 h-[500px] overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">Salary Distribution</h2>
          <p className="text-gray-400 text-sm mt-1">Overview by department</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-crypto-dark text-white border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 hover:border-indigo-500/50 transition-all cursor-pointer"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Timeframe Toggle */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex bg-crypto-dark rounded-lg p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedTimeframe === timeframe
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-crypto-dark/70'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[350px] transition-all hover:opacity-95">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                opacity: 0.8
              }}
            />
            <Line
              type="monotone"
              dataKey="Engineering"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8, className: "animate-pulse" }}
            />
            <Line
              type="monotone"
              dataKey="Marketing"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8, className: "animate-pulse" }}
            />
            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8, className: "animate-pulse" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}