import React from "react";
/*import {
  Paper
} from "@material-ui/core";
import classnames from "classnames";*/

// styles
import useStyles from "./styles";

export default function PanelBox({children, ...props}) {
  var classes = useStyles();

  return (
    <div className={classes.widgetWrapper}>
      <div className={classes.widgetHeader}>
        {children.header}
      </div>
      <div className={classes.widgetContent}>
        {children.body}
      </div>
    </div>
  );
}
