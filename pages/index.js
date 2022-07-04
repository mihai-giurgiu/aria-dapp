import Login from "../components/Login";
import Vote from "../components/Vote";
import React from 'react';
import {useMoralis} from "react-moralis";

export default function Home() {
  const {isAuthenticated, logout} = useMoralis();
  return (
    <div>
        {
            isAuthenticated ? (
                <p>
                  <Vote/>
                </p>
            ):(
                <Login/>
            )
        }
    </div>
  );
}
