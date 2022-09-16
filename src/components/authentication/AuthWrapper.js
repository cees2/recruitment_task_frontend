import React from "react";
import classes from "./AuthWrapper.module.css";
const AuthWrapper = ({ children }) => {
  return <div className={classes.authWrapper}>{children}</div>;
};

export default AuthWrapper;
