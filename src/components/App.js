import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "../assets/reset.css";
import "../assets/styles.css";

import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

export default function App() {
    const [displayHeader, setDisplayHeader] = useState(false);

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
            </Routes>
        </BrowserRouter>
    );
}
