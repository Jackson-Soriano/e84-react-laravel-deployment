import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Forget from '../components/Forget';
import Profile from '../components/Profile';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Protected from './Protected';
import Reset from '../components/Reset';

const Header = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios
      .get('/user', {
        headers:{'Authorization': `Bearer ${token}`}
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset/:id" element={<Reset />} />
          <Route
            path="/profile/*"
            element={
              <Protected>
                <Profile user={user} setUser={setUser} />
              </Protected>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Header;
