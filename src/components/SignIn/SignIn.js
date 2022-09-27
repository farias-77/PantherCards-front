import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import logo from "../../assets/logo.svg";
import styled from "styled-components";
import axios from "axios";

export default function SignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/home");
        }
    }, []);

    const [displayLoading, setDisplayLoading] = useState(false);
    const [displayInvalid, setDisplayInvalid] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    function submitSignIn() {
        const url = "https://superzaprecall.onrender.com/sign-in";
        const promise = axios.post(url, credentials);
        setDisplayLoading(true);

        promise
            .then((res) => {
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/home");
            })
            .catch((err) => {
                setCredentials({ email: "", password: "" });
                setDisplayInvalid(true);
                setDisplayLoading(false);
            });
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>PantherCards</h1>
                <WhiteBackGround />
            </Logo>

            <Form>
                <InvalidCredentials>
                    {displayInvalid ? "Email ou senha incorretos." : ""}
                </InvalidCredentials>

                <input
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
                <input
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

                <Button onClick={submitSignIn}>
                    {displayLoading ? (
                        <Bars
                            height="40"
                            color="white"
                            ariaLabel="Loading..."
                        />
                    ) : (
                        <h5>Enviar</h5>
                    )}
                </Button>
            </Form>

            <SignUpLink
                onClick={() => {
                    navigate("/signUp");
                }}
            >
                <u>
                    Ainda não tem uma conta?
                    <br />
                    Cadastre-se aqui
                </u>
            </SignUpLink>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: black;
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

    @media (max-width: 950px) {
        width: 100%;
    }
`;

const WhiteBackGround = styled.div`
    width: 20%;
    height: 73%;

    position: absolute;
    top: 5px;

    background-color: white;
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

    @media (max-width: 950px) {
        width: 100%;

        input {
            width: 80%;
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

    @media (max-width: 950px) {
        width: 80%;
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

const SignUpLink = styled.div`
    width: 90%;

    margin-top: 20px;

    font-family: "Krona One", sans-serif;
    font-size: 13px;
    color: white;
    text-align: center;
    line-height: 18px;

    cursor: pointer;
`;
