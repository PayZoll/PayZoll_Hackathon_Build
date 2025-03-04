const express = require("express");
const router = express.Router();
const { bulkTransfer, checkRpc } = require("../Controllers/bulkTransferController");

router.post("/bulk-transfer", bulkTransfer);
router.post("/check-rpc", checkRpc);

module.exports = router;
