import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const UserLogin = (props) => {
  return (
    <div className='vh-100 d-flex align-items-center'>
      <div className='col-lg-7 col-10 mx-auto'>
        <Form className=''>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='name' />
          </Form.Group>
          <Button variant="outline-dark" type="submit">Submit</Button>
        </Form>
        <div className='align-self-end'>No Account? <Nav.Link as={Link} to={"/register"} className={"d-inline text-primary"}>Create Now</Nav.Link></div>
      </div>
    </div>
  )
}
export default UserLogin;