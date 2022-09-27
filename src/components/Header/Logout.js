import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";

export default function Logout() {
    return (
        <Container>
            <IoIosLogOut />
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 30%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;

    svg {
        font-size: 35px;
        color: white;

        cursor: pointer;
    }
`;
