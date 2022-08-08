import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './css/Header.css'

const Header = (props) => {
  
  const navigate = useNavigate();
  const {setLogin, login, userId, setUserId} = props;
  const [headerLink, setHeaderLink] = useState([["Log In", "/login"], ["Create Account", "/register"]]);


  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')
      axios.get(`http://localhost:5000/api/users?token=${token}`)
        .then( res => {
          setLogin(true)
          setUserId(res.data.userId)
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
  
  }, [login])

  const onLogOut = () => {
    setLogin(false);
    setUserId(NaN)
    localStorage.clear();
    navigate('/');
  }
  
  
  //TODO remove "change" button
  return (
    <Navbar expand="md" className='pt-3'>
    <Container>
      <Navbar.Brand as={Link} to={'/'} className={'fs-2 fw-bolder header-text'}>Travel Log</Navbar.Brand>
      <div className="justify-content-end">
        <Navbar.Toggle aria-controls='travelLog-nav'/>
        <Navbar.Collapse id="travelLog-nav">
          <Nav className='me-auto'>
          { headerLink.map( (link, index) =>
          <Nav.Link as={Link} to={link[1]} key={index} className={"header-link"}>{link[0]}</Nav.Link>
          )}
          { login &&
            <button onClick={onLogOut} className="btn btn-outline-dark btn-sm">Log out</button>
          }
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}
export default Header;