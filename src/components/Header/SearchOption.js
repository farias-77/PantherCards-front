import styled from "styled-components";

export default function SearchOption({ result, isLastResult }) {
    return (
        <Container
            isLastResult={isLastResult}
            isNotFound={result.id ? false : true}
        >
            {result.username}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    padding-left: 20px;

    display: flex;
    align-items: center;

    border-radius: ${(props) => (props.isLastResult ? "0 0 8px 8px" : "0")};
    background-color: #e7e7e7;

    font-size: 18px;

    &:hover {
        ${(props) =>
            props.isNotFound
                ? ""
                : "cursor: pointer; background-color: #c1c1c1;"}
    }

    @media (max-width: 900px) {
        height: 35px;
        font-size: 15px;
    }
`;
