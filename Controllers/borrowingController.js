const Borrowing = require("../models/borrowingSchema");
const Lending = require("../models/lendingSchema");

const borrowByEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const borrowing = new Borrowing({
      email,
      collateralAmount: req.body.collateralAmount,
      borrowAmount: req.body.borrowAmount,
      lendingId: req.body.lendingId,
    });

    const borrowResponse = await borrowing.save();

    const lendingResponse = await Lending.findByIdAndUpdate(
      req.body.lendingId,
      { status: false },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      borrowResponse,
      lendingResponse,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const repayById = async (req, res) => {
  try {
    const response = await Borrowing.findByIdAndUpdate(
      req.body.id,
      {
        borrowAmount: 0,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      response,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const withdrawById = async (req, res) => {
  try {
    const borrowResponse = await Borrowing.findByIdAndDelete(req.body.borrowId);
    const lendResponse = await Lending.findByIdAndUpdate(
      req.body.lendingId,
      {
        status: true,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      borrowResponse,
      lendResponse,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getBorrowingHistoryEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const response = await Borrowing.find({ email }).populate("lendingId");

    res.status(200).json({
      status: "success",
      response,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  borrowByEmail,
  getBorrowingHistoryEmail,
  repayById,
  withdrawById,
};
