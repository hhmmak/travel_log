import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostList from './components/PostList';

import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';

import './App.css';

function App() {

  // const [login, setLogin] = useState(false);
  const [headerLink, setHeaderLink] = useState([["Log In", "/login"], ["Create Account", "/register"]]);

  // if (login) {
  //   setHeaderLink([["Log In", ""], ["Create Account", ""]])
  // } else {
  //   setHeaderLink([["Profile", ""], ["Log Out", ""]])
  // }

  return (
    <Container>
    <BrowserRouter>
        <Header headerLink={headerLink} />
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/register' element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
