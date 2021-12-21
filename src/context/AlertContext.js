import React, { createContext, useState } from 'react';

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [success, setSuccess] = useState('');
  const [failure, setFailure] = useState('');
  const successAlert = (message) => {
    setSuccess(message);
  };
  const failureAlert = (message) => {
    setFailure(message);
  };

  return <AlertContext.Provider value={{ success, successAlert, failure, failureAlert }}>{children}</AlertContext.Provider>;
}

export { AlertContext, AlertProvider };
