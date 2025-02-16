import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, AlertTriangle, Lock,
  CheckCircle, XCircle
} from 'lucide-react';

export default function AccountDeletion() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deactivateOnly, setDeactivateOnly] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmText === 'DELETE ACCOUNT') {
      // Handle account deletion
      console.log('Account deletion confirmed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Section */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 
                        flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-400">Delete Account</h2>
            <p className="text-sm text-red-200/80">This action cannot be undone</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
          <div className="text-sm text-red-200/80">
            <p className="font-semibold mb-2">Warning: Account Deletion</p>
            <ul className="list-disc pl-4 space-y-2">
              <li>All data will be permanently deleted</li>
              <li>Active employee contracts will be terminated</li>
              <li>Wallet connections will be removed</li>
              <li>Payment history will be erased</li>
              <li>This action is irreversible</li>
            </ul>
          </div>
        </div>

        {/* Deactivate Option */}
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="font-semibold">Temporarily Deactivate Instead?</div>
                <div className="text-sm text-gray-400">
                  Your account will be disabled but data will be preserved
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={deactivateOnly}
                onChange={(e) => setDeactivateOnly(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                            peer-checked:bg-yellow-600"></div>
            </label>
          </div>
        </div>

        {!deactivateOnly && (
          <>
            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="block text-sm text-red-200/80 mb-2">
                Type "DELETE ACCOUNT" to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                         focus:outline-none focus:border-red-500 transition-colors text-white"
                placeholder="DELETE ACCOUNT"
              />
            </div>

            {/* Delete Button */}
            <button
              onClick={() => setShowConfirmation(true)}
              disabled={confirmText !== 'DELETE ACCOUNT'}
              className={`w-full py-3 rounded-xl flex items-center justify-center space-x-2
                       transition-all ${
                         confirmText === 'DELETE ACCOUNT'
                           ? 'bg-red-500 hover:bg-red-600 text-white'
                           : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                       }`}
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account Permanently</span>
            </button>
          </>
        )}

        {deactivateOnly && (
          <button
            className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 
                     text-white transition-all flex items-center justify-center space-x-2"
          >
            <Lock className="w-5 h-5" />
            <span>Deactivate Account</span>
          </button>
        )}
      </div>

      {/* Final Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-crypto-card w-full max-w-md mx-4 rounded-2xl border border-red-500/20 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-red-400">Final Confirmation</h3>
            </div>

            <p className="text-gray-400 mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone.
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-6 py-2 rounded-xl border border-gray-800 text-gray-400
                         hover:text-white hover:border-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 
                         text-white transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}