import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  // Set the state of variables using useState hook
  const [state, setState] = useState({
    email: '',
    password: '',
    message: '',
    loggedIn: false,
    navigate: useNavigate()
  });

  // Form submit for login with API
  const formSubmit = (e) => {
    e.preventDefault();
    // Create data to hold the values to be passed in to axios
    const data = {
      email: state.email,
      password: state.password
    };

    // Include post axios template
    axios.post('/login', data)
      .then((response) => {
        // Store the token to localstorage
        localStorage.setItem('token', response.data.token);
        // Set loggedin status as reference for profile page
        setState({ ...state, loggedIn: true });
        // Passed in data using props for nav component inside header
        props.setUser(response.data.user);
      })
      .catch((error) => {
        //console.log(error);
        setState({ ...state, message: error.response.data.message });
        document.getElementById('submitform').reset();
      });
  }


  //show error messages
  let err_message = "";
  if (state.message) {
    err_message = (
      <div class="alert alert-danger" role="alert">
        {state.message}
      </div>
    );
  }

  // After login redirect to profile
  if (state.loggedIn) {
    return state.navigate("/profile");
  }
  // redirect to if logged
  if (localStorage.getItem('token')) {
    return <Navigate replace to={'/profile'} />
  }
  return (
    <div>
      <div className='row'>
        <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4'>
          <h3 className='text-center'>Login Account</h3>
          <form onSubmit={formSubmit} id='submitform'>
            {/* display message */}
            {err_message}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email'
                required onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password'
                required onChange={(e) => setState({ ...state, password: e.target.value })}
              />
            </div>
            <div className='d-grid gap-2 mb-2' >
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            Forgot My Password <Link to="/forget">Click here</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
