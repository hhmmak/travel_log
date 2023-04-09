import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import BookmarkButton from '../../../components/buttons/bookmarkButton/BookmarkButton';
import UserPostButton from '../../../components/buttons/UserPostButton';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './PostDetail.css';

const PostDetail = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const[post, setPost] = useState({});
  const[bookmarks, setBookmarks] = useState([]);
  const[userId, setUserId] = useState(null);

  useEffect( () => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then( res => setPost(res.data))
      .catch(err => console.log(err));
    
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
  }, [id])

  return ( 
    <div className='my-3'>
      <Row className='align-items-center'>
        <Col>
          <h2 className='my-5'>{post.title}</h2>
        </Col>
        <Col xs={{span:1, offset:1}}>
          { userId === post.userId 
          ? <UserPostButton post={post} deleteAction={() => navigate('/')} />
          : userId !== null
            ? <BookmarkButton bookmarks={bookmarks} setBookmarks={setBookmarks} setUserId={setUserId} postId={post.id} width={"3rem"} />
            : null
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
              <dd className='ms-2'>
                {post.location === "" 
                  ? post.city 
                  : post.city 
                      ? `${post.location}, ${post.city}`
                      : post.location
                }
              </dd>
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