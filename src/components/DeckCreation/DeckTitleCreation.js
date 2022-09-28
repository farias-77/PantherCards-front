import styled from "styled-components";

export default function DeckTitleCreation({ deckName, setDeckName }) {
    return (
        <Container>
            <input
                placeholder="Nome do deck"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
            />
            <Button>Salvar</Button>
        </Container>
    );
}

const Container = styled.div`
    width: 60%;
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
