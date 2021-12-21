import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterValidation } from '../validation/Validation';
import { url } from './../component/url';
import styled from 'styled-components';
import { AlertContext } from '../context/AlertContext';
import './style.css';
import Failure from './../component/FailureSMS';
import Success from '../component/SuccessSMS';
export default function RegisterPage() {
  const navigate = useNavigate();
  const { success, failure, failureAlert, successAlert } = React.useContext(AlertContext);
  const formik = useFormik({
    validationSchema: RegisterValidation,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
    },
    onSubmit: async (values, actions) => {
      const { firstName, lastName, email, password1, password2 } = values;
      try {
        const response = await axios.post(`${url}/register`, { firstName, lastName, email, password: password1, confirmPassword: password2 });
        if (response.status === 201) {
          successAlert(response.data);
          setTimeout(() => {
            successAlert('');
            navigate('/login');
          }, 4000);
        } else {
          failureAlert(response.data);
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
      <RegisterContainer>
        <SubContainer>
          <form onSubmit={formik.handleSubmit}>
            <Title>
              <h2>Register</h2>
            </Title>

            {failure && <Failure />}
            {success && <Success />}
            <div className="form-control">
              <input type="email" placeholder="Email " name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email ? (
                <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{formik.errors.email}</span>
              ) : null}
            </div>
            <div className="form-control">
              <input type="text" placeholder="First Name " name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.firstName && formik.errors.firstName ? (
                <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{formik.errors.firstName}</span>
              ) : null}
            </div>
            <div className="form-control">
              <input type="text" placeholder="Last Name " name="lastName" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.lastName && formik.errors.lastName ? (
                <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{formik.errors.lastName}</span>
              ) : null}
            </div>
            <div className="form-control">
              <input type="password" placeholder="Password " name="password1" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password1 && formik.errors.password1 ? (
                <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{formik.errors.password1}</span>
              ) : null}
            </div>
            <div className="form-control">
              <input type="password" placeholder="Confirm Password " name="password2" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password2 && formik.errors.password2 ? (
                <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{formik.errors.password2}</span>
              ) : null}
            </div>
            <P>
              <button className="btn" type="submit">
                Signup
              </button>
              <span>
                Already a member? <Link to="/login">Login</Link>
              </span>
            </P>
          </form>
        </SubContainer>
      </RegisterContainer>
    </>
  );
}

const RegisterContainer = styled.div`
  width: 100vw;
  height: 85vh;
  margin: 3rem auto;
  text-align: center;
`;

const SubContainer = styled.div`
  width: 40vw;
  margin: 0px auto;
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
`;

const Title = styled.div`
  margin: 1rem;
  font-size: 1.2rem;
  color: rgb(40, 95, 55);
`;
