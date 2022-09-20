import React, { useEffect, useCallback, useRef } from "react";
import classes from "./AuthForm.module.css";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { authenticationManager } from "../../store/authentication";
import { useHistory } from "react-router-dom";

const AuthForm = ({ type }) => {
  console.log("Component exec");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const nameInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const authenticationHandler = async (e) => {
    e.preventDefault();
    let data;
    try {
      const payload = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };

      if (type === "login") data = await authenticationManager(payload);
      else {
        payload.passwordConfirm = confirmPasswordRef.current.value;
        payload.name = nameInputRef.current.value;
        if (payload.passwordConfirm !== payload.password)
          throw new Error("Provided passwords do not match.");
        data = await authenticationManager(payload, false);
      }

      console.log(data);
      dispatch(authActions.setToken(data.token));

      history.replace("/home");
    } catch (err) {
      dispatch(authActions.setError(err.message));
    }
  };

  const caption =
    type === "login" ? "Log into your account" : "Create new account";

  const buttonContent = type === "login" ? "Log In" : "Create";

  return (
    <React.Fragment>
      <h4 className={classes.authCaption}>{caption}</h4>
      <form className={classes.authForm} onSubmit={authenticationHandler}>
        <div className={classes.authInputWrapper}>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            ref={emailInputRef}
          ></input>
        </div>
        <div className={classes.authInputWrapper}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordInputRef}
          ></input>
        </div>
        {type === "signup" && (
          <div className={classes.authInputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              ref={confirmPasswordRef}
            ></input>
            <label htmlFor="userName">User name</label>
            <input id="userName" name="userName" ref={nameInputRef}></input>
          </div>
        )}
        <button className={classes.submitFormButton}>{buttonContent}</button>
      </form>
    </React.Fragment>
  );
};

export default AuthForm;
