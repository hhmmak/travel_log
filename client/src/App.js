import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import PostList from './components/PostList';
import Header from './components/Header';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import UserProfile from './components/UserProfile';

import './App.css';

function App() {

  const [login, setLogin] = useState(false); //TODO remove from Header and add to Login
  const [headerLink, setHeaderLink] = useState([["Log In", "/login"], ["Create Account", "/register"]]);


  //TODO change userID in props of UserProfile
  return (
    <Container>
    <BrowserRouter>
        <Header headerLink={headerLink} login={login} setLogin ={setLogin} setHeaderLink={setHeaderLink}/>
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/post/new' element={<PostForm  userId={1} />}/>
          <Route path='/user/:id' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
