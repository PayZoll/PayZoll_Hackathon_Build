// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Lending {
    // Event to log deposits
    event Deposit(address indexed sender, uint256 amount);

    // Event to log withdrawals
    event Withdrawal(address indexed to, uint256 amount);

    // Function to deposit Ether into the contract
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        emit Deposit(msg.sender, msg.value);
    }

    // Function to withdraw Ether from the contract
    function withdraw(uint256 amount) external {
        require(amount <= address(this).balance, "Insufficient contract balance");
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    // Function to check the contract's balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
