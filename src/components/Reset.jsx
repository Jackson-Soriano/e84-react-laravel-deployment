import React, { useState } from "react";
import axios from "axios";
const Reset = () => {
    // Set the state of variables using useState hook
    const [state, setState] = useState({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
        message: "",
        
    });
    // Form submit for login with API
    const formSubmit = (e) => {
        e.preventDefault();
        // Create data to hold the values to be passed in to axios
        const data = {
            token: state.token,
            email: state.email,
            password: state.password,
            password_confirmation: state.password_confirmation
        };
        // Include post axios template
        axios
            .post("/resetpassword", data)
            .then((response) => {
                // console.log(response);
                //displaying messages
                setState({ message: response.data.message });
                document.getElementById('submitform').reset();
            })
            .catch((error) => {
                // console.log(error);
                //displaying messages
                setState({ message: error.response.data.message });
            });
    };

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
            <div className="row">
                <div className="bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4">
                    <h3 className="text-center">Reset Account Password</h3>
                    <form onSubmit={formSubmit} id="submitform">
                        {/* display message */}
                        {err_message}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Pincode
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="token"
                                required onChange={(e) => setState({ ...state, token: e.target.value })}
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
                                required onChange={(e) => setState({ ...state, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                required onChange={(e) => setState({ ...state, password: e.target.value })}
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
                                required onChange={(e) => setState({ ...state, password_confirmation: e.target.value })}
                            />
                        </div>
                        <div className="d-grid gap-2 mb-2">
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reset