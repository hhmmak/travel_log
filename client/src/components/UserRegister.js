import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const UserRegister = (props) => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState({})

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/api/users`, user)
      .then(res => navigate('/'))
      .catch(err => {
        setError(err.response.data)
        console.log(err);
      
      })
  }

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }



  return (
    <div className='vh-75 d-flex align-items-center'>
      <div className='col-lg-7 col-10 mx-auto'>
        <h2 className='mb-3'>Create Account</h2>
        <p className='d-flex justify-content-end text-danger fs-6 fw-light'>*All fields required</p>
        <Form className='mb-5' onSubmit={ onSubmitHandler }>
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' name='username' onChange={ onChangeHandler }/>
            {error.username &&
              <Form.Text className='text-danger'>{error.username}</Form.Text>
            }
          </Form.Group>
          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control type='text' name='firstName' onChange={ onChangeHandler }/>
            {error.firstName &&
              <Form.Text className='text-danger'>{error.firstName}</Form.Text>
            }
          </Form.Group>
          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last name</Form.Label>
            <Form.Control type='text' name='lastName' onChange={ onChangeHandler }/>
            {error.lastName &&
              <Form.Text className='text-danger'>{error.lastName}</Form.Text>
            }
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' placeholder='example@travel-log.com' onChange={ onChangeHandler }/>
            {error.email &&
              <Form.Text className='text-danger'>{error.email}</Form.Text>
            }
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' onChange={ onChangeHandler }/>
            {error.password
              ? <Form.Text className='text-danger'>{error.password}</Form.Text>
              : <Form.Text muted>Minimum 6 characters</Form.Text>
            }
          </Form.Group>
          <Form.Group className='mb-5' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' name='confirmPassword' onChange={ onChangeHandler }/>
            {error.confirmPassword &&
              <Form.Text className='text-danger'>{error.confirmPassword}</Form.Text>
            }
          </Form.Group>
          <div className='d-grid d-md-block'>
            <Button variant="outline-dark" type="submit" className='col-md-5'>Create Account</Button>
          </div>
        </Form>
        <div className='d-flex justify-content-end mb-3'>
          <div>Already registered? <Nav.Link as={Link} to={"/login"} className={"d-inline text-primary fw-bold"}>Log In</Nav.Link></div>
        </div>
      </div>
    </div>
  )
}
export default UserRegister;