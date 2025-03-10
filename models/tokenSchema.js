const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference to the employee collection
      required: true,
    },
    allocated: {
      type: Number,
      required: true,
    },
    vestingStart: {
      type: Date,
      default: Date.now,
    },
    vestingEnd: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", tokenSchema);
