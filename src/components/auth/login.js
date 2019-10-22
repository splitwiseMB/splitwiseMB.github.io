import React, { Component } from 'react';
import Header from '../layouts/nav';
import fire from '../../config/fire';

class login extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  login(e) {
    document.querySelector('.waitLoader').style.display = 'block';
    document.querySelector('.signUpBtn').style.display = 'none';
    document.querySelector('.forgetPassword').style.display = 'none';
    e.preventDefault();
    const target = e.target;
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.props.history.push('/dash/main');
      })
      .catch(error => {
        console.log(error);
        // alert('Invalid username or password');
        console.log('Event login', target.previousSibling);
        target.previousSibling.style.display = 'block';
        target.previousSibling.textContent = 'Invalid credentials';
        document.querySelector('.waitLoader').style.display = 'none';
        document.querySelector('.signUpBtn').style.display = 'block';
        document.querySelector('.forgetPassword').style.display = 'block';
      });
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container main">
          <div className="row">
            <div className="logo">
              <img
                src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                alt="logo"
              />
            </div>
            <div className="form signup">
              <form>
                <h6 className="introText">WELCOME TO SPLITWISE</h6>
                <h6>Email address</h6>
                <div className="form-group">
                  <input
                    type="email"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="loginCred">
                  <div className="form-group">
                    <h6>Password</h6>
                    <input
                      value={this.state.name}
                      onChange={this.handleChange}
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <span className="waitLoader" style={{display: 'none'}}>wait...</span>
                <div className="errorMsg bg-danger text-light p-3 mb-3"></div>
                <button
                  type="submit"
                  onClick={this.login}
                  className="btn btn-orange signUpBtn"
                >
                  Log in
                </button>
                <p className="forgetPassword">
                  Forgot your password? <a href="/forgotPassword"> Click here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default login;
