import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PostUpdate = ({userId}) => {

  const navigate = useNavigate();
  const {id} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    itinerary: "",
    destination: "",
    country: "",
    dateFrom: "",
    dateTo: ""
  })

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
    .then( res => {
      setPost(res.data)
      setLoaded(true)
    })
    .catch(err => console.log(err))
  }, [])

  const onChangeHandler = (e) => {
    setPost({...post, [e.target.name]: e.target.value });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(post)
    axios.put(`http://localhost:5000/api/posts/${id}`, {...post, user_id: userId} )
      .then(res => navigate('/'))
      .catch(err => console.log(err))
  }

  return (
    <div>
      { loaded &&
      <Form className='mb-5' onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='title' onChange={onChangeHandler} value={post.title}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='destination'>
          <Form.Label>Destination</Form.Label>
          <Form.Control type='text' name='destination' onChange={onChangeHandler} value={post.destination}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' name='country' onChange={onChangeHandler} value={post.country}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateFrom'>
          <Form.Label>From</Form.Label>
          <Form.Control type='date' name='dateFrom' onChange={onChangeHandler} value={post.dateFrom}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateTo'>
          <Form.Label>To</Form.Label>
          <Form.Control type='date' name='dateTo' onChange={onChangeHandler} value={post.dateTo}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='itinerary'>
          <Form.Label>Itinerary</Form.Label>
          <Form.Control as="textarea" rows={5} name='itinerary' onChange={onChangeHandler} value={post.itinerary}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='content'>
          <Form.Label>Log</Form.Label>
          <Form.Control as="textarea" rows={5} name='content' onChange={onChangeHandler} value={post.content}/>
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant="outline-dark" type="submit" className='col-md-5'>Update</Button>
        </div>
      </Form>
    }
    </div>
  )
}
export default PostUpdate;