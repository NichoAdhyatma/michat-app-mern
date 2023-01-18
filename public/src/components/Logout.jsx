import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { logoutRoute } from "../utils/APIRoutes";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const id = await JSON.parse(
      localStorage.getItem("chat-app-user")
    )._id;
    const data = await axios.post(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <>
      <Button onClick={logout}>
        <BiPowerOff />
      </Button>
    </>
  );
};

const Button = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  background-color: #379237;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffff;
  font-weight: 900;
  font-size: 2rem;
  border-radius: 100%;
`;

export default Logout;
