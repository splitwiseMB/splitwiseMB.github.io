import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Dashboard from './components/Dashboard';

function PrivateRoute({ component: RouteComponent, authed, ...rest }) {
  console.log(authed);
  return (    
    <Route
      {...rest}
      render={props =>
        authed === true ? (
            <Redirect to={'/dashboard'} />  
        ) : (
            <RouteComponent {...props} />
        )
      }
    />
  );
}
export default PrivateRoute;