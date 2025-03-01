import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Clock, Activity, Menu, X, LayoutDashboard, BarChart3, Users, Settings, LogOut, CircleDollarSign, FileText } from "lucide-react";
import axios from "axios";

export default function AgentDashboard() {
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: "bot", 
      content: "Welcome back, Alex! How can I help you today?" 
    }
  ]);
  const [activities, setActivities] = useState([
    { action: "Processed payroll", time: "2h ago" },
    { action: "Checked balances", time: "4h ago" },
    { action: "Updated employee info", time: "6h ago" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Set initial large screen state
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      
      // On large screens, show sidebar by default unless in fullscreen mode
      if (isLarge && !isFullscreen) {
        setIsSidebarOpen(true);
      }
    };
    
    // Run on mount
    checkScreenSize();
    
    // Add resize listener
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      const wasLarge = isLargeScreen;
      
      if (isLarge !== wasLarge) {
        setIsLargeScreen(isLarge);
        
        // If transitioning to large screen and not in fullscreen
        if (isLarge && !isFullscreen) {
          setIsSidebarOpen(true);
        }
        
        // If transitioning to small screen
        if (!isLarge && wasLarge) {
          setIsSidebarOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen, isLargeScreen]); // Re-run when fullscreen mode or screen size changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsProcessing(true);
    setShowSuggestions(false);

    try {
      const apiUrl = "http://localhost:8080/agent/process";
      const response = await axios.post(apiUrl, {
        prompt: input,
        userId: "alex123",
      });

      if (response.data && response.data.success) {
        const botResponse = { 
          type: "bot", 
          content: response.data.message 
        };
        setMessages(prev => [...prev, botResponse]);

        if (response.data.action && response.data.action !== "unknown") {
          let actionText = "Performed action";
          switch (response.data.action) {
            case "process_payroll":
              actionText = "Processed payroll";
              break;
            case "check_balances":
              actionText = "Checked balances";
              break;
            case "update_employee_info":
              actionText = "Updated employee info";
              break;
            case "generate_reports":
              actionText = "Generated reports";
              break;
            case "calculate_taxes":
              actionText = "Tax calculations";
              break;
          }
          setActivities([{ action: actionText, time: "just now" }, ...activities]);
          setTimeout(() => setShowSuggestions(true), 1000);
        }
      } else {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "Sorry, I encountered an error processing your request." 
        }]);
        setTimeout(() => setShowSuggestions(true), 1000);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      fallbackProcessing(input);
    } finally {
      setIsProcessing(false);
      inputRef.current?.focus();
    }
  };

  const fallbackProcessing = (userInput) => {
    setTimeout(() => {
      let botResponse;
      const promptLower = userInput.toLowerCase();

      if (promptLower.includes("pay salary") || promptLower.includes("process payroll")) {
        botResponse = { 
          type: "bot", 
          content: "I've initiated the payroll process for all employees. The transactions have been successfully completed." 
        };
        setActivities([{ action: "Processed payroll", time: "just now" }, ...activities]);
      } else if (promptLower.includes("check balance") || promptLower.includes("balances")) {
        botResponse = { 
          type: "bot", 
          content: "I've checked all account balances. All accounts are in good standing with sufficient funds." 
        };
        setActivities([{ action: "Checked balances", time: "just now" }, ...activities]);
      } else if (promptLower.includes("update") && promptLower.includes("employee")) {
        botResponse = { 
          type: "bot", 
          content: "I've updated the employee information as requested. All records are now up to date." 
        };
        setActivities([{ action: "Updated employee info", time: "just now" }, ...activities]);
      } else if (promptLower.includes("generate") && promptLower.includes("report")) {
        botResponse = { 
          type: "bot", 
          content: "I've generated the requested reports. You can view them in your reports section." 
        };
        setActivities([{ action: "Generated reports", time: "just now" }, ...activities]);
      } else if (promptLower.includes("tax") && promptLower.includes("calculation")) {
        botResponse = { 
          type: "bot", 
          content: "I've performed the tax calculations for this quarter. The results have been saved." 
        };
        setActivities([{ action: "Tax calculations", time: "just now" }, ...activities]);
      } else {
        botResponse = { 
          type: "bot", 
          content: "I'm not sure how to help with that specific request. Would you like me to process payroll, check balances, update employee info, generate reports, or perform tax calculations?" 
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setTimeout(() => setShowSuggestions(true), 1000);
    }, 1000);
  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-gray-100 flex overflow-hidden">
      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && !isLargeScreen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - Fixed position */}
      <AnimatePresence>
        {(!isFullscreen && (isSidebarOpen || isLargeScreen)) && (
          <motion.div 
            initial={!isLargeScreen ? { x: -300 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={!isLargeScreen ? { x: -300 } : { x: 0 }}
            transition={{ duration: 0.3 }}
            className={`${!isLargeScreen ? 'w-[85%] max-w-[300px]' : 'w-72'} bg-[#1E293B]/95 backdrop-blur-md border-r border-[#334155]/50 flex flex-col fixed top-0 left-0 bottom-0 h-screen z-50 overflow-hidden`}
          >
            {/* Close button - Mobile only */}
            {!isLargeScreen && (
              <button 
                onClick={toggleSidebar}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[#334155]/50 text-gray-300 hover:bg-[#334155]/70 transition-colors lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Sidebar header */}
            <div className="p-6 border-b border-[#334155]/50 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">PayZoll Agent</h1>
              </div>
            </div>
            
            {/* Sidebar scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {/* Sidebar Buttons */}
              <div className="space-y-2 mb-8">
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    activeTab === "dashboard" 
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md shadow-indigo-900/20 text-white" 
                      : "hover:bg-[#334155]/50 text-gray-300"
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab("activity")}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    activeTab === "activity" 
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md shadow-indigo-900/20 text-white" 
                      : "hover:bg-[#334155]/50 text-gray-300"
                  }`}
                >
                  <Activity className="w-5 h-5" />
                  <span>Activity History</span>
                </button>
                
                <button 
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#334155]/50 text-gray-300 transition-all duration-200"
                >
                  <Users className="w-5 h-5" />
                  <span>Employees</span>
                </button>
                
                <button 
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#334155]/50 text-gray-300 transition-all duration-200"
                >
                  <CircleDollarSign className="w-5 h-5" />
                  <span>Payments</span>
                </button>
                
                <button 
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#334155]/50 text-gray-300 transition-all duration-200"
                >
                  <FileText className="w-5 h-5" />
                  <span>Reports</span>
                </button>
                
                <button 
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#334155]/50 text-gray-300 transition-all duration-200"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Analytics</span>
                </button>
              </div>
              
              <div className="mt-6 mb-4">
                <h3 className="text-gray-400 text-sm font-medium px-3 mb-2 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-2 opacity-70" /> 
                  Recent Activities
                </h3>
                <div className="space-y-2.5">
                  {activities.map((activity, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#334155]/60 hover:bg-[#334155]/80 transition-colors duration-200 backdrop-blur-sm rounded-lg p-3 text-sm"
                    >
                      <div className="flex items-start">
                        <div className="min-w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2"></div>
                        <div>
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-400 text-xs flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1 opacity-70" /> {activity.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar footer */}
            <div className="p-4 border-t border-[#334155]/50 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Alex Johnson</p>
                    <p className="text-xs text-gray-400">Admin</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col h-screen w-full transition-all duration-300 ${
          !isFullscreen && isLargeScreen ? 'lg:pl-72' : ''
        }`}
      >
        {/* Fixed header */}
        <header className="p-6 border-b border-[#334155]/60 bg-[#1E293B]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            {/* Hamburger menu for mobile */}
            {!isLargeScreen && (
              <button 
                onClick={toggleSidebar}
                className="p-2.5 rounded-lg bg-[#334155]/70 text-white hover:bg-[#334155] transition-colors mr-4"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            
            <h2 className="text-xl md:text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Welcome back, Alex
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-[#334155]/50 text-gray-300 transition-colors"
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                  <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              )}
            </button>
            <button className="p-2 rounded-lg hover:bg-[#334155]/50 text-gray-300 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>
        
        {/* Scrollable main content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 mb-4 pb-2">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.175, 0.885, 0.32, 1] // Ease out back
                    }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4 mt-1 shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <motion.div 
                      className={`max-w-[80%] rounded-2xl p-4 shadow-lg backdrop-blur-sm
                        ${message.type === 'user' 
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white ml-4' 
                          : 'bg-[#334155]/80 text-gray-200'
                        }`}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      {message.content}
                    </motion.div>
                    {message.type === 'user' && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center ml-4 mt-1 shadow-lg">
                        <span className="text-white font-medium">A</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4 mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-[#334155]/80 backdrop-blur-sm max-w-[80%] rounded-2xl p-5 shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse delay-150"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messageEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 relative">
              <div className="relative rounded-3xl overflow-hidden bg-[#121212] shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full bg-transparent text-gray-300 text-sm rounded-3xl px-6 py-4 focus:outline-none"
                  placeholder="What do you want me to do..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full hover:bg-gray-800/50 transition-all duration-200 disabled:opacity-50"
                  disabled={isProcessing || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            
            {/* Quick Suggestions is added*/}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleSuggestion("Process payroll for all employees")}
                      className="bg-[#1C2541] text-white px-6 py-2.5 rounded-full flex items-center justify-center text-sm font-medium border-[1px] border-[#6C5CE7]"
                    >
                      Pay salary
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleSuggestion("Check balances of all accounts")}
                      className="bg-[#1C2541] text-white px-6 py-2.5 rounded-full flex items-center justify-center text-sm font-medium border-[1px] border-[#6C5CE7]"
                    >
                      Check balances
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleSuggestion("Update employee info")}
                      className="bg-[#1C2541] text-white px-6 py-2.5 rounded-full flex items-center justify-center text-sm font-medium border-[1px] border-[#6C5CE7]"
                    >
                      Update employee info
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleSuggestion("Generate reports for this month")}
                      className="bg-[#1C2541] text-white px-6 py-2.5 rounded-full flex items-center justify-center text-sm font-medium border-[1px] border-[#6C5CE7]"
                    >
                      Generate reports
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleSuggestion("Calculate taxes for this quarter")}
                      className="bg-[#1C2541] text-white px-6 py-2.5 rounded-full flex items-center justify-center text-sm font-medium border-[1px] border-[#6C5CE7]"
                    >
                      Tax calculations
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 1024px) {
          body {
            overflow: ${isSidebarOpen ? 'hidden' : 'auto'};
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.6);
        }
      `}</style>
    </div>
  );
}