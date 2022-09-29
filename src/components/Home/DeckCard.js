import styled from "styled-components";

export default function DeckCard({ deck, username }) {
    return (
        <Container>
            <DeckInfo>
                <h3>{deck.name}</h3>
                <h4>by {username}</h4>
            </DeckInfo>
        </Container>
    );
}

const Container = styled.div`
    width: 30%;

    padding: 20px;
    margin-bottom: 30px;

    background-color: black;
    border: 1px solid white;
    border-radius: 8px;

    cursor: pointer;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const DeckInfo = styled.div`
    width: 100%;
    height: 100%;

    font-family: "Krona One", sans-serif;

    h3 {
        margin-bottom: 15px;
        font-size: 20px;
        color: white;
    }

    h4 {
        font-size: 13px;
        color: grey;
    }
`;
