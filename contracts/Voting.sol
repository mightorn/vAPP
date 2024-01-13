// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    string public name;
    string public description;
    string[] public candidates;
    bool public votingStatus;
    mapping(address => bool) public hasVoted;
    mapping(string => uint256) public votesReceived;

    event VoteCasted(address indexed voter, string candidate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        string[] memory _candidates
    ) {
        owner = _owner;
        name = _name;
        description = _description;
        candidates = _candidates;
        votingStatus = true;
    }

    function closeVoting() external onlyOwner {
        require(votingStatus, "Voting is already closed");
        votingStatus = false;
    }

    function vote(string memory _candidate) external {
        require(votingStatus, "Voting is closed");
        require(!hasVoted[msg.sender], "You have already voted");

        bool validCandidate = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i])) ==
                keccak256(abi.encodePacked(_candidate))
            ) {
                validCandidate = true;
                break;
            }
        }

        require(validCandidate, "Invalid candidate");

        hasVoted[msg.sender] = true;
        votesReceived[_candidate]++;

        emit VoteCasted(msg.sender, _candidate);
    }

    function getCandidates() external view returns (string[] memory) {
        return candidates;
    }

    function getVotes(
        string memory candidateName
    ) external view returns (uint256) {
        return votesReceived[candidateName];
    }
}
