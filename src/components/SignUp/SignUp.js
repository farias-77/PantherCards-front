import { DebounceInput } from "react-debounce-input";
import logo from "../../assets/logoPanther.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";

export default function SignUp() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/home");
        }
    }, []);

    const [displayLoading, setDisplayLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function submitSignUp() {
        if (displayLoading) {
            return;
        }

        const url = "https://superzaprecall.onrender.com/sign-up";
        const promise = axios.post(url, credentials);
        setDisplayLoading(true);

        promise
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                setErrorMessage(err.response.data);
                setDisplayLoading(false);
            });
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>PantherCards</h1>
            </Logo>

            <Form>
                <InvalidCredentials>{errorMessage}</InvalidCredentials>

                <DebounceInput
                    id="username"
                    debounceTimeout={500}
                    min={3}
                    type="username"
                    placeholder="Username"
                    value={credentials.username}
                    maxLength={15}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            username: e.target.value,
                        })
                    }
                />

                <DebounceInput
                    id="emailSignUp"
                    debounceTimeout={500}
                    min={3}
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            email: e.target.value,
                        })
                    }
                />
                <DebounceInput
                    id="passwordSignUp"
                    debounceTimeout={500}
                    min={3}
                    type="password"
                    placeholder="Senha"
                    value={credentials.password}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value,
                        })
                    }
                />

                <DebounceInput
                    id="confirmPassword"
                    debounceTimeout={500}
                    min={3}
                    type="password"
                    placeholder="Confirme a sua senha"
                    value={credentials.confirmPassword}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            confirmPassword: e.target.value,
                        })
                    }
                />

                <Button onClick={submitSignUp} id="submitButton">
                    {displayLoading ? (
                        <Bars
                            height="34"
                            color="white"
                            ariaLabel="Loading..."
                        />
                    ) : (
                        <h5>Enviar</h5>
                    )}
                </Button>
            </Form>

            <SignInLink
                onClick={() => {
                    navigate("/");
                }}
            >
                <u>Já tem uma conta? Faça o login aqui</u>
            </SignInLink>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: black;

    @media (max-width: 950px) {
        overflow-y: scroll;
    }
`;

const Logo = styled.div`
    width: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    img {
        z-index: 1;
        width: 30%;
        object-fit: cover;
    }

    h1 {
        font-family: "Krona One", sans-serif;
        font-size: 30px;
        color: white;
        text-align: center;
    }

    @media (max-width: 900px) {
        width: 100%;

        h1 {
            font-size: 17px;
        }
    }
`;

const Form = styled.div`
    margin-top: 30px;

    width: 35%;

    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 100%;
        height: 60px;

        background: #ffffff;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;

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

    @media (max-width: 900px) {
        width: 100%;

        input {
            width: 80%;
            height: 40px;
            border-radius: 8px;
        }
    }
`;

const Button = styled.div`
    width: 100%;
    height: 60px;

    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 1);
    background-color: black;

    display: flex;
    align-items: center;
    justify-content: center;

    h5 {
        font-family: "Krona One", sans-serif;
        font-size: 15px;
        color: white;
    }

    cursor: pointer;

    @media (max-width: 900px) {
        width: 80%;
        height: 40px;
        border-radius: 8px;
    }
`;

const InvalidCredentials = styled.div`
    width: 100%;
    height: 20px;
    background-color: black;

    font-family: "Krona One", sans-serif;
    font-size: 17px;
    color: white;
    text-align: center;

    margin-bottom: 20px;
`;

const SignInLink = styled.div`
    width: 90%;

    margin-top: 20px;
    margin-bottom: 90px;

    font-family: "Krona One", sans-serif;
    font-size: 13px;
    color: white;
    text-align: center;
    line-height: 18px;

    cursor: pointer;

    @media (max-width: 900px) {
        font-size: 10px;
    }
`;
