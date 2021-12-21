import React from 'react';
import styled from 'styled-components';
import { AlertContext } from '../context/AlertContext';
export default function Failure() {
  const { failure } = React.useContext(AlertContext);
  return <MessageContainer>{failure}</MessageContainer>;
}

const MessageContainer = styled.div`
  width: auto;
  height: 40px;
  border: 1px solid grey;
  margin: 1rem auto;
  background: lightcoral;
  color: white;
  border-radius: 4px;
  display: flex;
  border: none;

  align-items: center;
  justify-content: center;
`;
