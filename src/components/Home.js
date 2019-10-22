import React, { Component } from "react";
import Header from "./layouts/HomeHeader";
import Slider from "./layouts/slider";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Slider />
      </div>
    );
  }
}

export default Home;
