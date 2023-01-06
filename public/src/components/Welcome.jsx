import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome back, <span>{currentUser.username}</span>
      </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  img {
    height: 20rem;
  }

  span {
    color: #379237;
    font-weight: 900;
  }
`;
