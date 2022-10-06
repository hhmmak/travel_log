import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {ReactComponent as Bookmark} from './icons/bookmark.svg';
import './css/PostDetail.css';

const PostDetail = ({userId}) => {

  const navigate = useNavigate();
  const {id} = useParams();
  const[post, setPost] = useState({});
  const[bookmarks, setBookmarks] = useState([]);

  useEffect( () => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then( res => setPost(res.data))
      .catch(err => console.log(err));
    
    if (userId) {
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:5000/api/bookmarks/list?token=${token}`, {userId: userId})
        .then(res => {
          setBookmarks(res.data);
        })
        .catch(err => console.log(err))
    }
  }, [id, userId])

  const deleteHandler = () => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(res => navigate('/'))
      .catch(err => console.log(err))
  }

  const changeBookmark = (e, postId) => {
    if (bookmarks.includes(postId)){
      // set to not bookmared
      const token = localStorage.getItem('token')
      axios.delete(`http://localhost:5000/api/bookmarks?token=${token}`,{data :{"userId": userId, "postId": postId}})
        .then(res => {
          e.target.style.fill = "#efefef";
          let bookmarkList = bookmarks.filter(id => id !== postId);
          setBookmarks(bookmarkList);
        })
        .catch(err => console.log(err))
    } else {
      // set to bookmarked
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:5000/api/bookmarks?token=${token}`,{"userId": userId, "postId": postId})
        .then(res => {
          e.target.style.fill = "#eebc64"
          bookmarks.push(postId);
          setBookmarks(bookmarks);
        })
        .catch(err => console.log(err))
    }
  
  }

  return ( 
    <div className='my-3'>
      <Row>
      { userId &&
        <Col className='d-flex flex-row-reverse'>
        { userId === post.userId &&
          <ButtonGroup>
            <Button variant='secondary' onClick={() => navigate(`/post/edit/${post.id}`)}>Edit</Button>
            <Button variant='secondary' onClick={deleteHandler}>Delete</Button>
          </ButtonGroup>
        }
        </Col>
      }
      </Row>
      <Row className='align-items-center'>
        <Col>
          <h2 className='my-5'>{post.title}</h2>
        </Col>
        <Col xs={{span:1, offset:1}}>
          { (post.userId !== userId && !isNaN(userId)) &&
            <>
            {bookmarks.includes(post.id)
            ? <Bookmark onClick={(e) => changeBookmark(e, post.id)} fill={"#eebc64"} width={"3rem"}/>
            : <Bookmark onClick={(e) => changeBookmark(e, post.id)} fill={"#efefef"} width={"3rem"}/>
            }
            </>
          }
        </Col>
      </Row>
      <div className='p-3 mb-5 rounded-3 bg-white'>
        <p>{post.itinerary}</p>
      </div>
      <Row className='g-5'>
        <Col sm={8} className='mb-5 mx-3 rounded-3 p-3 detail-content-container'>
            <p>{post.content}</p>
        </Col>
        <Col className='p-3 mb-5 rounded-3 bg-light text-dark detail-list-container'>
          <dl className='detail-list-content'>
            <Row className='mb-5'>
              <dt className='mt-3'>Destination</dt>
              <dd className='ms-2'>{post.location}</dd>
              <dt className='mt-3'>Country</dt>
              <dd className='ms-2'>{post.country}</dd>
              <dt className='mt-3'>Duration</dt>
              <dd className='ms-2'>{post.duration}</dd>
              <dt className='mt-3'>Date</dt>
              <dd className='ms-2'>{post.dateFrom} to {post.dateTo}</dd>
            </Row>
            <div>
              <p className='text-end text-muted'>Created by {post.username} <br /> on {post.createdAt}</p>
            </div>
          </dl>
        </Col>
      </Row>
    </div>
  )
}
export default PostDetail;