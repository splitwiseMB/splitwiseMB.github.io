import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/register";
import Login from "./components/auth/login";
import {
  PrivateRoute,
  PrivateRouteRegister
} from "./components/auth/privaterouter";
import fire from "./config/fire";
import Dashboard from "./components/Dashboard";
import AddApartment from "./components/AddApartment";
import DashboardMain from "./components/DashboardMain";
import FireBasePrac from "./components/FireBaseDB";
import { createBrowserHistory as history } from "history";
import PrivateRouteLogin from "./components/auth/privaterouterlogin";
import "./App.css";
import "./loader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      currentUser: "user1",
      ready: false
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("app.js user found", user);
        this.setState({ authorized: true, ready: true });
      } else {
        console.log("app.js user not found", user);
        this.setState({ authorized: false, ready: true });
      }
    });
  }

  render() {
    return this.state.ready === true ? (
      <Router history={history}>
        <div className="App">
          <Switch>
            <PrivateRouteRegister
              path="/register"
              authed={this.state.authorized}
              component={Register}
            />
            <PrivateRouteLogin
              path="/login"
              authed={this.state.authorized}
              component={Login}
            />
            <PrivateRoute
              path="/dashboard"
              authed={this.state.authorized}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/"
              authed={!this.state.authorized}
              component={Home}
            />
            <PrivateRoute
              path="/new/apartment"
              authed={this.state.authorized}
              component={AddApartment}
            />
            <PrivateRoute
              path="/dash/main"
              authed={this.state.authorized}
              component={DashboardMain}
            />
            <PrivateRoute
              path="/fireBase/prac"
              authed={this.state.authorized}
              component={FireBasePrac}
            />
            <PrivateRoute
              exact
              path="/dash/main"
              authed={this.state.authorized}
              component={DashboardMain}
            />
            <PrivateRoute
              exact
              path="/expenses"
              authed={this.state.authorized}
              component={DashboardMain}
            />
            <PrivateRoute
              exaact
              path="/dash/friend/:id/:name"
              authed={this.state.authorized}
              component={DashboardMain}
            />
            <PrivateRoute
              exact
              path="/group/:groupId/:groupName"
              authed={this.state.authorized}
              component={DashboardMain}
            />
            } />
            {/* <Route exact path="/dash/all" component={AllExpences} /> */}
          </Switch>
        </div>
      </Router>
    ) : (
      <div className="loader">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>Loading</p>
      </div>
    );
  }
}

export default App;
