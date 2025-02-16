import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

// Create the context
const Web3Context = createContext();

// Web3Provider component
export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Initialize provider and signer
          const ethersProvider = new ethers.BrowserProvider(window.ethereum);
          const signer = await ethersProvider.getSigner();

          // Get the user's account
          const account = await signer.getAddress();
          const balance = await ethersProvider.getBalance(account);
          const currNetwork = await ethersProvider.getNetwork();

          // Set state
          setProvider(ethersProvider);
          setSigner(signer);
          setAccount(account);
          setNetwork(currNetwork);
          setBalance(balance);
        } catch (error) {
          console.error("Error initializing web3: ", error);
        }
      } else {
        console.error("Ethereum provider not found. Install MetaMask!");
      }
    };

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        setAccount(null);
        setSigner(null);
      } else {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        const updatedSigner = await ethersProvider.getSigner();
        const updatedAccount = await updatedSigner.getAddress();
        const currNetwork = await provider.getNetwork();
        const balance = await ethersProvider.getBalance(updatedAccount);
        setSigner(updatedSigner);
        setAccount(updatedAccount);
        setNetwork(currNetwork);
        setBalance(balance);
      }
    };

    const handleChainChanged = () => {
      // Refresh the page to reinitialize the app
      window.location.reload();
    };

    initWeb3();

    // Attach event listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      // Cleanup event listeners
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{ provider, signer, account, network, balance }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook for using the Web3 context
export const useWeb3 = () => {
  return useContext(Web3Context);
};
