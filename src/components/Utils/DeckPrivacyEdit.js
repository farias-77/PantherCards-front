import styled from "styled-components";
import Switch from "react-switch";

export default function DeckPrivacyEdit({ deckPrivacy, setDeckPrivacy }) {
    function handleSwitch() {
        setDeckPrivacy(!deckPrivacy);
    }

    return (
        <Container>
            <p>Deck privado?</p>
            <Switch onChange={handleSwitch} checked={deckPrivacy === true} />
        </Container>
    );
}

const Container = styled.div`
    width: 85%;
    max-width: 400px;

    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 15px;
    }

    @media (max-width: 900px) {
        width: 85%;

        p {
            font-size: 13px;
        }
    }
`;
