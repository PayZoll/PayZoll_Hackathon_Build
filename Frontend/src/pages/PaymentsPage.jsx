import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import PaymentsHeader from "../components/payments/PaymentsHeader";
import PaymentsOverview from "../components/payments/PaymentsOverview";
import PaymentOptions from "../components/payments/PaymentOptions";
import ScheduledPayments from "../components/payments/ScheduledPayments";
import TransactionsLog from "../components/payments/TransactionsLog";
import PayrollBudget from "../components/payments/PayrollBudget";
import PayrollAnalytics from "../components/payments/PayrollAnalytics";
import QuickPayModal from "../components/payments/QuickPayModal";
import axios from "axios";
import { ethers } from "ethers";
import { backendDomain } from "../constant/domain";
import { useWeb3 } from "../context/useWeb3";
import { executeBulkTransfer } from "../blockchain/scripts/Token";
import { verifyToken } from "../utils/jwt";

export default function PaymentsPage() {
  const [showQuickPayModal, setShowQuickPayModal] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { provider, signer, account, network } = useWeb3();
  const [employees, setEmployees] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [payrollHistory, setPayrollHistory] = useState([]);

  const payEmployees = async () => {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    const data = verifyToken(token);
    console.log("Data", data);
    const contractAddress = data.contractAddress;
    const recipients = employees.map((employee) => employee.accountId);

    const values = employees.map((employee) =>
      ethers.parseEther(employee.salary.$numberDecimal)
    );

    const totalAmount = values.reduce((acc, value) => acc + value, 0n);
    const receipt = await executeBulkTransfer(
      signer,
      contractAddress,
      recipients,
      values,
      totalAmount
    );

    const payrollData = employees.map((employee) => ({
      email: employee.email,
      amount: employee.salary.$numberDecimal,
      accountId: employee.accountId,
      company: data.company,
    }));

    const response = await axios.post(
      `${backendDomain}/payroll/pending`,
      {
        payrollDataArray: payrollData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const ids = response.data.data.map((obj) => obj._id);

    await axios.post(
      `${backendDomain}/payroll/processed`,
      {
        payrollIds: ids,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
  };

  const getTotalSalary = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendDomain}/admin/get-total-salary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTotalSalary(response.data.totalSalary);
  };

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

  const totalSalaryPaid = () => {
    return payrollHistory.reduce((sum, item) => {
      return sum + parseFloat(item.totalAmount.$numberDecimal);
    }, 0);
  };

  const getEmployeeInfo = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendDomain}/admin/get-all-empolyees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEmployees(response.data.employee);
  };
  useEffect(() => {
    getEmployeeInfo();
    getTotalSalary();
    getPayrollHistory();
  }, [provider, signer, account]);

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `radial-gradient(circle, ${i === 0
                  ? "rgba(99,102,241,0.1)"
                  : i === 1
                    ? "rgba(139,92,246,0.1)"
                    : "rgba(168,85,247,0.1)"
                } 0%, transparent 70%)`,
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar
        isWalletConnected={account != undefined}
        onConnectWallet={() => console.log("Todo")}
        account={account}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header Section */}
          <PaymentsHeader onQuickPay={() => setShowQuickPayModal(true)} />

          {/* Overview Cards */}
          <PaymentsOverview
            employees={employees}
            totalSalary={totalSalary}
            totalSalaryPaid={totalSalaryPaid()}
          />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Payment Options and Budget */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <PaymentOptions />
              <TransactionsLog payrollHistory={payrollHistory} />
            </div>

            {/* Sidebar Content */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <PayrollBudget totalSalary={totalSalary} />
              <ScheduledPayments />
            </div>
          </div>

          {/* Analytics Section */}
          <PayrollAnalytics />
        </div>
      </main>

      {/* Quick Pay Modal */}
      <QuickPayModal
        isOpen={showQuickPayModal}
        onClose={() => setShowQuickPayModal(false)}
        payEmployees={payEmployees}
        totalSalary={totalSalary}
        network={network}
        account={account}
        employees={employees}
      />
    </div>
  );
}
