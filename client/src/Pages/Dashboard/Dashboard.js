import React  from "react";
import {
  Grid,
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";

// styles
// import useStyles from "./styles";
import PanelBox from "../../Components/PanelBox/PanelBox";

// components

export default function Dashboard(props) {
  /*var classes = useStyles();
  var theme = useTheme();*/

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <PanelBox>
            TEST
          </PanelBox>
        </Grid>
      </Grid>
    </>
  );
}
