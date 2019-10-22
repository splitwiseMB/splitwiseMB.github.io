import React, { Component } from "react";
import "./dashboardinner.css";
import fire from "../config/fire";

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalbalance: "",
      youOwe: "",
      youOwed: "",
      user: [],
      expenseData: [],
      friends: {},
      noOfExpenses: "",
      ready: false,
      uid: ""
    };
  }
  componentDidMount() {
    async function getuser() {
      return new Promise(async (resolve, reject) => {
        await fire.auth().onAuthStateChanged(async user => {
          if (user) {
            resolve(user);
            return;
          }
          reject("error");
        });
      });
    }
    getuser().then(async user => {
      let arr = [];
      const userData = await fire
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      // console.log('this is for friends', userData.data());
      let friends = {};
      if (userData.data().friends === undefined) {
        this.setState({
          totalbalance: 0,
          youOwe: 0,
          youOwed: 0
        });
      } else {
        userData.data().friends.map(val => {
          // console.log(val, "this is val");
          friends[val] = {
            name: "",
            friendAllExpenses: [],
            friendTotalAmount: ""
          };
        });
        this.setState({
          // noOfExpenses: userData.data().expenses.length,
          uid: user.uid,
          friends
        });
        if (userData.data().expenses !== undefined) {
          userData.data().expenses.map(async expenseId => {
            const expenseData = await fire
              .firestore()
              .collection("expenses")
              .doc(expenseId)
              .get();
            // console.log('expenseData',expenseData);
            arr.push(expenseData.data());
            this.setState({
              expenseData: arr
            });
            if (arr.length === this.state.noOfExpenses) {
              this.setState({
                ready: true
              });
              this.ComputeToatal();
            }
          });
        }
      }
    });
  }
  ComputeToatal() {
    let youowe = 0;
    let youowed = 0;
    const friend = this.state.friends;
    this.state.expenseData.map(val => {
      // totalbalance,owed,owe
      const netBal = val.users[`${this.state.uid}`].netBalance;
      if (netBal > 0) {
        youowe += netBal;
      } else {
        youowed += netBal;
      }
      // totalbalance,owed,owe
      //friends
      const friendId = val.friendId;
      const netBalFriend = val.users[`${friendId}`].netBalance;
      friend[friendId].friendAllExpenses.push(netBalFriend);
      friend[friendId].name = val.users[`${friendId}`].name;
      //friends
    });

    // console.log(Object.keys(this.state.friends));
    Object.keys(friend).forEach(element => {
      let Totalamount = 0;
      friend[element].friendAllExpenses.map(amount => {
        Totalamount += amount;
      });
      friend[element].friendTotalAmount = Totalamount;
    });
    this.setState({
      totalbalance: youowe + youowed,
      youOwe: youowe,
      youOwed: -youowed,
      friends: friend
    });
  }

  render() {
    // if (this.props.expenseData.length > 0) {
    return this.state.ready === true ? (
      <React.Fragment>
        <div className="dash-main-content col-md-6">
          {/* {console.log(this.props)} */}
          <div className="dash-header pt-2 pl-3 pr-3 border border-top-0 border-left-0 border-right-0">
            <div className="row">
              <h4 className="mr-auto">Dashboard</h4>
              <div className="dash-header-right ml-auto">
              
              </div>
            </div>
            <div className="d-flex justify-content-between border border-left-0 border-right-0 border-bottom-0 mt-3 pt-2 pb-2">
              <div className="d-flex flex-column align-items-center w-3">
                <small className="text-secondary">total balance</small>
                <small className="orange-color">
                  INR {this.state.totalbalance}
                </small>
              </div>
              <div className="d-flex flex-column align-items-center w-3 border border-top-0 border-bottom-0">
                <small className="text-secondary">you owe</small>
                <small className="orange-color">INR {this.state.youOwe}</small>
              </div>
              <div className="d-flex flex-column align-items-center w-3">
                <small className="text-secondary">you are owed</small>
                <small className="colorBlue">INR {this.state.youOwed}*</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column w-50 pt-2 pl-3 pr-3">
              <span className="text-secondary font-weight-bold balance-heading">
                YOU OWE
              </span>
              <div>
                {Object.keys(this.state.friends).map(element => {
                  if (this.state.friends[element].friendTotalAmount > 0) {
                    return (
                      <div className="d-flex line-height-18 border border-left-0 border-top-0 border-bottom-0 mt-3">
                        <img
                          className="expense-user-img border rounded-circle mr-2"
                          src="/img/default-avatar.png"
                          alt=""
                        />
                        <div>
                          <h6 className="m-0">
                            {this.state.friends[element].name}
                          </h6>
                          <small className="orange-color">
                            you owe{" "}
                            <b>
                              INR{this.state.friends[element].friendTotalAmount}
                            </b>
                          </small>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="d-flex flex-column w-50 pt-2 pl-3 pr-3">
              <span className="text-secondary align-self-end font-weight-bold balance-heading">
                YOU ARE OWED
              </span>
              {Object.keys(this.state.friends).map(element => {
                if (this.state.friends[element].friendTotalAmount > 0) {
                  // console.log(
                  //   "ppp",
                  //   this.state.friends[element].friendTotalAmount
                  // );
                  return (
                    <div className="d-flex line-height-18 border border-left-0 border-top-0 border-bottom-0 mt-3">
                      <img
                        className="expense-user-img border rounded-circle mr-2"
                        src="/img/default-avatar.png"
                        alt=""
                      />
                      <div>
                        <h6 className="m-0">
                          {this.state.friends[element].name}
                        </h6>
                        <small className="orange-color">
                          you owe{" "}
                          <b>
                            INR{-this.state.friends[element].friendTotalAmount}
                          </b>
                        </small>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="right-sidebar col-md-3">
          <img
            src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
            className="logo-dash-right ml-2 mt-2"
            alt="logo"
          />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="dash-main-content col-md-6">
          <div className="dash-header pt-2 pl-3 pr-3 border border-top-0 border-left-0 border-right-0">
            <div className="row">
              <h4 className="mr-auto">Dashboard</h4>
              <div className="dash-header-right ml-auto">
              </div>
            </div>
            <div className="d-flex justify-content-between border border-left-0 border-right-0 border-bottom-0 mt-3 pt-2 pb-2">
              <div className="d-flex flex-column align-items-center w-3">
                <small className="text-secondary">total balance</small>
                <small className="orange-color">
                  INR {this.state.totalbalance}
                </small>
              </div>
              <div className="d-flex flex-column align-items-center w-3 border border-top-0 border-bottom-0">
                <small className="text-secondary">you owe</small>
                <small className="orange-color">INR {this.state.youOwe}</small>
              </div>
              <div className="d-flex flex-column align-items-center w-3">
                <small className="text-secondary">you are owed</small>
                <small className="colorBlue">INR {this.state.youOwed}*</small>
              </div>
            </div>
          </div>
        </div>
        <div className="right-sidebar col-md-3">
          <img
            src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
            className="logo-dash-right ml-2 mt-2"
            alt="logo"
          />
        </div>
      </React.Fragment>
    );
    // } else {
    //   return (
    //     <div className="dash-main-content col-md-6">
    //       <div className="dash-header pt-2 pl-3 pr-3 border border-top-0 border-left-0 border-right-0">
    //     <div className="row">
    //           <h4 className="mr-auto">Dashboard</h4>
    //           <div className="dash-header-right ml-auto">
    //             <button className="btn btn-orange">Add an expense</button>
    //             <button className="btn btn-blue ml-2">Settle up</button>
    //           </div>
    //         </div>
    //         </div>
    //       <div className="content-dash p-5">
    //         <div className="row">
    //           <img
    //             src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png"
    //             alt="blue-man"
    //             className="blue-person mr-auto col-md-4"
    //           />
    //           <div className="content-dash-right ml-auto col-md-8">
    //             <h3>
    //               You’re all settled up.
    //               <br /> Awesome!
    //             </h3>
    //             <p>
    //               To add a new expense, click the orange “Add an expense”
    //               button.
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }
}

export default Dash;
