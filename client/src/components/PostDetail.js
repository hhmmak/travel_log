import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {ReactComponent as Bookmark} from './icons/bookmark.svg';


const PostDetail = ({userId}) => {

  const navigate = useNavigate();
  const {id} = useParams();
  const[post, setPost] = useState({});

  useEffect( () => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then( res => setPost(res.data))
      .catch(err => console.log(err));
  }, [id])

  const deleteHandler = () => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(res => navigate('/'))
      .catch(err => console.log(err))
  }

  return ( 
    <div className='my-3'>
      <Row>
        <Col className='d-flex flex-row-reverse'>
        { userId === post.userId ? 
          <ButtonGroup>
            <Button variant='secondary' onClick={() => navigate(`/post/edit/${post.id}`)}>Edit</Button>
            <Button variant='secondary' onClick={deleteHandler}>Delete</Button>
          </ButtonGroup>
        :
          <Bookmark width={"3rem"}/>
        }
        </Col>
      </Row>
      <h2>{post.title}</h2>
      <div className='p-3 mb-5 rounded-5 bg-light'>
        <p>{post.itinerary}</p>
      </div>
      <Row className='g-5'>
        <Col sm={8}>
            <p>{post.content}</p>
        </Col>
        <Col>
          <dl>
            <Row className='mb-5'>
              <dt>Destination</dt>
              <dd>{post.destination}</dd>
              <dt>Duration</dt>
              <dd>{post.duration}</dd>
              <dt>Date</dt>
              <dd>{post.dateFrom} to {post.dateTo}</dd>
            </Row>
            <div>
              <p>Created by {post.username} on {post.createdAt}</p>
            </div>
          </dl>
        </Col>
      </Row>
    </div>
  )
}
export default PostDetail;