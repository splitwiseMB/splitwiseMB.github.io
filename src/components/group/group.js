import React, { Component } from "react";
import fire from "../../config/fire";
import GroupMember from "./GroupMember";
import firebase from "firebase";

class group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupDetails: {},
      currentdesc: "",
      currentamount: "",
      splitAmount: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getGroupDetails = async () => {
    const groupDetails = await fire
      .firestore()
      .collection("group")
      .doc(this.props.match.params.groupId)
      .get();
    console.log(groupDetails.data());
    this.setState({ groupDetails: groupDetails.data() });
  };
  componentDidMount() {
    this.getGroupDetails();
  }

  showSplitEqually = e => {
    e.preventDefault();
    const splitAmount =
      +this.state.currentamount / this.state.groupDetails.Members.length;
    this.setState({ splitAmount });
    document.querySelector(".splitEqually").style.display = "block";
    document.querySelector(".showSplittedAmount").style.display = "block";
    // document.querySelector(".splitExact").style.display = "none";
    // document.querySelector(".splitPercentage").style.display = "none";
  };
  onSubmit = async e => {
    e.preventDefault();
    const currentDate = firebase.firestore.Timestamp.now();
    // let expenses = this.state.expenses;
    // const length = Object.keys(expenses).length;
    if (this.state.currentamount !== "" && this.state.currentdesc !== "") {
      let users = {};
      this.state.groupDetails.Members.forEach(mem => {
        if(mem.id === this.props.user.uid) {
          users[mem.id] = {
            name: mem.name,
            netBalance: +this.state.splitAmount*this.state.groupDetails.Members.length - +this.state.splitAmount,
            owedBalance: +this.state.splitAmount,
            paidShare: +this.state.currentamount
          }
        } else {
          users[mem.id] = {
            name: mem.name,
            netBalance: -+this.state.splitAmount,
            owedBalance: +this.state.splitAmount,
            paidShare: 0
          }
        }
      })

      const expense = {
        cost: this.state.currentamount,
        createdAt: currentDate,
        createdBy: {
          id: this.props.user.uid,
          name: this.props.user.displayName
        },
        creationMethod: "Equally",
        description: this.state.currentdesc,
        group: {
          id: this.props.match.params.groupId,
          name: this.state.groupDetails.name
        },
        users: users
      };
      console.log(expense);
      let expenseRef = fire
        .firestore()
        .collection("expenses")
        .doc();
      console.log("expensesRef", expenseRef.id);
      await expenseRef.set(expense);
      this.state.groupDetails.Members.forEach(async mem => {       
        let user = fire
          .firestore()
          .collection("users")
          .doc(mem.id);
        let userExpenses = [];
        let snapUser = await user.get();
        if (snapUser.data().hasOwnProperty("expenses")) {
          snapUser.data().expenses.forEach(ele => {
            userExpenses.push(ele);
          });
        }
        userExpenses.push(expenseRef.id);
        await user.set({ expenses: userExpenses }, { merge: true });
      })
      this.setState({
        currentdesc: "",
        currentamount: "",
        curruser1: "",
        curruser2: ""
      });
    } else {
      alert("Please input correctly!");
    }
  };
  render() {
    return (
      <React.Fragment>
        {console.log(this.state.groupDetails)}

        {/* modal */}
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
                    With <b>you</b> and <b>group members</b>
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
                      <span className="showSplittedAmount" style={{display: 'none'}}>Individual Share: {this.state.splitAmount}</span>
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
        {/* /modal */}

        <div className="dash-main-content col-md-6">
          <div className="dash-header p-3">
            <div className="row">
              <h4 className="mr-auto">{this.state.groupDetails.name}</h4>
              <div className="dash-header-right ml-auto">
                <button
                  className="btn btn-orange"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Add an expense
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="right-sidebar col-md-3">
          {this.state.groupDetails.Members &&
            this.state.groupDetails.Members.map(member => {
              return <GroupMember member={member} />;
            })}
        </div>
      </React.Fragment>
    );
  }
}
export default group;
