import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Nav from 'react-bootstrap/Nav'

const UserProfile = ({userId}) => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      axios.get(`http://localhost:5000/api/users/posts/${userId}`)
        .then(res => {
          setUser(res.data);
          setLoaded(true)
        })
        .catch(err => console.log(err));
    } else {
      navigate('/');
    }
  }, [userId]);

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setUser({...user, posts: user.posts.filter(post => post.id !== id)}
      )})
      .catch(err => console.log(err))
  }

  return (
    <div>
    {loaded &&
      <div>
        <div className='my-5'>
          <h2>Hi, {user.firstName}!</h2>
          <p>{JSON.stringify(user)}</p>
          <div>userId: {userId}</div>
        </div>
        <Row>
          <Col md={8}>
            <h3>Your Logs</h3>
            <Table striped>
              <thead>
                <tr>
                  <th>Trip</th>
                  <th>Destination</th>
                  <th>From</th>
                  <th>To</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { user.posts.map( (post, index) =>
                  <tr key={index}>
                    <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
                    <td>{post.destination}</td>
                    <td>{post.dateFrom}</td>
                    <td>{post.dateTo}</td>
                    <td>
                      <ButtonGroup>
                        <Button variant='secondary' onClick={ () => navigate(`/post/edit/${post.id}`)}>Edit</Button>
                        <Button variant='secondary' onClick={ () => deleteHandler(post.id)}>Delete</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <div>
              <h3>Bookmarks</h3>
              <ol className='list-unstyled mb-0'>
                { user.bookmarks.map((bookmark, index) =>
                  <li key={index}><Link to={`/post/${bookmark.id}`}>{bookmark.title}</Link>, {bookmark.destination} ({bookmark.duration} days)</li>
                )}
              </ol>
            </div>
          </Col>
        </Row>
      </div>
      }
    </div>
  )
}
export default UserProfile