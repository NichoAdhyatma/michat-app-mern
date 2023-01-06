import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
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
