// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "./Project.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProjectFactory {
    using SafeMath for uint256;
    Project[] private projects;

    constructor(){}

    function create(
        address _auditor,
        address _validator,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _auditor_percent,
        uint256 _validator_percent
    ) public {
        Project p = new Project(
            _auditor,
            _validator,
            _softCap,
            _hardCap,
            _auditor_percent,
            _validator_percent
        );
        projects.push(p);
    }

    function getEvent(uint256 _tokenId)
        public
        view
        returns (
            Project pro
        )
    {
        Project p = projects[_tokenId - 1];

        return (
            p
        );
    }
}
