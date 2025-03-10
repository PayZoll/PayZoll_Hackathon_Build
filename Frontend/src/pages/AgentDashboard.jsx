import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
// import { backendDomain } from "../constant/domain";
import { CHAINS_BY_ID } from "../lib/constants";
import { useWeb3 } from "../context/useWeb3";
import { Bot, Send, Wallet, Users, CircleDollarSign, ExternalLink, Loader2 } from "lucide-react";


export default function AgentDashboard() {

  const backendDomain = "http://127.0.0.1:5000";

  const { provider, signer, account, network } = useWeb3();
  const [activeTab, setActiveTab] = useState("chat");

  // Chat states
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  // Twitter states
  const [tweet, setTweet] = useState("");
  const [tweetResponse, setTweetResponse] = useState("");

  // Reddit states
  const [subreddit, setSubreddit] = useState("");
  const [redditTitle, setRedditTitle] = useState("");
  const [redditBody, setRedditBody] = useState("");
  const [redditResponse, setRedditResponse] = useState("");

  // Company details & analytics states
  const [companyFilename, setCompanyFilename] = useState("company_employees.csv");
  const [companyDetails, setCompanyDetails] = useState(null);
  const [analyticsFilename, setAnalyticsFilename] = useState("company_employees.csv");
  const [analyticsData, setAnalyticsData] = useState(null);

  // Bulk Transfer states
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [paying, setPaying] = useState(false);
  const [transferResponse, setTransferResponse] = useState("");

  // Transaction Insights states
  const [insightsLogFilename, setInsightsLogFilename] = useState("bulk_transfer_log.csv");
  const [insightsPrompt, setInsightsPrompt] = useState("Generate insights based on the transaction data.");
  const [insightsResponse, setInsightsResponse] = useState("");

  // For displaying transaction links
  const [transactionReceipts, setTransactionReceipts] = useState([]);

  // Base URL for your Flask backend
  // e.g., "http://127.0.0.1:5000"

  // On mount, fetch employee data for payroll operations
  useEffect(() => {
    // Delay to simulate loading
    setTimeout(() => {
      fetchCompanyDetails();
    }, 2000);
  }, []);

  // Fetch employee details from CSV
  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`${backendDomain}/company_details?filename=${companyFilename}`);
      if (response.data.status === "success") {
        const data = response.data.data;
        setEmployees(data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Chat handler: calls /chat endpoint
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendDomain}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();
      setChatResponse(data.response);
    } catch (error) {
      console.error("Error in chat:", error);
      setChatResponse("Error processing chat message.");
    }
  };

  // Twitter handler: calls /post_on_twitter endpoint
  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendDomain}/post_on_twitter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: tweet }),
      });
      const data = await res.json();
      setTweetResponse(data.message);
    } catch (error) {
      console.error("Error posting tweet:", error);
      setTweetResponse("Error posting tweet.");
    }
  };

  // Reddit handler: calls /post_on_reddit endpoint
  const handleRedditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendDomain}/post_on_reddit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subreddit, title: redditTitle, body: redditBody }),
      });
      const data = await res.json();
      setRedditResponse(data.message);
    } catch (error) {
      console.error("Error posting on Reddit:", error);
      setRedditResponse("Error posting on Reddit.");
    }
  };

  // Employee Analytics handler: calls /employee_analytics endpoint
  const handleEmployeeAnalytics = async () => {
    try {
      const response = await axios.get(`${backendDomain}/employee_analytics?filename=${analyticsFilename}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Error fetching employee analytics:", error);
      setAnalyticsData({ status: "error", message: "Error fetching analytics." });
    }
  };

  // Bulk Transfer handler: calls /silent_bulk_transfer endpoint
  const handleBulkTransfer = async (e) => {
    e.preventDefault();
    if (!employees.length) {
      alert("No employee data available for payroll processing.");
      return;
    }
    setPaying(true);
    try {
      // Use chainId from network to get RPC details
      const rpcUrl = CHAINS_BY_ID[network.chainId]?.rpcUrl;
      const res = await fetch(`${backendDomain}/silent_bulk_transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rpc_url: rpcUrl,
          employees_json: JSON.stringify(employees),
          log_filename: "bulk_transfer_log.csv",
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setTransactionReceipts(data.receipts);
        setTransferResponse(data.message);
      } else {
        setTransferResponse(data.message);
      }
    } catch (error) {
      console.error("Error in bulk transfer:", error);
      setTransferResponse("Error processing bulk transfer.");
    } finally {
      setPaying(false);
    }
  };

  // Transaction Insights handler: calls /transaction_insights endpoint
  const handleTransactionInsights = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${backendDomain}/transaction_insights?log_filename=${insightsLogFilename}&prompt=${encodeURIComponent(insightsPrompt)}`
      );
      const data = await res.json();
      setInsightsResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching transaction insights:", error);
      setInsightsResponse("Error generating insights.");
    }
  };

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E293B]/80 backdrop-blur-lg rounded-xl p-8 max-w-md w-full shadow-xl border border-[#334155]/50"
        >
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
            <p className="text-gray-300 font-medium">Connecting to provider...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1E293B]/80 border-b border-[#334155]/70 p-4 sticky top-0 z-50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
            <Bot className="w-8 h-8 text-indigo-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI Payroll Assistant
            </h1>
          </motion.div>
          <motion.div className="flex items-center space-x-4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="px-4 py-2 bg-[#334155]/70 border border-[#475569]/50 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all">
              <Wallet className="w-4 h-4 text-indigo-400" />
              <span className="text-gray-300 text-sm font-medium">
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 flex gap-4">
        {/* Left Side: Chat and Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 bg-[#1E293B]/80 backdrop-blur-sm border border-[#334155]/50 rounded-xl p-4 flex flex-col shadow-xl"
        >
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
            <AnimatePresence>
              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Chat with AI</h2>
                  <form onSubmit={handleChatSubmit}>
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Enter your message..."
                      rows={4}
                      className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Send
                    </button>
                  </form>
                  {chatResponse && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <strong className="text-gray-300">Response:</strong>
                      <p className="text-gray-100">{chatResponse}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "tweet" && (
                <motion.div
                  key="tweet"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Post on Twitter</h2>
                  <form onSubmit={handleTweetSubmit}>
                    <textarea
                      value={tweet}
                      onChange={(e) => setTweet(e.target.value)}
                      placeholder="Enter tweet content..."
                      rows={4}
                      className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Post Tweet
                    </button>
                  </form>
                  {tweetResponse && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <strong className="text-gray-300">Response:</strong>
                      <p className="text-gray-100">{tweetResponse}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "reddit" && (
                <motion.div
                  key="reddit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Post on Reddit</h2>
                  <form onSubmit={handleRedditSubmit}>
                    <input
                      type="text"
                      value={subreddit}
                      onChange={(e) => setSubreddit(e.target.value)}
                      placeholder="Subreddit Name"
                      className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white"
                    />
                    <input
                      type="text"
                      value={redditTitle}
                      onChange={(e) => setRedditTitle(e.target.value)}
                      placeholder="Post Title"
                      className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white"
                    />
                    <textarea
                      value={redditBody}
                      onChange={(e) => setRedditBody(e.target.value)}
                      placeholder="Post Body"
                      rows={4}
                      className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Post to Reddit
                    </button>
                  </form>
                  {redditResponse && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <strong className="text-gray-300">Response:</strong>
                      <p className="text-gray-100">{redditResponse}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "companyDetails" && (
                <motion.div
                  key="companyDetails"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Company Details</h2>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={companyFilename}
                      onChange={(e) => setCompanyFilename(e.target.value)}
                      placeholder="CSV Filename (e.g., company_employees.csv)"
                      className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                    <button onClick={fetchCompanyDetails} className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Fetch Details
                    </button>
                  </div>
                  {companyDetails && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <pre className="text-gray-100">{JSON.stringify(companyDetails, null, 2)}</pre>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Employee Analytics</h2>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={analyticsFilename}
                      onChange={(e) => setAnalyticsFilename(e.target.value)}
                      placeholder="CSV Filename (e.g., company_employees.csv)"
                      className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                    <button onClick={handleEmployeeAnalytics} className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Get Analytics
                    </button>
                  </div>
                  {analyticsData && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <pre className="text-gray-100">{JSON.stringify(analyticsData, null, 2)}</pre>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "bulkTransfer" && (
                <motion.div
                  key="bulkTransfer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Silent Bulk Transfer</h2>
                  <form onSubmit={handleBulkTransfer}>
                    <input
                      type="text"
                      value={CHAINS_BY_ID[network.chainId]?.rpcUrl || ""}
                      readOnly
                      className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white"
                      placeholder="RPC URL"
                    />
                    <textarea
                      value={JSON.stringify(employees, null, 2)}
                      readOnly
                      rows={6}
                      className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white"
                      placeholder='Employees JSON'
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Process Payroll
                    </button>
                  </form>
                  {paying && (
                    <div className="mt-2">
                      <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                      <span className="text-gray-300 ml-2">Processing payroll...</span>
                    </div>
                  )}
                  {transferResponse && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <pre className="text-gray-100">{transferResponse}</pre>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "insights" && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">Transaction Insights</h2>
                  <form onSubmit={handleTransactionInsights}>
                    <input
                      type="text"
                      value={insightsLogFilename}
                      onChange={(e) => setInsightsLogFilename(e.target.value)}
                      placeholder="Log Filename (default: bulk_transfer_log.csv)"
                      className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white"
                    />
                    <textarea
                      value={insightsPrompt}
                      onChange={(e) => setInsightsPrompt(e.target.value)}
                      placeholder="Enter prompt for insights..."
                      rows={4}
                      className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white"
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Get Insights
                    </button>
                  </form>
                  {insightsResponse && (
                    <div className="mt-4 bg-gray-700 p-3 rounded">
                      <pre className="text-gray-100">{insightsResponse}</pre>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Employee List */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-96 bg-[#1E293B]/80 backdrop-blur-sm border border-[#334155]/50 rounded-xl p-4 shadow-xl"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Employees
            </h2>
          </div>
          {loadingEmployees ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {employees.map((employee, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#334155]/70 border border-[#475569]/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="text-white font-medium text-lg">{employee.name}</div>
                    <div className="text-sm text-gray-400 truncate mt-1">{employee.accountId}</div>
                    <div className="text-indigo-400 font-medium mt-2 text-lg">{employee.salary} ETH</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Transaction Links (if any) */}
      <AnimatePresence>
        {transactionReceipts.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 right-4 bg-[#1E293B]/90 backdrop-blur-md border border-[#334155]/60 rounded-xl p-6 shadow-2xl max-w-md"
          >
            <h3 className="text-emerald-400 font-medium mb-4 flex items-center text-lg">
              <CircleDollarSign className="w-5 h-5 mr-2" />
              Transactions Complete
            </h3>
            <div className="space-y-3">
              {transactionReceipts.map((receipt, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  href={`${CHAINS_BY_ID[network.chainId]?.explorerUrl}/tx/${receipt.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Transaction {index + 1}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.4);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.6);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
      `}</style>
    </div>
  );
}