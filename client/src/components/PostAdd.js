import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PostForm from './PostForm';


const PostAdd = (props) => {

  const navigate = useNavigate();
  const {userId} = props;

  const todayDate = () => {
    let today = new Date();
    let todayDay = "0" + today.getDate();
    let todayMonth = "0" + (today.getMonth() + 1);
    return (`${today.getFullYear()}-${todayMonth.slice(-2)}-${todayDay.slice(-2)}`)
  
  };

  const [error, setError] = useState({})
  const [post, setPost] = useState({
    title: "",
    content: "",
    itinerary: "",
    location: "",
    city:"",
    country: "",
    dateFrom: todayDate(),
    dateTo: todayDate()
  })
  
  const onPostHandler = (newPost) => {
    const token = localStorage.getItem('token');

    axios.post(`http://localhost:5000/api/posts?token=${token}`, {...newPost, user_id: userId})
      .then(res => navigate('/'))
      .catch(err => {
        setError(err.response.data)
        console.log(err)
      });
  }

  return (
    <PostForm error={error} post={post} setPost={setPost} submitAction={onPostHandler} />
  )
}
export default PostAdd;