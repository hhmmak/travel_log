import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import './css/UserProfile.css';

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
    <div className='my-3'>
    {loaded &&
      <div>
        <div className='my-5'>
          <h2>Hi, {user.firstName}!</h2>
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
              <tbody className='bg-white'>
                { user.posts.map( (post, index) =>
                  <tr key={index}>
                    <td><Link to={`/post/${post.id}`} className={"text-decoration-none link-hover"}>{post.title}</Link></td>
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
            <div className='bg-white p-4 rounded-3'>
              <h3>Bookmarks</h3>
              <ol className='list-unstyled mb-0'>
                { user.bookmarks.map((bookmark, index) =>
                  <li key={index} className="my-2 py-2 bookmark-list">
                    <Link to={`/post/${bookmark.id}`} className="text-decoration-none link-hover">{bookmark.title}</Link>
                    <div className='bookmark-detail'>{bookmark.destination} ({bookmark.duration} days)</div>
                  </li>
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