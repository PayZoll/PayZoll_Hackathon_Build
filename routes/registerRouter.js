const express = require("express");
const router = express.Router();
const registerRouter = require("../Controllers/registerController")

router
  .route("/")
  .post(registerRouter.register)  

module.exports = router;