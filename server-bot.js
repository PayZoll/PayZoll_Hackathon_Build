require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


async function silentBulkTransfer(privateKey, rpcUrl, employees, onStatus) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const recipients = employees.map((employee) => employee.accountId);
        const values = employees.map((employee) => {
            if (!employee.salary) {
                throw new Error(`Invalid salary for employee: ${employee.name}`);
            }
            return ethers.parseEther(String(employee.salary));
        });

        let nonce = await provider.getTransactionCount(wallet.address, "pending");

        const receipts = [];
        for (let i = 0; i < recipients.length; i++) {
            const tx = {
                to: recipients[i],
                value: values[i],
                nonce: nonce++,
                gasLimit: 21000,
                maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
                maxFeePerGas: ethers.parseUnits("50", "gwei"),
            };

            const sentTx = await wallet.sendTransaction(tx);
            onStatus(`Transaction sent to ${recipients[i]}: ${sentTx.hash}`);
            const receipt = await sentTx.wait();
            receipts.push(receipt);
        }

        return receipts;
    } catch (error) {
        onStatus(`Error: ${error.message}`);
        throw error;
    }
}

app.post("/bulk-transfer", async (req, res) => {
    try {
        const { employees, rpcUrl } = req.body;
        if (!employees || !Array.isArray(employees)) {
            return res.status(400).json({ error: "Invalid employees list" });
        }

        console.log("Received request for bulk transfer");
        console.log("rpcUrl:", rpcUrl);
        console.log("Employees:", employees);

        const receipts = await silentBulkTransfer(
            process.env.PRIVATE_KEY,
            rpcUrl,
            employees,
            console.log
        );

        res.json({ success: true, receipts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/check-rpc", async (req, res) => {
    try {
        console.log("Req-body", req.body);
        const { rpcUrl } = req.body;
        if (!rpcUrl) {
            return res.status(400).json({ error: "Invalid RPC URL" });
        }

        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const network = await provider.getNetwork();

        res.json({ success: true, network });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 3888;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
