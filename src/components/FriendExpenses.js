import React, { Component } from "react";
import ExpenseDetail from "./ExpenseDetail";
import "./expenses.css";

class Expense extends Component {
  state = { showExpenseDetails: false };
  showDetails = e => {
    if (this.state.showExpenseDetails === false) {
      this.setState({ showExpenseDetails: true });
    } else {
      this.setState({ showExpenseDetails: false });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="expense" onClick={this.showDetails}>
          <div className="row expence-row line-height-18 border border-top-0 border-left-0 border-right-0">
            <div className="d-flex justify-content-between container">
              <div className="d-flex expenses-child ">
                <div className="d-flex flex-column mr-2 text-secondary">
                  <small>Oct</small>
                  <h5 className="line-height-18">14</h5>
                </div>
                <img
                  className="expense-img mr-2"
                  src="/img/general@2x.png"
                  alt=""
                />
                <div className="d-flex flex-column">
                  <a
                    className="expense-heading text-truncate font-weight-bold"
                    href="#"
                  >
                    {this.props.expense.description}
                  </a>
                  {this.props.expense.groupId ? (
                    <a href="#">
                      <small className="text-secondary group-expense-link">
                        Hacker
                      </small>
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between expenses-child">
                <div className="d-flex flex-column mr-3">
                  <small className="align-self-sm-end text-secondary">
                    you paid
                  </small>
                  <span className="font-weight-bold">
                    INR {this.props.expense.cost}
                  </span>
                </div>
                <div className="d-flex flex-column ">
                  <small className="text-secondary">you lent</small>
                  <span className="font-weight-bold lent-color">
                    INR
                    {this.props.expense.repayments.reduce(
                      (lentAmount, repayment) => {
                        let totalAmount = lentAmount;
                        totalAmount += repayment.amount;
                        return totalAmount;
                      },
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {this.state.showExpenseDetails ? (
            <ExpenseDetail expense={this.props.expense} />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
export class DashboardMain extends Component {
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.expenses).map(expense => {
          return <Expense expense={this.props.expenses[expense]} />;
        })}
      </React.Fragment>
    );
  }
}

export default DashboardMain;
