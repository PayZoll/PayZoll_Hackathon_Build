const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  collateralAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  borrowAmount: {
    type: Number,
    required: true,
  },
  lendingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lending",
  },
});

const Borrowing = mongoose.model("Borrowing", borrowingSchema);
module.exports = Borrowing;
