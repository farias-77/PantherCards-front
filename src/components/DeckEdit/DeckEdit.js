import { useParams, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import DeckTitleEdit from "./DeckTitleEdit";

export default function DeckCreation() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const newQuestion = useRef();
    const ONE_SECOND = 1000;

    const [loadingNewQuestion, setLoadingNewQuestion] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [deckName, setDeckName] = useState("");
    const [deckQuestions, setDeckQuestions] = useState([]);

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
            setModalIsOpen(false);
        });
    }, []);

    function navigateHome() {
        setModalIsOpen(true);
        setTimeout(() => {
            navigate("/home");
            setModalIsOpen(false);
        }, ONE_SECOND);
    }

    function renderQuestions() {
        return deckQuestions.map((question, index) =>
            questionBody(question, index)
        );
    }

    function questionBody(question, index) {
        return <></>;
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
        const filteredQuestions = deckQuestions.filter(
            (question) => question.question && question.answer
        );

        return filteredQuestions;
    }

    return (
        <Container>
            <EditPage>
                <Title>
                    <h3>{deckName ? `Editando: ${deckName}` : ""}</h3>
                </Title>
                <Content>
                    <DeckTitleEdit
                        deckName={deckName}
                        setDeckName={setDeckName}
                    />

                    <Controls>
                        <Button
                            onClick={() => console.log("")}
                            ref={newQuestion}
                        >
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
                        <Button onClick={() => console.log("")}>
                            Enviar deck
                        </Button>
                    </Controls>
                </Content>
            </EditPage>
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
