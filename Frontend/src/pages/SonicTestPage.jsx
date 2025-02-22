import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { backendDomain } from "../constant/domain";
import { useWeb3 } from "../context/useWeb3";
import { silentBulkTransfer } from "../blockchain/scripts/Token";
import { CHAINS_BY_ID } from "../lib/constants";

export default function SonicTestPage() {
    const { provider, signer, account, network, balance, switchOrAddChain } = useWeb3();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [transactionHash, setTransactionHash] = useState([]);
    let explorerUrl;



    useEffect(() => {
        fetchPayrollData();

    }, [provider]);

    const fetchPayrollData = () => {

        console.log("Provider:", provider);
        console.log("Signer:", signer);
        console.log("Account:", account);
        console.log("Network:", network);
        console.log("Balance:", balance);

        try {
            // Temporary dummy data
            const dummyEmployees = [
                { name: "ABH", accountId: "0xF947782C0CB4d3afa57912DA235894563950E2F4", salary: "0.1" },
                { name: "VBH", accountId: "0x2a5470B7CdB77bcb950015BB19CcDBc6AE8B26C3", salary: "0.1" },
            ];

            setEmployees(dummyEmployees.map(emp => ({
                ...emp,
                salary: String(emp.salary), // Ensure salary is always a string
            })));
            console.log("Fetched payroll data:", dummyEmployees);
        } catch (error) {
            console.error("Error fetching payroll data:", error);
        } finally {
            setLoading(false);
        }

        // try {
        //     const response = await axios.get(`${backendDomain}/get-payroll`);
        //     setEmployees(response.data.employees);
        // } catch (error) {
        //     console.error("Error fetching payroll data:", error);
        // } finally {
        //     setLoading(false);
        // }
    };


    const payEmployees = async () => {

        console.log("Provider:", provider);
        console.log("Signer:", signer);
        console.log("Account:", account);
        console.log("Network:", network);
        console.log("Balance:", balance);


        if (!employees.length) {
            alert("No employees to pay.");
            return;
        }

        setPaying(true);
        const rpcUrl = CHAINS_BY_ID[network.chainId].rpcUrl;
        explorerUrl = CHAINS_BY_ID[network.chainId].explorerUrl;
        const privateKey = "";

        try {
            const receipts = await silentBulkTransfer(
                privateKey,
                rpcUrl,
                employees,
                (status) => console.log(status) // Optional status callback
            );

            setTransactionHash(receipts);
            console.log("Bulk Transfer Success:", receipts);
        } catch (error) {
            console.error("Failed to pay employees:", error);
        } finally {
            setPaying(false);
        }
    };

    const payEmployeesAPI = async () => {
        console.log("Provider:", provider);
        console.log("Signer:", signer);
        console.log("Account:", account);
        console.log("Network:", network);
        console.log("Balance:", balance);

        if (!employees.length) {
            alert("No employees to pay.");
            return;
        }

        setPaying(true);
        const rpcUrl = CHAINS_BY_ID[network.chainId].rpcUrl;

        try {
            const response = await fetch("http://localhost:3888/bulk-transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rpcUrl,
                    employees,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to process payment.");
            }

            console.log("----------------_____________Bulk Transfer Success___________---------------:", data);
            setTransactionHash(data.receipts);
        } catch (error) {
            console.error("Failed to pay employees:", error);
        } finally {
            setPaying(false);
        }
    };

    const checkRPC = async () => {
        console.log("Provider:", provider);
        console.log("Signer:", signer);
        console.log("Account:", account);
        console.log("Network:", network);
        console.log("Balance:", balance);

        const rpcUrl = CHAINS_BY_ID[network.chainId].rpcUrl;

        try {
            const response = await fetch("http://localhost:3888/check-rpc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rpcUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to check RPC.");
            }

            console.log("RPC Check Success:", data);
        } catch (error) {
            console.error("Failed to check RPC:", error);
        }
    }


    return (
        <>
            {provider ? (
                <div className="p-6 min-h-screen min-w-screen flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4 text-white">Sonic Payroll</h1>

                    <button
                        onClick={checkRPC}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Check RPC
                    </button>

                    {loading ? (
                        <p>Loading payroll data...</p>
                    ) : employees.length > 0 ? (
                        <div className="p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-white">Payroll Details</h2>
                            <ul>
                                {employees.map((employee, index) => (
                                    <li key={index}>
                                        {employee.name} - {employee.salary} ETH
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={payEmployees}
                                disabled={paying}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            >
                                {paying ? "Processing..." : "Pay Employees"}
                            </button>

                            <button
                                onClick={payEmployeesAPI}
                                disabled={paying}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            >
                                {paying ? "Processing..." : "Pay Employees BY API"}
                            </button>

                            {transactionHash.length > 0 && (
                                <div className="mt-4 text-green-600">
                                    ✅ Payment successful!
                                    {transactionHash.map((receipt, index) => (
                                        <p key={index}>
                                            <a
                                                href={`${CHAINS_BY_ID[network.chainId]?.explorerUrl}/tx/${receipt.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Transaction {index + 1} on Block Explorer
                                            </a>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No payroll data available.</p>
                    )}
                </div >) :
                <div className="text-white">
                    fetching providers
                </div>
            }
        </>
    );
}