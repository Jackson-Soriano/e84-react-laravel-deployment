import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Forget = () => {
    // Set the state of variables using useState hook
    const [state, setState] = useState({
        email: '',
    });

    // Form submit for login with API
    const formSubmit = (e) => {
        e.preventDefault();
        // Create data to hold the values to be passed in to axios
        const data = {
            email: state.email,
        };

        // Include post axios template
        axios.post('/forgetpassword', data)
            .then((response) => {
                // console.log(response);
                //displaying messages
                setState({ message: response.data.message });
                document.getElementById('forgetform').reset();
            })
            .catch((error) => {
                // console.log(error);
                //displaying messages
                setState({ message: error.response.data.message });
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
    return (
        <div>
            <div className='row'>
                <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4'>
                    <h3 className='text-center'>Forgot Password</h3>
                    <form onSubmit={formSubmit} id='forgetform'>
                        {/* display message */}
                        {err_message}
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email'
                                required onChange={(e) => setState({ email: e.target.value })} />
                        </div>
                        <div className='d-grid gap-2 mb-2' >
                            <button type="submit" className="btn btn-primary">Forgot Password</button>
                        </div>
                        <p>Have an account? <Link to="/login"> Login here</Link></p>
                        <p>Don't have account? <Link to="/register">Register here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Forget