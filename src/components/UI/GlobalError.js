import React from "react";
import classes from "./GlobalError.module.css";

const GlobalError = ({ errorMessage }) => {
  return (
    <div className={classes.errorWrapper}>
      <img
        src={require("./../../images/error.png")}
        alt="error"
        className={classes.errorImage}
      />
      <h4 className={classes.errorHeader}>{errorMessage}</h4>
    </div>
  );
};

export default GlobalError;
