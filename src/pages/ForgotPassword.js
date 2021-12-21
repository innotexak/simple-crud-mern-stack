import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Footer from '../component/Footer';
import { EmailValidation } from '../validation/Validation';
import { handleEmailSubmission } from './Submission';
export default function ForgotPassword() {
  const formik = useFormik({
    validationSchema: EmailValidation,
    initialValues: {
      email: '',
    },
    onSubmit: handleEmailSubmission,
  });

  return (
    <>
      <PasswordContainer>
        <SubContainer>
          <form onSubmit={formik.handleSubmit}>
            <Title>
              <h2>Forgot Password</h2>
            </Title>
            <div className="form-control">
              <input type="email" className="email" placeholder="Email " name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <button type="submit" className="email-btn">
                Submit
              </button>
              {formik.touched.email && formik.errors.email ? <span className="error">{formik.errors.email}</span> : null}
            </div>
          </form>
        </SubContainer>
      </PasswordContainer>
      <Footer />
    </>
  );
}

const PasswordContainer = styled.div`
  width: 100vw;
  height: 50vh;
  margin: 6rem auto;
`;

const SubContainer = styled.div`
  width: 40vw;
  margin: 0px auto;
  /* border: 1px solid red; */
  box-shadow: 2px 6px 2px 8px rgba(40, 95, 55, 0.2);
  padding: 2rem;
`;

const Title = styled.div`
  margin: 1rem;
  font-size: 1.2rem;
  text-align: center;
`;
