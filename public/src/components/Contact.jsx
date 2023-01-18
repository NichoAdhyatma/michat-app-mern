import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Logout from "./Logout";

const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrenSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrenSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>MiChat</h1>
          </div>
          <div className="contacts">
            {contacts.map((contact, key) => {
              return (
                <div
                  className={`contact ${
                    key === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(key, contact)}
                  key={key}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>

                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
            <Logout />
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #c7f2a4;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 4rem;
    }
    h1 {
      color: #379237;
    }
  }

  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 1rem;

    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #5454;
        border-radius: 0.2rem;
      }
    }

    .contact {
      background-color: #b6e388;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.8rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.2s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border: 0.2rem solid #379237;
          border-radius: 100%;
        }
      }

      &:hover {
        background-color: #54b435;
        color: #ffff;
        .avatar {
          img {
            border: 0.2rem solid #b6e388;
          }
        }
      }
    }

    .selected {
      background-color: #54b435;
      color: #ffff;
      .avatar {
        img {
          border: 0.2rem solid #b6e388;
        }
      }
    }
  }

  .current-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 1.2rem;

    .user-details {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contact;
