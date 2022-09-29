import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import { useState } from "react";
import Modal from "react-modal";

export default function SearchOption({
    result,
    isLastResult,
    setDisplayResults,
    setRefresh,
    setSearch,
}) {
    const navigate = useNavigate();
    const HALF_SECOND = 500;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function navigateUserPage() {
        if (!result.id) {
            return;
        }

        setModalIsOpen(true);
        setDisplayResults(false);
        setSearch("");

        setTimeout(() => {
            Number(result.id) === Number(localStorage.getItem("userId"))
                ? navigate("/home")
                : navigate(`/user/${result.id}`);
            setRefresh((refresh) => !refresh);
            setModalIsOpen(false);
        }, HALF_SECOND);
    }

    return (
        <>
            <Container
                isLastResult={isLastResult}
                isNotFound={result.id ? false : true}
                onClick={navigateUserPage}
            >
                {result.username}
            </Container>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Loading modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <Bars height="60" color="white" ariaLabel="Loading..." />
            </Modal>
        </>
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

    font-size: 15px;

    &:hover {
        ${(props) =>
            !props.isNotFound
                ? "cursor: pointer; background-color: #c1c1c1;"
                : ""}
    }

    @media (max-width: 900px) {
        height: 35px;
        padding: 0 10px;

        font-size: 15px;

        ${(props) => (props.isNotFound ? "justify-content: center;" : "")}
    }
`;
