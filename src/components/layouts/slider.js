import React, { Component } from "react";

class slider extends Component {
  render() {
    return (
      <div className="slider">
        <div className="d-flex justify-content-between align-items-center">
          <div className="slider-left">
            <h1>
              <span>Less stress when </span>
              <span>sharing expenses </span>
              <span>on trips.</span>
            </h1>
            <div className="d-flex justify-content-between icon-container">
              <i
                id="plane-icon"
                className="fa fa-plane slider-icon"
                aria-hidden="true"
              ></i>
              <i
                id="home-icon"
                className="fa fa-home slider-icon"
                aria-hidden="true"
              ></i>
              <i
                id="heart-icon"
                className="fa fa-heart slider-icon"
                aria-hidden="true"
              ></i>
              <i
                id="all-icon"
                className="fa fa-globe slider-icon"
                aria-hidden="true"
              ></i>
            </div>
            <p>
              Keep track of your shared expenses and balances with housemates,
              trips, groups, friends, and family.
            </p>
            <a className=" sign-up-btn green-background" href="/register">
              Sign up
            </a>
          </div>
          <div className="slider-right">
            <i
              id="plane-icon"
              className="fa fa-plane slider-slides"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default slider;
