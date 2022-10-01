import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

export default function DeckCard({ deck, username, setRefresh }) {
    const navigate = useNavigate();
    const ONE_SECOND = 1000;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);

    function navigateToDeck() {
        navigate(`/deck/${deck.id}`);
    }

    function navigateToEdit() {
        navigate(`/edit/${deck.id}`);
    }

    function deleteDeck() {
        setDisplayLoading(true);

        const url = `https://superzaprecall.onrender.com/deck/${deck.id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const promise = axios.delete(url, config);

        promise
            .then((res) => {
                setTimeout(() => {
                    setRefresh((refresh) => !refresh);
                    setDisplayLoading(false);
                    setModalIsOpen(false);
                }, ONE_SECOND);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function openDeleteConfirm() {
        if (modalIsOpen) {
            return;
        }

        setModalIsOpen(true);
    }

    function closeDeleteConfirm() {
        setModalIsOpen(false);
    }

    return (
        <Container>
            <Deck onClick={navigateToDeck}>
                <h3>{deck.name}</h3>
                <h4>by {username}</h4>
            </Deck>
            <Controls>
                {Number(deck.userId) ===
                Number(localStorage.getItem("userId")) ? (
                    <>
                        <AiFillDelete onClick={openDeleteConfirm} />
                        <MdModeEdit onClick={navigateToEdit} />
                    </>
                ) : (
                    <></>
                )}
            </Controls>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Loading modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                {displayLoading ? (
                    <Bars height="60" color="white" ariaLabel="Loading..." />
                ) : (
                    <>
                        <h2>Tem certeza que deseja apagar o deck?</h2>
                        <div>
                            <Button onClick={closeDeleteConfirm}>
                                <AiOutlineClose />
                            </Button>
                            <Button onClick={deleteDeck}>
                                <AiOutlineCheck />
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </Container>
    );
}

const Container = styled.div`
    width: 60%;
    max-width: 600px;

    display: flex;

    background-color: black;
    border: 1px solid white;
    border-radius: 8px;

    margin-bottom: 30px;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const Deck = styled.div`
    width: 93%;
    height: 100%;

    padding: 20px;

    font-family: "Krona One", sans-serif;
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    cursor: pointer;

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

const Controls = styled.div`
    min-width: 40px;
    width: 7%;
    height: 100%;

    background-color: black;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    svg {
        font-size: 22px;
        color: white;

        cursor: pointer;
    }
`;
