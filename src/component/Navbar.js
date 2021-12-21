import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { UserContext } from './../context/UserContext';
const style = {
  display: 'flex',
};
const nstyle = {
  display: 'none',
};
export default function Navbar() {
  const { user, userLogin } = React.useContext(UserContext);
  const [menu, setMenu] = React.useState(true);
  return (
    <NavbarContainer>
      <Container>
        <Links to="/post">
          {/* FastFix */}
          <img style={{ width: '120px' }} src="https://innotexweb.netlify.app/img/logo2.png" alt="Logo" />
        </Links>
        <MobileV
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <Links>{menu ? <CgClose /> : <FaBars />}</Links>
        </MobileV>
        <Mobile style={menu ? style : nstyle}>
          {/* <Link href="/">Home</Link> */}
          <Link href="/post">Post</Link>
          {user && <Link href="/form">Post Form</Link>}
        </Mobile>
      </Container>
      <AccContainer>
      {user ?<><Link>Welcome {user.Email}</Link><p className="logout" onClick={()=>userLogin('')}> Logout</p></>:<>
      <Link href="/login">Login</Link>
        <SLink href="/register" className="signup">
          Signup
        </SLink>
        </>
      }
        
      </AccContainer>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  width: 100%;
  height: 4rem;
  position: relative;
  background: rgb(40, 92, 55);
  color: #000;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  margin: 1rem;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.2em;
  font-weight: normal;
`;
const AccContainer = styled.div`
  width: 20%;
  display: flex;
  margin: 1rem;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2em;
  font-weight: normal;
`;

const Link = styled.a`
  margin-left: 1.2em;
  border-bottom: 2px solid rgb(40, 95, 55);
  /* padding-bottom: 5px; */
  transition: border-bottom ease 2s;
  color: #fff;
  text-decoration: none;
  &:hover {
    /* padding-bottom: 5px; */
    border-bottom: 2px solid grey;
  }

  @media (max-width: 960px) {
    padding: 10px 0px;
    /* margin-top: 2rem; */
  }
`;

const SLink = styled.a`
  border-radius: 50px;
  text-decoration: none;
  background: #fff;
  margin-left: 1.2em;
  padding: 5px 7px;
  border: 2px solid #fff;
  color: rgb(40, 92, 55);
  &:hover {
    color: #fff;
    background: rgb(40, 92, 55);
    border: 2px solid #fff;
  }
`;

const Mobile = styled.div`
  display: flex;
  @media (max-width: 960px) {
    width: 100vw;
    flex-direction: column;
    position: absolute;
    top: 4rem;
    left: 0px;
    background: rgb(40, 92, 55);
    padding-left: 2rem;
  }
`;

const MobileV = styled.div`
  display: none;
  font-size: 2rem;
  @media (max-width: 960px) {
    display: block;
  }
`;
const Links = styled.a`
  color: #fff;
`;
