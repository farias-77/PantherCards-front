import { useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";

import DeckTitleCreation from "./DeckTitleCreation";
import QuestionCreation from "./QuestionCreation";

export default function DeckCreation() {
    const HALF_SECOND = 500;

    const [loading, setLoading] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [questionsArray, setQuestionsArray] = useState([
        { question: "", answer: "" },
    ]);

    function addNewQuestion() {
        setLoading(true);
        setTimeout(() => {
            setQuestionsArray([
                ...questionsArray,
                { question: "", answer: "" },
            ]);
            setLoading(false);
        }, HALF_SECOND);
    }

    console.log(questionsArray);

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

                    <NewQuestion onClick={addNewQuestion}>
                        {loading ? (
                            <Bars
                                height="20"
                                color="white"
                                ariaLabel="Loading..."
                            />
                        ) : (
                            "Adicionar pergunta"
                        )}
                    </NewQuestion>
                </Content>
            </CreationPage>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
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
