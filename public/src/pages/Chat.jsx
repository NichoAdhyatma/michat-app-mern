import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchAllUsers();
  }, []);
  return (
    <>
      <Container>
        <div className="container"></div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(113, 132, 121, 0.15);
    display: grid;
    grid-templates-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-templates-columns: 35% 65%;
    }
  }
`;

export default Chat;
