import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


import {ReactComponent as Bookmark} from './icons/bookmark.svg'

const PostList = (props) => {

  const changeBookmark = (e) => {
    console.log(e);
    e.target.value = !e.target.value
    e.target.style.fill = e.target.value? "#a0a0a0": "#ffffff";
  }


  return (
    <div>
      <Row className='g-3'>
        <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              location, country
            </Card.Header>
            <Card.Body>
              <Row>
                <Col><Card.Title>title</Card.Title></Col>
                <Col xs={{span:2, offset:2}}><Bookmark onClick={changeBookmark} value={false}/></Col>
              </Row>
              <Card.Subtitle className='text-muted'>3 days</Card.Subtitle>
              <Card.Text className='my-3'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>Created by user</Col>
                <Col>created_at date</Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              location, country
            </Card.Header>
            <Card.Body>
              <Row>
                <Col><Card.Title>title</Card.Title></Col>
                <Col xs={{span:2, offset:2}}><Bookmark onClick={changeBookmark} value={false}/></Col>
              </Row>
              <Card.Subtitle className='text-muted'>3 days</Card.Subtitle>
              <Card.Text className='my-3'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>Created by user</Col>
                <Col>created_at date</Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              location, country
            </Card.Header>
            <Card.Body>
              <Row>
                <Col><Card.Title>title</Card.Title></Col>
                <Col xs={{span:2, offset:2}}><Bookmark onClick={changeBookmark} value={false}/></Col>
              </Row>
              <Card.Subtitle className='text-muted'>3 days</Card.Subtitle>
              <Card.Text className='my-3'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>Created by user</Col>
                <Col>created_at date</Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              location, country
            </Card.Header>
            <Card.Body>
              <Row>
                <Col><Card.Title>title</Card.Title></Col>
                <Col xs={{span:2, offset:2}}><Bookmark onClick={changeBookmark} value={false}/></Col>
              </Row>
              <Card.Subtitle className='text-muted'>3 days</Card.Subtitle>
              <Card.Text className='my-3'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>Created by user</Col>
                <Col>created_at date</Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default PostList;