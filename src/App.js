import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './component/Navbar';
import RegisterPage from './pages/RegisterPage';
import Post from './pages/PostPage';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import PostForm from './pages/PostForm';
import { UserContext } from './context/UserContext';
function App() {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/form" element={<PostForm />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
