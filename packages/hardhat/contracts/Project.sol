pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract Project {
    string public projectName;
    string public projectDescription;
    address payable public benefactor;
    address payable public auditor;
    address payable public validator;
    uint256 public softCap;
    uint256 public hardCap;
    uint256 public auditor_percent;
    uint256 public validator_percent;
    uint256 public state; // 0:fondeo - 1:ejecucion - 2:validacion - 3:cerrado

    constructor(
        string memory _projectName,
        string memory _projectDescription,
        address _auditor,
        address _validator,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _auditor_percent,
        uint256 _validator_percent
    ) {
        require(_auditor_percent <= 100, "auditor % grater than 100%");
        require(_validator_percent <= 100, "validator % grater than 100%");
        require(
            (_validator_percent + _auditor_percent) <= 100,
            "validator % plus auditor % grater than 100%"
        );
        require(
            _validator != _auditor,
            "validator and auditor can't be de same"
        );
        projectName = _projectName;
        projectDescription = _projectDescription;
        auditor = payable(_auditor);
        validator = payable(_validator);
        softCap = _softCap;
        hardCap = _hardCap;
        auditor_percent = _auditor_percent;
        validator_percent = _validator_percent;
        benefactor = payable(msg.sender);
        state = 0;
    }

    modifier onlyBenefactor() {
        require(benefactor == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function startProject() public onlyBenefactor {
        require(
            address(this).balance >= softCap,
            "Contract balance less than softCap"
        );
        state = 1;
        benefactor.transfer(address(this).balance);
    }

    // to support receiving ETH by default
    receive() external payable {

    }

    fallback() external payable {

    }
}
