import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currUser, setCurrUser] = useState(undefined);
  const [currChat, setCurrChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function help() {
      if(!localStorage.getItem('chat-app-user')) {
          navigate('/login');
      } else {
        setCurrUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    help();
  }, []);

  useEffect(() => {
    if(currUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currUser._id);
    }
  }, [currUser]);

  useEffect(() => {
    async function help() {
      if (currUser) {
        if (currUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    help();
  }, [currUser]);


  const handleChatChange = (chat) => {
    setCurrChat(chat);
  }

  return <Container>
    <div className="container">
      <Contacts contacts={contacts} currUser={currUser} changeChat={handleChatChange} />
      {
        isLoaded && currChat === undefined ? (
        <Welcome currUser={currUser}/>
        ) : (
          <ChatContainer currChat={currChat} currUser={currUser} socket={socket}/>
        )

      }
    </div>
  </Container>
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 200px) and (max-width: 719px) {
      grid-template-columns: 100%;
    }
  }

`;