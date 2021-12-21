import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { url } from '../../component/url';

export default function Facebook() {
  const responseFacebook = async (response) => {
    if (response) {
      const access_token = response;
      const code = response;
      try {
        const submissionResponse = await axios.post(`${url}/facebook/`, { access_token, code });
        console.log(submissionResponse);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log(response.error);
    }
  };
  return (
    <div style={{ height: '10px' }}>
      <FacebookLogin
        appId="1088597931155576"
        // className="socialbg"
        autoLoad={true}
        icon="fa fa-facebook"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      ,
    </div>
  );
}
