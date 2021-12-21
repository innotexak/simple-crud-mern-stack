import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer';
import './style.css';
export default function ErrorPage() {
  return (
    <>
      <MainContainer>
        <Error>Whoop! You hit a dead luck!!</Error>

        <Link to="/" className="link">
          Take me Home
        </Link>
      </MainContainer>
      <Footer />
    </>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Error = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  font-size: 30px;
  text-transform: uppercase;
  /* color:darkgreen; */

  font-weight: bolder;
`;
