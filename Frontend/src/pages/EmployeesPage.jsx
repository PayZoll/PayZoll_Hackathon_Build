import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import EmployeeHeader from "../components/employees/EmployeeHeader";
import EmployeeStats from "../components/employees/EmployeeStats";
import EmployeeTable from "../components/employees/EmployeeTable";
import QuickActions from "../components/employees/QuickActions";
import RecentActivity from "../components/employees/RecentActivity";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import BulkUploadModal from "../components/employees/BulkUploadModal";
import { useWeb3 } from "../context/useWeb3";
import axios from "axios";
import { backendDomain } from "../constant/domain";

export default function EmployeesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { provider, signer, account } = useWeb3();
  const [employees, setEmployees] = useState([]);

  const getEmployeesInfo = async () => {
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

  const deleteEmployeeById = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${backendDomain}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getEmployeesInfo();
  };

  const onAddEmployee = async (employee) => {
    const token = localStorage.getItem("token");
    const data = {
      name: employee.firstName + " " + employee.lastName,
      email: employee.email,
      phone: employee.phoneNumber,
      salary: employee.monthlySalary,
      designation: employee.designation,
      accountId: employee.walletAddress,
    };
    await axios.post(`${backendDomain}/admin/add-emp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getEmployeesInfo()
  };

  useEffect(() => {
    getEmployeesInfo();
  }, [provider, signer]);

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
              background: `radial-gradient(circle, ${
                i === 0
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
        isWalletConnected={account !== undefined}
        onConnectWallet={() => setIsWalletConnected(true)}
        account={account}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header Section */}
          <EmployeeHeader
            onAddEmployee={() => setShowAddModal(true)}
            onSearch={setSearchQuery}
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EmployeeStats employees={employees} />
          </div>

          {/* Employee Table Section - Full Width */}
          <div className="w-full overflow-hidden">
            <EmployeeTable
              filterDepartment={filterDepartment}
              filterStatus={filterStatus}
              searchQuery={searchQuery}
              employees={employees}
              deleteEmployeeById={deleteEmployeeById}
            />
          </div>

          {/* Quick Actions and Recent Activity - Equal Width */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-1 h-full">
              <QuickActions
                onAddEmployee={() => setShowAddModal(true)}
                onBulkUpload={() => setShowBulkUploadModal(true)}
              />
            </div>
            <div className="lg:col-span-1 h-full">
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddEmployee={onAddEmployee}
      />
      <BulkUploadModal
        isOpen={showBulkUploadModal}
        onClose={() => setShowBulkUploadModal(false)}
      />
    </div>
  );
}
