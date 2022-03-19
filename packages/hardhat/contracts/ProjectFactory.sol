// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "./Project.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProjectFactory {
    using SafeMath for uint256;
    Project[] private projects;
    using Counters for Counters.Counter;
    Counters.Counter private _idCounter;

    constructor() {}

    function create(
        string memory _projectName,
        string memory _projectDescription,
        address _auditor,
        address _validator,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _auditor_percent,
        uint256 _validator_percent
    ) public {
        _idCounter.increment();
        Project p = new Project(
            _projectName,
            _projectDescription,
            _auditor,
            _validator,
            _softCap,
            _hardCap,
            _auditor_percent,
            _validator_percent
        );
        projects.push(p);
    }

    function getTotalProjects() public view returns (uint256) {
        return (_idCounter.current());
    }

    function getProject(uint256 _tokenId)
        public
        view
        returns (
            Project projectAddress,
            string memory projectName,
            string memory projectDescription,
            address auditor,
            address validator,
            uint256 softCap,
            uint256 hardCap,
            uint256 auditor_percent,
            uint256 validator_percent,
            uint256 state
        )
    {
        Project p = projects[_tokenId];
        return (
            p,
            p.projectName(),
            p.projectDescription(),
            p.auditor(),
            p.validator(),
            p.softCap(),
            p.hardCap(),
            p.auditor_percent(),
            p.validator_percent(),
            p.state()
        );
    }
}
