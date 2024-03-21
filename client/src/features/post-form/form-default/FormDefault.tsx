import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './FormDefault.css';
import { PostFormType } from '../../../types/posts.types';

type FormDefaultProps = {
  error: Partial<PostFormType>
  post: PostFormType
  setPost: (newPost: PostFormType) => void 
  submitAction: (newPost: PostFormType) => void
  submitText: string
}

const FormDefault = (props: FormDefaultProps) => {

  // const navigate = useNavigate();
  const {error, post, setPost, submitAction, submitText} = props;
  const [countries, setCountries] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/countries`)
      .then(res => setCountries(res.data))
      .catch(err => console.log(err))
  }, [])
  


  const onChangeHandler = (e: React.ChangeEvent<HTMLElement>) => {
    setPost({...post, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });
  }
  
  const onSubmitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    submitAction(post);
  }

  return (
    <div>
      <Form className='mb-5 p-5 rounded-3 post-form-container' onSubmit={onSubmitHandler}>
        <Form.Group className='mb-2' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='title' onChange={onChangeHandler} value={post.title}/>
        </Form.Group>
        <Row className='g-5'>
          <Col>
            <Form.Group className='mb-3' controlId='location'>
              <Form.Label>Destination</Form.Label>
              <Form.Control type='text' name='location' onChange={onChangeHandler} value={post.location}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control type='text' name='city' onChange={onChangeHandler} value={post.city}/>
              {error.city &&
                <Form.Text className='text-danger'>{error.city}</Form.Text>
              }
            </Form.Group>
            <Form.Group className='mb-3' controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Select aria-label='Select a country' name='country' onChange={onChangeHandler} value={post.country}>
                <option>Select one country</option>
                {countries.map( (country, index) =>
                  <option value={country.country} key={index}>{country.country}</option>
                )}
              </Form.Select>
              {error.country &&
                <Form.Text className='text-danger'>{error.country}</Form.Text>
              }
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='dateFrom'>
              <Form.Label>From</Form.Label>
              <Form.Control type='date' name='dateFrom' onChange={onChangeHandler} value={post.dateFrom}/>
              {error.dateFrom &&
                <Form.Text className='text-danger'>{error.dateFrom}</Form.Text>
              }
            </Form.Group>
            <Form.Group className='mb-3' controlId='dateTo'>
              <Form.Label>To</Form.Label>
              <Form.Control type='date' name='dateTo' onChange={onChangeHandler} value={post.dateTo}/>
              {error.dateTo &&
                <Form.Text className='text-danger'>{error.dateTo}</Form.Text>
              }
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className='mb-3' controlId='itinerary'>
          <Form.Label>Itinerary</Form.Label>
          <Form.Control as="textarea" rows={5} name='itinerary' onChange={onChangeHandler} value={post.itinerary}/>
          {error.itinerary &&
            <Form.Text className='text-danger'>{error.itinerary}</Form.Text>
          }
        </Form.Group>
        <Form.Group className='mb-3' controlId='content'>
          <Form.Label>Log</Form.Label>
          <Form.Control as="textarea" rows={5} name='content' onChange={onChangeHandler} value={post.content}/>
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant="outline-dark" type="submit" className='col-md-5'>{submitText}</Button>
        </div>
      </Form>
    </div>
  )
}
export default FormDefault;