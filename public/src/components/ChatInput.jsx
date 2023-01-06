import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={(emoji) => {
                handleEmojiClick(emoji);
              }}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your messages here."
          value={msg}
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding 0.2rem 1rem;
  background-color: #EFF5F5;

  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
      position: relative;
      cursor: pointer;
      svg {
        font-size: 1.5rem;
        color: #379237;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -480px;
      }
    }
  }

  .input-container {
    width: 100%;
    display:flex;
    align-items: center;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #D6E4E5;
    input {
      width: 100%;
      background-color: transparent;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;

      &:focus {
        outline: none
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #379237;
      color: #ffff;
      font-size: 1.5rem;
      cursor: pointer;
      border: none;
    }
  }
`;
export default ChatInput;
