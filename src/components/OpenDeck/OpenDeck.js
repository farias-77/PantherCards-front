import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";

export default function OpenDeck() {
    const navigate = useNavigate();
    const ONE_SECOND = 1000;
    const { deckId } = useParams();

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const url = `https://superzaprecall.onrender.com/deck/${deckId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
    }, []);

    return (
        <Container>
            <HomePage>
                <Title></Title>
                <Content></Content>
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
