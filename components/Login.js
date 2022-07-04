import React, {Component} from 'react';
import styles from "../styles/Login.module.css";
import Image from "next/image";
import icon from "./images/Aria.svg";
import {useMoralis} from "react-moralis";

function Login() {
    const {authenticate, authError} = useMoralis();
    return(
        <div className={styles.login_container}>
            <div className={styles.login_card}>
                <Image src={icon} width={500} height={500} />
                <div className={styles.login_button}>
                    {authError && (
                        <p className={styles.login_error}>
                            {authError.name}
                            {authError.message}
                        </p>
                    )}
                    <button onClick={authenticate}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;