const { ethers } = require("hardhat");
// const abi = [
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "initialMessage",
//         type: "string",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [],
//     name: "getMessage",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "newMessage",
//         type: "string",
//       },
//     ],
//     name: "setMessage",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

// const abi = require("./artifacts/contracts/Lock.sol/Greeting.json").abi
const abi =
  require("./artifacts/contracts/BulkTransfar.sol/BulkTransfer.json").abi;

async function main() {
  //   // Get the contract factory
  //   const Greeting = await ethers.getContractFactory("Greeting");

  //   // Deploy the contract with an initial message
  //   const greeting = await Greeting.deploy("Hello, World!");

  //   // Wait for the contract deployment to complete
  //   console.log("Deploying contract...");
  //   await greeting.waitForDeployment();

  //   console.log(greeting);
  //   console.log(`Greeting contract deployed at address: ${greeting.target}`);

  //    // Call a contract function
  //    const currentMessage = await greeting.getMessage(); // Assuming `getMessage` is a function in your contract
  //    console.log(`Current message: ${currentMessage}`);

  //    // Update the message (if your contract has a setter function)
  //    const tx = await greeting.setMessage("New Greeting!"); // Assuming `setMessage` exists
  //    await tx.wait(); // Wait for the transaction to be mined

  //    console.log("Message updated!");

  //    // Fetch the updated message
  //    const updatedMessage = await greeting.getMessage();
  //    console.log(`Updated message: ${updatedMessage}`);

  //   // Deployed contract address
  //   const contractAddress = greeting.target;

  // Connect to the deployed contract
  const provider = new ethers.InfuraProvider(
    "sepolia",
    "ade6cd81609f46ec8bd3da465bb09398"
  ); // Use the default provider

  const [signer] = await ethers.getSigners(); // Get the first account as the signer
  console.log(signer);
  const balance = await provider.getBalance(
    "0xc96EFaFD9655356DBB819F77Fc7Dd49e6Ee48e1B"
  );
  console.log(
    "balance",
    balance,
    ethers.formatEther(balance),
    signer.getAddress()
  );

  // const tx = await signer.sendTransaction({
  //     to: "0x5614E5Be24AF8e2Da4eb4c50238fC90c7A9Ab703",
  //     value: ethers.parseEther("0.01")
  // })

  // await tx.wait()

  // console.log(await provider.getBalance("0x5614E5Be24AF8e2Da4eb4c50238fC90c7A9Ab703"));
  //   const contract = new ethers.Contract(contractAddress, abi, signer);

  //   // Call a read-only function
  //   const currentMessageD = await contract.getMessage();
  //   console.log(`Current message Deploy: ${currentMessageD}`);

  //   // Call a state-changing function
  //   const txd = await contract.setMessage("Hello, Ethereum Deploy!");
  //   await txd.wait(); // Wait for the transaction to be mined

  //   console.log("Message updated!");

  //   // Verify the update
  //   const updatedMessageD = await contract.getMessage();
  //   console.log(`Updated message: ${updatedMessageD}`);
}

const check = async () => {
  //const signedTx =
  const provider = new ethers.InfuraProvider(
    "sepolia",
    "ade6cd81609f46ec8bd3da465bb09398"
  );
  const txResponse = await provider.sendTransaction(signedTx);

  // Wait for the transaction to be mined
  await txResponse.wait();
  console.log(`Transaction ${txResponse.hash} mined successfully!`);
};

const bulk = async () => {
    // const provider = new ethers.JsonRpcProvider("https://rpc.test.btcs.network"); // Replace with your provider URL
    // const signer = provider.getSigner(); // Replace with the actual signer (your wallet)
  
    // Compile and deploy the BulkTransfer contract
    const BulkTransfer = await ethers.getContractFactory("BulkTransfer");
    const contract = await BulkTransfer.deploy();
  
    console.log("Deploying contract...");
    await contract.waitForDeployment();
    console.log("Contract deployed at address:", contract.target); // Contract address
  
    // Prepare data for bulkSend function
    const recipients = [
      "0x5614E5Be24AF8e2Da4eb4c50238fC90c7A9Ab703", // Replace with actual addresses
      "0x8245e49F37E7A10376d30e9A62536F6741446b5F"
    ];
  
    const amounts = [
      ethers.parseEther("0.01"), // Replace with actual amounts in Ether
      ethers.parseEther("0.02")
    ];
  
    // Calculate total amount
    const totalAmount = ethers.parseEther("0.03");
  
    console.log("Sending bulk transaction...");
    const tx = await contract.bulkSend(recipients, amounts, { value: totalAmount });
    const receipt = await tx.wait(); // Wait for the transaction to be mined
  
    console.log("Bulk transaction sent!");
    console.log("Transaction hash:", receipt.transactionHash);
  };
  bulk()


  const browser = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);

      // Request accounts and get the signer (user's account from MetaMask)
      await provider.send("eth_requestAccounts", []); // Prompts MetaMask to connect
      const signer = await provider.getSigner();
      const gasPrice = ethers.parseUnits("10", "gwei");

      const tx = {
        to: "0x8245e49F37E7A10376d30e9A62536F6741446b5F", // Replace with the recipient's address
        value: ethers.parseEther("0.01"), // Sending 0.01 ETH
        gasLimit: 21000, // Gas limit for a basic ETH transfer
        gasPrice: gasPrice, // Use the fetched or fallback gas price
      };

      // Send the transaction using the signer
      console.log("Sending transaction...");
      const txResponse = await signer.sendTransaction(tx);

      console.log("Transaction sent! Waiting for confirmation...");
      const receipt = await txResponse.wait();

      console.log(`Transaction confirmed! Hash: ${receipt.transactionHash}`);
  }
// check()
// Execute the deployment script
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
