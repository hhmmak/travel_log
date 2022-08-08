import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const PostForm = (props) => {

  const navigate = useNavigate();
  const {userId} = props;

  const [error, setError] = useState({})
  const [post, setPost] = useState({
    title: "",
    content: "",
    itinerary: "",
    destination: "",
    country: "",
    dateFrom: "",
    dateTo: ""
  })

  const onChangeHandler = (e) => {
    setPost({...post, [e.target.name]: e.target.value });
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`http://localhost:5000/api/posts?token=${token}`, {...post, user_id: userId})
      .then(res => navigate('/'))
      .catch(err => {
        setError(err.response.data)
        console.log(err)
      })
  }

  return (
    <div className='my-3'>
      <Form className='mb-5' onSubmit={onSubmitHandler}>
        <Form.Text>userId = {userId}</Form.Text>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='title' onChange={onChangeHandler}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='destination'>
          <Form.Label>Destination</Form.Label>
          <Form.Control type='text' name='destination' onChange={onChangeHandler}/>
          {error.destination &&
            <Form.Text className='text-danger'>{error.destination}</Form.Text>
          }
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' name='country' onChange={onChangeHandler}/>
          {error.country &&
            <Form.Text className='text-danger'>{error.country}</Form.Text>
          }
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateFrom'>
          <Form.Label>From</Form.Label>
          <Form.Control type='date' name='dateFrom' onChange={onChangeHandler}/>
          {error.dateFrom &&
            <Form.Text className='text-danger'>{error.dateFrom}</Form.Text>
          }
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateTo'>
          <Form.Label>To</Form.Label>
          <Form.Control type='date' name='dateTo' onChange={onChangeHandler}/>
          {error.dateTo &&
            <Form.Text className='text-danger'>{error.dateTo}</Form.Text>
          }
        </Form.Group>
        <Form.Group className='mb-3' controlId='itinerary'>
          <Form.Label>Itinerary</Form.Label>
          <Form.Control as="textarea" rows={5} name='itinerary' onChange={onChangeHandler}/>
          {error.itinerary &&
            <Form.Text className='text-danger'>{error.itinerary}</Form.Text>
          }
        </Form.Group>
        <Form.Group className='mb-3' controlId='content'>
          <Form.Label>Log</Form.Label>
          <Form.Control as="textarea" rows={5} name='content' onChange={onChangeHandler}/>
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant="light border border-secondary" type="submit" className='col-md-5'>Create</Button>
        </div>
      </Form>
    </div>
  )
}
export default PostForm;