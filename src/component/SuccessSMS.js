import React from 'react';
import styled from 'styled-components';
import { AlertContext } from '../context/AlertContext';
export default function Success() {
  const { success } = React.useContext(AlertContext);
  return <MessageContainer>{success}</MessageContainer>;
}

const MessageContainer = styled.div`
  width: auto;
  height: 40px;
  border: 1px solid grey;
  margin: 1rem auto;
  background: lightgreen;
  color: white;
  display: flex;
  border: none;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
