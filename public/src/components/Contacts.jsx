import React, { useState, useEffect , useRef} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

function Contacts({ contacts, currUser, changeChat, chatRef}) {
  const [currUsername, setCurrUsername] = useState(undefined);
  const [currUserImage, setCurrUserImage] = useState(undefined);
  const [currSelected, setCurrSelected] = useState(undefined);
  const contactsRef = useRef(null);

  useEffect(() => {
    if (currUser) {
      setCurrUserImage(currUser.avatarImage);
      setCurrUsername(currUser.username);
    }
  }, [currUser]);

  const changeCurrChat = (index, contact) => {
    setCurrSelected(index);
    changeChat(contact);
  };


  
  const toggleContacts = () => { 
    setTimeout(() => {
      let contact = contactsRef.current;
      contact.style.display = "none";
      let chatsContainer = document.querySelector(".chats-container");
      chatsContainer.style.display = "grid";
    }, 0);
  }

      

  return (
    <>
      {currUserImage && currUsername && (
        <Container className="contacts-page" ref={contactsRef}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrChat(index, contact)}
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
                  <span onClick={toggleContacts}></span>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currUsername}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            position: relative;
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.4rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
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
            span {
              display: none;
              width: 100%;
              height: 100%;
              position: absolute;
              background-color: transparent;
              left: 0;
            }
            @media screen and (min-width: 200px) and (max-width: 720px) {
              span {
                display: inline;
              }
            }
        }
        .selected {
            background-color: #9186f3;
        }
    }
    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width:1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }

  @media screen and (min-width: 200px) and (max-width: 719px) {
    display: none;
    // visibilty: hidden;  
  }
`;

export default Contacts;
