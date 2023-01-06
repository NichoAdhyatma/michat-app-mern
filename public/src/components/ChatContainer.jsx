import React from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Messages from './Messages'

const ChatContainer = ({ currentChat }) => {
  const handleSendMsg = async (msg) => {};
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <Messages />
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 75% 10%;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
  }
`;

export default ChatContainer;
