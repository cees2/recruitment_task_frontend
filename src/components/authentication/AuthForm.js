import React from "react";
import classes from "./authForm.module.css";

const AuthForm = ({ type }) => {
  const caption =
    type === "login" ? "Log into your account" : "Create new account";

  const buttonContent = type === "login" ? "Log In" : "Create";

  return (
    <React.Fragment>
      <h4 className={classes.authCaption}>{caption}</h4>
      <form className={classes.authForm}>
        <div className={classes.authInputWrapper}>
          <label htmlFor="email">Email address</label>
          <input type="text" id="email" name="email"></input>
        </div>
        <div className={classes.authInputWrapper}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"></input>
        </div>
        {type === "signup" && (
          <div className={classes.authInputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            ></input>
          </div>
        )}
        <button className={classes.submitFormButton}>{buttonContent}</button>
      </form>
    </React.Fragment>
  );
};

export default AuthForm;
