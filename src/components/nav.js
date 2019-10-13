import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Register from './register';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar">
        <div className = "container">
          <a className="navbar-brand" href="/">
            <img
              src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
              className="App-logo"
              alt="logo"
            />
          </a>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button type="submit" className="btn btn-orange login mr-3">
                {' '}
                Log in
              </button>
              <span className="text-white">or</span>
            </li>
            <li className="nav-item">
              <Link to={'./register'}>
                <button type="submit" className="btn btn-primary signUp ml-3">
                  {' '}
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
