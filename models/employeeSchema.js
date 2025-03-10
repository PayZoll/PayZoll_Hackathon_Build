const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
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
  phone: String,
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',  // Reference to the Company model
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
