import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const UserProfile = (props) => {
  return (
    <div>
      <div className='my-5'>
        <h2>Hi, user!</h2>
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
              <tr>
                <th>Trip to New York</th>
                <th>New York, U.S.A.</th>
                <th>date from - date to</th>
                <th><Link to={'/post/1'}>View</Link>| Edit | Delete</th>
              </tr>
              <tr>
                <th>Trip to New York</th>
                <th>New York, U.S.A.</th>
                <th>date from - date to</th>
                <th>View | Edit | Delete</th>
              </tr>
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
              <li>Trip 1, Los Angeles ( 2 days )</li>
              <li>Trip 1, Los Angeles ( 2 days )</li>
              <li>Trip 1, Los Angeles ( 2 days )</li>
              <li>Trip 1, Los Angeles ( 2 days )</li>
            </ol>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default UserProfile