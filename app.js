const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

// Allow multiple origins
const allowedOrigins = [
  "https://www.payzoll.in/",
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
const bulkTransferRouter = require("./routes/bulkTransferRouter");

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

app.use("/tfs", bulkTransferRouter);

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
