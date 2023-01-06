import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import PostList from './features/post-display/post-list/PostList'
import Header from './components/header/Header'
import UserLogin from './features/user-login-registration/user-login/UserLogin';
import UserRegister from './features/user-login-registration/user-registration/UserRegister';
import PostDetail from './features/post-display/post-detail/PostDetail';
import UserProfile from './features/user-profile/UserProfile';
import PostUpdate from './features/post-form/PostUpdate';
import PostAdd from './features/post-form/PostAdd';

function App() {

  const [login, setLogin] = useState(false);

  return (
    <div className='pb-5'>
      <BrowserRouter>
        <Header login={login} setLogin ={setLogin}/>
        <Container className='my-5'>
          <Routes>
            <Route path='/' element={<PostList />} />
            <Route path='/login' element={<UserLogin setLogin={setLogin}/>} />
            <Route path='/register' element={<UserRegister />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/post/new' element={<PostAdd />} />
            <Route path='/user' element={<UserProfile />} />
            <Route path='/post/edit/:id' element={<PostUpdate />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
