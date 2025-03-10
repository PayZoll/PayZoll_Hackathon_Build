import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PiggyBank,
  TrendingUp,
  History,
  Wallet,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  Search,
  X,
} from "lucide-react";

export default function RenderModal({ activeModal, setActiveModal }) {
  const SchedulePaymentModal = ({ onClose }) => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Payment Date
            </label>
            <input
              type="date"
              className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                           focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Payment Type
            </label>
            <select
              className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                           focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="all">All Employees</option>
              <option value="department">By Department</option>
              <option value="selected">Selected Employees</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Recurring Payment
          </label>
          <select
            className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                         focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="none">One-time Payment</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-800 text-gray-400
                         hover:text-white hover:border-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                         text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
          >
            Schedule Payment
          </button>
        </div>
      </div>
    );
  };

  const modalContent = {
    Lending: <SchedulePaymentModal onClose={() => setActiveModal(null)} />,
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-crypto-card w-full max-w-xl mx-4 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{activeModal}</h2>
            <button
              onClick={() => setActiveModal(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">{modalContent[activeModal]}</div>
      </div>
    </div>
  );
}
