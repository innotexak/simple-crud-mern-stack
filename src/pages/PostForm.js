import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { PostValidation } from '../validation/Validation';

import styled from 'styled-components';
import './style.css';
import { url } from '../component/url';
import { UserContext } from '../context/UserContext';
import { AlertContext } from '../context/AlertContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Failure from './../component/FailureSMS';
import Success from '../component/SuccessSMS';
export default function LoginPage() {
  const navigate = useNavigate();
  const editData = useLocation();
  console.log(editData.state);
  const { user, userLogin } = React.useContext(UserContext);
  const email = user.username;
  const { success, failure, failureAlert, successAlert } = React.useContext(AlertContext);
  const formik = useFormik({
    validationSchema: PostValidation,
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: async (values, actions) => {
      const { title, content } = values;
      let like = 0;
      try {
        const response = await axios.post(`${url}/post`, { title, content, email, like });
        if (response.status === 201) {
          // const { data } = response.data;
          successAlert(response.data);
          setTimeout(() => {
            successAlert('');
            navigate('/post');
          }, 4000);
        } else {
          console.log(response.data);
          failureAlert(response);
          setTimeout(() => {
            failureAlert('');
          }, 4000);
        }
      } catch (err) {
        if (err) {
          failureAlert(err.response.data);
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
            <h2>Post Form</h2>
          </Title>

          <form onSubmit={formik.handleSubmit}>
            {/* <p>------------------------- or -----------------------</p> */}

            {failure && <Failure />}
            {success && <Success />}
            <div className="form-control">
              <input type="text" placeholder="Title " name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.title && formik.errors.title ? <span className="error">{formik.errors.title}</span> : null}
            </div>
            <div className="form-control">
              <textarea
                className="textarea"
                type="text"
                rows="10"
                placeholder="Content "
                name="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.content && formik.errors.content ? <span className="error">{formik.errors.content}</span> : null}
            </div>

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
  width: 60vw;
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
