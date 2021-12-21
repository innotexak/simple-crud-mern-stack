import React from 'react';
import axios from 'axios';
import { url } from './../component/url';
import { AlertContext } from '../context/AlertContext';
const HandleLoginSubmission = async (values, actions) => {
  const { resetAlert } = React.useContext(AlertContext);
  const { password, username } = values;
  try {
    const response = await axios.post(`${url}/login/`, { password, username });
    if (response) {
      console.log(response);
    }
  } catch (err) {
    console.log(err.message);
    resetAlert({ msg: err.message, type: 'danger' });
  }
  actions.setSubmitting(true);
  // return null;
};
const handleRegistrationSubmission = async (values, actions) => {
  const { username, email, password1, password2 } = values;
  const response = await axios.post(`${url}/register/`, { email, username, password1, password2 });
  if (response) {
    console.log(response);
  }
};
const handleEmailSubmission = async (values, actions) => {
  const { email } = values;
  try {
    const response = await axios.post(`${url}/password/reset/`, { email });
    console.log(response.data.detail);
  } catch (error) {
    console.log(error.message);
  }
};
const handleResetSubmission = async (values, actions) => {
  const { password1, password2 } = values;
  try {
    const response = await axios.post(`${url}/password/reset/confirm`, { new_password1: password1, new_password2: password2, uid: '', token: '' });
    console.log(response.data.detail);
  } catch (error) {
    console.log(error.message);
  }
};
export { HandleLoginSubmission, handleRegistrationSubmission, handleEmailSubmission, handleResetSubmission };
