import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const { user, registerUser, isLoading, authError } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
      alert("Your password did not match");
      return;
    }
    registerUser(loginData.email, loginData.password, loginData.name, navigate);
    e.preventDefault();
  };
  return (
    <>
      <div className="register-area py-5 text-center">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-1  h-full">
            <div className=" justify-center flex">
              <div className="register border p-3 rounded">
                <h2 className="py-3 theme-color">Create an Account</h2>
                {!isLoading && (
                  <form onSubmit={handleLoginSubmit}>
                    <input
                      className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      onBlur={handleOnBlur}
                    />
                    <input
                      className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your Email"
                      name="email"
                      type="email"
                      onBlur={handleOnBlur}
                    />
                    <input
                      className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your Password"
                      type="password"
                      name="password"
                      onBlur={handleOnBlur}
                    />
                    <input
                      className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="ReType Your Password"
                      type="password"
                      name="password2"
                      onBlur={handleOnBlur}
                    />

                    <button
                      type="submit"
                      className="btn-1 theme-bg text-white mb-3"
                    >
                      Create an Account
                    </button>
                    <br />
                    <NavLink style={{ textDecoration: "none" }} to="/login">
                      Already Registered? Please Login
                    </NavLink>
                  </form>
                )}
                {isLoading && (
                  <>
                    <div
                      class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                      role="status"
                    >
                      <span class="visually-hidden">L</span>
                    </div>
                  </>
                )}
                {user?.email && swal("User Created successfully!", "success")}
                {authError &&
                  swal("Something went wrong!", `${authError}`, "error")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
