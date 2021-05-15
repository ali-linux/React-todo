import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";

const Navbar = () => {
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.loginReducer
  );
  return (
    <div className="navbar">
      <div className="container">
        <div className="rightSection">
          <h1>Cool Todo</h1>
        </div>
        <div className="leftSection">
          <div className="login">
            {isAuthenticated ? (
              <h3>welcome {userInfo.name}</h3>
            ) : (
              <Link to="/login">login</Link>
            )}
          </div>
          <div className="Register">
            {isAuthenticated ? (
              <h3>logout</h3>
            ) : (
              <Link to="/register">Register</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
