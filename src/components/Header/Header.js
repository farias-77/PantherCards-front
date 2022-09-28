import logo from "../../assets/logoPanther.png";
import styled from "styled-components";

import Search from "./Search";
import Logout from "./Logout";

export default function Header({ setDisplayHeader }) {
    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>PantherCards</h1>
            </Logo>
            <Search />
            <Logout setDisplayHeader={setDisplayHeader} />
        </Container>
    );
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
        width: 90px;
        background-color: white;
    }

    h1 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 20px;
    }
`;
