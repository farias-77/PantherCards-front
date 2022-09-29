import { DebounceInput } from "react-debounce-input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import SearchOption from "./SearchOption";

export default function Search({ setRefresh }) {
    const [displayResults, setDisplayResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search) {
            setSearchResults([]);
            setDisplayResults(false);
            return;
        }

        const url = `https://superzaprecall.onrender.com/user/${search}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const promise = axios.get(url, config);
        promise.then((res) => {
            setSearchResults([...res.data]);
            setDisplayResults(true);
        });
    }, [search]);

    return (
        <Container>
            <DebounceInput
                minLength={2}
                debounceTimeout={300}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar usuários"
                value={search}
            />
            <Results display={displayResults ? "flex" : "none"}>
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <SearchOption
                            key={index}
                            result={result}
                            isLastResult={index === searchResults.length - 1}
                            setDisplayResults={setDisplayResults}
                            setRefresh={setRefresh}
                        />
                    ))
                ) : (
                    <SearchOption
                        result={{
                            username:
                                "Não encontramos nenhum usuário com esse nome",
                        }}
                        isLastResult={true}
                    />
                )}
            </Results>
        </Container>
    );
}

const Container = styled.div`
    width: 40%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    input {
        width: 100%;
        height: 50px;

        background: #ffffff;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 8px;

        padding-left: 20px;
        line-height: 18px;
        font-weight: 400;
        font-size: 18px;
        color: #000000;

        z-index: 1;

        ::placeholder {
            color: #9c9c9c;
        }
    }

    @media (max-width: 900px) {
        display: none;
    }
`;

const Results = styled.div`
    width: 100%;
    padding-top: 20px;

    display: ${(props) => props.display};
    flex-direction: column;

    position: absolute;
    top: 50%;

    background-color: black;
    border-radius: 0 0 8px 8px;
`;
