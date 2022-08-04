import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './css/PostList.css'
import {ReactComponent as Bookmark} from './icons/bookmark.svg'

const PostList = (props) => {

  const[postList, setPostList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPostList(res.data))
      .catch(err => console.log(err))
  },[])

  const changeBookmark = (e) => {
    console.log(e);
    e.target.value = !e.target.value
    e.target.style.fill = e.target.value? "#a0a0a0": "#ffffff";
  }


  return (
    <div className='my-3'>
      <Row className='g-3'>
      { postList.map( (post, index) => 
        <Col md={6} lg={4} key={index}>
          <Card>
            <Card.Header>
              {post.destination}, {post.country}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col><Card.Title className='fs-6'>{post.title}</Card.Title></Col>
                <Col xs={{span:2, offset:2}}><Bookmark onClick={changeBookmark} value={false}/></Col>
              </Row>
              <Card.Subtitle className='text-muted'>{post.duration} days</Card.Subtitle>
              <Card.Text className='my-3 card-post-content'>{post.content}</Card.Text>
              <Link to={`/post/${post.id}`}>more ...</Link>
            </Card.Body>
            <Card.Footer>
              <div className='d-flex justify-content-between'>
                <div>Created by {post.username}</div>
                <div className='text-right'>on {post.createdAt}</div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      )}
      </Row>
    </div>
  )
}
export default PostList;