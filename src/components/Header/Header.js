import logo from "../../assets/logo.svg";
import styled from "styled-components";

import Search from "./Search";
import Logout from "./Logout";

export default function Header() {
    function getTokenFromLocalStorage() {
        const token = localStorage.getItem("token");

        if (token) return true;

        return false;
    }

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

    return getTokenFromLocalStorage() ? returnHeader() : <></>;
}

const Container = styled.div`
    width: 100%;
    height: 100px;
    background-color: black;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    width: 30%;
    height: 100%;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding-left: 30px;

    img {
        width: 100px;
        background-color: white;
    }

    h1 {
        color: white;
        font-size: 20px;
    }
`;
