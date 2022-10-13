import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import DeckCard from "../Utils/DeckCard";

export default function UserPage({ setDisplayHeader, refresh }) {
    const navigate = useNavigate();
    const { userId } = useParams();
    const ONE_SECOND = 1000;

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [username, setUsername] = useState("");
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        setModalIsOpen(true);
        const url = `https://superzaprecall.onrender.com/deck/user/${userId}`;
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

    function navigateHome() {
        setModalIsOpen(true);
        setTimeout(() => {
            navigate("/home");
            setModalIsOpen(false);
        }, ONE_SECOND);
    }

    return (
        <Container>
            <HomePage>
                <Title>
                    <h3>{username}</h3>
                </Title>
                <Content>
                    {decks.length > 0 || modalIsOpen ? (
                        decks.map((deck, index) => (
                            <DeckCard
                                deck={deck}
                                username={username}
                                key={index}
                            />
                        ))
                    ) : (
                        <h5>Este usuário ainda não tem nenhum deck</h5>
                    )}
                </Content>
            </HomePage>
            <Button onClick={navigateHome}>Voltar para o menu</Button>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Loading modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <Bars height="60" color="white" ariaLabel="Loading..." />
            </Modal>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;

    padding-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 900px) {
        padding: 100px 0;
    }
`;

const HomePage = styled.div`
    width: 100%;
    max-width: 1000px;

    padding-top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 900px) {
        padding: 45px;
        padding-top: 60px;
    }
`;

const Title = styled.div`
    width: 60%;

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
        font-size: 13px;

        h3 {
            font-size: 16px;
        }
    }
`;

const Button = styled.div`
    width: 200px;
    height: 40px;

    margin-top: 120px;

    border-radius: 8px;
    border: 1px solid white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    text-align: center;
    color: white;

    background-color: black;

    cursor: pointer;
`;

const Content = styled.div`
    width: 100%;

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

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;
