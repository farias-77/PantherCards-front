import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useState, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import DeckTitleCreation from "./DeckTitleCreation";
import QuestionCreation from "./QuestionCreation";

Modal.setAppElement(".root");

export default function DeckCreation() {
    const HALF_SECOND = 500;
    const newQuestion = useRef();
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loadingNewQuestion, setLoadingNewQuestion] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [questionsArray, setQuestionsArray] = useState([
        { question: "", answer: "" },
    ]);

    function addNewQuestion() {
        if (loadingNewQuestion) {
            return;
        }

        setLoadingNewQuestion(true);
        setTimeout(() => {
            setQuestionsArray([
                ...questionsArray,
                { question: "", answer: "" },
            ]);
            setLoadingNewQuestion(false);
            newQuestion.current.scrollIntoView({ behavior: "smooth" });
        }, HALF_SECOND);
    }

    function postDeck() {
        if (modalIsOpen) {
            return;
        }

        setModalIsOpen(true);

        const filteredArray = filterEmptyQuestions();

        const url = "https://superzaprecall.onrender.com/deck";
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const body = { name: deckName };

        const promise = axios.post(url, body, config);

        promise.then((res) => {
            const deckId = res.data.id;
            insertQuestions(filteredArray, deckId);
        });
    }

    function filterEmptyQuestions() {
        const filteredQuestions = questionsArray.filter(
            (question) => question.question && question.answer
        );

        return filteredQuestions;
    }

    function insertQuestions(questions, deckId) {
        const url = `https://superzaprecall.onrender.com/deck/questions/${deckId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const body = { questions };

        const promise = axios.post(url, body, config);

        promise.then(() => {
            setModalIsOpen(false);
            navigate("/home");
        });
    }

    return (
        <Container>
            <CreationPage>
                <Title>
                    <h3>Crie um novo deck!</h3>
                </Title>
                <Content>
                    <DeckTitleCreation
                        deckName={deckName}
                        setDeckName={setDeckName}
                    />

                    {questionsArray.map((question, index) => (
                        <QuestionCreation
                            key={index}
                            questionsArray={questionsArray}
                            setQuestionsArray={setQuestionsArray}
                            index={index}
                        />
                    ))}

                    <Controls>
                        <NewQuestion onClick={addNewQuestion} ref={newQuestion}>
                            {loadingNewQuestion ? (
                                <Bars
                                    height="20"
                                    color="white"
                                    ariaLabel="Loading..."
                                />
                            ) : (
                                "Adicionar pergunta"
                            )}
                        </NewQuestion>
                        <SendDeck onClick={postDeck}>Enviar perguntas</SendDeck>
                    </Controls>
                </Content>
            </CreationPage>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Loading modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <Bars height="70" color="white" ariaLabel="Loading..." />
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
`;

const CreationPage = styled.div`
    width: 50%;

    padding-top: 100px;
`;

const Title = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;

    h3 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 30px;
        margin-bottom: 20px;
    }
`;

const Content = styled.div`
    width: 100%;
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    > h5 {
        color: white;
        font-size: 20px;

        padding-top: 100px;
    }
`;

const NewQuestion = styled.div`
    margin-top: 15px;
    margin-bottom: 100px;
    margin-right: 10px;

    width: 200px;
    height: 40px;

    background-color: black;
    border: 1px solid white;
    border-radius: 10px;

    color: white;
    font-size: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const SendDeck = styled.div`
    margin-left: 10px;

    margin-top: 15px;
    margin-bottom: 100px;

    width: 180px;
    height: 40px;

    background-color: black;
    border: 1px solid white;
    border-radius: 10px;

    color: white;
    font-size: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Controls = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
`;
