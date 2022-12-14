import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useState, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import DeckQuestionEdit from "../Utils/DeckQuestionEdit";
import DeckTitleEdit from "../Utils/DeckTitleEdit";
import DeckPrivacyEdit from "../Utils/DeckPrivacyEdit";

export default function DeckCreation() {
    const ONE_SECOND = 1000;
    const navigate = useNavigate();

    const questionsErrorScroll = useRef();
    const newQuestion = useRef();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loadingNewQuestion, setLoadingNewQuestion] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [deckNameError, setDeckNameError] = useState("");
    const [questionsArray, setQuestionsArray] = useState([
        { question: "", answer: "" },
    ]);
    const [questionsError, setQuestionsError] = useState("");
    const [deckPrivacy, setDeckPrivacy] = useState(false);

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
                window.scrollTo(0, { behavior: "smooth" });
            }, ONE_SECOND);
            return;
        }

        if (filteredQuestions.length === 0) {
            setTimeout(() => {
                setModalIsOpen(false);
                setQuestionsError(
                    "Voc?? deve enviar no m??nimo uma pergunta, perguntas com campos em branco s??o desconsideradas"
                );
                questionsErrorScroll.current.scrollIntoView({
                    behavior: "smooth",
                });
            }, ONE_SECOND);
            return;
        }

        const url = "https://superzaprecall.onrender.com/deck";
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const body = { name: deckName, isPrivate: deckPrivacy };

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
            .then((res) => {
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
                    <DeckPrivacyEdit
                        setDeckPrivacy={setDeckPrivacy}
                        deckPrivacy={deckPrivacy}
                    />

                    <DeckTitleEdit
                        deckName={deckName}
                        setDeckName={setDeckName}
                    />
                    <ErrorMessage>{deckNameError}</ErrorMessage>

                    {questionsArray.map((question, index) => (
                        <DeckQuestionEdit
                            key={index}
                            questionsArray={questionsArray}
                            setQuestionsArray={setQuestionsArray}
                            index={index}
                        />
                    ))}

                    <ErrorMessage ref={questionsErrorScroll}>
                        {questionsError}
                    </ErrorMessage>

                    <Controls>
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
                        <Button onClick={navigateHome}>
                            Voltar para o menu
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
    height: 100%;

    display: flex;
    justify-content: center;

    margin-top: 100px;

    @media (max-width: 900px) {
        margin-top: 150px;
    }
`;

const CreationPage = styled.div`
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
    justify-content: center;
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

const Controls = styled.div`
    width: 85%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20px;
    margin-bottom: 40px;
`;

const Button = styled.div`
    width: 220px;
    height: 40px;

    margin-bottom: 15px;

    border-radius: 8px;
    border: 1px solid white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Krona One", sans-serif;
    text-align: center;
    font-size: 13px;
    color: white;

    background-color: black;

    cursor: pointer;

    @media (max-width: 900px) {
        width: 180px;
        font-size: 12px;
    }
`;

const ErrorMessage = styled.div`
    width: 85%;
    max-width: 400px;
    margin-top: 15px;

    font-family: "Krona One", sans-serif;
    color: white;
    font-size: 13px;
    line-height: 16px;

    text-align: center;
`;
