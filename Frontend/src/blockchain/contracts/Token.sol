// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor(string memory tokenName, string memory tokenSymbol, uint256 initialSupply) ERC20(tokenName, tokenSymbol) Ownable(_msgSender()) {
        _mint(_msgSender(), initialSupply);
    }

    // Function to mint new tokens (only owner can call this)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Function to burn tokens from the caller's account
    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }

    // Function to burn tokens from a specific account (only owner can call this)
    function burnFrom(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }

    // Function to pause and resume transfers (if needed in the future)
    bool private _paused;

    modifier whenNotPaused() {
        require(!_paused, "Token transfers are paused");
        _;
    }

    function pause() external onlyOwner {
        _paused = true;
    }

    function unpause() external onlyOwner {
        _paused = false;
    }

    // Function to retrieve the current paused state
    function isPaused() external view returns (bool) {
        return _paused;
    }

    // Function to allow users to approve and transferFrom in a single transaction
    function approveAndTransferFrom(
        address from,
        address to,
        uint256 amount
    ) external {
        _approve(from, _msgSender(), amount);
        transferFrom(from, to, amount);
    }

    // Retrieve the current owner (inherited from Ownable)
    function getOwner() external view returns (address) {
        return owner();
    }

    function bulkTransfer(address[] calldata recipients, uint256[] calldata values) external payable onlyOwner {
        require(recipients.length == values.length, "Recipients and values arrays must have the same length.");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < values.length; i++) {
            totalAmount += values[i];
        }

        require(totalAmount <= msg.value, "Insufficient Ether provided for the transfer.");

        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: values[i]}("");
            require(success, "Transfer failed for one or more recipients.");
        }
    }
}
