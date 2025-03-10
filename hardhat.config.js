require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/ade6cd81609f46ec8bd3da465bb09398",
      accounts: ["e9081f706eecb1fff5c47dedac520d0c822550c46481e048487ab9d4c8dfb118"]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};


task("balances", "Prints the balances and addresses of accounts on Sepolia")
  .setAction(async (taskArgs, hre) => {
    const provider = hre.ethers.provider;
    const accounts = await hre.ethers.getSigners();

    console.log("Fetching accounts and balances on the Sepolia network...");
    for (const account of accounts) {
      const address = await account.getAddress();
      const balance = await provider.getBalance(account.address);
      console.log(account);
      console.log(`Address: ${address} Balance: ${balance}`);
    }
  });