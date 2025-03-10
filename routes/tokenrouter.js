const express = require("express");
const router = express.Router();
const tokenRouter = require("../Controllers/tokenController");

router.route("/issue-token/:id").post(tokenRouter.issueTokenToEmployee);
router.route("/").get(tokenRouter.getTokensByCompany);
module.exports = router;
