import React, { Component } from "react";
import { Link } from "react-router-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      username: " "
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    console.log("fsfd");
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClick(e) {
    this.props.friends.push(this.state.username);
    this.props.handleAddfriend(this.props.friends, this.state.email);
  }

  render() {
    return (
      <div id="modal1" className="modal open" tabindex="0">
        <h3 className="btn">
          <img src="/img/logo.svg" className="logo" />
          Invite friends
        </h3>
        <div className="btn">
          <p>TO</p>
          <input
            type="email"
            name="email"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Enter names or email addresses"
          ></input>
        </div>
        <input
          type="text"
          name="username"
          value={this.state.name}
          onChange={this.handleChange}
        ></input>
        <Link to={"/"}>
          <a className="waves-effect waves-light btn">cancel</a>
        </Link>
        <Link to={"/"}>
          <a onClick={this.handleClick}>Add</a>
        </Link>
        <br />
        <br />
      </div>
    );
  }
}

export default Modal;
