import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const PostForm = (props) => {

  const navigate = useNavigate();
  const {userId} = props;

  const [post, setPost] = useState({
    title: "",
    destination: "",
    country: "",
    dateFrom: "",
    dateTo: "",
    itinerary: "",
    content: "",
    userId: userId
  })

  const onChangeHandler = (e) => {
    setPost({...post, [e.target.name]: e.target.value });
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(post)
    axios.post("http://localhost:5000/api/posts", post)
      .then(res => navigate('/'))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Form className='mb-5' onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='title' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='destination'>
          <Form.Label>Destination</Form.Label>
          <Form.Control type='text' name='destination' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' name='country' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateFrom'>
          <Form.Label>From</Form.Label>
          <Form.Control type='date' name='dateFrom' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateTo'>
          <Form.Label>To</Form.Label>
          <Form.Control type='date' name='dateTo' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='itinerary'>
          <Form.Label>Itinerary</Form.Label>
          <Form.Control as="textarea" rows={5} name='itinerary' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='content'>
          <Form.Label>Log</Form.Label>
          <Form.Control as="textarea" rows={5} name='content' onChange={onChangeHandler}/>
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant="outline-dark" type="submit" className='col-md-5'>Create</Button>
        </div>
      </Form>
    </div>
  )
}
export default PostForm;