import classes from "./MainHeader.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { errorActions } from "../../store/errorSlice";

const MainHeader = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const removeTokenAndRole = () => {
    dispatch(authActions.removeToken());
    dispatch(authActions.removeRole());
  };

  const removeError = () => {
    dispatch(errorActions.removeError());
  };

  return (
    <header className={classes.mainHeader}>
      <h3 className={classes.projectName}>
        <Link to="/home">Recruitment task</Link>
      </h3>
      <div className={classes.authButtons}>
        {!token && (
          <Link to="/auth/login">
            <button className={classes.logInButton} onClick={removeError}>
              Log in
            </button>
          </Link>
        )}
        {!token && (
          <Link to="/auth/signup">
            <button className={classes.signUpButton} onClick={removeError}>
              Sign up
            </button>
          </Link>
        )}
        {token && (
          <button className={classes.signUpButton} onClick={removeTokenAndRole}>
            Log out
          </button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
