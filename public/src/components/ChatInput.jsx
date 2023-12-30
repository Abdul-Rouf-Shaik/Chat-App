import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import InputEmoji from "react-input-emoji";
import {IoMdSend} from "react-icons/io"

export default function ChatInput({handleSendMsg}) {

    const [msg, setMsg] = useState("");

    const handleMsg = (newMsg) => {
        setMsg(newMsg);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    }


    return (
        <Container className='cont'>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <InputEmoji 
                value={msg}
                onChange={handleMsg}
                />
                <button className='submit' type='submit' onClick={sendChat}>
                    <IoMdSend />
                </button >  
            </form>
        </Container>
    )
}

const Container = styled.div`
    height: 4.6rem;
    .input-container {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        gap: 0.7rem;
        height: 100%;
        width: 100%;
        background-color: transparent;
        color: white;
        padding: 1.5rem;
        .react-emoji {
            width: 90%;
            .react-input-emoji--container {
                background-color: #ffffff34;;
                color: white;
                border: none;
                padding: 0rem;
            }
            @media screen and (min-width: 200px) and (max-width: 719px) {
                .react-emoji-picker--container {
                    top: -3px;
                    left: 4.12rem;
                    .react-emoji-picker--wrapper {
                        height: 18.5rem ;
                        width: 17rem;
                        right: 0;
                    }
                }
            }
            button {
                svg {
                    font-size: 2rem;
                }
            }
        }
        .submit {
            width: 3.5rem;
            height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            outline: none;
            border: none;
            background-color: #9a86f3;
            svg {
                font-size: 1.7rem;
                color: white;
            }
        }
    }
`;
