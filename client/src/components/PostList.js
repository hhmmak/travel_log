import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './css/PostList.css'
import {ReactComponent as Bookmark} from './icons/bookmark.svg'

const PostList = ({userId}) => {

  const[postList, setPostList] = useState([]);
  const[bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => {
        setPostList(res.data)
        if (!isNaN(userId)) {
          const token = localStorage.getItem('token')
          axios.post(`http://localhost:5000/api/bookmarks/list?token=${token}`, {userId: userId})
            .then(res => {
              setBookmarks(res.data);
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))

  },[userId])
  
  const changeBookmark = (e, postId) => {
    if (bookmarks.includes(postId)){
      // set to not bookmared
      const token = localStorage.getItem('token')
      axios.delete(`http://localhost:5000/api/bookmarks?token=${token}`,{data :{"userId": userId, "postId": postId}})
        .then(res => {
          e.target.style.fill = "#ffffff";
          let bookmarkList = bookmarks.filter(id => id !== postId);
          setBookmarks(bookmarkList);
        })
        .catch(err => console.log(err))
    } else {
      // set to bookmarked
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:5000/api/bookmarks?token=${token}`,{"userId": userId, "postId": postId})
        .then(res => {
          e.target.style.fill = "#a0a0a0"
          bookmarks.push(postId);
          setBookmarks(bookmarks);
        })
        .catch(err => console.log(err))
    }
  
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
                { (post.userId !== userId && !isNaN(userId)) &&
                  <Col xs={{span:2, offset:2}}>
                    {bookmarks.includes(post.id)
                    ? <Bookmark onClick={(e) => changeBookmark(e, post.id)} fill={"#a0a0a0"}/>
                    : <Bookmark onClick={(e) => changeBookmark(e, post.id)} fill={"#ffffff"}/>
                    }
                  </Col>
                }
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