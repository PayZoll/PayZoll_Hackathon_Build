const Token = require("../models/tokenSchema");
const Company = require("../models/companySchema");

const issueTokenToEmployee = async (req, res) => {
  try {
    const company = req.user.company;
    const employeeId = req.params.id; // Employee ID from the request parameters
    const { allocated, vestingEnd } = req.body;

    // Create a new token document
    const newToken = new Token({
      company,
      employeeId,
      allocated,
      vestingEnd,
    });

    // Save the token document to the database
    const savedToken = await newToken.save();

    res.status(201).json({
      status: "success",
      message: "Token successfully issued to the employee.",
      data: savedToken,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getTokensByCompany = async (req, res) => {
  try {
    const companyName = req.user.company; // Company name from request parameters
    const company = await Company.findOne({ name: companyName }).populate("employees");
    // Fetch all tokens for the specified company
    const tokens = await Token.find({ company: companyName }).populate(
      "employeeId"
    );

    res.status(200).json({
      status: "success",
      message: `Tokens retrieved successfully for company: ${companyName}`,
      data: tokens,
      company,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { issueTokenToEmployee, getTokensByCompany };
