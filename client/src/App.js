import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostList from './components/PostList';

import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';

import './App.css';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

function App() {

  const [login, setLogin] = useState(false); //TODO remove from Header and add to Login
  const [headerLink, setHeaderLink] = useState([["Log In", "/login"], ["Create Account", "/register"]]);


  return (
    <Container>
    <BrowserRouter>
        <Header headerLink={headerLink} login={login} setLogin ={setLogin} setHeaderLink={setHeaderLink}/>
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/post/create' element={<PostForm />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
