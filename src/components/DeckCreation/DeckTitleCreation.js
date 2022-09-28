import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

export default function DeckTitleCreation({ deckName, setDeckName }) {
    return (
        <Container>
            <p>Título</p>
            <Title>
                <DebounceInput
                    debounceTimeout={500}
                    placeholder="Título do deck"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                />
            </Title>
        </Container>
    );
}

const Container = styled.div`
    width: 60%;

    p {
        font-family: "Krona One", sans-serif;
        color: white;
        font-size: 15px;
        margin-bottom: 20px;
    }

    @media (max-width: 900px) {
        width: 85%;

        p {
            font-size: 13px;
        }
    }
`;

const Title = styled.div`
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

        ::placeholder {
            color: #9c9c9c;
        }
    }

    @media (max-width: 900px) {
        padding: 15px;

        input {
            height: 30px;
            border-radius: 6px;
            font-size: 15px;
            padding-left: 10px;
        }
    }
`;
