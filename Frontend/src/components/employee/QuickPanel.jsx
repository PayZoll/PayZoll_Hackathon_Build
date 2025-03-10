import React from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  ArrowLeftRight,
  PiggyBank,
  Landmark,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickPanel({ isWalletConnected }) {
  const navigate = useNavigate();
  const actions = [
    {
      icon: DollarSign,
      label: "Buy/Sell Crypto",
      description: "Instant Crypto to Fiat / vice versa",
      color: "from-green-600 to-emerald-600",
      action: () => console.log("Buy/Sell"),
    },
    {
      icon: ArrowLeftRight,
      label: "Swap Crypto",
      description: "Exchange between tokens",
      color: "from-blue-600 to-indigo-600",
      action: () => console.log("Swap Crypto"),
    },
    {
      icon: PiggyBank,
      label: "Lending",
      description: "Earn interest on deposits",
      color: "from-purple-600 to-indigo-600",
      action: () => navigate("/lending"),
    },
    {
      icon: Landmark,
      label: "Borrowing",
      description: "Get a crypto-backed loan",
      color: "from-pink-600 to-purple-600",
      action: () => navigate("/lending"),
    },
    {
      icon: Award,
      label: "Claim ESOP",
      description: "Claim vested tokens",
      color: "from-indigo-600 to-purple-600",
      action: () => console.log("Claim Esop"),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={action.action}
          className={`group relative p-4 bg-crypto-card rounded-xl border border-gray-800 
                     hover:border-indigo-500/50 transition-all duration-300 ${
                       !isWalletConnected ? "opacity-50 cursor-not-allowed" : ""
                     }`}
          disabled={!isWalletConnected}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"
            style={{
              backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
            }}
          ></div>

          <div className="flex flex-col items-center space-y-2">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} 
                           flex items-center justify-center transform group-hover:scale-110 transition-transform`}
            >
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <div className="font-semibold group-hover:text-white transition-colors">
                {action.label}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {action.description}
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
