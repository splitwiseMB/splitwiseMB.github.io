import React, { Component } from "react";
import userDummyPic from "./user.png";
import fire from "../../config/fire";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  logout(e) {
    fire
      .auth()
      .signOut()
      .then(u => {
        console.log("signedout successfully");
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="header">
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src="/img/logoWithSplitwiseText.svg"
                className="logo"
                alt="logo"
              />
            </a>
            <ul className="nav nav-pills">
              <div className="dropdown">
                <div className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src={userDummyPic}
                    alt="user-dummy-pic"
                    className="userDummyPic"
                  />
                  <span className="userName">
                    {" "}
                    {this.props.userDetails.displayName}{" "}
                  </span>
                </div>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/account">
                    Your account
                  </a>
                  <a className="dropdown-item" href="/create-group">
                    Create a group
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={this.logout}
                    href="/login"
                  >
                    Log out
                  </a>
                </div>
              </div>
              {/* </li> */}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
