import React, { Component } from "react";
// import UserPic from '../user.png';
import { BrowserRouter, Link, Route } from "react-router-dom";
// import Modal from './friends/modal';
import "./friends/friends.css";
import fire from "../../../config/fire";
import "firebase/database";
// import Friend from '../friend/friend'

export class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      name: "",
      email: "",
      group: []
    };
    this.handleclick = this.handleclick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => ({ user: user }));
      } else {
        // alert('please login');
      }
    });
    function getuser() {
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
      if (userData.data().friends) {
        userData
          .data()
          .friends.map(val =>
            arr.push({ email: val.email, name: val.name, id: val.id })
          );
      }
      // console.log(userData.data());
      let group = [];
      if (userData.data().groups) {
        userData.data().groups.map(val => {
          group.push({ name: val.name, id: val.id });
        });
      }
      this.setState({
        friends: arr,
        group
      });
    });
  }

  handleclick = async e => {
    e.preventDefault();
    let alreadyExist = 0;
    let friendID;
    let friendsArr = [];
    let friendsArr2 = [];
    // console.log(this.state);
    const userinfo = { email: this.state.email, name: this.state.name };
    const friends = this.state.friends;
    friends.push(userinfo);

    // getting friends of authenticated user
    try {
      let snapFriends = await fire
        .firestore()
        .collection("users")
        .doc(this.state.user.uid)
        .get();
      if (snapFriends.data().hasOwnProperty("friends")) {
        snapFriends.data().friends.forEach(doc => {
          if (doc.email === this.state.email) {
            alreadyExist = 1;
          } else {
            friendsArr.push(doc);
          }
        });
      }
      if (alreadyExist === 0) {
        // getting details of requested friend
        let snap = await fire
          .firestore()
          .collection("users")
          .where("email", "==", this.state.email)
          .where("name", "==", this.state.name)
          .get();
        if (snap.size > 0) {
          console.log(snap.size, snap);
          snap.forEach(doc => {
            friendID = doc.id;
            console.log("hfgf");
            console.log(doc.data());
            friendsArr.push({
              email: this.state.email,
              name: this.state.name,
              id: doc.id
            });
            console.log(friendsArr);
          });
          fire
            .firestore()
            .collection("users")
            .doc(this.state.user.uid)
            .set(
              {
                friends: friendsArr
              },
              { merge: true }
            );
          let snapFriends2 = await fire
            .firestore()
            .collection("users")
            .doc(friendID)
            .get();
          console.log(snapFriends2.data());
          if (snapFriends2.data().hasOwnProperty("friends")) {
            snapFriends2.data().friends.forEach(doc => {
              friendsArr2.push(doc);
            });
          }
          console.log(friendsArr2);
          friendsArr2.push({
            id: this.state.user.uid,
            name: this.state.user.displayName,
            email: this.state.user.email
          });
          fire
            .firestore()
            .collection("users")
            .doc(friendID)
            .set(
              {
                friends: friendsArr2
              },
              { merge: true }
            );
          console.log(friendsArr2);
          this.setState({
            friends
          });
          this.setState({
            name: "",
            email: ""
          });

          document.getElementById("addFriendForm").reset();
        } else {
          document.querySelector(".errorMsg").style.display = "block";
          document.querySelector(".errorMsg").textContent =
            "No user found with following credentials";
        }
      } else {
        document.querySelector(".errorMsg").style.display = "block";
        document.querySelector(".errorMsg").textContent =
          "user is already your friend";
      }
    } catch (e) {
      document.querySelector(".errorMsg").textContent = e;
      document.querySelector(".errorMsg").style.display = "block";
    }
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleChangeOverClick = e => {
    document.querySelectorAll(".sidebarText").forEach(element => {
      element.classList.remove("colorBlue");
    });
    e.target.classList.add("colorBlue");
    if (e.target.classList.contains("dashClass")) {
      //   console.log('Class list');
      //   e.target.previousSibling.classList.remove('grayImg');
    }
  };
  render() {
    return (
      <div>
        {/* MOdal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title row" id="exampleModalLabel">
                  <img src="/img/logo1.svg" className="logo" alt="site" />
                  <span className="modal-popup-text ml-2">
                    <b>ADD FRIEND</b>
                  </span>
                </div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleclick} id="addFriendForm">
                <div className="modal-body">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Enter email address"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      placeholder="Enter name"
                      onChange={this.handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div
                    className="errorMsg p-3 my-3 bg-danger text-light"
                    style={{ display: "none" }}
                  ></div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // onClick={this.handleclick}
                  >
                    ADD FRIEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* modal */}

        <div className="row mt-3">
          <img src="/img/logo1.svg" className="logoDash grayImg" alt="logo" />
          <Link to={`/dash/main`}>
            <span
              className="sidebarText dashClass ml-2 lh"
              onClick={this.handleChangeOverClick}
            >
              Dashboard
            </span>
          </Link>
        </div>
        <div className="row mt-2">
          <Link to={`/expenses`}>
            <span className="fa fa-bars"></span>
            <span className="sidebarExpensesText ml-2 lh">All expenses</span>
          </Link>
        </div>
        <div className="groupSidebar">
          <div className="row bg-light text-secondary px-2">
            <span className="labelListsSidebar mr-auto">Groups</span>
            <span className="addSidebar">
              <a href="/new/apartment" className="text-secondary">
                <span className="addIcon fa fa-plus mr-1"></span>add
              </a>
            </span>
          </div>
          {console.log(this.state.group)}
          <div className="appendGroupNames ml-3 p-2 text-secondary">
            {this.state.group.length === 0
              ? "You do not have any group"
              : false}
            {this.state.group.map(ele => (
              <p className="textGroups">
                {/* {console.log(ele,'ele')} */}
                <Link
                  to={{
                    pathname: `/group/${ele.id}/${ele.name}`
                  }}
                >
                  <span className="fa fa-tag mr-2"></span>
                  {ele.name}
                </Link>
              </p>
            ))}
          </div>
        </div>
        <div className="friendsSidebar">
          <div className="row bg-light text-secondary px-2">
            <span className="labelListsSidebar mr-auto">Friends</span>
            <button
              type="button"
              className="btn fa fa-plus addIcon text-secondary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <span className="ml-1">add</span>
            </button>
            <span className="addSidebar"></span>
          </div>
          <div className="appendFriendNames ml-3 text-secondary p-2">
            {/* {console.log(this.state.friends)} */}
            {this.state.friends.length === 0
              ? "You do not have any friends"
              : false}
            {this.state.friends.map(val => (
              <p className="textGroups">
                {console.log("val", val)}
                <Link
                  to={{
                    pathname: `/dash/friend/${val.id}/${val.name}`,
                    state: {
                      info: val.name
                    }
                  }}
                >
                  <i className="icon-user"></i>
                  {val.name}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
