import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import ESOPHeader from "../components/esop/ESOPHeader";
import ESOPOverview from "../components/esop/ESOPOverview";
import TokenManagement from "../components/esop/TokenManagement";
import TokenPrediction from "../components/esop/TokenPrediction";
import EmployeeSimulation from "../components/esop/EmployeeSimulation";
import ESOPAnalytics from "../components/esop/ESOPAnalytics";
import IssueTokenModal from "../components/esop/IssueTokenModal";
import axios from "axios";
import { backendDomain } from "../constant/domain";
import { useWeb3 } from "../context/useWeb3";

export default function ESOPPage() {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [tokensInfo, setTokensInfo] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const { provider, signer, account } = useWeb3();

  const issueTokenToEmployee = async (data) => {
    const token = localStorage.getItem("token");
    const tokenData = {
      allocated: data.tokens,
      vestingEnd: data.vestingEnd,
    };
    await axios.post(
      `${backendDomain}/token/issue-token/${data.employee}`,
      tokenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
  };

  const fetchTokenInfo = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${backendDomain}/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTokensInfo(response.data.data);
    setCompanyInfo(response.data.company);
  };

  useEffect(() => {
    fetchTokenInfo();
  }, [provider, signer]);

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
                i === 0
                  ? "rgba(99,102,241,0.1)"
                  : i === 1
                  ? "rgba(139,92,246,0.1)"
                  : "rgba(168,85,247,0.1)"
              } 0%, transparent 70%)`,
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar
        isWalletConnected={account !== undefined}
        onConnectWallet={() => setIsWalletConnected(true)}
        account={account}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header Section */}
          <ESOPHeader
            onIssueTokens={() => setShowIssueModal(true)}
            tokensInfo={tokensInfo}
          />

          {/* Overview Section */}
          <ESOPOverview companyInfo={companyInfo} tokensInfo={tokensInfo}/>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Token Management */}
            <div className="col-span-12 lg:col-span-12">
              <TokenManagement
                tokensInfo={tokensInfo}
                companyInfo={companyInfo}
              />
            </div>

            {/* Token Prediction */}
            <div className="col-span-12">
              <TokenPrediction />
            </div>

            {/* Employee Simulation */}
            <div className="col-span-12 lg:col-span-6">
              <EmployeeSimulation />
            </div>

            {/* Analytics */}
            <div className="col-span-12 lg:col-span-6">
              <ESOPAnalytics />
            </div>
          </div>
        </div>
      </main>

      {/* Issue Token Modal */}
      <IssueTokenModal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        issueTokenToEmployee={issueTokenToEmployee}
        companyInfo={companyInfo}
      />
    </div>
  );
}
