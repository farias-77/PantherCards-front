import logo from "../../assets/logoPanther.png";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Search from "./Search";
import Logout from "./Logout";

export default function Header() {
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    function returnHeader() {
        return (
            <Container>
                <Logo>
                    <img src={logo} alt="logo" />
                    <h1>PantherCards</h1>
                </Logo>
                <Search />
                <Logout />
            </Container>
        );
    }

    return token ? returnHeader() : <></>;
}

const Container = styled.div`
    width: 100%;
    height: 100px;
    background-color: black;

    display: flex;

    z-index: 1;
`;

const Logo = styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding-left: 30px;

    position: relative;

    img {
        z-index: 3;
        width: 100px;
        background-color: white;
    }

    h1 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 20px;
    }
`;

const WhiteBackGround = styled.div`
    background-color: white;

    width: 80px;
    height: 100%;

    position: absolute;
    left: 35px;
    z-index: 2;
`;
