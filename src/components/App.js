import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "../assets/reset.css";
import "../assets/styles.css";

import DeckCreation from "./DeckCreation/DeckCreation";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";

export default function App() {
    const [displayHeader, setDisplayHeader] = useState(
        Boolean(localStorage.getItem("token"))
    );

    return (
        <BrowserRouter>
            {displayHeader ? (
                <Header setDisplayHeader={setDisplayHeader} />
            ) : (
                <></>
            )}
            <Routes>
                <Route
                    path="/"
                    element={<SignIn setDisplayHeader={setDisplayHeader} />}
                />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<DeckCreation />} />
            </Routes>
        </BrowserRouter>
    );
}
