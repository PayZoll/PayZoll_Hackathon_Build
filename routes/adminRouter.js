const express = require("express");
const router = express.Router();
const adminRouter = require("../Controllers/adminController");

router.route("/add-emp").post(adminRouter.addEmployee);

router.route("/:id").delete(adminRouter.deleteEmployee);

router.route("/get-all-empolyees").get(adminRouter.getEmployeesByEmail)

router.route("/get-total-salary").get(adminRouter.getTotalSalary)

module.exports = router;
