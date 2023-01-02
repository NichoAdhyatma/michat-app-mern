import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password and password confirmation not matched.",
        toastOption
      );
      return false;
    }
    if (password.length < 8) {
      toast.error(
        "password lenght must be equal or greater than 8 characters.",
        toastOption
      );
      return false;
    }
    if (username.length < 3) {
      toast.error("username at least minimum 3 characters.", toastOption);
      return false;
    }
    if (email === "") {
      toast.error("email is required.", toastOption);
      return false;
    }
    toast.success("register success.", toastOption);
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
            <h1>Michat</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password Confirmation"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          />

          <button type="submit">Register</button>
          <span>
            Aleready have an account ? <Link to="/login">Login</Link>
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
  background-color: #131324;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      width: 24rem;
      background-color: transparent;
      border: 0.1rem solid #4e0eff;
      padding: 1rem;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding 1rem;
      border:none;
      font-weight: bold;
      border-radius: 0.4rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover{
        cursor: pointer;
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-align: center;
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
        margin-left: 0.2rem;
      }
    }
  }
`;

export default Register;
