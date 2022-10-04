import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";

export default function DeckTitleEdit({ deckName, setDeckName }) {
    return (
        <Container>
            <p>Título</p>
            <Title>
                <DebounceInput
                    min={2}
                    debounceTimeout={0}
                    placeholder="Título do deck"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    maxLength={20}
                />
                <p>{20 - deckName.length}</p>
            </Title>
        </Container>
    );
}

const Container = styled.div`
    width: 85%;
    max-width: 400px;

    > p {
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
    padding: 15px;

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

    > p {
        color: white;
        font-size: 15px;
        margin-top: 10px;

        width: 100%;
        text-align: right;
    }

    @media (max-width: 900px) {
        padding: 15px;

        input {
            height: 35px;
            border-radius: 6px;
            font-size: 15px;
            padding-left: 10px;
        }
    }
`;
