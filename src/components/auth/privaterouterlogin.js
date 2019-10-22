import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Dashboard from './components/Dashboard';

function PrivateRoute({ component: RouteComponent, authed, ...rest }) {
  console.log(authed);
  return (    
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <RouteComponent {...props} />  
        ) : (
          <Redirect to={'/dash/main'} />
            
        )
      }
    />
  );
}
export default PrivateRoute;