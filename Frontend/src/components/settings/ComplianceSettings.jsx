import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, FileText, Download, AlertTriangle,
  Shield, CheckCircle, XCircle, ExternalLink
} from 'lucide-react';

export default function ComplianceSettings() {
  const [region, setRegion] = useState('us');
  const [complianceMode, setComplianceMode] = useState('standard');

  const complianceStatus = [
    {
      title: 'GDPR Compliance',
      status: 'compliant',
      lastCheck: '2 hours ago',
      description: 'Data protection and privacy requirements'
    },
    {
      title: 'KYC/AML',
      status: 'attention',
      lastCheck: '1 day ago',
      description: 'Identity verification and anti-money laundering'
    },
    {
      title: 'Tax Reporting',
      status: 'compliant',
      lastCheck: '5 hours ago',
      description: 'Automated tax calculations and reporting'
    }
  ];

  const documents = [
    {
      name: 'Privacy Policy',
      type: 'PDF',
      size: '2.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Terms of Service',
      type: 'PDF',
      size: '1.8 MB',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Data Processing Agreement',
      type: 'PDF',
      size: '3.2 MB',
      lastUpdated: '2024-01-10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                        flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Compliance Status</h2>
            <p className="text-sm text-gray-400">Monitor regulatory compliance</p>
          </div>
        </div>

        <div className="space-y-4">
          {complianceStatus.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-crypto-dark rounded-xl p-4 border border-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : item.status === 'attention' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${
                    item.status === 'compliant' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    Last checked: {item.lastCheck}
                  </div>
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Regional Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Primary Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                       focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="us">United States</option>
              <option value="eu">European Union</option>
              <option value="uk">United Kingdom</option>
              <option value="asia">Asia Pacific</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Compliance Mode</label>
            <select
              value={complianceMode}
              onChange={(e) => setComplianceMode(e.target.value)}
              className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4
                       focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="standard">Standard</option>
              <option value="strict">Strict</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-200 font-semibold">Important Notice:</p>
              <p className="text-yellow-200/80 mt-1">
                Changing your primary region may affect how data is processed and stored.
                Please review the compliance requirements for your selected region.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Documents */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                          flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Legal Documents</h2>
              <p className="text-sm text-gray-400">Manage compliance documentation</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg 
                         text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            <span>Download All</span>
          </button>
        </div>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-xl border border-gray-800"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="font-semibold">{doc.name}</div>
                  <div className="text-sm text-gray-400">
                    {doc.type} • {doc.size} • Last updated: {doc.lastUpdated}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Reports */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Compliance Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 
                         hover:border-indigo-500/50 rounded-xl p-4 transition-all text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold group-hover:text-white transition-colors">
                  Generate Audit Report
                </div>
                <div className="text-sm text-gray-400">
                  Create a detailed compliance report
                </div>
              </div>
              <Shield className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </button>

          <button className="group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 
                         hover:border-indigo-500/50 rounded-xl p-4 transition-all text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold group-hover:text-white transition-colors">
                  Export Transaction Logs
                </div>
                <div className="text-sm text-gray-400">
                  Download detailed transaction history
                </div>
              </div>
              <Download className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                   text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}