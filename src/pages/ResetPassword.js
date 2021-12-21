import React from 'react';
import { useFormik } from 'formik';
import { ResetValidation } from '../validation/Validation';
import { handleResetSubmission } from './Submission';
import Footer from '../component/Footer';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import './style.css';
export default function LoginPage() {
  const { user } = React.useContext(UserContext);

  const formik = useFormik({
    validationSchema: ResetValidation,
    initialValues: {
      password1: '',
      password2: '',
    },
    onSubmit: handleResetSubmission,
  });

  return (
    <>
      <ResetContainer>
        <SubContainer>
          <form onSubmit={formik.handleSubmit}>
            <Title>
              <h2>Reset Password</h2>
            </Title>
            <div className="form-control">
              <input type="password1" placeholder="Password " name="password1" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password1 && formik.errors.password1 ? <span className="error">{formik.errors.password1}</span> : null}
            </div>
            <div className="form-control">
              <input type="password" placeholder="Confirm Password " name="password2" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password2 && formik.errors.password2 ? <span className="error">{formik.errors.password2}</span> : null}
            </div>

            <button type="submit">Submit</button>
          </form>
        </SubContainer>
      </ResetContainer>
      <Footer />
    </>
  );
}

const ResetContainer = styled.div`
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
  text-align: center;
`;
