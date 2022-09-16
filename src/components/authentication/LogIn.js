import React from "react";
import AuthForm from "./AuthForm";
import AuthWrapper from "./AuthWrapper";

const Login = (props) => {
  return (
    <AuthWrapper>
      <AuthForm type="login" />
    </AuthWrapper>
  );
};

export default Login;
