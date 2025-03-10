const Employee = require("../models/employeeSchema");
const Token = require("../models/tokenSchema");
const Payroll = require("../models/payrollSchema");

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email }).populate(
      "company"
    );
    res.status(200).json({
      status: "success",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getEmployeeTokenInfo = async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email });
    const token = await Token.find({ employeeId: employee._id });

    // Return token information
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getEmployeePayrollHistory = async (req, res) => {
  try {
    const payroll = await Payroll.find({ email: req.user.email });
    res.status(200).json({
      status: "success",
      payroll,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getEmployeeById,
  getEmployeeTokenInfo,
  getEmployeePayrollHistory,
};
