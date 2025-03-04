import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHAINS_BY_ID } from "../lib/constants";
import axios from "axios";
import { backendDomain } from "../constant/domain";
import { useWeb3 } from "../context/useWeb3";
import { Bot, Send, Wallet, Users, CircleDollarSign, ExternalLink, Loader2 } from "lucide-react";

export default function SonicTestPage() {
    const { provider, signer, account, network, balance, switchOrAddChain } = useWeb3();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [transactionHash, setTransactionHash] = useState([]);
    const [messages, setMessages] = useState([
        { type: 'bot', content: 'Hello! I\'m your AI Payroll Assistant. I can help you manage and process payroll transactions. I will get the available payrolls.' }
    ]);

    useEffect(() => {
        setTimeout(() => {
            fetchPayrollData();

        }, 2000)
    }, []);


    const fetchPayrollData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${backendDomain}/admin/get-all-empolyees`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Responses", response.data.employee)
            const employees = response.data.employee;

            setEmployees(employees.map(emp => ({
                name: emp.name,
                accountId: emp.accountId,
                salary: String(emp.salary.$numberDecimal),
            })));

            setMessages([
                { type: 'bot', content: 'I\'ve fetched the payroll data. Would you like to review the details?' }
            ]);
        } catch (error) {
            console.error("Error fetching payroll data:", error);
            setMessages(prev => [...prev,
            { type: 'bot', content: 'I encountered an error while fetching the payroll data. Please try again.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const payEmployeesAPI = async () => {
        if (!employees.length) {
            setMessages(prev => [...prev,
            { type: 'bot', content: 'There are no employees to process payments for.' }
            ]);
            return;
        }

        setPaying(true);
        setMessages(prev => [...prev,
        { type: 'user', content: 'Process payroll for all employees' },
        { type: 'bot', content: 'Processing payroll transactions...' }
        ]);

        const rpcUrl = CHAINS_BY_ID[network.chainId].rpcUrl;

        try {
            const response = await fetch(`${backendDomain}/bulk-transfer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rpcUrl,
                    employees,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to process payment.");
            }

            setTransactionHash(data.receipts);
            setMessages(prev => [...prev,
            { type: 'bot', content: 'Successfully processed all payroll transactions! 🎉' }
            ]);
        } catch (error) {
            console.error("Failed to pay employees:", error);
            setMessages(prev => [...prev,
            { type: 'bot', content: 'Failed to process payroll. Please try again.' }
            ]);
        } finally {
            setPaying(false);
        }
    };

    if (!provider) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1E293B] rounded-xl p-8 max-w-md w-full shadow-xl"
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
        <div className="min-h-screen bg-[#0F172A] flex flex-col">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#1E293B] border-b border-[#334155] p-4 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Bot className="w-8 h-8 text-indigo-500" />
                        <h1 className="text-2xl font-bold text-white">AI Payroll Assistant</h1>
                    </motion.div>
                    <motion.div
                        className="flex items-center space-x-4"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <div className="px-4 py-2 bg-[#334155] rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow">
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
                {/* Chat Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 bg-[#1E293B] rounded-xl p-4 flex flex-col shadow-xl"
                >
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-xl p-4 ${message.type === 'user'
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'bg-[#334155] text-gray-200 shadow-md'
                                        }`}>
                                        {message.content}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        className="border-t border-[#334155] pt-4 space-y-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <motion.button
                            onClick={payEmployeesAPI}
                            disabled={paying || loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-[#334155] 
                       text-white rounded-xl flex items-center justify-center space-x-2 transition-all
                       shadow-lg hover:shadow-xl disabled:shadow-none font-medium"
                        >
                            {paying ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Processing Payroll...</span>
                                </>
                            ) : (
                                <>
                                    <CircleDollarSign className="w-5 h-5" />
                                    <span>Process Payroll</span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Employee List Section */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-96 bg-[#1E293B] rounded-xl p-4 shadow-xl"
                >
                    <div className="flex items-center space-x-2 mb-6">
                        <Users className="w-5 h-5 text-indigo-500" />
                        <h2 className="text-lg font-semibold text-white">Employees</h2>
                    </div>

                    {loading ? (
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
                                        className="bg-[#334155] rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer"
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

            {/* Transaction Results */}
            <AnimatePresence>
                {transactionHash.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-4 right-4 bg-[#1E293B] rounded-xl p-6 shadow-2xl max-w-md"
                    >
                        <h3 className="text-emerald-400 font-medium mb-4 flex items-center text-lg">
                            <CircleDollarSign className="w-5 h-5 mr-2" />
                            Transactions Complete
                        </h3>
                        <div className="space-y-3">
                            {transactionHash.map((receipt, index) => (
                                <motion.a
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ x: 5 }}
                                    href={`${CHAINS_BY_ID[network.chainId]?.explorerUrl}/tx/${receipt.hash}`}
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
          background: #334155;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
        </div>
    );
}