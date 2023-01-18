import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { checkUsernameRoute, registerRoute } from "../utils/APIRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { debounce } from "../utils/Debounce";

export default function SetUsername() {
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userData) => {
      if (!userData) {
        navigate("/login");
      } else {
        handleEmail(userData);
      }
    });
  }, []);
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

  const handleEmail = (userData) => {
    setEmail(userData.email ? userData.email : userData.providerData[0].email);
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random() + 1).toString(20).substring(1),
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
    if (values.length < 3) {
      toast.error("username at least 3 characters.", toastOption);
      return false;
    }
    return true;
  };

  const checkUsername = async (username) => {
    if (username.length > 3) {
      const { data } = await axios.post(checkUsernameRoute, {
        username,
      });
      setUsernameStatus(data.status);
      setLabel(data.msg);
      setValues(username);
    } else {
      setLabel("Enter a username at least 4 character");
    }
  };

  const handleChange = debounce((name) => checkUsername(name), 300);

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
                autoComplete="off"
                className={`${
                  usernameStatus
                    ? "border-success"
                    : usernameStatus !== undefined
                    ? "border-danger"
                    : ""
                }`}
                onChange={(event) => handleChange(event.target.value)}
              />
              <label
                className={`${
                  usernameStatus
                    ? "success"
                    : usernameStatus !== undefined
                    ? "danger"
                    : ""
                }`}
              >
                {label}
              </label>
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

  .row {
    label {
      display: block;
      margin: 10px 0 0 5px;
      height: 0.5rem
      transition: 0.3s ease-in-out;
    }
    label.success {
      color: green;
    }
    label.danger {
      color: red;
    }
  }

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
        outline: none;
      }
    }

    .border-success {
      border: 0.15rem solid green;
    }

    .border-danger {
      border: 0.15rem solid red;
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
