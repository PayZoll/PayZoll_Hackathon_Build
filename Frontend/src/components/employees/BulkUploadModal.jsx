import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

export default function BulkUploadModal({ isOpen, onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

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
          onClick={e => e.stopPropagation()}
          className="bg-crypto-card w-full max-w-xl mx-4 rounded-2xl border border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Bulk Upload Employees</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Download Template Section */}
            <div className="bg-crypto-dark/50 rounded-xl p-4 border border-gray-800">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
                              flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Download Template</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Use our template to ensure your data is formatted correctly
                  </p>
                  <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
                    Download Template →
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center
                         transition-colors ${
                           dragActive
                             ? 'border-indigo-500 bg-indigo-500/10'
                             : 'border-gray-800 hover:border-gray-700'
                         }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 mx-auto flex items-center justify-center">
                  <Upload className="w-8 h-8 text-indigo-400" />
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">
                    {selectedFile ? selectedFile.name : 'Drop your file here'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    Support for CSV and Excel files
                  </p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-200">
                  <p className="font-semibold mb-1">Important Guidelines:</p>
                  <ul className="list-disc pl-4 space-y-1 text-orange-200/80">
                    <li>Ensure all required fields are filled</li>
                    <li>Wallet addresses must be valid</li>
                    <li>Maximum 100 employees per upload</li>
                    <li>File size should not exceed 5MB</li>
                  </ul>
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
              >
                Upload & Process
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}