import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";


export default function ChatContainer({currChat, currUser, socket}) {

    currChat = {...currChat};
    currUser = {...currUser};
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        async function help() {
            const response = await axios.post(getAllMessagesRoute, {
                from: currUser._id,
                to: currChat._id,
            });

            setMessages(response.data);
        }
        help();
    }, [currChat])
    

    const showContacts = () => {
        let contact = document.querySelector(".contacts-page");
        contact.style.display = "grid";
        let chatsContainer = document.querySelector(".chats-container");
        chatsContainer.style.display = "none";
    }

    
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currUser._id,
            to: currChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currChat._id,
            from: currUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            });
        }
    }, []);


    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    
  return (
    <>
        {
            currChat && (
                <Container className='chats-container'>
                    <div className="chat-header">
                        <div className='back'>
                            <button onClick={showContacts}><ArrowBackIcon sx={{ color: "white"}}/></button>
                        </div>
                        <div className="user-details">
                            <div className="avatar">
                                <img
                                src={`data:image/svg+xml;base64,${currChat.avatarImage}`}
                                alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h3>{currChat.username}</h3>
                            </div>
                        </div>
                        <Logout/>
                    </div>
                    <div className="chat-messages" >
                        {
                            messages.map((message) => {
                                return (
                                    <div className={`message ${message.fromSelf ? "sended" : "recieved"}`} >
                                        <div className="content">
                                            <p>
                                                {message.message}
                                            </p>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg}/>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem%;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width:1080px) {
        display: grid;
        grid-template-rows: 15% 70% 15%; 
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem; 
        .back {
            display: none;
            padding-left: 1rem;
        }
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }

    }
    @media screen and (min-width: 200px) and (max-width: 719px) {
        display: grid;
        grid-template-rows: 10% 78% 20%;
        .chat-header {
            display: grid;
            grid-template-columns: 10% 75% 15%;
            .back {
                display: inline;
                padding-left: 1rem;
                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #9186f3;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    margin-right: 0.5rem;
                    svg {
                        font-size: 1.3rem;
                        color: #ebe7ff;
                    }
                }
            }
            .user-details {
                justify-content: center;
                margin-left: 3rem;
            }
        }
    }

    .chat-messages {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1   
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .recieved {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;