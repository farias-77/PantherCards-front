import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import QuestionBody from "./QuestionBody";

export default function OpenDeck() {
    const ONE_SECOND = 1000;
    const { deckId } = useParams();

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
    height: 100vh;

    padding-top: 30px;

    display: flex;
    justify-content: center;

    @media (max-width: 900px) {
        margin: 100px 0;
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
    justify-content: space-between;
    align-items: center;

    font-family: "Krona One", sans-serif;
    h3 {
        color: white;
        font-size: 30px;
    }

    h4 {
        margin-left: 10px;
        font-size: 16px;
        color: grey;
    }

    @media (max-width: 900px) {
        width: 100%;
    }

    @media (max-width: 500px) {
        font-size: 13px;

        h3 {
            font-size: 20px;
        }

        h4 {
            font-size: 13px;
        }
    }
`;
