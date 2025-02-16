const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  contractAddress: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokenName: {
    type: String,
    required: true,
  }, 
  tokenSymbol: {
    type: String,
    required: true,
  }, 
  tokenCount: {
    type: Number,
    required: true,
  }
});

// Create the company model
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
