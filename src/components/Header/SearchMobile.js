import { DebounceInput } from "react-debounce-input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import SearchOption from "./SearchOption";

export default function SearchMobile() {
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
                            result={result}
                            isLastResult={index === searchResults.length - 1}
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
    display: none;

    @media (max-width: 900px) {
        width: 90%;
        height: 100%;

        margin-top: 10px;

        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;

        input {
            width: 100%;
            height: 50px;

            background: #ffffff;
            border: 1px solid rgba(120, 177, 89, 0.25);
            box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
            border-radius: 12px;

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
    }
`;

const Results = styled.div`
    width: 100%;
    padding-top: 30px;

    display: ${(props) => props.display};
    flex-direction: column;

    position: absolute;
    top: 50%;

    background-color: #e7e7e7;
    border-radius: 0 0 8px 8px;
`;
