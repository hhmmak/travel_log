import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import './css/Header.css'

const Header = (props) => {
  
  const navigate = useNavigate();
  const {setLogin, login} = props;
  const [headerLink, setHeaderLink] = useState([["Log In", "/login"], ["Create Account", "/register"]]);


  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')
      axios.get(`http://localhost:5000/api/users?token=${token}`)
        .then( res => {
          setLogin(true);
        })
        .catch(err => {
          console.log(err);
          setLogin(false);
        });
    }
    
    if (login) {
      setHeaderLink([["Write New Post", '/post/new'], ["Profile", `/user`]])
    } else {
      setHeaderLink([["Log In", "/login"], ["Create Account", "/register"]])
    }
  
  }, [login, setLogin])

  const onLogOut = () => {
    setLogin(false);
    localStorage.clear();
    navigate('/');
  }
  
  
  return (
    <Navbar expand="md" className='m-0 pt-3 navbar-container'>
    <Container>
      <Link to={'/'} className={'fs-2 fw-bolder header-text'}>Travel Log</Link>
      <div className="justify-content-end">
        <Navbar.Toggle aria-controls='travelLog-nav'/>
        <Navbar.Collapse id="travelLog-nav">
          <Nav className='me-auto'>
          { headerLink.map( (link, index) =>
            <Nav.Link as={Link} to={link[1]} key={index} className={"header-link"}>{link[0]}</Nav.Link>
          )}
          { login &&
            <Button onClick={onLogOut} variant="outline-primary" size='sm' className='ms-3'>Log out</Button>
          }
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}
export default Header;