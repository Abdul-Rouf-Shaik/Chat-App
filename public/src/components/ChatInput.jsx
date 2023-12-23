import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs";

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const inputRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState();

    const handleEmojiPickerHideShow = () => {
        inputRef.current.focus();
        setShowEmojiPicker(!showEmojiPicker);
    }


    const handleEmojiClick = (em) => {
        let ref = inputRef.current;
        ref.focus();
        const start = msg.substring(0, ref.selectionStart);
        const end = msg.substring(ref.selectionStart);
        let newMsg = start + em.emoji.toString() + end;
        setMsg(newMsg);
        setCursorPosition(start.length+em.emoji.length);
    }


    const handleMsg = (e) => {
        setMsg(inputRef.current.value);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
            setShowEmojiPicker(false);
        }
    }

    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    return (
        <Container className='cont'>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <Picker onEmojiClick={(em) => handleEmojiClick(em)}/>
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input id="msg" type="text"  ref={inputRef} className='msg' value={msg} onChange={handleMsg} placeholder='type your message here'/>
                <button className='submit'>
                    <IoMdSend />
                </button >
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 7% 93%;
    align-items: center;
    background-color: #080420;
    // height: 11%;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (min-width: 720px) and (max-width:1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        margin-right: 3rem;
        .emoji {
            position: relative;
            svg {
                font-size: 2rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                top: -475px; 
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .epr-body::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                }
                .epr-body::-webkit-scrollbar-thumb {
                    background-color: #9186f3;
                }
                .epr-btn {
                    button {
                        filter: contrast(0);
                    }
                }
                .epr-search {
                    background-color: transparent;
                    border-color: #9186f3;
                }
                .epr-emoji-category-label {
                    background-color: #080420;
                }
                .epr-preview {
                    display: none;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            // height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
               background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            @media screen and (min-width: 720px) and (max-width:1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }
            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
    // @media screen and (min-width: 720px) and (max-width:1080px) {
    //     height: 100%;
    //     grid-template-columns: 15% 85%;
    //     align-items: center;
    // }

    @media screen and (min-width: 200px) and (max-width: 719px) {
        display: grid;
        grid-template-columns: 13% 90%;
    }
`;
