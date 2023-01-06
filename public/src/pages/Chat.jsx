import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const authCheck = () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    authCheck();
  }, [navigate]);

  useEffect(() => {
    const getAllUsers = () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          axios.get(`${allUsersRoute}/${currentUser._id}`).then(({ data }) => {
            setContacts(data);
          });
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getAllUsers();
  }, [currentUser, navigate]);

  return (
    <>
      <Container>
        <div className="container">
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
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
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-templates-columns: 35% 65%;
    }
  }
`;

export default Chat;
