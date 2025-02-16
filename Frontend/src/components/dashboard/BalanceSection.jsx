import React, { useEffect, useState } from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  executeBulkTransfer,
  getName,
  getSymbol,
  getTotalCoins,
} from "../../blockchain/scripts/Token";
import { useWeb3 } from "../../context/useWeb3";
import { formatEther } from "ethers";
import { verifyToken } from "../../utils/jwt";

const cryptoBalances = [
  {
    currency: "ETH",
    amount: "12.5",
    value: "$24,500",
    change: "+5.2%",
    isPositive: true,
  },
  {
    currency: "BTC",
    amount: "1.2",
    value: "$45,600",
    change: "-2.1%",
    isPositive: false,
  },
  {
    currency: "USDT",
    amount: "50,000",
    value: "$50,000",
    change: "+0.1%",
    isPositive: true,
  },
];

export default function BalanceSection({ isWalletConnected }) {
  const { provider, signer, account } = useWeb3();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const contractAddress = verifyToken(
    localStorage.getItem("token")
  ).contractAddress;

  const getTokenInfo = async () => {
    if (provider) {
      const coins = await getTotalCoins(provider, contractAddress);

      const name = await getName(provider, contractAddress);
      const symbol = await getSymbol(provider, contractAddress);

      setTokenBalance(formatEther(BigInt(coins)));
      setTokenName(name);
      setTokenSymbol(symbol);
    }
  };

  const [showAddFunds, setShowAddFunds] = useState(false);

  useEffect(() => {
    getTokenInfo();
  }, [provider, signer, account]);

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 h-[420px] overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            Token Balance
          </h2>
          <p className="text-gray-400 text-sm mt-1">Your token details</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mt-1">
            Token Name: {tokenName.toUpperCase()}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Token Symbol: {tokenSymbol}
          </p>
        </div>
      </div>

      <div className="bg-crypto-dark/50 rounded-xl p-6 mb-6 border border-gray-800 group-hover:border-indigo-500/20 group-hover:bg-crypto-dark/70 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Total Coins</span>
          <span className="text-green-400 text-sm">+3.2% this month</span>
        </div>
        <div className="text-3xl font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {tokenBalance}
        </div>
      </div>

      <div
        className="space-y-4 overflow-y-auto custom-scrollbar pr-2"
        style={{ maxHeight: "180px" }}
      >
        {cryptoBalances.map((crypto, index) => (
          <motion.div
            key={crypto.currency}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group/item bg-crypto-dark/50 rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all hover:bg-crypto-dark/70"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center transform transition-transform group-hover/item:scale-110">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold group-hover/item:text-white transition-colors">
                    {crypto.currency}
                  </div>
                  <div className="text-sm text-gray-400">
                    {crypto.amount} {crypto.currency}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold group-hover/item:text-white transition-colors">
                  {crypto.value}
                </div>
                <div
                  className={`text-sm flex items-center ${
                    crypto.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {crypto.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {crypto.change}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddFunds && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddFunds(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-crypto-card p-6 rounded-2xl border border-gray-800 w-full max-w-md m-4 hover:border-indigo-500/50 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add Funds</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Select Currency
                  </label>
                  <select className="w-full bg-crypto-dark border border-gray-800 rounded-xl p-3 text-white focus:border-indigo-500 transition-colors">
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="USDT">Tether (USDT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-crypto-dark border border-gray-800 rounded-xl p-3 text-white focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
