import React, { Component } from "react";
import "./AddExpense.css";
import FriendExenses from "../FriendExpenses";
import NoExpenses from "../noExpenses";
import firebase from "firebase";
import fire from "../../config/fire";

class Expense extends Component {
  constructor(props) {
    super(props);
    console.log("fdfj", props.match.params);
    this.state = {
      currentdesc: "",
      currentamount: "",
      curruser1: "",
      curruser2: "",
      currentUser: this.props.match.params.name,
      expenses: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // handleClick(e) {
  //   let currSum =
  //     parseInt(this.state.curruser1, 10) + parseInt(this.state.curruser2, 10);
  //   if (currSum === parseInt(this.state.currentamount)) {
  //     const userD = {
  //       repayment: [
  //         {
  //           from: "yogi",
  //           to: "arun",
  //           youpaid: this.state.currentamount,
  //           youlent: this.state.curruser1
  //         }
  //       ]
  //     };
  //     const expenses = this.state.expenses;
  //     expenses.push(userD);
  //     // this.setState({
  //     //   description,
  //     //   currentdesc: "",
  //     //   currentamount: "",
  //     //   curruser1: "",
  //     //   curruser2: ""
  //     // });
  //   } else {
  //     alert("Error occured : Please split amount correctly ");
  //   }
  // }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  showSplitEqually = e => {
    e.preventDefault();
    const splitAmount = +this.state.currentamount / 2;
    this.setState({ curruser1: splitAmount, curruser2: splitAmount });
    document.querySelector(".splitEqually").style.display = "block";
    // document.querySelector(".splitExact").style.display = "none";
    // document.querySelector(".splitPercentage").style.display = "none";
  };

  // showSplitExact = e => {
  //   e.preventDefault();
  //   document.querySelector(".splitEqually").style.display = "none";
  //   document.querySelector(".splitExact").style.display = "block";
  //   document.querySelector(".splitPercentage").style.display = "none";
  // };

  // showSplitPercentage = e => {
  //   e.preventDefault();
  //   document.querySelector(".splitEqually").style.display = "none";
  //   document.querySelector(".splitExact").style.display = "none";
  //   document.querySelector(".splitPercentage").style.display = "block";
  // };

  onSubmit = async e => {
    e.preventDefault();
    const currentDate = firebase.firestore.Timestamp.now();
    // let expenses = this.state.expenses;
    // const length = Object.keys(expenses).length;
    if (
      this.state.currentamount !== "" &&
      this.state.currentdesc !== "" &&
      this.state.curruser1 !== "" &&
      this.state.curruser2 !== ""
    ) {
      if (
        +this.state.curruser1 + +this.state.curruser2 ===
        +this.state.currentamount
      ) {
        let users = {};
        users[this.props.user.uid] = {
          name: this.props.user.displayName,
          netBalance: +this.state.curruser2,
          owedBalance: +this.state.curruser1,
          paidShare: +this.state.currentamount
        };
        users[this.props.match.params.id] = {
          name: this.props.match.params.name,
          netBalance: -+this.state.curruser2,
          owedBalance: +this.state.curruser2,
          paidShare: 0
        };
        const expense = {
          cost: this.state.currentamount,
          createdAt: currentDate,
          createdBy: {
            id: this.props.user.uid,
            name: this.props.user.displayName
          },
          creationMethod: "Equally",
          description: this.state.currentdesc,
          friendId: this.props.match.params.id,
          users: users
        };
        console.log(expense);
        let expenseRef = fire
          .firestore()
          .collection("expenses")
          .doc();
        console.log("expensesRef", expenseRef.id);
        await expenseRef.set(expense);
        let authUser = fire
        .firestore()
        .collection("users")
        .doc(this.props.user.uid);
        let authUserExpenses = [];
        let snapAuthUser = await authUser.get();
          if(snapAuthUser.data().hasOwnProperty('expenses')){
            snapAuthUser.data().expenses.forEach(ele => {
              authUserExpenses.push(ele);
            })
          }
        authUserExpenses.push(expenseRef.id);
        await authUser.set({expenses: authUserExpenses}, {merge: true});
        let friendUser = fire
        .firestore()
        .collection("users")
        .doc(this.props.match.params.id);
        let friendUserExpenses = [];
        let snapFriendUser = await friendUser.get();
          if(snapFriendUser.data().hasOwnProperty('expenses')){
            snapFriendUser.data().expenses.forEach(ele => {
              friendUserExpenses.push(ele);
            })
          }
        friendUserExpenses.push(expenseRef.id);
        await friendUser.set({expenses: friendUserExpenses}, {merge: true});
        // let userExpenses = fire
        //   .firestore()
        //   .collection("users")
        //   .doc(this.props.user.uid);
        // console.log(userExpenses);
        //     const expense = {
        //       description: this.state.currentdesc,
        //       creationMethod: "exact payment",
        //       friendId: "arun",
        //       cost: this.state.currentamount,
        //       repayments: [
        //         {
        //           from: this.props.match.params.name,
        //           to: "user1",
        //           amount: +this.state.curruser2
        //         }
        //       ],
        //       createdBy: "user1",
        //       createAt: "date"
        //     };
        //     expenses[length] = expense;
        //     console.log(expenses);
            this.setState({
              currentdesc: "",
              currentamount: "",
              curruser1: "",
              curruser2: ""
            });
      } else {
        alert("Please split the amount correctly!");
      }
    } else {
      alert("Please input correctly!");
    }
  };
  // this.props.addTodo(this.state.title);
  // this.setState({ title: "" });
  render() {
    let expenses = this.state.expenses;
    const length = Object.keys(expenses).length;
    return (
      <div className="dash-main-content col-md-6">
        {/* MOdal */}
        <form onSubmit={this.onSubmit}>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ background: "#5cc5a7" }}>
                  <h6 className="modal-title" id="exampleModalCenterTitle">
                    Add an expense
                  </h6>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    style={{ color: "white" }}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="modal-title" id="exampleModalCenterTitle">
                    With <b>you</b> and <b>{this.props.match.params.name}</b>
                  </p>
                  <hr />
                  <div className="infoDesc">
                    <img src="/img/desc.png" />
                    <div className="main-content">
                      <input
                        type="text"
                        className="description ml-3 mb-4"
                        name={"currentdesc"}
                        onChange={this.handleChange}
                        value={this.state.currentdesc}
                        placeholder="Enter a description"
                        style={{ "font-size": "20px" }}
                      />
                      <div className="cost-conatiner ml-3">
                        <span className="currency_code">Rs</span>
                        <input
                          type="number"
                          className="ml-1 mb-2"
                          name={"currentamount"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.currentamount}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="splitAmount mt-3">
                    <div className="row mb-3">
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={this.showSplitEqually}
                      >
                        =
                      </button>
                      {/* <button
                        className="btn btn-secondary mr-2"
                        onClick={this.showSplitExact}
                      >
                        RS. 1.50
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={this.showSplitPercentage}
                      >
                        %
                      </button> */}
                    </div>
                    <div className="splitEqually">
                      <h5>Split Equally</h5>
                      <div className="innerDetails m-3">
                        <span>You</span>
                        <input
                          type="number"
                          className="description ml-1 mb-2"
                          name={"curruser1"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.curruser1}
                          readOnly
                        />
                      </div>
                      <div className="innerDetails m-3">
                        <span>{this.props.match.params.name}</span>
                        <input
                          type="number"
                          className="description ml-1 mb-2"
                          name={"curruser2"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.curruser2}
                          readOnly
                        />
                      </div>
                    </div>
                    {/* <div className="splitExact" style={{ display: "none" }}>
                      <h5>Split by exact amounts</h5>
                      <div className="innerDetails m-3">
                        <span>You</span>
                        <input
                          type="number"
                          className="description ml-1 mb-2"
                          name={"curruser1"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.curruser1}
                          readOnly
                        />
                      </div>
                      <div className="innerDetails m-3">
                        <span>{this.props.match.params.name}</span>
                        <input
                          type="number"
                          className="description ml-1 mb-2"
                          name={"curruser2"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.curruser2}
                        />
                      </div>
                    </div>
                    <div
                      className="splitPercentage"
                      style={{ display: "none" }}
                    >
                      <h5>Split By Percentage</h5>
                      <div className="innerDetails m-3">
                        <span>You</span>
                        <input
                          type="number"
                          className="description ml-1 mb-2"
                          name={"curruser1"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.curruser1}
                        />
                      </div>
                      <div className="innerDetails m-3">
                        <span>{this.props.match.params.name}</span>
                        <input
                          type="number"
                          className="description ml-1 mb-2"
                          name={"curruser2"}
                          onChange={this.handleChange}
                          placeholder="0.00"
                          value={this.state.curruser2}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* modal */}
        <div className="dash-header p-3">
          <div className="row">
            <h4 className="mr-auto">{this.props.match.params.name}</h4>
            <div className="dash-header-right ml-auto">
              <button
                type="button"
                className="btn btn-orange"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Add an expense
              </button>
            </div>
          </div>
        </div>
        {length > 0 ? (
          <FriendExenses expenses={this.state.expenses} />
        ) : (
          <NoExpenses />
        )}
      </div>
    );
  }
}

export default Expense;
