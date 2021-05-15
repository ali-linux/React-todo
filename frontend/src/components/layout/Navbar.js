import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="rightSection">
          <h1>Cool Todo</h1>
        </div>
        <div className="leftSection">
          <div className="login">
            <Link to="/login">login</Link>
          </div>
          <div className="Register">
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
