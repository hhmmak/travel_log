import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = (props) => {
  
  const {headerLink} = props;
  
  return (
    <Navbar>
    <Container>
      <Navbar.Brand>Travel Log</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        { headerLink.map( (link, index) =>
        <Nav.Link as={Link} to={link[1]} key={index}>{link[0]}</Nav.Link>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
export default Header;