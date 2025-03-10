const express = require("express");
const router = express.Router();
const lendingRouter = require("../Controllers/lendingController");

router.route("/").get(lendingRouter.getLendingHistoryByEmail);
router.route("/withdraw").post(lendingRouter.withdrawByEmail);
router.route("/").post(lendingRouter.lendByEmail);

module.exports = router;
