import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useState, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import DeckTitleCreation from "./DeckTitleCreation";
import QuestionCreation from "./QuestionCreation";

export default function DeckCreation() {
    const ONE_SECOND = 1000;
    const newQuestion = useRef();
    const navigate = useNavigate();

    const [loadingNewQuestion, setLoadingNewQuestion] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [deckNameError, setDeckNameError] = useState("");
    const [questionsError, setQuestionsError] = useState("");
    const [questionsArray, setQuestionsArray] = useState([
        { question: "", answer: "" },
    ]);

    function navigateHome() {
        setModalIsOpen(true);
        setTimeout(() => {
            navigate("/home");
            setModalIsOpen(false);
        }, ONE_SECOND);
    }

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
        }, ONE_SECOND / 2);
    }

    function postDeck() {
        if (modalIsOpen) {
            return;
        }

        const filteredQuestions = filterEmptyQuestions();
        setModalIsOpen(true);
        setDeckNameError("");
        setQuestionsError("");

        if (deckName === "") {
            setTimeout(() => {
                setModalIsOpen(false);
                setDeckNameError("Por favor, insira um nome para o deck");
            }, ONE_SECOND);
            return;
        }

        if (filteredQuestions.length === 0) {
            setTimeout(() => {
                setModalIsOpen(false);
                setQuestionsError(
                    "Você deve enviar no mínimo uma pergunta, perguntas com campos em branco são desconsideradas"
                );
            }, ONE_SECOND);
            return;
        }

        const url = "https://superzaprecall.onrender.com/deck";
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const body = { name: deckName };

        const promise = axios.post(url, body, config);

        promise
            .then((res) => {
                const deckId = res.data.id;
                insertQuestions(filteredQuestions, deckId);
                setDeckNameError("");
            })
            .catch((err) => {
                setDeckNameError(err.response.data);
                setModalIsOpen(false);
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

        promise
            .then(() => {
                setModalIsOpen(false);
                setQuestionsError("");
                navigate("/home");
            })
            .catch((err) => {
                setModalIsOpen(false);
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
                    <ErrorMessage>{deckNameError}</ErrorMessage>

                    {questionsArray.map((question, index) => (
                        <QuestionCreation
                            key={index}
                            questionsArray={questionsArray}
                            setQuestionsArray={setQuestionsArray}
                            index={index}
                        />
                    ))}

                    <ErrorMessage>{questionsError}</ErrorMessage>

                    <Controls>
                        <Button onClick={navigateHome}>
                            Voltar para o menu
                        </Button>
                        <Button onClick={addNewQuestion} ref={newQuestion}>
                            {loadingNewQuestion ? (
                                <Bars
                                    height="20"
                                    color="white"
                                    ariaLabel="Loading..."
                                />
                            ) : (
                                "Adicionar pergunta"
                            )}
                        </Button>
                        <Button onClick={postDeck}>Enviar perguntas</Button>
                    </Controls>
                </Content>
            </CreationPage>
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
        padding: 60px 0;
    }
`;

const CreationPage = styled.div`
    width: 50%;

    padding-top: 100px;

    @media (max-width: 900px) {
        width: 100%;
    }
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

    @media (max-width: 900px) {
        h3 {
            font-size: 20px;
        }
    }
`;

const Content = styled.div`
    width: 100%;
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorMessage = styled.div`
    width: 60%;
    margin-top: 15px;

    font-family: "Krona One", sans-serif;
    color: white;
    font-size: 13px;
    line-height: 16px;

    text-align: center;
`;

const Button = styled.div`
    margin-right: 10px;

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

    @media (max-width: 900px) {
        margin-bottom: 10px;
    }
`;

const Controls = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;

    margin-top: 20px;
    margin-bottom: 100px;

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
