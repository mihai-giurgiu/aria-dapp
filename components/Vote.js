import React, {Component, useState, useEffect} from 'react';
import "../styles/Vote.module.css";
import Image from "next/image";
import logo from "./images/Aria2-removebg.png";
import {useMoralisWeb3Api, useMoralis} from "react-moralis";
import Coin from "../components/Coin"
import {Button, ConnectButton} from "web3uikit";


function Vote() {
    const {logout} = useMoralis();
    const [Henry, setHenry] = useState(50);
    const [Danish, setDanish] = useState(30);
    const [Sidney, setSidney] = useState(90);
    const [Trn, setTrn] = useState(15);
    const [Slr, setSlr] = useState(90);
    const [Hir, setHir] = useState(30);
    const [Az, setAz] = useState(80);
    const [Aw, setAw] = useState(20);
    const [Go, setGo] = useState(90);
    const Web3Api = useMoralisWeb3Api();
    const {Moralis, isInitialized} = useMoralis();
    const [visible, setVisible]  = useState();

    async function getRatio(tick, setPerc) {

        const Votes = Moralis.Object.extend("Votes");
        const query = new Moralis.Query(Votes);
        console.log(query);
        query.equalTo("ticker", tick);
        query.descending("createdAt");
        const results = await query.first();
        if (results){
            console.log("Orice " + JSON.stringify(results));
            let like = Number(results.get("like"));
            console.log("String " + typeof results);
            let dislike = Number(results.get("dislike"));
            let ratio  = Math.round(like/(like + dislike)*100);
            setPerc(ratio);
        }

    }

    useEffect(() => {
        if(isInitialized){
            getRatio("Henry", setHenry);
            getRatio("Danish", setDanish);
            getRatio("Sidney",setSidney);
            getRatio("Trn", setTrn);
            getRatio("Slr", setSlr);
            getRatio("Hir",setHir);
            getRatio("Az", setAz);
            getRatio("Aw", setAw);
            getRatio("Go",setGo);
        }
    },);

    return(
        <div className= "wrapper">
            <div className="header">
                <div className= "logo">
                    <Image src={logo} width={200} height={200}/>
                </div>
                <ConnectButton className="connect"/>
                <div className="signout">
                    <Button
                        color = "#68748e"
                        onClick={logout}
                        text = "Sign out"
                        theme = "colored"
                        type = "button"
                    />
                    {/*<button  onClick={logout}>Sing out</button>*/}
                </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="question">Which of the candidates do you think should be the CEO of the company?</div>
                    <div className="answers">
                        <Coin
                            perc={Henry}
                            setPerc={setHenry}
                            token={"Henry Gibson"}
                        />

                        <Coin
                            perc={Danish}
                            setPerc={setDanish}
                            token={"Danish Yousuf"}
                        />

                        <Coin
                            perc={Sidney}
                            setPerc={setSidney}
                            token={"Sidney Roy"}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="question">What is best budget allocation for 2022?</div>
                    <div className="answers">
                        <Coin
                            perc={Trn}
                            setPerc={setTrn}
                            token={"Training"}
                        />

                        <Coin
                            perc={Slr}
                            setPerc={setSlr}
                            token={"Salary"}
                        />

                        <Coin
                            perc={Hir}
                            setPerc={setHir}
                            token={"Hiring"}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="question">Which service do you think fits the best with XDev?</div>
                    <div className="answers">
                        <Coin
                            perc={Az}
                            setPerc={setAz}
                            token={"Azure"}
                        />

                        <Coin
                            perc={Aw}
                            setPerc={setAw}
                            token={"AWS"}
                        />

                        <Coin
                            perc={Go}
                            setPerc={setGo}
                            token={"Google"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vote;