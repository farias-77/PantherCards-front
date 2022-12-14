import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import DeckCard from "../Utils/DeckCard";

export default function Home({ setDisplayHeader }) {
    const navigate = useNavigate();
    const ONE_SECOND = 1000;

    const [username, setUsername] = useState("");
    const [decks, setDecks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if (!modalIsOpen) {
            setModalIsOpen(true);
        }

        const url = `https://superzaprecall.onrender.com/deck/user/${localStorage.getItem(
            "userId"
        )}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.get(url, config);

        promise
            .then((res) => {
                setTimeout(() => {
                    setDecks([...res.data.decks]);
                    setUsername(res.data.username);
                    setModalIsOpen(false);
                }, ONE_SECOND / 6);
            })
            .catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                setDisplayHeader(false);
                navigate("/");
            });
    }, [refresh]);

    function navigateToDeckCreation() {
        navigate("/create");
    }

    return (
        <>
            <Container>
                <HomePage>
                    <Title>
                        <h3>Seus decks</h3>
                        <Button onClick={navigateToDeckCreation}>
                            Novo deck
                        </Button>
                    </Title>
                    <Content>
                        {decks.length > 0 || modalIsOpen ? (
                            decks.map((deck, index) => (
                                <DeckCard
                                    deck={deck}
                                    username={username}
                                    key={index}
                                    setRefresh={setRefresh}
                                />
                            ))
                        ) : (
                            <h5>
                                Voc?? ainda n??o tem nenhum deck, crie clicando em
                                "Novo deck"
                            </h5>
                        )}
                    </Content>
                </HomePage>

                <Modal
                    isOpen={modalIsOpen}
                    contentLabel="Loading modal"
                    overlayClassName="modal-overlay"
                    className="modal-content"
                >
                    <Bars height="60" color="white" ariaLabel="Loading..." />
                </Modal>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;

    margin-top: 100px;

    @media (max-width: 900px) {
        margin-top: 150px;
    }
`;

const HomePage = styled.div`
    width: 50%;
    max-width: 900px;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 30px;

    @media (max-width: 900px) {
        width: 100%;

        margin-top: 10px;
        margin-bottom: 20px;

        padding: 0 25px;
    }
`;

const Title = styled.div`
    width: 100%;
    max-width: 600px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 30px;
    }

    @media (max-width: 900px) {
        width: 100%;
    }

    @media (max-width: 500px) {
        h3 {
            font-size: 20px;
        }
    }
`;

const Content = styled.div`
    width: 100%;
    max-width: 600px;

    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    > h5 {
        width: 100%;
        height: 100%;

        text-align: center;

        color: white;
        font-size: 20px;

        padding-top: 100px;
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
    text-align: center;
    color: white;

    background-color: black;

    cursor: pointer;

    @media (max-width: 900px) {
        font-size: 13px;
    }
`;
