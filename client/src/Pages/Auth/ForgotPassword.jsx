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
import { useUserDispatch, changePassword } from "../../Context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <React.Fragment>
      <Typography variant="h2" className={classes.subGreeting}>
        Enter your email address
      </Typography>
      <TextField
        id="email"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        margin="normal"
        placeholder="Email Adress"
        type="email"
        fullWidth
      />
      <div className={classes.formButtons}>
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            disabled={
              emailValue.length === 0
            }
            onClick={() =>
              changePassword(
                userDispatch,
                emailValue,
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
    </React.Fragment>
  );
}

export default Login;
