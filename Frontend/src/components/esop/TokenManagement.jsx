import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Users,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const employees = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    allocated: "10,000",
    claimed: "5,000",
    remaining: "5,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    department: "Marketing",
    allocated: "8,000",
    claimed: "4,000",
    remaining: "4,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 3,
    name: "John Doe",
    department: "Engineering",
    allocated: "10,000",
    claimed: "5,000",
    remaining: "5,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Smith",
    department: "Marketing",
    allocated: "8,000",
    claimed: "4,000",
    remaining: "4,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 5,
    name: "John Doe",
    department: "Engineering",
    allocated: "10,000",
    claimed: "5,000",
    remaining: "5,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 6,
    name: "Sarah Smith",
    department: "Marketing",
    allocated: "8,000",
    claimed: "4,000",
    remaining: "4,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 7,
    name: "John Doe",
    department: "Engineering",
    allocated: "10,000",
    claimed: "5,000",
    remaining: "5,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: 8,
    name: "Sarah Smith",
    department: "Marketing",
    allocated: "8,000",
    claimed: "4,000",
    remaining: "4,000",
    vestingEnd: "2024-12-31",
    status: "Active",
  },
  // Add more employees as needed
];

export default function TokenManagement({ tokensInfo, companyInfo }) {
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const totalAllocated = tokensInfo.reduce((sum, item) => sum + item.allocated, 0);

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Token Allocation</h2>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Allocated</div>
              <div className="text-xl font-bold text-white mt-1">{totalAllocated}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Claimed</div>
              <div className="text-xl font-bold text-green-400 mt-1">
                {totalAllocated}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Pending Claims</div>
              <div className="text-xl font-bold text-yellow-400 mt-1">
                {0}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-crypto-dark/90 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Employee
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Department
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Allocated
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Claimed
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Remaining
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Vesting End
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {tokensInfo.map((token) => (
              <tr
                key={token._id}
                className="hover:bg-crypto-dark/30 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                      {token.employeeId.name.charAt(0).toUpperCase()}
                    </div>
                    <a
                      href="#"
                      className="text-white hover:text-indigo-400 transition-colors"
                    >
                      {token.employeeId.name}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {token.employeeId.designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {token.allocated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400">
                  {token.allocated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-yellow-400">
                  {0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {token.vestingEnd}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm bg-green-400/10 text-green-400`}
                  >
                    {"Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">Showing 10 of 50 employees</span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            2
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            3
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
