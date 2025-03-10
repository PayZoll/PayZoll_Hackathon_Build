import React from "react";
import { motion } from "framer-motion";
import { Wallet2, Shield, Globe, Cpu, Blocks } from "lucide-react";

function WelcomeSection({ isLogin }) {
  return (
    <div className="hidden lg:flex w-1/2 bg-crypto-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>

        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-conic from-indigo-500/20 via-purple-500/20 to-indigo-500/20 animate-spin-slow rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Animated mesh grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent transform"
              style={{
                top: `${(i + 1) * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transform"
              style={{
                left: `${(i + 1) * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full p-12 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          {/* Hexagon background with logo */}
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[32px] rotate-45 transform-gpu"></div>
            <div className="absolute inset-2 bg-crypto-dark rounded-[28px] rotate-45 transform-gpu"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-32 h-32"
              >
                <Shield className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 text-indigo-400" />
                <Globe className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 text-purple-400" />
                <Cpu className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-indigo-400" />
                <Blocks className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-purple-400" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Wallet2 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md space-y-6"
        >
          <h1 className="text-4xl font-bold">
            {isLogin ? "Welcome Back to " : "Register Your Company with "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PayZoll
            </span>
          </h1>

          <p className="text-xl text-gray-300">
            {isLogin
              ? "Access your account to manage crypto payroll seamlessly"
              : "Join the future of payroll management with blockchain technology"}
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="group relative p-6 bg-gradient-to-br from-crypto-card/90 to-crypto-card/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500"></div>
              <div className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  50k+
                </div>
                <div className="text-gray-400 mt-2">Active Users</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="group relative p-6 bg-gradient-to-br from-crypto-card/90 to-crypto-card/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-indigo-600/10 transition-all duration-500"></div>
              <div className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  $100M+
                </div>
                <div className="text-gray-400 mt-2">Processed</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Shield className="w-5 h-5" />
              <span>Bank-grade security with multi-sig protection</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 bg-indigo-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
