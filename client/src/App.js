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
import PostUpdate from './components/PostUpdate';

import './App.css';

function App() {

  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState();


  return (
    <div className='bg-light'>
      <Container>
      <BrowserRouter>
          <Header login={login} setLogin ={setLogin} userId={userId} setUserId={setUserId}/>
          <Routes>
            <Route path='/' element={<PostList userId={userId} />} />
            <Route path='/login' element={<UserLogin setLogin={setLogin} setUserId={setUserId}/>} />
            <Route path='/register' element={<UserRegister setLogin={setLogin} setUserId={setUserId} />} />
            <Route path='/post/:id' element={<PostDetail userId={userId} />} />
            <Route path='/post/new' element={<PostForm userId={userId} />} />
            <Route path='/user' element={<UserProfile userId={userId} />} />
            <Route path='/post/edit/:id' element={<PostUpdate userId={userId} />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
