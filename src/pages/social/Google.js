import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { url } from '../../component/url';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../../context/UserContext';
export default function Google() {
  const { userLogin } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = React.useState('');

  const responseGoogle = async (response) => {
    if (response.accessToken) {
      const accessToken = response.accessToken;
      const { imageUrl, familyName, givenName, googleId, email } = response.profileObj;
      setData({
        firstName: familyName,
        lastName: givenName,
        profileImage: imageUrl,
        googleId: googleId,
        accessToken,
        email,
      });
      try {
        const submissionResponse = await axios.post(`${url}/google/login`, data);

        if (submissionResponse.status === 201) {
          let Token = submissionResponse.data;
          let username = email;
          const newUser = { Token, username };
          console.log(newUser);
          userLogin(newUser);
          navigate('/post');
        }
      } catch (err) {
        // Error from database submission
        console.log(err);
      }
    } else {
      // Error from google
      console.log(response.error);
    }
  };
  return (
    <div>
      <GoogleLogin
        clientId="1051826729669-cdmas5t06041f8fpm0fvgn0996rgsnuk.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
        className="socialbg"
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}
