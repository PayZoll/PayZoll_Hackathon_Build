// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Greeting {
    string private message;

    // Constructor to initialize the message
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    // Function to set the message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    // Function to get the message
    function getMessage() public view returns (string memory) {
        return message;
    }
}
