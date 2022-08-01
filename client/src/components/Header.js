import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = (props) => {
  
  const {headerLink, setLogin, login, setHeaderLink} = props;

  useEffect(() => { 
  if (login) {
    setHeaderLink([["Log In", "/login"], ["Create Account", "/register"]])
  } else {
    setHeaderLink([["Profile", ""], ["Log Out", ""]])
  }
  
  }, [login])
  
  
  //TODO remove "change" button
  return (
    <Navbar expand="md">
    <Container>
      <Navbar.Brand as={Link} to={'/'} className={'fs-2 fw-bolder'}>Travel Log</Navbar.Brand>
      <div className="justify-content-end">
        <Navbar.Toggle aria-controls='travelLog-nav'/>
        <Navbar.Collapse id="travelLog-nav">
          <Nav className='me-auto'>
          { headerLink.map( (link, index) =>
          <Nav.Link as={Link} to={link[1]} key={index}>{link[0]}</Nav.Link>
          )}
          <button onClick={() => setLogin(!login)} className="btn btn-outline-dark btn-sm">Change</button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}
export default Header;