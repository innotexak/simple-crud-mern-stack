import React, { createContext, useState } from 'react';
const getLocalUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { Token: null, email:null };
};

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(getLocalUser());
  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

const logOut = ()=>{
let user = {Token:null, email:null}
  setUser(user)
   localStorage.setItem('user', JSON.stringify(user));
}
  return <UserContext.Provider value={{ user, userLogin, logOut}}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
