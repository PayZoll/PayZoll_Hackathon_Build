const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
const { ethers } = require("ethers");


const port = 8080; // Hard-coded port to avoid any conflicts
const prefix = "/api/v1";

// Allow multiple origins
const allowedOrigins = [
  "https://pay-zoll-edu-chain.vercel.app/",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Temporarily allow all origins in development
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

// const router = require("./routes/router");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./Controllers/authController");
const payrollRouter = require("./routes/payrollRouter");
const tokenRouter = require("./routes/tokenrouter");
const employeeRouter = require("./routes/employeeRouter");
const lendingRouter = require("./routes/lendingRouter");
const borrowingRouter = require("./routes/borrowingRouter");
const agentRouter = require("./api/agentService");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use(
  "/admin",
  authRouter.isLoggedIn,
  authRouter.checkForEmployeer,
  adminRouter
);
app.use(
  "/payroll",
  authRouter.isLoggedIn,
  authRouter.checkForEmployeer,
  payrollRouter
);
app.use(
  "/token",
  authRouter.isLoggedIn,
  authRouter.checkForEmployeer,
  tokenRouter
);

app.use(
  "/employee",
  authRouter.isLoggedIn,
  authRouter.checkForEmployee,
  employeeRouter
);

app.use("/agent", agentRouter);

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



app.use("/lending", authRouter.isLoggedIn, lendingRouter);
app.use("/borrowing", authRouter.isLoggedIn, borrowingRouter);
//  404 handler middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
