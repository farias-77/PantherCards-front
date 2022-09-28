import { DebounceInput } from "react-debounce-input";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function QuestionCreation({
    index,
    questionsArray,
    setQuestionsArray,
}) {
    const ONE_SECOND = 1000;

    const [questionData, setQuestionData] = useState({
        ...questionsArray[index],
    });

    useEffect(() => {
        setQuestionsArray(
            questionsArray.map((question, questionIndex) =>
                questionIndex === index ? { ...questionData } : { ...question }
            )
        );
    }, [questionData]);

    return (
        <Container>
            <p>Pergunta {index + 1}</p>
            <Question>
                <DebounceInput
                    debounceTimeout={ONE_SECOND}
                    placeholder="Pergunta"
                    value={questionData.question}
                    onChange={(e) =>
                        setQuestionData({
                            ...questionData,
                            question: e.target.value,
                        })
                    }
                />
                <DebounceInput
                    debounceTimeout={ONE_SECOND}
                    placeholder="Resposta"
                    value={questionData.answer}
                    onChange={(e) =>
                        setQuestionData({
                            ...questionData,
                            answer: e.target.value,
                        })
                    }
                />
            </Question>
        </Container>
    );
}

const Container = styled.div`
    width: 60%;

    p {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 15px;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    @media (max-width: 900px) {
        width: 85%;

        p {
            font-size: 13px;
        }
    }
`;

const Question = styled.div`
    width: 100%;
    padding: 20px;

    border: 1px solid white;
    border-radius: 12px;
    background-color: black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
        width: 100%;
        height: 40px;

        background: #ffffff;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 8px;

        padding-left: 20px;

        line-height: 18px;
        font-weight: 400;
        font-size: 18px;
        color: #000000;

        margin: 7px 0;

        ::placeholder {
            color: #9c9c9c;
        }
    }

    @media (max-width: 900px) {
        padding: 8px 15px;

        input {
            height: 40px;
            border-radius: 6px;
            font-size: 15px;
            padding-left: 10px;
        }
    }
`;

const Controls = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
`;

const Button = styled.div`
    width: 120px;
    height: 40px;

    margin: 0 10px;

    border-radius: 8px;
    border: 1px solid white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Krona One", sans-serif;
    font-size: 15px;
    color: white;

    background-color: black;

    cursor: pointer;
`;
