import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import SocialLoginButtons from "../components/SocialLoginButtons";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";

export default function SetUsername() {
  onAuthStateChanged(firebaseAuth, (userData) => {
    if (!userData) {
      navigate("/login");
    } else {
      setEmail(
        userData.user.email
          ? userData.user.email
          : userData.user.providerData[0].email
      );
    }
  });
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState(undefined);
  const [usernameStatus, setUsernameStatus] = useState(undefined);

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
  }, [navigate]);

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
  console.log(values);

  const handleValidation = () => {
    if (values.length < 3) {
      toast.error("username at least 3 characters.", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  return (
    <>
      <FormContainer>
        {email && (
          <form onSubmit={(event) => handleSubmit(event)} className="bg-white">
            <span>Check username availability</span>
            <div className="row">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(event) => handleChange(event)}
              />
              <label></label>
            </div>
            <button type="submit" className="btn">
              Set Username
            </button>
          </form>
        )}
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

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

    .forgot-pw {
      text-align: left;
    }
    .btn {
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
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
