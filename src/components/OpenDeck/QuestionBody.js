import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import logo from "../../assets/pantherLogo.svg";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import { useState } from "react";

export default function QuestionBody({
    deck,
    index,
    question,
    questionFocus,
    setQuestionFocus,
}) {
    const [displayAnswer, setDisplayAnswer] = useState(false);

    function changeQuestion(next) {
        setQuestionFocus(questionFocus + next);
        setDisplayAnswer(false);
    }

    return (
        <Body>
            <QuestionData>
                <Text>
                    <h2>
                        {displayAnswer ? question.answer : question.question}
                    </h2>
                </Text>

                <Controls>
                    {index !== 0 ? (
                        <IoIosArrowBack onClick={() => changeQuestion(-1)} />
                    ) : (
                        <FakeControlDiv></FakeControlDiv>
                    )}
                    <Button onClick={() => setDisplayAnswer(!displayAnswer)}>
                        Exibir {displayAnswer ? "Pergunta" : "Resposta"}
                    </Button>

                    {index !== deck.questions.length - 1 ? (
                        <IoIosArrowForward onClick={() => changeQuestion(1)} />
                    ) : (
                        <FakeControlDiv></FakeControlDiv>
                    )}
                </Controls>
            </QuestionData>

            <img src={logo} alt="logo" />
            <OpacityBackground />
        </Body>
    );
}

const Body = styled.div`
    width: 100%;
    max-width: 500px;

    min-height: 500px;

    margin-top: 20px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: space-between;

    position: relative;

    img {
        object-fit: cover;
        border-radius: 12px;

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
    }

    background-color: white;
    border-radius: 12px;
    border: 1px solid white;

    @media (max-width: 900px) {
        min-height: 400px;
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

    border-radius: 12px;
`;

const QuestionData = styled.div`
    width: 100%;
    height: 100%;

    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    border-radius: 12px;

    h2 {
        font-size: 30px;
        color: white;
    }

    @media (max-width: 900px) {
        h2 {
            font-size: 26px;
        }
    }

    @media (max-width: 500px) {
        h2 {
            font-size: 18px;
        }
    }
`;

const Text = styled.div`
    width: 95%;
    height: 90%;

    margin-bottom: 30px;
    padding: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
`;

const Controls = styled.div`
    width: 95%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: center;

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
        font-size: 13px;
    }

    @media (max-width: 450px) {
        font-size: 10px;
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
