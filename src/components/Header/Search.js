import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Search() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!search) {
            return;
        }

        const url = `https://superzaprecall.onrender.com/user/${search}`;
        const promise = axios.get(url); //add token
        promise.then((res) => {
            setSearchResults([...res.data]);
        });
    }, [search]);

    return (
        <Container>
            <input
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />
        </Container>
    );
}

const Container = styled.div`
    width: 40%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
        width: 100%;
        height: 50px;

        background: #ffffff;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;

        font-family: "Lexend Deca", sans-serif;
        padding-left: 20px;
        line-height: 18px;
        font-weight: 400;
        font-size: 18px;
        color: #000000;

        ::placeholder {
            color: #9c9c9c;
        }
    }
`;
