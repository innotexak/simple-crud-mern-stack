import React from 'react';
import axios from 'axios';
import { url } from './url';
import { UserContext } from '../context/UserContext';
const GetUser=() =>{
  const { user } = React.useContext(UserContext);
  try {
    const userProfile = axios.get(`${url}/user/${user.username}`);
    if (userProfile.status === 200) {
      const { email, first_name, last_name } = userProfile.data;
      const data = { email, firstName: first_name, lastName: last_name };
      return data;
    }
  } catch (err) {
    console.log(err.message);
  }
}
