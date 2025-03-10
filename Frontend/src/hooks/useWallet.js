import { useState, useCallback } from 'react';

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState('');

  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts[0]) {
        setAddress(accounts[0]);
        setIsConnected(true);
        
        // Get balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        
        setBalance(balance);
        setError('');
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress('');
    setBalance('0');
  }, []);

  return {
    isConnected,
    address,
    balance,
    error,
    connect,
    disconnect
  };
};