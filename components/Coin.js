import React, { useEffect, useState } from "react";
import { Button } from "web3uikit";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import styles from "../styles/Vote.module.css";

function Coin({perc, setPerc, token}) {

    const contractProcessor = useWeb3ExecuteFunction();
    const {isAuthenticated} = useMoralis();

    const circleOccupiedStyle={
        width: parseFloat(perc) + '%'
    };
    const circleFreeStyle={
        width: (100 - parseFloat(perc)) + '%'
    };
    
    async function opinion(likeDislike) {

        let options = {
            contractAddress: "0xEe8F4d36b310Fed76ebB050286257717F24d12F4",
            functionName: "vote",
            abi: [
                {"inputs": [
                    {
                        "internalType":"string",
                        "name":"_tick",
                        "type":"string"
                    },
                        {"internalType":"bool",
                            "name":"_vote",
                            "type":"bool"}],
                    "name":"vote",
                    "outputs":[],
                    "stateMutability":"nonpayable",
                    "type":"function"}
            ],
            params: {
              _tick: token,
              _vote: likeDislike,
            },
        };

        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                console.log("vote succses");
            },
            onError: (error => {
                alert("error voting");
                console.log(error);
            })
        });

    }

    return (
        <>
            <div>
                <div className="token">
                    {token}
                </div>
                <div className="bar">
                    <div className="bar-occupied" style={circleOccupiedStyle}>

                    </div>
                    <div className="bar-free" style={circleFreeStyle}>

                    </div>

                    <div className="perc">
                    {perc}%
                </div>
                </div>

                <div className="votes">
                    <Button
                    onClick={()=> {if (isAuthenticated){
                        opinion(true)
                    }else {
                        alert("Authentificate to vote")
                    }}}
                    text = "Like"
                    theme = "primary"
                    type = "button"
                    />

                    <Button
                        color = "red"
                        onClick={()=> {if(isAuthenticated){
                            opinion(false);
                        }else {
                            alert("Authentificate to vote");
                        }}}
                        text = "Dislike"
                        theme = "colored"
                        type = "button"
                    />

                </div>

            </div>
        </>
    );
}

export default Coin;