import React, { Fragment } from "react";
import classes from "./AuthWrapper.module.css";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }) => {
  const error = useSelector((state) => state.auth.error);
  return (
    <Fragment>
      {error && (
        <div className={classes.errorWrapper}>
          <img
            src={require("../../images/error.png")}
            alt="error"
            className={classes.errorImage}
          />
          <h4 className={classes.errorHeader}>{error}</h4>
        </div>
      )}
      <div className={classes.authWrapper}>{children}</div>
    </Fragment>
  );
};

export default AuthWrapper;
