// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Voting.sol";

contract VotingFactory {
    struct VotingList {
        string name;
        string description;
        address owner;
        address votingIdentifier;
        bool votingStatus;
    }

    address public owner;
    VotingList[] public votingContracts;

    event VotingCreated(
        address indexed votingAddress,
        address indexed owner,
        string name
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function createVoting(
        string memory _name,
        string memory _description,
        string[] memory _candidates
    ) external onlyOwner {
        address deploymentAddress = address(
            new Voting(msg.sender, _name, _description, _candidates)
        );
        votingContracts.push(
            VotingList(_name, _description, msg.sender, deploymentAddress, true)
        );

        emit VotingCreated(deploymentAddress, msg.sender, _name);
    }

    function getVotingContracts() external view returns (VotingList[] memory) {
        return votingContracts;
    }
}
