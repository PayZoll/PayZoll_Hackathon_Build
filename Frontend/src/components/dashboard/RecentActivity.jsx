import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { useWeb3 } from "../../context/useWeb3";
import axios from "axios";
import { backendDomain } from "../../constant/domain";
import { getTimeAgo } from "../../utils/dateUtil";

const activities = [
  {
    id: 1,
    type: "Salary Payment",
    amount: "-12.5 ETH",
    value: "$24,500",
    recipient: "Engineering Team",
    timestamp: "2 hours ago",
    status: "completed",
    isOutgoing: true,
  },
  {
    id: 2,
    type: "Add Funds",
    amount: "+50,000 USDT",
    value: "$50,000",
    recipient: "Company Wallet",
    timestamp: "5 hours ago",
    status: "completed",
    isOutgoing: false,
  },
  {
    id: 3,
    type: "Bonus Payment",
    amount: "-2.5 ETH",
    value: "$4,875",
    recipient: "John Doe",
    timestamp: "1 day ago",
    status: "pending",
    isOutgoing: true,
  },
  {
    id: 4,
    type: "Swap",
    amount: "ETH → USDT",
    value: "$10,000",
    recipient: "Internal Transfer",
    timestamp: "2 days ago",
    status: "completed",
    isOutgoing: false,
  },
  {
    id: 5,
    type: "Salary Payment",
    amount: "-25,000 USDT",
    value: "$25,000",
    recipient: "Marketing Team",
    timestamp: "2 days ago",
    status: "completed",
    isOutgoing: true,
  },
];

// {/* <div
//   className={`w-10 h-10 rounded-lg ${
//     activity.isOutgoing
//       ? "bg-gradient-to-r from-red-600 to-orange-600"
//       : "bg-gradient-to-r from-green-600 to-emerald-600"
//   } flex items-center justify-center transform transition-transform group-hover/item:scale-110`}
// >
//   {/* {activity.isOutgoing ? (
//                     <ArrowUpRight className="w-5 h-5 text-white" />
//                   ) : (
//                     <ArrowDownRight className="w-5 h-5 text-white" />
//                   )} */}
// </div> */}

const statusColors = {
  completed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  failed: "text-red-400 bg-red-400/10",
};

export default function RecentActivity() {
  const [payrollHistory, setPayrollHistory] = useState([]);

  const { provider, signer } = useWeb3();
  const getPayrollHistory = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendDomain}/payroll/payroll-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPayrollHistory(response.data.data);
  };
  useEffect(() => {
    getPayrollHistory();
  }, [provider, signer]);
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 h-[500px] flex flex-col hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            Recent Activity
          </h2>
          <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm
                     focus:outline-none focus:border-indigo-500 transition-colors w-48 group-hover:border-indigo-500/50"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {payrollHistory.map((payroll, index) => (
          <div
            key={index}
            className="group/item bg-crypto-dark/50 rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all hover:bg-crypto-dark/70"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center transform transition-transform group-hover/item:scale-110`}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>

                <div>
                  <div className="font-semibold group-hover/item:text-white transition-colors">
                    {"Salary Payment"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {"Engineering Team"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold group-hover/item:text-white transition-colors">
                  {payroll.totalAmount.$numberDecimal}
                </div>
                <div className="text-sm text-gray-400">{"$500"}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span
                className={`px-3 py-1 rounded-full ${statusColors["Completed"]} group-hover/item:opacity-90 transition-opacity`}
              >
                {"Completed"}
              </span>
              <span className="text-gray-400">
                {getTimeAgo(payroll._id.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-800 group-hover:border-indigo-500/20">
        <div className="text-sm text-gray-400">
          Showing {payrollHistory.length} transactions
        </div>
        <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
}
