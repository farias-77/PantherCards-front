import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import QuestionBody from "./QuestionBody";

export default function OpenDeck() {
    const ONE_SECOND = 1000;
    const { deckId } = useParams();
    const navigate = useNavigate();

    const [questionFocus, setQuestionFocus] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const url = `https://superzaprecall.onrender.com/deck/${deckId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.get(url, config);
        promise.then((res) => {
            setDeck({ ...res.data });
            setModalIsOpen(false);
        });
    }, []);

    function navigateBack() {
        setModalIsOpen(true);
        setTimeout(() => {
            setModalIsOpen(false);
            Number(deck.userId) === Number(localStorage.getItem("userId"))
                ? navigate("/home")
                : navigate(`/user/${deck?.userId}`);
        }, ONE_SECOND);
    }

    function renderQuestions() {
        return deck.questions.map((question, index) =>
            questionBody(question, index)
        );
    }

    function questionBody(question, index) {
        if (index !== questionFocus) {
            return;
        }

        return (
            <QuestionBody
                question={question}
                index={index}
                questionFocus={questionFocus}
                setQuestionFocus={setQuestionFocus}
                deck={deck}
                setModalIsOpen={setModalIsOpen}
                key={index}
            />
        );
    }

    return (
        <Container>
            <QuestionPage>
                <Title>
                    <h3>{deck.name ? deck.name : ""}</h3>
                    <h4>{deck.user ? "by " + deck.user.username : ""}</h4>
                </Title>
                {deck.questions ? renderQuestions() : <></>}
                <Button onClick={navigateBack}>Voltar</Button>
            </QuestionPage>
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

    padding-top: 30px;

    display: flex;
    justify-content: center;

    @media (max-width: 900px) {
        padding-top: 100px;
    }
`;

const QuestionPage = styled.div`
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
    flex-direction: column;
    justify-content: center;

    font-family: "Krona One", sans-serif;

    text-align: center;

    h3 {
        color: white;
        font-size: 20px;
        line-height: 20px;
    }

    h4 {
        color: grey;
        font-size: 16px;

        margin-top: 10px;
    }

    @media (max-width: 900px) {
        width: 100%;
    }

    @media (max-width: 500px) {
        h3 {
            font-size: 16px;
        }

        h4 {
            font-size: 13px;
        }
    }
`;

const Button = styled.div`
    margin-top: 15px;

    width: 150px;
    height: 30px;

    background-color: black;
    border: 1px solid white;
    border-radius: 6px;

    color: white;
    font-size: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    @media (max-width: 900px) {
        font-size: 16px;

        width: 90px;
    }
`;
