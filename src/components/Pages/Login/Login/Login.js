import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../../assets/logo.png";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, navigate);
    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, navigate);
  };
  return (
    <div className="register-area py-5 text-center">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-1  h-full">
          <div className="flex justify-center">
           
            <div className="register border p-3 rounded">
              <h4 className="py-3 theme-color">Log in Your Account</h4>

              <form onSubmit={handleLoginSubmit}>
                <input
                  className="block mb-4  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  onBlur={handleOnChange}
                />
                <input
                  className="form-control mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Password"
                  type="password"
                  name="password"
                  onBlur={handleOnChange}
                />

                <button type="submit" className="btn-1 theme-bg text-white mb-3">
                  Log in
                </button>
                <br />
                <NavLink style={{ textDecoration: "none" }} to="/register">
                  New User? Please Register
                </NavLink>

                {isLoading && (
                  <>
                    <div
                      class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                )}
                {user?.email && swal("Login successfully!", "success")}
                {authError &&
                  swal("Something went wrong!", `${authError}`, "error")}
              </form>
              <p>-----------OR-------------</p>
              <button
                onClick={handleGoogleSignIn}
                className="btn-1 text-white mb-3"
              >
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
