import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "http://api.multiavatar.com/";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatars === undefined) {
      toast.error("Please select an avatar.", toastOption);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const data = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatars],
      });

      console.log(data.data);

      if (data.data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.Image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar, please try again.", toastOption);
      }
    }
  };
  useEffect(() => {
    const data = [];
    const fetchData = async () => {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture.</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, key) => {
              return (
                <div
                  key={key}
                  className={`avatar ${
                    selectedAvatars === key ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatars(key)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={() => setProfilePicture()}>
            Select Avatar
          </button>
        </Container>
      )}
      <ToastContainer />;
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      img {
        height: 6rem;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .selected {
      border: 0.4rem solid #379237;
    }
  }

  .submit-btn {
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
`;
