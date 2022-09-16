import classes from "./MainHeader.module.css";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className={classes.mainHeader}>
      <h3 className={classes.projectName}>
        <Link to="/home">Recruitment task</Link>
      </h3>
      <div className={classes.authButtons}>
        <Link to="/auth/login">
          <button className={classes.logInButton}>Log in</button>
        </Link>
        <Link to="/auth/signup">
          <button className={classes.signUpButton}>Sign up</button>
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
