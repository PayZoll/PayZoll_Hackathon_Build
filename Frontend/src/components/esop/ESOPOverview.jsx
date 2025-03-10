import React from "react";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Clock, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTokenPrice } from "../../utils/tokenUtlis";

const tokenPriceData = [
  { date: "Mon", price: 2.5 },
  { date: "Tue", price: 2.7 },
  { date: "Wed", price: 2.8 },
  { date: "Thu", price: 2.6 },
  { date: "Fri", price: 2.9 },
  { date: "Sat", price: 3.1 },
  { date: "Sun", price: 3.2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-3 rounded-lg border border-gray-800">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-indigo-400">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function ESOPOverview({ companyInfo, tokensInfo }) {
  const totalAllocated = tokensInfo.reduce((sum, item) => sum + item.allocated, 0);

  const stats = [
    {
      title: "Total Tokens Issued",
      value: `${companyInfo.tokenCount} ${companyInfo.tokenSymbol}`,
      change: "+12%",
      icon: Coins,
      color: "from-indigo-600 to-purple-600",
    },
    {
      title: "Total Value (ETH)",
      value: getTokenPrice() * companyInfo.tokenCount + " ETH",
      change: "+15%",
      icon: DollarSign,
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Unclaimed Tokens",
      value: `${companyInfo.tokenCount - totalAllocated}`,
      change: "-5%",
      isNegative: true,
      icon: Clock,
      color: "from-orange-600 to-red-600",
    },
    {
      title: "Token Price",
      value: `$${getTokenPrice()}`,
      change: "+8%",
      icon: TrendingUp,
      color: "from-blue-600 to-indigo-600",
      chart: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
              <div className="text-3xl font-bold mt-1 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {stat.value}
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform transition-transform group-hover:scale-110`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {stat.chart ? (
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tokenPriceData}>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div
              className={`text-sm ${
                stat.isNegative ? "text-red-400" : "text-green-400"
              }`}
            >
              {stat.change} from last month
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
