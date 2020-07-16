import React, {useEffect} from "react";
import {
  Grid, Typography,
} from "@material-ui/core";

// styles
import useStyles from "./styles";
import LinearProgress from '@material-ui/core/LinearProgress';

import PanelBox from "../../Components/PanelBox/PanelBox";
import Widget from "../../Components/Widget/Widget";
import {useDispatch, useSelector} from "react-redux";
import Dot from "../../Components/Layout/Sidebar/components/Dot";
import {getUsersReport} from "../User/UserMiddleware";
import {getFilesReport} from "../File/FileMiddleware";

// components

export default function Dashboard(props) {
  var classes = useStyles();
  const userReport = useSelector(state => state.user.report);
  const fileReport = useSelector(state => state.file.report);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersReport());
    dispatch(getFilesReport());
  }, [])
  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Number of users"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {userReport.totalUserCount}
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Number of videos"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>

              <Typography size="xl" weight="medium">
                {fileReport.totalFileCount}
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Type of videos"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >

            <div className={classes.legendElement}>
              <Dot color="warning" />
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
              >
                Integration
              </Typography>
            </div>
            <div className={classes.legendElement}>
              <Dot color="primary" />
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
              >
                SDK
              </Typography>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Integration
              </Typography>
              <LinearProgress
                variant="determinate"
                value={30}
                classes={{ barColorPrimary: classes.progressBar }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                SDK
              </Typography>
              <LinearProgress
                variant="determinate"
                value={99}
                classes={{ barColorPrimary: classes.progressBar }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Size of videos"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                Max : {fileReport.maxFileSize}
              </Typography>
            </div>
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                Min : {fileReport.minFileSize}
              </Typography>
            </div>
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                Average : {fileReport.avgFileSize}
              </Typography>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
