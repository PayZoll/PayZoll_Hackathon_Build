const { silentBulkTransfer } = require("../utils/web3Utils");

/**
 * Handles the bulk transfer of funds.
 */
const bulkTransfer = async (req, res) => {
    try {
        const { employees, rpcUrl } = req.body;

        if (!employees || !Array.isArray(employees)) {
            return res.status(400).json({ error: "Invalid employees list" });
        }

        console.log("Received request for bulk transfer");
        console.log("rpcUrl:", rpcUrl);
        console.log("Employees:", employees);

        const receipts = await silentBulkTransfer(
            process.env.PRIVATE_KEY,
            rpcUrl,
            employees,
            console.log
        );

        res.json({ success: true, receipts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Checks the status of the RPC URL.
 */
const checkRpc = async (req, res) => {
    try {
        console.log("Req-body", req.body);
        const { rpcUrl } = req.body;

        if (!rpcUrl) {
            return res.status(400).json({ error: "Invalid RPC URL" });
        }

        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const network = await provider.getNetwork();

        res.json({ success: true, network });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { bulkTransfer, checkRpc };
