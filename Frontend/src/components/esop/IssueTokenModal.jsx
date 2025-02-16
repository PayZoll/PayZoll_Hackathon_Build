import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Calendar,
  Coins,
  AlertCircle,
  Calculator,
} from "lucide-react";

export default function IssueTokenModal({
  isOpen,
  onClose,
  issueTokenToEmployee,
  companyInfo,
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employee: "",
    tokens: "",
    vestingStart: "",
    vestingEnd: "",
    cliffPeriod: "12",
    vestingFrequency: "monthly",
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-crypto-card w-full max-w-xl mx-4 rounded-2xl border border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Issue ESOP Tokens</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Employee Selection */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm text-gray-400">
                Select Employee
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                           focus:outline-none focus:border-indigo-500 transition-colors"
                  value={formData.employee}
                  onChange={(e) =>
                    setFormData({ ...formData, employee: e.target.value })
                  }
                >
                  <option value="">Select an employee</option>
                  {companyInfo.employees.map((employee) => (
                    <option value={employee._id} key={employee._id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Token Amount */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm text-gray-400">
                Number of Tokens
              </label>
              <div className="relative">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                           focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Enter token amount"
                  value={formData.tokens}
                  onChange={(e) =>
                    setFormData({ ...formData, tokens: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Vesting Schedule */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Vesting Schedule</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                               focus:outline-none focus:border-indigo-500 transition-colors"
                      // value={formData.vestingStart}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vestingStart: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4
                               focus:outline-none focus:border-indigo-500 transition-colors"
                      value={formData.vestingEnd}
                      onChange={(e) =>
                        setFormData({ ...formData, vestingEnd: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Cliff Period (months)
                  </label>
                  <select
                    className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                             focus:outline-none focus:border-indigo-500 transition-colors"
                    value={formData.cliffPeriod}
                    onChange={(e) =>
                      setFormData({ ...formData, cliffPeriod: e.target.value })
                    }
                  >
                    <option value="12">12 months</option>
                    <option value="6">6 months</option>
                    <option value="3">3 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Vesting Frequency
                  </label>
                  <select
                    className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                             focus:outline-none focus:border-indigo-500 transition-colors"
                    value={formData.vestingFrequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vestingFrequency: e.target.value,
                      })
                    }
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calculator className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold">Token Distribution Preview</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-gray-400">Initial Release</div>
                  <div className="font-semibold">0 ESOP</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-400">Monthly Release</div>
                  <div className="font-semibold">208 ESOP</div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-yellow-200 font-semibold">
                    Important Notice:
                  </p>
                  <p className="text-yellow-200/80 mt-1">
                    This action will create a new token grant contract. Please
                    ensure all details are correct as this action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center justify-end space-x-4">
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
                onClick={() => issueTokenToEmployee(formData)}
              >
                Issue Tokens
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
