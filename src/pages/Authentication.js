import React from "react";
import Login from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { Switch, Route } from "react-router-dom";

const Authentication = (props) => {
  return (
    <Switch>
      <Route path="/auth/login">
        <Login />
      </Route>
      <Route path="/auth/signup">
        <SignUp />
      </Route>
    </Switch>
  );
};

export default Authentication;
