import {Button, CircularProgress, Fade, TextField, Typography} from "@material-ui/core";
import {signUp, useUserDispatch} from "../../Context/UserContext";
import classnames from "classnames";
import google from "../../Assets/logo.svg";
import useStyles from "./styles";
import React, {useState} from "react";

function SignUpForm(props) {
  var classes = useStyles();
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [nameValue, setNameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  return (
    <React.Fragment>
      <Typography variant="h2" className={classes.subGreeting}>
        Create your account
      </Typography>
      <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
          {error}
        </Typography>
      </Fade>
      <TextField
        id="name"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={nameValue}
        onChange={e => setNameValue(e.target.value)}
        margin="normal"
        placeholder="Full Name"
        type="email"
        fullWidth
      />
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
      <div className={classes.creatingButtonContainer}>
        {isLoading ? (
          <CircularProgress size={26}/>
        ) : (
          <Button
            onClick={() =>
              signUp(
                userDispatch,
                {
                  name: nameValue,
                  email: emailValue,
                  password: passwordValue
                },
                props.history,
                setIsLoading,
                setError,
              )
            }
            disabled={
              emailValue.length === 0 ||
              passwordValue.length === 0 ||
              nameValue.length === 0
            }
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}
          >
            Create your account
          </Button>
        )}
      </div>
      <div className={classes.formDividerContainer}>
        <div className={classes.formDivider}/>
        <Typography className={classes.formDividerWord}>or</Typography>
        <div className={classes.formDivider}/>
      </div>
      <Button
        size="large"
        className={classnames(
          classes.googleButton,
          classes.googleButtonCreating,
        )}
      >
        <img src={google} alt="google" className={classes.googleIcon}/>
        &nbsp;Sign in with Google
      </Button>
    </React.Fragment>
  )
}

export default SignUpForm;