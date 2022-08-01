import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const UserProfile = (props) => {
  return (
    <div>
      <h2>Hi, user!</h2>
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
                <th>View | Edit | Delete</th>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <h3>Bookmarks</h3>
          <div>
            <p>Trip 1</p>
            <p>Trip 1</p>
            <p>Trip 1</p>
            <p>Trip 1</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default UserProfile