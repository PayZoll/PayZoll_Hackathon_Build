const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    status: {
      type: String,
      enum: ["processed", "pending", "failed"],
      default: "pending",
    },
    accountId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", payrollSchema);
module.exports = Payroll;
