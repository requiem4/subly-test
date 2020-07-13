import React, { useState } from "react";
import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// logo
// import logo from "./logo.svg";
import google from "../../Assets/logo.svg";

// context
import { useUserDispatch, loginUser } from "../../Context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <React.Fragment>
      <Typography variant="h2" className={classes.subGreeting}>
        Enter your account details
      </Typography>
      <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
          Something is wrong with your login or password :(
        </Typography>
      </Fade>
      <TextField
        id="email"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={loginValue}
        onChange={e => setLoginValue(e.target.value)}
        margin="normal"
        placeholder="Email Adress"
        type="email"
        fullWidth
      />
      <TextField
        id="password"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
      />
      <div className={classes.formButtons}>
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            disabled={
              loginValue.length === 0 || passwordValue.length === 0
            }
            onClick={() =>
              loginUser(
                userDispatch,
                loginValue,
                passwordValue,
                props.history,
                setIsLoading,
                setError,
              )
            }
            variant="contained"
            color="primary"
            size="large"
          >
            Login
          </Button>
        )}
        <Button
          color="primary"
          size="large"
          className={classes.forgetButton}
        >
          Forget Password
        </Button>
      </div>
      <div className={classes.formDividerContainer}>
        <div className={classes.formDivider} />
        <Typography className={classes.formDividerWord}>or</Typography>
        <div className={classes.formDivider} />
      </div>
      <Button size="large" className={classes.googleButton}>
        <img src={google} alt="google" className={classes.googleIcon} />
        &nbsp;Sign in with Google
      </Button>
    </React.Fragment>
  );
}

export default Login;
