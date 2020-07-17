import React from "react";
import useStyles from "./styles";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar"
import Content from "./Content"

function AppLayout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header history={props.history}/>
      <Sidebar/>
      <div className={classes.content}>
        <Content/>
      </div>
    </div>
  );
}

export default AppLayout;
