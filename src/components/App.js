import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "../assets/reset.css";
import "../assets/styles.css";

import DeckCreation from "./DeckCreation/DeckCreation";
import OpenDeck from "./OpenDeck/OpenDeck";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";
import UserPage from "./UserPage/UserPage";

export default function App() {
    const [displayHeader, setDisplayHeader] = useState(
        Boolean(localStorage.getItem("token"))
    );
    const [refresh, setRefresh] = useState(false);

    return (
        <BrowserRouter>
            {displayHeader ? (
                <Header
                    setDisplayHeader={setDisplayHeader}
                    setRefresh={setRefresh}
                />
            ) : (
                <></>
            )}
            <Routes>
                <Route
                    path="/"
                    element={<SignIn setDisplayHeader={setDisplayHeader} />}
                />
                <Route path="/signUp" element={<SignUp />} />
                <Route
                    path="/home"
                    element={<Home setDisplayHeader={setDisplayHeader} />}
                />
                <Route path="/create" element={<DeckCreation />} />
                <Route path="/deck/:deckId" element={<OpenDeck />} />
                <Route
                    path="/user/:userId"
                    element={
                        <UserPage
                            setDisplayHeader={setDisplayHeader}
                            refresh={refresh}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
