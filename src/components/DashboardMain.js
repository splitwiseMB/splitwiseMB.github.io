import React, { Component } from "react";
import Header from "./layouts/Header";
import LeftSidebar from "../components/layouts/dash/LeftSidebar";
import fire from "../config/fire";
import { BrowserRouter, Route } from "react-router-dom";
import Dash from "./dashboardInner";
import Expense from "./Expenses/expense";
import AllExpenses from "./AllExpenses";
import Group from "./group/group";
import { resolve } from "path";

export class DashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentUser: {},
      expensesData: {},
      expenseData: []
    };
  }
  async getExpenses(expensesId) {
    let expenses = this.state.expensesData;
    expensesId.forEach(async expenseId => {
      const expenseData = await fire
        .firestore()
        .collection("expenses")
        .doc(expenseId)
        .get();
      expenses[expenseId] = expenseData.data();
      this.setState({ expensesData: expenses });
    });
  }
  getAllExpenses() {
    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        this.setState(() => ({ user: user }));
        this.setState(() => ({ currentUser: user.uid }));
        const userData = await fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (userData.data().expenses) {
          this.getExpenses(userData.data().expenses);
        }
      }
    });
  }
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => ({ user: user }));
      } else {
        // alert('')
      }
    });
    this.getAllExpenses();
  }
  //   f3qC7AmBDnaC4uODf1HzNWyy6W72 - new
  //   Tlpa5fQ5lUdQmuq4x9I91PW6GCD3 - 2
  render() {
    return (
      <BrowserRouter>
        <Header userDetails={this.state.user} />
        <div className="container" style={{ display: "flex" }}>
          <div className="row">
            <div className="left-sidebar col-md-3">
              <LeftSidebar {...this.props} />
            </div>
            <Route
              exact
              path="/dash/main"
              render={props => <Dash {...props} {...this.state} />}
            />
            <Route
              exact
              path="/expenses"
              render={props => <AllExpenses {...props} {...this.state} />}
            />
            <Route
              exact
              path="/dash/friend/:id/:name"
              render={props => <Expense {...props} {...this.state} />}
            />
            <Route
              exact
              path="/group/:groupId/:groupName"
              render={props => <Group {...props} {...this.state} />}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
function URLcheck(props) {
  console.log(props);
  return <Dash />;
}

export default DashboardMain;

// har ek transaction par friend
// ek ek ko dash mai nhi dikhana - sirf hisab settlements
// pura object mai sab ko compare krke nikalna hga - common hisabs
// group ka v dkhna hga - agar grp mai wahi frnd hua tha to wo hisab v
// overall hisab frnd wise
