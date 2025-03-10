import React from "react";
import { UserPlus, Wallet, Calendar, CreditCard } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Onboard",
    description: "Create your account and onboard your workforce in minutes",
  },
  {
    icon: Wallet,
    title: "Fund Your Wallet",
    description: "Add crypto to your company wallet securely",
  },
  {
    icon: Calendar,
    title: "Set Schedule",
    description: "Configure automated payroll schedules",
  },
  {
    icon: CreditCard,
    title: "Instant Payouts",
    description:
      "Your team receives crypto instantly with fiat conversion options",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20  relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            A Smarter Way to Pay Your Team
          </h2>
          <p className="text-xl text-gray-400">
            Get started with PayZoll in four simple steps
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-crypto-card rounded-2xl p-8 border border-gray-800 hover:border-indigo-600/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
