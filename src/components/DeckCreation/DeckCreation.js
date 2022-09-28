import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import DeckTitleCreation from "./DeckTitleCreation";

export default function DeckCreation() {
    const [questions, setQuestions] = useState([]);

    return (
        <Container>
            <CreationPage>
                <Title>
                    <h3>Crie um novo deck!</h3>
                </Title>
                <Content>
                    <DeckTitleCreation />
                    <DeckQuestionCreation />
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

    background-color: #323232;
`;

const CreationPage = styled.div`
    width: 50%;

    padding-top: 100px;
`;

const Title = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;

    h3 {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 30px;
    }
`;

const Content = styled.div`
    width: 100%;
    margin-top: 30px;

    display: flex;
    justify-content: center;

    > h5 {
        color: white;
        font-size: 20px;

        padding-top: 100px;
    }
`;
