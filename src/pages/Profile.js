import React from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { AlertContext } from '../context/AlertContext';
import { url } from '../component/url';
import styled from 'styled-components';
import Footer from '../component/Footer';
export default function Profile() {
  const { user } = React.useContext(UserContext);
  const { alert, resetAlert } = React.useContext(AlertContext);
  const [profile, setProfile] = React.useState();
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const userProfile = await axios.get(`${url}/profile/${user.Token}`);
        if (userProfile.status === 200) {
          const data = userProfile.data;
          setProfile(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <MainContainer></MainContainer>
      <Footer />
    </>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 70vh;
`;
