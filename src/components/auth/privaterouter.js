import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: RouteComponent, authed, ...rest }) => {
  console.log(authed);
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}
 
export const PrivateRouteRegister = ({ component: RouteComponent, authed, ...rest }) => {
  console.log(authed);
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to={"/dash/main"} />
        )
      }
    />
  );
}