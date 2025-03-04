const { ethers } = require("ethers");

/**
 * Executes silent bulk transfers using Ethers.js.
 */
async function silentBulkTransfer(privateKey, rpcUrl, employees, onStatus) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const recipients = employees.map((employee) => employee.accountId);
        const values = employees.map((employee) => {
            if (!employee.salary) {
                throw new Error(`Invalid salary for employee: ${employee.name}`);
            }
            return ethers.parseEther(String(employee.salary));
        });

        let nonce = await provider.getTransactionCount(wallet.address, "pending");

        const receipts = [];
        for (let i = 0; i < recipients.length; i++) {
            const tx = {
                to: recipients[i],
                value: values[i],
                nonce: nonce++,
                gasLimit: 21000,
                maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
                maxFeePerGas: ethers.parseUnits("50", "gwei"),
            };

            const sentTx = await wallet.sendTransaction(tx);
            onStatus(`Transaction sent to ${recipients[i]}: ${sentTx.hash}`);
            const receipt = await sentTx.wait();
            receipts.push(receipt);
        }

        return receipts;
    } catch (error) {
        onStatus(`Error: ${error.message}`);
        throw error;
    }
}

module.exports = { silentBulkTransfer };
