import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./stylesContent";

// pages
import Dashboard from "../../Pages/Dashboard/Dashboard";
// context
import { useAppState } from "../../Context/AppContext";
import FilePage from "../../Pages/File/FilePage";
import UserPage from "../../Pages/User/UserPage";

function Content(props) {
  var classes = useStyles();

  // global
  var appState = useAppState();

  return (
    <div
      className={classnames(classes.content, {
        [classes.contentShift]: appState.isSidebarOpened,
      })}
    >
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/files" component={FilePage} />
        <Route path="/users" component={UserPage} />
      </Switch>
    </div>
  );
}

export default withRouter(Content);
