import React from "react";
import { Users, UserPlus, Clock, Wallet2 } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const departmentData = [
  { name: "Engineering", value: 45, color: "#6366f1" },
  { name: "Marketing", value: 25, color: "#8b5cf6" },
  { name: "Sales", value: 35, color: "#a855f7" },
  { name: "HR", value: 15, color: "#d946ef" },
  { name: "Finance", value: 20, color: "#ec4899" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-3 rounded-lg border border-gray-800">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-indigo-400">{`${payload[0].value} Employees`}</p>
      </div>
    );
  }
  return null;
};

export default function EmployeeStats({ employees }) {
  const getNewEmployeesThisMonth = () => {
    // Get the current month and year
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December
    const currentYear = now.getFullYear();

    // Filter employees who joined this month
    const newEmployees = employees.filter((employee) => {
      const joinDate = new Date(employee.dateOfJoining);
      return (
        joinDate.getMonth() === currentMonth &&
        joinDate.getFullYear() === currentYear
      );
    });

    return newEmployees.length;
  };

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      change: `+${(getNewEmployeesThisMonth() / employees.length) * 100}%`,
      icon: Users,
      color: "from-indigo-600 to-purple-600",
      messgae: "from last year",
    },
    {
      title: "New This Month",
      value: getNewEmployeesThisMonth(),
      change: `+${(getNewEmployeesThisMonth() / employees.length) * 100}%`,
      icon: UserPlus,
      color: "from-green-600 to-emerald-600",
      messgae: "from last month",
    },
    {
      title: "Pending Activation",
      value: 5,
      change: "-2%",
      isNegative: true,
      icon: Clock,
      color: "from-orange-600 to-red-600",
      messgae: "from last year",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
              <div className="text-3xl font-bold mt-1 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {stat.value}
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform transition-transform group-hover:scale-110`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div
            className={`text-sm ${
              stat.isNegative ? "text-red-400" : "text-green-400"
            }`}
          >
            {stat.change} {stat.messgae}
          </div>
        </motion.div>
      ))}
    </>
  );
}
