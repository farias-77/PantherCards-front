import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Home() {
    const [decks, setDecks] = useState([]);

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
        });
    }, []);

    console.log(decks);

    return (
        <Container>
            <HomePage>
                <Title>
                    <h3>Seus decks</h3>
                    <Button>Novo deck</Button>
                </Title>
                <Content>
                    {decks.length > 0 ? (
                        <></>
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
    width: 100vw;
    height: 100vh;

    padding-top: 100px;

    display: flex;
    justify-content: center;

    background-color: #323232;
`;

const HomePage = styled.div`
    width: 50%;

    padding-top: 100px;
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

    display: flex;
    justify-content: center;

    > h5 {
        color: white;
        font-size: 20px;

        padding-top: 100px;
    }
`;
