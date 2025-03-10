const Company = require("../models/companySchema");

const register = async (req, res) => {
  try {
    const newCompany = new Company({
      name: req.body.name,
      employees: [],
      contractAddress: req.body.contractAddress,
      email: req.body.email,
      password: req.body.password,
      tokenName: req.body.tokenName,
      tokenSymbol: req.body.tokenSymbol,
      tokenCount: req.body.tokenCount
    });

    await newCompany.save();

    res.status(200).json({
      status: "success",
      message: "Company registered",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  register,
};
