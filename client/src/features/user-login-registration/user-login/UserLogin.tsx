import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './UserLogin.css'

type UserLoginProps = {
  setLogin: (login: boolean) => void
}

const UserLogin = ({setLogin}: UserLoginProps) => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/login', user)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        setLogin(true);
        navigate('/');
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data)
      })
  }
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLElement>) => {
    setUser({...user, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value})
  }
  return (
    <div className='d-flex align-items-center login-container'>
      <div className='col-lg-7 col-10 mx-auto login-background'>
        <h2 className='mb-5'>Log In</h2>
        {error &&
          <p className='text-danger'>{error}</p>
        }
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