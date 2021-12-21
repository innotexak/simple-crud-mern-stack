import React from 'react';
import axios from 'axios';
import Google from './social/Google';
import Facebook from './social/Facebook';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginValidation } from '../validation/Validation';
import { HandleLoginSubmission } from './Submission';
// import Footer from '../component/Footer';
import styled from 'styled-components';
import './style.css';
import { url } from '../component/url';
import { UserContext } from '../context/UserContext';
import { AlertContext } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import Failure from './../component/FailureSMS';
import Success from '../component/SuccessSMS';
export default function LoginPage() {
  const navigate = useNavigate();
  const { user, userLogin } = React.useContext(UserContext);
  const { success, failure, failureAlert, successAlert } = React.useContext(AlertContext);

  // const [loginToggle, setLoginToggle] = React.useState(true);
  const formik = useFormik({
    validationSchema: LoginValidation,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      const { password, username } = values;
      try {
        const response = await axios.post(`${url}/login/`, { password, email: username });
        if (response.status === 200) {
          const data = response.data;
          const Token = data;
          const newUser = { Token, username };
          userLogin(newUser);
          successAlert('Success. Redirecting, please wait');
          setTimeout(() => {
            successAlert('');
            navigate('/post');
          }, 4000);
        } else {
          failureAlert(response);
          setTimeout(() => {
            failureAlert('');
          }, 4000);
        }
      } catch (err) {
        if (err) {
          failureAlert(err.response.data || err.message);
          setTimeout(() => {
            failureAlert('');
          }, 4000);
        }
      }
      actions.setSubmitting(true);
    },
  });

  return (
    <>
      <LoginContainer>
        <SubContainer>
          <Title>
            <h2>Login</h2>
          </Title>
          <div className="socials">
            <Google />
            {/* <Facebook /> */}
          </div>
          <Title>
            <h2 style={{ fontSize: '16px' }}>------------------ OR -------------------</h2>
          </Title>
          <form onSubmit={formik.handleSubmit}>
            {/* <p>------------------------- or -----------------------</p> */}

            {failure && <Failure />}
            {success && <Success />}
            <div className="form-control">
              <input type="email" placeholder="Email " name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.username && formik.errors.username ? <span className="error">{formik.errors.username}</span> : null}
            </div>
            <div className="form-control">
              <input type="password" placeholder="Password " name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password && formik.errors.password ? <span className="error">{formik.errors.password}</span> : null}
            </div>
            <P>
              <a href="/forgot-password">Forgot password?</a>
              <p>
                Not yet a member? <Link to="/register">Sign up</Link>
              </p>
            </P>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </SubContainer>
      </LoginContainer>
      {/* <Footer /> */}
    </>
  );
}

const LoginContainer = styled.div`
  width: 100vw;
  height: 70vh;
  margin: 6rem auto;
  /* text-align: center; */
`;
const SubContainer = styled.div`
  width: 40vw;
  margin: 0px auto;
  /* border: 1px solid red; */
  box-shadow: 2px 6px 2px 8px rgba(40, 95, 55, 0.2);
  padding: 2rem;
  @media (max-width: 960px) {
    width: 70vw;
  }
`;
const P = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    font-size: 13px;
  }
`;

const Title = styled.div`
  margin: 2rem;
  font-size: 1.2rem;
  text-align: center;
  color: rgb(40, 95, 55);
`;
