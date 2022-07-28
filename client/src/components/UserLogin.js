import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const UserLogin = (props) => {
  return (
    <div className='vh-100 d-flex align-items-center'>
      <div className='col-lg-7 col-10 mx-auto'>
        <h2 className='mb-5'>Log In</h2>
        <Form className='mb-5'>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' />
          </Form.Group>
          <Form.Group className='mb-5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' />
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