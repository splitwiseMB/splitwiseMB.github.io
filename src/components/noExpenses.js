import React, { Component } from 'react';

function NoExpense(){
    return(
        <div className="content-dash p-5">
          <div className="row">
            <img
              src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png"
              alt="blue-man"
              className="blue-person mr-auto col-md-4"
            />
            <div className="content-dash-right ml-auto col-md-8">
              <h3>
                You’re all settled up.
                <br /> Awesome!
              </h3>
              <p>
                To add a new expense, click the orange “Add an expense” button.
              </p>
            </div>
    </div>
    </div>
    )
}

export default NoExpense;