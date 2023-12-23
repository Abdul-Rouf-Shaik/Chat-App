import React from 'react'
import styled from 'styled-components';
import Robot from "../assets/robot.gif";

export default function Welcome({currUser}) {
  
    let user = {...currUser};

    const toggleWelcome = (e) => {
        
        let contacts = document.querySelector(".contacts-page");
        contacts.style.display = "grid";
        let welcome = document.querySelector(".welcomePage");
        welcome.style.display='none';
    }

    return (
    <Container className='welcomePage'>
        <img src={Robot} alt="robot" />
        <h1>
            Welcome, <span>{user.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging.</h3>
        <button className='continue' onClick={toggleWelcome}>Continue</button>
    </Container>
  )
}

const Container = styled.div`
    
    display: flex;
    // display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
    .continue {
        display: none;
        margin-top: 2rem;
        background-color: #997af0;
        color: white;
        font-weight: bold;
        cursor: pointer;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        text-transform: uppercase;
        transform: 0.5ss ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
    }
    @media screen and (min-width: 200px) and (max-width: 719px) {
        .continue {
            display: inline-block;
        }    
    }
`;