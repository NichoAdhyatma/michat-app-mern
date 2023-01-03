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
  const api = "http://api.multiavatar.com/45678945";
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
  const setProfilePicture = async () => {};
  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}` / `${Math.round(Math.random * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
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
      </Container>
      <ToastContainer />;
    </>
  );
}

const Container = styled.div``;
