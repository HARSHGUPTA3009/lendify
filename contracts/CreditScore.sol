// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditScore is Ownable {
    mapping(address => uint256) public scores;

    event ScoreUpdated(address indexed user, uint256 newScore);

    constructor() Ownable(msg.sender) {}

    function setScore(address user, uint256 score) external onlyOwner {
        require(score <= 1000, "Score must be reasonable");
        scores[user] = score;
        emit ScoreUpdated(user, score);
    }

    function getCreditScore(address user) external view returns (uint256) {
        return scores[user];
    }
}
