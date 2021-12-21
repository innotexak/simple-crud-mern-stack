import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return <FooterContainer>&copy;{new Date().getFullYear()} All Rights Reserved</FooterContainer>;
}

const FooterContainer = styled.div`
  width: 100vw;
  height: 20vh;
  background: rgb(40, 92, 55);
  color: #fff;
  display: flex;
`;
