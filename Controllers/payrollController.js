const Payroll = require("../models/payrollSchema");

const addPayrollRecords = async (req, res) => {
  try {
    const payrollDataArray = req.body;

    if (!Array.isArray(payrollDataArray) || payrollDataArray.length === 0) {
      throw new Error(
        "Invalid data: Provide a non-empty array of payroll data."
      );
    }

    const addedPayrolls = await Payroll.insertMany(payrollDataArray, {
      ordered: true,
    });

    return res.status(200).json({
      status: "success",
      message: addedPayrolls,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Function to add new payroll records with "pending" status and return their IDs
const markPaymentsPendingAndReturnIds = async (req, res) => {
  try {
    const payrollDataArray = req.body.payrollDataArray;
    if (!Array.isArray(payrollDataArray) || payrollDataArray.length === 0) {
      throw new Error(
        "Invalid data: Provide a non-empty array of payroll data."
      );
    }

    // Insert new records
    const addedPayrolls = await Payroll.insertMany(
      payrollDataArray.map((item) => ({
        ...item,
        status: "pending", // Ensure the status is set to "pending"
      }))
    );

    return res.status(200).json({
      status: "success",
      data: addedPayrolls,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message });
  }
};

// Function to update pending records to processed
const markPendingToSuccess = async (req, res) => {
  try {
    const payrollIds = req.body.payrollIds;
    const updatedPayrolls = await Payroll.updateMany(
      { _id: { $in: payrollIds }, status: "pending" }, // Only update records with "pending" status
      { $set: { status: "processed" } },
      { multi: true }
    );

    return res.status(200).json({
      status: "success",
      data: updatedPayrolls.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message });
  }
};

const getPayrollDetailsByCompany = async (req, res) => {
  try {
    const companyName = req.user.company;

    // Query the database
    const payrollDetails = await Payroll.find({ company: companyName });

    return res.status(200).json({
      status: "success",
      data: payrollDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message });
  }
};

const getPayrollTotalsByCompanyAndDate = async (req, res) => {
  try {
    const companyName = req.user.company;

    // Aggregate payroll records by company and createdAt date, summing the amount
    const payrollTotals = await Payroll.aggregate([
      {
        $match: { company: companyName }, // Match records for the specific company
      },
      {
        $project: {
          company: 1,
          createdAt: 1,
          amount: 1,
          createdAtFormatted: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          }, // Format createdAt to group by date only
        },
      },
      {
        $group: {
          _id: { company: "$company", createdAt: "$createdAtFormatted" }, // Group by company and formatted date
          totalAmount: { $sum: "$amount" }, // Sum the amounts for each group
        },
      },
      {
        $sort: { "_id.createdAt": -1 }, // Optionally sort by createdAt date
      },
    ]);

    return res.status(200).json({
      status: "success",
      data: payrollTotals,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message });
  }
};

module.exports = {
  addPayrollRecords,
  markPaymentsPendingAndReturnIds,
  markPendingToSuccess,
  getPayrollDetailsByCompany,
  getPayrollTotalsByCompanyAndDate
};
