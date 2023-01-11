import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import FormDefault from './form-default/FormDefault';


const PostAdd = ({setLogin}) => {

  const navigate = useNavigate();

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
    if (token !== null){
      axios.get(`http://localhost:5000/api/users?token=${token}`)
        .then(res => {
          axios.post(`http://localhost:5000/api/posts?token=${token}`, {...newPost, user_id: res.data.userId})
          .then(res => navigate('/'))
          .catch(err => {
            setError(err.response.data)
            console.log(err)
          });
        })
        .catch(err => console.log(err));
    } else {
      navigate('/');
      setLogin(false);
    }
  }

  return (
    <FormDefault error={error} post={post} setPost={setPost} submitAction={onPostHandler} />
  )
}
export default PostAdd;