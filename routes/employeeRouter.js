const express = require("express");
const router = express.Router();
const employeeRouter = require("../Controllers/employeeController");

router.route("/").get(employeeRouter.getEmployeeById);
router.route("/token").get(employeeRouter.getEmployeeTokenInfo);
router.route("/payroll").get(employeeRouter.getEmployeePayrollHistory);

module.exports = router;
