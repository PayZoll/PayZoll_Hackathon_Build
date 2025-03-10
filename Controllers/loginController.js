const Company = require("../models/companySchema");
const { generateToken } = require("../utils/jwt");
const Employee = require("../models/employeeSchema");

const login = async (req, res) => {
  try {
    const { email, password, isEmployeer } = req.body;
    let user;
    if (isEmployeer) {
      user = await Company.findOne({ email });
    } else {
      user = await Employee.findOne({ email });
    }

    if (!user)
      return res.status(200).json({
        message: "User not found",
      });

    const isMatch = user.password === password;

    if (!isMatch)
      return res.status(200).json({
        message: "Password incorrect",
      });

    const token = generateToken({
      email: user.email,
      contractAddress: user.contractAddress,
      isEmployeer,
      company: user.name
    });

    return res.status(200).json({
      status: "success",
      message: "Login successfull",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  login,
};
