import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import DeckQuestionEdit from "../Utils/DeckQuestionEdit";
import DeckTitleEdit from "../Utils/DeckTitleEdit";
import DeckPrivacyEdit from "../Utils/DeckPrivacyEdit";

export default function DeckCreation() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const newQuestion = useRef();
    const ONE_SECOND = 1000;

    const [loadingNewQuestion, setLoadingNewQuestion] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [displayLoading, setDisplayLoading] = useState(true);
    const [deckName, setDeckName] = useState("");
    const [deckQuestions, setDeckQuestions] = useState([]);
    const [deckNameError, setDeckNameError] = useState("");
    const [questionsError, setQuestionsError] = useState("");
    const [deckPrivacy, setDeckPrivacy] = useState(false);

    useEffect(() => {
        const url = `https://superzaprecall.onrender.com/deck/${deckId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.get(url, config);
        promise.then((res) => {
            setDeckName(res.data.name);
            setDeckQuestions([...res.data.questions]);
            setDeckPrivacy(res.data.isPrivate);
            setTimeout(() => setModalIsOpen(false), ONE_SECOND);
        });
    }, []);

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
            setDeckQuestions([...deckQuestions, { question: "", answer: "" }]);
            setLoadingNewQuestion(false);
            newQuestion.current.scrollIntoView({ behavior: "smooth" });
        }, ONE_SECOND / 2);
    }

    function filterEmptyQuestions() {
        const filteredQuestions = deckQuestions
            .map((question) => {
                return { question: question.question, answer: question.answer };
            })
            .filter((question) => question.question && question.answer);

        return filteredQuestions;
    }

    function closeEditConfirm() {
        setModalIsOpen(false);
    }

    function editDeck() {
        setModalIsOpen(true);
        setDisplayLoading(true);
        let filteredQuestions = filterEmptyQuestions();
        setDeckNameError("");
        setQuestionsError("");

        if (deckName === "") {
            setTimeout(() => {
                setModalIsOpen(false);
                setDisplayLoading(false);
                setDeckNameError("Por favor, insira um nome para o deck");
            }, ONE_SECOND);
            return;
        }

        if (filteredQuestions.length === 0) {
            setTimeout(() => {
                setModalIsOpen(false);
                setDisplayLoading(false);
                setQuestionsError(
                    "Você deve enviar no mínimo uma pergunta, perguntas com campos em branco são desconsideradas"
                );
            }, ONE_SECOND);
            return;
        }

        const url = `https://superzaprecall.onrender.com/deck/${deckId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.delete(url, config);

        promise
            .then((res) => {
                sendNewDeck(filteredQuestions);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function sendNewDeck(filteredQuestions) {
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
                console.log(deckId);
                sendNewQuestions(filteredQuestions, deckId);
                setDeckNameError("");
            })
            .catch((err) => {
                setDeckNameError(err.response.data);
                setModalIsOpen(false);
            });
    }

    function sendNewQuestions(questions, deckId) {
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
                setDisplayLoading(false);
                setQuestionsError("");
                navigate("/home");
            })
            .catch((err) => {
                setModalIsOpen(false);
            });
    }

    return (
        <Container>
            <EditPage>
                <Title>
                    <h3>{deckName ? `Editando: ${deckName}` : ""}</h3>
                </Title>
                <Content>
                    <DeckPrivacyEdit
                        setDeckPrivacy={setDeckPrivacy}
                        deckPrivacy={deckPrivacy}
                    />

                    {deckQuestions.length !== 0 ? (
                        <DeckTitleEdit
                            deckName={deckName}
                            setDeckName={setDeckName}
                        />
                    ) : (
                        <></>
                    )}

                    <ErrorMessage>{deckNameError}</ErrorMessage>

                    {deckQuestions.length > 0 ? (
                        deckQuestions.map((question, index) => (
                            <DeckQuestionEdit
                                key={index}
                                questionsArray={deckQuestions}
                                setQuestionsArray={setDeckQuestions}
                                index={index}
                            />
                        ))
                    ) : (
                        <></>
                    )}

                    <ErrorMessage>{questionsError}</ErrorMessage>

                    {deckQuestions.length !== 0 ? (
                        <Controls>
                            <Button onClick={addNewQuestion} ref={newQuestion}>
                                {false ? (
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
                            <Button onClick={editDeck}>Enviar deck</Button>
                        </Controls>
                    ) : (
                        <></>
                    )}
                </Content>
            </EditPage>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Loading modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                {displayLoading ? (
                    <Bars height="60" color="white" ariaLabel="Loading..." />
                ) : (
                    <>
                        <h2>Tem certeza que deseja editar o deck?</h2>
                        <div>
                            <Button onClick={closeEditConfirm}>
                                <AiOutlineClose />
                            </Button>
                            <Button onClick={editDeck}>
                                <AiOutlineCheck />
                            </Button>
                        </div>
                    </>
                )}
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

const EditPage = styled.div`
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
    width: 85%;
    max-width: 400px;
    margin-top: 15px;

    font-family: "Krona One", sans-serif;
    color: white;
    font-size: 13px;
    line-height: 16px;

    text-align: center;
`;

const Button = styled.div`
    width: 30%;
    height: 50px;

    background-color: black;
    border: 1px solid white;
    border-radius: 10px;

    color: white;
    font-size: 16px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    @media (max-width: 900px) {
        margin-bottom: 15px;
        width: 45%;
    }
`;

const Controls = styled.div`
    width: 85%;
    max-width: 400px;

    display: flex;
    justify-content: space-between;

    margin-top: 20px;
    margin-bottom: 100px;

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
