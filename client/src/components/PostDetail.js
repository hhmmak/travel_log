// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {ReactComponent as Bookmark} from './icons/bookmark.svg';


const PostDetail = (props) => {

  const {id} = useParams();

  return ( 
    <div>
      <Row>
        <Col>
          <ButtonGroup>
            <Button variant='outline-dark'>Edit</Button>
            <Button variant='outline-dark'>Delete</Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Bookmark width={"3rem"}/>
        </Col>
      </Row>
      <h2>title {id}</h2>
      <div className='p-3 mb-5 rounded-5 bg-light'>
        <p>itinerary Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu lobortis elementum nibh tellus molestie nunc non. Eget mi proin sed libero enim sed faucibus. Id diam maecenas ultricies mi eget mauris. Morbi enim nunc faucibus a. Cursus risus at ultrices mi tempus imperdiet. Egestas sed tempus urna et pharetra. Et ultrices neque ornare aenean euismod elementum nisi quis. Orci porta non pulvinar neque laoreet suspendisse. Maecenas pharetra convallis posuere morbi leo urna molestie at. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Dolor morbi non arcu risus quis varius quam quisque id. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. </p>
      </div>
      <Row className='g-5'>
        <Col sm={8}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu lobortis elementum nibh tellus molestie nunc non.Eget mi proin sed libero enim sed faucibus.<br/><br/>Id diam maecenas ultricies mi eget mauris. Morbi enim nunc faucibus a. Cursus risus at ultrices mi tempus imperdiet. Egestas sed tempus urna et pharetra. Et ultrices neque ornare aenean euismod elementum nisi quis. Orci porta non pulvinar neque laoreet suspendisse. Maecenas pharetra convallis posuere morbi leo urna molestie at. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim.<br/><br/>Dolor morbi non arcu risus quis varius quam quisque id. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. Ultricies leo integer malesuada nunc vel risus commodo viverra maecenas. Integer eget aliquet nibh praesent tristique magna sit amet. In cursus turpis massa tincidunt. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Fringilla est ullamcorper eget nulla facilisi.Sed faucibus turpis in eu mi bibendum neque. Malesuada proin libero nunc consequat interdum varius sit. Lacus suspendisse faucibus interdum posuere. Proin sagittis nisl rhoncus mattis rhoncus urna. Cursus euismod quis viverra nibh cras pulvinar. Metus dictum at tempor commodo ullamcorper a lacus. Fringilla phasellus faucibus scelerisque eleifend. Massa placerat duis ultricies lacus sed. Magna etiam tempor orci eu. Lacus sed viverra tellus in. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.<br/><br/>Cras semper auctor neque vitae tempus quam pellentesque nec nam. Eget nunc lobortis mattis aliquam faucibus purus in. Nisi vitae suscipit tellus mauris.</p>
        </Col>
        <Col>
          <dl>
            <Row className='mb-5'>
              <dt>Destination</dt>
              <dd>destination</dd>
              <dt>Duration</dt>
              <dd>duration</dd>
              <dt>Date</dt>
              <dd>date from and to</dd>
            </Row>
            <div>
              <p>Created by user on Month DD, YYYY</p>
            </div>
          </dl>
        </Col>
      </Row>
    </div>
  )
}
export default PostDetail;