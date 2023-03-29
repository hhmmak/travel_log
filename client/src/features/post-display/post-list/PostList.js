import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './PostList.css'
import Introduction from '../../../components/introduction/Introduction'
import BookmarkButton from '../../../components/buttons/bookmarkButton/BookmarkButton'

const PostList = () => {

  const[postList, setPostList] = useState([]);
  const[bookmarks, setBookmarks] = useState([]);
  const[userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => {
        setPostList(res.data)
        // get bookmark lists
        const token = localStorage.getItem('token');
        if (token !== null){
          axios.get(`http://localhost:5000/api/users?token=${token}`)
            .then(res => {
              setUserId(res.data.userId)
              axios.post(`http://localhost:5000/api/bookmarks/list?token=${token}`, {userId: res.data.userId})
                .then(res => {
                  setBookmarks(res.data);
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err))

  },[userId])

  return (
    <div className='my-3'>
      <Introduction />
      <Row className='g-3'>
      { postList.map( (post, index) => 
        <Col md={6} lg={4} key={index}>
          <Card>
            <Card.Header className='card-edge-background'>
              { post.location !== ""
                ? `${post.location}, ${post.country}`
                : `${post.city}, ${post.country}`
              }
            </Card.Header>
            <Card.Body className="card-post-body">
              <Row>
                <Col><Card.Title className='fs-6' onClick={() => navigate(`/post/${post.id}`)}>{post.title}</Card.Title></Col>
                { (post.userId !== userId && userId !== null) &&
                  <Col xs={2}>
                    <BookmarkButton bookmarks={bookmarks} setBookmarks={setBookmarks} setUserId={setUserId} postId={post.id}/>
                  </Col>
                }
              </Row>
              <Card.Subtitle className='text-muted' onClick={() => navigate(`/post/${post.id}`)}>{post.duration} days</Card.Subtitle>
              <Card.Text className='my-3 card-post-content' onClick={() => navigate(`/post/${post.id}`)}>
              { post.itinerary.split('\n').map( (paragraph, index) =>
                <span key={index}>{paragraph}<br /></span>
              )}
              </Card.Text>
              <div className='text-end' onClick={() => navigate(`/post/${post.id}`)}>...</div>
            </Card.Body>
            <Card.Footer className='bg-white card-edge-background'>
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