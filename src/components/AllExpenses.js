import React, { Component } from "react";
import "./expenses.css";
import ShowExpense from "./ShowExpenses";
import data from "../data.json";

export class AllExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentUser: null,
      expenses: this.getUserExpenses(
        data.expenses,
        data.users["user1"].expenses
      ),
      expensesData: this.props.expensesData,
      totalBalance: 0
    };
  }

  getUserExpenses = (expenses, userExpensesId) => {
    return userExpensesId.reduce((userExpenses, userExpenseId) => {
      userExpenses[userExpenseId] = expenses[userExpenseId];
      return userExpenses;
    }, {});
  };
  getTotalBalance = expenses => {
    const totalBalance = Object.keys(expenses).reduce((balance, expense) => {
      if (expenses[expense].users[this.props.currentUser]) {
        balance += expenses[expense].users[this.props.currentUser].netBalance;
      }
      return balance;
    }, 0);
    return totalBalance;
  };
  render() {
    const totalBalance = this.getTotalBalance(this.props.expensesData);
    return (
      <React.Fragment>
        <div className="dash-main-content col-md-6">
          <div className="dash-header p-3">
            <div className="row">
              <h4 className="mr-auto">All Expenses</h4>
              <div className="dash-header-right ml-auto">
              </div>
            </div>
          </div>
          {console.log(this.props.expensesData)}
          {Object.keys(this.props.expensesData).length !== 0 ? (
            Object.keys(this.props.expensesData).map(expense => {
              console.log("here");
              return (
                <ShowExpense
                  expense={this.props.expensesData[expense]}
                  currentUser={this.props.currentUser}
                />
              );
            })
          ) : (
            <div className="content-dash p-5">
              <div className="row">
                <img
                  src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png"
                  alt="blue-man"
                  className="blue-person mr-auto col-md-4"
                />
                <div className="content-dash-right ml-auto col-md-8">
                  <h3 className="font-weight-bold">
                    You have not added
                    <br /> any expenses yet
                  </h3>
                  <p className="text-secondary">
                    To add a new expense, click the orange “Add an expense”
                    button.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right-sidebar col-md-3">
          {Object.keys(this.props.expensesData).length !== 0 ? (
            <div className="d-flex flex-column p-3">
              <small className="text-secondary font-weight-bold font-size-13">
                YOUR TOTAL BALANCE
              </small>
              <div
                className={
                  totalBalance < 0 ? "orange-color mt-2" : "colorBlue mt-2"
                }
              >
                <h6 className="m-0">
                  you are {totalBalance < 0 ? "owe" : "owed"}
                </h6>
                <h3 className="font-weight-bold line-height-24 ">
                  INR
                  {totalBalance < 0 ? -totalBalance : totalBalance}
                </h3>
              </div>
            </div>
          ) : (
            <img
              src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
              className="logo-dash-right ml-2 mt-2"
              alt="logo"
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default AllExpenses;
