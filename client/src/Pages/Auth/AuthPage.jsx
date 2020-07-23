import React, { useState } from "react";
import {
  Grid,
  Tabs,
  Tab, Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function AuthPage() {
  var classes = useStyles();

  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <Grid container className={classes.container}>
      <Typography variant="h1" className={classes.greeting}>
        Welcome!
      </Typography>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          <div>
            {activeTabId === 0 && (
              <LoginForm/>
            )}
            {activeTabId === 1 && (
              <SignUpForm/>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default AuthPage;
