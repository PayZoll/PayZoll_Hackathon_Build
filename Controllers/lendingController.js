const Lending = require("../models/lendingSchema");

const lendByEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const lending = new Lending({
      email,
      amount: req.body.amount,
      status: req.body.status,
    });

    const response = await lending.save();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const withdrawByEmail = async (req, res) => {
  try {
    const response = await Lending.findByIdAndDelete(req.body.id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getLendingHistoryByEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const history = await Lending.find({ email });
    res.status(200).json({
      status: "success",
      data: history,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  lendByEmail,
  getLendingHistoryByEmail,
  withdrawByEmail
};
