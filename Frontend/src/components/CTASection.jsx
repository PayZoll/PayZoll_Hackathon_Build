import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Blocks, Shield, Globe } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-crypto-dark to-crypto-card relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute inset-0 bg-gradient-conic from-indigo-500/20 via-purple-500/20 to-indigo-500/20 filter blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 relative">
            {/* Abstract Blockchain Visual */}
            <div className="relative h-[400px] w-full">
              {/* Animated blockchain nodes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-[300px] h-[300px]">
                  {/* Central node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center animate-pulse">
                      <Blocks className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Orbiting nodes */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/30 flex items-center justify-center backdrop-blur-sm">
                        <Shield className="w-6 h-6 text-indigo-300" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                        <Globe className="w-6 h-6 text-purple-300" />
                      </div>
                    </div>
                  </div>

                  {/* Connecting lines */}
                  <div className="absolute inset-0 animate-pulse">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="0.5"
                          strokeDasharray="4 4"
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing orbs background */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full filter blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full filter blur-3xl animate-float-delayed"></div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-crypto-card border border-gray-800 p-8 rounded-2xl backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Payroll, Redefined?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of forward-thinking businesses that have already
                transformed their payroll with PayZoll.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth?mode=signup"
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center justify-center"
                >
                  Sign Up Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center">
                  Talk to Our Team
                  <MessageCircle className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
