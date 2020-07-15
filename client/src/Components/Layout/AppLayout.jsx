import React from "react";
import useStyles from "./styles";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar"
import Content from "./Content"
import Snackbar from '@material-ui/core/Snackbar';
function AppLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
      />
      <Header history={props.history}/>
      <Sidebar />
      <div className={classes.content}>
        <Content />
      </div>
    </div>
  );
}

export default AppLayout;
