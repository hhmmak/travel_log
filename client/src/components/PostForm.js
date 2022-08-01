import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const PostForm = (props) => {

  return (
    <div>
      <Form className='mb-5'>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='firstName' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='destination'>
          <Form.Label>Destination</Form.Label>
          <Form.Control type='text' name='destination' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' name='country' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateFrom'>
          <Form.Label>From</Form.Label>
          <Form.Control type='date' name='dateFrom' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='dateTo'>
          <Form.Label>To</Form.Label>
          <Form.Control type='date' name='dateTo' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='itinerary'>
          <Form.Label>Itinerary</Form.Label>
          <Form.Control as="textarea" rows={5} name='itinerary' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='content'>
          <Form.Label>Log</Form.Label>
          <Form.Control as="textarea" rows={5} name='content' />
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant="outline-dark" type="submit" className='col-md-5'>Create</Button>
        </div>
      </Form>
    </div>
  )
}
export default PostForm