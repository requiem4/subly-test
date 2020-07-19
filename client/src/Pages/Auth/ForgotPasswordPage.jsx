import React, {useState} from "react";
import {Button, CircularProgress, Grid, TextField, Typography,} from "@material-ui/core";
// styles
import useStyles from "./styles";
// logo
import {Link} from "react-router-dom";
import {changePassword} from "./AuthActionsApi";
import {useDispatch} from "react-redux";

function ForgotPasswordPage(props) {
  var classes = useStyles();

  // global
  var userDispatch = useDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [emailValue, setEmailValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
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
              <CircularProgress size={26} className={classes.loginLoader}/>
            ) : (
              <Button
                disabled={
                  emailValue.length === 0
                }
                onClick={() =>
                  changePassword(
                    userDispatch,
                    emailValue,
                    props.history,
                    setIsLoading
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            )}
            <Link
              color="primary"
              size="large"
              className={classes.forgetButton}
              to={'login'}
            >
              Have an account?
            </Link>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default ForgotPasswordPage;
