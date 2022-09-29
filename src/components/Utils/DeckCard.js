import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

export default function DeckCard({ deck, username }) {
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function navigateToDeck() {
        return;
        navigate(`/deck/${deck.id}`);
    }

    function deleteDeck() {
        const url = `https://superzaprecall.onrender.com/deck/${deck.id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.delete(url, config);

        promise.then((res) => {}).catch(() => {});
    }

    function openDeleteConfirm() {
        setModalIsOpen(true);
    }

    function closeDeleteConfirm() {
        setModalIsOpen(false);
    }

    return (
        <Container onClick={navigateToDeck}>
            <DeckInfo>
                {Number(deck.userId) ===
                Number(localStorage.getItem("userId")) ? (
                    <AiFillDelete onClick={openDeleteConfirm} />
                ) : (
                    <></>
                )}
                <h3>{deck.name}</h3>
                <h4>by {username}</h4>
            </DeckInfo>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Loading modal"
                overlayClassName="modal-overlay"
                className="modal-delete"
            >
                <h2>Tem certeza que deseja apagar?</h2>
                <div>
                    <Button onClick={closeDeleteConfirm}>
                        <AiOutlineClose />
                    </Button>
                    <Button onClick={deleteDeck}>
                        <AiOutlineCheck />
                    </Button>
                </div>
            </Modal>
        </Container>
    );
}

const Container = styled.div`
    width: 60%;

    padding: 20px;
    margin-bottom: 30px;

    background-color: black;
    border: 1px solid white;
    border-radius: 8px;

    position: relative;

    cursor: pointer;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const DeckInfo = styled.div`
    width: 100%;
    height: 100%;

    font-family: "Krona One", sans-serif;

    overflow: hidden;

    svg {
        color: white;
        font-size: 25px;

        position: absolute;
        right: 10px;
        top: 10px;

        z-index: 1;

        cursor: pointer;
    }

    h3 {
        margin-bottom: 15px;
        font-size: 20px;
        color: white;
    }

    h4 {
        font-size: 13px;
        color: grey;
    }

    @media (max-width: 500px) {
        h3 {
            font-size: 18px;
        }
    }
`;

const Button = styled.div`
    margin-top: 15px;

    width: 45px;
    height: 45px;

    background-color: black;
    border: 1px solid white;
    border-radius: 6px;

    color: white;
    font-size: 18px;
    line-height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    svg {
        font-size: 25px;
    }
`;
