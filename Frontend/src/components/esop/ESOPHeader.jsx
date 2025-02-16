import React from "react";
import { motion } from "framer-motion";
import { Coins, Search, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function ESOPHeader({ onIssueTokens }) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
        <Link
          to="/dashboard"
          className="hover:text-white transition-colors flex items-center"
        >
          <Home className="w-4 h-4 mr-1" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-white">ESOPs/RSU</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ESOPs & RSU Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and track employee stock options and RSUs
          </p>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search tokens or employees..."
              className="w-full sm:w-64 bg-crypto-card border border-gray-800 rounded-xl py-2 pl-10 pr-4
                       focus:outline-none focus:border-indigo-500 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Issue Tokens Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onIssueTokens}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl
                     hover:shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center space-x-2"
          >
            <Coins className="w-5 h-5" />
            <span>Issue Tokens</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
