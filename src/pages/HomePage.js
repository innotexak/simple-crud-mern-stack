import React from 'react';

import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

export default function HomePage() {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <MainContainer>{user && user.username}</MainContainer>
    </>
  );
}
const MainContainer = styled.div`
  width: 100vw;
  height: 70vh;
`;
