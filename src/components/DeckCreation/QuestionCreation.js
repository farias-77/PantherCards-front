import { DebounceInput } from "react-debounce-input";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function QuestionCreation({
    index,
    questionsArray,
    setQuestionsArray,
}) {
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
                    debounceTimeout={500}
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
                    debounceTimeout={500}
                    placeholder="Resposta"
                    value={questionData.answer}
                    onChange={(e) =>
                        setQuestionData({
                            ...questionData,
                            answer: e.target.value,
                        })
                    }
                />
                <Button>Salvar</Button>
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

    input {
        width: 100%;
        height: 40px;

        background: #ffffff;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 8px;

        margin-bottom: 20px;
        padding-left: 20px;

        line-height: 18px;
        font-weight: 400;
        font-size: 18px;
        color: #000000;

        ::placeholder {
            color: #9c9c9c;
        }
    }
`;

const Button = styled.div`
    width: 120px;
    height: 40px;

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
