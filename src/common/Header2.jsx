import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Forget from '../components/Forget';
import Profile from '../components/Profile';
const Header = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Login User Credentials 
        axios.get('/user')
            .then((response) => {
                setUser(response.data);
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Nav user={this.state.user} setUser={this.setUser} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login user={this.state.user} />} />
                    <Route path="/register" element={<Register user={this.state.user} />} />
                    <Route path="/forget" element={Forget} />
                    <Route path="/profile" element={<Profile user={this.state.user} setUser={this.setUser} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Header;
