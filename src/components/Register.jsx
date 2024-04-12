import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
  // Set the state of variables using useState hook
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    message:"",
    loggedIn: false,
    navigate: useNavigate(),
  });
  // Form submit for login with API
  const formSubmit = (e) => {
    e.preventDefault();
    // Create data to hold the values to be passed in to axios
    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation
    };
    // Include post axios template
    axios
      .post("/register", data)
      .then((response) => {
        // Store the token to localstorage
        localStorage.setItem("token", response.data.token);
        // Set loggedin status as reference for profile page
        setState({ ...state, loggedIn: true });
        // Passed in data using props for nav component inside header
        props.setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // After login redirect to profile
  if (state.loggedIn) {
    return state.navigate("/profile");
  }

  return (
    <div>
      <div className="row">
        <div className="bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4">
          <h3 className="text-center">Register Account</h3>
          <form onSubmit={formSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                required onChange={(e) => setState({...state, name: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                required onChange={(e)=> setState({...state, email: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                required onChange={(e) => setState({...state, password: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                required onChange={(e) => setState({...state, password_confirmation: e.target.value})}
              />
            </div>
            <div className="d-grid gap-2 mb-2">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Have an account? <Link to="/login"> Login here</Link>
            </p>
            <p>
              Forgot My Password <Link to="/forget">Click here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
