import { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const UserLogin = (props) => {
  
  const [user, setUser] = useState({});
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/login', user)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  return (
    <div className='vh-75 d-flex align-items-center'>
      <div className='col-lg-7 col-10 mx-auto'>
        <h2 className='mb-5'>Log In</h2>
        <Form className='mb-5' onSubmit={ onSubmitHandler }>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' onChange={ onChangeHandler } />
          </Form.Group>
          <Form.Group className='mb-5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' onChange={ onChangeHandler } />
          </Form.Group>
          <div className='d-grid d-md-block'>
            <Button variant="outline-dark" type="submit" className='col-md-5'>Log In</Button>
          </div>
        </Form>
        <div className='d-flex justify-content-end'>
          <div>No Account? <Nav.Link as={Link} to={"/register"} className={"d-inline text-primary fw-bold"}>Create Now</Nav.Link></div>
        </div>
      </div>
    </div>
  )
}
export default UserLogin;