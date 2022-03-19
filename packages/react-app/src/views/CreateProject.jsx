import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Col, Input, List, Menu, Row } from "antd";
import { Account, Address, AddressInput, Contract, Faucet, GasGauge, Header, Ramp, ThemeSwitch } from "../components";

import {
    useContractReader,
} from "eth-hooks";

const fs = require('fs')
const { utils, BigNumber } = require("ethers");

const { BufferList } = require("bl");

const CreateProject = ({ loadWeb3Modal, address, tx, readContracts, writeContracts, mainnetProvider, blockExplorer, userSigner }) => {
    const [collection, setCollection] = useState({
        loading: true,
        items: [],
    });
    const balance = useContractReader(readContracts, "EventFactory", "balanceOf", [address]);

    const name = useContractReader(readContracts, "EventFactory", "name");


    const createNewProject = async () => {
        const result = tx(
            writeContracts &&
            writeContracts.ProjectFactory &&
            writeContracts.ProjectFactory.create(newProjectName, description, auditorWallet, validatorWallet, utils.parseEther(softCap), utils.parseEther(hardCap), 2, 2),
            update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                        " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                }
            },
        );
    };


    const [description, setDescription] = useState("");
    const [newProjectName, setNewName] = useState("");
    const [auditorWallet, setAuditorWallet] = useState();
    const [validatorWallet, setValidatorWallet] = useState();
    const [softCap, setSoftCap] = useState("");
    const [hardCap, setHardCap] = useState("");

    return (
        <div style={{ maxWidth: 768, margin: "20px auto", paddingBottom: 25 }}>
            {address ? (
                <>
                    <div style={{ maxWidth: 350, margin: "20px auto" }}>
                        <h2 style={{ marginBottom: "20px" }}>New Project</h2>
                        <div style={{ display: "flex", alignItems: "center", maxWidth: 350, margin: "0 auto", marginBottom: "10px" }}>
                            <label htmlFor="name" style={{ marginRight: 10, flexGrow: 1, flex: 1, textAlign: "left" }}>
                                Project name:
                            </label>
                            <Input
                                placeholder="Project name"
                                id="name"
                                style={{ flex: 2 }}
                                value={newProjectName}
                                onChange={e => setNewName(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", maxWidth: 350, margin: "0 auto", marginBottom: "10px" }}>
                            <label htmlFor="description" style={{ marginRight: 20, flexGrow: 1, flex: 1, textAlign: "left" }}>
                                Project description:
                            </label>
                            <Input
                                placeholder="Description"
                                id="description"
                                style={{ flex: 2 }}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", maxWidth: 350, margin: "0 auto", marginBottom: "10px" }}>
                            <label htmlFor="auditor" style={{ marginRight: 20, flexGrow: 1, flex: 1, textAlign: "left" }}>
                                Auditor wallet:
                            </label>
                            <AddressInput
                                style={{ flex: 2 }}
                                address={auditorWallet}
                                onChange={setAuditorWallet}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", maxWidth: 350, margin: "0 auto", marginBottom: "10px" }}>
                            <label htmlFor="validator" style={{ marginRight: 20, flexGrow: 1, flex: 1, textAlign: "left" }}>
                                Validator wallet:
                            </label>
                            <AddressInput
                                style={{ flex: 2 }}
                                address={validatorWallet}
                                onChange={setValidatorWallet}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", maxWidth: 350, margin: "0 auto", marginBottom: "10px" }}>
                            <label htmlFor="softCap" style={{ marginRight: 20, flexGrow: 1, flex: 1, textAlign: "left" }}>
                                Minumun amount needed:
                            </label>
                            <Input
                                type="number"
                                id="softCap"
                                style={{ flex: 2 }}
                                value={softCap}
                                onChange={e => setSoftCap(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", maxWidth: 350, margin: "0 auto", marginBottom: "10px" }}>
                            <label htmlFor="hardCap" style={{ marginRight: 20, flexGrow: 1, flex: 1, textAlign: "left" }}>
                                Maximun amount needed:
                            </label>
                            <Input
                                type="number"
                                id="hardCap"
                                style={{ flex: 2 }}
                                value={hardCap}
                                onChange={e => setHardCap(e.target.value)}
                            />
                        </div>
                        <Button
                            style={{ marginTop: 15 }}
                            type="primary"
                            onClick={() => {
                                createNewProject();
                            }}
                        >
                            CREATE PROJECT
                        </Button>
                    </div>
                </>
            ) : (
                <Button key="loginbutton" type="primary" onClick={loadWeb3Modal}>
                    Connect Ethereum Wallet To Mint
                </Button>
            )}
        </div>
    );
};

export default CreateProject;
