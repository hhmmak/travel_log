import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import PostForm from './PostForm';


const PostUpdate = ({userId}) => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
    .then( res => {
      setPost(res.data)
      setLoaded(true)
    })
    .catch(err => console.log(err))
  }, [])

  const onPutHandler = (e) => {
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:5000/api/posts/${id}?token=${token}`, {...post, user_id: userId} )
      .then(res => navigate('/'))
      .catch(err => {
        setError(err.response.data)
        console.log(err)
      });
  }

  return (
    <>
    { loaded &&
      <PostForm error={error} post={post} setPost={setPost} submitAction={onPutHandler} />
    }
    </>
  )
}
export default PostUpdate;