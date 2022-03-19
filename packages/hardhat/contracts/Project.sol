pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract Project {
    address payable public benefactor;
    address payable public auditor;
    address payable public validator;
    uint256 private softCap;
    uint256 private hardCap;
    uint256 private auditor_percent;
    uint256 private validator_percent;
    uint256 private state; // 0:fondeo - 1:ejecucion - 2:validacion - 3:cerrado

    constructor(
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
