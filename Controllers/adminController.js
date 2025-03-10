const Company = require("../models/companySchema");
const Employee = require("../models/employeeSchema");

const addEmployee = async (req, res) => {
  try {
    const company = await Company.findOne({ email: req.user.email });

    const employee = await Employee.create({
      ...req.body,
      password: "12345678", //TODO
      company: company._id,
    });
    company.employees.push(employee._id);
    await company.save();

    res.status(200).json({
      status: "success",
      message: "Employee added",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    await Company.findByIdAndUpdate(
      employee.company,
      { $pull: { employees: employee._id } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Employee deleted and company updated successfully",
      employee,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getEmployeesByEmail = async (req, res) => {
  try {
    // Find the company by email and populate the employees array
    const company = await Company.findOne({ email: req.user.email }).populate(
      "employees"
    );

    if (!company) {
      throw new Error("Company not found");
    }

    res.status(200).json({
      status: "success",
      employee: company.employees
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getTotalSalary = async (req, res) => {
  try {
    // Find the company by email and populate the employees array
    const company = await Company.findOne({ email: req.user.email }).populate(
      "employees"
    );

    if (!company) {
      throw new Error("Company not found");
    }

    const totalSalary = company.employees.reduce((sum, employee) => {
      return sum + parseFloat(employee.salary.toString());
    }, 0);

    res.status(200).json({
      status: "success",
      totalSalary
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  addEmployee,
  deleteEmployee,
  getEmployeesByEmail,
  getTotalSalary
};
