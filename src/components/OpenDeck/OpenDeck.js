import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

import logo from "../../assets/pantherLogo.svg";

export default function OpenDeck() {
    const navigate = useNavigate();
    const ONE_SECOND = 1000;
    const { deckId } = useParams();

    const [questionFocus, setQuestionFocus] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [deck, setDeck] = useState({});
    const [displayAnswer, setDisplayAnswer] = useState(false);

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
            <Body>
                <img src={logo} alt="logo" />
                <OpacityBackground />
                <QuestionData>
                    <h2>
                        {displayAnswer ? question.answer : question.question}
                    </h2>

                    <Controls>
                        {index !== 0 ? (
                            <IoIosArrowBack
                                onClick={() => {
                                    setQuestionFocus(questionFocus - 1);
                                    setDisplayAnswer(false);
                                }}
                            />
                        ) : (
                            <FakeControlDiv></FakeControlDiv>
                        )}
                        <Button
                            onClick={() => setDisplayAnswer(!displayAnswer)}
                        >
                            Exibir {displayAnswer ? "Pergunta" : "Resposta"}
                        </Button>

                        {index !== deck.questions.length - 1 ? (
                            <IoIosArrowForward
                                onClick={() => {
                                    setQuestionFocus(questionFocus + 1);
                                    setDisplayAnswer(false);
                                }}
                            />
                        ) : (
                            <FakeControlDiv></FakeControlDiv>
                        )}
                    </Controls>
                </QuestionData>
            </Body>
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

const Body = styled.div`
    width: 60%;
    height: 600px;

    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: hidden;
    position: relative;

    > h5 {
        width: 100%;
        height: 100%;

        text-align: center;

        color: white;
        font-size: 20px;

        padding-top: 100px;
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    background-color: white;
    border-radius: 12px;
    border: 1px solid white;

    @media (max-width: 900px) {
        flex-direction: column;
        width: 100%;
        height: 300px;
    }
`;

const OpacityBackground = styled.div`
    width: 100%;
    height: 100%;

    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: black;
    opacity: 90%;
`;

const QuestionData = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;

    z-index: 2;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 30px;
        color: white;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 90%;
    }

    @media (max-width: 900px) {
        h2 {
            font-size: 25px;
        }
    }
`;

const Controls = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;

    svg {
        color: white;
        font-size: 30px;

        background-color: black;
        border: 1px solid white;
        border-radius: 8px;

        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
    }

    @media (max-width: 900px) {
        svg {
            width: 30px;
            height: 30px;
            border-radius: 6px;
        }
    }
`;

const Button = styled.div`
    width: 200px;
    max-width: 200px;
    height: 40px;

    margin: 0 15px;

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
        width: calc(100% - 60px);
        height: 30px;
        font-size: 11px;
    }
`;

const FakeControlDiv = styled.div`
    width: 40px;
    height: 40px;

    @media (max-width: 900px) {
        width: 30px;
        height: 30px;
    }
`;
