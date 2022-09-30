import React, { useRef } from "react";
import classes from "./AuthForm.module.css";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp, { LOGIN_URL, SIGNUP_URL } from "../../hooks/use-http";
import { errorActions } from "../../store/errorSlice";

const AuthForm = ({ type }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const nameInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { sendRequest: sendAuthRequest } = useHttp();

  const authenticationHandler = async (e) => {
    try {
      e.preventDefault();
      let data;

      const payload = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };

      const requestOptions = {
        body: payload,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };

      if (type === "login")
        data = await sendAuthRequest({
          url: LOGIN_URL,
          ...requestOptions,
        });
      else {
        requestOptions.body.passwordConfirm = confirmPasswordRef.current.value;
        requestOptions.body.name = nameInputRef.current.value;
        data = await sendAuthRequest({
          url: SIGNUP_URL,
          ...requestOptions,
        });
      }

      if (data) {
        // User logged in
        dispatch(authActions.setToken(data.token));
        dispatch(authActions.setRole(data.data.user.role));
        history.replace("/home");
      }
    } catch (err) {
      dispatch(errorActions.setError(err.message));
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
