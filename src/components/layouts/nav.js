import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src="/img/logoWithSplitwiseText.svg"
                className="App-logo-login"
                alt="logo"
              />
            </a>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to={"./register"}>
                  <button type="submit" className="btn btn-orange signUp ml-3">
                    {" "}
                    Sign Up
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
