import React from "react";
import AuthForm from "./AuthForm";
import AuthWrapper from "./AuthWrapper";

const SignUp = (props) => {
  return (
    <AuthWrapper>
      <AuthForm type="signup" />
    </AuthWrapper>
  );
};

export default SignUp;
