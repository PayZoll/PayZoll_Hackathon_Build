const express = require("express");
const router = express.Router();
const payrollRouter = require("../Controllers/payrollController");

router.route("/pending").post(payrollRouter.markPaymentsPendingAndReturnIds);

router.route("/processed").post(payrollRouter.markPendingToSuccess);

router.route("/payroll-history").get(payrollRouter.getPayrollTotalsByCompanyAndDate);
module.exports = router;
