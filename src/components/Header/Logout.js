import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";

export default function Logout({ setDisplayHeader }) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        setDisplayHeader(false);
        navigate("/");
    }

    return (
        <Container>
            <IoIosLogOut onClick={logout} />
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
