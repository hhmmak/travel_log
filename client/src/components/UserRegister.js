import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const UserRegister = (props) => {
  return (
    <div className='vh-75 d-flex align-items-center'>
      <div className='col-lg-7 col-10 mx-auto'>
        <h2 className='mb-3'>Create Account</h2>
          <p className='d-flex justify-content-end text-danger fs-6 fw-light'>*All fields required</p>
        <Form className='mb-5'>
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' name='username' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control type='text' name='firstName' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last name</Form.Label>
            <Form.Control type='text' name='lastName' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' placeholder='example@travel-log.com' />
          </Form.Group>
          <Form.Group className='mb-5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' />
            <Form.Text className='text-muted'>Minimum 6 characters</Form.Text>
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