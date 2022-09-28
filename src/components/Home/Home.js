import styled from "styled-components";

export default function Home() {
    return (
        <Container>
            <HomePage></HomePage>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #323232;
`;

const HomePage = styled.div`
    width: 60%;
    height: 100px;

    background-color: yellow;
`;
