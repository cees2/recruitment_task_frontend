import React, { Fragment } from "react";
import classes from "./AuthWrapper.module.css";
import GlobalError from "../UI/GlobalError";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }) => {
  const error = useSelector((state) => state.error.error);

  return (
    <Fragment>
      {error && <GlobalError errorMessage={error} />}
      <div className={classes.authWrapper}>{children}</div>
    </Fragment>
  );
};

export default AuthWrapper;
