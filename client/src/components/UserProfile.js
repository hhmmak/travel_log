import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const UserProfile = (props) => {

  const {id} = useParams();
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/posts/${id}`)
      .then(res => {
        setUser(res.data);
        setLoaded(true)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
    {loaded &&
      <div>
        <div className='my-5'>
          <h2>Hi, {user.firstName}!</h2>
          <p>{JSON.stringify(user)}</p>
        </div>
        <Row>
          <Col>
            <h3>Your Logs</h3>
            <Table striped>
              <thead>
                <tr>
                  <th>Trip</th>
                  <th>Destination</th>
                  <th>Duration</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { user.posts.map( (post, index) =>
                  <tr key={index}>
                    <th>{post.title}</th>
                    <th>{post.destination}</th>
                    <th>{post.dateFrom} - {post.dateTo}</th>
                    <th><Link to={`/post/${post.id}`}>View</Link>| Edit | Delete</th>
                  </tr>
                )}
                <tr>
                  <th>Trip to New York</th>
                  <th>New York, U.S.A.</th>
                  <th>date from - date to</th>
                  <th>View | Edit | Delete</th>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={4}>
            <div>
              <h3>Bookmarks</h3>
              <ol className='list-unstyled mb-0'>
                { user.bookmarks.map((bookmark, index) =>
                  <li key={index}>{bookmark.title}, {bookmark.destination} ({bookmark.duration} days)</li>
                )}
                <li>Trip 1, Los Angeles ( 2 days )</li>
                <li>Trip 1, Los Angeles ( 2 days )</li>
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