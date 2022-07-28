import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = (props) => {
  
  const {headerLink} = props;
  
  return (
    <Navbar expand="md">
    <Container>
      <Navbar.Brand>Travel Log</Navbar.Brand>
      <div className="justify-content-end">
        <Navbar.Toggle aria-controls='travelLog-nav'/>
        <Navbar.Collapse id="travelLog-nav">
          <Nav className='me-auto'>
          { headerLink.map( (link, index) =>
          <Nav.Link as={Link} to={link[1]} key={index}>{link[0]}</Nav.Link>
          )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}
export default Header;