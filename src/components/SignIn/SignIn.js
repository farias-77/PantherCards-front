import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
    const navigate = useNavigate();

    const [signInData, setSignInData] = useState({
        email: "",
        password: "",
    });

    function submitSignIn(e) {
        e.preventDefault();
        console.log("chegou");

        const url = "https://superzaprecall.onrender.com/sign-in";
        const promise = axios.post(url, signInData);

        promise
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function navigateToSignUp() {
        navigate("/signUp");
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>PantherCards</h1>
            </Logo>
            <Form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <Button onClick={submitSignIn}>Enviar</Button>
            </Form>

            <SignUpLink onClick={navigateToSignUp}>
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
    width: 20%;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 300px;
        background-color: white;
    }

    h1 {
        font-family: "Krona One", sans-serif;
        font-size: 30px;
        color: white;
        text-align: center;
    }
`;

const Form = styled.div`
    margin-top: 50px;

    width: 25%;

    display: flex;
    flex-direction: column;

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

    font-family: "Krona One", sans-serif;
    font-size: 15px;
    color: white;

    cursor: pointer;
`;

const SignUpLink = styled.div`
    width: 20%;

    margin-top: 20px;

    font-family: "Krona One", sans-serif;
    font-size: 13px;
    color: white;
    text-align: center;
    line-height: 18px;

    cursor: pointer;
`;
