import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Col, Input, List, Menu, Row, Divider } from "antd";
import { Account, Address, AddressInput, Faucet, GasGauge, Header, Ramp, ThemeSwitch, EtherInput } from "../components";
import { ethers } from "ethers";
import { Transactor } from "../helpers";
import { Contract } from "@ethersproject/contracts";
import ProjectABI from "../abi/Project.abi.json";
import axios from "axios";
import {
    useBalance,
    useContractLoader,
    useContractReader,
    useGasPrice,
    useOnBlock,
    useUserProviderAndSigner,
} from "eth-hooks";

import { formatEther } from "@ethersproject/units";
import { usePoller } from "eth-hooks";


const { BufferList } = require("bl");

const BOOSTPERCENT = 0


const OPENSEA_LINK = "https://testnets.opensea.io/assets/"



const ProjectsUI = ({ loadWeb3Modal, address, tx, readContracts, writeContracts, mainnetProvider, blockExplorer,
    localProvider, userSigner, data }) => {
    const [collection, setCollection] = useState({
        loading: true,
        items: [],
    });

    var eventContract = null;

    const getContract = async () => {
        // if (eventContract == null)
        //     eventContract = await new Contract(eventAdd, ProjectABI, userSigner);
        return eventContract;
    };

    const setContract = async () => {
        //  if (eventContract == null)
        //      eventContract = await new Contract(eventAdd, ProjectABI, userSigner);

        await getEventBalance();
    };


    const loadCollection = async () => {
        await setContract();
        console.log("eventContract:", eventContract)
        if (!address || !readContracts || !writeContracts) return;
        setCollection({
            loading: true,
            items: [],
        });
        const balance = (await eventContract.balanceOf(address)).toNumber();
        //console.log("YOUR BALANCE:", balance)
        const collectibleUpdate = [];
        //setYourCollectibles(collectibleUpdate);
        const tokensPromises = [];
        for (let i = 0; i < balance; i += 1) {
            //    tokensPromises.push({ id: i, uri: await getTokenURI(address, i), owner: address });
        }
        const tokens = await Promise.all(tokensPromises);
        setCollection({
            loading: false,
            items: tokens,
        });
    };

    const getEventBalance = async () => {
        const balanceETH = await eventContract.getBalance();
        //console.log("balanceETH", balanceETH)
        setBalanceETH(ethers.utils.formatUnits(balanceETH, 18));
    };
    useEffect(() => {
        if (readContracts.EventFactory) loadCollection();
    }, [address, readContracts, writeContracts]);

    //console.log("collection.items", collection.items)
    //console.log("collection.items", collection.items.lenght)


    const [contractBalance, setBalanceETH] = useState("");
    const [amount, setAmount] = useState();

    return (
        <div style={{ maxWidth: 968, margin: "20px auto", paddingBottom: 25 }}>
            {address ? (
                <>
                    <div style={{ width: 640, margin: "auto", marginTop: 2, paddingBottom: 32 }}>
                        <div style={{ padding: 32, width: 400, margin: "auto" }}>
                            <div>Name: {data.projectName}</div>
                            <div>Description: {data.projectDescription}</div>
                            <div>Auditor: {data.auditor}</div>
                            <div>Validator: {data.validator}</div>
                            <div>Minimun required: {ethers.utils.formatUnits(data.softCap, 18)}</div>
                            <div>Maximun required: {ethers.utils.formatUnits(data.hardCap, 18)}</div>
                        
                            <div>Contract balance: {contractBalance}</div>
                        </div>
                    </div>
                    <div style={{ padding: 32, width: 400, margin: "auto" }}>
                        Amount to donate:
                        <EtherInput
                            value={amount}
                            onChange={value => {
                                setAmount(value);
                            }}
                        />
                    </div>
                    <Button
                        style={{ marginTop: 15 }}
                        type="primary"
                        onClick={() => {
                            let value;
                            try {
                                value = ethers.utils.parseEther("" + amount);
                            } catch (e) {
                                // failed to parseEther, try something else
                                value = ethers.utils.parseEther("" + parseFloat(amount).toFixed(8));
                            }
                            tx({
                                to: data.projectAddress,
                                value,
                            });
                        }}
                    >
                        DONATE
                    </Button>

                    <Divider />
                </>
            ) : (
                <Button key="loginbutton" type="primary" onClick={loadWeb3Modal}>
                    Connect Ethereum Wallet To Mint
                </Button>
            )}
        </div>

    );
};

export default ProjectsUI;
