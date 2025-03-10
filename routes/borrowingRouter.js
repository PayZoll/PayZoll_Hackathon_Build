const express = require("express");
const router = express.Router();
const borrowingRouter = require("../Controllers/borrowingController");

router.route("/").get(borrowingRouter.getBorrowingHistoryEmail);
router.route("/repay").post(borrowingRouter.repayById);
router.route("/withdraw").post(borrowingRouter.withdrawById);
router.route("/").post(borrowingRouter.borrowByEmail);

module.exports = router;
