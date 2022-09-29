import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import DeckCard from "./DeckCard";

export default function Home() {
    const navigate = useNavigate();

    const [decks, setDecks] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const url = `https://superzaprecall.onrender.com/deck/user/${localStorage.getItem(
            "userId"
        )}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.get(url, config);

        promise.then((res) => {
            setDecks([...res.data.decks]);
            setUsername(res.data.username);
        });
    }, []);

    function navigateToDeckCreation() {
        navigate("/create");
    }

    return (
        <Container>
            <HomePage>
                <Title>
                    <h3>Seus decks</h3>
                    <Button onClick={navigateToDeckCreation}>Novo deck</Button>
                </Title>
                <Content>
                    {decks.length > 0 ? (
                        decks.map((deck) => (
                            <DeckCard deck={deck} username={username} />
                        ))
                    ) : (
                        <h5>
                            Você ainda não tem nenhum deck, crie clicando em
                            "Novo deck"
                        </h5>
                    )}
                </Content>
            </HomePage>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;

    padding-top: 100px;

    display: flex;
    justify-content: center;

    @media (max-width: 900px) {
        padding-bottom: 100px;
    }
`;

const HomePage = styled.div`
    width: 50%;

    padding-top: 100px;

    @media (max-width: 900px) {
        width: 100%;
        padding: 25px;
        padding-top: 60px;
    }
`;

const Title = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;

    h3 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 30px;
    }
`;

const Button = styled.div`
    width: 150px;
    height: 40px;

    border-radius: 8px;
    border: 1px solid white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Krona One", sans-serif;
    color: white;

    background-color: black;

    cursor: pointer;
`;

const Content = styled.div`
    width: 100%;

    padding-top: 50px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    > h5 {
        width: 100%;
        height: 100%;

        text-align: center;

        color: white;
        font-size: 20px;

        padding-top: 100px;
    }

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;
