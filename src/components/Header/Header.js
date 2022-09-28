import logo from "../../assets/logoPanther.png";
import styled from "styled-components";

import SearchMobile from "./SearchMobile";
import Search from "./Search";
import Logout from "./Logout";

export default function Header({ setDisplayHeader }) {
    return (
        <Container>
            <HeaderBox>
                <Logo>
                    <img src={logo} alt="logo" />
                    <h1>PantherCards</h1>
                </Logo>
                <Search />
                <Logout setDisplayHeader={setDisplayHeader} />
            </HeaderBox>
            <SearchMobile />
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
    z-index: 1;

    @media (max-width: 900px) {
        height: 80px;
    }
`;

const HeaderBox = styled.div`
    width: 100%;
    height: 100px;

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
