import React, { useState } from "react";
import {
  Grid,
  Tabs,
  Tab, Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import Login from "./Login";
import SignUp from "./SignUp";

function Main(props) {
  var classes = useStyles();

  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <Grid container className={classes.container}>
      <Typography variant="h1" className={classes.greeting}>
        Welcome!
      </Typography>
      {/*<div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>*/}
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
              <Login/>
            )}
            {activeTabId === 1 && (
              <SignUp/>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default Main;
