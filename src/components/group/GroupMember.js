import React, { Component } from "react";
import userDummyPic from "../layouts/user.png";
import "./groupmember.css";

class GroupMember extends Component {
  render() {
    return (
      <div className="d-flex">
        <img src={userDummyPic} className="member-image mr-2" alt="" />
        <div className="d-flex flex-column line-height-18 mt-1">
          <span>{this.props.member.name}</span>
          <small className="text-secondary">settle up</small>
        </div>
      </div>
    );
  }
}

export default GroupMember;
