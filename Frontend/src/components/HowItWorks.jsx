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
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A Smarter Way to Pay
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get started with PayZoll in four simple steps
          </p>
        </div>

        <div className="relative py-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-crypto-card rounded-xl p-8 border border-gray-800 h-full">
                  <div className="mb-8 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
