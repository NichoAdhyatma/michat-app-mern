import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, email } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (email === "" || password === "") {
      toast.error("email and password is required.", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="app_logo" />
          </div>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account yet ? <Link to="/register"></Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  .brand {
    display: flex;
    justify-content: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(113, 132, 121, 0.15);
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      width: 24rem;
      background-color: transparent;
      border: 0.1rem solid #54B435;
      padding: 1rem;
      border-radius: 0.4rem;

      font-size: 1rem;
      &:focus {
        outline: 0.15rem solid #379237;
      }
    }
    button {
      background-color: #379237;
      color: white;
      padding 1rem;
      border:none;
      font-weight: bold;
      border-radius: 0.4rem;
      text-transform: uppercase;
      transition: 0.2s ease-in-out;
      &:hover{
        cursor: pointer;
        background-color: #54B435;
      }
    }
    span {

      text-align: center;
      a {
        color: #54B435;
        font-weight: bold;
        text-decoration: none;
        margin-left: 0.2rem;
      }
    }
  }
`;

export default Login;
