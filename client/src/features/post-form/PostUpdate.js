import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import PostForm from '../features/post-form/PostForm';


const PostUpdate = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState({})
  const [post, setPost] = useState({
    title: "",
    content: "",
    itinerary: "",
    location: "",
    city: "",
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
  }, [id])

  const onPutHandler = (e) => {
    const token = localStorage.getItem('token');
    if (token !== null){
      axios.get(`http://localhost:5000/api/users?token=${token}`)
        .then(res => {
          axios.put(`http://localhost:5000/api/posts/${id}?token=${token}`, {...post, user_id: res.data.userId} )
          .then(res => navigate('/'))
          .catch(err => {
            setError(err.response.data)
            console.log(err)
          });
        })
        .catch(err => console.log(err));
    } else {
      navigate('/');
    }
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