const mongoose = require("mongoose");

const lendingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Lending = mongoose.model("Lending", lendingSchema);
module.exports = Lending;
