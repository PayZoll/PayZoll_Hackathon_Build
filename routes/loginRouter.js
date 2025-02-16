const express = require("express");
const router = express.Router();
const loginRouter = require("../Controllers/loginController");

router.route("/").post(loginRouter.login);

module.exports = router;
