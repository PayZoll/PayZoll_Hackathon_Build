import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsNav from '../components/settings/SettingsNav';
import GeneralSettings from '../components/settings/GeneralSettings';
import AccountSettings from '../components/settings/AccountSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import WalletSettings from '../components/settings/WalletSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import APISettings from '../components/settings/APISettings';
import AuditLogs from '../components/settings/AuditLogs';
import CustomizationSettings from '../components/settings/CustomizationSettings';
import ComplianceSettings from '../components/settings/ComplianceSettings';
import AccountDeletion from '../components/settings/AccountDeletion';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const renderSettingsSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'account':
        return <AccountSettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'wallet':
        return <WalletSettings isWalletConnected={isWalletConnected} />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'api':
        return <APISettings />;
      case 'audit':
        return <AuditLogs />;
      case 'customization':
        return <CustomizationSettings />;
      case 'compliance':
        return <ComplianceSettings />;
      case 'delete':
        return <AccountDeletion />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `radial-gradient(circle, ${
                i === 0 ? 'rgba(99,102,241,0.1)' :
                i === 1 ? 'rgba(139,92,246,0.1)' :
                'rgba(168,85,247,0.1)'
              } 0%, transparent 70%)`,
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar 
        isWalletConnected={isWalletConnected} 
        onConnectWallet={() => setIsWalletConnected(true)} 
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header */}
          <SettingsHeader />

          {/* Settings Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Settings Navigation */}
            <div className="col-span-12 lg:col-span-3">
              <SettingsNav 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            {/* Settings Content */}
            <div className="col-span-12 lg:col-span-9">
              {renderSettingsSection()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}