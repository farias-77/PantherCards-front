import logo from "../../assets/logoPanther.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchMobile from "./SearchMobile";
import Search from "./Search";
import Logout from "./Logout";

export default function Header({ setDisplayHeader, setRefresh }) {
    const navigate = useNavigate();

    function navigateHome() {
        navigate("/home");
    }

    return (
        <Container>
            <HeaderBox>
                <Logo onClick={navigateHome}>
                    <img src={logo} alt="logo" />
                    <h1>PantherCards</h1>
                </Logo>
                <Search setRefresh={setRefresh} />
                <Logout setDisplayHeader={setDisplayHeader} />
            </HeaderBox>
            <SearchMobile setRefresh={setRefresh} />
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    font-family: "Krona One", sans-serif;

    @media (max-width: 900px) {
        height: 80px;
    }
`;

const HeaderBox = styled.div`
    width: 100%;
    height: 100px;

    border-bottom: 1px solid white;

    display: flex;
    justify-content: space-between;

    background-color: black;
`;

const Logo = styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    position: relative;

    cursor: pointer;

    img {
        width: 90px;
    }

    h1 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 20px;
    }

    @media (max-width: 950px) {
        h1 {
            display: none;
        }
    }

    @media (max-width: 900px) {
        width: 50%;

        h1 {
            display: block;
            font-size: 15px;
        }

        img {
            width: 80px;
        }
    }
`;
