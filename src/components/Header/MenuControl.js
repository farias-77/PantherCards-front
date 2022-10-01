import { MdOutlineMenu } from "react-icons/md";
import styled from "styled-components";

export default function MenuControl() {
    return (
        <Container>
            <MdOutlineMenu />
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 30%;

    display: none;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;

    svg {
        font-size: 35px;
        color: white;

        cursor: pointer;
    }

    @media (max-width: 900px) {
        svg {
            font-size: 30px;
        }
    }

    @media (max-width: 900px) {
        display: flex;
    }
`;
