import React, { Component } from "react";
import Header from "./layouts/Header";
import fire from "../config/fire";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  redirectToAddGroup = e => {
    window.location.replace("/new/apartment");
  };
  redirectToDashMain = e => {
    window.location.replace("/dash/main");
  };
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => ({ user: user }));
        // console.log(this.state.user);
      } else {
        // alert('please login');
      }
    });
  }
  // J6wShLhoOVS6wNk4GDDMZ3jU6Eb2 - arun
  // Z1hGjAUk1RVCI9Kt7Ga3NCBdMSP2 - saurav
  // ZS3J3NxKRPX9RwymFf7keHCD3Iw2 - yogi
  // R16eHWw23oXRlo9GUOXI - exp1
  // mzM9efk9paQso8YYlG7Q - exp2arun

  render() {
    return (
      <React.Fragment>
        {console.log(this.state.user)}
        <Header userDetails={this.state.user} />
        <div className="row dash-content mt-5">
          <div className="orange-person">
            <img
              className="person"
              src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/drawings/person-orange-132756aba0816bfed6540e25d57d59f6900f36b6854ef71b361ac24d7db53d39.png"
              alt="Person orange"
            />
          </div>
          <div className="welcome-content">
            <div className="row">
              <img
                src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                className="dash-logo"
                alt="logo"
              />
              <span className="welcomeMsg"> Welcome to Splitwise! </span>
            </div>
            <p className="question"> What would you like to do first? </p>
            <div className="row">
              <button
                type="button"
                className="btn btn-orange addAptBtn fa fa-home"
                onClick={this.redirectToAddGroup}
              >
                Add your apartment
              </button>
            </div>
            <div className="row">
              <button
                type="button"
                className="btn btn-orange addGrpBtn fa fa-globe"
                onClick={this.redirectToAddGroup}
              >
                Add a group trip
              </button>
            </div>
            <div className="row">
              <button type="button" className="btn btn-secondary skipBtn" onClick={this.redirectToDashMain}>
                Skip setup for now
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
