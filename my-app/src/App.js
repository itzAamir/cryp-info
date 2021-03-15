import React, { useEffect, createContext, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Alerts from "./components/Alerts";
import CoinPage from "./components/CoinPage";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import firebaseApp from "./firebase/config";

const USER = createContext("");

const App = () => {
    const [currUser, setCurrUser] = useState("");

    useEffect(() => {
        const signIn = () => {
            firebaseApp.auth().onAuthStateChanged((user) => {
                if (user) {
                    setCurrUser(user);
                } else {
                    console.log("User is signed out");
                }
            });
            return;
        }
        signIn()
    }, [])

    return (
        <>
            <USER.Provider value={currUser}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/crypto/:id" component={CoinPage} />
                    <Route exact path="/alerts" component={Alerts} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route exact path="/login" component={LoginPage} />
                </Switch>
            </USER.Provider>
        </>
    );
}

export {
    USER, App as default
}